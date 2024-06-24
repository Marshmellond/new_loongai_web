<script setup lang="ts">
import {ref, onUpdated, watch} from 'vue';
import {useCounterStore} from '@/stores/counter'
import {marked} from 'marked';
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'; // 或其他样式
import {onMounted} from "vue";
import {LoadingOutlined, DeleteOutlined, FormOutlined} from '@ant-design/icons-vue';
import {h} from 'vue';
import {message} from "ant-design-vue";

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

const counter = useCounterStore()
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
          counter.contents.push([i[0], marked(i[1]), i[2], i[3]])
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
        counter.contents.push([i[0], marked(i[1]), i[2], i[3]])
      }
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
              }
              reader?.read().then(process);
            }

            reader?.read().then(process);
          })
    }
  })
}
const get_rec_data = () => {
  const url = "/api/chat/get_rec_data"
  fetch(url).then((res) => {
    return res.json()
  }).then((data) => {
    counter.recording = []
    if (data["code"] == 1) {
      for (let i of data["data"]) {
        counter.recording.unshift(i)
      }
      if (counter.recording.length > 0) {
        counter.selected_item = counter.recording[0][0];
      }
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
    get_rec_data()
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
</script>
<template>

  <div class="div1">
    <div class="div2">
      <FormOutlined class="ant-edit" @click="show_edit"/>
      <DeleteOutlined class="ant-delete" @click="delete_record"/>
      <div v-if="counter.chat_img_head" style="margin-left: -3.5vw">
        <a-avatar shape="square" class="ant-head1">
          <template #icon>
            <img :src="counter.chat_img_head" alt="">
          </template>
        </a-avatar>
        <span class="div2-title">{{ counter.chat_api }}</span>
      </div>
      <div v-if="counter.chat_mod_img_head" style="margin-left: 30px">
        <a-avatar shape="square" class="ant-head1">
          <template #icon>
            <img :src="counter.chat_mod_img_head" alt="">
          </template>
        </a-avatar>
        <span class="div2-title">{{ counter.chat_mod_name }}</span>
      </div>
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
      <div
          class="div-div"
          v-for="(item, index) in counter.contents" :key="item[0]">
        <a-avatar shape="square" class="ant-head2">
          <template #icon>
            <img :src="item[3]" alt="">
          </template>
        </a-avatar>
        <div class="div-content">
          <a-spin :indicator="indicator" class="chat-show-load"
                  v-if="chat_show_load && index === counter.contents.length - 1"/>
          <span class="div3-title" v-html="item[1]"></span><br>
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
@import "src/assets/css/theme.less";

.edit-title {
  margin-top: 2vh;
  margin-bottom: 0.5vh;
}

.div2 {
  width: 99.96%;
  height: 5.9vh;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid @theme-border-color;
  border-left: 1px solid @theme-border-color;
  background-color: @theme-background-color;

  .div2-title {
    position: relative;
    left: 0.7%;
    line-height: normal;
    margin-left: 0.2vw;
  }

  .ant-edit {
    position: relative;
    left: 74vw;
    font-size: 18px;
    border: 1px solid #b0b0b3;
    border-radius: 5px;
    padding: 0.5vh;
    width: 2vw;


    &:hover {
      color: #3085fb;
      border: 1px solid #3085fb;
    }


  }

  .ant-delete {
    position: relative;
    left: 74.5vw;
    font-size: 18px;
    border: 1px solid #b0b0b3;
    border-radius: 5px;
    padding: 0.5vh;
    width: 2vw;

    &:hover {
      color: #3085fb;
      border: 1px solid #3085fb;
    }
  }
}

.chat-show-load {
  width: 3vw;
  margin-top: 3vh;
}

.ant-head1 {
  position: relative;
  left: 0.5%;
  background-color: #e8e4e4;
}

.ant-head2 {
  position: relative;
  left: 14.5%;
  top: 1vh;
  background-color: #e8e4e4;
}


.div1 {
  width: 100%;
  height: 95.5vh;
  overflow: hidden;
}


.div3 {
  width: 99.96%;
  height: 70vh;
  position: relative;
  border-bottom: 1px solid @theme-border-color;
  border-left: 1px solid @theme-border-color;
  background-color: @theme-background-color;
  overflow: auto;

  .div-div {
    display: flex;
    justify-content: flex-start;

    .div-content {
      position: relative;
      left: 15%;
      max-width: 60vw; // 指定最大宽度，超过这个宽度内容会自动换行
      min-height: 10%; // 设置最小高度
      //border: 1px solid @theme-border-color;
      border-radius: 5px;
      overflow: auto; // 设置溢出为自动
      word-wrap: break-word; // 设置文字换行
      overflow-wrap: break-word; // 设置文字换行

      .div3-title {
        position: relative;
      }
    }
  }
}

.div4 {
  width: 99.96%;
  height: 19.6vh;
  position: relative;
  border-left: 1px solid @theme-border-color;
  background-color: @theme-background-color;

  .div4-title {
    position: relative;
    left: 97%;
  }

  .textarea-input {
    position: relative;
    left: 20%;
    top: 1vh;
  }
}


</style>