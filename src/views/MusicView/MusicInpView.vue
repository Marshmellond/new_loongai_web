<script setup lang="ts">
import {ref} from 'vue';
import {useCounterStore} from "@/stores/counter";
import {DownloadOutlined, PlusOutlined} from "@ant-design/icons-vue";

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
        <div class="div-mod-title">suno-v3</div>
      </div>
      <div class="div-mod2" style="margin-right: 10px"
           :class="{ 'div-mod-div-select': counter.music_ai_mod_select==='2'}"
           @click="mod_on2">
        <div class="div-mod-title">suno-v3.5</div>
      </div>
    </div>
    <div class="div-title2">生成类型</div>
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
    <div class="div-title2" v-if="counter.music_generate_type_select==='2'">歌曲名称</div>
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
    <div class="div-title2"
         v-if="counter.music_generate_type_select==='2'"
    >时代风格
    </div>
    <a-textarea
        v-model:value="counter.music_sdfg"
        placeholder="比如：古典、现代、复古等"
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