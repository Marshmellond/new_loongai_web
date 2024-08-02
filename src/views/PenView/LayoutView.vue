<script setup lang="ts">
import {useCounterStore} from '@/stores/counter'
import PenInpView from "@/views/PenView/PenInpView.vue";
import PenShowView from "@/views/PenView/PenShowView.vue";

const counter = useCounterStore()
localStorage.setItem('selectedKey', "12");
counter.selectedKeys = [localStorage.getItem("selectedKey")]
</script>

<template>
  <div class="div-overflow">
    <div class="div-inp">
      <PenInpView></PenInpView>
    </div>
    <div class="div-show">
      <PenShowView></PenShowView>
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