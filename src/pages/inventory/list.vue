<template>
  <div class="page">
    <TitleBar title="清单列表" :iconHidden="true" />
    <Collapse v-model="activeNames">
      <CollapseItem title="待处理工单" name="1">
        <ul>
          <li class="list-item" v-for="task in tasks" :key="task.id">
            <h3 class="task-title">订单号 {{ task.id }} <Tag>待处理</Tag></h3>
            <div>
              <p class="task-time">任务终结时间：{{ task.deadline }}</p>
            </div>
          </li>
        </ul>
      </CollapseItem>
      <CollapseItem title="已处理工单" name="2"></CollapseItem>
    </Collapse>
  </div>
</template>

<script setup>
import TitleBar from "../../components/TitleBar.vue";
import { Collapse, CollapseItem, List, Tag } from "vant";
import { ref } from "vue";

const activeNames = ref([]);

const tasks = ref([
  {
    id: "sdfsdflsdfkjdslf",
    deadline: "sdfsdfsdf",
    status: 0,
  },
  {
    id: "sdfsdflsdfkjdslf",
    deadline: "sdfsdfsdf",
    status: 0,
  },
  {
    id: "sdfsdflsdfkjdslf",
    deadline: "sdfsdfsdf",
    status: 1,
  },
]);
</script>

<style>
</style>