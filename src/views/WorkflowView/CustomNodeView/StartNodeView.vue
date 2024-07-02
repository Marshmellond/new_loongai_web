<script setup>
import {ref, onMounted, onUnmounted, watch} from 'vue'
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()
import {Position, Handle} from '@vue-flow/core';
import Icon, {FormOutlined} from "@ant-design/icons-vue";

const props = defineProps(['data']);
const open = ref(false);
const show_edit = () => {
  counter.select_modal_node = 'start_edit'
}
</script>

<template>
  <div class="start-node">
    <Handle type="target" :position="Position.Right"/>
    <div class="div1">
      <div class="div1-ico">
        <icon :style="{ color: '#000000'}">
          <template #component>
            <svg t="1719928349868" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="6773" width="14" height="14">
              <path
                  d="M946.5 505L560.1 118.8l-25.9-25.9c-12.3-12.2-32.1-12.2-44.4 0L77.5 505c-12.3 12.3-18.9 28.6-18.8 46 0.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8 12.1-12.1 18.7-28.2 18.7-45.3 0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204z m217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"
                  p-id="6774" fill="#ffffff"></path>
            </svg>
          </template>
        </icon>
      </div>
      <span class="div1-title">开始</span>
      <FormOutlined class="div1-edit" @click="show_edit"/>
    </div>
    <div class="div2">
      <div>全局变量</div>
    </div>
  </div>
</template>

<style scoped>
.edit-title {
  margin-top: 2vh;
  margin-bottom: 0.5vh;
}

.div2 {
  display: flex;
  flex-direction: row;
  margin-top: 1vh;
  background: #f5f6f8;
  border-radius: 5px;
  overflow: hidden;
}

.div1 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  .div1-ico {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #296ffd;
    border-radius: 7px;
    width: 1.25vw;
    height: 2.5vh;
    margin-right: 0.3vw;
  }

  .div1-title {
    font-weight: 900;
    margin-right: 4.5vw;
  }

  .div1-edit {
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    background: #296ffd;
    border-radius: 7px;
    width: 1.25vw;
    height: 2.5vh;
    font-size: 12px;
  }
}

.start-node {
  background: #fdfdfd;
  padding: 1vh;
  border-radius: 5px;
  width: 10vw;
  height: 30vh;
}
</style>