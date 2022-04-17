<template>
  <div class="page">
    <TitleBar
      title="新建物品"
      :iconHidden="true"
      :hasBackArrow="true"
      @back="handleBack"
    />
    <NoticeBar
      v-if="!isInTypes"
      left-icon="warning-o"
      :scrollable="false"
      :wrapable="true"
      >当前物品不在仓库物品表，请注意确认是否新增该物品类型！</NoticeBar
    >
    <Form class="form" @submit="handleSubmit">
      <!-- <CellGroup> -->
      <Field
        v-model="formData.name"
        name="name"
        error
        required
        label="物品名称"
      ></Field>

      <Cell
        title="物品类型"
        center
        title-class="van-field__label van-field__label--required"
      >
        <template #value>
          <DropdownMenu>
            <DropdownItem
              v-model="formData.goodTip"
              :options="goodList"
              @change="handleOptionChange"
              ref="dropdownItem"
            >
              <template #title>
                <Field
                  name="good"
                  v-model="formData.good"
                  required
                  center
                  autocomplete="off"
                  @update:model-value="handleFieldUpdate"
                  @blur="handleFieldBlur"
                ></Field>
                <!-- <Field v-model="formData.good"></Field> -->
              </template>
            </DropdownItem>
          </DropdownMenu>
        </template>
      </Cell>
      <Field name="newgood" label="新增物品">
        <template #input>
          <Switch v-model="formData.newgood" :disabled="isInTypes" />
        </template>
      </Field>
      <Field name="draft" label="保存为草稿">
        <template #input>
          <Switch v-model="formData.draft" />
        </template>
      </Field>
      <Field name="stepper" label="数量">
        <template #input>
          <Stepper v-model="formData.count" :min="0"></Stepper>
        </template>
      </Field>
      <Field
        v-model="formData.desc"
        name="desc"
        type="textarea"
        label="简介"
      ></Field>
      <div style="margin: 16px">
        <Button type="primary" block round native-type="submit">确定</Button>
      </div>
      <!-- </CellGroup> -->
    </Form>
  </div>
</template>

<script setup>
import {
  Form,
  Field,
  CellGroup,
  Stepper,
  DropdownMenu,
  DropdownItem,
  Popover,
  Cell,
  Button,
  NoticeBar,
  Switch,
} from "vant";
import TitleBar from "../../components/TitleBar.vue";
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import cache from "../../data/cache";

const router = useRouter();

const isInTypes = ref(true);

const formData = reactive({
  name: "",
  count: 0,
  position: "",
  desc: "",
  good: "g1",
  goodTip: "",
  newgood: false,
  draft: false,
});

const dropdownItem = ref();

const goodList = ref([
  { text: "g1", value: "g1" },
  { text: "g2", value: "g2" },
  { text: "g3", value: "g3" },
]);

function handleFieldBlur() {
  dropdownItem.value.toggle(false);
}

function handleOptionChange(value) {
  formData.good = value;
}

function handleFieldUpdate(value) {
  if (value === "f") {
    goodList.value = [
      {
        text: "fd",
        value: "fd",
      },
      {
        text: "fc",
        value: "fc",
      },
    ];
  }
}

function handleBack() {
  cache.back = true;
  router.back();
}

function handleSubmit() {
  alert("submit");
}
</script>

<style>
</style>