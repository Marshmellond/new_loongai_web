<script setup lang="ts">
import Dell3View from "@/views/DrawView/DrawInpView/Dell3View.vue";
import Dell2View from "@/views/DrawView/DrawInpView/Dell2View.vue";
import XunfeiView from "@/views/DrawView/DrawInpView/XunfeiView.vue";
import {v4 as uuidv4} from "uuid";

import {message} from "ant-design-vue";
import {PlusOutlined, DownloadOutlined} from "@ant-design/icons-vue";
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()

const set_local_select = () => {
  let temp_local_select = localStorage.getItem("draw_mod_select")
  if (temp_local_select == null) {
    counter.draw_mod_select = "1"
  } else if (temp_local_select.length === 0) {
    counter.draw_mod_select = "1"
  } else {
    counter.draw_mod_select = localStorage.getItem("draw_mod_select")
  }
}
set_local_select()
const on1 = () => {
  counter.draw_mod_select = "1"
}
const on2 = () => {
  counter.draw_mod_select = "2"
}
const on3 = () => {
  counter.draw_mod_select = "3"
}
const on4 = () => {
  counter.draw_mod_select = "4"
}

const on_generate = () => {
  if (counter.draw_inp.length > 0) {
    if (counter.draw_mod_select === "1") {
      counter.draw_img_load1 = true
      const url = "/api/draw/generate/xunfei"
      let body = {
        draw_inp: counter.draw_inp,
        draw_dell3_select_size: counter.draw_dell3_select_size,
        draw_num_select: counter.draw_num_select
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
          let temp_draw_img_url = []
          counter.draw_img_load1 = false
          if (counter.draw_num_select === "1") {
            counter.draw_img1 = data["draw_img1"]
            temp_draw_img_url.push(data["draw_img1"])
          } else if (counter.draw_num_select === "2") {
            counter.draw_img1 = data["draw_img1"]
            counter.draw_img2 = data["draw_img2"]
            temp_draw_img_url.push(data["draw_img1"])
            temp_draw_img_url.push(data["draw_img2"])
          } else if (counter.draw_num_select === "3") {
            counter.draw_img1 = data["draw_img1"]
            counter.draw_img2 = data["draw_img2"]
            counter.draw_img3 = data["draw_img3"]
            temp_draw_img_url.push(data["draw_img1"])
            temp_draw_img_url.push(data["draw_img2"])
            temp_draw_img_url.push(data["draw_img3"])
          } else if (counter.draw_num_select === "4") {
            counter.draw_img1 = data["draw_img1"]
            counter.draw_img2 = data["draw_img2"]
            counter.draw_img3 = data["draw_img3"]
            counter.draw_img4 = data["draw_img4"]
            temp_draw_img_url.push(data["draw_img1"])
            temp_draw_img_url.push(data["draw_img2"])
            temp_draw_img_url.push(data["draw_img3"])
            temp_draw_img_url.push(data["draw_img4"])
          }
        } else {
          counter.draw_img_load1 = false
          message.error("生成出现错误：输入内容不合法或key错误")
        }
      }).catch(() => {
            counter.draw_img_load1 = false
            message.error("生成出现错误：输入内容不合法或key错误")
          }
      )
    } else if (counter.draw_mod_select === "2") {
      console.log()
    } else if (counter.draw_mod_select === "3") {
      counter.draw_img_load1 = true
      const url = "/api/draw/generate/dell3"
      let body = {
        draw_inp: counter.draw_inp,
        draw_dell3_select_size: counter.draw_dell3_select_size,
        draw_dell3_select_picture: counter.draw_dell3_select_picture,
        draw_num_select: counter.draw_num_select
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
          let temp_draw_img_url = []
          counter.draw_img_load1 = false
          if (counter.draw_num_select === "1") {
            counter.draw_img1 = data["draw_img1"]
            temp_draw_img_url.push(data["draw_img1"])
          } else if (counter.draw_num_select === "2") {
            counter.draw_img1 = data["draw_img1"]
            counter.draw_img2 = data["draw_img2"]
            temp_draw_img_url.push(data["draw_img1"])
            temp_draw_img_url.push(data["draw_img2"])
          } else if (counter.draw_num_select === "3") {
            counter.draw_img1 = data["draw_img1"]
            counter.draw_img2 = data["draw_img2"]
            counter.draw_img3 = data["draw_img3"]
            temp_draw_img_url.push(data["draw_img1"])
            temp_draw_img_url.push(data["draw_img2"])
            temp_draw_img_url.push(data["draw_img3"])
          } else if (counter.draw_num_select === "4") {
            counter.draw_img1 = data["draw_img1"]
            counter.draw_img2 = data["draw_img2"]
            counter.draw_img3 = data["draw_img3"]
            counter.draw_img4 = data["draw_img4"]
            temp_draw_img_url.push(data["draw_img1"])
            temp_draw_img_url.push(data["draw_img2"])
            temp_draw_img_url.push(data["draw_img3"])
            temp_draw_img_url.push(data["draw_img4"])
          }
        } else {
          counter.draw_img_load1 = false
          message.error("生成出现错误：输入内容不合法或key错误")
        }
      }).catch(() => {
            counter.draw_img_load1 = false
            message.error("生成出现错误：输入内容不合法或key错误")
          }
      )
    } else if (counter.draw_mod_select === "4") {
      counter.draw_img_load1 = true
      const url = "/api/draw/generate/dell2"
      let body = {
        draw_inp: counter.draw_inp,
        draw_dell3_select_picture: counter.draw_dell3_select_picture,
        draw_num_select: counter.draw_num_select
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
          let temp_draw_img_url = []
          counter.draw_img_load1 = false
          if (counter.draw_num_select === "1") {
            counter.draw_img1 = data["draw_img1"]
            temp_draw_img_url.push(data["draw_img1"])
          } else if (counter.draw_num_select === "2") {
            counter.draw_img1 = data["draw_img1"]
            counter.draw_img2 = data["draw_img2"]
            temp_draw_img_url.push(data["draw_img1"])
            temp_draw_img_url.push(data["draw_img2"])
          } else if (counter.draw_num_select === "3") {
            counter.draw_img1 = data["draw_img1"]
            counter.draw_img2 = data["draw_img2"]
            counter.draw_img3 = data["draw_img3"]
            temp_draw_img_url.push(data["draw_img1"])
            temp_draw_img_url.push(data["draw_img2"])
            temp_draw_img_url.push(data["draw_img3"])
          } else if (counter.draw_num_select === "4") {
            counter.draw_img1 = data["draw_img1"]
            counter.draw_img2 = data["draw_img2"]
            counter.draw_img3 = data["draw_img3"]
            counter.draw_img4 = data["draw_img4"]
            temp_draw_img_url.push(data["draw_img1"])
            temp_draw_img_url.push(data["draw_img2"])
            temp_draw_img_url.push(data["draw_img3"])
            temp_draw_img_url.push(data["draw_img4"])
          }
        } else {
          counter.draw_img_load1 = false
          message.error("生成出现错误：输入内容不合法或key错误")
        }
      }).catch(() => {
            counter.draw_img_load1 = false
            message.error("生成出现错误：输入内容不合法或key错误")
          }
      )
    }
  } else {
    message.error("请输入图像描述")
  }
}

