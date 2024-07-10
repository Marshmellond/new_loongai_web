<script setup lang="ts">
import {ref, onMounted, onUnmounted, watch} from 'vue'
import Icon, {PlusOutlined} from "@ant-design/icons-vue";
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()
const handleOk = () => {
  if (counter.ai_node_data.data.edit_mod === undefined) {
    counter.ai_node_data.data.edit_mod = [
      "openai",
      0
    ]
    counter.ai_node_data.data.edit_mod_view = "gpt-3.5-turbo"
  } else {
    let mod_label = counter.ai_node_data.data.edit_mod[0]
    let mod_index = counter.ai_node_data.data.edit_mod[1]
    counter.ai_node_data.data.edit_mod_view = counter.edit_mod_options.filter(item => item.label === mod_label)[0].children[mod_index].label
  }
  if (counter.ai_node_data.data.app_mod === undefined) {
    counter.ai_node_data.data.app_mod = [
      "无"
    ]
    counter.ai_node_data.data.app_mod_view = "无"
    counter.ai_node_data.data.app_mod_img = "http://127.0.0.1:8000/img/head?path=model&name=null.png"
  } else {
    let app_label = counter.ai_node_data.data.app_mod[0]
    if (app_label == "无") {
      counter.ai_node_data.data.app_mod_view = "无"
      counter.ai_node_data.data.app_mod_img = "http://127.0.0.1:8000/img/head?path=model&name=null.png"
    } else {
      let app_index = counter.ai_node_data.data.app_mod[1]
      counter.ai_node_data.data.app_mod_view = counter.edit_app_options.filter(item => item.label === app_label)[0].children.filter(item => item.value == app_index)[0].label
      counter.ai_node_data.data.app_mod_img = counter.edit_app_img_options.filter(item => item.name === app_index)[0].img
    }
  }
  counter.ai_node_data.data.edit_mod_img = counter.edit_mod_img_options.filter(item => item.name === counter.ai_node_data.data.edit_mod[0])[0].img
  counter.ai_edit_open = false
}


watch(() => counter.ai_edit_open, () => {

  if (counter.ai_node_data.data.input == undefined) {
    counter.ai_node_data.data.input = ""
    counter.ai_node_data.data.input_id = ""
  } else if (typeof counter.ai_node_data.data.input !== "string") {
    counter.ai_node_data.data.input = counter.ai_node_data.data.input[0]
    for (let a = 0; a < counter.flow_data.nodes[0].data.variable.length; a++) {
      if (!counter.ai_node_data.data.input.startsWith("AI回复内容")) {
        if (counter.ai_node_data.data.input === counter.flow_data.nodes[0].data.variable[a].name) {
          counter.ai_node_data.data.input_id = counter.flow_data.nodes[0].data.variable[a].id
        }
      } else if (counter.ai_node_data.data.input.startsWith("AI回复内容")) {
        for (let b = 0; b < counter.flow_data.nodes.length; b++) {
          if (counter.flow_data.nodes[b].type === "ai") {
            if (counter.flow_data.nodes[b].data.print === counter.ai_node_data.data.input) {
              counter.ai_node_data.data.input_id = counter.flow_data.nodes[b].data.print_id
            }
          }
        }
      }
    }
  }


  console.log(counter.ai_node_data.data.input)
  console.log(counter.ai_node_data.data.input_id)
  counter.edit_start = !counter.ai_edit_open
})
</script>

<template>
  <a-modal v-model:open="counter.ai_edit_open" :title="`AI对话${counter.ai_node_data.data.order}`" @ok="handleOk"
           okText="保存" cancelText="关闭">
    <div class="div1">
      <span class="div1-title">模型</span>
      <a-cascader v-model:value="counter.ai_node_data.data.edit_mod" :options="counter.edit_mod_options"
                  :placeholder="counter.ai_node_data.data.edit_mod_view"/>
      <span class="div1-title" style="margin-top: 1vh">应用</span>
      <a-cascader v-model:value="counter.ai_node_data.data.app_mod" :options="counter.edit_app_options"
                  :placeholder="counter.ai_node_data.data.app_mod_view"/>
      <span class="div1-title" style="margin-top: 1vh">提示词</span>
      <a-textarea
          v-model:value="counter.ai_node_data.data.system"
          placeholder="输入消息内容"
          :autoSize="{ minRows: 5, maxRows: 5}"
          style="width: 100%"
          :allowClear="true"/>
      <span class="div1-title" style="margin-top: 1vh">用户问题</span>
      <a-cascader v-model:value="counter.ai_node_data.data.input" :options="counter.input_options"/>
    </div>
  </a-modal>
</template>

<style scoped lang="less">

.div1 {
  display: flex;
  flex-direction: column;
  margin-bottom: 1vh;

  .div1-title {
    margin-left: 0.2vw;
    margin-bottom: 0.2vh;
  }
}
</style>