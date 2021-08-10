const AppError = require("../../../shared/errors/AppError");

module.exports = class ListOLTService {
  /**
   *
   * @param {Array<Number>} equips_id
   * @returns {Promise<Object>}
   */
  async exec() {
    try {
      const ret = [
        {
          id: 1,
          host: "10.0.0.1",
          port: 123,
          user: "admin",
          hostname: "CAIS TECH",
        },
      ];

      return ret;
    } catch (e) {
      throw new AppError(e.log, 400, { layer: e.layer, obs: e.obs });
    }
  }
};
