const knex2 = require("knex");
const {
  onUpdateTrigger,
  deleteTriggerOnUpdate,
} = require("../../../../../knexfile");

/**
 * Em caso de up
 * @param {knex2} knex
 */
exports.up = async function (knex) {
  await Promise.all([
    knex.raw(onUpdateTrigger("users")),
    knex.raw(onUpdateTrigger("profiles")),
  ]);
};

/**
 * Em caso de down
 * @param {knex2} knex
 */
exports.down = async function (knex) {
  await Promise.all([
    knex.raw(deleteTriggerOnUpdate("users")),
    knex.raw(deleteTriggerOnUpdate("profiles")),
  ]);
};
