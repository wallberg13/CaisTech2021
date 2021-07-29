const knex = require("knex");
const configurations = require("../../../../knexfile");

const config = configurations.development;

/** @type {knex} */
const db = knex(config);

module.exports = db;
