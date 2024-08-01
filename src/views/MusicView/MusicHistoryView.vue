<script setup lang="ts">
import {useCounterStore} from '@/stores/counter'
import {message} from "ant-design-vue";

const counter = useCounterStore()
import {CoffeeOutlined, DeleteOutlined, LoadingOutlined} from "@ant-design/icons-vue";
import {onMounted} from "vue";


const get_data = (status: Boolean = false) => {
  const url = "/api/music/get_data"
  fetch(url).then((res) => {
    if (res.ok) {
      counter.music_data_list = []
      return res.json()
    }
  }).then((data) => {
    if (data["code"] == 1) {
      counter.music_data_list = data["data"]["music_data_list"]
      console.log(111, counter.music_data_list)
      if (status) {
        if (counter.music_data_list.length !== 0) {
          counter.music_data_select = counter.music_data_list[0][0]
        }
        set_ppt_path_data()
      }
    }
  })
}
onMounted(get_data)
// ------------------------------------音乐链接赋值------------------------------------
const set_ppt_path_data = () => {
  if (counter.music_data_list.length !== 0) {
    for (let i of counter.music_data_list) {
      if (counter.music_data_select === i[0]) {
        counter.music_url_path1 = i[1].split("|")[0]
        counter.music_url_path2 = i[1].split("|")[1]
      }
    }
  } else {
    counter.music_url_path1 = ""
    counter.music_url_path2 = ""
  }
}

// ------------------------------------选择音乐记录------------------------------------
const selectItem = (id: string) => {
  counter.music_data_select = id
  set_ppt_path_data()
};

// ------------------------------------删除音乐记录------------------------------------

const delete_record = (id: string) => {
  const url = "/api/music/delete_record"
  let body = {
    music_id: id,
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
      get_data(true)
      message.success("记录删除成功")
    }
  })
};
</script>

<template>
  <div class="div-title">
    <span class="div-title-content">生成列表</span>
  </div>
  <div v-if="counter.music_data_list.length===0" class="no-chat">
    <CoffeeOutlined class="no-ico"/>
    <span class="no-txt">暂无记录</span>
  </div>

  <div class="div-content" v-if="counter.music_data_list.length!==0">
    <div v-for="(item) in counter.music_data_list" :key="item[0]">
      <div :class="{ 'selected': item[0] == counter.music_data_select }"
           @click="selectItem(item[0])"
           class="div3-div">
        <div class="div3-title">{{ item[2] }}</div>
        <div class="div3-time">{{ item[3] }}</div>
        <DeleteOutlined class="div3-delete" @click="delete_record(item[0])"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.div-title {
  border-bottom: 1px solid @theme-border-color;
  height: 5vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .div-title-content {
    font-size: 20px;
  }
}

.div-content {
  height: 90.5vh;
  overflow: auto;

  .div3-div {
    height: 5vh;
    margin: 0.5vh 0.2vw;

    &:hover {
      background: #f0f0f0;
    }

    .div3-title {
      position: relative;
      top: 0.5vh;
      left: 0.2vw;
      max-width: 5.5vw; /* 你可以根据需要调整这个值 */
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis; /* 这将添加省略号，如果文本超出其最大宽度 */
    }

    .div3-time {
      position: relative;
      left: 0.2vw;
      font-size: 11px;
      margin-top: 1vh;
    }

    .div3-delete {
      position: relative;
      top: -3vh;
      left: 6.7vw;
      transition: color 0.3s ease;

      &:hover {
        color: #3085fb;
      }
    }
  }
}

.selected {
  border-left: 2px solid #3086fd;
  background: #f0f0f0;
}

.no-chat {
  position: relative;
  top: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .no-ico {
    color: #c1c1c1;
    font-size: 150%;
  }

  .no-txt {
    margin-top: 0.8vh;
    color: #c1c1c1;
    font-size: 120%;
  }
}
</style>