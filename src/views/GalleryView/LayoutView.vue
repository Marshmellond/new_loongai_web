<script setup lang="ts">
import {ref} from 'vue';
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()
</script>

<template>
  <div class="div1">
    <div v-for="(item) in counter.gallery_img_list" :key="item[0]" class="div2">
      <a-image :src="item[1]"/>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "src/assets/css/theme.less";

.div1 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: start;
  padding-left: 5vw;
  padding-right: 5vw;


  .div2 {
    margin: 5px;
    border-radius: 7px;
    overflow: hidden;
    border: 1px solid red;
  }
}


</style>