function downloadIamge(src) {

  let image = new Image();

  image.src = src;

  image.setAttribute("crossOrigin", "anonymous");

  image.onload = function () {

    let c = document.createElement("canvas");

    c.width = image.width;

    c.height = image.height;

    c.getContext("2d").drawImage(image, 0, 0, image.width, image.height);

    let a = document.createElement("a");

    let uuid = uuidv4();
    a.download = `${uuid}.png`;

    a.href = c.toDataURL("image/png");

    a.click();

  }

}

const on_download = () => {
  if (counter.draw_img1 === "" && counter.draw_img2 === "" && counter.draw_img3 === "" && counter.draw_img4 === "") {
    message.warn("当前无生成图片可下载")
  } else {
    if (counter.draw_img1 !== "") {
      downloadIamge(counter.draw_img1)
    }
    if (counter.draw_img2 !== "") {
      downloadIamge(counter.draw_img2)
    }
    if (counter.draw_img3 !== "") {
      downloadIamge(counter.draw_img3)
    }
    if (counter.draw_img4 !== "") {
      downloadIamge(counter.draw_img4)
    }
  }
}
</script>

<template>
  <div class="div-a">
    <div class="div-x">
      <div class="div-title">图像描述</div>
      <a-textarea
          v-model:value="counter.draw_inp"
          placeholder="输入你的描述词"
          :auto-size="{ minRows: 4, maxRows: 4 }"
          class="div-inp"
      />
      <div class="div-title2">AI模型</div>
      <div class="div-mod-div">
        <div class="div-mod" :class="{ 'div-mod-div-select': counter.draw_mod_select==='1'}" @click="on1">
          <div class="div-mod-title">讯飞星火</div>
        </div>
        <div class="div-mod" :class="{ 'div-mod-div-select': counter.draw_mod_select==='3'}" style="margin-left: 10px"
             @click="on3">
          <div class="div-mod-title">Dell3</div>
        </div>
      </div>
      <div class="div-mod-div">
        <div class="div-mod" :class="{ 'div-mod-div-select': counter.draw_mod_select==='4'}" @click="on4">
          <div class="div-mod-title">Dell2</div>
        </div>
      </div>
      <div class="div3">
        <XunfeiView v-if="counter.draw_mod_select==='1'"></XunfeiView>
        <Dell3View v-if="counter.draw_mod_select==='3'"></Dell3View>
        <Dell2View v-if="counter.draw_mod_select==='4'"></Dell2View>
      </div>
    </div>
    <div class="div-y">
      <a-space direction="vertical" class="ant-space">
        <a-button type="primary" size="large" class="ant-button1" @click="on_generate">
          <template #icon>
            <PlusOutlined style="color: black"/>
          </template>
          <span style="color: black">生成</span>
        </a-button>
        <a-button type="primary" size="large" class="ant-button2" @click="on_download">
          <template #icon>
            <DownloadOutlined style="color: black"/>
          </template>
          <span style="color: black">下载</span>
        </a-button>
      </a-space>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "src/assets/css/theme.less";

