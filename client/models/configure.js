import { get as localGet } from "../data/local";
import { request } from "../data/cloud";

export function getConfigure() {
  let configure = localGet("configure");

  return configure
    ? Promise.resolve(configure)
    : request({
      url: "api/configure",
    }).then((data) => data);
}
