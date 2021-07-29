/**
 * Classe com o padrão básico de erro.
 */
module.exports = class AppError {
  /**
   *
   * @param {String} message
   * @param {Number} httpCode
   */
  constructor(message, httpCode, details) {
    this.message = message;
    this.details = details;
    this.httpCode = httpCode || 400;
  }
};
