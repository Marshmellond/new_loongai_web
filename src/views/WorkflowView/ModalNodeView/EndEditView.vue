<script setup lang="ts">
import {ref, onMounted, onUnmounted, watch} from 'vue'
import Icon, {PlusOutlined} from "@ant-design/icons-vue";
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()
const handleOk = () => {
  counter.end_edit_open = false
}
watch(() => counter.end_edit_open, () => {
  counter.edit_start = !counter.end_edit_open
})
watch(() => counter.end_node_data.data.variable_print, () => {
  counter.end_node_data.data.variable_content = []
  for (let i = 0; i < counter.end_node_data.data.variable_print.length; i++) {
    counter.end_node_data.data.variable_content.push({
      "name": counter.end_node_data.data.variable_print[i][0],
      "value": ""
    })
  }
})
</script>

<template>
  <a-modal v-model:open="counter.end_edit_open" title="结束" @ok="handleOk"
           okText="保存" cancelText="关闭">
    <div class="div1">
      <span class="div1-title" style="margin-top: 1vh">输出变量</span>
      <a-cascader
          v-model:value="counter.end_node_data.data.variable_print"
          multiple
          :options="counter.input_options"
      />
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