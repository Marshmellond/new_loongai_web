<script setup lang="ts">
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()
localStorage.setItem('selectedKey', "2");
counter.selectedKeys = [localStorage.getItem("selectedKey")]
</script>

<template>
  工作流页面
</template>

<style scoped lang="less">
@import "src/assets/css/theme.less";
</style>