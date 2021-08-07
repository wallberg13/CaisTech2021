const AppError = require("../../../shared/errors/AppError");

module.exports = class DeleteProfileService {
  /**
   * @param {Object} updateParams
   * @param {import("../../../services/databases/knex/repositories/ProfilesRepository")} updateParams.profilesRepository
   */
  constructor(updateParams) {
    const { profilesRepository } = updateParams;
    this.profilesRepository = profilesRepository;
  }

  /**
   * Execução do Script para adicionar uma OLT.
   * @param {Number} id
   */
  async exec(id) {
    try {
      await this.profilesRepository.delete(id);
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
