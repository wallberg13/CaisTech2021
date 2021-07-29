const AppError = require("../../../shared/errors/AppError");

/**
 * @typedef UpdateDTO
 * @property {Number} id
 * @property {String} description
 * @property {String} olts_id
 * @property {Boolean} read_write
 * @property {Boolean} active
 */

/**
 * Classe que possu como objetivo, realizar o update de algumas informações
 * da OLT.
 */
module.exports = class UpdateProfileService {
  /**
   *
   * @param {Object} listDTO
   * @param {import("../../../services/databases/knex/repositories/ProfilesRepository")} listDTO.profilesRepository
   */
  constructor(listDTO) {
    const { profilesRepository } = listDTO;

    this.profilesRepository = profilesRepository;
  }

  /**
   *
   * @param {UpdateDTO} updateDTO
   * @returns {Promise<void>}
   */
  async exec(updateDTO) {
    try {
      const { id, active, description, olts_id, read_write } = updateDTO;

      await this.profilesRepository.updateByUser({
        id,
        active,
        description,
        olts_id,
        read_write,
      });
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
