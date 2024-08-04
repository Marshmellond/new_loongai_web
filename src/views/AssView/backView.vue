<script setup lang="ts">
import {useCounterStore} from '@/stores/counter';
import {reactive} from 'vue';
import LayoutView from "@/EchartsView/LayoutView.vue";

const counter = useCounterStore();
localStorage.setItem('selectedKey', "4");
counter.selectedKeys = [localStorage.getItem("selectedKey")];

const data = reactive({
  value: {}
});

eval(counter.ass_ai_content);
</script>

<template>
  <div>
    批量处理
    <div :style="{ width: '1230px', height: '350px' }">
      <LayoutView :option="data.value"/>
    </div>
  </div>
</template>

<style scoped lang="less">
/* 这里写你的样式 */
</style>