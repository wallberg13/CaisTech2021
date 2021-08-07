const AddProfileService = require("../services/AddProfileService");
const DeleteProfileService = require("../services/DeleteProfileService");
const ListProfileService = require("../services/ListProfileService");
const UpdateProfileService = require("../services/UpdateProfileService");

module.exports = class ProfilesController {
  /**
   * Construtor para que o mesmo possua suas dependências injetadas de fora.
   * @param {Object} ControllerDTO
   * @param {import("../../../services/databases/knex/repositories/ProfilesRepository")} ControllerDTO.profilesRepository
   */
  constructor({ profilesRepository }) {
    this.profilesRepository = profilesRepository;

    // Não perdendo o contexto quando os metodos presentes aqui forem executados partindo
    // de outros contextos.
    this.create = this.create.bind(this);
    this.index = this.index.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async create(req, res) {
    const { body } = req;

    body.equips_id =
      body.equips_id.length === 0 ? null : body.equips_id.join(",");

    const addProfileRepository = new AddProfileService({
      profilesRepository: this.profilesRepository,
    });

    const resp = await addProfileRepository.exec(body);

    return res.json(resp);
  }

  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async index(req, res) {
    const listProfileService = new ListProfileService({
      profilesRepository: this.profilesRepository,
    });

    const list = await listProfileService.exec();

    return res.json(list);
  }

  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async update(req, res) {
    const { id } = req.params;
    const body = req.body;

    body.equips_id =
      body.equips_id.length === 0 ? null : body.equips_id.join(",");

    const updateProfileService = new UpdateProfileService({
      profilesRepository: this.profilesRepository,
    });

    await updateProfileService.exec({ id, ...body });

    return res.status(204).send();
  }

  /**
   * Controller para realizar a exclusão de uma OLT no software.
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async delete(req, res) {
    const { id } = req.params;

    const deleteProfileService = new DeleteProfileService({
      profilesRepository: this.profilesRepository,
    });

    await deleteProfileService.exec(id);

    return res.status(204).send();
  }
};
