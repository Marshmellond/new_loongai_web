<script setup lang="ts">

import Icon, {PlusOutlined} from "@ant-design/icons-vue";
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
      <icon :style="{ color: '#000000'}">
        <template #component>
          <svg t="1719992329172" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               p-id="7820" width="32" height="32">
            <path
                d="M516.5 869c-49.4 0-97.3-9.7-142.5-28.8-43.6-18.4-82.7-44.8-116.3-78.4s-60-72.7-78.4-116.3c-19.1-45.1-28.8-93.1-28.8-142.5s9.7-97.3 28.8-142.5c18.4-43.6 44.8-82.7 78.4-116.3 33.6-33.6 72.7-60 116.3-78.4 45.1-19.1 93.1-28.8 142.5-28.8s97.3 9.7 142.5 28.8c43.6 18.4 82.7 44.8 116.3 78.4 33.6 33.6 60 72.7 78.4 116.3 19.1 45.1 28.8 93.1 28.8 142.5s-9.7 97.3-28.8 142.5c-18.4 43.6-44.8 82.7-78.4 116.3-33.6 33.6-72.7 60-116.3 78.4-45.1 19.1-93.1 28.8-142.5 28.8z m0-660c-162.1 0-294 131.9-294 294s131.9 294 294 294 294-131.9 294-294-131.9-294-294-294z"
                p-id="7821"></path>
            <path d="M436 341.3L676.1 497 436 652.6z" p-id="7822"></path>
          </svg>
        </template>
      </icon>
      <span class="div2-title">运行</span>
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
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 1vh;
  overflow: auto;

  .ant-button1 {
    width: 80%;
    position: relative;
    background: #fdfdfd;
    border: 1px solid #e4e4e4;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    &:hover {
      background: #f0f0f0;
    }

    .div2-title {
      color: black;
      font-weight: 600;
      position: relative;
      right: 0.3vw;
    }
  }
}
</style>