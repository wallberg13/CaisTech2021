const Profile = require("../entities/Profile");
const db = require("../connection");
const { isUndefined } = require("lodash");
const {
  IS_NULL_OR_EMPTY_STRING,
  IS_ALL_UNDEFINED,
  SEARCH_KEY_UNDEFINED,
  VERIFY_UPDATE,
  THROW_SQL_ERROR,
} = require("../helpers/throwDatabaseError");

module.exports = class ProfilesRepository {
  constructor() {
    /**
     * @returns {import("knex").Knex.QueryBuilder<Profile.Profile, Profile.Profile>}
     */
    this.knex = () => db("profiles");
  }

  /**
   * Função para retornar todas as Profiles. Somente as que
   * não estão excluídas.
   * @returns {Profile.Profile[]}
   */
  async findAll() {
    try {
      const ret = await this.knex().select("*").where({ deleted: 0 });
      return ret;
    } catch (e) {
      throw THROW_SQL_ERROR(e.sqlMessage);
    }
  }

  /**
   *
   * @param {Number} id
   * @returns {Profile.Profile[]}
   */
  async findById(id) {
    try {
      // Caso de Erro no ID
      SEARCH_KEY_UNDEFINED(id);

      const ret = await this.knex().where({ id, deleted: 0 });

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
   * Função para adicionar elementos em Profiles.
   * @param {Profile.Profile[]} data
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
   * @param {Profile.Profile} data
   * @returns {Number} 1 - Sucesss, 0 - Unsucess.
   */
  async updateByUser(data) {
    try {
      const { id, description, olts_id, read_write, active } = data;

      // VERIFICAÇÕES PRÉVIAS
      SEARCH_KEY_UNDEFINED(id); // O id (chave primaria) deve ser definida
      IS_NULL_OR_EMPTY_STRING([description]); // Campos que nao podem ser atualizados para vazio, null (se for undefined nao e atualizado)
      IS_ALL_UNDEFINED([description, olts_id, read_write, active]); // Pelo menos um campo precisa ser diferente de undefined

      // EXECUÇÃO
      const ret = await this.knex()
        .where({ id, deleted: 0 })
        .update({ description, olts_id, read_write, active })
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
   * Função para realizar um soft-delete na Profile.
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
