<script setup lang="ts">
import {ref, onMounted, onUnmounted} from 'vue';
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()

const windowWidth = ref(window.innerWidth);
const windowHeight = ref(window.innerHeight);

const updateDimensions = () => {
  windowWidth.value = window.innerWidth;
  windowHeight.value = window.innerHeight;
};

onMounted(() => {
  window.addEventListener('resize', updateDimensions);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateDimensions);
});
</script>

<template>

  <div class="div3" v-if="counter.draw_num_select=='1'">
    <div class="div3-img1" v-if="counter.draw_dell3_select_size==='方图'">
      <a-image
          :width="798"
          :height="798"
          fallback="http://127.0.0.1:8000/img/head?path=default&name=1024_1024.png"
          :src="counter.draw_img1"
          v-if="!counter.draw_img_load1"
      />
      <a-spin class="chat-show-load" v-if="counter.draw_img_load1"/>
    </div>
    <div class="div3-img2" v-if="counter.draw_dell3_select_size==='横图'">
      <a-image
          :width="1223"
          :height="698"
          fallback="http://127.0.0.1:8000/img/head?path=default&name=1792_1024.png"
          :src="counter.draw_img1"
          v-if="!counter.draw_img_load1"
      />
      <a-spin class="chat-show-load" v-if="counter.draw_img_load1"/>
    </div>
    <div class="div3-img3" v-if="counter.draw_dell3_select_size==='竖图'">
      <a-image
          :width="478"
          :height="838"
          fallback="http://127.0.0.1:8000/img/head?path=default&name=1024_1792.png"
          :src="counter.draw_img1"
          v-if="!counter.draw_img_load1"
      />
      <a-spin class="chat-show-load" v-if="counter.draw_img_load1"/>
    </div>
  </div>


  <div class="div4" v-if="counter.draw_num_select=='2'">
    <div v-if="counter.draw_dell3_select_size==='方图'">
      <div class="div5">
        <div class="div5-img1">
          <a-image
              :width="598"
              :height="598"
              fallback="http://127.0.0.1:8000/img/head?path=default&name=1024_1024.png"
              :src="counter.draw_img1"
              v-if="!counter.draw_img_load1"
          />
          <a-spin class="chat-show-load" v-if="counter.draw_img_load1"/>
        </div>
        <div class="div5-img1">
          <a-image
              :width="598"
              :height="598"
              fallback="http://127.0.0.1:8000/img/head?path=default&name=1024_1024.png"
              :src="counter.draw_img2"
              v-if="!counter.draw_img_load1"
          />
          <a-spin class="chat-show-load" v-if="counter.draw_img_load1"/>
        </div>
      </div>
    </div>
    <div v-if="counter.draw_dell3_select_size==='横图'">
      <div class="div5">
        <div class="div5-img2">
          <a-image
              :width="610.5"
              :height="348"
              fallback="http://127.0.0.1:8000/img/head?path=default&name=1792_1024.png"
              :src="counter.draw_img1"
              v-if="!counter.draw_img_load1"
          />
          <a-spin class="chat-show-load" v-if="counter.draw_img_load1"/>
        </div>
        <div class="div5-img2">
          <a-image
              :width="610.5"
              :height="348"
              fallback="http://127.0.0.1:8000/img/head?path=default&name=1792_1024.png"
              :src="counter.draw_img2"
              v-if="!counter.draw_img_load1"
          />
          <a-spin class="chat-show-load" v-if="counter.draw_img_load1"/>
        </div>
      </div>
    </div>
    <div v-if="counter.draw_dell3_select_size==='竖图'">
      <div class="div5">
        <div class="div5-img3">
          <a-image
              :width="398"
              :height="698"
              fallback="http://127.0.0.1:8000/img/head?path=default&name=1024_1792.png"
              :src="counter.draw_img1"
              v-if="!counter.draw_img_load1"
          />
          <a-spin class="chat-show-load" v-if="counter.draw_img_load1"/>
        </div>
        <div class="div5-img3">
          <a-image
              :width="398"
              :height="698"
              fallback="http://127.0.0.1:8000/img/head?path=default&name=1024_1792.png"
              :src="counter.draw_img2"
              v-if="!counter.draw_img_load1"
          />
          <a-spin class="chat-show-load" v-if="counter.draw_img_load1"/>
        </div>
      </div>
    </div>
  </div>


  <div class="div1" v-if="counter.draw_num_select=='3'">
    <div v-if="counter.draw_dell3_select_size==='方图'">
      <div class="div2">
        <div class="div2-img1">
          <a-image
              :width="398"
              :height="398"
              fallback="http://127.0.0.1:8000/img/head?path=default&name=1024_1024.png"
              :src="counter.draw_img1"
              v-if="!counter.draw_img_load1"
          />
          <a-spin class="chat-show-load" v-if="counter.draw_img_load1"/>
        </div>
        <div class="div2-img1">
          <a-image
              :width="398"
              :height="398"
              fallback="http://127.0.0.1:8000/img/head?path=default&name=1024_1024.png"
              :src="counter.draw_img2"
              v-if="!counter.draw_img_load1"
          />
          <a-spin class="chat-show-load" v-if="counter.draw_img_load1"/>
        </div>
      </div>
      <div class="div2">
        <div class="div2-img1">
          <a-image
              :width="398"
              :height="398"
              fallback="http://127.0.0.1:8000/img/head?path=default&name=1024_1024.png"
              :src="counter.draw_img3"
              v-if="!counter.draw_img_load1"
          />
          <a-spin class="chat-show-load" v-if="counter.draw_img_load1"/>
        </div>
      </div>
    </div>
    <div v-if="counter.draw_dell3_select_size==='横图'">
      <div class="div2">
        <div class="div2-img2">
          <a-image
              :width="610.5"
              :height="348"
              fallback="http://127.0.0.1:8000/img/head?path=default&name=1792_1024.png"
              :src="counter.draw_img1"
              v-if="!counter.draw_img_load1"
          />
          <a-spin class="chat-show-load" v-if="counter.draw_img_load1"/>
        </div>
        <div class="div2-img2">
          <a-image
              :width="610.5"
              :height="348"
              fallback="http://127.0.0.1:8000/img/head?path=default&name=1792_1024.png"
              :src="counter.draw_img2"
              v-if="!counter.draw_img_load1"
          />
          <a-spin class="chat-show-load" v-if="counter.draw_img_load1"/>
        </div>
      </div>
      <div class="div2">
        <div class="div2-img2">
          <a-image
              :width="610.5"
              :height="348"
              fallback="http://127.0.0.1:8000/img/head?path=default&name=1792_1024.png"
              :src="counter.draw_img3"
              v-if="!counter.draw_img_load1"
          />
          <a-spin class="chat-show-load" v-if="counter.draw_img_load1"/>
        </div>
      </div>
    </div>
    <div v-if="counter.draw_dell3_select_size==='竖图'">
      <div class="div2">
        <div class="div2-img3">
          <a-image
              :width="238"
              :height="418"
              fallback="http://127.0.0.1:8000/img/head?path=default&name=1024_1792.png"
              :src="counter.draw_img1"
              v-if="!counter.draw_img_load1"
          />
          <a-spin class="chat-show-load" v-if="counter.draw_img_load1"/>
        </div>
        <div class="div2-img3">
          <a-image
              :width="238"
              :height="418"
              fallback="http://127.0.0.1:8000/img/head?path=default&name=1024_1792.png"
              :src="counter.draw_img2"
              v-if="!counter.draw_img_load1"
          />
          <a-spin class="chat-show-load" v-if="counter.draw_img_load1"/>
        </div>
      </div>
      <div class="div2">
        <div class="div2-img3">
          <a-image
              :width="238"
              :height="418"
              fallback="http://127.0.0.1:8000/img/head?path=default&name=1024_1792.png"
              :src="counter.draw_img3"
              v-if="!counter.draw_img_load1"
          />
          <a-spin class="chat-show-load" v-if="counter.draw_img_load1"/>
        </div>
      </div>
    </div>
  </div>


  <div class="div1" v-if="counter.draw_num_select=='4'">
    <div v-if="counter.draw_dell3_select_size==='方图'">
      <div class="div2">
        <div class="div2-img1">
          <a-image
              :width="398"
              :height="398"
              fallback="http://127.0.0.1:8000/img/head?path=default&name=1024_1024.png"
              :src="counter.draw_img1"
              v-if="!counter.draw_img_load1"
          />
          <a-spin class="chat-show-load" v-if="counter.draw_img_load1"/>
        </div>
        <div class="div2-img1">
          <a-image
              :width="398"
              :height="398"
              fallback="http://127.0.0.1:8000/img/head?path=default&name=1024_1024.png"
              :src="counter.draw_img2"
              v-if="!counter.draw_img_load1"
          />
          <a-spin class="chat-show-load" v-if="counter.draw_img_load1"/>
        </div>
      </div>
      <div class="div2">
        <div class="div2-img1">
          <a-image
              :width="398"
              :height="398"
              fallback="http://127.0.0.1:8000/img/head?path=default&name=1024_1024.png"
              :src="counter.draw_img3"
              v-if="!counter.draw_img_load1"
          />
          <a-spin class="chat-show-load" v-if="counter.draw_img_load1"/>
        </div>
        <div class="div2-img1">
          <a-image
              :width="398"
              :height="398"
              fallback="http://127.0.0.1:8000/img/head?path=default&name=1024_1024.png"
              :src="counter.draw_img4"
              v-if="!counter.draw_img_load1"
          />
          <a-spin class="chat-show-load" v-if="counter.draw_img_load1"/>
        </div>
      </div>
    </div>
    <div v-if="counter.draw_dell3_select_size==='横图'">
      <div class="div2">
        <div class="div2-img2">
          <a-image
              :width="610.5"
              :height="348"
              fallback="http://127.0.0.1:8000/img/head?path=default&name=1792_1024.png"
              :src="counter.draw_img1"
              v-if="!counter.draw_img_load1"
          />
          <a-spin class="chat-show-load" v-if="counter.draw_img_load1"/>
        </div>
        <div class="div2-img2">
          <a-image
              :width="610.5"
              :height="348"
              fallback="http://127.0.0.1:8000/img/head?path=default&name=1792_1024.png"
              :src="counter.draw_img2"
              v-if="!counter.draw_img_load1"
          />
          <a-spin class="chat-show-load" v-if="counter.draw_img_load1"/>
        </div>
      </div>
      <div class="div2">
        <div class="div2-img2">
          <a-image
              :width="610.5"
              :height="348"
              fallback="http://127.0.0.1:8000/img/head?path=default&name=1792_1024.png"
              :src="counter.draw_img3"
              v-if="!counter.draw_img_load1"
          />
          <a-spin class="chat-show-load" v-if="counter.draw_img_load1"/>
        </div>
        <div class="div2-img2">
          <a-image
              :width="610.5"
              :height="348"
              fallback="http://127.0.0.1:8000/img/head?path=default&name=1792_1024.png"
              :src="counter.draw_img4"
              v-if="!counter.draw_img_load1"
          />
          <a-spin class="chat-show-load" v-if="counter.draw_img_load1"/>
        </div>
      </div>
    </div>
    <div v-if="counter.draw_dell3_select_size==='竖图'">
      <div class="div2">
        <div class="div2-img3">
          <a-image
              :width="238"
              :height="418"
              fallback="http://127.0.0.1:8000/img/head?path=default&name=1024_1792.png"
              :src="counter.draw_img1"
              v-if="!counter.draw_img_load1"
          />
          <a-spin class="chat-show-load" v-if="counter.draw_img_load1"/>
        </div>
        <div class="div2-img3">
          <a-image
              :width="238"
              :height="418"
              fallback="http://127.0.0.1:8000/img/head?path=default&name=1024_1792.png"
              :src="counter.draw_img2"
              v-if="!counter.draw_img_load1"
          />
          <a-spin class="chat-show-load" v-if="counter.draw_img_load1"/>
        </div>
      </div>
      <div class="div2">
        <div class="div2-img3">
          <a-image
              :width="238"
              :height="418"
              fallback="http://127.0.0.1:8000/img/head?path=default&name=1024_1792.png"
              :src="counter.draw_img3"
              v-if="!counter.draw_img_load1"
          />
          <a-spin class="chat-show-load" v-if="counter.draw_img_load1"/>
        </div>
        <div class="div2-img3">
          <a-image
              :width="238"
              :height="418"
              fallback="http://127.0.0.1:8000/img/head?path=default&name=1024_1792.png"
              :src="counter.draw_img4"
              v-if="!counter.draw_img_load1"
          />
          <a-spin class="chat-show-load" v-if="counter.draw_img_load1"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "src/assets/css/theme.less";


