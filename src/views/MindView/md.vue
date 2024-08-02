<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Transformer } from 'markmap-lib';
import { Markmap } from 'markmap-view';
import { watch } from 'vue';

const transformer = new Transformer();

const mm = ref()
const value = ref('')
const svgRef = ref()

const update = () => {
  const { root } = transformer.transform(value.value);
  mm.value.setData(root);
  mm.value.fit();
}

// 后端返回结构
type Response = {
  "code": number,
  "message": string, // markdown 文本
}

watch(() => value.value, () => {
  // 监听输入变化更新思维导图
  update()
})

// 获取数据
onMounted(() => {
  fetch('http://localhost:8080/api/markdown')
    .then(response => response.json())
    .then((data: Response) => {
      if (data.code != 0) {
        console.log(data.message)
      } else {
        mm.value = Markmap.create(svgRef.value);
        value.value = data.message
        update()
      }
    })
})

</script>

<template>
  <div class="box">
    <textarea class="edit" v-model="value" />
    <svg class="content" ref="svgRef" />
  </div>
</template>

<style scoped>

.box {
  width: 50vw;
  height: 80vh;
  background-color: aliceblue;
  color: black;
}

.edit {
  width: 50vw;
  height: 80vh;
  background-color: aliceblue;
  color: black;
}

.content {
  width: 50vw;
  height: 80vh;
  background-color: aliceblue;
  color: black;
}

</style>
