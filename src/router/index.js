import Inventory from "../pages/inventory.vue";
import Repository from "../pages/repository.vue";
import Setting from "../pages/setting/index.vue";
import Search from "../pages/search/index.vue";

import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  { path: "/", redirect: "/setting" },
  { path: "/search/:type", component: Search },
  { path: "/inventory", component: Inventory },
  { path: "/repository", component: Repository },
  { path: "/setting", component: Setting },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
