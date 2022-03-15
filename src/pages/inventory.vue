<template>
  <div class="">
    <TitleBar title="库存清点" @search="handleSearch" />
    <div class="wrapper page-content">
      <!-- <van-row class="header">
        <Field placeholder="查找商品" className="field" />
        <Button icon="plus" size="small" type="primary" square>添加</Button>
      </van-row> -->
      <van-row class="main">
        <List style="width: 100%">
          <SwipeCell v-for="item in items" :key="item">
            <div class="item">
              <span>{{ item.name }}</span>
              <div class="count-box">
                <Stepper v-model="item.count" integer min="0" />
              </div>
            </div>
            <template #right>
              <Button square type="danger" text="删除" />
              <Button square type="primary" text="收藏" />
            </template>
          </SwipeCell>
        </List>
      </van-row>
    </div>
  </div>
</template>

<script setup>
import { Field, Button, List, Cell, SwipeCell, Stepper } from "vant";
import TitleBar from "../components/TitleBar.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const items = ref(
  new Array(21).fill(0).map((v, i) => {
    return {
      name: `item${i}`,
      count: i,
    };
  })
);

function handleSearch() {
  window.router = router;
  router.push("/search/inventory");
}
</script>

<style lang="stylus" scoped>
.field {
  width: auto;
  flex-grow: 1;
  border: var(--van-button-border-width) solid var(--van-button-primary-border-color);
  margin-right: 10px;
  display: flex;
  align-items: center;
  padding-left: 10px;
}

.count-field {
  width: 32.38px;
  padding: 0;
  background-color: var(--van-orange-light);
}

.count-box {
  display: flex;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  margin-bottom: 10px;
  border-bottom: var(--van-gray-4) 1px solid;
}
</style>