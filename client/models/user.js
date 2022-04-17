import { request } from "../data/cloud";
import { unref } from "vue";

export function login(username, password) {
  return request({
    url: "/api/login",
    data: {
      username: unref(username),
      password: unref(password),
    },
    method: "post",
  });
}

export function logout() {
  return request({
    url: "/api/logout",
    method: "post",
  });
}
