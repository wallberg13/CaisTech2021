const knex = require("./knex");

/**
 * Arquivo que possui como objetivo, exportar todos os serviços de banco de dados
 * utilizados nesta aplicação de forma encapsulada.
 */

/**
 * @typedef DatabaseOutput
 * @property {import("./knex").KnexModule} knex
 */

module.exports = {
  knex,
};
