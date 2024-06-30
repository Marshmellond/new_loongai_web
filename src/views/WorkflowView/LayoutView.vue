<script setup lang="ts">
import LeftView from "@/views/WorkflowView/LeftView.vue";
import RightView from "@/views/WorkflowView/RightView.vue";
import '@vue-flow/core/dist/style.css';
import '@vue-flow/core/dist/theme-default.css';
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()
localStorage.setItem('selectedKey', "2");
counter.selectedKeys = [localStorage.getItem("selectedKey")]
import {ref, onMounted} from 'vue'
import {VueFlow, Panel, useVueFlow} from '@vue-flow/core'
import {Background} from '@vue-flow/background'
import {ControlButton, Controls} from '@vue-flow/controls'
import {MiniMap} from '@vue-flow/minimap'
import Icon from "@ant-design/icons-vue";

const nodes = ref([
  {
    id: '1',
    position: {x: 50, y: 50},
    data: {label: 'Node 1',},
  }
]);
</script>

<template>
  <div class="div1">
    <LeftView></LeftView>
  </div>
  <div class="div2">
    <RightView></RightView>
  </div>
  <VueFlow :nodes="nodes" class="div-flow">
    <Background/>
  </VueFlow>

</template>

<style scoped lang="less">


.div-flow {
  position: relative;
  width: 74.3vw;
  left: 10vw;
}

.div1 {
  display: flex;
  flex-direction: column;
  width: 10vw;
  height: 95.5vh;
  position: absolute;
  background: @theme-background-color;
  border-left: 1px solid @theme-border-color;
}


.div2 {
  display: flex;
  flex-direction: column;
  width: 10vw;
  height: 95.5vh;
  position: absolute;
  right: 0;
  background: @theme-background-color;
}
</style>