<script setup>
import {Panel, useVueFlow} from '@vue-flow/core'
import Icon from './Icon.vue'
import {message} from "ant-design-vue";


const {nodes, addNodes, dimensions, toObject, fromObject} = useVueFlow()

function onSave() {
  message.success("保存到历史列表成功")
}

function onRestore() {
  let flow_down = JSON.parse(localStorage.getItem("vue-flow--save-restore"));

  // 创建 Blob 对象
  let blob = new Blob([JSON.stringify(flow_down)], {type: "application/json"});

  // 创建下载链接
  let url = URL.createObjectURL(blob);

  // 创建并显示下载链接
  let a = document.createElement("a");
  a.href = url;
  a.download = "flow_down.json"; // 设置下载文件名
  document.body.appendChild(a);
  a.click(); // 触发下载

  // 清理
  document.body.removeChild(a);
  URL.revokeObjectURL(url); // 释放 URL 对象

  message.success("流程文件下载完毕");
}

</script>

<template>
  <Panel position="top-right">
    <div class="buttons">
      <button title="save graph" @click="onSave" class="div-button">
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
