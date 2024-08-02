<script lang="ts" setup>
import TheHeader from "@/components/HeaderView/TheHeader.vue";
import TheLogin from "@/components/LoginView/TheLogin.vue";

import {
  HomeOutlined,
  UserOutlined,
  ShopOutlined,
  HighlightOutlined,
  CommentOutlined,
  PictureOutlined,
  KeyOutlined,
  FilePptOutlined,
  ShareAltOutlined,
  CustomerServiceOutlined,
  ClusterOutlined,
} from '@ant-design/icons-vue';

import {RouterLink, RouterView} from 'vue-router'
import {onMounted, watch} from "vue";
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()
counter.selectedKeys = [localStorage.getItem("selectedKey")]
const checkLoginStatus = () => {
  const tokenCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('auth='));
  counter.login_status = !!tokenCookie;
  if (counter.login_status) {
    const url = "/api/data"
    fetch(url).then((res) => {
      return res.json()
    }).then((data) => {
      if (data["code"] == 1) {
        counter.user_id = data["data"]["user_id"]
        counter.user_name = data["data"]["user_name"]
        counter.img_head = data["data"]["img_head"]
      } else {
        counter.login_status = false
      }
    })
  }
}
watch(
    () => counter.login_status,
    (new_value, old_value) => {
      if (new_value === true && old_value === false) {
        checkLoginStatus()
      }
    }
)
onMounted(checkLoginStatus)
localStorage.setItem('selectedKey', "6");
</script>
<template>
  <a-layout>
    <a-layout-header class="ant-header">
      <TheHeader></TheHeader>
    </a-layout-header>

    <a-layout v-if="!counter.login_status">
      <TheLogin></TheLogin>
    </a-layout>

    <a-layout class="ant-div" v-if="counter.login_status">

      <a-layout-sider
          class="ant-sidebar"
          width="5.7vw"
      >
        <a-menu v-model:selectedKeys="counter.selectedKeys" theme="light" mode="inline" style="width: 100px;border: 0">
          <a-menu-item key="0">
            <HomeOutlined/>
            <span class="nav-text"><RouterLink to="/">首页</RouterLink></span>
          </a-menu-item>
          <a-menu-item key="1">
            <CommentOutlined/>
            <span class="nav-text"><RouterLink to="/chat">对话</RouterLink></span>
          </a-menu-item>
          <a-menu-item key="12">
            <CommentOutlined/>
            <span class="nav-text"><RouterLink to="/pen">写作</RouterLink></span>
          </a-menu-item>
          <a-menu-item key="13">
            <CommentOutlined/>
            <span class="nav-text"><RouterLink to="/mind">导图</RouterLink></span>
          </a-menu-item>
          <a-menu-item key="2">
            <ShareAltOutlined/>
            <span class="nav-text"><RouterLink to="/workflow">流程</RouterLink></span>
          </a-menu-item>
          <a-menu-item key="11">
            <ClusterOutlined/>
            <span class="nav-text"><RouterLink to="/batch">批量</RouterLink></span>
          </a-menu-item>
          <a-menu-item key="3">
            <ShopOutlined/>
            <span class="nav-text"><RouterLink to="/app">应用</RouterLink></span>
          </a-menu-item>
          <a-menu-item key="4">
            <HighlightOutlined/>
            <span class="nav-text"><RouterLink to="/draw">绘画</RouterLink></span>
          </a-menu-item>
          <a-menu-item key="5">
            <PictureOutlined/>
            <span class="nav-text"><RouterLink to="/gallery">画廊</RouterLink></span>
          </a-menu-item>
          <a-menu-item key="7">
            <FilePptOutlined/>
            <span class="nav-text"><RouterLink to="/ppt">PPT</RouterLink></span>
          </a-menu-item>
          <a-menu-item key="8">
            <CustomerServiceOutlined/>
            <span class="nav-text"><RouterLink to="/music">音乐</RouterLink></span>
          </a-menu-item>
          <a-menu-item key="9">
            <user-outlined/>
            <span class="nav-text"><RouterLink to="/about">我的</RouterLink></span>
          </a-menu-item>
          <a-menu-item key="10">
            <KeyOutlined/>
            <span class="nav-text"><RouterLink to="/key">key</RouterLink></span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>


      <a-layout-content class="ant-content">
        <RouterView/>
      </a-layout-content>

    </a-layout>

  </a-layout>
</template>

<style lang="less" scoped>
@import "src/assets/css/theme.less";

.ant-header {
  display: flex;
  align-items: center;
  border-bottom: 1px solid @theme-border-color;
  background-color: @theme-background-color;
  width: 100vw;
  height: 4.5vh;
  overflow: hidden;
}


.ant-div {
  .ant-sidebar {
    background-color: @theme-background-color;
    height: 95.5vh;
    width: 100vw;
    overflow: hidden;
  }

  .ant-content {
    height: 95.5vh;
    overflow: hidden;
    background-color: @theme-background-color2;
  }
}
</style>
