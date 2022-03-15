import { get as localGet } from "../data/local";
import { get as cloudGet } from "../data/cloud";

export function getConfigure() {
  let configure = localGet("configure");

  return configure
    ? Promise.resolve(configure)
    : cloudGet("configure").then((res) => res.data.data);
}
