const { celebrate, Segments, Joi } = require("celebrate");
const { Router } = require("express");
const AuthController = require("../controller/AuthController");
const { ensureAuthenticated } = require("../middlewares/ensureAuthenticated");

/**
 *
 * @param {Object} RouterDTO
 * @param {import("../../../services/databases").DatabaseOutput} RouterDTO.db
 * @returns {Router}
 */
module.exports = ({ db }) => {
  const router = Router();

  const { usersRepository } = db.knex;

  const authController = new AuthController({
    usersRepository,
  });

  /**
   * Rota para adicionar novo usuario
   * POST http://{{host}}/auth
   */
  router.post(
    "/",
    celebrate({
      [Segments.BODY]: {
        username: Joi.string().email().required(),
        password: Joi.string().required(),
      },
    }),
    authController.create
  );

  /**
   * Rota para verificar se o token é valido
   * GET http://{{host}}/auth/verify_token
   */
  router.get("/verify_token", ensureAuthenticated, authController.index);

  return router;
};
