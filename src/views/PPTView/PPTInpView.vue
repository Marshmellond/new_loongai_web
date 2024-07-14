<script setup lang="ts">
import {DownloadOutlined, PlusOutlined} from "@ant-design/icons-vue";

import {message} from "ant-design-vue";
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()
const inp_type_on1 = () => {
  counter.ppt_inp_type_select = "1"
}
const inp_type_on2 = () => {
  counter.ppt_inp_type_select = "2"
}
const mod_on1 = () => {
  counter.ppt_mod_select = "1"
}
const theme_on1 = () => {
  counter.ppt_theme_select = "1"
}
const theme_on2 = () => {
  counter.ppt_theme_select = "2"
}
const theme_on3 = () => {
  counter.ppt_theme_select = "3"
}
const theme_on4 = () => {
  counter.ppt_theme_select = "4"
}
const theme_on5 = () => {
  counter.ppt_theme_select = "5"
}
const theme_on6 = () => {
  counter.ppt_theme_select = "6"
}
const theme_on7 = () => {
  counter.ppt_theme_select = "7"
}
const theme_on8 = () => {
  counter.ppt_theme_select = "8"
}
const notes_on1 = () => {
  counter.ppt_notes_select = !counter.ppt_notes_select
}
const get_data = () => {
  const url = "/api/ppt/get_data"
  fetch(url).then((res) => {
    if (res.ok) {
      counter.ppt_data_list = []
      return res.json()
    }
  }).then((data) => {
    if (data["code"] == 1) {
      counter.ppt_data_list = data["data"]["ppt_dat_list"]
      if (counter.ppt_data_list.length !== 0) {
        counter.ppt_data_select = counter.ppt_data_list[0][0]
      }
    }
  })
}
const on_generate = () => {
  counter.ppt_path_url = ""
  if (counter.ppt_inp.length > 0) {
    if (counter.ppt_author_inp.length > 0) {
      if (counter.ppt_mod_select === "1") {
        counter.ppt_show_load_status = true
        const url = "/api/ppt/generate/xunfei"
        let body = {
          ppt_inp_type_select: counter.ppt_inp_type_select,
          ppt_inp: counter.ppt_inp,
          ppt_theme_select: counter.ppt_theme_select,
          ppt_author_inp: counter.ppt_author_inp,
          ppt_notes_select: counter.ppt_notes_select,
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
            counter.ppt_show_load_status = false
            counter.ppt_path_url = data["data"]["ppt_path_url"]
            get_data()
          } else {
            counter.ppt_show_load_status = false
            message.error("生成出现错误：输入内容不合法或key错误")
          }
        })
      }
    } else {
      message.error("请输入作者名")
    }
  } else {
    if (counter.ppt_inp_type_select === '1') {
      message.error("请输入主题描述")
    } else {
      message.error("请输入文本内容")
    }
  }
}
const on_download = () => {
  if (counter.ppt_path_url.length !== 0) {

    fetch(counter.ppt_path_url)
        .then(response => {
          if (response.ok) {
            return response.blob();
          }
        })
        .then(blob => {
          const downloadUrl = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = downloadUrl;
          a.download = `loongai_ppt_${Date.now().toString()}.pptx`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(downloadUrl);
          document.body.removeChild(a);
          message.success("PPT文件下载完毕");
        })
  } else {
    message.warn("PPT选择为空")
  }
};

</script>

