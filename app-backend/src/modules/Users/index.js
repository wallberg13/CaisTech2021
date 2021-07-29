const profileRoutes = require("./routes/profile.routes");
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const { enviromentTest } = require("../../constants/config");
const { ensureAuthenticated } = require("./middlewares/ensureAuthenticated");

/**
 * Função que declara o módulo de usuário.
 * @param {Object} UserModuleDTO
 * @param {import("express").Express} UserModuleDTO.app
 * @param {import("../../services/databases").DatabaseOutput} UserModuleDTO.db
 */
module.exports = ({ app, db }) => {
  if (enviromentTest !== "true") {
    app.use("/api/profiles", ensureAuthenticated);
    app.use("/api/users", ensureAuthenticated);
  }

  app.use("/api/profiles", profileRoutes({ db }));
  app.use("/api/users", userRoutes({ db }));
  app.use("/api/auth", authRoutes({ db }));
};
