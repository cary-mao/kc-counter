<template>
  <div class="page">
    <TitleBar
      title="库存清点"
      :moreActions="moreActions"
      :morePopover="true"
      @search="handleSearch"
      @moreSelect="handleMoreSelect"
    />
    <!-- <van-row class="header">
        <Field placeholder="查找商品" className="field" />
        <Button icon="plus" size="small" type="primary" square>添加</Button>
      </van-row> -->
    <van-row class="main">
      <List style="width: 100%">
        <SwipeCell class="item-cell" v-for="(item, index) in items" :key="item">
          <div class="item">
            <span>{{ item.name }}</span>
            <div class="count-box">
              <Stepper
                v-model="item.count"
                integer
                min="0"
                :disabled="item.lock"
              />
            </div>
          </div>
          <template #right>
            <Button
              square
              type="danger"
              text="删除"
              :disabled="item.lock"
              @click="handleItemDelete(index)"
            />
            <Button
              square
              type="primary"
              :text="item.lock ? '重数' : '确定'"
              @click="handleItemCertain(index, item)"
            />
          </template>
        </SwipeCell>
      </List>
    </van-row>
    <VanDialog
      v-model:show="deleteConfirmDialogShow"
      title="删除任务"
      show-cancel-button
      @cancel="handleDeleteCancel"
      @confirm="handleDeleteConfirm"
    >
      <div class="van-dialog__message van-dialog__message--has-title">
        <p>任务删除后无法恢复，是否确认删除？</p>
        <Checkbox
          v-model="noDeleteConfirm"
          shape="square"
          style="margin-left: 1.1rem"
          >本次使用不再提示</Checkbox
        >
      </div>
    </VanDialog>
  </div>
</template>
// van-dialog__content
<script setup>
import {
  Field,
  Button,
  List,
  Cell,
  SwipeCell,
  Stepper,
  Popover,
  Dialog,
  Checkbox,
} from "vant";
import TitleBar from "../../components/TitleBar.vue";
import { ref, unref } from "vue";
import { useRouter } from "vue-router";

const VanDialog = Dialog.Component;

const router = useRouter();

let deletingIndex = -1;

const items = ref(
  new Array(21).fill(0).map((v, i) => {
    return {
      name: `item${i}`,
      count: i,
    };
  })
);

const noDeleteConfirm = ref(false);

const deleteConfirmDialogShow = ref(true);

function handleDeleteCancel() {
  deleteConfirmDialogShow.value = false;
}

function handleDeleteConfirm() {
  if (deletingIndex >= 0) unref(items).splice(deletingIndex, 1);
}

const moreActions = ref([
  { text: "新增", action: "add" },
  // { text: "选项二" },
  // { text: "选项三" },
]);

function handleMoreSelect(item, index) {
  if (item.action === "add") {
    router.push("/inventory/addition");
  }
}

function handleItemDelete(index) {
  deletingIndex = index;
  if (noDeleteConfirm.value) {
    handleDeleteConfirm();
  } else {
    deleteConfirmDialogShow.value = true;
  }
}

function handleItemCertain(index, item) {
  let lock = item.lock;
  item.lock = !lock;
}

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
  background-color: var(--van-white);

  &-cell {
    margin-bottom: 10px;

    &:first-child {
      margin-top: 10px;
    }

    &:nth-last-child(2) {
      margin-bottom: 0;
    }
  }
}
</style>