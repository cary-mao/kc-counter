<template>
  <TitleBar title="配置" :iconHidden="true" />
  <div class="page-content">
    <Cell title="自动保存">
      <template #value>
        <Switch v-model="autoSave" />
      </template>
    </Cell>
    <Cell
      title="非规范物品处理方式"
      @click="togglePopup(true, 'illedgeSaveMode')"
      v-show="autoSave"
    >
      <template #value>
        <span>{{ illedgeSaveModes[illedgeSaveMode] }}</span>
        <!-- <Switch v-model="illedgeSaveMode" /> -->
      </template>
    </Cell>
    <Cell title="同步至云">
      <Switch v-model="cloudSave" />
    </Cell>
    <Cell title="样式选择" @click="togglePopup(true, 'stylePicking')">
      <template #value>
        <span>{{ styles[style] }}</span>
      </template>
    </Cell>
  </div>
  <Popup v-model:show="popupShow" position="bottom"
    ><Picker
      :title="targetPicker.title.value"
      :columns="targetPicker.columns.value"
      :default-index="targetPicker.index.value"
      @cancel="togglePopup(false)"
      @confirm="targetPicker.handleConfirm"
  /></Popup>
</template>

<script setup>
import { Cell, Switch, Picker, Popup } from "vant";
import { ref, toRaw, toRefs } from "vue";
import { storeToRefs } from "pinia";
import useConfigureStore from "../../stores/configure";
import TargetPicker from "./picker";
import TitleBar from "../../components/TitleBar.vue";
const store = useConfigureStore();
const { autoSave, cloudSave, illedgeSaveMode, style } = storeToRefs(store);

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
// let stylePickingIndex = ref(0);
let popupShow = ref(false);
let pickerTarget = ref("illedgeSaveMode");

// const illedgeSaveMode = computed(
//   () => illedgeSaveModes.value[illedgeSaveModeIndex.value]
// );

// const style = computed(() => stylePickingList.value[stylePickingIndex.value]);

// const pickerColumns = computed(() => {
//   switch (pickerTarget.value) {
//     case "illedgeSaveMode":
//       return illedgeSaveModes.value;
//     case "stylePicking":
//       return stylePickingList.value;
//   }
// });

// const pickerColumnIndex = computed(() => {
//   switch (pickerTarget.value) {
//     case "illedgeSaveMode":
//       return illedgeSaveModeIndex.value;
//     case "stylePicking":
//       return stylePickingIndex.value;
//   }
// });

// function handlePickerConfirm(value, index) {
//   let confirmFn = null;
//   switch (pickerTarget.value) {
//     case "illedgeSaveMode":
//       confirmFn = handleIlledgePickerConfirm;
//       break;
//     case "stylePicking":
//       confirmFn = handleStylePickingConfirm;
//       break;
//   }
//   if (confirmFn) {
//     confirmFn(value, index);
//   }
//   togglePopup(false);
// }

// function handleIlledgePickerConfirm(value, index) {
//   illedgeSaveModeIndex.value = index;
// }

// function handleStylePickingConfirm(value, index) {
//   stylePickingIndex.value = index;
// }

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
</script>

<style>
</style>