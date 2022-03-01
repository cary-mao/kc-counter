<template>
  <TitleBar title="仓库" />
  <div class="page-content">
    <Tabs v-model="active" sticky offset-top="12.26667vw">
      <Tab title="库存列表" className="tab">
        <List style="width: 100%">
          <Cell v-for="item in items" :key="item" className="item-cell">
            <div class="item">
              <p>
                <span class="item-hori">物品：{{ item.name }}</span>
                <span class="item-hori">数量：{{ item.count }}</span>
              </p>
              <p>
                <span>规格：{{ item.specification }}</span>
              </p>
            </div>
          </Cell>
        </List>
      </Tab>
      <Tab title="物资列表" className="tab"></Tab>
      <Tab title="草稿列表" className="tab"></Tab>
    </Tabs>
  </div>
</template>

<script setup>
import { Tab, Tabs, Field, Button, Cell, NavBar, List } from "vant";
import TitleBar from "../components/TitleBar.vue";
import { ref } from "vue";
const active = ref(0);
const items = ref(
  new Array(20).fill(0).map((v, i) => {
    return {
      name: `item${i}`,
      count: i,
      specification: `DMDFSD5-dss-${i}`,
    };
  })
);
</script>

<style lang="stylus" scoped>
.field {
  width: auto;
  border: var(--van-button-border-width) solid var(--van-button-primary-border-color);
  display: flex;
  flex-grow: 1;
  align-items: center;
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
}

.header-operations > Button {
  margin-right: 10px;
}

.tab {
  padding-top: 10px;
}

.item {
  // display: flex;
  // justify-content: space-between;
  // align-items: center;
  padding: 10px 20px;
  margin-bottom: 10px;
  border-bottom: 1px solid var(--van-gray-4);

  // background-color: var(--van-gray-2);
  &-cell {
    padding: 0;
  }

  &-hori {
    margin-right: 20px;
  }
}
</style>