<script setup lang="ts">
import {ref, onMounted, onUnmounted, watch, nextTick, reactive} from 'vue'
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()
localStorage.setItem('selectedKey', "2");
counter.selectedKeys = [localStorage.getItem("selectedKey")]

import LeftView from "@/views/WorkflowView/PanelView/LeftView/LeftView.vue";
import RightView from "@/views/WorkflowView/PanelView/RightView/RightView.vue";
import {VueFlow, Panel, useVueFlow} from '@vue-flow/core'
import {Background} from '@vue-flow/background'
import {Controls} from '@vue-flow/controls'
import {MiniMap} from '@vue-flow/minimap'
import SaveRestoreControls from '@/views/WorkflowView/SaveView/Controls.vue'
import "@/views/WorkflowView/css/main.css"


// ------------------------------------节点面板引入------------------------------------
import StartNodeView from "@/views/WorkflowView/CustomNodeView/StartNodeView.vue";
import AiNodeView from "@/views/WorkflowView/CustomNodeView/AiNodeView.vue";
import EndNodeView from "@/views/WorkflowView/CustomNodeView/EndNodeView.vue";
import IFNodeView from "@/views/WorkflowView/CustomNodeView/IFNodeView.vue";
import ReplyNodeView from "@/views/WorkflowView/CustomNodeView/ReplyNodeView.vue";
import VarNodeView from "@/views/WorkflowView/CustomNodeView/VarNodeView.vue";
import NoteNodeView from "@/views/WorkflowView/CustomNodeView/NoteNodeView.vue";
// ------------------------------------节点编辑引入------------------------------------
import StartEditView from "@/views/WorkflowView/ModalNodeView/StartEditView.vue";
import StartEditView2 from "@/views/WorkflowView/ModalNodeView/StartEditView2.vue";
import AiEditView from "@/views/WorkflowView/ModalNodeView/AiEditView.vue";
import EndEditView from "@/views/WorkflowView/ModalNodeView/EndEditView.vue";
import ReplyEditView from "@/views/WorkflowView/ModalNodeView/ReplyEditView.vue";
import NoteEditView from "@/views/WorkflowView/ModalNodeView/NoteEditView.vue";
import VarEditView from "@/views/WorkflowView/ModalNodeView/VarEditView.vue";
import IFEditView from "@/views/WorkflowView/ModalNodeView/IFEditView.vue";
import {message} from "ant-design-vue";
import {PlusOutlined} from "@ant-design/icons-vue";

// ------------------------------------变量初始化------------------------------------
const {
  onConnect,
  addEdges,
  onNodesChange,
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
// ------------------------------------初始化模型列表------------------------------------
const get_ai_mode_data = () => {
  const url = "/api/workflow/get_ai_mode_data"
  fetch(url).then((res) => {
    if (res.ok) {
      return res.json()
    }
  }).then((data) => {
    if (data["code"] == 1) {
      counter.edit_mod_options = data["data"]["edit_mod_options"]
      counter.edit_app_options = data["data"]["edit_app_options"]
      counter.edit_mod_img_options = data["data"]["edit_mod_img_options"]
      counter.edit_app_img_options = data["data"]["edit_app_img_options"]
    }
  })
}
get_ai_mode_data()
// ------------------------------------获取localStorage数据------------------------------------
const get_local_flow_data = () => {
  let local_flow_data = localStorage.getItem("flow_data")
  if (local_flow_data?.length > 0) {
    try {
      let json_flow_data = JSON.parse(local_flow_data)
      if (json_flow_data.nodes.length > 0) {
        counter.flow_data = json_flow_data
      }
    } catch (e) {
      console.log(e)
    }
  }
}

// ------------------------------------上传工作流数据至数据库------------------------------------
const set_flow_data = () => {
  const url2 = "/api/workflow/set_flow_data"
  let body = {
    flow_data_select: counter.flow_data_select,
    flow_data: JSON.stringify(counter.flow_data)
  }
  fetch(url2, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body),
    credentials: "include"
  }).then((res) => {
    if (res.ok) {
      return res.json()
    }
  }).then((data) => {
    if (data["code"] == 1) {
      message.success("上传工作流数据至数据库成功")
    }
  })
}
// ------------------------------------获取工作流数据------------------------------------
const get_flow_data = () => {
  const url2 = "/api/workflow/get_flow_data"
  let body = {
    flow_data_select: counter.flow_data_select,
  }
  fetch(url2, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body),
    credentials: "include"
  }).then((res) => {
    if (res.ok) {
      return res.json()
    }
  }).then((data) => {
    if (data["code"] == 1) {
      let flow_data = data["data"]["flow_data"]
      counter.flow_data = JSON.parse(flow_data)
      localStorage.setItem("flow_data", flow_data)
      counter.flow_data_status = true
    }
  })
}
// ------------------------------------获取工作流列表------------------------------------
const get_flow_data_list = (flow_data_select_status: Boolean = false, get_flow_data_status: Boolean = false) => {
  counter.flow_data_status = false
  const url = "/api/workflow/get_flow_data_list"
  fetch(url).then((res) => {
    if (res.ok) {
      return res.json()
    }
  }).then((data) => {
    if (data["code"] == 1) {
      counter.flow_data_list = data["data"]["flow_data_list"]
    }
    if (counter.flow_data_list.length !== 0) {
      if (flow_data_select_status) {
        localStorage.setItem('flow_data_select', counter.flow_data_list[0][0]);
        counter.flow_data_select = counter.flow_data_list[0][0]
      }
      if (get_flow_data_status) {
        if (counter.flow_data_select !== "") {
          get_flow_data()
        }
      } else {
        get_local_flow_data()
      }
    } else {
      localStorage.setItem('flow_data_select', "");
      counter.flow_data_select = "";
    }
  })
}
// ------------------------------------新增工作流------------------------------------

