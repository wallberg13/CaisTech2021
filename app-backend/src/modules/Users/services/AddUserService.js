const AppError = require("../../../shared/errors/AppError");
const BCrypt = require("../../../providers/BCrypt");

/**
 * @typedef AddUserDTO
 * @property {Number} profile_id
 * @property {String} name
 * @property {String} username
 * @property {String} password
 */

module.exports = class AddUserService {
  /**
   * @param {Object} updateParams
   * @param {import("../../../services/databases/knex/repositories/UsersRepository")} updateParams.usersRepository
   */
  constructor(updateParams) {
    const { usersRepository } = updateParams;
    this.usersRepository = usersRepository;
    this.bcrypt = new BCrypt();
  }

  /**
   * Execução do Script para adicionar uma OLT.
   * @param {AddUserDTO} userDTO
   */
  async exec(userDTO) {
    try {
      const { password, username } = userDTO;

      // Gerando um Hash para o usuário.
      const passwordHashed = await this.bcrypt.generateHash(password);

      const users = await this.usersRepository.verifyUserName(username);

      if (users) {
        throw new AppError("Usuário já existe na base de dados", 400);
      }

      await this.usersRepository.create([
        { ...userDTO, password: passwordHashed },
      ]);

      return { status: true, mensagem: "Usuário adicionado com sucesso!!" };
    } catch (e) {
      if (e instanceof AppError) {
        throw e;
      }

      // Como os erros emitidos por todos os locais que podem dá erro aqui
      // são do tipo GENERAL_ERROR, então está tranquilo.
      throw new AppError(e.log, 400, { layer: e.layer, obs: e.obs });
    }
  }
};
