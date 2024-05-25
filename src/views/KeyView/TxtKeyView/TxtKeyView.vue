<script setup lang="ts">

import {ref} from "vue";
import XunfeiView from "@/views/KeyView/TxtKeyView/XunfeiView.vue";
import TongyiView from "@/views/KeyView/TxtKeyView/TongyiView.vue";
import {onMounted} from "vue";
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()
const activeKey = ref("1");
const get_about_data = () => {
  const url = "/api/key/txt"
  fetch(url).then((res) => {
    return res.json()
  }).then((data) => {
    if (data["code"] == 1) {
      counter.txt_mode_name = data["data"]["txt_mode_name"]
      counter.txt_mode_ver = data["data"]["txt_mode_ver"]
    }
  })
}
onMounted(get_about_data)
</script>

<template>
  <h1>对话key</h1>
  <h4>当前选择： {{ counter.txt_mode_name }}-{{ counter.txt_mode_ver }}</h4>
  <a-tabs v-model:activeKey="activeKey" style="height: 100%">

    <a-tab-pane key="1">
      <template #tab>
        <span>
          讯飞星火
        </span>
      </template>
      <XunfeiView></XunfeiView>
    </a-tab-pane>

    <a-tab-pane key="2">
      <template #tab>
        <span>
          通义千问
        </span>
      </template>
      <TongyiView></TongyiView>
    </a-tab-pane>

  </a-tabs>
</template>

<style scoped lang="less">
@import "src/assets/css/theme.less";
</style>