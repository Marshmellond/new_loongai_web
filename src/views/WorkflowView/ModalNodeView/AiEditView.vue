<script setup lang="ts">
import {ref, onMounted, onUnmounted, watch} from 'vue'
import Icon, {PlusOutlined} from "@ant-design/icons-vue";
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()
const handleOk = () => {
  counter.ai_edit_open = false
}
watch(() => counter.ai_edit_open, () => {
  counter.edit_start = !counter.ai_edit_open
})

const nmsl = () =>{
  console.log(counter.ai_node_data)
}
</script>

<template>
  <a-modal v-model:open="counter.ai_edit_open" title="AI 对话" @ok="handleOk" okText="保存" cancelText="关闭">
    <div class="div1">
      <span class="div1-title" @click="nmsl">模型</span>
      <a-cascader :options="counter.edit_mod_options"
                  :placeholder="111"/>
      <!--      <span class="div1-title" style="margin-top: 1vh">应用</span>-->
      <!--      <a-cascader v-model:value="counter.ai_node_data.data.app_mod" :options="counter.edit_app_options"-->
      <!--                  :placeholder="counter.ai_node_data.data.app_mod_view"/>-->
    </div>
  </a-modal>
</template>

<style scoped lang="less">

.div1 {
  display: flex;
  flex-direction: column;
  margin-bottom: 1vh;

  .div1-title {
    margin-bottom: 0.2vh;
  }
}
</style>