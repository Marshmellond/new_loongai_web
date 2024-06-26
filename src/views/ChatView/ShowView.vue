<script setup lang="ts">
import {ref, onUpdated, watch} from 'vue';
import {useCounterStore} from '@/stores/counter'
import {marked} from 'marked';
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'; // 或其他样式
import Icon from '@ant-design/icons-vue';
import {onMounted} from "vue";
import {
  LoadingOutlined,
  DeleteOutlined,
  FormOutlined,
} from '@ant-design/icons-vue';
import {h} from 'vue';
import {message} from "ant-design-vue";

const counter = useCounterStore()
const open = ref<boolean>(false);
const indicator = h(LoadingOutlined, {
  style: {
    fontSize: '24px',
  },
  spin: true,
});

marked.setOptions({
  highlight: function (code, lang) {
    try {
      if (lang) {
        return hljs.highlight(code, {language: lang}).value
      } else {
        return hljs.highlightAuto(code).value
      }
    } catch (error) {
      return code
    }
  },
  gfmtrue: true,
  breaks: true
})

const chat_show_load = ref(false)
const textarea_input = ref<string>('');
watch(() => counter.selected_item, () => {
  get_data()
})
let chat_rec_id = ref("")
const get_data = () => {
  counter.contents = []
  if (counter.selected_item) {
    let rec_data = counter.recording.filter(item => item[0] == counter.selected_item)[0]
    chat_rec_id.value = rec_data[0]
    let body1 = {
      chat_rec_id: chat_rec_id.value,
    }
    const url1 = "/api/chat/get_api_ver"
    fetch(url1, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body1),
      credentials: "include"
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
    }).then((data) => {
      if (data["code"] == 1) {
        counter.chat_api = ""
        counter.chat_api += `${data["api_name"]}-${data["api_ver"]}`
        counter.chat_img_head = data["chat_img_head"]
        counter.chat_mod_img_head = data["chat_mod_img_head"]
        counter.chat_mod_name = data["chat_mod_name"]
        counter.chat_rec_title = data["chat_rec_title"]
      }
    })
    const url2 = "/api/chat/get_con_chat"
    let body2 = {
      chat_rec_id: chat_rec_id.value,
    }
    fetch(url2, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body2),
      credentials: "include"
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
    }).then((data) => {
      if (data["code"] == 1) {
        counter.contents = []
        for (let i of data["data"]) {
          counter.contents.push([i[0], marked(i[1]), i[2], i[3], i[4], i[1], false])
        }
      }
    })

  }
}
onMounted(get_data)


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
let temp_make_content = ref("")
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
        counter.contents.push([i[0], marked(i[1]), i[2], i[3], i[4], i[1], false])
      }
      console.log(counter.contents)
      chat_show_load.value = true
      const url2 = "/api/chat/add_con_chat"
      let body2 = {
        chat_rec_id: chat_rec_id.value,
        textarea_input: chat_con_user,
        chat_con_order: data["data"][0][0],
        chat_con_user_time: data["data"][0][2],
        chat_con_user_img: data["data"][0][3],
        chat_con_ai_img: data["data"][1][3],
      }
      fetch(url2, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body2)
      })
          .then((res) => {
            if (res.status === 200) {
              temp_make_content.value = ""
              chat_show_load.value = false
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
                temp_make_content.value += iterator.msg
                counter.contents[counter.contents.length - 1][1] = marked(temp_make_content.value)
                counter.contents[counter.contents.length - 1][5] = temp_make_content.value
              }
              reader?.read().then(process);
            }

            reader?.read().then(process);
          })
    }
  })
}
const get_rec_data = (status: boolean) => {
  const url = "/api/chat/get_rec_data"
  fetch(url).then((res) => {
    return res.json()
  }).then((data) => {
    counter.recording = []
    if (data["code"] == 1) {
      for (let i of data["data"]) {
        counter.recording.unshift(i)
      }
    }
    if (status) {
      counter.selected_item = counter.recording[0][0]
    }
    if (counter.recording.length === 0) {
      counter.selected_item = "";
    }
  })

}
const delete_record = () => {
  const url = "/api/chat/del_rec_data"
  let body = {
    chat_rec_id: counter.selected_item
  }
  fetch(url, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body),
    credentials: "include"
  }).then((res) => {
    if (res.ok) {
      return res.json()
    }
  }).then(() => {
    counter.chat_api = ""
    counter.chat_img_head = ""
    counter.chat_mod_img_head = ""
    get_rec_data(true)
  })
  if (counter.recording.length === 0) {
    counter.selected_item = "";
  }

};


