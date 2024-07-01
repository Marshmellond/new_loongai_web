<script setup lang="ts">
import {ref, onMounted, onUnmounted, watch} from 'vue'
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()
localStorage.setItem('selectedKey', "2");
counter.selectedKeys = [localStorage.getItem("selectedKey")]

import '@vue-flow/core/dist/style.css';
import '@vue-flow/core/dist/theme-default.css';
import LeftView from "@/views/WorkflowView/PanelView/LeftView/LeftView.vue";
import RightView from "@/views/WorkflowView/PanelView/RightView/RightView.vue";
import {VueFlow, Panel, useVueFlow} from '@vue-flow/core'
import {Background} from '@vue-flow/background'
import {ControlButton, Controls} from '@vue-flow/controls'
import {MiniMap} from '@vue-flow/minimap'
import BasicIcon from "@/views/WorkflowView/BasicView/BasicIcon.vue";
import SaveRestoreControls from '@/views/WorkflowView/SaveUtilsView/Controls.vue'
import "@/views/WorkflowView/BasicView/main.css"

// ------------------------------------变量初始化------------------------------------
const dark = ref(true) // 主题
let selectedNode = ref(null) // 选择节点
const {
  onConnect,
  addEdges,
  onNodesChange,
  onInit,
  onNodeDragStop,
  setViewport,
  getViewport,
  toObject,
  getNodes,
  removeNodes,
  addNodes,
  onEdgesChange,
  applyNodeChanges,
  applyEdgeChanges,
} = useVueFlow();

onConnect(addEdges)
if (localStorage.getItem("vue-flow--save-dark") == "true") {
  dark.value = true
} else {
  dark.value = false
}
if (localStorage.getItem("vue-flow--save-restore")?.length > 0) {
  counter.nodes = JSON.parse(localStorage.getItem("vue-flow--save-restore")).nodes
}

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
const handleNodeClick = (event) => {
  selectedNode.value = event.node.id;
};

// ------------------------------------删除node------------------------------------
const deleteNode = (nodeId) => {
  // 从VueFlow中删除节点
  removeNodes([nodeId]);
  // 从counter.nodes中删除节点
  counter.nodes = counter.nodes.filter(node => node.id !== nodeId);
  console.log(counter.nodes)
};

// 监听键盘事件
const handleKeyDown = (event) => {
  if (event.key === 'Backspace' || event.key === 'Delete') {
    // 如果有选中的节点，则删除它
    if (selectedNode.value) {
      deleteNode(selectedNode.value);
      selectedNode.value = null;
    }
  }
};

// 在组件挂载时添加键盘事件监听器
onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

// 在组件卸载时移除键盘事件监听器
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});

// ------------------------------------左上角基本的工具栏------------------------------------
onInit((vueFlowInstance) => {
  vueFlowInstance.fitView()
})


onNodeDragStop(({event, nodes, node}) => {
  console.log('Node Drag Stop', {event, nodes, node})
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
  dark.value = !dark.value
  localStorage.setItem("vue-flow--save-dark", dark.value.toString())
}

// ------------------------------------缩放比例------------------------------------

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
      :class="{ dark }"
      :default-viewport="{ zoom: 1.5 }"
      :min-zoom="0.2"
      :max-zoom="10"
      @node-click="handleNodeClick">
    <Background/>
    <SaveRestoreControls/>
    <MiniMap/>
    <Controls position="top-left">
      <ControlButton title="重置变换" @click="resetTransform">
        <BasicIcon name="reset"/>
      </ControlButton>

      <ControlButton title="无序排列节点位置" @click="updatePos">
        <BasicIcon name="update"/>
      </ControlButton>

      <ControlButton title="切换主题" @click="toggleDarkMode">
        <BasicIcon v-if="dark" name="sun"/>
        <BasicIcon v-else name="moon"/>
      </ControlButton>

      <ControlButton title="日志`" @click="logToObject">
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