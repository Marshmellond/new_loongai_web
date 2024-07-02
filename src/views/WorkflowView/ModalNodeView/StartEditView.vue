<script setup lang="ts">
import {ref, onMounted, onUnmounted, watch} from 'vue'
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()
const open = ref(true)
</script>

<template>
  <a-modal v-model:open="open" title="对话信息" @ok="handleOk" okText="保存" cancelText="关闭">
    <div class="edit-title">名称</div>
    <a-input v-model:value="counter.edit_name"/>
    <div class="edit-title">模型</div>
    <a-cascader v-model:value="counter.edit_mod" :options="counter.edit_mod_options"
                :placeholder="counter.edit_mod_view"/>
    <div class="edit-title">应用</div>
    <a-cascader v-model:value="counter.edit_app" :options="counter.edit_app_options"
                :placeholder="counter.edit_app_view"/>
  </a-modal>
</template>

<style scoped lang="less">

</style>