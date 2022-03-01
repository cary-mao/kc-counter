<template>
  <NavBar :title="title" placeholder fixed>
    <template #right v-if="!iconHidden">
      <van-icon
        name="search"
        size="1.4rem"
        class="navbar-icon"
        @click="$emit('search')"
      />
      <van-icon
        name="add-o"
        size="1.4rem"
        class="navbar-icon"
        @click="$emit('more')"
      />
    </template>
  </NavBar>
</template>

<script>
import { NavBar } from "vant";

export default {
  name: "TitleBar",
  props: ["title", "iconHidden"],
  emits: ["search", "more"],
  components: { NavBar },
};
</script>

<style lang="stylus" scoped>
.navbar-icon {
  margin-right: 10px;
  color: var(--van-black-2);
}

:deep(.van-nav-bar__right) {
  opacity: unset !important;
}
</style>