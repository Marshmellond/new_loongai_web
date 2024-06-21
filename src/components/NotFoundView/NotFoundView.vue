<script setup lang="ts">
import {FrownOutlined} from '@ant-design/icons-vue';
</script>

<template>
  <div class="div1">
    <FrownOutlined class="div-ico"/>
    <span class="div-title">404 Not Found</span>
    <span class="div-title">您访问的页面不存在</span>
  </div>
</template>

<style scoped lang="less">
.div1 {
  width: 100%;
  height: 95.5vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 30vh;

  .div-ico {
    font-size: 48px;
  }

  .div-title {
    font-size: 24px;
  }
}
</style>