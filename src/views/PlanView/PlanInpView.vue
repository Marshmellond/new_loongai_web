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

const push_func = () => {
  counter.plan_ai_content = ""
  counter.plan_ai_content_markdown = ""
  counter.plan_show_load_status = true
  const url = "/api/plan/generate/openai"
  let body = {
    plan_inp: counter.plan_inp,
    plan_select: counter.plan_select,
  }
  fetch(url, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body)
  }).then((res) => {
    if (res.ok) {
      temp_meg.value = ""
      counter.plan_chat_status_bool = true
      counter.plan_show_load_status = false
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
        counter.plan_chat_status_bool = false
        setTimeout(() => {
          Prism.highlightAll()
        }, 100)
        return;
      }
      if (counter.plan_chat_status_bool === false) {
        return;
      }
      temp_meg.value += decoder.decode(value);
      if (temp_meg.value.startsWith("ERROR")) {
        // 处理错误情况
        counter.plan_chat_status_bool = false;
        message.error("生成出现错误：输入内容不合法或key错误")
        return;
      }
      counter.plan_ai_content_markdown = marked(temp_meg.value)
      counter.plan_ai_content = temp_meg.value
      reader?.read().then(process);
    }

    reader?.read().then(process);
    console.log("结束了")
  })
}

const on_generate = () => {
  if (counter.plan_inp.length === 0) {
    message.error("主题为空")
  } else if (counter.plan_select.length === 0) {
    message.error("教案年级为空")
  } else {
    push_func()
  }
}
</script>

<template>
  <div class="div1">
    <div class="div-title"
    >主题
    </div>
    <a-textarea
        v-model:value="counter.plan_inp"
        placeholder="比如：一元一次方程等"
        :auto-size="{ minRows: 5, maxRows: 32 }"
        class="div-inp"
    />
    <div class="div-title2">教案年级</div>
    <a-textarea
        v-model:value="counter.plan_select"
        placeholder="比如：初一数学等"
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
        <span style="color: black">生成</span>
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