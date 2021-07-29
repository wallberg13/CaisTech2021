const AppError = require("../../../../shared/errors/AppError");

/**
 * Classe que possui o objetivo de realizar a listagem das OLTs.
 */
module.exports = class ListOLTService {
  /**
   *
   * @param {Object} serviceDepDTO
   * @param {import("../../../../services/databases/knex/repositories/OLTsRepository")} serviceDepDTO.oltsRepository
   */
  constructor(serviceDepDTO) {}

  /**
   *
   * @param {Array<Number>} olts_id
   * @returns {Promise<Object>}
   */
  async exec(olts_id) {
    try {
      const ret = [
        {
          id: 1,
          host: "10.0.0.1",
          port: 123,
          user: "admin",
          hostname: "CAIS TECH",
          snmp_community: null,
          olt_model_id: 3,
          model: "C320",
          software_version: "CAIS-TECH-V01.00",
          hardware_length: 23,
          description: "Teste do Cais Tech",
          code: "ZTEC3XX",
          olt_model: "ZTE - C3XX",
          active: 0,
          onts_online: 9000,
          onts_offline: 1000,
          onts_total: 10000,
          min_run_state_last_update: new Date("2021-07-29T00:00:00.000Z"),
          max_run_state_last_update: new Date("2021-07-29T00:00:00.000Z"),
          empty_slot_ports: 24,
          total_slot_ports: 128,
          empty_slots: 4,
          total_slots: 10,
        },
      ];

      return ret.sort((a, b) => b.onts_total - a.onts_total);
    } catch (e) {
      throw new AppError(e.log, 400, { layer: e.layer, obs: e.obs });
    }
  }
};
