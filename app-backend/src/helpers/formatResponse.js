module.exports = {
  formatResponse: (code, status, data, httpStatus, info = "Sem Informação") => {
    return {
      code,
      status,
      http_status: httpStatus,
      info,
      data
    };
  }
};
