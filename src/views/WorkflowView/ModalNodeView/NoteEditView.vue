<script setup lang="ts">
import {ref, onMounted, onUnmounted, watch} from 'vue'
import Icon, {PlusOutlined} from "@ant-design/icons-vue";
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()
const handleOk = () => {
  counter.note_edit_open = false
}
watch(() => counter.note_edit_open, () => {
  counter.edit_start = !counter.note_edit_open
})
</script>

<template>
  <a-modal v-model:open="counter.note_edit_open" :title="`备注${counter.note_node_data.data.order}`" @ok="handleOk"
           okText="保存" cancelText="关闭">
    <div class="div1">
      <span class="div1-title" style="margin-top: 1vh">备注内容</span>
      <a-textarea
          v-model:value="counter.note_node_data.data.content"
          placeholder="输入内容"
          :autoSize="{ minRows: 5}"
          style="width: 100%"
          :allowClear="true"/>
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