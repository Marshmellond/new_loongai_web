<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useCounterStore} from "@/stores/counter";
import {DownloadOutlined, PlusOutlined} from "@ant-design/icons-vue";
import {message} from "ant-design-vue";
import {marked} from "marked";

// -----------------------------代码高亮-----------------------------
import Prism from "prismjs"
import "prismjs/themes/prism-okaidia.min.css"

const counter = useCounterStore()

let temp_meg = ref("")

const generate_type_select_on1 = () => {
  counter.translate_select = "1"
}
const generate_type_select_on2 = () => {
  counter.translate_select = "2"
}
const generate_type_select_on3 = () => {
  counter.translate_select = "3"
}
const generate_type_select_on4 = () => {
  counter.translate_select = "4"
}
const generate_type_select_on5 = () => {
  counter.translate_select = "5"
}
const generate_type_select_on6 = () => {
  counter.translate_select = "6"
}
const generate_type_select_on7 = () => {
  counter.translate_select = "7"
}
const generate_type_select_on8 = () => {
  counter.translate_select = "8"
}
const generate_type_select_on9 = () => {
  counter.translate_select = "9"
}
const generate_type_select_on10 = () => {
  counter.translate_select = "10"
}
const generate_type_select_on11 = () => {
  counter.translate_select = "11"
}
const generate_type_select_on12 = () => {
  counter.translate_select = "12"
}
const generate_type_select_on13 = () => {
  counter.translate_select = "13"
}
const generate_type_select_on14 = () => {
  counter.translate_select = "14"
}
const generate_type_select_on15 = () => {
  counter.translate_select = "15"
}
const push_func = () => {
  counter.translate_ai_content = ""
  counter.translate_ai_content_markdown = ""
  counter.translate_show_load_status = true
  const url = "/api/translate/generate/openai"
  let body = {
    translate_select: counter.translate_select,
    translate_inp: counter.translate_inp,
    translate_diy: counter.translate_diy,
  }
  fetch(url, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body)
  }).then((res) => {
    if (res.ok) {
      temp_meg.value = ""
      counter.translate_chat_status_bool = true
      counter.translate_show_load_status = false
      setTimeout(() => {
        Prism.highlightAll()
      }, 100)
      return res.body;
    }
  }).then((rb) => {
    const reader = rb?.getReader();
    const decoder = new TextDecoder("utf-8");

    function process({done, value}) {
      if (done) {
        counter.translate_chat_status_bool = false
        setTimeout(() => {
          Prism.highlightAll()
        }, 100)
        return;
      }
      if (counter.translate_chat_status_bool === false) {
        return;
      }
      temp_meg.value += decoder.decode(value);
      if (temp_meg.value.startsWith("ERROR")) {
        // 处理错误情况
        counter.translate_chat_status_bool = false;
        message.error("生成出现错误：输入内容不合法或key错误")
        return;
      }
      counter.translate_ai_content_markdown = marked(temp_meg.value)
      counter.translate_ai_content = temp_meg.value
      reader?.read().then(process);
    }

    reader?.read().then(process);
    console.log("结束了")
  })
}

const on_generate = () => {
  if (counter.translate_inp.length === 0) {
    message.error("翻译内容为空")
  } else {
    push_func()
  }
}
</script>

