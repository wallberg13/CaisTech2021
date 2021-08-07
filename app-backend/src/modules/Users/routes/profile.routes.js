const { celebrate, Segments, Joi } = require("celebrate");
const { Router } = require("express");
const { enviromentTest } = require("../../../constants/config");
const { ADMIN_USER } = require("../../../constants/permissionLevels");
const ProfilesController = require("../controller/ProfilesController");
const { ensurePermission } = require("../middlewares/ensurePermission");

/**
 *
 * @param {Object} RouterDTO
 * @param {import("../../../services/databases").DatabaseOutput} RouterDTO.db
 * @returns {Router}
 */
module.exports = ({ db }) => {
  const router = Router();

  const { profilesRepository } = db.knex;

  const profilesController = new ProfilesController({ profilesRepository });

  if (enviromentTest !== "true") {
    router.use("/", ensurePermission(ADMIN_USER));
  }

  /**
   * Rota pra criação de novos profiles
   */
  router.post(
    "/",
    celebrate({
      [Segments.BODY]: {
        description: Joi.string().required(),
        equips_id: Joi.array().items(Joi.number()).min(0),
        read_write: Joi.number().required(),
      },
    }),
    profilesController.create
  );

  /**
   * Rota pra criação de novos profiles
   * GET http://{{host}}/profiles/
   */
  router.get("/", profilesController.index);

  /**
   * Rota para editar profiles
   * PUT http://{{host}}/profiles/:id
   */
  router.put(
    "/:id",
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.number().required(),
      },
      [Segments.BODY]: {
        description: Joi.string(),
        equips_id: Joi.array().items(Joi.number()).min(0),
        read_write: Joi.number(),
        active: Joi.boolean(),
      },
    }),
    profilesController.update
  );

  /**
   * Rota para remover profiles
   * DELETE http://{{host}}/profiles/:id
   */
  router.delete(
    "/:id",
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.number().required(),
      },
    }),
    profilesController.delete
  );

  return router;
};
