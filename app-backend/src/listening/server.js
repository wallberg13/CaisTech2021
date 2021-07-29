module.exports = {
  /**
   *
   * @param {*} error
   */
  onError: (port) => {
    return (error) => {
      if (error.syscall !== "listen") {
        throw error;
      }

      const bind = typeof port === "string" ? "Pipe" + port : "Porta " + port;

      switch (error.code) {
        case "EACESS":
          console.error(bind + " requer privilegios elevados.");
          process.exit(1);
        case "EADDRINUSE":
          console.error(bind + " já está em uso!!");
          process.exit(1);
        default:
          throw error;
      }
    };
  },
  /**
   * Evento que o servidor subiu.
   */
  onListening: (server, serverConfig) => {
    return () => {
      const addr = server.address();
      const bind = typeof addr === "string" ? addr : addr.port;

      console.log(`🚀 Servidor Decolando em http://${serverConfig.ip}:${bind}`);
    };
  },
};
