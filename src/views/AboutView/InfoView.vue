<script lang="ts" setup>
import {h, reactive} from 'vue';
import {useCounterStore} from '@/stores/counter'
import {notification, type NotificationPlacement} from "ant-design-vue";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons-vue";

const counter = useCounterStore()

interface FormState {
  user_id: string;
  user_name: string;
}

const formState = reactive<FormState>({
  user_id: counter.user_id,
  user_name: counter.user_name,
});

const successful_alter = (placement: NotificationPlacement) => {
  notification.open({
    message: `修改成功！`,
    duration: 3,
    icon: () => h(CheckOutlined, {style: 'color: #00FF00'}),
    placement,
  });
};
const failed_alter = (placement: NotificationPlacement) => {
  notification.open({
    message: `修改失败！该用户名已被使用`,
    duration: 3,
    icon: () => h(CloseOutlined, {style: 'color: #FF0000'}),
    placement,
  });
};
const onFinish = () => {
  const url = "/api/alter_info"
  let body = {
    user_name: counter.user_name,
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
      successful_alter("top")
    } else {
      failed_alter("top")
    }
  })
}
</script>

<template>
  <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 2 }"
      :wrapper-col="{ span: 6 }"
      autocomplete="off"
      @finish="onFinish"
      class="ant-form"
  >
    <a-form-item
        label="ID"
        name="user_id"
    >
      <a-input v-model:value="counter.user_id" :disabled="true"/>
    </a-form-item>

    <a-form-item
        label="用户名"
        name="user_name"
    >
      <a-input v-model:value="counter.user_name"/>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 7, span: 16 }">
      <a-button type="primary" html-type="submit">保存</a-button>
    </a-form-item>

  </a-form>
</template>


<style scoped lang="less">
@import "src/assets/css/theme.less";

.ant-form {
  position: relative;
  left: -3%;
}
</style>