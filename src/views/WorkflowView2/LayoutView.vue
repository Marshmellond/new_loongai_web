<script setup>
import '@vue-flow/core/dist/style.css';
import '@vue-flow/core/dist/theme-default.css';
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()
localStorage.setItem('selectedKey', "2");
counter.selectedKeys = [localStorage.getItem("selectedKey")]
import {ref} from 'vue'
import {VueFlow, useVueFlow} from '@vue-flow/core'
import DropzoneBackground from './DropzoneBackground.vue'
import Sidebar from './Sidebar.vue'
import useDragAndDrop from './useDnD'
import useDn
const {onConnect, addEdges} = useVueFlow()

const {onDragOver, onDrop, onDragLeave, isDragOver} = useDragAndDrop()

const nodes = ref([])

onConnect(addEdges)
</script>

<template>
  <div class="dnd-flow" @drop="onDrop">
    <VueFlow :nodes="nodes" @dragover="onDragOver" @dragleave="onDragLeave">
    </VueFlow>
    <Sidebar/>
  </div>
</template>
