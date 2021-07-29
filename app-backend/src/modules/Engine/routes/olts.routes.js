const { Router } = require("express");
const { enviromentTest } = require("../../../constants/config");
const { READ_USER } = require("../../../constants/permissionLevels");
const blankMiddleware = require("../../../helpers/blankMiddleware");
const {
  ensurePermission,
} = require("../../Users/middlewares/ensurePermission");

const OLTsController = require("../controllers/OLTsController");

/**
 *
 * @param {Object} RouterDTO
 * @param {import("../../../services/databases").DatabaseOutput} RouterDTO.db
 * @param {import("../services/API/AddOLTService").ScriptCallback} RouterDTO.foreverTrafficUpdate
 * @param {import("../services/API/AddOLTService").ScriptCallback} RouterDTO.ontInfoScript
 * @returns {Router}
 */
module.exports = ({ db, foreverTrafficUpdate, ontInfoScript }) => {
  const router = Router();

  const oltController = new OLTsController({});

  /**
   * Rota para obter todas as OLTs.
   * GET http://{{host}}/olts/
   */
  router.get(
    "/",
    enviromentTest !== "true" ? ensurePermission(READ_USER) : blankMiddleware,
    oltController.index
  );

  return router;
};
