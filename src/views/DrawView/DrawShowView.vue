<script setup lang="ts">
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()
</script>

<template>
  <div class="div1">
    <div class="div2">
      <!--      <img src="http://127.0.0.1:8000/img/head?path=default&name=1.png" alt="">-->
      <img :src="counter.draw_img1" alt="" class="div-img">
    </div>
  </div>
</template>

<style scoped lang="less">
.div1 {
  width: 100%;
  border-left: 1px solid @theme-border-color;
  background-color: #eff3f7;
}

.div2 {
  padding: 20px;
  .div-img {
    width: 800px;
    height: 800px;

  }
}
</style>