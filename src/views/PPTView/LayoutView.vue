<script setup lang="ts">
import PPTInpView from "@/views/PPTView/PPTInpView.vue";

import {RocketOutlined} from "@ant-design/icons-vue";
import {LoadingOutlined} from '@ant-design/icons-vue';

import {h} from 'vue';
import {useCounterStore} from '@/stores/counter'

localStorage.setItem('selectedKey', "6");
const counter = useCounterStore()
const indicator = h(LoadingOutlined, {
  style: {
    fontSize: '24px',
  },
  spin: true,
});
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
      历史记录
    </div>
  </div>
</template>

<style scoped lang="less">
@import "src/assets/css/theme.less";

.div-overflow {
  display: flex;
  width: 100%;
  height: 95.5vh;


  .div-history {
    margin-left: 0.6vw;
    width: 8%;
    height: 95.5vh;
    border: 1px solid;
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