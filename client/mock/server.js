import { createServer, Response, JSONAPISerializer } from "miragejs";
import { users, login, logout, usersSeeds } from "./user";

// const AxiosGeneralSerializer = Serializer.extend({
//   root: false,
// });

export function makeServer() {
  createServer({
    // serializers: {
    //   configure: JSONAPISerializer,
    // },
    // models: {
    //   configure: Model,
    // },
    models: {
      users,
    },
    routes() {
      this.namespace = "api";
      this.get("/configure", () => {
        return new Response(
          200,
          {},
          {
            data: {
              autoSave: true,
              illedgeSaveMode: "draft",
              cloudSave: false,
              style: "light",
            },
          }
        );
      });
      this.get("/inventory", () => {
        return new Response(
          200,
          {},
          {
            data: new Array(21).fill(0).map((v, i) => {
              return {
                name: `item${i}`,
                count: i,
              };
            }),
          }
        );
      });
      this.get("/search/history", () => {});
      this.post("/login", login);
      this.post("/logout", logout);
    },
    seeds(server) {
      usersSeeds(server);
    },
    // seeds(server) {
    //   server.create("configure", {
    //     data: {
    //       autoSave: false,
    //       illedgeSaveMode: "draft",
    //       cloudSave: false,
    //       style: "light",
    //     },
    //   });
    // },
  });
}
