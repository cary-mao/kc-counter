/**
 * exchange data with remote server
 */
import axios from "axios";
import httpMap from "./httpmap";

const http = axios.create({
  timeout: 1000,
});

http.interceptors.request.use(
  () => {},
  () => {}
);

export function request(module, config, mode) {
  const httpModule = httpMap[module];

  if (httpModule && httpModule[mode]) {
    const httpConfig = httpModule[mode];
    let overrideHttpConfig = {};

    if (!httpConfig.method) {
      overrideHttpConfig.method = mode === "get" ? "get" : "post";
    }

    normalizeRequestArguments("params");
    normalizeRequestArguments("data");

    function normalizeRequestArguments(field) {
      if (!httpConfig[field]) {
        overrideHttpConfig[field] = config[field];
      } else if (typeof httpConfig[field] === "function") {
        overrideHttpConfig[field] = httpConfig[field](config[field]);
      }
    }

    return axios.request({ ...httpConfig, ...overrideHttpConfig });
  }
}

export function get(module, config = {}) {
  return request(module, config, "get");
}

export function set(module, config = {}) {
  return request(module, config, "set");
}
