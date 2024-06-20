<script lang="ts" setup>
import {reactive} from 'vue';
import {message} from 'ant-design-vue';


interface FormState {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

const formState = reactive<FormState>({
  old_password: '',
  new_password: '',
  confirm_password: '',
});
const onFinish = () => {
  const url = "/api/alter_password"
  let body = {
    old_password: formState.old_password,
    new_password: formState.new_password
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
    if (data["code"] == 1) {
      message.success("修改成功")
      formState.old_password = ''
      formState.new_password = ''
      formState.confirm_password = ''
    } else if (data["code"] == 0) {
      message.error("修改失败！原密码错误")
    } else {
      message.error("修改失败")
    }
  })
}

const password_the_same = {
  validator: () => {
    if (formState.new_password !== formState.confirm_password) {
      return Promise.reject('两次输入的密码不一致！');
    }
    return Promise.resolve();
  }
};

const password_max_check = {
  validator: (rule: any, value: string) => {
    if (value.length > 128) {
      return Promise.reject('长度不能大于128位！');
    }
    return Promise.resolve();
  }
};
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
        label="密码"
        name="old_password"
        :rules="[{ required: true, message: '请输入密码' }, password_max_check]"
    >
      <a-input-password v-model:value="formState.old_password"/>
    </a-form-item>

    <a-form-item
        label="新密码"
        name="new_password"
        :rules="[{ required: true, message: '请输入新密码' }, password_max_check]"
    >
      <a-input-password v-model:value="formState.new_password"/>
    </a-form-item>

    <a-form-item
        label="确认密码"
        name="confirm_password"
        :rules="[{ required: true, message: '请确认密码' }, password_max_check, password_the_same]"
    >
      <a-input-password v-model:value="formState.confirm_password"/>
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