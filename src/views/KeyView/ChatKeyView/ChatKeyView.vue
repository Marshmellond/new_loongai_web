<script setup lang="ts">

import {ref} from "vue";
import ChatXunfeiView from "@/views/KeyView/ChatKeyView/ChatXunfeiView.vue";
import ChatTongyiView from "@/views/KeyView/ChatKeyView/ChatTongyiView.vue";
import ChatOpenaiView from "@/views/KeyView/ChatKeyView/ChatOpenaiView.vue";
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
  <h3 class="span-title">当前选择： {{ counter.chat_mode_name }} | {{ counter.chat_mode_ver }}</h3>
  <a-tabs v-model:activeKey="activeKey" style="height: 100%">

    <a-tab-pane key="1">
      <template #tab>
        <span>
          讯飞星火
        </span>
      </template>
      <ChatXunfeiView></ChatXunfeiView>
    </a-tab-pane>

    <a-tab-pane key="2">
      <template #tab>
        <span>
          通义千问
        </span>
      </template>
      <ChatTongyiView></ChatTongyiView>
    </a-tab-pane>

    <a-tab-pane key="3">
      <template #tab>
        <span>
          openai
        </span>
      </template>
      <ChatOpenaiView></ChatOpenaiView>
    </a-tab-pane>

  </a-tabs>
</template>

<style scoped lang="less">
@import "src/assets/css/theme.less";

.span-title {
  color: #6a6b6b;
}
</style>