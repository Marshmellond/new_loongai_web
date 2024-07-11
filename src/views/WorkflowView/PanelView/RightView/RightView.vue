<script setup lang="ts">
import InputView from "@/views/WorkflowView/PanelView/RightView/InputView.vue";
import {ref, onMounted, onUnmounted, watch} from 'vue'
import {useCounterStore} from '@/stores/counter'
import {marked} from 'marked';
import {
  ExpandOutlined,
} from '@ant-design/icons-vue';

const counter = useCounterStore()
const result_add = () => {
  counter.select_modal_node = 'result_view'
  counter.workflow_result_open = true
}
</script>

<template>
  <div class="div1">
    <span style="font-size: 20px;margin-top: 1vh;margin-bottom: 1vh">运行</span>
  </div>
  <a-tabs v-model:activeKey="counter.right_select_key"
          type="card"
          :centered="true"
          class="div2">
    <a-tab-pane key="1" tab="输入">
      <InputView></InputView>
    </a-tab-pane>
    <a-tab-pane :key="`${index+2}`" tab="结果"
                v-for="(item, index) in counter.flow_data.nodes.filter(item => item.type === 'end')"
                force-render>
      <div class="div3" v-if="!counter.workflow_seed_load">
        <div v-for="(i, index) in item.data.variable_content" :key="index">
          <span class="div2-title">{{ i.input }}</span>
          <div class="div2-content" v-html="marked.parse(i.value)"></div>
        </div>
      </div>
      <div class="div4" v-if="counter.workflow_seed_load">
        <a-spin class="chat-show-load"/>
        <span>正在运行中，请稍等</span>
      </div>
      <div class="div5">
        <div class="div5-1" @click="result_add">
          <span style="margin-right: 0.2vw">全屏</span>
          <ExpandOutlined/>
        </div>
      </div>
    </a-tab-pane>
  </a-tabs>
</template>
<style scoped lang="less">

.div5 {
  width: 100%;
  height: 100%;

  .div5-1 {
    width: 4vw;
    border-radius: 5px;
    padding: 1vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    top: 1vh;
    left: 1vw;
    background: #f0f0f0;

    &:hover {
      background: #dad8d8;
    }
  }
}

.div4 {
  height: 78vh;
  overflow: auto;
  border-bottom: 1px solid @theme-border-color;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.div3 {
  height: 78vh;
  overflow: auto;
  border-bottom: 1px solid @theme-border-color;
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
    white-space: pre-wrap;
    word-break: break-word;
  }
}

.div1 {
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid @theme-border-color;
}


</style>