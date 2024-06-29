<script setup lang="ts">
import '@vue-flow/core/dist/style.css';
import '@vue-flow/core/dist/theme-default.css';
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()
localStorage.setItem('selectedKey', "2");
counter.selectedKeys = [localStorage.getItem("selectedKey")]


import {ref, onMounted} from 'vue'
import {VueFlow, Panel} from '@vue-flow/core'
import {Background} from '@vue-flow/background'

const nodes = ref([
  {
    id: '1',
    position: {x: 50, y: 50},
    data: {label: 'Node 1'},
  },
  {
    id: '2',
    position: {x: 150, y: 50},
    data: {label: 'Node 2'},
  }
])

function addNode() {
  const id = Date.now().toString()

  nodes.value.push({
    id,
    position: {x: 150, y: 50},
    data: {label: `Node ${id}`,},
  })
}

function removeNode(id) {
  nodes.value = nodes.value.filter((node) => node.id !== id)
}
</script>

<template>
  <VueFlow :nodes="nodes">
    <Background/>
    <Panel class="div-panel">
      <button type="button" @click="addNode">Add a node</button>
      <button type="button" @click="removeNode('2')">Remove Node 2</button>
    </Panel>
    <Controls>
      <ControlButton>
        <i class="fa fa-plus"></i>
      </ControlButton>
    </Controls>
  </VueFlow>
</template>

<style scoped lang="less">
.div-panel {
  display: flex;
  flex-direction: column;
}
</style>