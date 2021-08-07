const { isNull } = require("lodash");
const AppError = require("../../../shared/errors/AppError");

module.exports = class ListOLTsStatsService {
  /**
   * @param {Object} updateParams
   * @param {import("../../../services/databases/knex/repositories/ProfilesRepository")} updateParams.profilesRepository
   */
  constructor(updateParams) {
    const { profilesRepository } = updateParams;
    this.profilesRepository = profilesRepository;
  }

  /**
   * @param {Number} olt_id
   * @returns {import("../../../services/databases/knex/entities/OLTSlot").OLTSlot[]}
   */
  async exec() {
    try {
      const listProfiles = await this.profilesRepository.findAll();

      const ret = listProfiles.map((lp) => {
        lp.equips_id = (
          isNull(lp.equips_id) ? [] : lp.equips_id.split(",")
        ).map((o) => Number(o));

        return lp;
      });

      return ret;
    } catch (e) {
      throw new AppError(e.log, 400, { layer: e.layer, obs: e.obs });
    }
  }
};
