const { compare, hash } = require("bcrypt");
module.exports = class HashProvider {
  /**
   * Função para gerar um hash utilizando o bcrypt.
   * @param {String} payload
   * @returns {String}
   */
  async generateHash(payload) {
    const hashStr = await hash(payload, 9); // gerando hash com 9 saltos.
    return hashStr;
  }

  /**
   * Função para comparar se uma string bate com uma hash.
   * @param {String} payload
   * @param {String} hashed
   * @returns {String}
   */
  async compare(payload, hashed) {
    const isEqual = compare(payload, hashed);
    return isEqual;
  }
};
