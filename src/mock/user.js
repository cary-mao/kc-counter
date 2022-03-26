import { Model, Response } from "miragejs";
import Cookies from "js-cookie";
import router from "../router";

export const users = Model.extend();

export const sessions = {};

export const usersSeeds = function (server) {
  /**
   * level:
   * 1 - super
   * 2 - dispatcher
   * 3 - checker -> inventory checker
   */
  [
    { name: "super", username: "super", password: "super", level: 1 },
    {
      name: "dispatcher",
      username: "dispatcher",
      password: "dispatcher",
      level: 2,
    },
    { name: "checker1", username: "checker1", password: "checker1", level: 3 },
    { name: "checker2", username: "checker2", password: "checker2", level: 3 },
  ].forEach((v) => server.schema.users.create(v));
};

export function login(schema, request) {
  const users = schema.users;
  const { username, password } = JSON.parse(request.requestBody);
  const userModel = users.findBy({ username, password });
  window.users = users;
  if (userModel) {
    const userId = userModel.attrs.id;
    const sessionId = `userId_${userId}__date_${new Date().getTime()}`;
    sessions[sessionId] = userModel.attrs;
    Cookies.set("SESSION_ID", sessionId, { secure: true });
    return new Response(
      200,
      {},
      {
        message: "success",
        data: {
          userId,
          userName: userModel.attrs.name,
        },
      }
    );
  } else {
    return new Response(
      400,
      {},
      {
        message: "fail",
        code: -1,
      }
    );
  }
}

export function logout(schema) {
  const sessionId = document.cookie;
  Cookies.remove("SESSION_ID");
  delete sessions[sessionId];
  router.push("/login");
}
