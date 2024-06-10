<script lang="ts" setup>
import {ref} from 'vue';
import {message} from "ant-design-vue";
import {onMounted} from "vue";
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()
const openai_api = ref(["", [], "", false])

const get_about_data = () => {
  const url = "/api/key/openai"
  fetch(url).then((res) => {
    return res.json()
  }).then((data) => {
    if (data["code"] == 1) {
      openai_api.value[0] = data["data"]["api_key"]
      openai_api.value[1] = data["data"]["api_ver"]
      openai_api.value[2] = data["data"]["api_select"]
      openai_api.value[3] = data["data"]["api_default"]
      if (openai_api.value[3]) {
        counter.chat_mode_name = "openai"
        counter.chat_mode_ver = openai_api.value[1][openai_api.value[2]]
      }
    }
  })
}
onMounted(get_about_data)
const onFinish = () => {
  const url = "/api/key/alter/openai"
  let body = {
    api_key: openai_api.value[0],
    api_select: openai_api.value[2],
    api_default: openai_api.value[3],
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
    if (parseInt(data["alter_default_code"]) === 2) {
      message.error("必须设置一个默认")
      get_about_data()
    } else if (parseInt(data["code"]) === 1) {
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
        label="api_key"
    >
      <a-input v-model:value="openai_api[0]"/>
    </a-form-item>

    <a-form-item
        label="模型版本:"
    >
      <a-select
          ref="select"
          v-model:value="openai_api[2]"
          style="width: 400px"
          :maxTagTextLength=1
      >
        <a-select-option
            v-for="(ver, index) in openai_api[1]"
            :key="index"
            :value="index.toString()"
        >
          {{ ver }}
        </a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item
        label="设为默认"
    >
      <a-checkbox v-model:checked="openai_api[3]"></a-checkbox>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 7, span: 16 }">
      <a-button type="primary" html-type="submit" @click="onFinish">保存</a-button>
    </a-form-item>


  </a-form>
</template>


<style scoped lang="less">
@import "../../../assets/css/theme.less";

.ant-form {
  position: relative;
  left: -3%;
}
</style>