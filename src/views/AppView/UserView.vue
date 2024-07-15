<script setup lang="ts">
import {CommentOutlined, DeleteOutlined, FormOutlined, ThunderboltOutlined} from '@ant-design/icons-vue';

import {useCounterStore} from '@/stores/counter'
import {onMounted} from "vue";
import {useRouter} from 'vue-router';

const counter = useCounterStore()
const router = useRouter();

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
      if (counter.recording.length !== 0) {
        counter.selectedKeys = ['1']
        router.push('/');
        setTimeout(() => {
          localStorage.setItem('chat_selected_item', counter.recording[0][0]);
          counter.selected_item = counter.recording[0][0];
        }, 1000)
      } else {
        localStorage.setItem('chat_selected_item', "");
        counter.selected_item = "";
      }
    }
  })

}
const add_chat = (value) => {
  const url = "/api/app/add_rec_data"
  let body = {
    chat_mod_id: value
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
    get_rec_data()
  })

}

const del_user_mod = (value) => {
  const url = "/api/app/del_user_mod"
  let body = {
    chat_mod_id: value
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
      get_data()
    }
  })

};
const alter_user_mod = (item) => {
  counter.app_alter_mod_data = []
  counter.app_alter_mod_data = item
  counter.app_alter_mod_open = true
}

const get_data = () => {
  const url = "/api/app/get_app_data"
  fetch(url).then((res) => {
    if (res.ok) {
      return res.json()
    }
  }).then((data) => {
    if (data["code"] == 1) {
      counter.app_user_data = []
      for (let i of data["user_data"]) {
        counter.app_user_data.push(i)
      }
    }
  })
}
onMounted(get_data)


</script>

<template>
  <div class="div-layout">
    <div class="div-layout2">
      <div
          class="div2"
          v-for="(item) in counter.app_user_data" :key="item[0]"
      >
        <div class="div-default">
          <a-avatar shape="square" class="app-head2" :draggable="true" :size="50">
            <template #icon>
              <img :src="item[2]" alt="">
            </template>
          </a-avatar>
          <div class="app-title2">{{ item[1] }}</div>
        </div>
        <div style="margin-top: 15px" class="div-default">
          <div class="app-title3">
            <ThunderboltOutlined/>
            {{ item[3] }}
          </div>
        </div>
        <div class="app-title4" @click="add_chat(item[0])">
          <CommentOutlined/>
          添至对话
        </div>
        <div class="app-title5">
          <FormOutlined @click="alter_user_mod(item)" class="app-title5-edit"/>
          <DeleteOutlined @click="del_user_mod(item[0])" class="app-title5-delete"/>
        </div>

        <div class="div-default">
          <div class="app-title6">{{ item[4] }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "src/assets/css/theme.less";

.div-default {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.div-layout {
  display: flex;
  justify-content: center;
  align-items: center;

  .div-layout2 {
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    .div2 {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      background-color: #fdfdfd;
      border: 1px solid #e3e3e3;
      width: 17.5vw;
      height: 21vh;
      border-radius: 5px;
      margin-left: 1vw;
      margin-top: 1vh;
      overflow: hidden;

      .app-head2 {
        position: relative;
        left: 0.6vw;
        top: 1vh;
        background-color: #e8e4e4;
      }

      .app-title2 {
        position: relative;
        left: 1vw;
        top: 1vh;
        font-size: 18px;
        font-weight: bold;
        max-width: 10vw;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .app-title3 {
        background-color: #d6e7f8;
        border-radius: 5px;
        position: relative;
        left: 0.6vw;
        top: 1vh;
        font-size: 15px;
        padding: 0.4vh;
        max-width: 7vw;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .app-title4 {
        background-color: #f2f3f3;
        border-radius: 5px;
        position: relative;
        left: 11vw;
        top: -2.5vh;
        font-size: 15px;
        padding: 0.4vh;
      }

      .app-title4:hover {
        background-color: #d8dce0;
      }

      .app-title5 {
        border-radius: 5px;
        position: relative;
        left: 15vw;
        top: -13vh;
        font-size: 15px;
        padding: 1vh;

        .app-title5-edit {
          position: relative;
          right: 2.5vh;
          transition: color 0.3s ease, border-color 0.3s ease;

          &:hover {
            color: #3086fd;
          }
        }

        .app-title5-delete {
          position: relative;
          right: 1vh;
          transition: color 0.3s ease, border-color 0.3s ease;

          &:hover {
            color: #3086fd;
          }
        }
      }

      .app-title6 {
        position: relative;
        padding: 1vh;
        margin-right: 1vw;
        top: -6.8vh;
        left: 0.3vw;
        font-size: 12px;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        white-space: pre-wrap;
        word-break: break-word;
      }

    }
  }


}
</style>