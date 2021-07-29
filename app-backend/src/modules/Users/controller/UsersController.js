const AddUserService = require("../services/AddUserService");
const ListUserService = require("../services/ListUserService");
const UpdateUserService = require("../services/UpdateUserService");
const DeleteUserService = require("../services/DeleteUserService");

module.exports = class UsersController {
  /**
   * Construtor para que o mesmo possua suas dependências injetadas de fora.
   * @param {Object} ControllerDTO
   * @param {import("../../../services/databases/knex/repositories/UsersRepository")} ControllerDTO.usersRepository
   */
  constructor({ usersRepository }) {
    this.usersRepository = usersRepository;

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

    const addUserService = new AddUserService({
      usersRepository: this.usersRepository,
    });

    const resp = await addUserService.exec(body);

    return res.json(resp);
  }

  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async index(req, res) {
    const listUserService = new ListUserService({
      usersRepository: this.usersRepository,
    });

    let list = await listUserService.exec();

    list = list.map((user) => {
      user.read_write = [user.read_write];
      return user;
    });

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

    const updateUserService = new UpdateUserService({
      usersRepository: this.usersRepository,
    });

    await updateUserService.exec({ id, ...body });

    return res.status(204).send();
  }

  /**
   * Controller para realizar a exclusão de uma OLT no software.
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async delete(req, res) {
    const { id } = req.params;

    const deleteUserService = new DeleteUserService({
      usersRepository: this.usersRepository,
    });

    await deleteUserService.exec(id);

    return res.status(204).send();
  }
};
