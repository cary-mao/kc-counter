<template>
  <div class="page">
    <TitleBar title="清单列表" :iconHidden="true" />
    <Collapse v-model="activeNames">
      <CollapseItem title="待处理工单" name="1"> </CollapseItem>
      <CollapseItem title="已处理工单" name="2"></CollapseItem>
    </Collapse>
  </div>
</template>

<script setup>
import TitleBar from "../../components/TitleBar.vue";
import { Collapse, CollapseItem } from "vant";
import { ref } from "vue";

const activeNames = ref([]);
</script>

<style>
</style>