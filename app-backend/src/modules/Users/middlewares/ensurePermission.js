const AppError = require("../../../shared/errors/AppError");

module.exports = {
  /**
   *
   * @param {Number} permission_require_level
   */
  ensurePermission: (permission_require_level) => {
    /**
     *
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     * @param {import("express").NextFunction} next
     */
    return (req, res, next) => {
      const { read_write } = req.userPermission;

      if (permission_require_level > read_write) {
        throw new AppError("Rota não permitida para usuário!!", 401);
      }

      next();
    };
  },
};
