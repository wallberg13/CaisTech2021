const { format } = require("date-fns");

/**
 * @typedef GenericError
 * @property {Boolean} error
 * @property {String} log
 * @property {Number} layer
 */

/**
 * @typedef CompleteError
 * @property {Boolean} error
 * @property {String} log
 * @property {Number} layer
 * @property {String} host
 * @property {String} hostname
 * @property {String} obs
 */

/**
 * @typedef GeneralError
 * @property {Boolean} error
 * @property {String} log
 * @property {Number} layer
 * @property {String} host
 * @property {String} hostname
 * @property {String} obs
 * @property {String} oltModel
 */

/**
 * @typedef TaskError
 * @property {Boolean} error
 * @property {String} log
 * @property {Number} layer
 * @property {String} host
 * @property {String} hostname
 * @property {String} obs
 * @property {String} oltModel
 * @property {String} context
 * @property {Date} dateTime
 */

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

  /**
   * Função para gerar erros decorrente das camadas anteriores nas
   * Tasks. Este mesmo possuí como objetivo criar um report de erros.
   * @param {GeneralError} error
   * @param {String} context
   * @param {Date} dateTime
   * @returns {TaskError}
   */
  TASK_ERROR(error, context, dateTime) {
    return { ...error, context, dateTime, error: true };
  },

  /**
   * Função para exibir em tela uma mensagem de alerta a respeito
   * do uso de CPU da OLT.
   * @param {String} host
   * @param {String} hostname
   * @param {Number} cpuLimit
   * @param {Number} cpuActual
   */
  ALERT_CPU(host, hostname, cpuLimit, cpuActual) {
    console.log(
      "\x1b[33m%s\x1b[0m",
      `[${format(
        new Date(),
        "dd-MM-yyyy HH:mm:ss"
      )}] - A OLT ${hostname}/${host} está com ${cpuActual}% onde seu limite é ${cpuLimit}%`
    );
  },

  /**
   * Função para exibir em tela uma mensagem de alerta a respeito
   * do uso de CPU da OLT.
   * @param {String} host
   * @param {String} hostname
   * @param {Number} cpuLimit
   * @param {Number} cpuActual
   */
  LOG_ALERT(string) {
    console.log("\x1b[33m%s\x1b[0m", `${string}`);
  },

  LOG_ERROR(host, hostname, cmd, slot, port) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      `[${format(
        new Date(),
        "dd-MM-yyyy HH:mm:ss"
      )}] - A OLT ${hostname}/${host} apresentou erro no ${cmd} em ${slot} e ${port}`
    );
  },

  /**
   *
   * @param {String} log
   */
  LOG_VERMELHO(log) {
    console.log("\x1b[31m%s\x1b[0m", log);
  },

  PROTOCOL_LAYER: 1,
  PARSE_LAYER: 2,
  EXECUTATION_LAYER: 3,
  DISPATCHER_LAYER: 4,
  DATABASE_LAYER: 5,

  THROW_BY_CODE_LAYER: 100,
};
