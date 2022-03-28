import Inventory from "../pages/inventory/index.vue";
import Repository from "../pages/repository.vue";
import Setting from "../pages/setting/index.vue";
import Search from "../pages/search/index.vue";
import Login from "../pages/login.vue";
import Me from "../pages/me.vue";

import InventoryTaskAddition from "../pages/inventory/TaskAddition.vue";

import { createRouter, createWebHashHistory } from "vue-router";
import cache from "../data/cache";

let firstRoute = true;

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/search/:type", name: "search", component: Search },
  {
    path: "/inventory",
    name: "inventory",
    component: Inventory,
    meta: { tab: true },
  },
  {
    path: "/inventory/addition",
    name: "inventoryAddition",
    component: InventoryTaskAddition,
  },
  {
    path: "/repository",
    name: "repository",
    component: Repository,
    meta: { tab: true },
  },
  { path: "/setting", name: "setting", component: Setting },
  { path: "/login", name: "login", component: Login },
  { path: "/me", name: "me", component: Me, meta: { tab: true } },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.afterEach((to, from) => {
  if (firstRoute) {
    firstRoute = false;
    setTransitionName();
    return;
  }

  if (to.meta.tab && from.meta.tab) {
    setTransitionName();
    return;
  }

  let transitionName = "slide-left";

  if (cache.back) {
    transitionName = "slide-right";
  }

  setTransitionName(transitionName);
  cache.back = false;

  function setTransitionName(name) {
    from.meta.transition = to.meta.transition = name;
  }
});

export default router;
