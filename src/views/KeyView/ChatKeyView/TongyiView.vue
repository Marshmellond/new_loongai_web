<script lang="ts" setup>
import {h, ref} from 'vue';
import {notification, type NotificationPlacement} from "ant-design-vue";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons-vue";
import {onMounted} from "vue";
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()
const tongyi_api = ref(["", [], "", false])

const get_about_data = () => {
  const url = "/api/key/tongyi"
  fetch(url).then((res) => {
    return res.json()
  }).then((data) => {
    if (data["code"] == 1) {
      tongyi_api.value[0] = data["data"]["api_key"]
      tongyi_api.value[1] = data["data"]["api_ver"]
      tongyi_api.value[2] = data["data"]["api_select"]
      tongyi_api.value[3] = data["data"]["api_default"]
      if (tongyi_api.value[3]) {
        counter.chat_mode_name = "通义千问"
        counter.chat_mode_ver = tongyi_api.value[1][tongyi_api.value[2]]
      }
    }
  })
}
onMounted(get_about_data)
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
    message: `修改失败！`,
    duration: 3,
    icon: () => h(CloseOutlined, {style: 'color: #FF0000'}),
    placement,
  });
};
const failed_alter_default = (placement: NotificationPlacement) => {
  notification.open({
    message: `必须设置一个默认`,
    duration: 3,
    icon: () => h(CloseOutlined, {style: 'color: #FF0000'}),
    placement,
  });
};
const onFinish = () => {
  const url = "/api/key/alter/tongyi"
  let body = {
    api_key: tongyi_api.value[0],
    api_select: tongyi_api.value[2],
    api_default: tongyi_api.value[3],
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
      if (parseInt(data["alter_default_code"]) === 2) {
        failed_alter_default("top")
      }
      get_about_data()
    } else {
      failed_alter("top")
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
      <a-input v-model:value="tongyi_api[0]"/>
    </a-form-item>

    <a-form-item
        label="模型版本:"
    >
      <a-select
          ref="select"
          v-model:value="tongyi_api[2]"
          style="width: 400px"
          :maxTagTextLength=1
      >
        <a-select-option
            v-for="(ver, index) in tongyi_api[1]"
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
      <a-checkbox v-model:checked="tongyi_api[3]"></a-checkbox>
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