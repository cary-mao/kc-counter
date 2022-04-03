/**
 * API Interface
 * 定义接口编号，路径等信息
 */
const baseCode = {
  // user - 00x
  register: "000",
  login: "001",

  // system - 01x
  configure: "010",
};

const operationCode = {
  placeholder: "0",
  create: "1",
  retrieve: "2",
  update: "3",
  delete: "4",
  p: "0",
  c: "1",
  r: "2",
  u: "3",
  d: "4",
};

const url = {
  "0000": "/api/login",
  "0010": "/api/register",
  "0102": "/api/configure",
  "0103": "/api/configure/update",
};

function getAPICode(name, operation) {
  return baseCode[name] + operationCode[operation];
}

function getAPIRequestIdByCode(code) {
  return code + new Date().getTime();
}

function getAPIURLByCode(code) {
  return url[code];
}

export function getAPIInfo(name, operation = "p") {
  const code = getAPICode(name, operation);
  const id = getAPIRequestIdByCode(code);
  const url = getAPIURLByCode(code);

  return { code, id, url };
}
