<script setup lang="ts">
import {ref} from 'vue';
import {message} from "ant-design-vue";
import {onMounted} from "vue";
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()
localStorage.setItem('selectedKey', "5");
counter.selectedKeys = [localStorage.getItem("selectedKey")]
const get_data = () => {
  const url = "/api/gallery/get_img"
  fetch(url).then((res) => {
    if (res.ok) {
      return res.json()
    }
  }).then((data) => {
    counter.gallery_img_list = []
    if (data["code"] == 1) {
      for (let i of data["img_list"]) {
        counter.gallery_img_list.push(i)
      }
    }
  }).catch(() => {
    message.error("获取失败")
  })
}
onMounted(get_data)
</script>

<template>
  <div class="div1">
    <div class="container">
      <div class="div2" v-for="(item) in counter.gallery_img_list" :key="item[0]">
        <a-image :src="item[1]"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "src/assets/css/theme.less";

.div1 {
  overflow: auto;
  height: 95.5vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container {
  width: 80vw;
  column-count: 4;
  column-gap: 1vh;
  margin-top: 1vh;
}

.div2 {
  margin-bottom: 1vh;
  border-radius: 7px;
  overflow: hidden;

}


@media (max-width: 1200px) {
  .container {
    columns: 4;
  }
}

@media (max-width: 850px) {
  .container {
    columns: 3;
  }
}

@media (max-width: 600px) {
  .container {
    columns: 2;
  }
}


</style>