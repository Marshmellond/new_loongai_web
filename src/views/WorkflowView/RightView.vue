<script setup lang="ts">
import InputView from "@/views/WorkflowView/RightView/InputView.vue";
import ResultView from "@/views/WorkflowView/RightView/ResultView.vue";
import {ref} from 'vue';

const activeKey = ref('1');

</script>

<template>
  <div class="div2-head">
    <span style="font-size: 20px;margin-top: 1vh;margin-bottom: 1vh">运行</span>
  </div>
  <a-tabs v-model:activeKey="activeKey"
          :centered="true"
          class="div2-tabs">
    <a-tab-pane key="1" tab="输入">
      <InputView></InputView>
    </a-tab-pane>
    <a-tab-pane key="2" tab="结果" force-render>
      <ResultView></ResultView>
    </a-tab-pane>
  </a-tabs>
</template>

<style scoped lang="less">
.div2-head {
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid @theme-border-color;
}

.div2-tabs {
  position: relative;
}
</style>