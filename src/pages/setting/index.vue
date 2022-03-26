<template>
  <div class="page">
    <TitleBar title="配置" :iconHidden="true" hasBackArrow @back="handleBack" />
    <div class="">
      <CellGroup class="cell-group">
        <Cell title="自动保存" center size="large">
          <template #value>
            <Switch v-model="autoSave" />
          </template>
        </Cell>
        <Cell
          title="非规范物品处理方式"
          @click="togglePopup(true, 'illedgeSaveMode')"
          v-show="autoSave"
          size="large"
          center
        >
          <template #value>
            <span>{{ illedgeSaveModes[illedgeSaveMode] }}</span>
            <!-- <Switch v-model="illedgeSaveMode" /> -->
          </template>
        </Cell>
      </CellGroup>
      <CellGroup class="cell-group">
        <Cell title="同步至云" center size="large">
          <Switch v-model="cloudSave" />
        </Cell>
      </CellGroup>
      <CellGroup class="cell-group"
        ><Cell
          title="样式选择"
          @click="togglePopup(true, 'stylePicking')"
          center
          size="large"
        >
          <template #value>
            <span>{{ styles[style] }}</span>
          </template>
        </Cell>
      </CellGroup>
      <CellGroup class="cell-group">
        <Cell
          title="退出"
          size="large"
          center
          clickable
          @click="handleLogoutClick"
          style="text-align: center"
        ></Cell>
      </CellGroup>
    </div>
    <Popup v-model:show="popupShow" position="bottom"
      ><Picker
        :title="targetPicker.title.value"
        :columns="targetPicker.columns.value"
        :default-index="targetPicker.index.value"
        @cancel="togglePopup(false)"
        @confirm="targetPicker.handleConfirm"
    /></Popup>
  </div>
</template>

<script setup>
import { Cell, CellGroup, Switch, Picker, Popup } from "vant";
import { ref, toRaw, toRefs, watch, onUnmounted } from "vue";
import { onBeforeRouteLeave, useRouter } from "vue-router";
// import { storeToRefs } from "pinia";
import { set as localSet } from "../../data/local";
import useConfigureStore from "../../data/stores/configure";
import TargetPicker from "./picker";
import TitleBar from "../../components/TitleBar.vue";
import { logout } from "../../models/user";
import caches from "../../data/cache";
const store = useConfigureStore();
const { autoSave, cloudSave, illedgeSaveMode, style } = toRefs(store.$state);
const router = useRouter();

let dataChanged = false;

// let autoSave = ref(false);
// let cloudSave = ref(false);
// let illedgeSaveModes = ref(["ignore", "draft", "apply"]);
let illedgeSaveModes = {
  ignore: "忽略",
  draft: "草稿",
  apply: "申请",
};
// let illedgeSaveModeIndex = ref(1);
// let stylePickingList = ref(["light", "night"]);
let styles = {
  light: "日间模式",
  night: "夜间模式",
};

let logoutList = {
  logout: "退出登陆",
  cancel: "取消",
};
// let stylePickingIndex = ref(0);
let popupShow = ref(false);
let pickerTarget = ref("illedgeSaveMode");

watch(store.$state, () => {
  dataChanged = true;
});

onBeforeRouteLeave(() => {
  if (!dataChanged) return;
  if (autoSave.value) {
    localSet("configure", toRaw(store.$state));
  } else {
  }
});

const targetPicker = new TargetPicker(pickerTarget, {
  illedgeSaveMode: {
    picked: illedgeSaveMode,
    options: illedgeSaveModes,
    title: "处理模式",
  },
  stylePicking: {
    picked: style,
    options: styles,
    title: "样式选择",
  },
});

targetPicker.afterConfirm = function (value) {
  const target = this.target.value;
  const descriptor = this.getDescriptor(target);
  descriptor.picked.value = this.getKeyFromValue(target, value);
  togglePopup(false);
};

window.targetPicker = targetPicker;

function togglePopup(open, target) {
  popupShow.value = open;

  if (open && target) {
    pickerTarget.value = target;
  }
}

function handleLogoutClick() {
  logout().catch(console.log);
}

function handleBack() {
  caches.back = true;
  router.back();
}
</script>

<style lang="stylus" scoped></style>