const show_edit = () => {
  const url = "/api/chat/edit_rec_data"
  let body = {
    chat_rec_id: counter.selected_item,
  }
  fetch(url, {
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
      counter.edit_name = data["data"]["edit_name"]
      counter.edit_mod_view = data["data"]["edit_mod_view"]
      counter.edit_app_view = data["data"]["edit_app_view"]
      counter.edit_mod_options = data["data"]["edit_mod_options"]
      counter.edit_app_options = data["data"]["edit_app_options"]
    }
  })
  open.value = true;
}

const handleOk = () => {
  const url = "/api/chat/alter_edit_rec_data"
  if (counter.edit_mod.length == 0) {
    counter.edit_mod = {0: "data-null", 1: "data-null"}
  }
  if (counter.edit_app.length == 0) {
    counter.edit_app = {0: "data-null", 1: "data-null"}
  }
  if (counter.edit_app[0] == "无") {
    counter.edit_app = {0: "无", 1: "无"}
  }
  const chat_rec_id = counter.selected_item
  let body = {
    chat_rec_id: chat_rec_id,
    chat_rec_title: counter.edit_name,
    chat_api: counter.edit_mod[0],
    api_select: counter.edit_mod[1],
    chat_mod_id: counter.edit_app[1]
  }
  console.log(body)
  fetch(url, {
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
      get_rec_data()
      const get_show_data = () => {
        let body = {
          chat_rec_id: chat_rec_id,
        }
        const url = "/api/chat/get_api_ver"
        fetch(url, {
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
            counter.chat_api = ""
            counter.chat_api += `${data["api_name"]}-${data["api_ver"]}`
            counter.chat_img_head = data["chat_img_head"]
            counter.chat_mod_img_head = data["chat_mod_img_head"]
            counter.chat_mod_name = data["chat_mod_name"]
            counter.chat_rec_title = data["chat_rec_title"]
          }
        })
      }
      get_show_data()
      message.success("对话信息更新成功")
    }
  })

  counter.edit_name = ""
  counter.edit_mod_view = ""
  counter.edit_app_view = ""
  counter.edit_mod = ""
  counter.edit_app = ""
  counter.edit_temp_select_red_id = ""
  open.value = false;

};
const speechSynthesis_status = ref(false)
const click_sound = (text: string, index) => {
  counter.contents[index][6] = true
  const utterance = new SpeechSynthesisUtterance(text);

  utterance.rate = 1.5; // 语速 0.1-10
  utterance.volume = 1 // 音量 0-1
  utterance.pitch = 1.5; // 音调 0-2

  // 朗读文本
  speechSynthesis.speak(utterance);

  utterance.onend = () => {
    counter.contents[index][6] = false;
  };
}
const click_sound_stop = (index) => {
  speechSynthesis.cancel()
  counter.contents[index][6] = false
}
const click_copy = (text: string) => {
  navigator.clipboard.writeText(text);
  message.success("复制成功")
}
</script>
<template>

  <div class="div1">
    <div class="div2">
      <FormOutlined class="ant-edit" @click="show_edit"/>
      <DeleteOutlined class="ant-delete" @click="delete_record"/>

      <div v-if="counter.chat_img_head" style="margin-left: -3vw">
        <a-avatar shape="square" class="ant-head1">
          <template #icon>
            <img :src="counter.chat_img_head" alt="">
          </template>
        </a-avatar>
        <span class="div2-title">{{ counter.chat_api }}</span>
      </div>
      <div v-if="counter.chat_mod_img_head" style="margin-left: 2vw">
        <a-avatar shape="square" class="ant-head1">
          <template #icon>
            <img :src="counter.chat_mod_img_head" alt="">
          </template>
        </a-avatar>
        <span class="div2-title">{{ counter.chat_mod_name }}</span>
      </div>
      <span class="div2-recode-title">{{ counter.chat_rec_title }}</span>
      <a-modal v-model:open="open" title="对话信息" @ok="handleOk" okText="保存" cancelText="关闭">
        <div class="edit-title">名称</div>
        <a-input v-model:value="counter.edit_name"/>
        <div class="edit-title">模型</div>
        <a-cascader v-model:value="counter.edit_mod" :options="counter.edit_mod_options"
                    :placeholder="counter.edit_mod_view"/>
        <div class="edit-title">应用</div>
        <a-cascader v-model:value="counter.edit_app" :options="counter.edit_app_options"
                    :placeholder="counter.edit_app_view"/>
      </a-modal>
    </div>

    <div class="div3" ref="scrollContainer">
      <div v-for="(item, index) in counter.contents" :key="item[0]">
        <div class="div-div-user" v-if="item[4]=='user'">
          <a-radio-group size="small" class="div-utils-user">
            <a-radio-button value="a" @click="click_copy(item[5])">
              <icon :style="{ color: '#8994a6'}" class="icon-user-blue">
                <template #component>
                  <svg t="1719391307585" class="icon" viewBox="0 0 1024 1024" version="1.1"
                       xmlns="http://www.w3.org/2000/svg" p-id="14272" width="16" height="16">
                    <path
                        d="M394.666667 106.666667h448a74.666667 74.666667 0 0 1 74.666666 74.666666v448a74.666667 74.666667 0 0 1-74.666666 74.666667H394.666667a74.666667 74.666667 0 0 1-74.666667-74.666667V181.333333a74.666667 74.666667 0 0 1 74.666667-74.666666z m0 64a10.666667 10.666667 0 0 0-10.666667 10.666666v448a10.666667 10.666667 0 0 0 10.666667 10.666667h448a10.666667 10.666667 0 0 0 10.666666-10.666667V181.333333a10.666667 10.666667 0 0 0-10.666666-10.666666H394.666667z m245.333333 597.333333a32 32 0 0 1 64 0v74.666667a74.666667 74.666667 0 0 1-74.666667 74.666666H181.333333a74.666667 74.666667 0 0 1-74.666666-74.666666V394.666667a74.666667 74.666667 0 0 1 74.666666-74.666667h74.666667a32 32 0 0 1 0 64h-74.666667a10.666667 10.666667 0 0 0-10.666666 10.666667v448a10.666667 10.666667 0 0 0 10.666666 10.666666h448a10.666667 10.666667 0 0 0 10.666667-10.666666v-74.666667z"
                        fill="#8994a6" p-id="14273"></path>
                  </svg>
                </template>
              </icon>
            </a-radio-button>
            <a-radio-button value="b">
              <icon :style="{ color: '#8994a6'}" class="icon-user-green">
                <template #component>
                  <svg t="1719393386501" class="icon" viewBox="0 0 1024 1024" version="1.1"
                       xmlns="http://www.w3.org/2000/svg" p-id="22424" width="16" height="16">
                    <path
                        d="M913.408 384H732.16c-23.04 0-41.984-18.944-41.984-41.984 0-23.04 18.944-41.984 41.984-41.984h72.704c-65.536-92.672-173.568-153.088-295.936-153.088-200.192 0-362.496 162.304-362.496 362.496 0 200.192 162.304 362.496 362.496 362.496 200.192 0 362.496-162.304 362.496-362.496 0-23.04 18.944-41.984 41.984-41.984 23.04 0 41.984 18.944 41.984 41.984 0 246.272-199.68 445.952-445.952 445.952-246.272 0-445.952-199.68-445.952-445.952 0-246.272 199.68-445.952 445.952-445.952 149.504 0 281.6 73.728 362.496 186.368V175.104c0-23.04 18.944-41.984 41.984-41.984 23.04 0 41.984 18.944 41.984 41.984v167.424c-1.024 23.04-19.456 41.472-42.496 41.472z"
                        fill="#8994a6" p-id="22425"></path>
                  </svg>
                </template>
              </icon>
            </a-radio-button>
            <a-radio-button value="c">
              <DeleteOutlined class="icon-user-red" :style="{ color: '#8994a6'}"/>
            </a-radio-button>
          </a-radio-group>
          <a-avatar shape="square" class="ant-head2-user">
            <template #icon>
              <img :src="item[3]" alt="">
            </template>
          </a-avatar>
        </div>
        <div class="div-div-user2" v-if="item[4]=='user'">
          <div class="div-content-user">
            <span v-html="item[1]"></span>
          </div>
        </div>

        <div class="div-div-ai" v-if="item[4]=='ai'">
          <a-avatar shape="square" class="ant-head2-ai">
            <template #icon>
              <img :src="item[3]" alt="">
            </template>
          </a-avatar>
          <a-radio-group size="small" class="div-utils-ai">
            <a-radio-button value="a" @click="click_copy(item[5])">
              <icon :style="{ color: '#8994a6'}" class="icon-ai-blue">
                <template #component>
                  <svg t="1719391307585" class="icon" viewBox="0 0 1024 1024" version="1.1"
                       xmlns="http://www.w3.org/2000/svg" p-id="14272" width="16" height="16">
                    <path
                        d="M394.666667 106.666667h448a74.666667 74.666667 0 0 1 74.666666 74.666666v448a74.666667 74.666667 0 0 1-74.666666 74.666667H394.666667a74.666667 74.666667 0 0 1-74.666667-74.666667V181.333333a74.666667 74.666667 0 0 1 74.666667-74.666666z m0 64a10.666667 10.666667 0 0 0-10.666667 10.666666v448a10.666667 10.666667 0 0 0 10.666667 10.666667h448a10.666667 10.666667 0 0 0 10.666666-10.666667V181.333333a10.666667 10.666667 0 0 0-10.666666-10.666666H394.666667z m245.333333 597.333333a32 32 0 0 1 64 0v74.666667a74.666667 74.666667 0 0 1-74.666667 74.666666H181.333333a74.666667 74.666667 0 0 1-74.666666-74.666666V394.666667a74.666667 74.666667 0 0 1 74.666666-74.666667h74.666667a32 32 0 0 1 0 64h-74.666667a10.666667 10.666667 0 0 0-10.666666 10.666667v448a10.666667 10.666667 0 0 0 10.666666 10.666666h448a10.666667 10.666667 0 0 0 10.666667-10.666666v-74.666667z"
                        fill="#8994a6" p-id="14273"></path>
                  </svg>
                </template>
              </icon>
            </a-radio-button>
            <a-radio-button value="b">
              <icon :style="{ color: '#8994a6'}" class="icon-ai-pink" v-if="!item[6]"
                    @click="click_sound(item[5], index)">
                <template #component>
                  <svg t="1719391283706" class="icon" viewBox="0 0 1024 1024" version="1.1"
                       xmlns="http://www.w3.org/2000/svg" p-id="12977" width="16" height="16">
                    <path
                        d="M128 420.576v200.864h149.12l175.456 140.064V284.288l-169.792 136.288H128z m132.256-64l204.288-163.968a32 32 0 0 1 52.032 24.96v610.432a32 32 0 0 1-51.968 24.992l-209.92-167.552H96a32 32 0 0 1-32-32v-264.864a32 32 0 0 1 32-32h164.256zM670.784 720.128a32 32 0 0 1-44.832-45.664 214.08 214.08 0 0 0 64.32-153.312 213.92 213.92 0 0 0-55.776-144.448 32 32 0 1 1 47.36-43.04 277.92 277.92 0 0 1 72.416 187.488 278.08 278.08 0 0 1-83.488 198.976zM822.912 858.88a32 32 0 1 1-45.888-44.608A419.008 419.008 0 0 0 896 521.152c0-108.704-41.376-210.848-114.432-288.384a32 32 0 0 1 46.592-43.872c84.16 89.28 131.84 207.04 131.84 332.256 0 127.84-49.76 247.904-137.088 337.728z"
                        fill="#8994a6" p-id="12978"></path>
                  </svg>
                </template>
              </icon>
              <icon :style="{ color: '#8994a6'}" class="icon-ai-pink" v-if="item[6]"
                    @click="click_sound_stop(index)">
                <template #component>
                  <svg t="1719393700872" class="icon" viewBox="0 0 1024 1024" version="1.1"
                       xmlns="http://www.w3.org/2000/svg" p-id="25036" width="16" height="16">
                    <path
                        d="M512 938.666667C277.333333 938.666667 85.333333 746.666667 85.333333 512S277.333333 85.333333 512 85.333333s426.666667 192 426.666667 426.666667-192 426.666667-426.666667 426.666667z m0-789.333334c-200.533333 0-362.666667 162.133333-362.666667 362.666667s162.133333 362.666667 362.666667 362.666667 362.666667-162.133333 362.666667-362.666667-162.133333-362.666667-362.666667-362.666667z"
                        fill="#df57cd" p-id="25037"></path>
                    <path
                        d="M571.733333 627.2h-115.2c-29.866667 0-55.466667-25.6-55.466666-55.466667v-115.2c0-29.866667 25.6-55.466667 55.466666-55.466666h115.2c29.866667 0 55.466667 25.6 55.466667 55.466666v115.2c0 29.866667-25.6 55.466667-55.466667 55.466667z m-110.933333-64h98.133333v-98.133333h-98.133333v98.133333z"
                        fill="#df57cd" p-id="25038"></path>
                  </svg>
                </template>
              </icon>
            </a-radio-button>
          </a-radio-group>
        </div>

        <div class="div-div-ai2" v-if="item[4]=='ai'">
          <div class="div-content-ai">
            <a-spin :indicator="indicator" class="chat-show-load-ai"
                    v-show="chat_show_load && index === counter.contents.length - 1"/>
            <span v-html="item[1]"></span>
          </div>
        </div>
      </div>

    </div>

    <div class="div4">
      <a-textarea
          v-model:value="textarea_input"
          placeholder="输入消息内容"
          :autoSize="{ minRows: 2, maxRows: 12}"
          style="width: 40%"
          :allowClear="true"
          class="textarea-input"
          @keydown="push_message"
      />
    </div>
  </div>


