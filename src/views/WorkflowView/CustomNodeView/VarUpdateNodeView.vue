<template>
  <div class="var-node" :class="{'selected': data.isSelected}">
    <Handle type="source" position="left" id="left" class="div-Handle"/>
    <Handle type="source" position="right" id="right" class="div-Handle"/>
    <div class="div1">
      <div class="div1-ico">
        <icon :style="{ color: '#000000'}">
          <template #component>
            <svg t="1719994640966" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="17236" width="16" height="16">
              <path
                  d="M869 112H155c-23.75 0-43 19.25-43 43v714c0 23.75 19.25 43 43 43h380c23.75 0 43-19.25 43-43s-19.25-43-43-43H198V198h628v628h-52c-23.75 0-43 19.25-43 43s19.25 43 43 43h95c23.75 0 43-19.25 43-43V155c0-23.75-19.25-43-43-43z"
                  fill="#ffffff" p-id="17237"></path>
              <path
                  d="M392.02 423c0-14.24 3.56-24.92 17.8-28.48 24.92-7.12 46.28-17.8 71.2-10.68 21.36 3.56 35.6 14.24 46.28 39.16 3.56 14.24 7.12 32.04 14.24 46.28 3.57-3.56 3.57-7.12 7.12-10.68 10.68-17.8 21.36-35.6 35.6-53.4 7.12-7.12 14.24-17.8 24.92-21.36 17.8-10.68 35.6-3.56 46.28 10.68s10.68 39.16-3.56 53.4c-14.24 17.8-32.04 21.36-49.84 17.8-3.56 0-10.68 0-14.24-3.56-7.12-3.56-14.24 0-21.36 7.12-3.56 7.12-10.68 14.24-14.24 21.36 0 3.56-3.56 7.12 0 10.68 7.12 28.48 14.24 56.96 21.36 81.88 7.12 24.92 24.92 35.6 49.84 28.48 7.12 0 10.68-3.56 17.8-3.56 0 17.8-3.56 21.36-17.8 28.48-21.36 10.68-46.28 17.8-71.2 14.24-21.36-3.56-39.16-14.24-46.28-39.16-3.56-14.24-7.12-32.04-14.24-49.84-3.56 3.56-3.56 7.12-7.12 10.68-10.68 17.8-21.36 39.16-35.6 56.96-7.12 10.68-17.8 17.8-28.48 21.36-17.8 7.12-35.6 0-42.72-14.24-7.12-14.24-7.12-39.16 3.56-53.4 14.24-17.8 32.04-21.36 53.4-17.8 3.56 0 7.12 0 10.68 3.56 10.68 7.12 17.8 3.56 21.36-7.12 3.56-7.12 10.68-14.24 14.24-21.36 3.56-3.56 3.56-7.12 0-10.68-7.12-24.92-10.68-49.84-17.8-71.2-10.68-32.04-24.92-42.72-53.4-32.04-7.12-3.56-10.68-3.56-17.8-3.56zM678.18 690c28.48-56.96 46.28-113.92 46.28-178s-10.68-121.04-39.16-178h42.72c3.56 0 3.56 3.56 3.56 3.56 35.6 60.52 49.84 128.16 42.72 202.91-7.12 53.4-28.48 99.68-53.4 142.41 0 3.56-3.56 3.56-7.12 3.56-10.68 3.56-21.36 3.56-35.6 3.56zM337.26 334c-53.4 121.04-49.84 238.52 10.68 356h-39.16s-3.56 0-3.56-3.56c-24.92-42.72-46.28-85.44-53.4-135.28-10.68-74.76 0-145.96 39.16-210.04 3.56-3.56 7.12-7.12 10.68-7.12h35.6zM610.43 868.99a42.99 42.99 0 0 0 21.5 37.24 43.006 43.006 0 0 0 43 0 43.012 43.012 0 0 0 21.5-37.24c0-15.37-8.19-29.56-21.5-37.24a43.006 43.006 0 0 0-43 0 42.99 42.99 0 0 0-21.5 37.24z m0 0"
                  fill="#ffffff" p-id="17238"></path>
            </svg>
          </template>
        </icon>
      </div>
      <span class="div1-title">变量更新{{data.order}}</span>
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

.var-node {
  background: #fdfdfd;
  padding: 1vh;
  border-radius: 5px;
  width: 10vw;
  height: 30vh;
}
</style>