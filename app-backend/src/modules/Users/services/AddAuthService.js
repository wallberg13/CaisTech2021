const { sign } = require("jsonwebtoken");
const AppError = require("../../../shared/errors/AppError");
const BCrypt = require("../../../providers/BCrypt");
const { jwt } = require("../../../constants/config");

/**
 * @typedef AuthDTO
 * @property {String} username
 * @property {String} password
 */

/**
 * Classe que possui como objetivo, realizar o processo de adição
 * de uma OLT no OLTZ.
 */
module.exports = class AddAuthService {
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
   * @param {AuthDTO} authDTO
   */
  async exec(authDTO) {
    try {
      const { username, password } = authDTO;

      const userDB = await this.usersRepository.findByUsername(username);

      // Verificando se o usuário solicitado existe na base de dados.
      if (!userDB) {
        throw new AppError("Username / Senha incorretos!!!", 401);
      }

      const checkPass = await this.bcrypt.compare(password, userDB.password);

      // Verificando se a senha do usuário bate.
      if (!checkPass) {
        throw new AppError("Username / Senha incorretos!!", 401);
      }

      // Gerando o token JWT
      const token = sign({}, jwt.secret, {
        subject: JSON.stringify({
          id: userDB.user_id,
          olts_id: userDB.olts_id,
          read_write: userDB.read_write,
        }), // Jogando como subject, apenas os itens de permissão
        expiresIn: jwt.expiresIn,
      });

      delete userDB.password;
      delete userDB.profile_id;
      delete userDB.olts_id;
      userDB.read_write = [userDB.read_write];

      return { token, user: userDB };
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
