<template>
  <div class="page">
    <Search
      v-model="searchText"
      :placeholder="placeholder"
      @search="handleSearch"
      @update:model-value="handleChange"
    />
    <div v-show="tipsFromHistory.length > 0">
      <h3>历史搜索</h3>
      <Cell v-for="tip in tipsFromHistory" :key="tip">
        {{ tip }}
      </Cell>
    </div>
    <div v-show="result.length > 0">
      <List
        style="width: 100%"
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="listOnLoad"
      >
        <SwipeCell v-for="item in inventory" :key="item">
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
    </div>
  </div>
</template>

<script setup>
/**
 * 这是一个模板页，通过路由的meta参数t(type)和query参数q(query)来确定页面展示
 */
import { Search, Cell, List, SwipeCell, Stepper, Button } from "vant";
import { useRouter, useRoute } from "vue-router";
import { useSearch } from "./useSearch";
import { usePlaceholder } from "./usePlaceholder";
import { useResult } from "./useResult";
import useSearchStore from "../../data/stores/search";
import { toRefs, watch, isRef, reactive } from "vue";

const router = useRouter();
const route = useRoute();
const store = useSearchStore();
const { inventory } = toRefs(store.$state);
watch(inventory, console.log);

const { type } = route.params;
const { searchText, tipsFromHistory, handleSearch, handleChange } =
  useSearch("");
const { placeholder } = usePlaceholder(type);
const { result, fetchResult } = useResult();

const listConf = reactive({
  loading: false,
  finished: false,
});
function listOnLoad() {
  fetchResult().then((res) => {
    listConf.loading = false;
    if (res.data.state === "end") {
      listConf.finished = true;
    }
  });
}
</script>

<style>
</style>