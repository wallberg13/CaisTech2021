const AppError = require("../../../shared/errors/AppError");

module.exports = class DeleteUserService {
  /**
   * @param {Object} updateParams
   * @param {import("../../../services/databases/knex/repositories/UsersRepository")} updateParams.usersRepository
   */
  constructor(updateParams) {
    const { usersRepository } = updateParams;
    this.usersRepository = usersRepository;
  }

  /**
   * Função para remover um usuário da base.
   * @param {Number} id
   */
  async exec(id) {
    try {
      await this.usersRepository.delete(id);
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
