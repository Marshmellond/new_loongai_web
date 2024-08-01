<script setup lang="ts">
import ChatKeyView from "@/views/KeyView/ChatKeyView/ChatKeyView.vue";
import DrawKeyView from "@/views/KeyView/DrawKeyView/DrawKeyView.vue";
import MoreKeyView from "@/views/KeyView/MoreKeyView/MoreKeyView.vue";

import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()
import {ref} from 'vue';

localStorage.setItem('selectedKey', "10");
counter.selectedKeys = [localStorage.getItem("selectedKey")]
const activeKey = ref("1");
</script>

<template>
  <div class="div-beijing">

    <div class="div-page">
      <a-tabs v-model:activeKey="activeKey" tabPosition="left" style="height: 100%">

        <a-tab-pane key="1">
          <template #tab>
        <span>
          对话key
        </span>
          </template>
          <ChatKeyView></ChatKeyView>
        </a-tab-pane>

        <a-tab-pane key="2">
          <template #tab>
        <span>
          绘画key
        </span>
          </template>
          <DrawKeyView></DrawKeyView>
        </a-tab-pane>

        <a-tab-pane key="3">
          <template #tab>
        <span>
          更多Key
        </span>
          </template>
          <MoreKeyView></MoreKeyView>
        </a-tab-pane>

      </a-tabs>
    </div>
  </div>

</template>

<style scoped lang="less">
@import "src/assets/css/theme.less";

.div-beijing {
  background-color: @theme-background-color2;
  height: 100%;
  width: 100%;
}

.div-page {
  position: relative;
  top: 1%;
  left: 1%;
  width: 95%;
  height: 60vh;
  background-color: @theme-background-color;
  border: 1px solid @theme-border-color;
  border-radius: 5px;
}


</style>