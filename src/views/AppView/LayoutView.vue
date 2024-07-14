<script setup lang="ts">
import DefaultView from "@/views/AppView/DefaultView.vue";
import UserView from "@/views/AppView/UserView.vue";
import AddModView from "@/views/AppView/AddModView.vue";
import AlterModView from "@/views/AppView/AlterModView.vue";
import {useCounterStore} from '@/stores/counter'

import {ref} from 'vue';
const counter = useCounterStore()

localStorage.setItem('selectedKey', "3");
counter.selectedKeys = [localStorage.getItem("selectedKey")]
const activeKey = ref('2');
</script>

<template>
  <div class="app-beijing">
    <div class="app-div2">
      <span class="app-title">使用应用在专业领域大放异彩</span>
    </div>
    <div class="div1">
      <AddModView v-if="activeKey==2"></AddModView>
      <AlterModView></AlterModView>
      <a-tabs v-model:activeKey="activeKey" type="card" :centered="true" :tabBarGutter="10">
        <a-tab-pane key="1" tab="系统预设">
          <DefaultView></DefaultView>
        </a-tab-pane>
        <a-tab-pane key="2" tab="特别定制">
          <UserView></UserView>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "src/assets/css/theme.less";

.app-beijing {
  height: 100%;
  width: 100%;
  overflow: auto;

  .app-title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    margin-top: 1%;
  }

  .div1 {
    position: relative;
    top: 2%;
    left: 10%;
    width: 80%;
    min-height: 70vh;
    border-radius: 5px;

  }
}


</style>