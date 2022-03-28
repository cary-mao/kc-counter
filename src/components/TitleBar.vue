<template>
  <NavBar
    :title="title"
    placeholder
    fixed
    :left-arrow="hasBackArrow"
    @click="handleClickLeft"
  >
    <template #right v-if="!iconHidden">
      <van-icon
        name="search"
        size="1.4rem"
        class="navbar-icon"
        @click="$emit('search')"
      />
      <Popover
        v-if="morePopover"
        v-model:show="showMorePopover"
        :actions="moreActions"
        placement="bottom-end"
        @select="handleMoreSelect"
      >
        <template #reference>
          <van-icon name="add-o" size="1.4rem" class="navbar-icon" />
        </template>
      </Popover>
      <van-icon
        v-else
        name="add-o"
        size="1.4rem"
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
  emits: ["search", "more", "back", "moreSelect"],
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
  margin-right: 10px;
  color: var(--van-black-2);
}

:deep(.van-nav-bar__right) {
  opacity: unset !important;
}
</style>