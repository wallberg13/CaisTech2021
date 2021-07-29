const { verify } = require("jsonwebtoken");
const { jwt } = require("../../../constants/config");
const AppError = require("../../../shared/errors/AppError");

/**
 * @typedef Subscription
 * @property {Number} id
 * @property {Array<Number>} olts_id
 * @property {Number} read_write
 *
 */

module.exports = {
  /**
   * Função que possui como objetivo, garantir que o usuário esteja
   * autenticado.
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  ensureAuthenticated: async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new AppError("Token JWT não encontrado", 401);
    }

    const token = authorization.split(" ")[1];

    try {
      const { sub } = verify(token, jwt.secret);
      /** @type {Subscription} */
      const userPermission = JSON.parse(sub);

      // Injetando as permissões de usuário.
      req.userPermission = userPermission;

      if (userPermission.olts_id) {
        req.userPermission.olts_id = userPermission.olts_id
          .split(",")
          .map((id) => Number(id));
      }

      // Indo para a proxima rota.
      next();
    } catch (e) {
      throw new AppError("Token Inválido", 401);
    }
  },
};
