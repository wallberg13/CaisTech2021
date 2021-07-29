const dbs = require("./databases");
// const Test = require("./Test");

/**
 * @typedef ServiceOutput
 * @property {import("./databases").DatabaseOutput} db
 */

/**
 *
 * @returns {ServiceOutput}
 */
module.exports = () => {
  // Test();

  return { db: dbs };
};
