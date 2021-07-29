const { format } = require("date-fns");

const LOGGER = (module, msg) => {
  return `${format(new Date(), "dd/MM/yyyy - HH:mm:ss")} | ${module} | ${msg}`;
};

module.exports = { LOGGER };
