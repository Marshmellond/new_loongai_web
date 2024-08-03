<script lang="ts" setup>
import TheHeader from "@/components/HeaderView/TheHeader.vue";
import TheLogin from "@/components/LoginView/TheLogin.vue";

import Icon, {
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
            <icon :style="{ color: '#8994a6'}" class="icon-ai-blue">
              <template #component>
                <svg t="1722626620621" class="icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="4376" width="14" height="14">
                  <path
                      d="M930.6672 228.010394L796.091945 93.3328c-16.271837-16.271837-37.865281-25.175295-60.789127-25.175295-23.026184 0-44.619628 8.903458-60.789126 25.175295L110.8327 656.911453c-5.321607 5.321607-8.801119 12.280632-9.824505 19.751349L68.464521 916.646812c-1.43274 10.745553 2.149111 21.491105 9.824506 29.064161 6.54967 6.54967 15.35079 10.131521 24.458924 10.131522 1.535079 0 3.070158-0.102339 4.605237-0.307016l239.98401-32.543674c7.470718-1.023386 14.429742-4.502898 19.751349-9.824505l563.476314-563.476315c16.271837-16.271837 25.175295-37.865281 25.175295-60.789126 0.102339-23.026184-8.801119-44.619628-25.072956-60.891465zM326.460124 855.960024l-183.390766 24.868279 24.868279-183.390766 399.325205-399.325204 158.522487 158.522486L326.460124 855.960024z m555.289226-555.186888L774.703178 407.819308 616.28303 249.296822 723.226864 142.25065c4.298221-4.298221 9.312812-4.912253 11.973616-4.912253s7.675395 0.614032 11.973616 4.912253l134.575254 134.575254c4.298221 4.298221 4.912253 9.312812 4.912253 11.973616 0 2.660804-0.614032 7.675395-4.912253 11.973616z"
                      fill="" p-id="4377"></path>
                </svg>
              </template>
            </icon>
            <span class="nav-text"><RouterLink to="/pen">写作</RouterLink></span>
          </a-menu-item>
          <a-menu-item key="13">
            <icon :style="{ color: '#8994a6'}" class="icon-ai-blue">
              <template #component>
                <svg t="1722629945969" class="icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="5543" width="14" height="14">
                  <path
                      d="M659.4 311.8h225.2c10 0 18-8 18-18V181c0-10-8-18-18-18H659.4c-10 0-18 8-18 18v46.6h-50.2c-48.6 0-88 39.4-88 88V432c0 39.8-32.2 72-72 72h-49c-4-37.2-35.6-66.4-73.8-66.4H195.8c-41 0-74.4 33.4-74.4 74.4s33.4 74.4 74.4 74.4h112.4c38.2 0 69.8-29 73.8-66.4h49c39.8 0 72 32.2 72 72v116.4c0 48.6 39.4 88 88 88h50.2v50.4c0 10 8 18 18 18h225.2c10 0 18-8 18-18v-112.6c0-10-8-18-18-18H659.4c-10 0-18 8-18 18v46.2h-50.2c-39.8 0-72-32.2-72-72V592c0-29.8-14.8-56-37.4-72h159.6v48.4c0 10 8 18 18 18h225.2c10 0 18-8 18-18v-112.6c0-10-8-18-18-18H659.4c-10 0-18 8-18 18V504h-159.6c22.6-16 37.4-42.2 37.4-72v-116.4c0-39.8 32.2-72 72-72h50.2v50.2c0 9.8 8 18 18 18z"
                      fill="#212930" p-id="5544"></path>
                </svg>
              </template>
            </icon>
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
