<script setup lang="ts">
import DrawOpenaiView from "@/views/KeyView/DrawKeyView/DrawOpenaiView.vue";
import DrawXunfeiView from "@/views/KeyView/DrawKeyView/DrawXunfeiView.vue";
import DrawTongyiView from "@/views/KeyView/DrawKeyView/DrawTongyiView.vue";

import {ref} from "vue";
import {onMounted} from "vue";
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()
const activeKey = ref("1");
</script>

<template>
  <h3 class="span-title">更多</h3>
  <a-tabs v-model:activeKey="activeKey" style="height: 100%">
    <a-tab-pane key="1">
      <template #tab>
        <span>
          PPT生成-讯飞星火
        </span>
      </template>
    </a-tab-pane>

    <a-tab-pane key="2">
      <template #tab>
        <span>
          语音识别-讯飞星火
        </span>
      </template>
    </a-tab-pane>

    <a-tab-pane key="3">
      <template #tab>
        <span>
          情感分析-千帆
        </span>
      </template>
    </a-tab-pane>

    <a-tab-pane key="4">
      <template #tab>
        <span>
          图像识别-ocr
        </span>
      </template>
    </a-tab-pane>


  </a-tabs>
</template>

<style scoped lang="less">
@import "src/assets/css/theme.less";

.span-title {
  color: #6a6b6b;
}
</style>