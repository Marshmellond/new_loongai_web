<script setup lang="ts">
import {ref} from 'vue';
import {PlusOutlined, DeleteOutlined, CoffeeOutlined} from '@ant-design/icons-vue';
import {useCounterStore} from '@/stores/counter'
import {onMounted} from "vue";

const counter = useCounterStore()

const search_value = ref<string>('');
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
onMounted(get_rec_data)


// ---------------搜索历史---------------
const search_record = () => {
  const url = "/api/chat/search_rec_data"
  let body = {
    search_value: search_value.value
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
    counter.recording = []
    if (data["code"] == 1) {
      for (let i of data["data"]) {
        counter.recording.unshift(i)
      }
      if (counter.recording.length > 0) {
        counter.selected_item = counter.recording[0][0];
      }
    }
  })
};
// ---------------end---------------

// ---------------删除对话---------------
const delete_record = (id: string) => {
  const url = "/api/chat/del_rec_data"
  let body = {
    chat_rec_id: id
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
// ---------------end---------------

// ---------------选择对话---------------
const selectItem = (id: string) => {
  counter.selected_item = id;
};
// ---------------end---------------

// ---------------新建对话---------------
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
// ---------------end---------------
</script>

<template>
  <div class="div1">
    <div class="div2">
      <a-space direction="vertical" class="ant-space">
        <a-input-search
            v-model:value="search_value"
            placeholder="搜索历史"
            enter-button
            @search="search_record"
            class="ant-search"
            :allowClear="true"
        />
      </a-space>
    </div>

    <div
        class="div3"
    >
      <div v-if="counter.recording.length===0" class="no-chat">
        <CoffeeOutlined class="no-ico"/>
        <span class="no-txt">暂无对话</span>
      </div>
      <div
          class="div5"
          v-for="(item) in counter.recording" :key="item[0]"
          v-if="counter.recording.length!==0"
      >
        <div class="ant-div" :class="{ 'selected': item[0] === counter.selected_item }" @click="selectItem(item[0])">
          <span class="ant-title">{{ item[1] }}</span>
          <span class="ant-time">{{ item[2] }}</span>
          <DeleteOutlined class="ant-delete" @click="delete_record(item[0])"/>
        </div>
      </div>
    </div>

    <div
        class="div4"
    >
      <a-space direction="vertical" class="ant-space">
        <a-button type="primary" size="large" class="ant-button" @click="add_record">
          <template #icon>
            <PlusOutlined style="color: black"/>
          </template>
          <span style="color: black">新建对话</span>
        </a-button>
      </a-space>
    </div>

  </div>


</template>

<style lang="less" scoped>
@import "src/assets/css/theme.less";

.no-chat {
  position: relative;
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .no-ico {
    color: #c1c1c1;
    font-size: 200%;
  }

  .no-txt {
    margin-top: 10px;
    color: #c1c1c1;
    font-size: 130%;
  }
}


.selected {
  border-left: 2px solid #3086fd;
  background: #f0f0f0;

  .ant-delete {
    visibility: visible !important;
  }
}


.div1 {
  height: 95.5vh;
  border-left: 1px solid @theme-border-color;
  background-color: @theme-background-color;

  .div2 {
    height: 5.5vh;
    border-bottom: 1px solid @theme-border-color;
    background-color: @theme-background-color;
  }

  .div3 {
    height: 82vh;
    width: 250px;
    border-left: 1px solid @theme-border-color;
    background-color: @theme-background-color;
    overflow: auto; /* 添加这一行 */


    .div5 {
      height: 70px;
      width: 232px;
      position: relative;
      top: 1%;
      left: 1%;
      margin-bottom: 2%;
      background: #fdfdfd;
      border-radius: 1px;
      //border: 1px solid #e4e4e4;

      .ant-div {
        display: flex;
        flex-direction: column;
        height: 100%;

        &:hover {
          background: #f0f0f0;
        }

        .ant-title {
          position: relative;
          left: 5%;
          top: 10px;
          font-size: 0.9rem;
          color: black;
          max-width: 210px; /* 你可以根据需要调整这个值 */
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis; /* 这将添加省略号，如果文本超出其最大宽度 */
        }

        .ant-time {
          position: relative;
          left: 5%;
          top: 20px;
          font-size: 0.8rem;
          width: 90%;
          color: black;
        }

        .ant-delete {
          position: relative;
          width: 8%;
          left: 85%;
          top: 3px;
          font-size: 1.2rem;
          visibility: hidden;

          &:hover {
            color: red; // 使用你在 theme.less 文件中定义的颜色变量
          }
        }

        &:hover {
          .ant-delete {
            visibility: visible;
          }
        }
      }
    }
  }

  .div4 {
    width: 250px;
    border-top: 1px solid @theme-border-color;
    background-color: @theme-background-color;
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
      background: #fdfdfd;
      border: 1px solid #e4e4e4;
    }

    .ant-search {
      position: relative;
      top: 1vh;
    }
  }
}
</style>