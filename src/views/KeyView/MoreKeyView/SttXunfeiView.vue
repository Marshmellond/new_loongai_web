<script lang="ts" setup>
import {ref} from 'vue';
import {onMounted} from "vue";
import {message} from 'ant-design-vue';
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()
const xunfei_api = ref(["", "", "", [], ""])

const get_about_data = () => {
  const url = "/api/key/stt_xunfei"
  fetch(url).then((res) => {
    return res.json()
  }).then((data) => {
    if (data["code"] == 1) {
      xunfei_api.value[0] = data["data"]["appid"]
      xunfei_api.value[1] = data["data"]["api_secret"]
      xunfei_api.value[2] = data["data"]["api_key"]
      xunfei_api.value[3] = data["data"]["api_ver"]
      xunfei_api.value[4] = data["data"]["api_select"]
    }
  })
}
onMounted(get_about_data)

const onFinish = () => {
  const url = "/api/key/alter/stt_xunfei"
  let body = {
    appid: xunfei_api.value[0],
    api_secret: xunfei_api.value[1],
    api_key: xunfei_api.value[2],
    api_select: xunfei_api.value[4],
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
      message.success("修改成功")
      get_about_data()
    } else {
      message.error("修改失败")
    }
  })
}
</script>

<template>
  <a-form
      name="basic"
      :label-col="{ span: 2 }"
      :wrapper-col="{ span: 6 }"
      autocomplete="off"
      class="ant-form"
  >
    <a-form-item
        label="app_id"
    >
      <a-input v-model:value="xunfei_api[0]"/>
    </a-form-item>

    <a-form-item
        label="api_secret"
    >
      <a-input v-model:value="xunfei_api[1]"/>
    </a-form-item>

    <a-form-item
        label="api_key"
    >
      <a-input v-model:value="xunfei_api[2]"/>
    </a-form-item>

    <a-form-item
        label="模型版本:"
    >
      <a-select
          ref="select"
          v-model:value="xunfei_api[4]"
          style="width: 400px"
          :maxTagTextLength=1
      >
        <a-select-option
            v-for="(ver, index) in xunfei_api[3]"
            :key="index"
            :value="index.toString()"
        >
          {{ ver }}
        </a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 7, span: 16 }">
      <a-button type="primary" html-type="submit" @click="onFinish">保存</a-button>
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