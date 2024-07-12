<script setup lang="ts">
import DrawOpenaiView from "@/views/KeyView/DrawKeyView/DrawOpenaiView.vue";
import DrawXunfeiView from "@/views/KeyView/DrawKeyView/DrawXunfeiView.vue";
import DrawTongyiView from "@/views/KeyView/DrawKeyView/DrawTongyiView.vue";

import {ref} from "vue";
import {onMounted} from "vue";
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()
const activeKey = ref("1");
const get_draw_select = () => {
  const url = "/api/draw/default_select"
  fetch(url).then((res) => {
    return res.json()
  }).then((data) => {
    if (data["code"] == 1) {
      let draw_mod_select = data["data"]["draw_mod_select"]
      localStorage.setItem("draw_mod_select", draw_mod_select)
    }
  })
}
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
onMounted(get_draw_select)
</script>

<template>
  <h3 class="span-title">当前选择： {{ counter.draw_mode_name }} | {{ counter.draw_mode_ver }}</h3>
  <a-tabs v-model:activeKey="activeKey" style="height: 100%">
    <a-tab-pane key="1">
      <template #tab>
        <span>
          讯飞星火
        </span>
      </template>
      <DrawXunfeiView></DrawXunfeiView>
    </a-tab-pane>

    <a-tab-pane key="2">
      <template #tab>
        <span>
          通义千问
        </span>
      </template>
      <DrawTongyiView></DrawTongyiView>
    </a-tab-pane>

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