<script setup lang="ts">
import {ref, onMounted, onUnmounted, watch} from 'vue'
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()
localStorage.setItem('selectedKey', "2");
counter.selectedKeys = [localStorage.getItem("selectedKey")]

import LeftView from "@/views/WorkflowView/PanelView/LeftView/LeftView.vue";
import RightView from "@/views/WorkflowView/PanelView/RightView/RightView.vue";
import '@vue-flow/core/dist/style.css';
import '@vue-flow/core/dist/theme-default.css';
import {VueFlow, Panel, useVueFlow} from '@vue-flow/core'
import {Background} from '@vue-flow/background'
import {ControlButton, Controls} from '@vue-flow/controls'
import {MiniMap} from '@vue-flow/minimap'
import Icon from "@ant-design/icons-vue";
import BasicIcon from "@/views/WorkflowView/BasicView/BasicIcon.vue";
import SaveRestoreControls from '@/views/WorkflowView/SaveUtilsView/Controls.vue'
import "@/views/WorkflowView/BasicView/main.css"

counter.nodes = JSON.parse(localStorage.getItem("vue-flow--save-restore")).nodes
console.log(counter.nodes)
// ------------------------------------变量初始化------------------------------------
const {
  onConnect,
  addEdges,
  onNodesChange,
  getNodes,
  removeNodes,
  addNodes,
  onInit,
  onNodeDragStop,
  setViewport,
  toObject
} = useVueFlow();
onConnect(addEdges)
let selectedNode = ref(null)


// ------------------------------------移动node------------------------------------
const handleNodesChange = (changes) => { // node移动变化
  changes.forEach(change => {
    if (change.type === 'position' && change.position) {
      const nodeIndex = counter.nodes.findIndex(n => n.id === change.id);
      if (nodeIndex !== -1) {
        counter.nodes[nodeIndex].position = change.position;
      }
    }
  });
};
onNodesChange(handleNodesChange);


watch(
    () => counter.nodes,
    (newNodes) => {
      localStorage.setItem("vue-flow--save-restore", JSON.stringify(toObject()))
    },
    {deep: true}
);

// ------------------------------------选中node------------------------------------
const handleNodeClick = (event, node) => {
  console.log(event, node)
}
// ------------------------------------左上角基本的工具栏------------------------------------
onInit((vueFlowInstance) => {
  vueFlowInstance.fitView()
})


onNodeDragStop(({event, nodes, node}) => {
  console.log('Node Drag Stop', {event, nodes, node})
})


onConnect((connection) => {
  addEdges(connection)
})


function updatePos() {
  counter.nodes = counter.nodes.map((node) => {
    return {
      ...node,
      position: {
        x: Math.random() * 400,
        y: Math.random() * 400,
      },
    }
  })
}


function logToObject() {
  console.log(toObject())
}


function resetTransform() {
  setViewport({x: 0, y: 0, zoom: 1})
}

function toggleDarkMode() {
  counter.dark = !counter.dark
}

</script>

<template>
  <div class="div1">
    <LeftView></LeftView>
  </div>
  <div class="div2">
    <RightView></RightView>
  </div>
  <VueFlow
      class="basic-flow"
      :nodes="counter.nodes"
      :edges="counter.edges"
      :class="counter.dark"
      :default-viewport="{ zoom: 1.5 }"
      :min-zoom="0.2"
      :max-zoom="4"
      @node-click="handleNodeClick">
    <SaveRestoreControls/>
    <Background/>
    <MiniMap/>
    <Controls position="top-left">
      <ControlButton title="Reset Transform" @click="resetTransform">
        <BasicIcon name="reset"/>
      </ControlButton>

      <ControlButton title="Shuffle Node Positions" @click="updatePos">
        <BasicIcon name="update"/>
      </ControlButton>

      <ControlButton title="Toggle Dark Mode" @click="toggleDarkMode">
        <BasicIcon v-if="counter.dark" name="sun"/>
        <BasicIcon v-else name="moon"/>
      </ControlButton>

      <ControlButton title="Log `toObject`" @click="logToObject">
        <BasicIcon name="log"/>
      </ControlButton>
    </Controls>
  </VueFlow>

</template>

<style scoped lang="less">

.div1 {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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