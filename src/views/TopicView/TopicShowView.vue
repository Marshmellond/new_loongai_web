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
  navigator.clipboard.writeText(counter.topic_ai_content);
  message.success("复制成功")
}
const stop_chat = () => {
  counter.topic_chat_status_bool = false
}
</script>

<template>
  <div class="div1" v-if="counter.topic_ai_content_markdown.length!==0">
    <div class="div-div-user2">
      <div class="div-content-user" @click="click_copy">
        <span v-html="counter.topic_ai_content_markdown" class="div-content-txt-user"></span>
      </div>
    </div>
  </div>

  <div class="div6" v-if="counter.topic_chat_status_bool">
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

  <div class="div2" v-if="counter.topic_ai_content_markdown.length===0">
    <div class="div-show-load" v-if="!counter.topic_show_load_status">
      <div class="div-show-load-con1"
           v-if="!counter.topic_show_load_status"
      >
        <icon :style="{ color: '#8994a6'}" class="div-show-load-ico">
          <template #component>
            <svg t="1722717507383" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="9151" width="32" height="32">
              <path
                  d="M204.8 150.4256a38.4 38.4 0 0 1 38.4-38.4h537.6a38.4 38.4 0 0 1 38.4 38.4v691.2a38.4 38.4 0 0 1-38.4 38.4H243.2a38.4 38.4 0 0 1-38.4-38.4v-691.2z"
                  fill="#00B781" p-id="9152"></path>
              <path
                  d="M780.8 73.6256a76.8 76.8 0 0 1 76.8 76.8v691.2a76.8 76.8 0 0 1-76.8 76.8H243.2a76.8 76.8 0 0 1-76.8-76.8v-691.2a76.8 76.8 0 0 1 76.8-76.8h537.6z m0 76.8H243.2v691.2h537.6v-691.2z"
                  fill="#00B781" p-id="9153"></path>
              <path
                  d="M358.4 73.6256a38.4 38.4 0 0 1 38.4 38.4v768a38.4 38.4 0 1 1-76.8 0v-768a38.4 38.4 0 0 1 38.4-38.4zM665.6 227.2256a38.4 38.4 0 0 1 0 76.8h-153.6a38.4 38.4 0 0 1 0-76.8h153.6zM665.6 380.8256a38.4 38.4 0 0 1 0 76.8h-153.6a38.4 38.4 0 0 1 0-76.8h153.6z"
                  fill="#FFFFFF" p-id="9154"></path>
              <path
                  d="M473.6 73.6256a38.4 38.4 0 0 1 0 76.8h-230.4a38.4 38.4 0 0 1 0-76.8h230.4zM473.6 841.6256a38.4 38.4 0 1 1 0 76.8h-230.4a38.4 38.4 0 1 1 0-76.8h230.4z"
                  fill="#00B781" p-id="9155"></path>
            </svg>
          </template>
        </icon>
        <span class="div-show-load-title">在题目领域</span>
        <span class="div-show-load-title">让AI帮你生成各式各样的题目吧</span>
      </div>

    </div>
    <div class="div-show-load" v-if="counter.topic_show_load_status">
      <div class="div-show-load-con2"
           v-if="counter.topic_show_load_status">
        <a-spin :indicator="indicator" class=""/>
        <span>正在出题中</span>
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