<template>
  <div class="div1">
    <div class="div-title"
    >翻译内容
    </div>
    <a-textarea
        v-model:value="counter.translate_inp"
        placeholder="输入文本"
        :auto-size="{ minRows: 5, maxRows: 16 }"
        class="div-inp"
    />
    <div class="div-title2">翻译为</div>
    <div class="div-mod-div">
      <div class="div-mod1" style="margin-right: 10px"
           :class="{ 'div-mod-div-select': counter.translate_select==='1'}"
           @click="generate_type_select_on1">
        <div class="div-mod-title">英语</div>
      </div>
      <div class="div-mod1" style="margin-right: 10px"
           :class="{ 'div-mod-div-select': counter.translate_select==='2'}"
           @click="generate_type_select_on2">
        <div class="div-mod-title">中文</div>
      </div>
      <div class="div-mod1" style="margin-right: 10px"
           :class="{ 'div-mod-div-select': counter.translate_select==='3'}"
           @click="generate_type_select_on3">
        <div class="div-mod-title">日语</div>
      </div>
    </div>
    <div class="div-mod-div">
      <div class="div-mod1" style="margin-right: 10px"
           :class="{ 'div-mod-div-select': counter.translate_select==='4'}"
           @click="generate_type_select_on4">
        <div class="div-mod-title">韩语</div>
      </div>
      <div class="div-mod1" style="margin-right: 10px"
           :class="{ 'div-mod-div-select': counter.translate_select==='5'}"
           @click="generate_type_select_on5">
        <div class="div-mod-title">法语</div>
      </div>
      <div class="div-mod1" style="margin-right: 10px"
           :class="{ 'div-mod-div-select': counter.translate_select==='6'}"
           @click="generate_type_select_on6">
        <div class="div-mod-title">德语</div>
      </div>
    </div>
    <div class="div-mod-div">
      <div class="div-mod1" style="margin-right: 10px"
           :class="{ 'div-mod-div-select': counter.translate_select==='7'}"
           @click="generate_type_select_on7">
        <div class="div-mod-title">俄语</div>
      </div>
      <div class="div-mod1" style="margin-right: 10px"
           :class="{ 'div-mod-div-select': counter.translate_select==='8'}"
           @click="generate_type_select_on8">
        <div class="div-mod-title">西班牙语</div>
      </div>
      <div class="div-mod1" style="margin-right: 10px"
           :class="{ 'div-mod-div-select': counter.translate_select==='9'}"
           @click="generate_type_select_on9">
        <div class="div-mod-title">葡萄牙语</div>
      </div>
    </div>
    <div class="div-mod-div">
      <div class="div-mod1" style="margin-right: 10px"
           :class="{ 'div-mod-div-select': counter.translate_select==='10'}"
           @click="generate_type_select_on10">
        <div class="div-mod-title">泰语</div>
      </div>
      <div class="div-mod1" style="margin-right: 10px"
           :class="{ 'div-mod-div-select': counter.translate_select==='11'}"
           @click="generate_type_select_on11">
        <div class="div-mod-title">越南语</div>
      </div>
      <div class="div-mod1" style="margin-right: 10px"
           :class="{ 'div-mod-div-select': counter.translate_select==='12'}"
           @click="generate_type_select_on12">
        <div class="div-mod-title">印尼语</div>
      </div>
    </div>
    <div class="div-mod-div">
      <div class="div-mod1" style="margin-right: 10px"
           :class="{ 'div-mod-div-select': counter.translate_select==='13'}"
           @click="generate_type_select_on13">
        <div class="div-mod-title">意大利语</div>
      </div>
      <div class="div-mod1" style="margin-right: 10px"
           :class="{ 'div-mod-div-select': counter.translate_select==='14'}"
           @click="generate_type_select_on14">
        <div class="div-mod-title">荷兰语</div>
      </div>
      <div class="div-mod1" style="margin-right: 10px"
           :class="{ 'div-mod-div-select': counter.translate_select==='15'}"
           @click="generate_type_select_on15">
        <div class="div-mod-title">自定义</div>
      </div>
    </div>
    <a-textarea
        v-if="counter.translate_select==='15'"
        v-model:value="counter.translate_diy"
        placeholder="输入语言"
        :auto-size="{ minRows: 1.2, maxRows: 1.2 }"
        class="div-inp"
    />
  </div>


  <div class="div2">
    <a-space direction="vertical" class="ant-space">
      <a-button type="primary" size="large" class="ant-button1" @click="on_generate">
        <template #icon>
          <PlusOutlined style="color: black"/>
        </template>
        <span style="color: black">翻译</span>
      </a-button>
    </a-space>
  </div>
</template>

<style scoped lang="less">

.div1 {
  overflow: auto;
  padding: 1vh;
  width: 100%;
  height: 88.5vh;
  background: white;

  .div-title {
    margin-left: 0.2vw;
  }

  .div-title2 {
    margin-left: 0.2vw;
    margin-top: 2vh;
  }

  .div-inp {
    margin-top: 1vh;
  }

  .div-mod-div-select {
    border: 1px solid #4e90ec !important;;
    background: white;
  }

  .div-mod-div {
    display: flex;
    margin-top: 1vh;

    .div-mod1 {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50%;
      height: 6vh;
      border: 1px solid @theme-border-color;
      border-radius: 3px;

      &:hover {
        background: #fdfdfd;
      }
    }

    .div-mod2 {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50%;
      height: 6vh;
      border: 1px solid @theme-border-color;
      border-radius: 3px;

      &:hover {
        background: #fdfdfd;
      }
    }
  }
}

.div2 {
  height: 7vh;
  border-top: 1px solid @theme-border-color;
  background: white;
  overflow: auto;
  padding: 1vh;

  .ant-space {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .ant-button1 {
      width: 18vw;
      position: relative;
      background: #fdfdfd;
      border: 1px solid #e4e4e4;

      &:hover {
        background: #f0f0f0;
      }
    }
  }
}
</style>