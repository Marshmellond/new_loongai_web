<script setup lang="ts">
import {ref, onMounted, onUnmounted, watch} from 'vue'
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()
localStorage.setItem('selectedKey', "2");
counter.selectedKeys = [localStorage.getItem("selectedKey")]

import LeftView from "@/views/WorkflowView/LeftView.vue";
import RightView from "@/views/WorkflowView/RightView.vue";
import '@vue-flow/core/dist/style.css';
import '@vue-flow/core/dist/theme-default.css';
import {VueFlow, Panel, useVueFlow} from '@vue-flow/core'
import {Background} from '@vue-flow/background'
import {ControlButton, Controls} from '@vue-flow/controls'
import {MiniMap} from '@vue-flow/minimap'
import Icon from "@ant-design/icons-vue";

// ------------------------------------变量初始化------------------------------------
const {onConnect, addEdges, onNodesChange, getNodes, removeNodes, addNodes} = useVueFlow();
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
    },
    {deep: true}
);

// ------------------------------------选中node------------------------------------
const handleNodeClick = (event, node) => {
  console.log(event, node)
}

// ------------------------------------画布右键菜单------------------------------------
let contextMenu = ref({
  x: 0,
  y: 0,
  show: false,
  nodeId: null
})

const handleContextMenu = (event) => {
  event.preventDefault()
  contextMenu.value.show = true
  contextMenu.value.x = event.clientX - 280
  contextMenu.value.y = event.clientY - 100
}

const handleContextMenuAction = (action) => {
  if (action === 'delete' && contextMenu.value.nodeId) {
    removeNodes([contextMenu.value.nodeId])
    counter.nodes = counter.nodes.filter(node => node.id !== contextMenu.value.nodeId)
  } else {
    // 根据不同的 action 添加不同的节点
    const newNode = {
      id: `node_${counter.nodes.length + 1}`,
      type: action,
      position: { x: contextMenu.value.x, y: contextMenu.value.y },
      // 其他节点属性...
    }
    addNode(newNode)
    counter.nodes.push(newNode)
  }
  contextMenu.value.show = false
}

// 监听整个页面的点击事件，用于关闭右键菜单
const handleClick = () => {
  if (contextMenu.value.show) {
    contextMenu.value.show = false
  }
}

onMounted(() => {
  window.addEventListener('click', handleClick)
})

onUnmounted(() => {
  window.removeEventListener('click', handleClick)
})
</script>

<template>
  <div class="div1">
    <LeftView></LeftView>
  </div>
  <div class="div2">
    <RightView></RightView>
  </div>
  <VueFlow :nodes="counter.nodes" class="div-flow" @node-click="handleNodeClick" @contextmenu="handleContextMenu">
    <Background/>
  <div v-if="contextMenu.show" class="context-menu" :style="{ left: contextMenu.x + 'px', top: contextMenu.y + 'px' }">
    <ul>
      <li @click="handleContextMenuAction('add')">增加节点</li>
      <li @click="handleContextMenuAction('reply')">指定回复</li>
      <li @click="handleContextMenuAction('decision')">判断器</li>
      <li @click="handleContextMenuAction('variable')">变量更新</li>
      <li v-if="contextMenu.nodeId" @click="handleContextMenuAction('delete')">删除节点</li>
    </ul>
  </div>
  </VueFlow>

</template>

<style scoped lang="less">
.context-menu {
  position: absolute;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  z-index: 1000;
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    padding: 4px 8px;
    cursor: pointer;
    border-bottom: 1px solid #ddd;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background-color: #eee;
    }
  }
}

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