const { Router } = require("express");
const { enviromentTest } = require("../../../constants/config");
const { READ_USER } = require("../../../constants/permissionLevels");
const blankMiddleware = require("../../../helpers/blankMiddleware");
const {
  ensurePermission,
} = require("../../Users/middlewares/ensurePermission");

const EquipsController = require("../controllers/EquipsController");

/**
 *
 * @param {Object} RouterDTO
 * @param {import("../../../services/databases").DatabaseOutput} RouterDTO.db
 * @param {import("../services/API/AddOLTService").ScriptCallback} RouterDTO.foreverTrafficUpdate
 * @param {import("../services/API/AddOLTService").ScriptCallback} RouterDTO.ontInfoScript
 * @returns {Router}
 */
module.exports = () => {
  const router = Router();

  const equipsController = new EquipsController({});

  /**
   * Rota para obter todas as OLTs.
   * GET http://{{host}}/olts/
   */
  router.get(
    "/",
    enviromentTest !== "true" ? ensurePermission(READ_USER) : blankMiddleware,
    equipsController.index
  );

  return router;
};
