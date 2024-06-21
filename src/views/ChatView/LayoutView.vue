<script setup lang="ts">
import HistoryView from "@/views/ChatView/HistoryView.vue";
import ShowView from "@/views/ChatView/ShowView.vue";
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()
localStorage.setItem('selectedKey', "1");
counter.selectedKeys = [localStorage.getItem("selectedKey")]
</script>

<template>
  <div class="div-home">
    <HistoryView></HistoryView>
    <ShowView></ShowView>
  </div>
</template>

<style scoped lang="less">
@import "src/assets/css/theme.less";

.div-home {
  display: flex;
}
</style>