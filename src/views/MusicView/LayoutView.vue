<script setup lang="ts">
import {useCounterStore} from '@/stores/counter'
import MusicInpView from "@/views/MusicView/MusicInpView.vue";
import MusicShowView from "@/views/MusicView/MusicShowView.vue";
import MusicHistoryView from "@/views/MusicView/MusicHistoryView.vue";

const counter = useCounterStore()

localStorage.setItem('selectedKey', "8");
counter.selectedKeys = [localStorage.getItem("selectedKey")]
</script>

<template>
  <div class="div-overflow">
    <div class="div-inp">
      <MusicInpView></MusicInpView>
    </div>
    <div class="div-show">
      <MusicShowView></MusicShowView>
    </div>
    <div class="div-history">
      <MusicHistoryView></MusicHistoryView>
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
    margin-top: 2.5vh;
    margin-left: 1vw;
    width: 70%;
    height: 90vh;
    border: none;
    border-radius: 5px;
  }

  .div-history {
    margin-left: 0.6vw;
    width: 10%;
    height: 95.5vh;
    background: @theme-background-color;
    border-left: 1px solid @theme-border-color;
  }
}
</style>