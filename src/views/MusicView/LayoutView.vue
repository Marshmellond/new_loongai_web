<script setup lang="ts">
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()
localStorage.setItem('selectedKey', "6");
counter.selectedKeys = [localStorage.getItem("selectedKey")]
</script>

<template>
  音乐页面
    <iframe
        src="https://cdn1.suno.ai/7cf5bf96-302c-40c4-bfda-ee18c2f848a6.mp4"
        class="tets"
    >
    </iframe>
</template>

<style scoped lang="less">
.tets{
  position: relative;
  top: 20vh;
  left: 35vw;
  height: 53.5vh;
}
</style>