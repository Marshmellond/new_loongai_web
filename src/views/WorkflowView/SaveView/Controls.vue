<script setup>
import {Panel, useVueFlow} from '@vue-flow/core'
import Icon from './Icon.vue'
import {message} from "ant-design-vue";


const {nodes} = useVueFlow()

function onSave() {
  message.success("保存到历史列表成功")
}

function onRestore() {
  let flow_down = JSON.parse(localStorage.getItem("flow_data"));
  let blob = new Blob([JSON.stringify(flow_down)], {type: "application/json"});
  let url = URL.createObjectURL(blob);
  let a = document.createElement("a");
  a.href = url;
  a.download = `${Date.now().toString()}.json`;
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
