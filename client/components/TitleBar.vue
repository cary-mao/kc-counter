<template>
  <NavBar
    :title="title"
    placeholder
    fixed
    :left-arrow="hasBackArrow"
    @click-left="handleClickLeft"
  >
    <template #right v-if="!iconHidden">
      <van-icon
        name="tool"
        class-prefix="iconfont"
        class="navbar-icon"
        @click="$emit('filter')"
      />
      <Popover
        v-if="morePopover"
        v-model:show="showMorePopover"
        :actions="moreActions"
        placement="bottom-end"
        icon-prefix="iconfont"
        @select="handleMoreSelect"
      >
        <template #reference>
          <van-icon class-prefix="iconfont" name="addto" class="navbar-icon" />
        </template>
      </Popover>
      <van-icon
        v-else
        name="add-o"
        class="navbar-icon"
        @click="$emit('more')"
      />
    </template>
  </NavBar>
</template>

<script>
import { NavBar, Popover } from "vant";
import { ref } from "vue";

export default {
  name: "TitleBar",
  props: ["title", "iconHidden", "hasBackArrow", "morePopover", "moreActions"],
  emits: ["filter", "more", "back", "moreSelect"],
  components: { NavBar, Popover },
  setup(props, context) {
    return {
      showMorePopover: ref(false),
      handleClickLeft() {
        context.emit("back");
      },
      handleMoreSelect(action, index) {
        context.emit("moreSelect", action, index);
      },
    };
  },
};
</script>

<style lang="stylus" scoped>
.navbar-icon {
  font-size: 1.4rem;
  margin-right: 10px;
  color: var(--van-black-2);
}

:deep(.van-nav-bar__right) {
  opacity: unset !important;
}
</style>