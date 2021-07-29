const knex2 = require("knex");

/**
 * Em caso de up
 * @param {knex2} knex
 */
exports.up = function (knex) {
  return knex.schema.createTable("profiles", (table) => {
    table.increments();

    table.string("description").unique().notNullable();

    table.string("olts_id");

    table.boolean("read_write").notNullable().defaultTo(false);

    table.boolean("active").defaultTo(true);
    table.timestamps(false, true);

    table.boolean("deleted").defaultTo(0);
  });
};

/**
 * Em caso de down
 * @param {knex2} knex
 */
exports.down = async function (knex) {
  // Dropando a tabela
  await knex.schema.dropTable("profiles");
  return;
};
