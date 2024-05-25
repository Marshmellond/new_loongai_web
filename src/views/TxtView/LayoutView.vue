<script setup lang="ts">
import HistoryView from "@/views/TxtView/HistoryView.vue";
import ShowView from "@/views/TxtView/ShowView.vue";
import NewTxtView from "@/views/TxtView/NewTxtView.vue";
</script>

<template>
  <a-layout class="ant-layout">
    <HistoryView></HistoryView>
    <ShowView></ShowView>
  </a-layout>
</template>

<style scoped lang="less">
@import "src/assets/css/theme.less";

.ant-layout {
  display: flex;
}
</style>