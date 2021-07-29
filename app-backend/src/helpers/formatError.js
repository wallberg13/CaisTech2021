const { formatResponse } = require("./formatResponse");

module.exports = {
  FORMAT_ERROR: (error) => {
    const cases = {
      404: () =>
        formatResponse(4004, false, {}, 404, "¿O que Procuras, Amigo? 🌚"),
    };

    return cases[`${error.status}`]()
      ? cases[`${error.status}`]()
      : formatResponse(
          5000,
          false,
          {},
          500,
          "Problema Interno!! Pega 🔥 Cabaré"
        );
  },
};
