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
  <div class="div-overflow">
    <div class="div1">
      <div v-for="(item) in counter.gallery_img_list" :key="item[0]" class="div2">
        <a-image :src="item[1]"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "src/assets/css/theme.less";

.div-overflow {
  width: 100%;
  height: 95.5vh;
  overflow: auto;

  .div1 {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: start;
    padding-left: 5vw;
    padding-right: 5vw;


    .div2 {
      margin: 0.5vh;
      border-radius: 7px;
      overflow: hidden;
      //border: 1px solid red;
    }
  }
}

</style>