const on_add_flow_data = () => {
  const ai_id = `ai_${Date.now().toString()}`
  const flow_data = {
    "nodes": [{
      id: `start_${Date.now().toString()}`,
      data: {
        variable: [
          {
            id: "0",
            name: "输入内容",
            label: "content",
            value: "",
            max_len: "40",
            type: "String",
            must: true
          },
        ],
        flow_name: "",
        flow_order: "",
        flow_create_time: "",
        isSelected: false,
      },
      type: 'start', // 节点类型
      position: {x: 100, y: 400},
    }, {
      id: `end_${Date.now().toString()}`,
      data: {
        variable_print: [],
        variable_content: [],
        isSelected: false,
      },
      type: 'end', // 节点类型
      position: {x: 900, y: 420},
    }, {
      id: ai_id,
      data: {
        edit_mod: [
          "openai",
          0
        ],
        edit_mod_view: "gpt-3.5-turbo",
        edit_mod_img: "http://127.0.0.1:8000/img/head?path=api&name=openai.png",
        app_mod: [
          "无"
        ],
        app_mod_view: "无",
        app_mod_img: "http://127.0.0.1:8000/img/head?path=model&name=null.png",
        system: "",
        input: "",
        print: `AI回复内容1`,
        order: 1,
        isSelected: false,
        id: ai_id,
      },
      type: 'ai', // 节点类型
      position: {x: 500, y: 250},
    }], "edges": [], "position": [],
  }


  const url = "/api/workflow/add_flow_data"
  let body = {
    flow_data: JSON.stringify(flow_data),
  }
  fetch(url, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body),
    credentials: "include"
  }).then((res) => {
    if (res.ok) {
      return res.json()
    }
  }).then((data) => {
    if (data["code"] == 1) {
      set_flow_data()
      get_flow_data_list(true, true)
      message.success("新增工作流成功")
    }
  })
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

const handleConnect = () => {
  localStorage.setItem("flow_data", JSON.stringify(toObject()))
}
// ------------------------------------点击空白背景取消选中node------------------------------------
const handlePaneClickNode = () => {
  counter.selectedNode = null;
  counter.selectedEdge = null;
  counter.flow_data.nodes = counter.flow_data.nodes.map(n => ({
    ...n,
    data: {
      ...n.data,
      isSelected: false
    }
  }));
  counter.flow_data.edges = counter.flow_data.edges.map(e => ({
    ...e,
    style: {
      stroke: '#9fbcfc',
      strokeWidth: 4,
    }
  }));
};
// ------------------------------------选中node------------------------------------
const handleNodeClick = (event) => {
  handlePaneClickNode()
  counter.selectedNode = event.node.id;
  counter.flow_data.nodes = counter.flow_data.nodes.map(n => ({
    ...n,
    data: {
      ...n.data,
      isSelected: n.id === event.node.id
    }
  }));
};

// ------------------------------------选中edge------------------------------------
const handleEdgeClick = (event) => {
  handlePaneClickNode()
  counter.selectedEdge = event.edge.id;
  for (let i = 0; i < counter.flow_data.edges.length; i++) {
    if (counter.flow_data.edges[i].id == counter.selectedEdge) {
      counter.flow_data.edges[i] = {
        ...counter.flow_data.edges[i],
        style: {
          stroke: '#336ffd',
          strokeWidth: 5
        }
      }
    }
  }
};

