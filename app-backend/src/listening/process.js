module.exports = {
  onWarning(err) {
    console.log(err.code);
  },

  onUnhandledRejection(reason, p) {
    console.log("Tá Na Gaiola!!");
    p.catch((err) => {
      console.log(err);
    });
    console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
  },
};
