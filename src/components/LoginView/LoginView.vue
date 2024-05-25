<script lang="ts" setup>
import {CheckOutlined, CloseOutlined} from "@ant-design/icons-vue";

import {h, reactive} from 'vue';
import {notification, type NotificationPlacement} from "ant-design-vue";
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()

interface FormState {
  username: string;
  password: string;
}

const formState = reactive<FormState>({
  username: '',
  password: '',
});


const successful_login = (placement: NotificationPlacement) => {
  notification.open({
    message: `登录成功！`,
    duration: 3,
    icon: () => h(CheckOutlined, {style: 'color: #00FF00'}),
    placement,
  });
};
const failed_login = (placement: NotificationPlacement) => {
  notification.open({
    message: `登录失败！密码错误`,
    duration: 3,
    icon: () => h(CloseOutlined, {style: 'color: #FF0000'}),
    placement,
  });
};
const failed_login2 = (placement: NotificationPlacement) => {
  notification.open({
    message: `登录失败！用户名不存在`,
    duration: 3,
    icon: () => h(CloseOutlined, {style: 'color: #FF0000'}),
    placement,
  });
};
const onFinish = (values: any) => {
  const url = "/api/login"
  let body = {
    username: values.username,
    password: values.password
  }
  console.log(body)
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
      successful_login("top")
      formState.username = '';
      formState.password = '';
    } else if (parseInt(data["code"]) === 0) {
      failed_login("top")
    } else {
      failed_login2("top")
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