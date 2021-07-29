const { celebrate, Segments, Joi } = require("celebrate");
const { Router } = require("express");
const { enviromentTest } = require("../../../constants/config");
const { ADMIN_USER } = require("../../../constants/permissionLevels");
const blankMiddleware = require("../../../helpers/blankMiddleware");

const UsersController = require("../controller/UsersController");
const { ensurePermission } = require("../middlewares/ensurePermission");

/**
 *
 * @param {Object} RouterDTO
 * @param {import("../../../services/databases").DatabaseOutput} RouterDTO.db
 * @returns {Router}
 */
module.exports = ({ db }) => {
  const router = Router();

  const { usersRepository } = db.knex;

  const usersController = new UsersController({ usersRepository });

  /**
   * Rota para adicionar novo usuario
   * POST http://{{host}}/users
   */
  router.post(
    "/",
    enviromentTest !== "true" ? ensurePermission(ADMIN_USER) : blankMiddleware,
    celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        username: Joi.string().email().required(),
        password: Joi.string().required(),
        profile_id: Joi.number().required(),
      },
    }),
    usersController.create
  );

  /**
   * Rota para alterar novo usuario
   * PUT http://{{host}}/users
   */
  router.put(
    "/:id",
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.number().required(),
      },
      [Segments.BODY]: {
        name: Joi.string(),
        username: Joi.string().email(),
        password: Joi.string(),
        old_password: Joi.string(),
        profile_id: Joi.number(),
        active: Joi.number(),
      },
    }),
    usersController.update
  );

  /**
   * Rota para listar profiles
   * GET http://{{host}}/users
   */
  router.get(
    "/",
    enviromentTest !== "true" ? ensurePermission(ADMIN_USER) : blankMiddleware,
    usersController.index
  );

  /**
   * Rota para remover usuarios
   * DELETE http://{{host}}/users/:id
   */
  router.delete(
    "/:id",
    enviromentTest !== "true" ? ensurePermission(ADMIN_USER) : blankMiddleware,
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.number().required(),
      },
    }),
    usersController.delete
  );

  return router;
};
