<script setup lang="ts">
import Icon from '@ant-design/icons-vue';

import {useCounterStore} from '@/stores/counter'
import {useRouter} from "vue-router";

const router = useRouter();
const counter = useCounterStore()
localStorage.setItem('selectedKey', "102");

const click_workflow = () => {
  counter.selectedKeys = ['3']
  router.push('/workflow');
}
const click_ass = () => {
  counter.selectedKeys = ['4']
  router.push('/ass');
}
</script>

<template>
  <div class="div1">
    <div class="div1-home">
      <icon :style="{ color: '#8994a6'}" class="icon-ai-blue">
        <template #component>
          <svg t="1722768238871" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               p-id="19814" width="64" height="64">
            <path d="M281.088 896l117.248-71.168 69.12-30.208L352.256 865.28z" fill="#77868C" p-id="19815"></path>
            <path d="M352.256 865.28l115.2-70.656 214.016 28.672-108.032 73.728z" fill="#58666B" p-id="19816"></path>
            <path d="M573.44 897.024l108.032-73.728 73.216 50.688-104.96 76.8z" fill="#404E51" p-id="19817"></path>
            <path d="M649.728 950.784l104.96-76.8 31.232 54.272-103.424 78.848z" fill="#324042" p-id="19818"></path>
            <path d="M573.44 897.024l76.288 53.76 32.768 56.32-430.08-65.536 28.672-45.568 71.168-30.72z" fill="#B0BEC5"
                  p-id="19819"></path>
            <path d="M65.024 122.88l128.512-39.424 18.432 502.784-124.416 60.416z" fill="#172023" p-id="19820"></path>
            <path d="M408.064 741.376l114.176-66.048 0.512 38.4-113.664 68.096z" fill="#0D1416" p-id="19821"></path>
            <path d="M409.088 781.824l113.664-68.096 97.792 12.288-110.08 69.12z" fill="#172023" p-id="19822"></path>
            <path d="M442.368 229.888l115.712-45.056 3.584 196.096-114.688 53.76z" fill="#560B0B" p-id="19823"></path>
            <path d="M259.072 216.064l121.856-44.032 177.152 12.8-115.712 45.056z" fill="#CE2925" p-id="19824"></path>
            <path d="M467.456 203.776l115.2-44.032 32.256 2.048-114.176 44.544z" fill="#3A8C3A" p-id="19825"></path>
            <path d="M500.736 206.336l114.176-44.544-31.744 32.768-114.688 46.08z" fill="#194C19" p-id="19826"></path>
            <path d="M501.76 207.36l-33.28 48.128-1.024-51.712z" fill="#4CAF50" p-id="19827"></path>
            <path d="M446.976 434.688l114.688-53.76 181.76 16.384-108.032 55.808z" fill="#7C0D0D" p-id="19828"></path>
            <path d="M87.552 646.656l124.416-60.416 743.936 86.528-98.816 69.632z" fill="#28353A" p-id="19829"></path>
            <path d="M635.392 453.12l108.032-55.808 2.048 195.584-107.008 64z" fill="#A51414" p-id="19830"></path>
            <path d="M442.368 229.888l4.608 204.8 188.416 18.432 3.072 203.776-366.08-43.008-13.312-397.824z"
                  fill="#F44336" p-id="19831"></path>
            <path d="M661.504 427.008v0.512z" fill="#084770" p-id="19832"></path>
            <path d="M564.224 210.944L470.016 309.248l-1.024-36.864 60.928-64z" fill="#FFC107" p-id="19833"></path>
            <path d="M564.224 210.944l112.128-45.056-91.648 94.72-114.688 48.64z" fill="#684903" p-id="19834"></path>
            <path d="M529.92 208.384l113.152-44.544 33.28 2.048-112.128 45.056z" fill="#C99002" p-id="19835"></path>
            <path d="M661.504 395.264l107.52-53.76-29.184 28.672L631.296 424.96z" fill="#0C4768" p-id="19836"></path>
            <path d="M660.48 325.632l108.032-50.688-90.112 89.6-110.592 54.272z" fill="#684903" p-id="19837"></path>
            <path d="M660.992 357.888l0.512 37.376-30.208 29.696-33.792-3.584z" fill="#2196F3" p-id="19838"></path>
            <path d="M660.992 357.888l107.52-51.712 0.512 35.328-107.52 53.76z" fill="#116493" p-id="19839"></path>
            <path d="M659.456 255.488l108.544-47.616-150.016 151.552-113.152 53.248z" fill="#194C19"
                  p-id="19840"></path>
            <path d="M659.968 288.256l0.512 37.376-92.672 93.184-33.792-3.072z" fill="#FFC107" p-id="19841"></path>
            <path d="M659.968 288.256l108.032-49.152 0.512 35.84-108.032 50.688z" fill="#936703" p-id="19842"></path>
            <path d="M628.736 216.064l109.568-45.568-152.576 155.648-114.176 51.2z" fill="#0C4768" p-id="19843"></path>
            <path d="M628.736 216.064L471.552 377.344l-1.024-36.352L593.92 213.504z" fill="#2196F3" p-id="19844"></path>
            <path d="M593.92 213.504l111.104-45.568 33.28 2.56-109.568 45.568z" fill="#167CC1" p-id="19845"></path>
            <path d="M658.944 218.112l108.544-45.568 0.512 35.328-108.544 47.616z" fill="#286828" p-id="19846"></path>
            <path
                d="M12.8 61.952l901.632 56.32-1.024 782.848L46.08 780.8 12.8 61.952zM857.088 742.4l-1.024-565.248L65.024 122.88l22.528 524.288L857.088 742.4m-346.624 52.736l-1.024-40.448-101.376-13.312 1.024 39.936 101.376 13.824"
                fill="#37474F" p-id="19847"></path>
            <path d="M658.944 218.112l0.512 37.376-154.624 157.184-32.768-3.072z" fill="#4CAF50" p-id="19848"></path>
            <path d="M12.8 61.952L143.872 25.6l870.912 50.176-99.84 42.496z" fill="#5C737C" p-id="19849"></path>
            <path d="M914.944 118.272l99.84-42.496-4.608 749.056-96.256 76.8z" fill="#28353A" p-id="19850"></path>
          </svg>
        </template>
      </icon>
      <div class="div1-home-title">一站式AI自动化数据分析平台</div>
    </div>
    <div class="div1-desc">
      <span
          class="div1-desc-title">引入人工智能技术，打造自动化数据分析系统，加速数据洞察，简化复杂分析流程，实现数据分析的智能化和高效化</span>
    </div>
    <div class="div2">
      <div class="div2-div" style="background: linear-gradient(220.55deg, #5D3FD3 0%, #A569BD 100%);"
           @click="click_workflow">
        <icon :style="{ color: '#8994a6'}" class="icon-ai-blue">
          <template #component>
            <svg t="1722600657925" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="30628" width="32" height="32">
              <path
                  d="M435.4 707.4L314.6 828.2c-3.7 3.7-5.7 8.5-5.7 13.7 0 5.2 2 10 5.7 13.7 3.7 3.7 8.5 5.7 13.7 5.7 5.2 0 10-2 13.7-5.7l120.9-120.9c7.5-7.5 7.5-19.8 0-27.4-7.6-7.5-19.9-7.5-27.5 0.1z"
                  fill="#4E30DC" p-id="30629"></path>
              <path
                  d="M328.3 866.7c-6.6 0-12.9-2.6-17.6-7.3-4.7-4.7-7.3-10.9-7.3-17.6 0-6.6 2.6-12.9 7.3-17.6l120.9-120.9c9.7-9.7 25.4-9.7 35.1 0 9.7 9.7 9.7 25.4 0 35.1L345.8 859.5c-4.7 4.7-10.9 7.2-17.5 7.2z m111-155.5L318.5 832.1c-2.6 2.6-4.1 6.1-4.1 9.8 0 3.7 1.4 7.2 4.1 9.8 2.6 2.6 6.1 4.1 9.8 4.1 3.7 0 7.2-1.4 9.8-4.1L459 730.8c5.4-5.4 5.4-14.2 0-19.6-5.5-5.3-14.3-5.3-19.7 0zM711.4 828.2L590.6 707.4c-7.5-7.5-19.8-7.5-27.4 0-7.5 7.5-7.5 19.8 0 27.4l120.9 120.9c3.7 3.7 8.5 5.7 13.7 5.7s10-2 13.7-5.7c3.7-3.7 5.7-8.5 5.7-13.7-0.1-5.3-2.1-10.1-5.8-13.8z"
                  fill="#4E30DC" p-id="30630"></path>
              <path
                  d="M697.7 866.7c-6.6 0-12.9-2.6-17.6-7.3L559.3 738.6c-9.7-9.7-9.7-25.4 0-35.1 9.7-9.7 25.4-9.7 35.1 0l120.9 120.9c4.7 4.7 7.3 10.9 7.3 17.6 0 6.6-2.6 12.9-7.3 17.6-4.7 4.6-10.9 7.1-17.6 7.1zM576.9 707.2c-3.5 0-7.1 1.3-9.8 4-5.4 5.4-5.4 14.2 0 19.6L688 851.7c2.6 2.6 6.1 4.1 9.8 4.1s7.2-1.4 9.8-4.1c2.6-2.6 4.1-6.1 4.1-9.8s-1.4-7.2-4.1-9.8L586.7 711.2c-2.7-2.7-6.3-4-9.8-4z"
                  fill="#4E30DC" p-id="30631"></path>
              <path
                  d="M900.3 203.2H125.8c-13.7 0-24.8 11.1-24.8 24.8s11.1 24.8 24.8 24.8h17.7v440c0 27.1 22 49.1 49.1 49.1h640.8c27.1 0 49.1-22 49.1-49.1v-440h17.7c13.7 0 24.8-11.1 24.8-24.8s-11-24.8-24.7-24.8z m-67.5 49.7v439.5H193.2V252.9h639.6z"
                  fill="#4E30DC" p-id="30632"></path>
              <path
                  d="M741.3 327.2l-0.2 0.2-166.3 172-181.6-106.1-0.4-0.2c-9.2-4.4-20.3-2.5-27.5 4.7l-0.2 0.2-112.9 133.4c-4.4 4.5-6.8 10.5-6.8 16.8 0.1 6.4 2.6 12.4 7.2 16.9 4.5 4.4 10.5 6.8 16.8 6.8 6.5 0 12.5-2.5 17.1-7.1l0.2-0.2 100.8-120.7 180 105.4 0.4 0.2c8.4 4 18.5 2.8 25.7-3.1l0.2-0.2L772 363.8c4.8-4.1 7.8-9.7 8.4-16 0.6-6.4-1.4-12.6-5.5-17.5-8.4-10-23.5-11.4-33.6-3.1z"
                  fill="#FF4E7D" p-id="30633"></path>
            </svg>
          </template>
        </icon>
        <span class="div2-title">AI数据助手</span>
      </div>
      <div class="div2-div" style="background: linear-gradient(220.55deg, #3498DB 0%, #9B59B6 100%);"
           @click="click_ass">
        <icon :style="{ color: '#8994a6'}" class="icon-ai-blue">
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
        <span class="div2-title">AI分析助手</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.div1-desc {
  margin-bottom: 3vh;

  .div1-desc-title {
    font-size: 18px;
    color: #2f3659;
  }
}

.div2 {
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  justify-content: center;
  margin-left: -5vw;

  .div2-div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #fdfdfd;
    border: 1px solid #e3e3e3;
    width: 30vw;
    height: 12vh;
    border-radius: 100px;
    margin-left: 5vw;
    margin-top: 5vh;
    overflow: hidden;
    cursor: pointer;

    .div2-title {
      font-size: 24px;
      color: white;
      margin-left: 0.5vw;
    }
  }
}

.div1 {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 95.5vh;
  align-items: center;

  .div1-home {
    display: flex;
    align-items: center;
    height: 10vh;


    .div1-home-title {
      font-weight: 900;
      font-size: 50px;
      background-image: linear-gradient(135deg, #3C8CE7 10%, #36ccda 100%);
      -webkit-background-clip: text; /*将设置的背景颜色限制在文字中*/
      -webkit-text-fill-color: transparent; /*给文字设置成透明*/
      margin-left: 0.2vw;
    }
  }
}
</style>