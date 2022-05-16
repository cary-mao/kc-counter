<template>
  <transition name="van-slide-down">
    <ToolBar v-show="filterBarShow">
      <DropdownMenu>
        <DropdownItem v-model="value1" title="物品" ref="nameDropdownItem">
          <FilterListInput :options="result" @certain="handleFilteredNameCertain" />
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
const result = ref([
  { text: "item1", value: 0 },
  { text: "item3", value: 1 },
  { text: "item5", value: 2 },
  { text: "item1", value: 0 },
  { text: "item3", value: 1 },
  { text: "item5", value: 2 },
  { text: "item1", value: 0 },
  { text: "item3", value: 1 },
  { text: "item5", value: 2 },
  { text: "item1", value: 0 },
  { text: "item3", value: 1 },
  { text: "item5", value: 2 },
  { text: "item1", value: 0 },
  { text: "item3", value: 1 },
  { text: "item5", value: 2 },
  { text: "item1", value: 0 },
  { text: "item3", value: 1 },
  { text: "item5", value: 2 },
  { text: "item1", value: 0 },
  { text: "item3", value: 1 },
  { text: "item5", value: 2 },
  { text: "item1", value: 0 },
  { text: "item3", value: 1 },
  { text: "item5", value: 2 },
  { text: "item1", value: 0 },
  { text: "item3", value: 1 },
  { text: "item5", value: 2 },

  { text: "item1", value: 0 },
  { text: "item3", value: 1 },
  { text: "item5", value: 2 },
  { text: "item1", value: 0 },
  { text: "item3", value: 1 },
  { text: "item5", value: 2 },
  { text: "item1", value: 0 },
  { text: "item3", value: 1 },
  { text: "item5", value: 2 },
  { text: "item1", value: 0 },
  { text: "item3", value: 1 },
  { text: "item5", value: 2 },
  { text: "item1", value: 0 },
  { text: "item3", value: 1 },
  { text: "item5", value: 2 },

])
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

<style>
</style>