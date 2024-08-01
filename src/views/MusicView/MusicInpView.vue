<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useCounterStore} from "@/stores/counter";
import {DownloadOutlined, PlusOutlined} from "@ant-design/icons-vue";
import {message} from "ant-design-vue";

const counter = useCounterStore()
const generate_type_select_on1 = () => {
  counter.music_generate_type_select = "1"
}
const generate_type_select_on2 = () => {
  counter.music_generate_type_select = "2"
}
const mod_on1 = () => {
  counter.music_ai_mod_select = "1"
}
const mod_on2 = () => {
  counter.music_ai_mod_select = "2"
}
const type_select_on1 = () => {
  counter.music_type_select = "1"
}
const type_select_on2 = () => {
  counter.music_type_select = "2"
}
const get_data = () => {
  const url = "/api/music/get_data"
  fetch(url).then((res) => {
    if (res.ok) {
      counter.music_data_list = []
      return res.json()
    }
  }).then((data) => {
    if (data["code"] == 1) {
      counter.music_data_list = data["data"]["music_data_list"]
      if (counter.music_data_list.length !== 0) {
        counter.music_data_select = counter.music_data_list[0][0]
      }
      set_ppt_path_data()
      counter.music_show_load_status = false
    }
  })
}
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
const push_func = () => {
  counter.music_url_path1 = ""
  counter.music_url_path2 = ""
  counter.music_show_load_status = true
  const url = "/api/music/generate/openai"
  let body = {
    music_generate_type_select: counter.music_generate_type_select,
    music_inp: counter.music_inp,
    music_ai_mod_select: counter.music_ai_mod_select,
    music_type_select: counter.music_type_select,
    music_name: counter.music_name,
    music_qf: counter.music_qf,
    music_ys: counter.music_ys,
    music_xlfzd: counter.music_xlfzd,
    music_yysc: counter.music_yysc,
    music_dyts: counter.music_dyts,
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
    } else {
      counter.music_show_load_status = false
      message.error("生成出现错误：输入内容不合法或key错误")
    }
  })
}

const on_generate = () => {
  if (counter.music_inp.length === 0) {
    if (counter.music_generate_type_select === "1") {
      message.error("请输入歌曲描述")
    } else {
      message.error("请输入自定义歌词 ")
    }
  } else if (counter.music_generate_type_select === "2") {
    if (counter.music_name.length === 0) {
      message.error("请输入歌曲名称")
    } else if (counter.music_qf.length === 0) {
      message.error("请输入歌曲曲风")
    } else if (counter.music_ys.length === 0) {
      message.error("请输入歌曲音色")
    } else if (counter.music_xlfzd.length === 0) {
      message.error("请输入歌曲旋律复杂度")
    } else if (counter.music_yysc.length === 0) {
      message.error("请输入歌曲音乐时长")
    } else if (counter.music_dyts.length === 0) {
      message.error("请输入歌曲地域特色")
    } else {
      push_func()
    }
  } else {
    push_func()
  }
}
const on_download = () => {
  if (counter.music_url_path1.length !== 0) {
    fetch(counter.music_url_path1)
        .then(response => {
          if (response.ok) {
            return response.blob();
          }
        })
        .then(blob => {
          const downloadUrl = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = downloadUrl;
          a.download = `loongai_music_${Date.now().toString()}.mp4`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(downloadUrl);
          document.body.removeChild(a);
          message.success("音乐视频1下载完毕");
        })
    fetch(counter.music_url_path2)
        .then(response => {
          if (response.ok) {
            return response.blob();
          }
        })
        .then(blob => {
          const downloadUrl = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = downloadUrl;
          a.download = `loongai_music_${Date.now().toString()}.mp4`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(downloadUrl);
          document.body.removeChild(a);
          message.success("音乐视频2下载完毕");
        })
  } else {
    message.warn("音乐生成为空")
  }
};

</script>

