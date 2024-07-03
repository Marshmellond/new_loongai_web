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


// ------------------------------------节点面板引入------------------------------------
import StartNodeView from "@/views/WorkflowView/CustomNodeView/StartNodeView.vue";
import AiNodeView from "@/views/WorkflowView/CustomNodeView/AiNodeView.vue";
import EndNodeView from "@/views/WorkflowView/CustomNodeView/EndNodeView.vue";
import IFNodeView from "@/views/WorkflowView/CustomNodeView/IFNodeView.vue";
import ReplyNodeView from "@/views/WorkflowView/CustomNodeView/ReplyNodeView.vue";
import VarUpdateNodeView from "@/views/WorkflowView/CustomNodeView/VarUpdateNodeView.vue";
// ------------------------------------节点编辑引入------------------------------------
import StartEditView from "@/views/WorkflowView/ModalNodeView/StartEditView.vue";
import {message} from "ant-design-vue";

// ------------------------------------变量初始化------------------------------------
const dark = ref(true) // 主题
let selectedNode = ref(null) // 选择节点
let selectedEdge = ref(null) // 选择边
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
if (localStorage.getItem("flow_dark") == "true") {
  dark.value = true
} else {
  dark.value = false
}
let local_flow_data = localStorage.getItem("flow_data")
if (local_flow_data?.length > 0) {
  try {
    let json_flow_data = JSON.parse(localStorage.getItem("flow_data"))
    if (json_flow_data.nodes.length > 0) {
      counter.flow_data = json_flow_data
    }
  } catch (e) {
    console.log(e)
  }
}

// ------------------------------------移动node------------------------------------
const handleNodesChange = (changes) => { // node移动变化
  changes.forEach(change => {
    if (change.type === 'position' && change.position) {
      const nodeIndex = counter.flow_data.nodes.findIndex(n => n.id === change.id);
      if (nodeIndex !== -1) {
        counter.flow_data.nodes[nodeIndex].position = change.position;
      }
    }
  });
};
onNodesChange(handleNodesChange);

watch(
    () => counter.flow_data,
    (newNodes) => {
      localStorage.setItem("flow_data", JSON.stringify(toObject()))
    },
    {deep: true}
);

// ------------------------------------选中node------------------------------------
const handleNodeClick = (event) => {
  selectedNode.value = event.node.id;
  counter.flow_data.nodes = counter.flow_data.nodes.map(n => ({
    ...n,
    data: {
      ...n.data,
      isSelected: n.id === event.node.id
    }
  }));
};

// ------------------------------------点击空白背景取消选中node------------------------------------
const handlePaneClick = () => {
  selectedNode.value = null;
  counter.flow_data.nodes = counter.flow_data.nodes.map(n => ({
    ...n,
    data: {
      ...n.data,
      isSelected: false
    }
  }));
};
// ------------------------------------选中edge------------------------------------
const handleEdgeClick = (event) => {
  selectedEdge.value = event.edge.id;
};
// ------------------------------------连接node------------------------------------
const handleConnect = () => {
  localStorage.setItem("flow_data", JSON.stringify(toObject()))
}

// ------------------------------------删除node------------------------------------
const deleteNode = (nodeId) => {
  console.log("被删了卧槽")
  // 从VueFlow中删除节点
  removeNodes([nodeId]);
  // 从counter.nodes中删除节点
  counter.flow_data.nodes = counter.flow_data.nodes.filter(node => node.id !== nodeId);
};

// ------------------------------------删除edge------------------------------------
const deleteEdge = (edgeId) => {
  // 从VueFlow中删除边
  const updatedEdges = counter.flow_data.edges.filter(edge => edge.id !== edgeId);
  counter.flow_data.edges = updatedEdges;
};

// 监听键盘事件
const handleKeyDown = (event) => {
  if (event.key === 'Backspace' || event.key === 'Delete') {
    // 如果有选中的节点，则删除它
    if (selectedNode.value) {
      if (selectedNode.value.startsWith("start")) {
        message.warn("开始节点不可删除")
        event.preventDefault();
        return
      }
      deleteNode(selectedNode.value);
      selectedNode.value = null;
    }
    // 如果有选中的边，则删除它
    if (selectedEdge.value) {
      deleteEdge(selectedEdge.value);
      selectedEdge.value = null;
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
})

function updatePos() {
  counter.flow_data.nodes = counter.flow_data.nodes.map((node) => {
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
}

function resetTransform() {
  setViewport({x: 0, y: 0, zoom: 1})
}

function toggleDarkMode() {
  dark.value = !dark.value
  localStorage.setItem("flow_dark", dark.value.toString())
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
  <StartEditView class="div3" v-if="counter.select_modal_node=='start_edit'"></StartEditView>
  <VueFlow
      class="basic-flow"
      :nodes="counter.flow_data.nodes"
      :edges="counter.flow_data.edges"
      :class="{ dark }"
      :default-viewport="{ zoom: 1.5 }"
      :min-zoom="0.2"
      :max-zoom="10"
      @node-click="handleNodeClick"
      @node-drag-start="handleNodeClick"
      @pane-click="handlePaneClick"
      @edge-click="handleEdgeClick"
      :delete-key-code="null"
      @connect="handleConnect">
    <template #node-ai="nodeProps">
      <AiNodeView v-bind="nodeProps"/>
    </template>
    <template #node-start="nodeProps">
      <StartNodeView v-bind="nodeProps"/>
    </template>
    <template #node-end="nodeProps">
      <EndNodeView v-bind="nodeProps"/>
    </template>
    <template #node-if="nodeProps">
      <IFNodeView v-bind="nodeProps"/>
    </template>
    <template #node-reply="nodeProps">
      <ReplyNodeView v-bind="nodeProps"/>
    </template>
    <template #node-var="nodeProps">
      <VarUpdateNodeView v-bind="nodeProps"/>
    </template>
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

      <ControlButton title="日志" @click="logToObject">
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

.div3 {
  position: absolute;
  z-index: 3000;
}
</style>