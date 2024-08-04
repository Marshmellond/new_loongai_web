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
  navigator.clipboard.writeText(counter.file_ai_content);
  message.success("复制成功")
}
const stop_chat = () => {
  counter.file_chat_status_bool = false
}
</script>

<template>
  <div class="div1" v-if="counter.file_ai_content_markdown.length!==0">
    <div class="div-div-user2">
      <div class="div-content-user" @click="click_copy">
        <span v-html="counter.file_ai_content_markdown" class="div-content-txt-user"></span>
      </div>
    </div>
  </div>

  <div class="div6" v-if="counter.file_chat_status_bool">
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

  <div class="div2" v-if="counter.file_ai_content_markdown.length===0">
    <div class="div-show-load" v-if="!counter.file_show_load_status">
      <div class="div-show-load-con1"
           v-if="!counter.file_show_load_status"
      >
        <icon :style="{ color: '#8994a6'}" class="div-show-load-ico">
          <template #component>
            <svg t="1722697817121" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="4302" width="32" height="32">
              <path
                  d="M170.2 246.4h342.1s44.2-77.8 89.1-77.8h254.9c20.7 0 37.7 19.8 37.7 44l1.1 598.1c0 24.2-19.8 44-44 44h-681c-24.2 0-44-19.8-44-44V290.4c0.1-24.2 19.9-44 44.1-44z"
                  fill="#694B4B" p-id="4303"></path>
              <path d="M862.9 671.5l-688 38.3-22.2-406.4 688.1-59.3z" fill="#593F3F" p-id="4304"></path>
              <path d="M870.8 671.8L242.2 707l-21.1-388 634.6-35.2z" fill="#593F3F" p-id="4305"></path>
              <path d="M840.7 673.7L218.1 725l-21.9-383.4 623.4-55.9z" fill="#FFFFFF" p-id="4306"></path>
              <path d="M807.9 715.1L178.6 750l-22.2-406.3 629.7-48.1z" fill="#F2F2F1" p-id="4307"></path>
              <path d="M796 713.5l-619 36.3-22.1-406.3 618.8-40.1z" fill="#FFFFFF" p-id="4308"></path>
              <path
                  d="M895.2 425.1H509.1s-44.2-71.4-89.1-71.4H125.1c-20.7 0-38.9 16.3-38.9 36l40 429.2c0 19.7 19.8 35.8 44 35.8h685c24.2 0 44-16.1 44-35.8l40-358c0-19.7-19.8-35.8-44-35.8z"
                  fill="#00B5FC" p-id="4309"></path>
            </svg>
          </template>
        </icon>
        <span class="div-show-load-title">在文件识别领域</span>
        <span class="div-show-load-title">让AI帮你快速提取文件中的关键信息</span>
      </div>

    </div>
    <div class="div-show-load" v-if="counter.file_show_load_status">
      <div class="div-show-load-con2"
           v-if="counter.file_show_load_status">
        <a-spin :indicator="indicator" class=""/>
        <span>正在识别中</span>
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