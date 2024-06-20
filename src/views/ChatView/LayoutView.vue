<script setup lang="ts">
import HistoryView from "@/views/ChatView/HistoryView.vue";
import ShowView from "@/views/ChatView/ShowView.vue";

localStorage.setItem('selectedKey', "1");
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