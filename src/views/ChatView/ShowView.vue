<script setup lang="ts">
import {ref, onUpdated, watch} from 'vue';
import {CloseOutlined} from '@ant-design/icons-vue';
import {useCounterStore} from '@/stores/counter'
import {marked} from 'marked';
import hljs from 'highlight.js'
import 'highlight.js/styles/foundation.css'
const messageBuffer = ref(''); // 添加一个用于存储消息片段的缓冲区

const render = new marked.Renderer()
marked.setOptions({
  renderer: render, // 这是必填项
  gfm: true,	// 启动类似于Github样式的Markdown语法
  pedantic: false, // 只解析符合Markdwon定义的，不修正Markdown的错误
  sanitize: false, // 原始输出，忽略HTML标签（关闭后，可直接渲染HTML标签）

  // 高亮的语法规范
  highlight: (code, lang) => hljs.highlight(code, {language: lang}).value,
})

const counter = useCounterStore()
const textarea_input = ref<string>('');
watch(() => counter.selected_item, () => {
  get_data()
})
let chat_api = ref("")
let chat_rec_id = ref("")
const get_data = () => {
  counter.contents = []
  if (counter.selected_item) {
    let rec_data = counter.recording.filter(item => item[0] == counter.selected_item)[0]
    chat_api.value = rec_data[3]
    chat_rec_id.value = rec_data[0]

    const url1 = "/api/chat/get_api_ver"
    fetch(url1).then((res) => {
      return res.json()
    }).then((data) => {
      if (data["code"] == 1) {
        chat_api.value += "-"
        chat_api.value += data["api_ver"]
      }
    })
    const url2 = "/api/chat/get_con_chat"
    let body = {
      chat_rec_id: chat_rec_id.value,
    }
    fetch(url2, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body),
      credentials: "include"
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
    }).then((data) => {
      if (data["code"] == 1) {
        for (let i of data["data"]) {
          counter.contents.push([i[0], marked(i[1]), i[2], i[3]])
        }
      }
    })

  }
}
get_data()


const scrollContainer = ref(null);
onUpdated(() => {
  const container = scrollContainer.value;
  container.scrollTop = container.scrollHeight;
});


const push_message = (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    seed_message();
    textarea_input.value = ''
  } else if (event.key === 'Enter' && event.shiftKey) {
    textarea_input.value += '\n';
  }
}
const seed_message = () => {
  const url1 = "/api/chat/add_con_data"
  const chat_con_user = textarea_input.value
  let body = {
    chat_rec_id: chat_rec_id.value,
    textarea_input: chat_con_user
  }
  fetch(url1, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body),
    credentials: "include"
  }).then((res) => {
    if (res.ok) {
      return res.json()
    }
  }).then((data) => {
    if (data["code"] == 1) {
      for (let i of data["data"]) {
        counter.contents.push([i[0], marked(i[1]), i[2], i[3]])
      }

      const url2 = "/api/chat/add_con_chat"
      let body2 = {
        chat_rec_id: chat_rec_id.value,
        textarea_input: chat_con_user
      }
      fetch(url2, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body2)
      })
          .then((res) => {
            if (res.status === 200) {
              return res.body;
            }
          })
          .then((rb) => {
            const reader = rb?.getReader();

            function process({done, value}) {
              if (done) {
                return;
              }
              const message = new TextDecoder("utf-8").decode(value);
              let messages = message.split("data: ")
              let messagesFiltered = []
              for (const msg of messages) {
                if (msg !== "") {
                  let jsonData = JSON.parse(msg)
                  messagesFiltered.push(jsonData)
                }
              }
              for (const iterator of messagesFiltered) {
                counter.contents[counter.contents.length - 1][1] += iterator.msg
              }
              reader?.read().then(process);
            }

            reader?.read().then(process);
          })
    }
  })
}
</script>
<template>
  <div class="div1">
    <div class="div2">
      <span class="div2-title">{{ chat_api }}</span>
      <div class=div2-close>
        <CloseOutlined/>
      </div>
    </div>
    <div class="div3" ref="scrollContainer">
      <div style=" display: flex;  justify-content: flex-start; margin-bottom: 10px"
           v-for="(item) in counter.contents" :key="item[0]">
        <a-dropdown style="border-radius: 10px">
          <a-avatar shape="square" class="ant-head">
            <template #icon>
              <img :src="item[3]" alt="">
            </template>
          </a-avatar>
        </a-dropdown>
        <div class="div-content">
        <span class="div3-title" v-html="item[1]">
        </span><br>
        </div>
      </div>

    </div>
    <div class="div4">
      <a-textarea
          v-model:value="textarea_input"
          placeholder="输入消息内容"
          :autoSize="{ minRows: 3, maxRows: 7.5 }"
          style="width: 50%"
          :allowClear="true"
          class="textarea-input"
          @keydown="push_message"
      />
    </div>
  </div>


</template>

<style scoped lang="less">
@import "src/assets/css/frame.less";
@import "src/assets/css/theme.less";

.ant-head {
  position: relative;
  left: 9.5%;
  top: 10px;
}


.div1 {
  width: 100%;
}

.div2 {
  width: 99.96%;
  height: 50px;
  position: relative;
  left: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid @theme-border-color;
  border-left: 1px solid @theme-border-color;
  background-color: @theme-background-color;

  .div2-title {
    position: relative;
    left: 5px;
    line-height: normal;
  }

  .div2-close {
    .the-frame();
    margin-left: auto;
    position: relative;
    right: 10px;

    &:hover {
      color: #fc2c54;
      border: 1px solid #fc2c54;
    }
  }
}

.div3 {
  width: 99.96%;
  height: 70vh;
  position: relative;
  left: 1px;
  border-bottom: 1px solid @theme-border-color;
  border-left: 1px solid @theme-border-color;
  background-color: @theme-background-color;
  overflow: auto;


  .div-content {
    position: relative;
    left: 10%;
    top: 10px;
    max-width: 40vw; // 指定最大宽度，超过这个宽度内容会自动换行
    min-height: 10%; // 设置最小高度
    border: 1px solid @theme-border-color;
    border-radius: 5px;
    overflow: auto; // 设置溢出为自动
    word-wrap: break-word; // 设置文字换行
    overflow-wrap: break-word; // 设置文字换行

    .div3-title {
      position: relative;
    }
  }
}

.div4 {
  width: 99.96%;
  height: 188px;
  position: relative;
  left: 1px;
  border-bottom: 1px solid @theme-border-color;
  border-left: 1px solid @theme-border-color;
  background-color: @theme-background-color;

  .div4-title {
    position: relative;
    left: 97%;
  }

  .textarea-input {
    position: relative;
    left: 20%;
    top: 10px;
  }
}


</style>