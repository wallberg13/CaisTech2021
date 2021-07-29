const AppError = require("../../../shared/errors/AppError");

module.exports = {
  /**
   * Função que serve para garantir que o usuário tenha
   * permissão de acessar a OLT que o mesmo deseja.
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  ensureOLTFilter: (req, res, next) => {
    /** @type {import("./ensureAuthenticated").Subscription} */
    const userPermission = req.userPermission;
    const { olts_id } = userPermission;
    const { olt_id, id } = req.params;

    const oltParam = olt_id ? Number(olt_id) : Number(id);

    if (!oltParam || !olts_id || olts_id.includes(oltParam)) {
      return next();
    }

    throw new AppError(
      "Usuário não autorizado para realizar ações nesta OLT!",
      401
    );
  },
};
