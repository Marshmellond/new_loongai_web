<script setup lang="ts">
import {ref, onUpdated} from 'vue';
import {CloseOutlined} from '@ant-design/icons-vue';
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()
const show_contents = counter.contents

const textarea_input = ref<string>('');
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
  let url = "http://127.0.0.1:8000/run_txt";
  let push_id;
  if (show_contents.length === 0) {
    push_id = 0
  } else {
    push_id = parseInt(show_contents[show_contents.length - 1][0]) + 1
  }
  show_contents.push([push_id.toString(), textarea_input.value, "2024-05-13 05:38", "https://skv.cool/upload/skv.png"])
  show_contents.push([(push_id + 1).toString(), "", "2024-05-13 05:38", "https://cdn.d5v.cc/blog/1711297272589.png"])
  fetch(url, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({msg: textarea_input.value})
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
            show_contents[show_contents.length - 1][1] += iterator.msg
          }
          reader?.read().then(process);
        }

        reader?.read().then(process);
      })
}
</script>
v-for="(item, index) in show_recording" :key="item[0]"
<template>
  <div class="div1">
    <div class="div2">
      <span class="div2-title">星火大模型3.5</span>
      <div class=div2-close>
        <CloseOutlined/>
      </div>
    </div>
    <div class="div3" ref="scrollContainer">
      <div style=" display: flex;  justify-content: flex-start; margin-bottom: 10px"
           v-for="(item) in show_contents" :key="item[0]">
        <a-dropdown style="border-radius: 10px">
          <a-avatar shape="square" class="ant-head">
            <template #icon>
              <img :src="item[3]" alt="">
            </template>
          </a-avatar>
        </a-dropdown>
        <div class="div-content">
        <span class="div3-title">
          {{ item[1] }}
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