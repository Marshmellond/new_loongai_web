<script setup lang="ts">
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()
counter.draw_dell3_select_size = "方图"
counter.draw_num_select = '1'

const on1 = () => {
  counter.draw_dell3_select_size = "方图"
}
const on2 = () => {
  counter.draw_dell3_select_size = "横图"
}
const on3 = () => {
  counter.draw_dell3_select_size = "竖图"
}
const on_num1 = () => {
  counter.draw_num_select = '1'
}
const on_num2 = () => {
  counter.draw_num_select = '2'
}
const on_num3 = () => {
  counter.draw_num_select = '3'
}
const on_num4 = () => {
  counter.draw_num_select = '4'
}

</script>

<template>
  <div class="div-title1">尺寸</div>
  <div class="div-mod-div">
    <div class="div-mod" :class="{ 'div-mod-div-select': counter.draw_dell3_select_size==='方图'}" @click="on1">
      <div class="div-mod-title">方图</div>
    </div>
    <div class="div-mod" :class="{ 'div-mod-div-select': counter.draw_dell3_select_size==='横图'}" @click="on2"
         style="margin-left: 10px">
      <div class="div-mod-title">横图</div>
    </div>
    <div class="div-mod" :class="{ 'div-mod-div-select': counter.draw_dell3_select_size==='竖图'}" @click="on3"
         style="margin-left: 10px">
      <div class="div-mod-title">竖图</div>
    </div>
  </div>
  <div class="div-title1">生成数量</div>
  <div class="div-mod-div">
    <div class="div-mod" :class="{ 'div-mod-div-select': counter.draw_num_select==='1'}" @click="on_num1">
      <div class="div-mod-title">1</div>
    </div>
    <div class="div-mod" :class="{ 'div-mod-div-select': counter.draw_num_select==='2'}" @click="on_num2"
         style="margin-left: 10px">
      <div class="div-mod-title">2</div>
    </div>
    <div class="div-mod" :class="{ 'div-mod-div-select': counter.draw_num_select==='3'}" @click="on_num3"
         style="margin-left: 10px">
      <div class="div-mod-title">3</div>
    </div>
    <div class="div-mod" :class="{ 'div-mod-div-select': counter.draw_num_select==='4'}" @click="on_num4"
         style="margin-left: 10px">
      <div class="div-mod-title">4</div>
    </div>
  </div>

</template>

<style scoped lang="less">
@import "src/assets/css/theme.less";

.div-mod-div-select {
  border: 1px solid #4e90ec !important;;
  background: #f0f0f0;
}

.div-title1 {
  margin-left: 0.2vw;
  margin-top: 1vh;
}

.div-title2 {
  margin-top: 1vh;
}

.div-mod-div {
  display: flex;
  margin-top: 1vh;

  .div-mod {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30%;
    height: 5vh;
    border: 1px solid @theme-border-color;
    border-radius: 3px;

    &:hover {
      background: #f0f0f0;
    }

  }
}
</style>