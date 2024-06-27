<script setup lang="ts">
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()
import {PlusOutlined} from "@ant-design/icons-vue";

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
        localStorage.setItem('chat_selected_item', counter.recording[0][0]);
        counter.selected_item = counter.recording[0][0];
      }
    }
    if (counter.recording.length === 0) {
      localStorage.setItem('chat_selected_item', "");
      counter.selected_item = "";
    }
  })

}
const add_record = () => {
  const url = "/api/chat/add_rec_data"
  fetch(url).then((res) => {
    if (res.ok) {
      return res.json()
    }
  }).then(() => {
    get_rec_data()
  })
}
</script>

<template>
  <div class="div1">
    <div class="div-title">AI对话</div>
    <a-space direction="vertical" class="ant-space">
      <a-button type="primary" size="large" class="ant-button" @click="add_record">
        <template #icon>
          <PlusOutlined style="color: black"/>
        </template>
        <span style="color: black">新建对话</span>
      </a-button>
    </a-space>
  </div>
</template>

<style scoped lang="less">
.div1 {
  width: 100%;
  height: 95.5vh;
  background-color: @theme-background-color;
  border-left: 1px solid @theme-border-color;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.div-title {
  font-size: 32px;
  margin-bottom: 2vh;
}

.ant-space {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .ant-button {
    width: 185%;
    position: relative;
    top: 1vh;
    left: -45%;
    background: @theme-background-color;
    border: 1px solid @theme-border-color;
  }

  .ant-search {
    position: relative;
    top: 1vh;
  }
}
</style>