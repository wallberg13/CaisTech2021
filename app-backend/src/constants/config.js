const ip = process.env.APP_HOST;
const port = process.env.APP_PORT;
const domain = process.env.APP_DOMAIN;
const enviromentTest = process.env.ENVIROMENT_TEST;

const DEBUG_MODE = true;

const jwt = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN,
};

module.exports = {
  // Informações de infraestrutura
  ip,
  port,
  domain,

  // Informações de ambiente
  enviromentTest,

  // Bot de Teste
  DEBUG_MODE,

  // Token JWT
  jwt,
};
