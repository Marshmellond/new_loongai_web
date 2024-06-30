<script setup>
import LeftView from "@/views/WorkflowView/LeftView.vue";
import RightView from "@/views/WorkflowView/RightView.vue";
import '@vue-flow/core/dist/style.css';
import '@vue-flow/core/dist/theme-default.css';
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()
localStorage.setItem('selectedKey', "2");
counter.selectedKeys = [localStorage.getItem("selectedKey")]
import {ref, onMounted} from 'vue'
import {VueFlow, Panel, useVueFlow} from '@vue-flow/core'
import {Background} from '@vue-flow/background'
import {ControlButton, Controls} from '@vue-flow/controls'
import {MiniMap} from '@vue-flow/minimap'
import Icon from "@ant-design/icons-vue";
import SaveRestoreControls from './Controls.vue'


import CustomNode from './CustomNode.vue'

const nodes = ref([
  {
    id: '1',
    data: {label: 'Node 1'},
    // this will create the node-type `custom`
    type: 'custom',
    position: {x: 50, y: 50},
  },
  {
    id: '2',
    data: {label: 'Node 1'},
    // this will create the node-type `custom`
    type: 'custom',
    position: {x: 50, y: 50},
  }
])
</script>

<template>
  <VueFlow :nodes="nodes">
    <SaveRestoreControls />
    <template #node-custom="customNodeProps">
      <CustomNode v-bind="customNodeProps"/>
    </template>
  </VueFlow>
</template>