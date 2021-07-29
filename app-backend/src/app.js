require("dotenv").config();
const express = require("express");
require("express-async-errors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const http = require("http");
const cors = require("cors");
const { errors: celebrateErrors, Joi } = require("celebrate");

// Middlewares
const { errorMid } = require("./middlewares/error");
const { notFoundMid } = require("./middlewares/notfound");

// Eventos
const { onError, onListening } = require("./listening/server");
const { onWarning, onUnhandledRejection } = require("./listening/process");

// Modulos de Controle
const serverConfig = require("./constants/config");

// Modulos
const Profile = require("./modules/Users");
const Engine = require("./modules/Engine");

// Services
const Services = require("./services");

//
require("./providers");

async function server() {
  // Antes de Publicar qualquer coisa, validação do .env
  const dotenvSchema = Joi.object({
    APP_HOST: Joi.string().required(),
    APP_PORT: Joi.number().required(),
    APP_DOMAIN: Joi.string().required(),
    MYSQL_ROOT_USER: Joi.string().required(),
    MYSQL_ROOT_PASSWORD: Joi.string().required(),
    MYSQL_HOST: Joi.string().required(),
    MYSQL_PORT: Joi.number().required(),
    MYSQL_USER: Joi.string().required(),
    MYSQL_DATABASE: Joi.string().required(),
    MYSQL_PASSWORD: Joi.string().required(),
    ENVIROMENT_TEST: Joi.string().required(),
    ENVIROMENT_RUN_TASKS: Joi.string().required(),
    USER_ADMIN: Joi.string().required(),
    USER_ADMIN_NAME: Joi.string().required(),
    USER_ADMIN_PASSWORD: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRES_IN: Joi.string().required(),
    DEFAULT_TZ: Joi.string().required(),
  }).unknown(true);

  try {
    await dotenvSchema.validateAsync(process.env);
  } catch (e) {
    console.log(".env incompleto");
    process.exit(1);
  }

  const app = express();
  const server = http.createServer(app);

  // Pré-middlewares
  app.disable("etag");
  app.use(express.json());
  app.use(logger("dev"));
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(cors({ exposedHeaders: ["Authenticate"] }));

  // Declaração de serviços
  const { db } = Services();

  // Inicialização dos módulos
  Engine({ app, db });
  Profile({ app, db });

  /**
   * Middlewares para tratativas de erros.
   */
  app.use(celebrateErrors()); // Mid com os erros de validação.
  app.use(errorMid); // Mid de Error -> Padronização de erros
  app.use(notFoundMid); // Mid para o notfound

  // Configurando porta
  const port = Number(serverConfig.port || 5000);
  app.set("port", port);

  // Eventos do servidor
  server.on("error", onError(port));
  server.on("listening", onListening(server, serverConfig));

  // Colocando o servidor pra ouvir
  server.listen(port);
}

// Iniciando o server
server();

// Eventos do processo
process.on("warning", onWarning);
process.on("unhandledRejection", onUnhandledRejection);
