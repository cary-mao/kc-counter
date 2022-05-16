/**
 * exchange data with remote server
 */
import axios from "axios";
import * as Loading from "../loading";

const http = axios.create({
  timeout: 1000,
});

const record = {
  entities: [],
  ridMap: {},
  enqueue(requestConfig) {
    this.entities.unshift(requestConfig.rid);
    this.ridMap[requestConfig.rid] = requestConfig;
  },
  dequeue(requestConfig) {
    const rid = requestConfig.rid;
    this.entities = this.entities.filter((entity) => entity !== rid);
    const config = this.ridMap[rid];
    delete this.ridMap[rid];
    return config;
  },
  filter(fn) {
    const result = [];
    this.entities.forEach((entity) => {
      const config = this.ridMap[entity];
      if (fn(config)) {
        result.push(config);
      }
    });
    return result;
  },
};

export function request(config) {
  const {
    tag: loadingTag,
    args: loadingArgs,
    closeArgs: loadingCloseArgs,
  } = config.loading || {};

  // generate rid
  const rid = generateRequestId(config);

  const requestConfig = {
    ...config,
    headers: Object.assign({}, config.headers, {
      "request-id": rid,
    }),
  };

  config.rid = rid;

  record.enqueue(config);

  Loading.loading(loadingTag, loadingArgs);

  return http
    .request(requestConfig)
    .then(
      (res) => {
        const { data } = res.data;

        return data;
      },
      (err) => {
        const {
          status,
          code
        } = err;

        // status process
        statusProcess(status);
        // business code process
        businessCodeProcess(code);

        return { err };
      }
    )
    .finally(() => {
      record.dequeue(config);
      Loading.close(loadingTag, loadingCloseArgs);
    });
}

function statusProcess(status) {}

function businessCodeProcess(code) {}

function generateRequestId(config) {}
