const { format } = require("date-fns");

module.exports = {
  /**
   *
   * @param {String} respCmd
   * @param {Number} layer
   * @returns {GenericError}
   */
  RETURN_ERROR(respCmd, layer) {
    return { error: true, log: respCmd, layer: layer };
  },

  /**
   * Como todos os erros possuem o mesmo padrão, em casos de erro
   * em cascatas, o mesmos são reescritos.
   * @param {GenericError} error
   * @param {String} host
   * @param {String} hostname
   * @param {String} obs
   * @returns {CompleteError}
   */
  COMPLETE_ERROR(error, host, hostname, obs) {
    return { ...error, host, hostname, obs };
  },

  /**
   * @param {CompleteError} error
   * @param {String} model
   * @returns {GeneralError}
   */
  GENERAL_ERROR(error, oltModel) {
    return { ...error, oltModel };
  },

  PROTOCOL_LAYER: 1,
  PARSE_LAYER: 2,
  EXECUTATION_LAYER: 3,
  DISPATCHER_LAYER: 4,
  DATABASE_LAYER: 5,

  THROW_BY_CODE_LAYER: 100,
};
