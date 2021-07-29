const AppError = require("../../../shared/errors/AppError");

/**
 * Classe que possui o objetivo de realizar a listagem das OLTs.
 */
module.exports = class ListUserService {
  /**
   *
   * @param {Object} listDTO
   * @param {import("../../../services/databases/knex/repositories/UsersRepository")} listDTO.usersRepository
   */
  constructor(listDTO) {
    const { usersRepository } = listDTO;
    this.usersRepository = usersRepository;
  }

  /**
   *
   * @returns {Promise<import("../../../services/databases/knex/entities/User").User[]>}
   */
  async exec() {
    try {
      const list = await this.usersRepository.findAll();

      return list;
    } catch (e) {
      throw new AppError(e.log, 400, { layer: e.layer, obs: e.obs });
    }
  }
};
