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
    counter.note_node_data = counter.flow_data.nodes.filter(node => node.id === counter.selectedNode)
    counter.note_node_data = counter.note_node_data[0]
    counter.select_modal_node = 'note_edit'
    counter.note_edit_open = true
  }, 100)
}
// ------------------------------------删除node------------------------------------
const deleteNode = (nodeId) => {
  counter.flow_data.nodes = counter.flow_data.nodes.filter(node => node.id !== nodeId);
  counter.flow_data.edges = counter.flow_data.edges.filter((edge) => {
    let flow_temp_data = edge.id.replace("vueflow__edge-", "").split("-");
    return flow_temp_data[0] !== nodeId && flow_temp_data[1] !== nodeId;
  });
};
</script>

<template>
  <div class="note-node" :class="{'selected': data.isSelected}">
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
      <span class="div0-title">备注{{ data.order }}</span>
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
        <span class="div1-1-title">备注内容</span>
      </div>
      <div class="div1-2">
        <span class="div1-2-title">{{ data.content }}</span>
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
    min-height: 10vh;
    min-width: 14vw;
    max-width: 14vw;

    .div1-2-ico {
      background-color: #e8e4e4;
    }

    .div1-2-title {
      margin-left: 0.2vw;
      white-space: pre-wrap;
      word-break: break-word;
    }

    .div1-2-title2 {
      position: absolute;
      margin-left: 11vw;
    }
  }

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
    margin-right: 6vw;
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

.note-node {
  background: #fdfdfd;
  padding: 1vh;
  border-radius: 5px;
  min-width: 15vw;
  min-height: 14vh;
}
</style>