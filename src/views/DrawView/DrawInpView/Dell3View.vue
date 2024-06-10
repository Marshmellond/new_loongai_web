<script setup lang="ts">
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()


const on1 = () => {
  counter.draw_dell3_select_size = "1024x1024"
}
const on2 = () => {
  counter.draw_dell3_select_size = "1024x1792"
}
const on3 = () => {
  counter.draw_dell3_select_size = "1792x1024"
}
const onn1 = () => {
  counter.draw_dell3_select_picture = "普通"

}
const onn2 = () => {
  counter.draw_dell3_select_picture = "高清"
}

</script>

<template>
  <div class="div-title1">尺寸</div>
  <div class="div-mod-div">
    <div class="div-mod" :class="{ 'div-mod-div-select': counter.draw_dell3_select_size==='1024x1024'}" @click="on1">
      <div class="div-mod-title">1024x1024</div>
    </div>
    <div class="div-mod" :class="{ 'div-mod-div-select': counter.draw_dell3_select_size==='1024x1792'}" @click="on2"
         style="margin-left: 10px">
      <div class="div-mod-title">1024x1792</div>
    </div>
    <div class="div-mod" :class="{ 'div-mod-div-select': counter.draw_dell3_select_size==='1792x1024'}" @click="on3"
         style="margin-left: 10px">
      <div class="div-mod-title">1792x1024</div>
    </div>
  </div>
  <div class="div-title1">画质</div>
  <a-radio-group v-model:value="counter.draw_dell3_select_picture" class="div-title2">
    <a-radio-button value="普通" @click="onn1">普通</a-radio-button>
    <a-radio-button value="高清" @click="onn2">高清</a-radio-button>
  </a-radio-group>

</template>

<style scoped lang="less">
.div-mod-div-select {
  border: 1px solid #4e90ec !important;;
  background: #f0f0f0;
}

.div-title1 {
  margin-left: 3px;
  margin-top: 10px;
}

.div-title2 {
  margin-top: 10px;
}

.div-mod-div {
  display: flex;
  margin-top: 10px;

  .div-mod {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30%;
    height: 40px;
    border: 1px solid @theme-border-color;
    border-radius: 3px;

    &:hover {
      background: #f0f0f0;
    }

  }
}
</style>