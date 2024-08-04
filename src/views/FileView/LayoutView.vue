<script setup lang="ts">
import {useCounterStore} from '@/stores/counter'
import FileInpView from "@/views/FileView/FileInpView.vue";
import FileShowView from "@/views/FileView/FileShowView.vue";

const counter = useCounterStore()
localStorage.setItem('selectedKey', "10");
counter.selectedKeys = [localStorage.getItem("selectedKey")]
</script>

<template>
  <div class="div-overflow">
    <div class="div-inp">
      <FileInpView></FileInpView>
    </div>
    <div class="div-show">
      <FileShowView></FileShowView>
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