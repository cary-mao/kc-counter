import { createServer, Response, JSONAPISerializer } from "miragejs";

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
