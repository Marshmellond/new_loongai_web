<script setup lang="ts">

import {PlusOutlined} from "@ant-design/icons-vue";
</script>

<template>
  <div class="div1">
    <span>来源</span>
    <a-input style="margin-top: 1vh"></a-input>
    <span>风格</span>
    <a-input style="margin-top: 1vh"></a-input>
    <span>标题数量</span>
    <a-input style="margin-top: 1vh"></a-input>
    <span>内容长度</span>
    <a-input style="margin-top: 1vh"></a-input>
  </div>
  <div class="div2">
    <a-button type="primary" size="large" class="ant-button1" @click="on_generate">
      <template #icon>
        <PlusOutlined style="color: black"/>
      </template>
      <span style="color: black">生成</span>
    </a-button>
  </div>
</template>

<style scoped lang="less">
.div1 {
  display: flex;
  flex-direction: column;
  padding: 1vh;
  height: 77vh;
  overflow: auto;
  border-bottom: 1px solid @theme-border-color;
}

.div2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1vh;
  overflow: auto;

  .ant-button1 {
    width: 80%;
    position: relative;
    background: #fdfdfd;
    border: 1px solid #e4e4e4;

    &:hover {
      background: #f0f0f0;
    }
  }
}
</style>