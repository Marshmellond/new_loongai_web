<script lang="ts" setup>

import {reactive} from 'vue';
import {useCounterStore} from '@/stores/counter'
import {message} from 'ant-design-vue';

const counter = useCounterStore()


interface FormState {
  username: string;
  password: string;
}

const formState = reactive<FormState>({
  username: '',
  password: '',
});

const onFinish = (values: any) => {
  const url = "/api/login"
  let body = {
    username: values.username,
    password: values.password
  }
  fetch(url, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body),
    credentials: "include"
  }).then((res) => {
    if (res.ok) {
      return res.json()
    }
  }).then((data) => {
    if (parseInt(data["code"]) === 1) {
      counter.login_status = true
      message.success('登录成功', 3);
      formState.username = '';
      formState.password = '';
    } else if (parseInt(data["code"]) === 0) {
      message.error("登录失败！密码错误")
    } else {
      message.error("登录失败！用户名不存在")
    }
  })
}
</script>

<template>
  <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      class="ant-form"
  >
    <a-form-item
        label="用户名"
        name="username"
        :rules="[{ required: true, message: '请输入用户名' }]"
    >
      <a-input v-model:value="formState.username"/>
    </a-form-item>

    <a-form-item
        label="密码"
        name="password"
        :rules="[{ required: true, message: '请输入密码' }]"
    >
      <a-input-password v-model:value="formState.password"/>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 20, span: 16 }">
      <a-button type="primary" html-type="submit">登录</a-button>
    </a-form-item>
  </a-form>
</template>


<style scoped lang="less">
@import "src/assets/css/theme.less";

.ant-form {
  margin-right: 10%;
  margin-top: 10%;
}
</style>