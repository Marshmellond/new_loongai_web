<script setup lang="ts">

import {ref} from "vue";
import XunfeiView from "@/views/KeyView/ChatKeyView/XunfeiView.vue";
import TongyiView from "@/views/KeyView/ChatKeyView/TongyiView.vue";
import OpenaiView from "@/views/KeyView/ChatKeyView/OpenaiView.vue";
import {onMounted} from "vue";
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()
const activeKey = ref("1");
const get_about_data = () => {
  const url = "/api/key/chat"
  fetch(url).then((res) => {
    return res.json()
  }).then((data) => {
    if (data["code"] == 1) {
      counter.chat_mode_name = data["data"]["chat_mode_name"]
      counter.chat_mode_ver = data["data"]["chat_mode_ver"]
    }
  })
}
onMounted(get_about_data)
</script>

<template>
  <h3 class="span-title">当前选择： {{ counter.chat_mode_name }}-{{ counter.chat_mode_ver }}</h3>
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

    <a-tab-pane key="3">
      <template #tab>
        <span>
          openai
        </span>
      </template>
      <OpenaiView></OpenaiView>
    </a-tab-pane>

  </a-tabs>
</template>

<style scoped lang="less">
@import "src/assets/css/theme.less";

.span-title {
  color: #6a6b6b;
}
</style>