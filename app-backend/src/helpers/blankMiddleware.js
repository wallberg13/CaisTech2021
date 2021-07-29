/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const blankMiddleware = (req, res, next) => {
  return next();
};

module.exports = blankMiddleware;
