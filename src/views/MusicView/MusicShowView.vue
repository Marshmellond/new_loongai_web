<script setup lang="ts">
import {h, ref} from 'vue';
import {useCounterStore} from "@/stores/counter";
import {LoadingOutlined, CustomerServiceOutlined} from "@ant-design/icons-vue";

const counter = useCounterStore()

const indicator = h(LoadingOutlined, {
  style: {
    fontSize: '24px',
  },
  spin: true,
});
</script>

<template>
  <div class="div1"
       v-if="counter.music_url_path1.length!==0"
  >
    <iframe
        :src="counter.music_url_path1"
        class="div-show1"
    >
    </iframe>
    <iframe
        :src="counter.music_url_path2"
        class="div-show2"
    >
    </iframe>
  </div>

  <div
      class="div-show-load"
      v-if="counter.music_url_path1.length==0"
  >
    <div class="div-show-load-con1"
         v-if="!counter.music_show_load_status"
    >
      <CustomerServiceOutlined class="div-show-load-ico"/>
      <span class="div-show-load-title">在专业领域</span>
      <span class="div-show-load-title">尽情探索你的音乐之旅吧</span>
    </div>

    <div class="div-show-load-con2"
         v-if="counter.music_show_load_status"
    >
      <a-spin :indicator="indicator" class=""/>
      <span>您的专属音乐正在生成中</span>
    </div>

  </div>

</template>

<style scoped lang="less">
.div1 {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5vh;

  .div-show1 {
    height: 75vh;
    width: 25vw;
    border: none;
    border-radius: 5px;
  }

  .div-show2 {
    height: 75vh;
    width: 25vw;
    margin-left: 3vw;
    border: none;
    border-radius: 5px;
  }
}


.div-show-load {
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed #b8b8b8;
  border-radius: 5px;
}

.div-show-load-con1 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .div-show-load-ico {
    font-size: 24px;
  }
}

.div-show-load-con2 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>