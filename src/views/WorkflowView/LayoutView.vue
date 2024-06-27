<script setup lang="ts">
import {useCounterStore} from '@/stores/counter'
import {ref} from "vue";

const counter = useCounterStore()
localStorage.setItem('selectedKey', "2");
const textarea_input = ref<string>('');
counter.selectedKeys = [localStorage.getItem("selectedKey")]
</script>

<template>
  <div class="div1">

  </div>
  <div class="div4">
    <a-textarea
        v-model:value="textarea_input"
        placeholder="输入消息内容"
        :autoSize="{ minRows: 2, maxRows: 12}"
        style="width: 30vw"
        :allowClear="true"
        class="textarea-input"
    />
  </div>
</template>

<style scoped lang="less">
@import "src/assets/css/theme.less";

.div1 {
  position: relative;
  left: 25vw;
  width: 40vw;
  height: 10vh;
  background: #1f6feb;
}

.div4 {
  position: relative;
  left: 25vw;
  top: 70vh;
  width: 40vw;
  height: 10vh;
  background: #1f6feb;

  .textarea-input {
    position: relative; /* 使用绝对定位 */
    bottom: 0; /* 固定在底部 */
    margin-bottom: 3vh;
    left: 50%; /* 将左侧位置设置为父元素的50% */
    transform: translate(-50%, 0); /* 向左移动自身宽度的50%，以达到水平居中 */
  }
}
</style>