<template>
  <div class="div1">
    <div class="div-title">生成模式</div>
    <div class="div-mod-div">
      <div class="div-mod1" style="margin-right: 10px"
           :class="{ 'div-mod-div-select': counter.music_generate_type_select==='1'}"
           @click="generate_type_select_on1">
        <div class="div-mod-title">快速生成</div>
      </div>
      <div class="div-mod1"
           :class="{ 'div-mod-div-select': counter.music_generate_type_select==='2'}"
           @click="generate_type_select_on2">
        <div class="div-mod-title">专业生成</div>
      </div>
    </div>
    <div class="div-title2"
         v-if="counter.music_generate_type_select==='1'"
    >歌曲描述
    </div>
    <a-textarea
        v-model:value="counter.music_inp"
        placeholder="一句话音乐主题输入，扩写内容"
        :auto-size="{ minRows: 4, maxRows: 4 }"
        class="div-inp"
        v-if="counter.music_generate_type_select==='1'"
    />
    <div class="div-title2"
         v-if="counter.music_generate_type_select==='2'"
    >自定义歌词
    </div>
    <a-textarea
        v-model:value="counter.music_inp"
        placeholder="根据个人喜好进行高度自定义的音乐创作"
        :auto-size="{ minRows: 4, maxRows: 4 }"
        class="div-inp"
        v-if="counter.music_generate_type_select==='2'"
    />
    <div class="div-title2">AI模型</div>
    <div class="div-mod-div">
      <div class="div-mod2" style="margin-right: 10px"
           :class="{ 'div-mod-div-select': counter.music_ai_mod_select==='1'}"
           @click="mod_on1">
        <div class="div-mod-title">suno-v3.5</div>
      </div>
      <div class="div-mod2" style="margin-right: 10px"
           :class="{ 'div-mod-div-select': counter.music_ai_mod_select==='2'}"
           @click="mod_on2">
        <div class="div-mod-title">suno-v3</div>
      </div>
    </div>
    <div class="div-title2">歌曲类型</div>
    <div class="div-mod-div">
      <div class="div-mod2" style="margin-right: 10px"
           :class="{ 'div-mod-div-select': counter.music_type_select==='1'}"
           @click="type_select_on1">
        <div class="div-mod-title">歌曲</div>
      </div>
      <div class="div-mod2" style="margin-right: 10px"
           :class="{ 'div-mod-div-select': counter.music_type_select==='2'}"
           @click="type_select_on2">
        <div class="div-mod-title">纯音乐</div>
      </div>
    </div>
    <div class="div-title2" v-if="counter.music_generate_type_select==='2'">音乐名称</div>
    <a-input v-model:value="counter.music_name" placeholder="输入歌曲名称" style="margin-top: 10px"
             v-if="counter.music_generate_type_select==='2'"/>
    <div class="div-title2"
         v-if="counter.music_generate_type_select==='2'"
    >曲风
    </div>
    <a-textarea
        v-model:value="counter.music_qf"
        placeholder="比如：摇滚、爵士、流行、古典等"
        :auto-size="{ minRows: 3, maxRows: 3 }"
        class="div-inp"
        v-if="counter.music_generate_type_select==='2'"
    />
    <div class="div-title2"
         v-if="counter.music_generate_type_select==='2'"
    >音色
    </div>
    <a-textarea
        v-model:value="counter.music_ys"
        placeholder="比如：钢琴、吉他、电子、管弦乐等"
        :auto-size="{ minRows: 3, maxRows: 3 }"
        class="div-inp"
        v-if="counter.music_generate_type_select==='2'"
    />
    <div class="div-title2"
         v-if="counter.music_generate_type_select==='2'"
    >旋律复杂度
    </div>
    <a-textarea
        v-model:value="counter.music_xlfzd"
        placeholder="比如：简单、中等、复杂等"
        :auto-size="{ minRows: 3, maxRows: 3 }"
        class="div-inp"
        v-if="counter.music_generate_type_select==='2'"
    />
    <div class="div-title2"
         v-if="counter.music_generate_type_select==='2'"
    >音乐时长
    </div>
    <a-textarea
        v-model:value="counter.music_yysc"
        placeholder="比如：短小、中等、长篇等"
        :auto-size="{ minRows: 3, maxRows: 3 }"
        class="div-inp"
        v-if="counter.music_generate_type_select==='2'"
    />
    <div class="div-title2"
         v-if="counter.music_generate_type_select==='2'"
    >地域特色
    </div>
    <a-textarea
        v-model:value="counter.music_dyts"
        placeholder="比如：民谣、拉丁、亚洲、欧美等"
        :auto-size="{ minRows: 3, maxRows: 3 }"
        class="div-inp"
        v-if="counter.music_generate_type_select==='2'"
    />
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