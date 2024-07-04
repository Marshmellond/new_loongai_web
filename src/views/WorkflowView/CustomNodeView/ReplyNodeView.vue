<template>
  <div class="reply-node" :class="{'selected': data.isSelected}">
    <Handle type="source" position="left" id="left" class="div-Handle"/>
    <Handle type="source" position="right" id="right" class="div-Handle"/>
    <div class="div1">
      <div class="div1-ico">
        <icon :style="{ color: '#000000'}">
          <template #component>
            <svg t="1719994529567" class="icon" viewBox="0 0 1099 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="12692" width="20" height="20">
              <path
                  d="M378.06 436.1c0 19.6 15.5 35.5 34.6 35.5 19.1 0 34.6-15.9 34.6-35.5s-15.5-35.5-34.6-35.5C393.56 400.6 378.06 416.5 378.06 436.1zM731.26 436.1c0-19.6-15.5-35.5-34.6-35.5-19.1 0-34.6 15.9-34.6 35.5s15.5 35.5 34.6 35.5C715.76 471.6 731.26 455.7 731.26 436.1zM772.36 665.9l79.2 0c11.7 0 17.2-8.8 17.2-18.6L868.76 231.7c0-21.3-11.6-34.2-35.3-34.2L269.66 197.5c-17.9 0-26.3 10-26.3 27.2l0 411.9c0 16.3 6.7 29.7 23.9 30l237.8-0.5 202.6 188.6c14.2 11.6 28.1 12.8 39.4 5.8 8.3-5.1 12.6-13.4 12.6-23.7 0-25.7 0-141.1 0-160.9C759.56 669.3 764.66 665.9 772.36 665.9zM703.46 783.7 542.26 627.9c-5.3-5.9-10.5-11.4-22.2-11.4L315.96 616.5c-15.7 0-23.3-7.9-23.3-24.1L292.66 273.6c0-16.2 7.9-25.2 23.6-25.2L797.16 248.4c15.7 0 22.8 7.4 22.8 23.5l0 332.7c0 12.8-4.8 13.5-16.7 13.5l-76.6 0c-10.5 0-14.5 4.7-14.4 13.7 0.2 15 0.1 137.6 0.1 146.4C712.46 789.1 710.86 791.2 703.46 783.7zM520.06 436.1c0 19.6 15.5 35.5 34.6 35.5 19.1 0 34.6-15.9 34.6-35.5s-15.5-35.5-34.6-35.5C535.56 400.6 520.06 416.5 520.06 436.1z"
                  p-id="12693" fill="#ffffff"></path>
            </svg>
          </template>
        </icon>
      </div>
      <span class="div1-title">指定回复</span>
      <FormOutlined class="div1-edit" @click="show_edit"/>
    </div>
    <div class="div2">
      <div>全局变量</div>
    </div>
  </div>
</template>

<script setup>
import {Position, Handle} from '@vue-flow/core';
import Icon, {FormOutlined} from "@ant-design/icons-vue";

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

.selected {
  border: 1px solid #336ffd;
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
    margin-right: 3.1vw;
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

.reply-node {
  background: #fdfdfd;
  padding: 1vh;
  border-radius: 5px;
  width: 10vw;
  height: 30vh;
}
</style>