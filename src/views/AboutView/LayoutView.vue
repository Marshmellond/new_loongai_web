<script setup lang="ts">
import InfoView from "@/views/AboutView/InfoView.vue";
import PasswdView from "@/views/AboutView/PasswdView.vue";

import {useCounterStore} from '@/stores/counter'
import {UserOutlined, NodeIndexOutlined} from "@ant-design/icons-vue";
import {onMounted} from "vue";

const counter = useCounterStore()
const get_about_data = () => {
  const url = "/api/about"
  fetch(url).then((res) => {
    return res.json()
  }).then((data) => {
    if (data["code"] == 1) {
      counter.user_id = data["data"]["user_id"]
      counter.user_name = data["data"]["user_name"]
    }
  })
}
onMounted(get_about_data)
localStorage.setItem('selectedKey', "200");
counter.selectedKeys = [localStorage.getItem("selectedKey")]
</script>

<template>
  <div class="div-page">
    <h3 class="ant-title">欢迎您: {{ counter.user_name }}</h3>
    <a-avatar shape="square" class="ant-head" :size="90">
      <template #icon>
        <img :src="counter.img_head" alt="">
      </template>
    </a-avatar>

    <a-tabs v-model:activeKey="counter.login_page" :centered="false" tabPosition="top" class="ant-tabs">
      <a-tab-pane key="1">
        <template #tab>
        <span>
          <UserOutlined/>个人信息
        </span>
        </template>
        <div class="div-show">
          <info-view></info-view>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2">
        <template #tab>
        <span>
          <NodeIndexOutlined/>修改密码
        </span>
        </template>
        <div class="div-show">
          <PasswdView></PasswdView>
        </div>
      </a-tab-pane>
    </a-tabs>

  </div>
</template>

<style scoped lang="less">
@import "src/assets/css/theme.less";

.div-page {
  position: relative;
  top: 1%;
  left: 1%;
  width: 95%;
  height: 60vh;
  background-color: @theme-background-color;
  border: 1px solid @theme-border-color;
  border-radius: 5px;
  overflow: hidden;

  .ant-title {
    position: relative;
    left: 1.5vw;
  }

  .ant-head {
    position: relative;
    left: 1.5vw;
    margin-bottom: 1vh;
  }

  .ant-tabs {
    position: relative;
    left: 1.5vw;
  }

}
</style>