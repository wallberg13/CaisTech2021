const AddAuthService = require("../services/AddAuthService");
const GetAuthUserService = require("../services/GetAuthUserService");

module.exports = class ProfilesController {
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
  }

  /**
   * Função para realizar autenticação de usuário.
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async create(req, res) {
    const { username, password } = req.body;

    const addAuthService = new AddAuthService({
      usersRepository: this.usersRepository,
    });

    const ret = await addAuthService.exec({ username, password });

    return res.json(ret);
  }

  async index(req, res) {
    const { id } = req.userPermission;

    const getAuthUserService = new GetAuthUserService({
      usersRepository: this.usersRepository,
    });

    const ret = await getAuthUserService.exec(id);

    return res.json(ret);
  }
};
