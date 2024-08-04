<script setup lang="ts">
import {useCounterStore} from '@/stores/counter'
import TranslateInpView from "@/views/TranslateView/TranslateInpView.vue";
import TranslateShowView from "@/views/TranslateView/TranslateShowView.vue";

const counter = useCounterStore()
localStorage.setItem('selectedKey', "32");
counter.selectedKeys = [localStorage.getItem("selectedKey")]
</script>

<template>
  <div class="div-overflow">
    <div class="div-inp">
      <TranslateInpView></TranslateInpView>
    </div>
    <div class="div-show">
      <TranslateShowView></TranslateShowView>
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