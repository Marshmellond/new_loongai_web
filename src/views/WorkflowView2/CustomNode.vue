<script setup>
import { Position, Handle } from '@vue-flow/core'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps(['label'])
</script>

<template>
  <div>
    <Handle type="target" :position="Position.Top" />
    <Handle type="target" :position="Position.Left" />
    <div style="display: flex;flex-direction: column">
          <div>{{ label }}你妈</div>
    <input>
    <input>
    </div>

    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>