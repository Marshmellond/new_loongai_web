<script setup lang="ts">
import {RouterLink} from "vue-router";
import {useCounterStore} from '@/stores/counter'


const counter = useCounterStore()
const toTxtView = () => {
  counter.selectedKeys = ['1']
};
const exit_token = () => {
  counter.login_status = false
  document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
</script>

<template>
  <img src="../../assets/img/logo.png" class="ant-logo" alt="">
  <RouterLink to="/">
    <h2 class="ant-title" @click="toTxtView">LoongAI</h2>
  </RouterLink>
  <a-dropdown v-if="counter.login_status">
    <a-avatar shape="square" class="ant-head">
      <template #icon>
        <img :src="counter.img_head" alt="">
      </template>
    </a-avatar>
    <template #overlay>
      <a-menu>
        <a-menu-item>
          <RouterLink to="/about">我的</RouterLink>
        </a-menu-item>
        <a-menu-item @click="exit_token">
          <span>退出登录</span>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>


</template>

<style lang="less" scoped>
@import "src/assets/css/theme.less";

.ant-logo {
  width: 30px;
  height: 30px;
  position: relative;
  left: -40px;
}

.ant-title {
  color: @theme-title-color;
  line-height: normal;
  position: relative;
  left: -30px;
}

.ant-head {
  display: flex;
  margin-left: auto;
  position: relative;
  left: 40px;
}

</style>