<script setup lang="ts">
import LoginView from "@/components/LoginView/LoginView.vue";
import RegisterView from "@/components/LoginView/RegisterView.vue";

import {RocketOutlined, NodeIndexOutlined} from '@ant-design/icons-vue';

import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()
</script>

<template>
  <div class="div-background">
    <div class="div-login">
      <div class="div-content">
        <h1 class="h1-title">登录授权</h1>
        <a-tabs v-model:activeKey="counter.login_page" :centered="true">
          <a-tab-pane key="1">
            <template #tab>
        <span>
          <RocketOutlined/>
          登录
        </span>
            </template>
            <div class="div-show">
              <LoginView></LoginView>
            </div>
          </a-tab-pane>
          <a-tab-pane key="2">
            <template #tab>
        <span>
          <NodeIndexOutlined/>
          注册
        </span>
            </template>
            <div class="div-show">
              <RegisterView></RegisterView>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "src/assets/css/theme.less";

.div-background {
  height: 95.5vh;
  background-color: #eff3f7;

  .div-login {
    position: relative;
    margin: auto;
    top: 15%;
    width: 30%;
    min-height: 50%;
    background-color: #fdfdfd;
    border: 1px solid @theme-border-color;
    border-radius: 5px;

    .div-content {
      position: relative;
      top: 5%;
      left: 5%;
      width: 90%;

      .h1-title {
        text-align: center;
        font-size: 20px;
      }

      .div-show {
        position: relative;
        left: 10%;
        width: 80%;
      }
    }
  }
}
</style>