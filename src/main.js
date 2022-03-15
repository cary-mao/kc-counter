import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { Row, Col, Icon } from "vant";
import { makeServer } from "./mock/server";
import loadConfigure from "./loadConfigure";
import { createPinia } from "pinia";
import dynamicSchema from "./plugins/dynamicSchema";
// import "./unload";

if (process.env.NODE_ENV === "development") {
  makeServer();
}

const pinia = createPinia();
pinia.use(dynamicSchema);
const app = createApp(App);
// app.config.productionTip = false;
app.use(pinia).use(router).use(Row).use(Col).use(Icon);

loadConfigure().then(() => {
  app.mount("#app");
});
