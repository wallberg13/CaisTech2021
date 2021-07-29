module.exports = {
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  notFoundMid(req, res) {
    return res.status(404).json({
      error: true,
      timestamp: new Date(),
      message: "¿O que Procuras, Amigo?",
    });
  },
};
