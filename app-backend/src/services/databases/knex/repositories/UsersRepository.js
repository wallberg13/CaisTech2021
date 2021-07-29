const User = require("../entities/User");
const db = require("../connection");
const { isUndefined } = require("lodash");
const {
  IS_NULL_OR_EMPTY_STRING,
  IS_ALL_UNDEFINED,
  SEARCH_KEY_UNDEFINED,
  VERIFY_UPDATE,
  THROW_SQL_ERROR,
} = require("../helpers/throwDatabaseError");

module.exports = class UsersRepository {
  constructor() {
    /**
     * @returns {import("knex").Knex.QueryBuilder<User.User, User.User>}
     */
    this.knex = () => db("users");
  }

  /**
   * Função para retornar todas as Users. Somente as que
   * não estão excluídas.
   * @returns {User.User[]}
   */
  async findAll() {
    try {
      const ret = await this.knex()
        .select(
          "users.id as user_id",
          "name",
          "username",
          "users.active as user_active",
          "p.id as profile_id",
          "p.description",
          "p.olts_id",
          "p.read_write"
        )
        .innerJoin("profiles as p", "p.id", "users.profile_id")
        .where({ "users.deleted": 0 });
      return ret;
    } catch (e) {
      throw THROW_SQL_ERROR(e.sqlMessage);
    }
  }

  /**
   * Função que retona quantos usuários existem com tal nome.
   * @param {String} username
   * @param {Array<Number>} excludes_id
   * @returns {Number}
   */
  async verifyUserName(username, excludes_id) {
    try {
      let excludes = excludes_id ? excludes_id : [];
      const [ret] = await this.knex()
        .select("*")
        .where({ "users.deleted": 0, "users.username": username })
        .whereNotIn("id", excludes);
      return ret;
    } catch (e) {
      console.log(e);
      throw THROW_SQL_ERROR(e.sqlMessage);
    }
  }

  /**
   * Função que faz uma procura de usuário por nome. Caso o usuário existir
   * na base de dados, não estiver excluído e estiver ativo, o mesmo
   * vai conseguir realizar o login.
   * @param {String} username
   * @returns {User.User}
   */
  async findByUsername(username) {
    try {
      const [ret] = await this.knex()
        .select(
          "users.id as user_id",
          "name",
          "username",
          "password",
          "profile_id",
          "p.olts_id",
          "p.read_write"
        )
        .innerJoin("profiles as p", "p.id", "users.profile_id")
        .where({
          "users.deleted": 0,
          "users.active": 1,
          "users.username": username,
        });
      return ret;
    } catch (e) {
      throw THROW_SQL_ERROR(e.sqlMessage);
    }
  }

  /**
   * Função para encontrar o repositório pelo o identificador
   * @param {Number} id
   * @returns {User.User}
   */
  async findById(id) {
    try {
      // Caso de Erro no ID
      SEARCH_KEY_UNDEFINED(id);

      const [ret] = await this.knex()
        .select(
          "users.id as user_id",
          "name",
          "username",
          "password",
          "users.active as active",
          "profile_id",
          "p.olts_id",
          "p.read_write"
        )
        .innerJoin("profiles as p", "p.id", "users.profile_id")
        .where({ "users.id": id, "users.deleted": 0 });

      return ret;
    } catch (e) {
      // SQL Error
      if (isUndefined(e.layer)) {
        throw THROW_SQL_ERROR(e.sqlMessage);
      }
      // Outros erros já capturados e repassados
      throw e;
    }
  }

  /**
   * Função para adicionar elementos em Users.
   * @param {User.User[]} data
   * @returns {Number[]}
   */
  async create(data) {
    try {
      const ret = await this.knex().insert(data);
      return ret;
    } catch (e) {
      throw THROW_SQL_ERROR(e.sqlMessage);
    }
  }

  /**
   * Alterando somente o pessoal que pode ser alterável para o usuário final (interface)
   * @param {User.User} data
   * @returns {Number} 1 - Sucesss, 0 - Unsucess.
   */
  async updateByUser(data) {
    try {
      const { id, profile_id, name, username, password, active } = data;

      // VERIFICAÇÕES PRÉVIAS
      SEARCH_KEY_UNDEFINED(id); // O id (chave primaria) deve ser definida
      IS_NULL_OR_EMPTY_STRING([name, username, password]); // Campos que nao podem ser atualizados para vazio, null (se for undefined nao e atualizado)
      IS_ALL_UNDEFINED([profile_id, name, username, password, active]); // Pelo menos um campo precisa ser diferente de undefined

      // EXECUÇÃO
      const ret = await this.knex()
        .where({ id, deleted: 0 })
        .update({ profile_id, name, username, password, active })
        .returning();

      // VERIFICAÇÕES APÓS ATUALIZAÇÃO
      VERIFY_UPDATE(ret);
      return ret;
    } catch (e) {
      // SQL Error
      if (isUndefined(e.layer)) {
        throw THROW_SQL_ERROR(e.sqlMessage);
      }
      // Outros erros já capturados e repassados
      throw e;
    }
  }

  /**
   * Função para realizar um soft-delete na User.
   * @param {Number}
   * @returns {Number} 1 - Sucess. 0 - Unsucess.
   */
  async delete(id) {
    try {
      // VERIFICAÇÕES PREVIAS
      SEARCH_KEY_UNDEFINED(id); // O id (chave primaria) deve ser definida

      // EXECUÇÃO
      const ret = await this.knex().where({ id }).update({ deleted: 1 });

      // VERIFICAÇÕES APÓS EXECUCAO
      VERIFY_UPDATE(ret);

      return ret;
    } catch (e) {
      // SQL Error
      if (isUndefined(e.layer)) {
        throw THROW_SQL_ERROR(e.sqlMessage);
      }
      // Outros erros já capturados e repassados
      throw e;
    }
  }
};
