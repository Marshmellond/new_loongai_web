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
  navigator.clipboard.writeText(counter.study_ai_content);
  message.success("复制成功")
}
const stop_chat = () => {
  counter.study_chat_status_bool = false
}
</script>

<template>
  <div class="div1" v-if="counter.study_ai_content_markdown.length!==0">
    <div class="div-div-user2">
      <div class="div-content-user" @click="click_copy">
        <span v-html="counter.study_ai_content_markdown" class="div-content-txt-user"></span>
      </div>
    </div>
  </div>

  <div class="div6" v-if="counter.study_chat_status_bool">
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

  <div class="div2" v-if="counter.study_ai_content_markdown.length===0">
    <div class="div-show-load" v-if="!counter.study_show_load_status">
      <div class="div-show-load-con1"
           v-if="!counter.study_show_load_status"
      >
        <icon :style="{ color: '#8994a6'}" class="div-show-load-ico">
          <template #component>
            <svg t="1722764350432" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="6646" width="32" height="32">
              <path
                  d="M2.347249 4.694499m226.53453 0l566.236442 0q226.53453 0 226.53453 226.534529l0 566.236442q0 226.53453-226.53453 226.53453l-566.236442 0q-226.53453 0-226.53453-226.53453l0-566.236442q0-226.53453 226.53453-226.534529Z"
                  fill="#40B4F0" p-id="6647"></path>
              <path
                  d="M664.471323 419.508389L531.726883 551.553648l-1.098713-1.098712-44.447912-44.447913a35.358564 35.358564 0 0 0-19.97659-8.589934 29.964885 29.964885 0 0 0-28.866173 7.09169l-59.92977 59.92977a26.668748 26.668748 0 1 0 37.755755 37.755755l47.344518-47.344519 1.098713 1.098713 44.447912 44.447912a37.955521 37.955521 0 0 0 19.97659 9.988295 28.76629 28.76629 0 0 0 28.466641-7.79087l146.128755-145.329691a26.668748 26.668748 0 0 0 0-37.755755 26.968396 26.968396 0 0 0-38.055403 0z m0 0"
                  fill="#FFFFFF" p-id="6648"></path>
              <path
                  d="M809.001951 271.481857H552.402653v-86.798283a26.668748 26.668748 0 0 0-53.337495 0v86.798283H242.066329a54.835739 54.835739 0 0 0-54.83574 54.83574v340.201326A54.835739 54.835739 0 0 0 242.066329 721.354663h256.998829v86.798283a26.668748 26.668748 0 0 0 53.337495 0v-86.798283h256.599298a54.835739 54.835739 0 0 0 54.835739-54.83574V326.317597a54.635973 54.635973 0 0 0-54.835739-54.83574z m1.797893 366.570425a29.964885 29.964885 0 0 1-29.964885 29.964885H270.932501a29.964885 29.964885 0 0 1-29.964885-29.964885V354.784237a29.964885 29.964885 0 0 1 29.964885-29.964885h510.002341a29.964885 29.964885 0 0 1 29.964885 29.964885z m0 0"
                  fill="#FFFFFF" p-id="6649"></path>
            </svg>
          </template>
        </icon>
        <span class="div-show-load-title">在学情分析领域</span>
        <span class="div-show-load-title">让AI帮你完成各种各样繁杂的学生情况分析</span>
      </div>
    </div>
    <div class="div-show-load" v-if="counter.study_show_load_status">
      <div class="div-show-load-con2"
           v-if="counter.study_show_load_status">
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