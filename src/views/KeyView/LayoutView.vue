<script setup lang="ts">
import ChatKeyView from "@/views/KeyView/ChatKeyView/ChatKeyView.vue";
import DrawKeyView from "@/views/KeyView/DrawKeyView/DrawKeyView.vue";
import {ref} from 'vue';

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
          PPTkey
        </span>
          </template>
          Tab 2
        </a-tab-pane>

      </a-tabs>
    </div>
  </div>

</template>

<style scoped lang="less">
@import "src/assets/css/theme.less";

.div-beijing {
  background-color: #eff3f7;
  height: 100%;
  width: 100%;
}

.div-page {
  position: relative;
  top: 1%;
  left: 1%;
  width: 95%;
  height: 60vh;
  background-color: #fdfdfd;
  border: 1px solid #e3e3e3;
  border-radius: 5px;
}


</style>