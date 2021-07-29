const SEND_RESP = ({ httpStatus, ...data }) => {
  return (res) => {
    res.status(httpStatus);
    res.json(data);
  };
};

const RESPONSE_VALID = (data) =>
  SEND_RESP({
    httpStatus: 200,
    mensagem: "Requisição Completa",
    timestamp: Date.now(),
    dados: data,
  });

const INVALID_PARAMS = SEND_RESP({
  httpStatus: 400,
  mensagem: "Campos Inválidos!!",
  timestamp: Date.now(),
});

const UNSUPORT_MODEL = SEND_RESP({
  httpStatus: 400,
  mensagem: "Modelo de OLT não suporta tal operação",
  timestamp: Date.now(),
});

const FORBIDDEN_ACESS = SEND_RESP({
  httpStatus: 403,
  mensagem: "Acesso não autorizado para realizar tarefa",
  timestamp: Date.now(),
});

const OLT_BUSY = SEND_RESP({
  httpStatus: 400,
  mensagem: "OLT está em uso para outros updates",
  timestamp: Date.now(),
});

const NOT_FOUND_DATA = SEND_RESP({
  httpStatus: 404,
  mensagem: "Dado não encontrato",
  timestamp: Date.now(),
});

const DATE_CONFLICT = SEND_RESP({
  httpStatus: 400,
  mensagem: "A Data Inicial é Maior que a Final!!",
  timestamp: Date.now(),
});

const INTERNAL_ERROR = SEND_RESP({
  httpStatus: 500,
  mensagem: "Erro Interno",
  timestamp: Date.now(),
});

const DATA_EXISTS = SEND_RESP({
  httpStatus: 500,
  mensagem: "Dado já existe no Banco",
  timestamp: Date.now(),
});

const PERSONAL_ERROR = (string) =>
  SEND_RESP({
    httpStatus: 400,
    timestamp: Date.now(),
    mensagem: string,
  });

module.exports = {
  RESPONSE_VALID,
  INVALID_PARAMS,
  UNSUPORT_MODEL,
  FORBIDDEN_ACESS,
  OLT_BUSY,
  DATE_CONFLICT,
  INTERNAL_ERROR,
  OUTPUT_INVITEX,
  PERSONAL_ERROR,
  NOT_FOUND_DATA,
  DATA_EXISTS,
};
