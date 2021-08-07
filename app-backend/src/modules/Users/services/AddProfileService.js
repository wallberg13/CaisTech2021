const AppError = require("../../../shared/errors/AppError");

/**
 * @typedef AddProfileDTO
 * @property {String} description
 * @property {String} equips_id
 * @property {Number} read_write
 */

module.exports = class AddProfileService {
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
   * @param {AddProfileDTO} profileDTO
   */
  async exec(profileDTO) {
    try {
      await this.profilesRepository.create([profileDTO]);

      return { status: true, mensagem: "Profile adicionado com sucesso!!" };
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