</template>

<style scoped lang="less">
@import "src/assets/css/theme.less";

.div4 {
  width: 99.96%;
  height: 80vh;
  background: @theme-background-color2;


  .textarea-input {
    position: absolute; /* 使用绝对定位 */
    bottom: 0; /* 固定在底部 */
    margin-bottom: 3vh;
    left: 50%; /* 将左侧位置设置为父元素的50% */
    transform: translate(-50%, 0); /* 向左移动自身宽度的50%，以达到水平居中 */

  }
}

.div3 {
  width: 99.96%;
  height: 80vh;
  background-color: @theme-background-color;
  overflow: auto;

  .div-div-user {
    display: flex;
    justify-content: flex-end;
    margin-right: 20vw;

    .ant-head2-user {
      background-color: #e8e4e4;
    }

    .div-utils-user {
      margin-top: 0.3%;
      margin-right: 0.5%;

      .icon-user-blue:hover path {
        fill: #3086fd;
      }

      .icon-user-green:hover path {
        fill: #df57cd;
      }

      .icon-user-red:hover {
        color: #fc2c54 !important; /* 鼠标悬停时改变的颜色为红色 */
      }
    }

  }

  .div-div-user2 {
    display: flex;
    justify-content: flex-end;
    margin-right: 20vw;

    .div-content-user {
      margin-top: 1%;
      margin-bottom: 1%;
      max-width: 45vw;
      min-height: 10%; /* 设置最小高度 */
      background: #dfe8fd;
      border-radius: 5px 0 5px 5px;
      word-wrap: break-word; /* 设置文字换行 */
      overflow-wrap: break-word; /* 设置文字换行 */
    }

  }


  .div-div-ai {
    display: flex;
    justify-content: flex-start;
    margin-left: 12vw;

    .ant-head2-ai {
      background-color: #e8e4e4;
    }

    .div-utils-ai {
      margin-top: 0.3%;
      margin-left: 0.5%;

      .icon-ai-blue:hover path {
        fill: #3086fd;
      }

      .icon-ai-pink:hover path {
        fill: #df57cd;
      }
    }

  }

  .div-div-ai2 {
    display: flex;
    justify-content: flex-start;
    margin-left: 12vw;

    .div-content-ai {
      margin-top: 1%;
      margin-bottom: 1%;
      max-width: 45vw; // 指定最大宽度，超过这个宽度内容会自动换行
      min-height: 10%; // 设置最小高度
      background: #f5f6f8;
      border-radius: 0 5px 5px 5px;
      word-wrap: break-word; // 设置文字换行
      overflow-wrap: break-word; // 设置文字换行

      .chat-show-load-ai {
        width: 4vw;
        height: 5vh;
        position: relative;
        top: 0.5vh;
      }

    }
  }


}

