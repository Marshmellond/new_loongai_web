<!-- StartEditView.vue -->
<template>
  <div class="end-node">
    <Handle type="target" :position="Position.Top"/>
    <div>流程结束</div>
    <Handle type="source" :position="Position.Bottom"/>
  </div>
</template>

<script setup>
import {Position, Handle} from '@vue-flow/core';

const props = defineProps(['data']);
</script>

<style scoped>
.end-node {
  background: #FF9800;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
}
</style>