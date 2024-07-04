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
      <span class="div0-title">开始</span>
      <FormOutlined class="div0-edit" @click="show_edit"/>
    </div>

    <div class="div2-panel">
      <div class="div2-top">
        <icon :style="{ color: '#4381fd'}" class="div2-top-ico">
          <template #component>
            <svg t="1720073288376" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="7701" width="16" height="16">
              <path
                  d="M558.6 960.2h-157c-27.5 0-50-22.5-50-50v-795c0-27.5 22.5-50 50-50h157.1c27.5 0 50 22.5 50 50v795.1c-0.1 27.4-22.6 49.9-50.1 49.9z"
                  p-id="7702" fill="#4381fd"></path>
            </svg>
          </template>
        </icon>
        <span class="div2-top-title">全局变量</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {Position, Handle} from '@vue-flow/core';
import Icon, {FormOutlined} from "@ant-design/icons-vue";
import {ref, onMounted, onUnmounted, watch} from 'vue'
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()
const props = defineProps(['data']);
</script>

<style scoped>

.div-Handle {
  width: 0.8vw;
  height: 1.6vh;
  background-color: #ffffff;
  border: solid #007bff;
  border-radius: 50%;
}

.div2-panel {
  background: #f0f2f5;
  border-radius: 5px;

  .div2-top {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 1vh;
    margin-top: 2vh;
    font-weight: 600;

    .div2-top-ico {
      margin-top: 1vh;
    }

    .div2-top-title {
      font-size: 15px;
      margin-top: 1vh;
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
    margin-right: 8.6vw;
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