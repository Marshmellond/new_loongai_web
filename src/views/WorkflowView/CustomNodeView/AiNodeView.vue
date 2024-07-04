<script setup>
import {Position, Handle} from '@vue-flow/core';
import Icon, {FormOutlined} from "@ant-design/icons-vue";
import {ref, onMounted, onUnmounted, watch} from 'vue'
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()
const props = defineProps(['data']);
const show_edit = () => {
  counter.ai_node_data = counter.flow_data.nodes.filter(node => node.id === counter.selectedNode)
  console.log(counter.flow_data.nodes)
  console.log(counter.selectedNode)
  console.log(counter.ai_node_data)
  counter.select_modal_node = 'ai_edit'
  counter.ai_edit_open = true
}
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
      <span class="div0-title">AI 对话</span>
      <FormOutlined class="div0-edit" @click="show_edit"/>
    </div>
    <div class="div1">
      <icon :style="{ color: '#4381fd'}" class="div1-ico">
        <template #component>
          <svg t="1720073288376" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               p-id="7701" width="16" height="16">
            <path
                d="M558.6 960.2h-157c-27.5 0-50-22.5-50-50v-795c0-27.5 22.5-50 50-50h157.1c27.5 0 50 22.5 50 50v795.1c-0.1 27.4-22.6 49.9-50.1 49.9z"
                p-id="7702" fill="#4381fd"></path>
          </svg>
        </template>
      </icon>
      <span class="div1-title">模型</span>
    </div>
    <div class="div2-panel">
      <div class="div2-top">
        <div>
          <icon :style="{ color: '#4381fd'}" class="div2-top-ico">
            <template #component>
              <svg t="1720084901033" class="icon" viewBox="0 0 1024 1024" version="1.1"
                   xmlns="http://www.w3.org/2000/svg" p-id="4065" width="16" height="16">
                <path
                    d="M85.301337 259.231596v679.787027h853.269342V259.295588H85.301337zM792.604924 174.186227H1023.872016V1024H0V174.186227h231.267092L155.308586 42.746657 229.091364 0.127984 329.750781 174.186227h364.370454l100.595425-174.186227 73.84677 42.618673-75.958506 131.567554zM383.952006 385.99975v401.485814l341.269341-200.742907L383.952006 386.063742z"
                    fill="#262626" p-id="4066"></path>
              </svg>
            </template>
          </icon>
          <span>gpt3.5-tuo</span>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.div2-panel {
  background: #f0f2f5;
  border-radius: 5px;
}

.div1 {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1vh;
  margin-top: 2vh;
  font-weight: 600;

  .div1-ico {
    margin-top: 1vh;
  }

  .div1-title {
    font-size: 15px;
    margin-top: 1vh;
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
    margin-right: 7.2vw;
  }

  .div0-edit {
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