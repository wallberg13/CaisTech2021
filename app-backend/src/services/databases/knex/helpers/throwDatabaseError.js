const { isNull, isUndefined } = require("lodash");
const { RETURN_ERROR, DATABASE_LAYER } = require("../../../../helpers/error");
const {
  FIELDS_UNDEFINED,
  MANDATORY_FIELD_NULL_OR_EMPTY,
  OPERATION_ERROR,
  SQL_ERROR,
  SEARCH_KEY_UNDEFINED,
} = require("../../constants/errors");

module.exports = {
  /**
   * Função para verificar se pelo menos um elemento é nulo ou vazio.
   * Retorna "true" caso possua alguém nessa condição.
   * @param {Array<Any>} args
   */
  IS_NULL_OR_EMPTY_STRING: (args) => {
    // Erro começa false
    let error = false;
    // Caso algum elemento for nulo ou vazio, será retornado true
    args.map((o) => {
      error |= isNull(o) || String(o) === "";
    });

    if (error) {
      throw RETURN_ERROR(MANDATORY_FIELD_NULL_OR_EMPTY, DATABASE_LAYER);
    }
  },

  /**
   * Função para verificar se todos os elementos são undefined.
   * Retorna true caso todos os elementos forem undefined.
   * @param {Array<Any>} args
   */
  IS_ALL_UNDEFINED: (args) => {
    let error = true;

    args.map((o) => {
      error &= isUndefined(o);
    });

    if (error) {
      throw RETURN_ERROR(FIELDS_UNDEFINED, DATABASE_LAYER);
    }
  },

  /**
   * Função que possui o unico objetivo de lançar um erro caso um ID não for definido na
   * chamada de algum provider.
   * @throws Emitido um erro generico caso a variavel em questao for undefined ou nula.
   */
  SEARCH_KEY_UNDEFINED: (id) => {
    if (isNull(id) || isUndefined(id)) {
      throw RETURN_ERROR(SEARCH_KEY_UNDEFINED, DATABASE_LAYER);
    }
  },

  /**
   * Função para verificar se houve um eror no update,
   * caso tiver, é emitido um erro
   * @param {Number} flag
   */
  VERIFY_UPDATE: (flag) => {
    if (!flag) {
      throw RETURN_ERROR(OPERATION_ERROR, DATABASE_LAYER);
    }
  },

  /**
   * Emitindo mensagem de erros para casos de error de SQL
   * @param {String} msg
   */
  THROW_SQL_ERROR: (msg) => {
    return RETURN_ERROR(SQL_ERROR + " => " + msg, DATABASE_LAYER);
  },
};
