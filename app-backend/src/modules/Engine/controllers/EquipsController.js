const ListEquipService = require("../services/ListEquipService");

module.exports = class OLTsController {
  constructor({}) {
    this.index = this.index.bind(this);
  }

  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async index(req, res) {
    // Obtendo o corpo da requisição.

    const { equips_id } = req.userPermission;

    const listEquipService = new ListEquipService({});

    const list = await listEquipService.exec(equips_id);

    return res.json(list);
  }
};
