import { Model } from "miragejs";

export const users = Model.extend();

export const usersSeeds = function (server) {
  /**
   * level:
   * 1 - super
   * 2 - dispatcher
   * 3 - checker -> inventory checker
   */
  server.schema.users.create([
    { name: "super", account: "super", password: "super", level: 1 },
    {
      name: "dispatcher",
      account: "dispatcher",
      password: "dispatcher",
      level: 2,
    },
    { name: "checker1", account: "checker1", password: "checker1", level: 3 },
    { name: "checker2", account: "checker2", password: "checker2", level: 3 },
  ]);
};

export function login() {}

export function logout() {}
