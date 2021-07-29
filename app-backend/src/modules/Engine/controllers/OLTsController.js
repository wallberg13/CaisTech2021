const ListOLTsService = require("../services/API/ListOLTService");

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

    const { olts_id } = req.userPermission;

    const listOLTsService = new ListOLTsService({});

    const list = await listOLTsService.exec(olts_id);

    return res.json(list);
  }
};
