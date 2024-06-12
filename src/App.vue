<script lang="ts" setup>
import {
  UserOutlined,
  ShopOutlined,
  HighlightOutlined,
  CommentOutlined,
  PictureOutlined,
  KeyOutlined,
} from '@ant-design/icons-vue';

import {RouterLink, RouterView} from 'vue-router'
import TheHeader from "@/components/HeaderView/TheHeader.vue";
import TheLogin from "@/components/LoginView/TheLogin.vue";
import {useCounterStore} from '@/stores/counter'
import {onMounted, watch} from "vue";

const counter = useCounterStore()
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
          width="100px"
      >
        <a-menu v-model:selectedKeys="counter.selectedKeys" theme="light" mode="inline" style="width: 100px;border: 0">
          <a-menu-item key="1">
            <CommentOutlined/>
            <span class="nav-text"><RouterLink to="/">对话</RouterLink></span>
          </a-menu-item>
          <a-menu-item key="2">
            <ShopOutlined/>
            <span class="nav-text"><RouterLink to="/app">应用</RouterLink></span>
          </a-menu-item>
          <a-menu-item key="3">
            <HighlightOutlined/>
            <span class="nav-text"><RouterLink to="/draw">绘画</RouterLink></span>
          </a-menu-item>
          <a-menu-item key="4">
            <PictureOutlined/>
            <span class="nav-text"><RouterLink to="/gallery">画廊</RouterLink></span>
          </a-menu-item>
          <a-menu-item key="5">
            <user-outlined/>
            <span class="nav-text"><RouterLink to="/about">我的</RouterLink></span>
          </a-menu-item>
          <a-menu-item key="6">
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

#components-layout-demo-fixed-sider .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: @theme-background-color;
}

[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}

#components-layout-demo-top-side-2 .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side-2 .logo {
  float: right;
  margin: 16px 0 16px 24px;
}


.ant-header {
  display: flex;
  height: 4.5vh;
  align-items: center;
  border-bottom: 1px solid @theme-border-color;
  background-color: @theme-background-color;
  overflow: hidden;
}


.ant-div {

  .ant-sidebar {
    height: 95.5vh;
    background-color: @theme-background-color;
    overflow: hidden;
  }

  .ant-content {
    height: 95.5vh;
    overflow: auto;
  }
}
</style>
