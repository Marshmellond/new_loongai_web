<script setup lang="ts">
import PptXunfeiView from "@/views/KeyView/MoreKeyView/PptXunfeiView.vue";
import SttXunfeiView from "@/views/KeyView/MoreKeyView/SttXunfeiView.vue";
import EmotionQianfanView from "@/views/KeyView/MoreKeyView/EmotionQianfanView.vue";
import OcrOpenaiView from "@/views/KeyView/MoreKeyView/OcrOpenaiView.vue";
import SttOpenaiView from "@/views/KeyView/MoreKeyView/SttOpenaiView.vue";

import {ref} from "vue";
import {onMounted} from "vue";
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()
const activeKey = ref("1");
</script>

<template>
  <h3 class="span-title">更多Key设置</h3>
  <a-tabs v-model:activeKey="activeKey" style="height: 100%">
    <a-tab-pane key="1">
      <template #tab>
        <span>
          PPT生成-讯飞星火
        </span>
      </template>
      <PptXunfeiView></PptXunfeiView>
    </a-tab-pane>

    <a-tab-pane key="2">
      <template #tab>
        <span>
          语音识别-讯飞星火
        </span>
      </template>
      <SttXunfeiView></SttXunfeiView>
    </a-tab-pane>

    <a-tab-pane key="3">
      <template #tab>
        <span>
          语音识别-openai
        </span>
      </template>
      <SttOpenaiView></SttOpenaiView>
    </a-tab-pane>

    <a-tab-pane key="4">
      <template #tab>
        <span>
          情感分析-千帆
        </span>
      </template>
      <EmotionQianfanView></EmotionQianfanView>
    </a-tab-pane>

    <a-tab-pane key="5">
      <template #tab>
        <span>
          图像识别-ocr
        </span>
      </template>
      <OcrOpenaiView></OcrOpenaiView>
    </a-tab-pane>


  </a-tabs>
</template>

<style scoped lang="less">
@import "src/assets/css/theme.less";

.span-title {
  color: #6a6b6b;
}
</style>