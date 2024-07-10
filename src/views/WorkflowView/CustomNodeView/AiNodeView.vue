<script setup>
import {Position, Handle, useVueFlow} from '@vue-flow/core';
import Icon, {DeleteOutlined, FormOutlined} from "@ant-design/icons-vue";
import {ref, onMounted, onUnmounted, watch} from 'vue'
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()
const props = defineProps(['data']);
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
// ------------------------------------编辑node------------------------------------
const show_edit = () => {
  setTimeout(() => {
    counter.ai_node_data = counter.flow_data.nodes.filter(node => node.id === counter.selectedNode)
    counter.ai_node_data = counter.ai_node_data[0]
    counter.select_modal_node = 'ai_edit'
    counter.input_options = []
    for (let i of counter.flow_data.nodes[0].data.variable) {
      counter.input_options.push({value: i.name, label: i.name})
    }


    let temp_edges = [];

    function func_add_edge(nodeId) {
      for (let i = 0; i < counter.flow_data.edges.length; i++) {
        let edge = counter.flow_data.edges[i];
        if (edge.target === nodeId && edge.targetHandle === "left") {
          temp_edges.push(edge.source);
          func_add_edge(edge.source);
        }
      }
    }

    func_add_edge(counter.selectedNode);
    for (let i = 0; i < counter.flow_data.nodes.length; i++) {
      if (temp_edges.includes(counter.flow_data.nodes[i].id) && counter.flow_data.nodes[i].type === "ai") {
        counter.input_options.push({
          value: counter.flow_data.nodes[i].data.print,
          label: counter.flow_data.nodes[i].data.print
        })
      }
    }
    counter.ai_edit_open = true
  }, 100)
}
// ------------------------------------删除node------------------------------------
const deleteNode = (nodeId) => {
  let id = counter.flow_data.nodes.filter(node => node.id === nodeId)[0].data.print_id
  console.log(id)
  counter.flow_data.nodes = counter.flow_data.nodes.filter(node => node.id !== nodeId);
  counter.flow_data.edges = counter.flow_data.edges.filter((edge) => {
    let flow_temp_data = edge.id.replace("vueflow__edge-", "").split("-");
    return flow_temp_data[0] !== nodeId && flow_temp_data[1] !== nodeId;
  });

  for (let i = 0; i < counter.flow_data.nodes.length; i++) {
    if (counter.flow_data.nodes[i].type === "ai" || counter.flow_data.nodes[i].type === "reply") {
      if (counter.flow_data.nodes[i].data.input_id === id) {
        counter.flow_data.nodes[i].data.input = ""
      }
    }
    if (counter.flow_data.nodes[i].type === "if") {
      for (let a = 0; a < counter.flow_data.nodes[i].data.condition.length; a++) {
        if (counter.flow_data.nodes[i].data.condition[a].input_id === id) {
          counter.flow_data.nodes[i].data.condition[a].input = ""
        }
      }
    }
    if (counter.flow_data.nodes[i].type === "var") {
      for (let a = 0; a < counter.flow_data.nodes[i].data.var_update_data.length; a++) {
        if (counter.flow_data.nodes[i].data.var_update_data[a].input_id === id) {
          counter.flow_data.nodes[i].data.var_update_data[a].input = ""
        }
      }
    }
    if (counter.flow_data.nodes[i].type === "end") {
      for (let a = 0; a < counter.flow_data.nodes[i].data.variable_content.length; a++) {
        if (counter.flow_data.nodes[i].data.variable_content[a].input_id === id) {
          counter.flow_data.nodes[i].data.variable_content[a].input = ""
          counter.flow_data.nodes[i].data.variable_print[a][0] = ""
        }
      }
    }
  }

};
</script>
<template>
  <div class="ai-node" :class="{'selected': data.isSelected}">
    <Handle type="source" position="left" id="left" class="div-Handle"/>
    <Handle type="source" position="right" id="right" class="div-Handle"/>
    <div class="div0">
      <div class="div0-ico">
        <icon :style="{ color: '#000000'}">
          <template #component>
            <svg t="1719928349868" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="6773" width="18" height="18">
              <path
                  d="M946.5 505L560.1 118.8l-25.9-25.9c-12.3-12.2-32.1-12.2-44.4 0L77.5 505c-12.3 12.3-18.9 28.6-18.8 46 0.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8 12.1-12.1 18.7-28.2 18.7-45.3 0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204z m217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"
                  p-id="6774" fill="#ffffff"></path>
            </svg>
          </template>
        </icon>
      </div>
      <span class="div0-title">AI对话{{ data.order }}</span>
      <DeleteOutlined class="div0-edit1" @click="deleteNode(data.id)"/>
      <FormOutlined class="div0-edit2" @click="show_edit"/>
    </div>

    <div class="div1" style="margin-top: 2vh;">
      <div class="div1-1">
        <icon :style="{ color: '#4381fd'}" class="div1-1-ico">
          <template #component>
            <svg t="1720073288376" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="7701" width="16" height="16">
              <path
                  d="M558.6 960.2h-157c-27.5 0-50-22.5-50-50v-795c0-27.5 22.5-50 50-50h157.1c27.5 0 50 22.5 50 50v795.1c-0.1 27.4-22.6 49.9-50.1 49.9z"
                  p-id="7702" fill="#4381fd"></path>
            </svg>
          </template>
        </icon>
        <span class="div1-1-title">模型</span>
      </div>
      <div class="div1-2">
        <a-avatar shape="square" class="div1-2-ico">
          <template #icon>
            <img :src="data.edit_mod_img" alt="">
          </template>
        </a-avatar>
        <span class="div1-2-title">{{ data.edit_mod_view }}</span>
      </div>
    </div>

    <div class="div1">
      <div class="div1-1">
        <icon :style="{ color: '#4381fd'}" class="div1-1-ico">
          <template #component>
            <svg t="1720073288376" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="7701" width="16" height="16">
              <path
                  d="M558.6 960.2h-157c-27.5 0-50-22.5-50-50v-795c0-27.5 22.5-50 50-50h157.1c27.5 0 50 22.5 50 50v795.1c-0.1 27.4-22.6 49.9-50.1 49.9z"
                  p-id="7702" fill="#4381fd"></path>
            </svg>
          </template>
        </icon>
        <span class="div1-1-title">应用</span>
      </div>
      <div class="div1-2">
        <a-avatar shape="square" class="div1-2-ico">
          <template #icon>
            <img :src="data.app_mod_img" alt="">
          </template>
        </a-avatar>
        <span class="div1-2-title">{{ data.app_mod_view }}</span>
      </div>
    </div>

    <div class="div1">
      <div class="div1-1">
        <icon :style="{ color: '#4381fd'}" class="div1-1-ico">
          <template #component>
            <svg t="1720073288376" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="7701" width="16" height="16">
              <path
                  d="M558.6 960.2h-157c-27.5 0-50-22.5-50-50v-795c0-27.5 22.5-50 50-50h157.1c27.5 0 50 22.5 50 50v795.1c-0.1 27.4-22.6 49.9-50.1 49.9z"
                  p-id="7702" fill="#4381fd"></path>
            </svg>
          </template>
        </icon>
        <span class="div1-1-title">提示词</span>
      </div>
      <div class="div1-2">
        <span class="div1-2-title">{{ data.system }}</span>
      </div>
    </div>

    <div class="div1">
      <div class="div1-1">
        <icon :style="{ color: '#4381fd'}" class="div1-1-ico">
          <template #component>
            <svg t="1720073288376" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="7701" width="16" height="16">
              <path
                  d="M558.6 960.2h-157c-27.5 0-50-22.5-50-50v-795c0-27.5 22.5-50 50-50h157.1c27.5 0 50 22.5 50 50v795.1c-0.1 27.4-22.6 49.9-50.1 49.9z"
                  p-id="7702" fill="#4381fd"></path>
            </svg>
          </template>
        </icon>
        <span class="div1-1-title">用户问题</span>
      </div>
      <div class="div1-2">
        <span class="div1-2-title" style="margin-left: 0">{{ data.input }}</span>
      </div>
    </div>

    <div class="div1">
      <div class="div1-1">
        <icon :style="{ color: '#4381fd'}" class="div1-1-ico">
          <template #component>
            <svg t="1720073288376" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="7701" width="16" height="16">
              <path
                  d="M558.6 960.2h-157c-27.5 0-50-22.5-50-50v-795c0-27.5 22.5-50 50-50h157.1c27.5 0 50 22.5 50 50v795.1c-0.1 27.4-22.6 49.9-50.1 49.9z"
                  p-id="7702" fill="#4381fd"></path>
            </svg>
          </template>
        </icon>
        <span class="div1-1-title">输出结果</span>
      </div>
      <div class="div1-2">
        <span class="div1-2-title" style="margin-left: 0">{{ data.print }}</span>
        <span class="div1-2-title2">String</span>
      </div>
    </div>


  </div>
