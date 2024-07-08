<script setup>
import {Panel, useVueFlow} from '@vue-flow/core'
import Icon from './Icon.vue'
import {message} from "ant-design-vue";
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()

const {nodes} = useVueFlow()
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

function onRestore() {
  let flow_down = JSON.parse(localStorage.getItem("flow_data"));
  let blob = new Blob([JSON.stringify(flow_down)], {type: "application/json"});
  let url = URL.createObjectURL(blob);
  let a = document.createElement("a");
  a.href = url;
  a.download = `loongai_workflow_${Date.now().toString()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  message.success("流程文件下载完毕");
}

</script>

<template>
  <Panel position="top-right">
    <div class="buttons">
      <button title="save graph" @click="set_flow_data" class="div-button">
        <Icon name="save"/>
      </button>
      <button title="restore graph" @click="onRestore" class="div-button" style="margin-left: 0.2vh">
        <Icon name="restore"/>
      </button>
    </div>
  </Panel>
</template>

<style scoped lang="less">

.div-button {
  width: 2vw;
  height: 4vh;
}

</style>
