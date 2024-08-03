<script setup lang="ts">
import {onMounted, ref, watch} from 'vue';
import {Transformer} from 'markmap-lib';
import {Markmap} from 'markmap-view';
import {useCounterStore} from '@/stores/counter';

const counter = useCounterStore();
const transformer = new Transformer();

const mm = ref();
const svgRef = ref();
const onSave = () => {
  const svg = svgRef.value
  const width = svg.getBoundingClientRect().width
  const height = svg.getBoundingClientRect().height
  covertSVG2Image(svg, '思维导图', width, height)
}
const covertSVG2Image = (node, name, width, height, type = 'png') => {
  let serializer = new XMLSerializer()
  let source = '<?xml version="1.0" standalone="no"?>\r\n' + serializer.serializeToString(node)
  let image = new Image()
  image.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source)
  let canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  let context = canvas.getContext('2d')
  context.fillStyle = '#fff'
  context.fillRect(0, 0, 10000, 10000)
  image.onload = function () {
    context.drawImage(image, 0, 0)
    let a = document.createElement('a')
    a.download = `${name}.${type}`
    a.href = canvas.toDataURL(`image/${type}`)
    a.click()
  }
}

const update = () => {
  if (!svgRef.value) {
    console.error('SVG element not found');
    return;
  }
  if (!counter.mind_ai_content) {
    console.error('No mind_ai_content provided');
    return;
  }

  // 销毁已有的 Markmap 实例（如果存在）
  if (mm.value) {
    mm.value.destroy();
  }

  console.log('Initializing Markmap');
  mm.value = Markmap.create(svgRef.value);
  const {root} = transformer.transform(counter.mind_ai_content);
  console.log('Transformed data:', root);

  mm.value.setData(root);
  mm.value.fit();
};

watch(
    () => counter.mind_ai_content,
    () => {
      update();
    }
);

onMounted(() => {
  update();
});
</script>

<template>
  <a-button @click="onSave()">另存为</a-button>
  <svg class="content" ref="svgRef"/>
</template>

<style scoped lang="less">
.content {
  width: 100%;
  height: 100%;
}
</style>