const knex2 = require("knex");

/**
 * Em caso de up
 * @param {knex2} knex
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments();

    table
      .integer("profile_id")
      .unsigned()
      .references("profiles.id")
      .notNullable();

    table.string("name").notNullable();

    table.string("username").notNullable().unique();

    table.string("password").notNullable();

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
  // Dropando a chave estrangeira
  await knex.schema.table("users", (table) => {
    table.dropForeign(["profile_id"]);
  });
  // Dropando a tabela
  await knex.schema.dropTable("users");
  return;
};
