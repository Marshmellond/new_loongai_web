<script setup lang="ts">
import {useCounterStore} from '@/stores/counter'
import TopicInpView from "@/views/TopicView/TopicInpView.vue";
import TopicShowView from "@/views/TopicView/TopicShowView.vue";

const counter = useCounterStore()
localStorage.setItem('selectedKey', "33");
counter.selectedKeys = [localStorage.getItem("selectedKey")]
</script>

<template>
  <div class="div-overflow">
    <div class="div-inp">
      <TopicInpView></TopicInpView>
    </div>
    <div class="div-show">
      <TopicShowView></TopicShowView>
    </div>
  </div>
</template>

<style scoped lang="less">
.div-overflow {
  display: flex;
  width: 100%;
  height: 95.5vh;

  .div-inp {
    width: 20%;
    height: 95.5vh;
    border-left: 1px solid @theme-border-color;
    border-right: 1px solid @theme-border-color;
  }

  .div-show {
    width: 80%;
    height: 95.5vh;
    border: none;
    border-radius: 5px;
  }
}
</style>