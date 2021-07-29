const AppError = require("../../../shared/errors/AppError");
const BCrypt = require("../../../providers/BCrypt");

/**
 * @typedef UpdateDTO
 * @property {Number} id
 * @property {String} name
 * @property {String} username
 * @property {String} password
 * @property {String} profile_id
 * @property {String} active
 */

/**
 * Classe que possu como objetivo, realizar o update de algumas informações
 * da OLT.
 */
module.exports = class UpdateUserService {
  /**
   *
   * @param {Object} listDTO
   * @param {import("../../../services/databases/knex/repositories/UsersRepository")} listDTO.usersRepository
   */
  constructor(listDTO) {
    const { usersRepository } = listDTO;
    this.usersRepository = usersRepository;
    this.bcrypt = new BCrypt();
  }

  /**
   *
   * @param {UpdateDTO} updateDTO
   * @returns {Promise<void>}
   */
  async exec(updateDTO) {
    try {
      const {
        id,
        name,
        username,
        password,
        old_password,
        profile_id,
        active,
      } = updateDTO;

      const userDB = await this.usersRepository.findById(id);
      userDB.id = userDB.user_id;
      delete userDB.user_id;

      if (!userDB) {
        throw new AppError("Usuário não existe!!", 400);
      }

      /**
       * Verificando se existe o username na requisição que está vindo
       */
      if (username) {
        const checkUserName = await this.usersRepository.verifyUserName(
          username,
          [id]
        );

        if (checkUserName) {
          throw new AppError("Username já existe na base de dados.", 400);
        }
      }

      /**
       * Verificando se existe uma nova senha mas não existe a senha antiga
       */
      if (password && !old_password) {
        throw new AppError(
          "Você precisa informar a senha antiga para alterar a senha"
        );
      }

      if (password && old_password) {
        const checkPassword = await this.bcrypt.compare(
          old_password,
          userDB.password
        );

        if (!checkPassword) {
          throw new AppError("A senha antiga não bate.", 400);
        }
      }

      name && (userDB.name = name);
      username && (userDB.username = username);
      password && (userDB.password = await this.bcrypt.generateHash(password));
      profile_id && (userDB.profile_id = profile_id);
      active !== undefined && (userDB.active = active);

      await this.usersRepository.updateByUser(userDB);
    } catch (e) {
      console.log(e);
      if (e instanceof AppError) {
        throw e;
      }

      // Como os erros emitidos por todos os locais que podem dá erro aqui
      // são do tipo GENERAL_ERROR, então está tranquilo.
      throw new AppError(e.log, 400, { layer: e.layer, obs: e.obs });
    }
  }
};
