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
  navigator.clipboard.writeText(counter.plan_ai_content);
  message.success("复制成功")
}
const stop_chat = () => {
  counter.plan_chat_status_bool = false
}
</script>

<template>
  <div class="div1" v-if="counter.plan_ai_content_markdown.length!==0">
    <div class="div-div-user2" @click="click_copy">
      <div class="div-content-user">
        <span v-html="counter.plan_ai_content_markdown" class="div-content-txt-user"></span>
      </div>
    </div>
  </div>

  <div class="div6" v-if="counter.plan_chat_status_bool">
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

  <div class="div2" v-if="counter.plan_ai_content_markdown.length===0">
    <div class="div-show-load" v-if="!counter.plan_show_load_status">
      <div class="div-show-load-con1"
           v-if="!counter.plan_show_load_status"
      >
        <icon :style="{ color: '#8994a6'}" class="div-show-load-ico">
          <template #component>
            <svg t="1722670278115" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="8800" width="32" height="32">
              <path
                  d="M503.223 707.022c-21.48 0-38.964 17.48-38.964 38.964v143.551c0 21.484 17.485 38.964 38.964 38.964h16.406c21.484 0 38.964-17.48 38.964-38.964v-143.55c0-21.484-17.48-38.965-38.964-38.965h-16.406z"
                  fill="#4A4A4A" p-id="8801"></path>
              <path
                  d="M519.63 688.566h-16.407c-31.663 0-57.42 25.753-57.42 57.42v143.551c0 31.664 25.757 57.42 57.42 57.42h16.406c31.667 0 57.42-25.756 57.42-57.42v-143.55c0-31.664-25.76-57.421-57.42-57.421z m-36.914 57.42c0-11.279 9.228-20.507 20.507-20.507h16.406c11.28 0 20.507 9.228 20.507 20.507v143.551c0 11.28-9.228 20.508-20.507 20.508h-16.406c-11.279 0-20.507-9.229-20.507-20.508v-143.55z"
                  p-id="8802"></path>
              <path
                  d="M400.129 711.292L188.374 923.054a38.697 38.697 0 0 0-11.385 27.55c0 10.426 4.044 20.212 11.39 27.558l15.954 15.959c15.196 15.187 39.912 15.187 55.112 0l211.754-211.755a38.701 38.701 0 0 0 11.382-27.55 38.693 38.693 0 0 0-11.386-27.557L455.24 711.3c-15.2-15.192-39.92-15.192-55.111-0.008z"
                  fill="#4A4A4A" p-id="8803"></path>
              <path
                  d="M427.678 681.454a56.99 56.99 0 0 0-40.596 16.8L175.324 910.007c-10.832 10.824-16.8 25.236-16.8 40.592s5.968 29.78 16.808 40.608l15.946 15.951a57.002 57.002 0 0 0 40.6 16.8c15.344 0 29.765-5.96 40.593-16.784L484.233 795.41a57.002 57.002 0 0 0 16.796-40.592c0-15.356-5.964-29.785-16.804-40.613l-15.938-15.942-0.012-0.017-0.009-0.008a57.06 57.06 0 0 0-40.588-16.783zM195.441 950.6c0-5.25 1.994-10.512 5.984-14.499L413.18 724.347a20.45 20.45 0 0 1 14.498-5.98c5.258 0 10.512 1.993 14.503 5.98l15.955 15.971a20.4 20.4 0 0 1 5.984 14.499c0 5.25-1.99 10.508-5.984 14.49L246.386 981.07c-3.991 3.982-9.25 5.976-14.503 5.976s-10.508-1.994-14.495-5.976l-15.963-15.971a20.417 20.417 0 0 1-5.984-14.5z"
                  p-id="8804"></path>
              <path
                  d="M595.153 699.91a38.685 38.685 0 0 0-27.55 11.39l0.005-0.008-15.959 15.959c-15.192 15.2-15.188 39.915 0 55.107l211.759 211.754c15.187 15.196 39.903 15.196 55.099 0l15.967-15.963c7.345-7.341 11.381-17.127 11.381-27.55s-4.036-20.207-11.381-27.549L622.707 711.292a38.718 38.718 0 0 0-27.554-11.382z"
                  fill="#4A4A4A" p-id="8805"></path>
              <path
                  d="M595.157 681.458c-15.355 0-29.776 5.963-40.6 16.795l-15.959 15.96a57.03 57.03 0 0 0-16.795 40.604c0 15.351 5.967 29.776 16.804 40.6l211.75 211.746c10.832 10.836 25.248 16.796 40.6 16.796s29.773-5.96 40.592-16.796L847.52 991.2c22.386-22.39 22.386-58.815 0-81.205L635.758 698.241l-0.017-0.008-0.016-0.025a57.084 57.084 0 0 0-40.568-16.75z m-36.441 73.359c0-5.263 1.993-10.512 5.984-14.507l15.955-15.959a20.438 20.438 0 0 1 14.502-5.98c5.254 0 10.508 1.99 14.5 5.976L821.418 936.1a20.45 20.45 0 0 1 5.98 14.499 20.421 20.421 0 0 1-5.98 14.499l-15.963 15.97a20.479 20.479 0 0 1-14.499 5.977 20.45 20.45 0 0 1-14.499-5.976L564.7 769.307a20.413 20.413 0 0 1-5.984-14.49z"
                  p-id="8806"></path>
              <path d="M122.005 72.559h779.938v689.825H122.005z" fill="#F0F0F0" p-id="8807"></path>
              <path
                  d="M901.947 780.84H122.005a18.457 18.457 0 0 1-18.457-18.456V72.559a18.457 18.457 0 0 1 18.457-18.457h779.938a18.457 18.457 0 0 1 18.456 18.457v689.825a18.448 18.448 0 0 1-18.452 18.456zM140.46 743.927h743.025V91.016H140.461v652.911z"
                  fill="#666666" p-id="8808"></path>
              <path
                  d="M993.085 757.388c0 22.558-18.456 41.015-41.014 41.015H71.885c-22.558 0-41.015-18.457-41.015-41.015v-23.702c0-22.558 18.457-41.015 41.015-41.015h880.19c22.558 0 41.015 18.457 41.015 41.015v23.702z"
                  fill="#666666" p-id="8809"></path>
              <path
                  d="M952.07 816.86H71.886c-32.791 0-59.471-26.68-59.471-59.472v-23.702c0-32.791 26.68-59.471 59.47-59.471h880.19c32.792 0 59.472 26.68 59.472 59.47v23.703c-0.004 32.791-26.684 59.471-59.475 59.471zM71.886 711.123a22.583 22.583 0 0 0-22.558 22.558v23.702c0 12.436 10.118 22.558 22.558 22.558h880.19c12.436 0 22.558-10.122 22.558-22.558v-23.702c0-12.436-10.122-22.558-22.558-22.558H71.885z"
                  p-id="8810"></path>
              <path
                  d="M993.085 85.65c0 22.559-18.456 41.015-41.014 41.015H71.885c-22.558 0-41.015-18.456-41.015-41.014V59.47c0-22.558 18.457-41.014 41.015-41.014h880.19c22.558 0 41.015 18.456 41.015 41.014v26.18z"
                  fill="#666666" p-id="8811"></path>
              <path
                  d="M952.07 145.122H71.886c-32.791 0-59.471-26.68-59.471-59.471V59.47C12.414 26.68 39.094 0 71.884 0h880.19c32.792 0 59.472 26.68 59.472 59.471v26.18c-0.004 32.791-26.684 59.471-59.475 59.471zM71.886 36.913a22.583 22.583 0 0 0-22.558 22.558v26.18c0 12.44 10.118 22.558 22.558 22.558h880.19c12.436 0 22.558-10.118 22.558-22.558V59.47c0-12.44-10.122-22.558-22.558-22.558H71.885z"
                  p-id="8812"></path>
              <path d="M122.005 126.665h779.938v57.42H122.005z" opacity=".03" p-id="8813"></path>
              <path d="M298.15 405.565a176.363 176.363 0 1 0 352.726 0 176.363 176.363 0 1 0-352.726 0z" fill="#FFE300"
                    p-id="8814"></path>
              <path
                  d="M474.513 594.232c-104.03 0-188.667-84.638-188.667-188.667s84.637-188.667 188.667-188.667S663.18 301.535 663.18 405.565c0 104.033-84.638 188.667-188.667 188.667z m0-352.726c-90.462 0-164.058 73.597-164.058 164.059s73.596 164.058 164.058 164.058 164.058-73.596 164.058-164.058-73.6-164.059-164.058-164.059z"
                  fill="#FF7F00" p-id="8815"></path>
              <path d="M503.236 453.437a127.145 127.145 0 1 0 254.29 0 127.145 127.145 0 1 0-254.29 0z" fill="#00D9B0"
                    p-id="8816"></path>
              <path
                  d="M630.38 592.887c-76.893 0-139.449-62.556-139.449-139.45 0-76.894 62.556-139.45 139.45-139.45s139.45 62.556 139.45 139.45c0 76.894-62.556 139.45-139.45 139.45z m0-254.29c-63.322 0-114.84 51.518-114.84 114.84s51.518 114.841 114.84 114.841 114.842-51.518 114.842-114.84-51.519-114.842-114.841-114.842z"
                  fill="#047391" p-id="8817"></path>
            </svg>
          </template>
        </icon>
        <span class="div-show-load-title">在教案领域</span>
        <span class="div-show-load-title">让AI帮你完成各种各样繁杂的教学文案编写</span>
      </div>

    </div>
    <div class="div-show-load" v-if="counter.plan_show_load_status">
      <div class="div-show-load-con2"
           v-if="counter.plan_show_load_status">
        <a-spin :indicator="indicator" class=""/>
        <span>正在生成中</span>
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