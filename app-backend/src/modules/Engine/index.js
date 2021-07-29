const oltRoutes = require("./routes/olts.routes");

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
  // Talvez, estas funções sejam melhor encaixadas em outro lugar.
  // services({ db });
  /**
   * Garantindo que os acessos às subrotas aqui contidas
   * possuam autenticação.
   */
  if (enviromentTest !== "true") {
    app.use("/api/olts", ensureAuthenticated);
  }

  app.use("/api/olts", oltRoutes({ db }));
};
