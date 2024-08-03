<script setup lang="ts">
import { useCounterStore } from '@/stores/counter';
const counter = useCounterStore();
localStorage.setItem('selectedKey', "11");
counter.selectedKeys = [localStorage.getItem("selectedKey")];
</script>

<template>
批量运行
</template>

<style scoped lang="less">

</style>