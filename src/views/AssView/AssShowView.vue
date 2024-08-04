<script setup lang="ts">
import {h} from 'vue';
import {useCounterStore} from "@/stores/counter";
import Icon, {LoadingOutlined} from "@ant-design/icons-vue";
import LayoutView from "@/EchartsView/LayoutView.vue";

const counter = useCounterStore()

const indicator = h(LoadingOutlined, {
  style: {
    fontSize: '24px',
  },
  spin: true,
});

</script>

<template>
  <div class="div1" v-if="counter.ass_ai_content.length!==0">
    <div class="div1-div">
      <LayoutView :option="counter.ass_ai_echarts"/>
    </div>
  </div>
  <div class="div2" v-if="counter.ass_ai_content.length===0">
    <div class="div-show-load" v-if="!counter.ass_show_load_status">
      <div class="div-show-load-con1"
           v-if="!counter.ass_show_load_status"
      >
        <icon :style="{ color: '#8994a6'}" class="div-show-load-ico">
          <template #component>
            <svg t="1722724165689" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="6642" width="32" height="32">
              <path
                  d="M128 592c0 166.4 137.6 304 304 304 156.8 0 284.8-118.4 300.8-272H400V291.2C246.4 307.2 128 435.2 128 592z m336-32H800v32C800 796.8 636.8 960 432 960S64 796.8 64 592 227.2 224 432 224h32v336z"
                  fill="#597EF7" p-id="6643"></path>
              <path
                  d="M608 416h252.8c-16-134.4-121.6-240-252.8-252.8V416zM576 96c195.2 0 352 156.8 352 352v32H544V96h32z"
                  fill="#50E3C2" p-id="6644"></path>
            </svg>
          </template>
        </icon>
        <span class="div-show-load-title">在数据分析领域</span>
        <span class="div-show-load-title">让AI帮你快速数据清洗、数据分析、数据可视化</span>
      </div>
    </div>
    <div class="div-show-load" v-if="counter.ass_show_load_status">
      <div class="div-show-load-con2"
           v-if="counter.ass_show_load_status">
        <a-spin :indicator="indicator" class=""/>
        <span>正在分析中</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">

.div6 {
  position: absolute;
  top: 90vh;
  left: 60vw;
  z-index: 1050;
  overflow: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .div6-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0.3vh 1.5vh 0.3vh 1.5vh;
    transition: background-color 0.3s ease;
    border-radius: 5px;

    &:hover {
      background-color: #d0e4f4;
    }
  }
}

.div1 {
  width: 100%;
  height: 95.5vh;
  overflow: auto;

  .div1-div {
    width: 100%;
    height: 95.5vh;
  }

}


.div2 {
  width: 100%;
  height: 95.5vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .div-show-load {
    width: 80%;
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
}
</style>