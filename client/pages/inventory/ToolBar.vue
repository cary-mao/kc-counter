<template>
  <div class="van-tabbar__placeholder">
    <div class="van-nav-bar van-nav-bar--fixed" style="top: unset">
      <div
        class="van-nav-bar__content"
        :class="contentClass"
        :style="contentStyle"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["contentClass", "contentStyle"],
};
</script>

<style scoped>
.van-tabbar__placeholder {
  height: 40px;
}
</style>