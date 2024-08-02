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
const generate_type_select_on1 = () => {
  counter.pen_generate_type_select = "1"
}
const generate_type_select_on2 = () => {
  counter.pen_generate_type_select = "2"
}
const generate_type_select_on3 = () => {
  counter.pen_generate_type_select = "3"
}

const type_select_on1 = () => {
  counter.pen_type = "1"
}
const type_select_on2 = () => {
  counter.pen_type = "2"
}
let temp_meg = ref("")
const push_func = () => {
  counter.pen_ai_content = ""
  counter.pen_ai_content_markdown = ""
  counter.pen_show_load_status = true
  const url = "/api/pen/generate/openai"
  let body = {
    pen_generate_type_select: counter.pen_generate_type_select,
    pen_theme_inp: counter.pen_theme_inp,
    pen_content_inp: counter.pen_content_inp,
    pen_kpi_inp: counter.pen_kpi_inp,
    pen_type: counter.pen_type,
  }
  fetch(url, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body)
  }).then((res) => {
    if (res.ok) {
      temp_meg.value = ""
      counter.pen_chat_status_bool = true
      counter.pen_show_load_status = false
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
        counter.pen_chat_status_bool = false
        setTimeout(() => {
          Prism.highlightAll()
        }, 100)
        return;
      }
      if (counter.pen_chat_status_bool === false) {
        return;
      }
      temp_meg.value += decoder.decode(value);
      if (temp_meg.value.startsWith("ERROR")) {
        // 处理错误情况
        counter.pen_chat_status_bool = false;
        message.error("生成出现错误：输入内容不合法或key错误")
        return;
      }
      counter.pen_ai_content_markdown = marked(temp_meg.value)
      counter.pen_ai_content = temp_meg.value
      reader?.read().then(process);
    }

    reader?.read().then(process);
    console.log("结束了")
  })
}

const on_generate = () => {
  if (counter.pen_generate_type_select === '1') {
    if (counter.pen_theme_inp.length === 0) {
      message.error("请输入主题")
    } else if (counter.pen_content_inp.length === 0) {
      message.error("请输入工作内容")
    } else if (counter.pen_kpi_inp.length === 0) {
      message.error("请输入工作业绩")
    } else {
      push_func()
    }
  } else if (counter.pen_generate_type_select === '2') {
    if (counter.pen_theme_inp.length === 0) {
      message.error("请输入主题")
    } else {
      push_func()
    }
  } else {
    if (counter.pen_theme_inp.length === 0) {
      message.error("请输入主题")
    } else {
      push_func()
    }
  }
}
</script>

<template>
  <div class="div1">
    <div class="div-title">写作类型</div>
    <div class="div-mod-div">
      <div class="div-mod1" style="margin-right: 10px"
           :class="{ 'div-mod-div-select': counter.pen_generate_type_select==='1'}"
           @click="generate_type_select_on1">
        <div class="div-mod-title">工作总结</div>
      </div>
      <div class="div-mod1"
           :class="{ 'div-mod-div-select': counter.pen_generate_type_select==='2'}"
           @click="generate_type_select_on2">
        <div class="div-mod-title">方案计划</div>
      </div>
    </div>
    <div class="div-mod-div">
      <div class="div-mod1"
           style="width: 48.5%"
           :class="{ 'div-mod-div-select': counter.pen_generate_type_select==='3'}"
           @click="generate_type_select_on3">
        <div class="div-mod-title">改写/扩写</div>
      </div>
    </div>
    <div class="div-title2"
         v-if="counter.pen_generate_type_select==='1'"
    >主题
    </div>
    <a-textarea
        v-model:value="counter.pen_theme_inp"
        placeholder="比如：公司年会总结等"
        :auto-size="{ minRows: 3, maxRows: 3 }"
        class="div-inp"
        v-if="counter.pen_generate_type_select==='1'"
    />
    <div class="div-title2"
         v-if="counter.pen_generate_type_select==='1'"
    >工作内容
    </div>
    <a-textarea
        v-model:value="counter.pen_content_inp"
        placeholder="比如：直播带货等"
        :auto-size="{ minRows: 3, maxRows: 3 }"
        class="div-inp"
        v-if="counter.pen_generate_type_select==='1'"
    />
    <div class="div-title2"
         v-if="counter.pen_generate_type_select==='1'"
    >工作业绩
    </div>
    <a-textarea
        v-model:value="counter.pen_kpi_inp"
        placeholder="比如：3季度销量冠军等"
        :auto-size="{ minRows: 3, maxRows: 3 }"
        class="div-inp"
        v-if="counter.pen_generate_type_select==='1'"
    />
    <div class="div-title2"
         v-if="counter.pen_generate_type_select==='2'"
    >主题
    </div>
    <a-textarea
        v-model:value="counter.pen_theme_inp"
        placeholder="比如：公司年会总结等"
        :auto-size="{ minRows: 3, maxRows: 3 }"
        class="div-inp"
        v-if="counter.pen_generate_type_select==='2'"
    />
    <div class="div-title2"
         v-if="counter.pen_generate_type_select==='3'"
    >主题
    </div>
    <a-textarea
        v-model:value="counter.pen_theme_inp"
        placeholder="比如：公司年会总结等"
        :auto-size="{ minRows: 3, maxRows: 3 }"
        class="div-inp"
        v-if="counter.pen_generate_type_select==='3'"
    />
    <div class="div-title2" v-if="counter.pen_generate_type_select==='3'">类型</div>
    <div class="div-mod-div" v-if="counter.pen_generate_type_select==='3'">
      <div class="div-mod2" style="margin-right: 10px"
           :class="{ 'div-mod-div-select': counter.pen_type==='1'}"
           @click="type_select_on1">
        <div class="div-mod-title">改写</div>
      </div>
      <div class="div-mod2" style="margin-right: 10px"
           :class="{ 'div-mod-div-select': counter.pen_type==='2'}"
           @click="type_select_on2">
        <div class="div-mod-title">扩写</div>
      </div>
    </div>
  </div>


  <div class="div2">
    <a-space direction="vertical" class="ant-space">
      <a-button type="primary" size="large" class="ant-button1" @click="on_generate">
        <template #icon>
          <PlusOutlined style="color: black"/>
        </template>
        <span style="color: black">写作</span>
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
    justify-content: flex-start;
    align-items: center;

    .ant-button1 {
      width: 390%;
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