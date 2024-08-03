<script setup lang="ts">
import {h, ref} from 'vue';
import {useCounterStore} from "@/stores/counter";
import {DownloadOutlined, LoadingOutlined, PlusOutlined} from "@ant-design/icons-vue";
import {message} from "ant-design-vue";

const counter = useCounterStore()

let temp_meg = ref("")
const indicator = h(LoadingOutlined, {
  style: {
    fontSize: '24px',
  },
  spin: true,
});

const push_func = () => {
  counter.mind_ai_content = ""
  counter.mind_chat_status_bool = true
  const url = "/api/mind/generate/openai"
  let body = {
    mind_inp: counter.mind_inp,
  }
  fetch(url, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body)
  }).then((res) => {
    if (res.ok) {
      temp_meg.value = ""
      counter.mind_chat_status_bool = false
      return res.body;
    }
  }).then((rb) => {
    const reader = rb?.getReader();
    const decoder = new TextDecoder("utf-8");

    function process({done, value}) {
      if (done) {
        return;
      }
      temp_meg.value += decoder.decode(value);
      if (temp_meg.value.startsWith("ERROR")) {
        // 处理错误情况
        message.error("生成出现错误：输入内容不合法或key错误")
        return;
      }
      counter.mind_ai_content = temp_meg.value
      reader?.read().then(process);
    }

    reader?.read().then(process);
    console.log("结束了")
  })
}

const on_generate = () => {
  if (counter.mind_inp.length === 0) {
    message.error("主题输入为空")
  } else {
    push_func()
  }
}
const on_download_png = () => {

}
const on_download_svg = () => {

}
</script>;

<template>

  <div class="div-home">思维导图</div>
  <div class="div1">
    <div class="div-title">主题</div>
    <a-textarea
        v-model:value="counter.mind_inp"
        placeholder="比如：项目规划管理等"
        :auto-size="{ minRows: 3, maxRows: 3 }"
        class="div-inp"
    />
    <div class="div2-a">
      <a-space direction="vertical" class="ant-space-a">
        <a-button type="primary" size="large" class="ant-button1-a" @click="on_generate">
          <template #icon>
            <PlusOutlined style="color: black"/>
          </template>
          <span style="color: black">生成</span>
        </a-button>
      </a-space>
    </div>

    <div class="div-title">生成结果</div>
    <a-textarea
        v-model:value="counter.mind_ai_content"
        placeholder=""
        :auto-size="{ minRows: 23.5, maxRows: 23.5 }"
        class="div-inp"
    />
    <div class="div-show-load-con2"
         v-if="counter.mind_chat_status_bool"
    >
      <a-spin :indicator="indicator" class=""/>
      <span style="margin-top: 1vh">您的思维导图正在疯狂组建中</span>
    </div>
  </div>
  <div class="div2">
    <a-space direction="vertical" class="ant-space">
      <a-button type="primary" size="large" class="ant-button1" @click="on_download_png">
        <template #icon>
          <DownloadOutlined style="color: black"/>
        </template>
        <span style="color: black">下载PNG</span>
      </a-button>
      <a-button type="primary" size="large" class="ant-button2" @click="on_download_svg">
        <template #icon>
          <DownloadOutlined style="color: black"/>
        </template>
        <span style="color: black">下载SVG</span>
      </a-button>
    </a-space>
  </div>
</template>

<style scoped lang="less">
.div-show-load-con2 {
  position: absolute;
  top: 60vh;
  left: 10.5vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.div2-a {
  height: 10vh;
  background: white;
  overflow: auto;
  margin-top: 1vh;

  .ant-space-a {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .ant-button1-a {
      width: 385%;
      position: relative;
      background: #fdfdfd;
      border: 1px solid #e4e4e4;

      &:hover {
        background: #f0f0f0;
      }
    }
  }
}

.div-home {
  font-size: 24px;
  font-weight: 900;
  display: flex;
  justify-content: center;
  background: white;
  padding: 1vh;
  border-bottom: 1px solid @theme-border-color;
}

.div1 {
  overflow: auto;
  padding: 1vh;
  width: 100%;
  height: 83vh;
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
      width: 130%;
      position: relative;
      background: #fdfdfd;
      border: 1px solid #e4e4e4;

      &:hover {
        background: #f0f0f0;
      }
    }

    .ant-button2 {
      width: 130%;
      position: relative;
      left: 2.5vw;
      background: #fdfdfd;
      border: 1px solid #e4e4e4;

      &:hover {
        background: #f0f0f0;
      }
    }
  }
}
</style>