<template>
  <div class="page">
    <h1>KC Counter</h1>
    <Form @submit="onSubmit" @failed="onFail">
      <CellGroup inset>
        <Field
          v-model="username"
          name="username"
          label="用户名"
          placeholder="用户名"
          class="field"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <Field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          class="field"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </CellGroup>
      <div style="margin: 16px">
        <Button round block type="primary" native-type="submit">登陆</Button>
      </div>
      <!-- <div style="margin: 16px">
      <Button round block type="danger" native-type="submit">注册</Button>
    </div> -->
    </Form>
  </div>
</template>

<script setup>
import { Form, CellGroup, Field, Button } from "vant";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "../models/user";

const router = useRouter();

const username = ref("super");
const password = ref("super");
const onSubmit = (values) => {
  login(values.username, values.password).then((res) => {
    router.push("/inventory");
  });
};
const onFail = console.log;
</script>

<style lang="stylus" scoped>
.page {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>