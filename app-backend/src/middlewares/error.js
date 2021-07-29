const AppError = require("../shared/errors/AppError");

module.exports = {
  /**
   * Callback para padronização dps erros levantados pela API
   * @param {Error} err
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} _
   */
  errorMid(err, req, res, _) {
    if (err instanceof AppError) {
      return res
        .status(err.httpCode)
        .json({ error: true, message: err.message, data: err.details });
    }

    console.log(err);

    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
      detail: err,
    });
  },
};