.div-mod-div-select {
  border: 1px solid #4e90ec !important;;
  background: #ffffff;
}

.div-mod-div {
  display: flex;
  margin-top: 1vh;

  .div-mod {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 8vw;
    height: 7vh;
    border: 1px solid @theme-border-color;
    border-radius: 3px;

    &:hover {
      background: #ffffff;
    }

  }


}

.div-a {
  height: 95.5vh;
  width: 23vw;
  border-left: 1px solid @theme-border-color;
  background-color: white;
}

.div-x {
  height: 88.5vh;
  padding: 1vh;
  overflow: auto;

  .div-title {
    margin-left: 0.2vw;
  }

  .div-inp {
    margin-top: 1vh;
  }

  .div-title2 {
    margin-left: 0.2vw;
    margin-top: 1vh;

  }

  .div3 {
    width: 100%;
    height: 50vh;
    margin-top: 2vh;
  }

}

.div-y {
  height: 7vh;
  border-top: 1px solid @theme-border-color;
  overflow: auto;
  padding: 1vh;

  .ant-space {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .ant-button1 {
      width: 170%;
      position: relative;
      background: #fdfdfd;
      border: 1px solid #e4e4e4;

      &:hover {
        background: #f0f0f0;
      }
    }

    .ant-button2 {
      width: 170%;
      position: relative;
      left: 3.4vw;
      background: #fdfdfd;
      border: 1px solid #e4e4e4;

      &:hover {
        background: #f0f0f0;
      }
    }
  }
}

</style>