/**
 * Diferença de tempo em segundos.
 * @param {Date} t1
 * @param {Date} t0
 */
const TIME_DIFF_SEC = (t1, t0) => {
  return (t1.getTime() - t0.getTime()) / 1000;
};
module.exports = { TIME_DIFF_SEC };
