<script setup lang="ts">
import DrawInpView from "@/views/DrawView/DrawInpView.vue";
import DrawShowView from "@/views/DrawView/DrawShowView.vue";
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()
localStorage.setItem('selectedKey', "4");
counter.selectedKeys = [localStorage.getItem("selectedKey")]
</script>

<template>
  <div class="div-home">
    <DrawInpView></DrawInpView>
    <DrawShowView></DrawShowView>
  </div>
</template>

<style scoped lang="less">
@import "src/assets/css/theme.less";

.div-home {
  display: flex;
}
</style>