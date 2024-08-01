<script setup lang="ts">
import PPTInpView from "@/views/PPTView/PPTInpView.vue";

import {CoffeeOutlined, DeleteOutlined, FormOutlined, RocketOutlined} from "@ant-design/icons-vue";
import {LoadingOutlined} from '@ant-design/icons-vue';

import {h, onMounted} from 'vue';
import {useCounterStore} from '@/stores/counter'
import {message} from "ant-design-vue";

const counter = useCounterStore()
localStorage.setItem('selectedKey', "7");
counter.selectedKeys = [localStorage.getItem("selectedKey")]
const indicator = h(LoadingOutlined, {
  style: {
    fontSize: '24px',
  },
  spin: true,
});

const get_data = (status: Boolean = false) => {
  const url = "/api/ppt/get_data"
  fetch(url).then((res) => {
    if (res.ok) {
      counter.ppt_data_list = []
      return res.json()
    }
  }).then((data) => {
    if (data["code"] == 1) {
      counter.ppt_data_list = data["data"]["ppt_dat_list"]
      if (status) {
        if (counter.ppt_data_list.length !== 0) {
          counter.ppt_data_select = counter.ppt_data_list[0][0]
        }
        set_ppt_path_data()
      }
    }
  })
}
onMounted(get_data)
// ------------------------------------ppt链接赋值------------------------------------
const set_ppt_path_data = () => {
  if (counter.ppt_data_list.length !== 0) {
    for (let i of counter.ppt_data_list) {
      if (counter.ppt_data_select === i[0]) {
        counter.ppt_path_url = i[1]
        console.log(counter.ppt_path_url)
      }
    }
  } else {
    counter.ppt_path_url = ""
  }
}

// ------------------------------------选择ppt记录------------------------------------
const selectItem = (id: string) => {
  counter.ppt_data_select = id
  set_ppt_path_data()
};

// ------------------------------------删除ppt记录------------------------------------

const delete_record = (id: string) => {
  const url = "/api/ppt/delete_record"
  let body = {
    ppt_id: id,
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
  <div class="div-overflow">
    <div class="div-inp">
      <PPTInpView></PPTInpView>
    </div>
    <iframe
        :src="'https://view.officeapps.live.com/op/view.aspx?src='+counter.ppt_path_url"
        class="div-show"
        v-if="counter.ppt_path_url.length>0"
    >
    </iframe>
    <div
        class="div-show-load"
        v-if="counter.ppt_path_url.length==0"
    >
      <div class="div-show-load-con1"
           v-if="!counter.ppt_show_load_status"
      >
        <RocketOutlined class="div-show-load-ico"/>
        <span class="div-show-load-title">等你好久啦</span>
        <span class="div-show-load-title">快在左侧生成吧</span>
      </div>

      <div class="div-show-load-con2"
           v-if="counter.ppt_show_load_status"
      >
        <a-spin :indicator="indicator" class=""/>
        <span>正在生成中</span>
      </div>

    </div>

    <div class="div-history">
      <div class="div-title">
        <span class="div-title-content">生成列表</span>
      </div>
      <div v-if="counter.ppt_data_list.length===0" class="no-chat">
        <CoffeeOutlined class="no-ico"/>
        <span class="no-txt">暂无记录</span>
      </div>


      <div class="div-content" v-if="counter.ppt_data_list.length!==0">
        <div v-for="(item) in counter.ppt_data_list" :key="item[0]">
          <div :class="{ 'selected': item[0] == counter.ppt_data_select }"
               @click="selectItem(item[0])"
               class="div3-div">
            <div class="div3-title">{{ item[2] }}</div>
            <div class="div3-time">{{ item[3] }}</div>
            <DeleteOutlined class="div3-delete" @click="delete_record(item[0])"/>
          </div>
        </div>
      </div>


    </div>
  </div>
</template>

<style scoped lang="less">
@import "src/assets/css/theme.less";

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

.div-overflow {
  display: flex;
  width: 100%;
  height: 95.5vh;


  .div-history {
    margin-left: 0.6vw;
    width: 10%;
    height: 95.5vh;
    background: @theme-background-color;
    border-left: 1px solid @theme-border-color;
  }

  .div-inp {
    width: 20%;
    height: 95.5vh;
    border-left: 1px solid @theme-border-color;
    border-right: 1px solid @theme-border-color;
  }

  .div-show {
    margin-top: 2.5vh;
    margin-left: 1vw;
    width: 70%;
    height: 90vh;
    border: none;
    border-radius: 5px;
  }

  .div-show-load {
    margin-top: 2.5vh;
    margin-left: 1vw;
    width: 70%;
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px dashed #b8b8b8;
    border-radius: 5px;
  }

  .div-show-load-con1 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .div-show-load-ico {
      font-size: 24px;
    }
  }

  .div-show-load-con2 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

}

</style>