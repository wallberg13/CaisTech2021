require("dotenv").config();
const BCrypt = require("../../../../providers/BCrypt");

const bcrypt = new BCrypt();

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("profiles").del();

  await knex("profiles").insert([
    {
      id: 1,
      description: "Usuário Root - Todas os Equipamentos",
      read_write: 2,
      active: 1,
    },
    {
      id: 2,
      description: "Usuário de Escrita - Todas os Equipamentos",
      read_write: 1,
      active: 1,
    },
    {
      id: 3,
      description: "Usuário de Leitura - Todas os Equipamentos",
      read_write: 0,
      active: 1,
    },
  ]);

  const hashedPassword = await bcrypt.generateHash(
    process.env.USER_ADMIN_PASSWORD
  );

  await knex("users").insert([
    {
      id: 1,
      profile_id: 1,
      name: process.env.USER_ADMIN_NAME,
      username: process.env.USER_ADMIN,
      password: hashedPassword,
      active: 1,
    },
  ]);
};