</template>


<style scoped lang="less">


.div1 {
  display: flex;
  flex-direction: column;
  font-weight: 600;

  .div1-1 {
    display: flex;
    flex-direction: row;
    align-items: center;

    .div1-1-ico {
      margin-top: 1vh;
    }

    .div1-1-title {
      font-size: 15px;
      margin-top: 1vh;
    }
  }

  .div1-2 {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 5px;
    border: 1px solid @theme-border-color;
    padding: 0.4vh;
    margin-top: 0.5vh;
    min-height: 4vh;
    min-width: 14vw;
    max-width: 14vw;

    .div1-2-ico {
      background-color: #e8e4e4;
    }

    .div1-2-title {
      margin-left: 0.5vw;
      white-space: pre-wrap;
      word-break: break-word;

    }

    .div1-2-title2 {
      position: absolute;
      margin-left: 11vw;
    }
  }

}

.div-Handle {
  width: 0.8vw;
  height: 1.6vh;
  background-color: #ffffff;
  border: solid #007bff;
  border-radius: 50%;
}


.div0 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  .div0-ico {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #296ffd;
    border-radius: 7px;
    width: 1.5vw;
    height: 3vh;
    margin-right: 0.3vw;
  }

  .div0-title {
    font-weight: 900;
    font-size: 18px;
    margin-right: 5vw;
  }

  .div0-edit1 {
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    background: #fc2c54;
    border-radius: 7px;
    width: 1.5vw;
    height: 3vh;
    font-size: 15px;
    margin-right: 0.5vw;
  }

  .div0-edit2 {
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    background: #296ffd;
    border-radius: 7px;
    width: 1.5vw;
    height: 3vh;
    font-size: 15px;
  }
}

.selected {
  border: 1px solid #336ffd;
}

.ai-node {
  background: #fdfdfd;
  padding: 1vh;
  border-radius: 5px;
  min-width: 15vw;
  min-height: 45vh;
}


</style>