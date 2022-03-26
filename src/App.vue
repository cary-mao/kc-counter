<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { Tabbar, TabbarItem } from "vant";
import router from "./router";
import { computed, ref, unref } from "vue";

const active = ref(0);
const isShowTabbar = computed(() => {
  const route = router.currentRoute;
  const name = unref(route).name;
  return ["inventory", "repository", "me"].includes(name);
});
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <!-- <div class="view-wrap"> -->
    <transition :name="route.meta.transition">
      <component :is="Component" class="page" />
    </transition>
    <!-- </div> -->
  </router-view>
  <Tabbar
    v-model="active"
    active-color="#ee0a24"
    inactive-color="#000"
    safe-area-inset-bottom
    placeholder
    route
    v-show="isShowTabbar"
  >
    <TabbarItem to="/inventory" icon="notes-o">清点</TabbarItem>
    <TabbarItem to="/repository" icon="points">仓库</TabbarItem>
    <!-- <TabbarItem to="/setting" icon="setting-o">配置</TabbarItem> -->
    <TabbarItem to="/me" icon="user-o">我</TabbarItem>
  </Tabbar>
</template>

<style>
.page {
  width: 100%;
}
.view-wrap {
  /* width: 200%; */
  flex: 1;
}
.cell-group {
  margin-bottom: 10px;
}
.page-content {
  padding-left: 20px;
  padding-right: 20px;
}
#app {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow: hidden;
  position: relative;

  display: flex;
  flex-direction: column;
}
</style>
