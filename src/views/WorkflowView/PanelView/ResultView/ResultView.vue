<script setup lang="ts">
import {ref, onMounted, onUnmounted, watch} from 'vue'
import Icon, {DeleteOutlined, ExpandOutlined, PlusOutlined} from "@ant-design/icons-vue";
import {useCounterStore} from '@/stores/counter'
import {marked} from "marked";

const counter = useCounterStore()
const handleOk = () => {
  counter.workflow_result_open = false
}
watch(() => counter.workflow_result_open, () => {
  counter.edit_start = !counter.workflow_result_open
})
</script>

<template>
  <a-modal v-model:open="counter.workflow_result_open" title="结果"
           @ok="handleOk"
           okText="保存"
           cancelText="关闭"
           width="100vw"
           style="top: 1vh">
    <div
        v-for="(i, index) in counter.flow_data.nodes.filter(item => item.type === 'end')[0].data.variable_content"
        :key="index"
        class="div1">
      <span class="div1-title">{{ i.input }}</span>
      <div class="div1-content" v-html="marked.parse(i.value)"></div>
    </div>
  </a-modal>
</template>

<style scoped lang="less">

.div1 {
  position: relative;

  .div1-title {
    font-weight: 900;
    margin-left: 1vw;
  }

  .div1-content {
    margin-bottom: 2vh;
    margin-top: 0.5vh;
    margin-left: 1vw;
    border-radius: 5px;
    border: 1px solid @theme-border-color;
    min-height: 5vh;
    white-space: pre-wrap;
    word-break: break-word;
  }
}
</style>