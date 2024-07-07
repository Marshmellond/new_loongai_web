<script setup lang="ts">
import {ref} from 'vue';
import {PlusOutlined, CoffeeOutlined, FormOutlined, MoreOutlined, DeleteOutlined} from '@ant-design/icons-vue';
import {useCounterStore} from '@/stores/counter'
import {onMounted} from "vue";
import {message} from "ant-design-vue";


const counter = useCounterStore()
const open = ref<boolean>(false);
counter.selected_item = localStorage.getItem("chat_selected_item");
const show_edit = (item) => {
  counter.edit_temp_select_red_id = item[0]
  const url = "/api/chat/edit_rec_data"
  let body = {
    chat_rec_id: counter.edit_temp_select_red_id,
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
  const chat_rec_id = counter.edit_temp_select_red_id
  let body = {
    chat_rec_id: chat_rec_id,
    chat_rec_title: counter.edit_name,
    chat_api: counter.edit_mod[0],
    api_select: counter.edit_mod[1],
    chat_mod_id: counter.edit_app[1]
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
      get_rec_data(false)
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


const search_value = ref<string>('');
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
      localStorage.setItem('chat_selected_item', counter.recording[0][0]);
      counter.selected_item = counter.recording[0][0]
    }
    if (counter.recording.length === 0) {
      localStorage.setItem('chat_selected_item', "");
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
        localStorage.setItem('chat_selected_item', counter.recording[0][0]);
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
  }).then((data) => {
    if (data["code"] == 1) {
      counter.chat_api = ""
      counter.chat_img_head = ""
      counter.chat_mod_img_head = ""
      if (counter.selected_item == id) {
        get_rec_data(true)
      } else {
        get_rec_data(false)
      }
      message.success("对话信息删除成功")
    }

  })
  if (counter.recording.length === 0) {
    localStorage.setItem('chat_selected_item', "");
    counter.selected_item = "";
  }

};
// ---------------end---------------


// ---------------选择对话---------------
const selectItem = (id: string) => {
  counter.selected_item = id;
  localStorage.setItem('chat_selected_item', id);
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
    get_rec_data(true)
    message.success("新增对话成功")
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

    <div class="div3">
      <div v-if="counter.recording.length===0" class="no-chat">
        <CoffeeOutlined class="no-ico"/>
        <span class="no-txt">暂无对话</span>
      </div>
      <div
          class="div5"
          v-for="(item) in counter.recording" :key="item[0]"
          v-if="counter.recording.length!==0"
      >
        <div class="ant-div" :class="{ 'selected': item[0] == counter.selected_item }" @click="selectItem(item[0])">
          <span class="ant-title">{{ item[1] }}</span>
          <div class="ant-div2">
            <span class="ant-time">{{ item[2] }}</span>
            <FormOutlined class="ant-edit" @click="show_edit(item)"/>
            <DeleteOutlined class="ant-utils" @click="delete_record(item[0])"/>
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
        </div>
      </div>
    </div>

    <div class="div4">
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

.selected {
  border-left: 2px solid #3086fd;
  background: #f0f0f0;
}

.edit-title {
  margin-top: 2vh;
  margin-bottom: 0.5vh;
}

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
    margin-top: 1vh;
    color: #c1c1c1;
    font-size: 130%;
  }
}


.div1 {
  height: 95.5vh;
  border-left: 1px solid @theme-border-color;
  background-color: @theme-background-color;

  .div2 {
    height: 5.9vh;
    border-bottom: 1px solid @theme-border-color;
    background-color: @theme-background-color;
  }

  .div3 {
    height: 83vh;
    width: 14.5vw;
    background-color: @theme-background-color;
    overflow: auto; /* 添加这一行 */


    .div5 {
      height: 8.5vh;
      width: 13.5vw;
      position: relative;
      top: 1%;
      left: 1%;
      margin-bottom: 2%;
      background: @theme-background-color;
      border-radius: 1px;
      //border: 1px solid #e4e4e4;

      .ant-div {
        display: flex;
        flex-direction: column;
        height: 100%;
        margin-left: 0.2vh;

        &:hover {
          background: #f0f0f0;
        }

        .ant-div2 {
          display: flex;

          .ant-edit {
            position: relative;
            top: 1.5vh;
            left: -1vw;
            font-weight: bold;
            transition: color 0.3s ease;

            &:hover {
              color: #3085fb; // 使用你在 theme.less 文件中定义的颜色变量
            }


          }

          .ant-utils {
            position: relative;
            top: 1.5vh;
            left: -0.5vw;
            font-size: 16px;
            transition: color 0.3s ease;

            &:hover {
              color: #3085fb; // 使用你在 theme.less 文件中定义的颜色变量
            }
          }
        }

        .ant-title {
          position: relative;
          left: 5%;
          top: 1.2vh;
          font-size: 0.9rem;
          color: black;
          max-width: 10vw; /* 你可以根据需要调整这个值 */
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis; /* 这将添加省略号，如果文本超出其最大宽度 */
        }

        .ant-time {
          position: relative;
          left: 5%;
          top: 2.2vh;
          font-size: 0.8rem;
          width: 90%;
          color: black;
        }
      }
    }
  }

  .div4 {
    width: 14.5vw;
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
      background: @theme-background-color;
      border: 1px solid @theme-border-color;
    }

    .ant-search {
      position: relative;
      top: 1vh;
    }
  }
}
</style>