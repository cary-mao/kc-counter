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
              autoSave: false,
              illedgeSaveMode: "draft",
              cloudSave: false,
              style: "light",
            },
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
