const { sign } = require("jsonwebtoken");
const AppError = require("../../../shared/errors/AppError");
const BCrypt = require("../../../providers/BCrypt");
const { jwt } = require("../../../constants/config");

/**
 * @typedef AuthDTO
 * @property {String} username
 * @property {String} password
 */

module.exports = class GetAuthUserService {
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
   * @param {Number} user_id
   */
  async exec(user_id) {
    try {
      const userDB = await this.usersRepository.findById(user_id);

      // Verificando se o usuário solicitado existe na base de dados.
      if (!userDB) {
        throw new AppError("Usuário não existe", 400);
      }

      delete userDB.password;
      delete userDB.profile_id;
      delete userDB.equips_id;
      delete userDB.active;
      userDB.read_write = [userDB.read_write];

      return { user: userDB };
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
