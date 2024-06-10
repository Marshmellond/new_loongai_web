<script setup lang="ts">

import {ref} from "vue";
import DrawOpenaiView from "@/views/KeyView/DrawKeyView/DrawOpenaiView.vue";
import {onMounted} from "vue";
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()
const activeKey = ref("3");
const get_about_data = () => {
  const url = "/api/key/draw"
  fetch(url).then((res) => {
    return res.json()
  }).then((data) => {
    if (data["code"] == 1) {
      counter.draw_mode_name = data["data"]["draw_mode_name"]
      counter.draw_mode_ver = data["data"]["draw_mode_ver"]
    }
  })
}
onMounted(get_about_data)
</script>

<template>
  <h3 class="span-title">当前选择： {{ counter.draw_mode_name }} | {{ counter.draw_mode_ver }}</h3>
  <a-tabs v-model:activeKey="activeKey" style="height: 100%">
    <a-tab-pane key="3">
      <template #tab>
        <span>
          openai
        </span>
      </template>
      <DrawOpenaiView></DrawOpenaiView>
    </a-tab-pane>

  </a-tabs>
</template>

<style scoped lang="less">
@import "src/assets/css/theme.less";

.span-title {
  color: #6a6b6b;
}
</style>