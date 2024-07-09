<script setup lang="ts">
import {ref, onMounted, onUnmounted, watch} from 'vue'
import Icon, {PlusOutlined} from "@ant-design/icons-vue";
import {useCounterStore} from '@/stores/counter'
import {message} from "ant-design-vue";

const counter = useCounterStore()
const save_variable_data1 = () => {
  console.log(counter.variable_data.must)
  counter.flow_data.nodes[0].data.variable.push(counter.variable_data)
  counter.start_edit_open2 = false
}
const save_variable_data2 = () => {
  counter.start_edit_open2 = false
  let flow_data_index = counter.flow_data.nodes[0].data.variable.findIndex(variable => variable.id === counter.variable_data.id)
  counter.flow_data.nodes[0].data.variable[flow_data_index] = counter.variable_data
}
const handleOk = () => {
  if (counter.select_variable_data == "添加变量") {
    save_variable_data1()
  } else {
    save_variable_data2()
  }
}

watch(() => counter.variable_data.name, () => {
  for (let i = 0; i < counter.flow_data.nodes.length; i++) {
    if (counter.flow_data.nodes[i].type === "ai" || counter.flow_data.nodes[i].type === "reply") {
      counter.flow_data.nodes[i].data.input = counter.variable_data.name
    }
  }
})
</script>

<template>
  <a-modal v-model:open="counter.start_edit_open2" title="编辑变量" @ok="handleOk" okText="保存" cancelText="关闭"
           width="20%">
    <div class="div1">
      <span class="div1-title">变量类型</span>
      <div class="div1-type" :class="{'selected':counter.variable_data.type=='String'}">文本</div>
    </div>
    <div class="div2">
      <span class="div1-title">显示名称</span>
      <br/>
      <a-input v-model:value="counter.variable_data.name" autofocus placeholder="请输入"/>
    </div>
    <div class="div2">
      <span class="div1-title">变量名称</span>
      <br/>
      <a-input v-model:value="counter.variable_data.label" autofocus placeholder="请输入"/>
    </div>
    <div class="div2">
      <span class="div1-title">最大长度</span>
      <br/>
      <a-input v-model:value="counter.variable_data.max_len" autofocus placeholder="请输入"/>
    </div>
    <div class="div3">
      <span class="div1-title">必填</span>
      <br/>
      <a-switch v-model:checked="counter.variable_data.must"/>
    </div>
  </a-modal>
</template>
<style scoped lang="less">
.div2 {
  margin-bottom: 1vh;
}

.div1 {
  margin-bottom: 1vh;

  .div1-title {
    margin-left: 0.2vw;
  }

  .div1-type {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    background: #f3f6fd;
    width: 8vw;
    height: 6vh;
  }
}

.selected {
  border: 1px solid #518afd;
}
</style>