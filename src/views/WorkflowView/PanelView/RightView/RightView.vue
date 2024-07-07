<script setup lang="ts">
import InputView from "@/views/WorkflowView/PanelView/RightView/InputView.vue";
import ResultView from "@/views/WorkflowView/PanelView/RightView/ResultView.vue";
import {ref, onMounted, onUnmounted, watch} from 'vue'
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()
</script>

<template>
  <div class="div1">
    <span style="font-size: 20px;margin-top: 1vh;margin-bottom: 1vh">运行</span>
  </div>
  <a-tabs v-model:activeKey="counter.right_select_key"
          type="card"
          class="div2">
    <a-tab-pane key="1" tab="输入">
      <InputView></InputView>
    </a-tab-pane>
    <a-tab-pane :key="`${index+2}`" :tab="`结果${item.data.order}`"
                v-for="(item, index) in counter.flow_data.nodes.filter(item => item.type === 'end')"
                force-render>
      <div class="div3">
        <div v-for="(i, index) in item.data.variable_content" :key="index">
          <span class="div2-title">{{ i.name }}</span>
          <div class="div2-content">{{ i.value }}</div>
        </div>
      </div>
    </a-tab-pane>
  </a-tabs>
</template>
<style scoped lang="less">
.div3 {
  height: 84vh;
  overflow: auto;
}

.div2 {
  position: relative;

  .div2-title {
    font-weight: 900;
    margin-left: 1vw;
  }

  .div2-content {
    margin-bottom: 2vh;
    margin-top: 0.5vh;
    margin-left: 1vw;
    border-radius: 5px;
    border: 1px solid @theme-border-color;
    min-height: 5vh;
    max-width: 12vw;
  }
}

.div1 {
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid @theme-border-color;
}


</style>