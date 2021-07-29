require("dotenv").config();
// Obtendo .env na intencao de ter as senhas
// Update with your config settings.

module.exports = {
  development: {
    client: "mysql2",
    connection: {
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      user: process.env.MYSQL_ROOT_USER,
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      timezone: "+00:00", // Não sei pq, mas funcionou para o Brazil
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./src/services/databases/knex/migrations",
    },
    seeds: {
      directory: "./src/services/databases/knex/seeds",
    },
    useNullAsDefault: true,
  },

  /**
   * Trigger para automatizar o processo de updated_at.
   * A mesma vai fazer executar uma função para atualizar o updated_at
   * no banco de dados.
   * @param {String} table
   */
  onUpdateTrigger: (table) => `
CREATE TRIGGER \`${table}_updated_at\`
BEFORE UPDATE ON \`${table}\`
FOR EACH ROW
SET NEW.updated_at = now();
  `,

  deleteTriggerOnUpdate: (table) => `
DROP TRIGGER IF EXISTS ${process.env.MYSQL_DATABASE}.${table}_updated_at
  `,
};