<template>
  <div class="div1">
    <div class="div-title">生成类型</div>
    <div class="div-mod-div">
      <div class="div-mod1" style="margin-right: 10px"
           :class="{ 'div-mod-div-select': counter.ppt_inp_type_select==='1'}"
           @click="inp_type_on1">
        <div class="div-mod-title">话题生成</div>
      </div>
      <div class="div-mod1"
           :class="{ 'div-mod-div-select': counter.ppt_inp_type_select==='2'}"
           @click="inp_type_on2">
        <div class="div-mod-title">文本生成</div>
      </div>
    </div>
    <div class="div-title2"
         v-if="counter.ppt_inp_type_select==='1'"
    >主题描述
    </div>
    <a-textarea
        v-model:value="counter.ppt_inp"
        placeholder="一句话主题输入，扩写内容"
        :auto-size="{ minRows: 4, maxRows: 4 }"
        class="div-inp"
        v-if="counter.ppt_inp_type_select==='1'"
    />
    <div class="div-title2"
         v-if="counter.ppt_inp_type_select==='2'"
    >文本内容
    </div>
    <a-textarea
        v-model:value="counter.ppt_inp"
        placeholder="千字长文本输入，智能总结生成"
        :auto-size="{ minRows: 4, maxRows: 4 }"
        class="div-inp"
        v-if="counter.ppt_inp_type_select==='2'"
    />
    <div class="div-title2">AI模型</div>
    <div class="div-mod-div">
      <div class="div-mod2" style="margin-right: 10px" :class="{ 'div-mod-div-select': counter.ppt_mod_select==='1'}"
           @click="mod_on1">
        <div class="div-mod-title">讯飞星火</div>
      </div>
    </div>
    <div class="div-title2">主题</div>
    <div class="div-mod-div">
      <div class="div-mod1" style="margin-right: 10px"
           :class="{ 'div-mod-div-select': counter.ppt_theme_select==='1'}"
           @click="theme_on1">
        <div class="div-mod-title">随机主题</div>
      </div>
      <div class="div-mod1" style="margin-right: 10px"
           :class="{ 'div-mod-div-select': counter.ppt_theme_select==='2'}"
           @click="theme_on2">
        <div class="div-mod-title">紫色星空</div>
      </div>
      <div class="div-mod1"
           :class="{ 'div-mod-div-select': counter.ppt_theme_select==='3'}"
           @click="theme_on3">
        <div class="div-mod-title">碧波绿影</div>
      </div>
    </div>
    <div class="div-mod-div">
      <div class="div-mod1" style="margin-right: 10px"
           :class="{ 'div-mod-div-select': counter.ppt_theme_select==='4'}"
           @click="theme_on4">
        <div class="div-mod-title">清逸天蓝</div>
      </div>
      <div class="div-mod1" style="margin-right: 10px"
           :class="{ 'div-mod-div-select': counter.ppt_theme_select==='5'}"
           @click="theme_on5">
        <div class="div-mod-title">质感之境</div>
      </div>
      <div class="div-mod1"
           :class="{ 'div-mod-div-select': counter.ppt_theme_select==='6'}"
           @click="theme_on6">
        <div class="div-mod-title">星光夜影</div>
      </div>
    </div>
    <div class="div-mod-div">
      <div class="div-mod1" style="margin-right: 10px"
           :class="{ 'div-mod-div-select': counter.ppt_theme_select==='7'}"
           @click="theme_on7">
        <div class="div-mod-title">炽热暖阳</div>
      </div>
      <div class="div-mod1" style="margin-right: 10px"
           :class="{ 'div-mod-div-select': counter.ppt_theme_select==='8'}"
           @click="theme_on8">
        <div class="div-mod-title">幻翠奇旅</div>
      </div>
      <div style="width: 50%;height: 40px"></div>
    </div>
    <div class="div-title2">作者</div>
    <a-input v-model:value="counter.ppt_author_inp" placeholder="输入作者名" style="margin-top: 10px"/>
    <a-radio v-model:checked="counter.ppt_notes_select" style="margin-top: 10px" @click="notes_on1">演讲备注</a-radio>
  </div>


  <div class="div2">
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
</template>

<style scoped lang="less">
@import "src/assets/css/theme.less";

.div1 {
  overflow: auto;
  padding: 1vh;
  width: 100%;
  height: 88.5vh;
  background: white;

  .div-title {
    margin-left: 0.2vw;
  }

  .div-title2 {
    margin-left: 0.2vw;
    margin-top: 2vh;
  }

  .div-inp {
    margin-top: 1vh;
  }

  .div-mod-div-select {
    border: 1px solid #4e90ec !important;;
    background: white;
  }

  .div-mod-div {
    display: flex;
    margin-top: 1vh;

    .div-mod1 {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50%;
      height: 4vh;
      border: 1px solid @theme-border-color;
      border-radius: 3px;

      &:hover {
        background: #fdfdfd;
      }
    }

    .div-mod2 {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50%;
      height: 6vh;
      border: 1px solid @theme-border-color;
      border-radius: 3px;

      &:hover {
        background: #fdfdfd;
      }
    }
  }
}

.div2 {
  height: 7vh;
  border-top: 1px solid @theme-border-color;
  background: white;
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