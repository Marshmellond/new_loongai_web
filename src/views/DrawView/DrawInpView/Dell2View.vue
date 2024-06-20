<script setup lang="ts">
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()

counter.draw_dell3_select_size = "方图"
counter.draw_num_select = '1'
const on1 = () => {
  counter.draw_dell3_select_size = "方图"
}
const onn1 = () => {
  counter.draw_dell3_select_picture = "高清"

}
const onn2 = () => {
  counter.draw_dell3_select_picture = "细节增强"
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
  <div class="div-title1">画质</div>
  <a-radio-group v-model:value="counter.draw_dell3_select_picture" class="div-title2">
    <a-radio-button value="高清" @click="onn1">高清</a-radio-button>
    <a-radio-button value="细节增强" @click="onn2">细节增强</a-radio-button>
  </a-radio-group>

</template>

<style scoped lang="less">
.div-mod-div-select {
  border: 1px solid #4e90ec !important;;
  background: #f0f0f0;
}

.div-title1 {
  margin-left: 0.2vw;
  margin-top: 1vh
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