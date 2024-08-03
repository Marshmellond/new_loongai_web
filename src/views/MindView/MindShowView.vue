<script setup lang="ts">
import {onMounted, ref, watch} from 'vue';
import {Transformer} from 'markmap-lib';
import {Markmap} from 'markmap-view';
import {useCounterStore} from '@/stores/counter';

const counter = useCounterStore();
const transformer = new Transformer();

const mm = ref();
const svgRef = ref();

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
  <svg class="content" ref="svgRef"/>
</template>

<style scoped lang="less">
.content {
  width: 100%;
  height: 100%;
}
</style>