.chat-show-load {
  width: 30px;
  margin-top: 17px;
}

.div4 {
  width: 100%;
  border-left: 1px solid @theme-border-color;
  background-color: #eff3f7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .div5 {
    display: flex;
    flex-direction: row;

  }

  .div5-img1 {
    border: 1px dashed #b8b8b8;
    width: 600px;
    height: 600px;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    overflow: hidden;
  }

  .div5-img2 {
    border: 1px dashed #b8b8b8;
    width: 612.5px;
    height: 350px;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    overflow: hidden;
  }

  .div5-img3 {
    border: 1px dashed #b8b8b8;
    width: 400px;
    height: 700px;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    overflow: hidden;
  }
}


.div1 {
  width: 100%;
  border-left: 1px solid @theme-border-color;
  background-color: #eff3f7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .div2 {
    display: flex;
    flex-direction: row;

  }

  .div2-img1 {
    border: 1px dashed #b8b8b8;
    width: 400px;
    height: 400px;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    overflow: hidden;
  }

  .div2-img2 {
    border: 1px dashed #b8b8b8;
    width: 612.5px;
    height: 350px;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    overflow: hidden;
  }

  .div2-img3 {
    border: 1px dashed #b8b8b8;
    width: 240px;
    height: 420px;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    overflow: hidden;
  }
}

.div3 {
  width: 100%;
  border-left: 1px solid @theme-border-color;
  background-color: #eff3f7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .div3-img1 {
    border: 1px dashed #b8b8b8;
    border-radius: 5px;
    width: 800px;
    height: 800px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  .div3-img2 {
    border: 1px dashed #b8b8b8;
    width: 1225px;
    height: 700px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    overflow: hidden;
  }

  .div3-img3 {
    border: 1px dashed #b8b8b8;
    width: 480px;
    height: 840px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    overflow: hidden;
  }
}

</style>