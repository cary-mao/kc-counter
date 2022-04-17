<template>
  <div class="page">
    <TitleBar title="清单列表" :iconHidden="true" />
    <Collapse v-model="activeNames">
      <CollapseItem title="待处理工单" name="1">
        <ul>
          <li
            class="list-item task"
            :class="{ ['task-selected']: task.selected }"
            v-for="task in tasks"
            :key="task.id"
            @click="handleTaskItemClick(task)"
          >
            <h3 class="task-title">
              工单号：<span class="task-id">{{ task.id }}</span>
              <Tag :type="getTagTypeByCode(task.status)">{{
                getStatusTextByCode(task.status)
              }}</Tag>
            </h3>
            <div>
              <p class="task-time">任务开始时间：{{ task.starttime }}</p>
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
import { Collapse, CollapseItem, List, Tag, Card } from "vant";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const activeNames = ref(["1"]);

function handleTaskItemClick(task) {
  router.push(`/inventory/${task.id}`);
}

function getStatusTextByCode(code) {
  if (code === 0) {
    return "待处理";
  } else {
    return "已完成";
  }
}

function getTagTypeByCode(code) {
  if (code === 0) {
    return "primary";
  } else {
    return "success";
  }
}

const tasks = ref([
  {
    id: "1234648465132135486",
    starttime: "646516",
    deadline: "sdfsdfsdf",
    selected: true,
    status: 0,
  },
  {
    id: "1234648465132135486",
    starttime: "646516",
    deadline: "sdfsdfsdf",
    status: 0,
  },
  {
    id: "1234648465132135486",
    starttime: "646516",
    deadline: "sdfsdfsdf",
    status: 1,
  },
]);
</script>

<style lang="stylus" scoped>
.task {
  background-color: var(--van-gray-1);

  &-selected {
    background-color: var(--van-active-color);
  }

  &-title {
    font-size: 16px;
    color: var(--van-black-0e);
  }

  &-id {
    margin-right: 4px;
  }

  &-time {
    font-size: 12px;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }
}

.list {
  &-item {
    padding: 0px 10px;
    border: 1px solid var(--van-gray-3);
    border-radius: 8px;

    & + & {
      margin-top: 10px;
    }
  }
}
</style>