// ------------------------------------添加edge------------------------------------
onConnect((connection) => {
  connection.id = `vueflow__edge-${connection.source}-${connection.target}`
  connection.style = {
    stroke: '#9fbcfc',
    strokeWidth: 4,
  }
  let add_connection_edge = ref(true) // 判断重新添加
  for (let i = 0; i < counter.flow_data.edges.length; i++) {
    let flow_temp_data = counter.flow_data.edges[i].id.replace("vueflow__edge-", "").split("-")
    if ((flow_temp_data[0] === connection.source && flow_temp_data[1] === connection.target) || (flow_temp_data[0] === connection.target && flow_temp_data[1] === connection.source)) {
      add_connection_edge.value = false
    }
  }
  if (connection.source === connection.target) {
    message.warn("连接对象错误")
  } else if ((connection.sourceHandle === "left") || (connection.targetHandle === "right")) {
    message.warn("连接方向错误")
  } else if (!add_connection_edge.value) {
    message.warn("请勿重复连接节点")
  } else {
    counter.flow_data.edges.push(reactive(connection))
  }
})
// ------------------------------------删除edge------------------------------------
const deleteEdge = (edgeId) => {
  counter.flow_data.edges = counter.flow_data.edges.filter(edge => edge.id !== edgeId);
};
// 监听键盘事件
const handleKeyDown = (event) => {
  if (counter.edit_start) {
    if (event.key === 'Backspace' || event.key === 'Delete') {
      // 如果有选中的边，则删除它
      if (counter.selectedEdge) {
        deleteEdge(counter.selectedEdge);
        counter.selectedEdge = null;
      }
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

</script>

<template>
  <div class="div1">
    <LeftView></LeftView>
  </div>
  <div class="div2" v-if="counter.flow_data_status">
    <RightView></RightView>
  </div>
  <div class="basic-blank" v-if="counter.flow_data_list.length===0">
    <span class="basic-blank-title1">AI工作流</span>
    <a-button type="primary" size="large" class="ant-button1" @click="on_add_flow_data" style="margin-left: 0.2vw">
      <PlusOutlined style="color: black"/>
      <span class="basic-blank-title2">新建工作流</span>
    </a-button>
  </div>
  <StartEditView class="div3" v-if="counter.select_modal_node=='start_edit'"></StartEditView>
  <StartEditView2 class="div4" v-if="counter.select_modal_node2"></StartEditView2>
  <AiEditView class="div3" v-if="counter.select_modal_node=='ai_edit'"></AiEditView>
  <EndEditView class="div3" v-if="counter.select_modal_node=='end_edit'"></EndEditView>
  <ReplyEditView class="div3" v-if="counter.select_modal_node=='reply_edit'"></ReplyEditView>
  <NoteEditView class="div3" v-if="counter.select_modal_node=='note_edit'"></NoteEditView>
  <VarEditView class="div3" v-if="counter.select_modal_node=='var_edit'"></VarEditView>
  <IFEditView class="div3" v-if="counter.select_modal_node=='if_edit'"></IFEditView>
  <VueFlow
      class="basic-flow"
      :nodes="counter.flow_data.nodes"
      v-if="counter.flow_data_status"
      :edges="counter.flow_data.edges"
      :default-viewport="{ x: 0, y: 0, zoom: 1 }"
      :min-zoom="0.2"
      :max-zoom="10"
      @node-click="handleNodeClick"
      @node-drag-start="handleNodeClick"
      @pane-click="handlePaneClickNode"
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
      <VarNodeView v-bind="nodeProps"/>
    </template>
    <template #node-note="nodeProps">
      <NoteNodeView v-bind="nodeProps"/>
    </template>
    <Background/>
    <SaveRestoreControls/>
    <MiniMap/>
    <Controls position="top-left">
    </Controls>
  </VueFlow>
</template>

<style scoped lang="less">
.basic-blank {
  position: relative;
  width: 84.3vw;
  left: 10vw;
  height: 95.5vh;
  background: @theme-background-color2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .basic-blank-title1 {
    color: black;
    font-size: 32px;
    margin-bottom: 2vh;
  }

  .ant-button1 {
    position: relative;
    width: 15%;
    background: #fdfdfd;
    border: 1px solid #e4e4e4;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    &:hover {
      background: #f0f0f0;
    }

    .basic-blank-title2 {
      color: black;
    }
  }
}

.div1 {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 10vw;
  height: 95.5vh;
  position: absolute;
  background: @theme-background-color;
  border-left: 1px solid @theme-border-color;
  border-right: 1px solid @theme-border-color;
}

.div2 {
  display: flex;
  flex-direction: column;
  width: 14.3vw;
  height: 95.5vh;
  position: absolute;
  overflow: hidden;
  right: 0;
  border-left: 1px solid @theme-border-color;
  background: @theme-background-color;
}

.div3 {
  position: absolute;
  z-index: 3000;
}

.div4 {
  position: absolute;
  z-index: 4000 !important;
}
</style>