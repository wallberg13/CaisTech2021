const equipsRoutes = require("./routes/equips.routes");

const { enviromentTest } = require("../../constants/config");
const {
  ensureAuthenticated,
} = require("../Users/middlewares/ensureAuthenticated");

/**
 * Função que declara o módulo de engine. Tal função possui como responsabilidade,
 * receber a injeção de dependencia de outros modulos.
 * @param {Object} EngineInjectDTO
 * @param {import("express").Express} EngineInjectDTO.app
 * @param {import("../../services/databases").DatabaseOutput} EngineInjectDTO.db
 */
module.exports = ({ app, db }) => {
  if (enviromentTest !== "true") {
    app.use("/api/equips", ensureAuthenticated);
  }

  app.use("/api/equips", equipsRoutes({ db }));
};
