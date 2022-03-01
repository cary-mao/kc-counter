<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { Tabbar, TabbarItem } from "vant";
import { ref } from "vue";

const active = ref(0);
</script>

<template>
  <router-view />
  <Tabbar
    v-model="active"
    active-color="#ee0a24"
    inactive-color="#000"
    safe-area-inset-bottom
    placeholder
    route
  >
    <TabbarItem to="/inventory" icon="notes-o">清点</TabbarItem>
    <TabbarItem to="/repository" icon="points">仓库</TabbarItem>
    <TabbarItem to="/setting" icon="setting-o">配置</TabbarItem>
  </Tabbar>
</template>

<style>
.page-content {
  padding-left: 20px;
  padding-right: 20px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
