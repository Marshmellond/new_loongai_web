<script setup lang="ts">
import {useCounterStore} from '@/stores/counter'
import {message} from "ant-design-vue";

const counter = useCounterStore()
import {CoffeeOutlined, DeleteOutlined} from "@ant-design/icons-vue";
</script>

<template>
  <div class="div-title">
    <span class="div-title-content">生成列表</span>
  </div>
  <div v-if="counter.ppt_data_list.length===0" class="no-chat">
    <CoffeeOutlined class="no-ico"/>
    <span class="no-txt">暂无记录</span>
  </div>
</template>

<style scoped lang="less">
.div-title {
  border-bottom: 1px solid @theme-border-color;
  height: 5vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .div-title-content {
    font-size: 20px;
  }
}

.selected {
  border-left: 2px solid #3086fd;
  background: #f0f0f0;
}

.no-chat {
  position: relative;
  top: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .no-ico {
    color: #c1c1c1;
    font-size: 150%;
  }

  .no-txt {
    margin-top: 0.8vh;
    color: #c1c1c1;
    font-size: 120%;
  }
}
</style>