.div1 {
  position: relative;
  width: 100%;
  height: 95.5vh;
  overflow: hidden;
  border-left: 1px solid @theme-border-color;
  background: @theme-background-color;
}

.edit-title {
  margin-top: 2vh;
  margin-bottom: 0.5vh;
}

.div2 {
  width: 99.96%;
  height: 5.9vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid @theme-border-color;
  background-color: @theme-background-color;

  .div2-recode-title {
    position: absolute;
    left: 35vw;
    font-size: 0.9rem;
    color: black;
    max-width: 10vw; /* 你可以根据需要调整这个值 */
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis; /* 这将添加省略号，如果文本超出其最大宽度 */
  }

  .ant-head1 {
    background-color: #e8e4e4;
  }

  .div2-title {
    position: relative;
    left: 0.3vw;
  }

  .ant-edit {
    position: relative;
    left: 74.5vw;
    font-size: 18px;
    border: 1px solid #b0b0b3;
    border-radius: 5px;
    padding: 0.6vh;
    transition: color 0.3s ease, border-color 0.3s ease;

    &:hover {
      color: #3085fb;
      border: 1px solid #3085fb;
    }
  }

  .ant-delete {
    position: relative;
    left: 75vw;
    font-size: 18px;
    border: 1px solid #b0b0b3;
    border-radius: 5px;
    padding: 0.6vh;
    transition: color 0.3s ease, border-color 0.3s ease;

    &:hover {
      color: #3085fb;
      border: 1px solid #3085fb;
    }
  }
}


</style>