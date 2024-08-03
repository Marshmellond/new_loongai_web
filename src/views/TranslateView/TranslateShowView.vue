<script setup lang="ts">
import {h, onMounted, ref} from 'vue';
import {useCounterStore} from "@/stores/counter";
import Icon, {EditOutlined, DownloadOutlined, LoadingOutlined, PlusOutlined} from "@ant-design/icons-vue";
import {message} from "ant-design-vue";

const counter = useCounterStore()

const indicator = h(LoadingOutlined, {
  style: {
    fontSize: '24px',
  },
  spin: true,
});
const click_copy = () => {
  navigator.clipboard.writeText(counter.translate_ai_content);
  message.success("复制成功")
}
const stop_chat = () => {
  counter.translate_chat_status_bool = false
}
</script>

<template>
  <div class="div1" v-if="counter.translate_ai_content_markdown.length!==0">
    <div class="div-div-user2" @click="click_copy">
      <div class="div-content-user">
        <span v-html="counter.translate_ai_content_markdown" class="div-content-txt-user"></span>
      </div>
    </div>
  </div>

  <div class="div6" v-if="counter.translate_chat_status_bool">
    <div class="div6-content">
      <icon :style="{ color: '#000000'}" class="icon-div4-stop" @click="stop_chat">
        <template #component>
          <svg t="1719484882928" class="icon" viewBox="0 0 1024 1024" version="1.1"
               xmlns="http://www.w3.org/2000/svg"
               p-id="2570" width="32" height="32">
            <path
                d="M512 42.666667C252.793333 42.666667 42.666667 252.793333 42.666667 512s210.126667 469.333333 469.333333 469.333333 469.333333-210.126667 469.333333-469.333333S771.206667 42.666667 512 42.666667z m213.333333 645.333333a37.373333 37.373333 0 0 1-37.333333 37.333333H336a37.373333 37.373333 0 0 1-37.333333-37.333333V336a37.373333 37.373333 0 0 1 37.333333-37.333333h352a37.373333 37.373333 0 0 1 37.333333 37.333333z"
                fill="#000000" p-id="2571"></path>
          </svg>
        </template>
      </icon>
      <span>停止翻译</span>
    </div>
  </div>

  <div class="div2" v-if="counter.translate_ai_content_markdown.length===0">
    <div class="div-show-load" v-if="!counter.translate_show_load_status">
      <div class="div-show-load-con1"
           v-if="!counter.translate_show_load_status"
      >
          <icon :style="{ color: '#8994a6'}" class="div-show-load-ico">
          <template #component>
            <svg t="1722670331521" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="11064" width="32" height="32">
              <path
                  d="M175.941818 884.037818a46.545455 46.545455 0 0 1-44.776727-50.920727v-151.133091H64.930909A65.163636 65.163636 0 0 1 0 617.053091V111.476364a65.163636 65.163636 0 0 1 64.930909-65.163637H766.138182a65.163636 65.163636 0 0 1 64.930909 65.163637v505.530181a65.163636 65.163636 0 0 1-64.930909 64.93091H424.820364a52.642909 52.642909 0 0 0-26.670546 10.612363l-186.181818 175.569455a52.596364 52.596364 0 0 1-36.026182 15.918545z"
                  fill="#1668F3" p-id="11065"></path>
              <path
                  d="M70.842182 611.234909h66.048a65.163636 65.163636 0 0 1 64.930909 64.930909v104.448l147.735273-139.636363a121.018182 121.018182 0 0 1 75.310545-29.928728h335.36V117.387636H70.842182z"
                  fill="#679CF7" p-id="11066"></path>
              <path
                  d="M852.340364 1013.76a54.039273 54.039273 0 0 1-36.258909-15.499636l-144.896-133.585455a54.318545 54.318545 0 0 0-27.182546-10.612364h-150.714182a35.421091 35.421091 0 0 1 0-70.842181h150.714182a122.321455 122.321455 0 0 1 75.217455 29.370181l107.054545 98.816v-65.163636a65.163636 65.163636 0 0 1 64.930909-65.163636h61.905455V375.016727h-149.690182a35.421091 35.421091 0 1 1 0-70.842182h155.601454a65.163636 65.163636 0 0 1 65.163637 64.93091v417.88509a65.163636 65.163636 0 0 1-65.163637 65.163637h-61.905454v110.638545a49.152 49.152 0 0 1-27.601455 47.429818 42.821818 42.821818 0 0 1-17.175272 3.537455z m0 0"
                  fill="#1668F3" p-id="11067"></path>
              <path
                  d="M569.204364 356.631273a268.008727 268.008727 0 0 1-104.168728-31.464728 517.771636 517.771636 0 0 1-106.123636 35.374546l-17.687273-31.464727a499.618909 499.618909 0 0 0 92.346182-27.508364 145.547636 145.547636 0 0 1-43.240727-64.837818h-25.553455V205.265455h186.693818v31.464727a166.865455 166.865455 0 0 1-53.061818 68.794182 315.159273 315.159273 0 0 0 82.525091 19.642181zM512 238.731636H423.563636a120.087273 120.087273 0 0 0 41.285819 47.150546A154.251636 154.251636 0 0 0 512 238.731636z m-259.397818-17.687272l25.553454-25.553455a433.477818 433.477818 0 0 1 62.882909 56.971636l-25.553454 25.553455a289.838545 289.838545 0 0 0-62.650182-56.971636z m60.928 243.665454c9.821091-9.821091 19.642182-21.597091 31.464727-33.419636l9.821091 39.284363a569.111273 569.111273 0 0 1-70.749091 66.792728l-13.963636-33.419637a31.557818 31.557818 0 0 0 9.821091-21.597091v-139.636363h-53.061819v-35.374546h86.481455v157.230546z m131.677091-51.2H376.645818v-33.419636H445.44V348.625455h35.374545v31.464727h74.472728v33.419636h-74.472728v37.236364h92.346182v35.374545h-92.392727v62.882909h-35.374545v-62.650181H360.913455v-35.374546h84.48z"
                  fill="#FFFFFF" p-id="11068"></path>
            </svg>
          </template>
        </icon>
        <span class="div-show-load-title">在翻译领域</span>
        <span class="div-show-load-title">让AI帮你完成各种各样繁杂的翻译工作</span>
      </div>

    </div>
    <div class="div-show-load" v-if="counter.translate_show_load_status">
      <div class="div-show-load-con2"
           v-if="counter.translate_show_load_status">
        <a-spin :indicator="indicator" class=""/>
        <span>正在翻译中</span>
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

  .div-div-user2 {
    display: flex;
    justify-content: flex-start;
    margin-left: 14vw;
    margin-top: 1vh;

    .div-content-user {
      margin-top: 0.5%;
      margin-bottom: 1%;
      max-width: 50vw;
      min-height: 10%; /* 设置最小高度 */
      background: #dfe8fd;
      border-radius: 5px 0 5px 5px;
      padding: 0.01vh 1vh 0.01vh 1vh;
      word-wrap: break-word; /* 设置文字换行 */
      overflow-wrap: break-word; /* 设置文字换行 */

      .div-content-txt-user {
        ::v-deep img {
          width: 150px;
          border-radius: 5px;
          height: auto;
        }
      }
    }

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