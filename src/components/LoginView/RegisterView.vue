<script lang="ts" setup>
import {reactive, ref} from 'vue';
import {useCounterStore} from '@/stores/counter'
import {message} from 'ant-design-vue';

let on_load = ref(false)
let on_status = ref(false)
let on_text = ref("发送")
let countdown = ref(0);

const counter = useCounterStore()

interface FormState {
  username: string;
  mail_name: string;
  mail_code: string;
  password: string;
  confirmPassword: string;
}

const formState = reactive<FormState>({
  username: '',
  mail_name: '',
  mail_code: '',
  password: '',
  confirmPassword: ''
});

const user_max_check = {
  validator: (rule: any, value: string) => {
    if (value.length > 20) {
      return Promise.reject('长度不能大于20位！');
    }
    return Promise.resolve();
  }
};
const mail_max_check = {
  validator: (rule: any, value: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value)) {
      return Promise.reject('邮箱格式不正确');
    }
    on_status.value = true
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

const password_the_same = {
  validator: () => {
    if (formState.password !== formState.confirmPassword) {
      return Promise.reject('两次输入的密码不一致！');
    }
    return Promise.resolve();
  }
};
const onFinish = (values: any) => {
  const url = "/api/register"
  let body = {
    username: values.username,
    password: values.password,
    mail_name: values.mail_name,
    mail_code: values.mail_code
  }
  fetch(url, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body)
  }).then((res) => {
    if (res.ok) {
      return res.json()
    }
  }).then((data) => {
    if (parseInt(data["code"]) === 1) {
      counter.login_page = '1'
      message.success("注册成功！请登录")
      formState.username = '';
      formState.mail_name = '';
      formState.mail_code = '';
      formState.password = '';
      formState.confirmPassword = '';
    } else if (parseInt(data["code"]) === -1) {
      message.error("注册失败！验证码错误")
    } else if (parseInt(data["code"]) === -2) {
      message.error("注册失败！邮箱已被注册")
    } else {
      message.error("注册失败！用户名已存在")
    }
  })
}

const startCountdown = () => {
  countdown.value = 60; // 设置倒计时为60秒
  const intervalId = setInterval(() => {
    on_load.value = false;
    if (countdown.value > 0) {
      countdown.value--;
      on_text.value = `已发送(${countdown.value})`;
    } else {
      clearInterval(intervalId);
      on_text.value = "发送";
      countdown.value = 0;
      on_status.value = true
    }
  }, 1000);
};
const onSearch = (values: any) => {
  if (on_status.value) {
    on_load.value = true
    on_text.value = "发送中"
    on_status.value = false
    const url = "/api/register_mail";
    const body = {
      mail_name: values,
    };
    fetch(url, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body)
    })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((data) => {
          if (parseInt(data["code"]) === 1) {
            startCountdown();
          }
        })
  }
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
        :rules="[{ required: true, message: '请输入用户名' }, user_max_check]"
    >
      <a-input v-model:value="formState.username"/>
    </a-form-item>

    <a-form-item
        label="邮箱"
        name="mail_name"
        :rules="[{ required: true, message: '请输入邮箱' }, mail_max_check]"
    >
      <a-input-search
          v-model:value="formState.mail_name"
          :enter-button="on_text"
          :loading="on_load"
          @search="onSearch"
      />
    </a-form-item>

    <a-form-item
        label="邮箱验证码"
        name="mail_code"
        :rules="[{ required: true, message: '请输入验证码' }, password_max_check]"
    >
      <a-input v-model:value="formState.mail_code"/>
    </a-form-item>

    <a-form-item
        label="密码"
        name="password"
        :rules="[{ required: true, message: '请输入密码' }, password_max_check]"
    >
      <a-input-password v-model:value="formState.password"/>
    </a-form-item>

    <a-form-item
        label="确认密码"
        name="confirmPassword"
        :rules="[{ required: true, message: '请确认密码' }, password_max_check, password_the_same]"
    >
      <a-input-password v-model:value="formState.confirmPassword"/>
    </a-form-item>


    <a-form-item :wrapper-col="{ offset: 20, span: 16 }">
      <a-button type="primary" html-type="submit">注册</a-button>
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