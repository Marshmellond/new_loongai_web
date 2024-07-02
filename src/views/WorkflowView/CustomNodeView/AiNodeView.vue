<!-- AiNodeView.vue -->
<template>
  <div class="ai-node">
    <Handle type="target" :position="Position.Top"/>
    <div>{{ data.label }}</div>
    <div>{{ data.a }}</div>
    <div>{{ data.b }}</div>
    <div>{{ data.c }}</div>
    <Handle type="source" :position="Position.Bottom"/>
  </div>
</template>

<script setup>
import { Position, Handle } from '@vue-flow/core';

const props = defineProps(['data']);
</script>

<style scoped>
.ai-node {
  background: #4CAF50;
  color: #ffffff;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
}
</style>