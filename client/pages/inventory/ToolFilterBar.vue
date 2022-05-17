<template>
  <transition name="van-slide-down">
    <ToolBar v-show="filterBarShow" class="toolbar">
      <DropdownMenu>
        <DropdownItem v-model="value1" title="物品" ref="nameDropdownItem" class="nomaxheight-dropdown">
          <FilterListInput :options="result" @certain="handleFilteredNameCertain" list-max-height="50vh" />
        </DropdownItem>
        <DropdownItem v-model="value2" :options="option2" />
      </DropdownMenu>
    </ToolBar>
  </transition>
</template>

<script setup>
import ToolBar from "./ToolBar.vue";
import { filterBarShow } from "./useTools";
import { DropdownMenu, DropdownItem, Cell, Field } from "vant";
import { ref } from "vue";
import FilterListInput from './FilterListInput.vue'

const value1 = ref(0);
const value2 = ref("a");
const text = ref('');
const nameDropdownItem = ref(null)
const result = ref(Array.from(new Array(20)).map((item, idx) => {
  return { text: `item${idx}`, value: idx }
}))
const option1 = ref(result.value);
const option2 = [
  { text: "默认排序", value: "a" },
  { text: "好评排序", value: "b" },
  { text: "销量排序", value: "c" },
];
function handleFilteredNameCertain(items) {
  console.log(items)
  nameDropdownItem.value.toggle()
}
</script>

<style lang="stylus" scoped>
.toolbar .van-dropdown-menu {
  width: 100%;
}
.nomaxheight-dropdown ::v-deep(.van-dropdown-item__content) {
  max-height: unset;
}
</style>