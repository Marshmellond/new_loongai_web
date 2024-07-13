<script setup lang="ts">

import Icon, {PlusOutlined} from "@ant-design/icons-vue";
import {ref, onMounted, onUnmounted, watch} from 'vue'
import {Input, Button, Typography, message} from 'ant-design-vue';
import {useCounterStore} from '@/stores/counter'
import Prism from "prismjs"
import "prismjs/themes/prism-okaidia.min.css"

const counter = useCounterStore()

const clear_variable_content = () => {
  for (let i = 0; i < counter.flow_data.nodes.filter(item => item.type === 'end')[0].data.variable_content.length; i++) {
    counter.flow_data.nodes.filter(item => item.type === 'end')[0].data.variable_content[i].value = ""
  }
}
const seed_meg = () => {
  console.log(counter.flow_data.nodes.filter(item => item.type === 'end')[0].data.variable_content)
  clear_variable_content()
  counter.workflow_seed_load = true
  const url = "/api/workflow/seed"
  let body = {
    flow_data: JSON.stringify(counter.flow_data),
  }
  fetch(url, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body),
    credentials: "include"
  }).then((res) => {
    if (res.ok) {
      counter.workflow_seed_load = false
      return res.json()
    }
  }).then((data) => {
    if (data["code"] == 1) {
      counter.flow_data.nodes.filter(item => item.type === 'end')[0].data.variable_content = data["data"]
      setTimeout(() => {
        Prism.highlightAll()
      }, 100)
    }
  })
}
const on_generate = () => {
  if (counter.flow_data.nodes.filter(item => item.type === 'end').length === 0) {
    message.warn("没有结束节点")
  } else {
    seed_meg()
    counter.right_select_key = "2"
    message.success("发送成功")
  }
}
</script>

<template>
  <div class="div1">
    <div class="div1-2"
         v-for="(item) in counter.flow_data.nodes[0].data.variable" :key="item.id">
      <span style="margin-left: 0.2vw;font-size: 15px;font-weight: 900">{{ item.name }}</span>
      <a-textarea style="margin-top: 0.5vh;margin-bottom: 1vh" v-model:value="item.value" auto-size/>
    </div>
  </div>
  <div class="div2">
    <a-button type="primary" size="large" class="ant-button1" @click="on_generate">
      <icon :style="{ color: '#000000'}">
        <template #component>
          <svg t="1719992329172" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               p-id="7820" width="32" height="32">
            <path
                d="M516.5 869c-49.4 0-97.3-9.7-142.5-28.8-43.6-18.4-82.7-44.8-116.3-78.4s-60-72.7-78.4-116.3c-19.1-45.1-28.8-93.1-28.8-142.5s9.7-97.3 28.8-142.5c18.4-43.6 44.8-82.7 78.4-116.3 33.6-33.6 72.7-60 116.3-78.4 45.1-19.1 93.1-28.8 142.5-28.8s97.3 9.7 142.5 28.8c43.6 18.4 82.7 44.8 116.3 78.4 33.6 33.6 60 72.7 78.4 116.3 19.1 45.1 28.8 93.1 28.8 142.5s-9.7 97.3-28.8 142.5c-18.4 43.6-44.8 82.7-78.4 116.3-33.6 33.6-72.7 60-116.3 78.4-45.1 19.1-93.1 28.8-142.5 28.8z m0-660c-162.1 0-294 131.9-294 294s131.9 294 294 294 294-131.9 294-294-131.9-294-294-294z"
                p-id="7821"></path>
            <path d="M436 341.3L676.1 497 436 652.6z" p-id="7822"></path>
          </svg>
        </template>
      </icon>
      <span class="div2-title">运行</span>
    </a-button>
  </div>
</template>

<style scoped lang="less">
.div1 {
  display: flex;
  flex-direction: column;
  padding: 1vh;
  height: 77vh;
  overflow: auto;
  border-bottom: 1px solid @theme-border-color;
}

.div2 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 1vh;

  .ant-button1 {
    width: 80%;
    position: relative;
    background: #fdfdfd;
    border: 1px solid #e4e4e4;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    &:hover {
      background: #f0f0f0;
    }

    .div2-title {
      color: black;
      font-weight: 600;
      position: relative;
      right: 0.3vw;
    }
  }
}
</style>