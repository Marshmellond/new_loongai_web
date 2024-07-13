<script setup lang="ts">
import InputView from "@/views/WorkflowView/PanelView/RightView/InputView.vue";
import {ref, onMounted, onUnmounted, watch} from 'vue'
import {useCounterStore} from '@/stores/counter'
import {marked} from 'marked';
import Prism from "prismjs"
import "prismjs/themes/prism-okaidia.min.css"
import Icon, {
  ExpandOutlined,
} from '@ant-design/icons-vue';

setTimeout(() => {
  Prism.highlightAll()
}, 100)
const counter = useCounterStore()
const result_add = () => {
  setTimeout(() => {
    Prism.highlightAll()
  }, 100)
  counter.select_modal_node = 'result_view'
  counter.workflow_result_open = true
}
</script>

<template>
  <div class="div1">
    <span style="font-size: 20px;margin-top: 1vh;margin-bottom: 1vh">运行</span>
  </div>
  <a-tabs v-model:activeKey="counter.right_select_key"
          type="card"
          :centered="true"
          class="div2">
    <a-tab-pane key="1" tab="输入">
      <InputView></InputView>
    </a-tab-pane>
    <a-tab-pane :key="`${index+2}`" tab="结果"
                v-for="(item, index) in counter.flow_data.nodes.filter(item => item.type === 'end')"
                force-render>
      <div class="div3" v-if="!counter.workflow_seed_load">
        <div v-for="(i, index) in item.data.variable_content" :key="index">
          <span class="div2-title">{{ i.input }}</span>
          <div class="div2-content" v-html="marked.parse(i.value)" v-if="i.type==='String'"></div>
          <div class="div7-title" v-if="i.type==='File'">
            <icon :style="{ color: '#000000'}">
              <template #component>
                <svg t="1720872958870" class="icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="3649" width="16" height="16">
                  <path
                      d="M36.197719 837.475285a186.768061 186.768061 0 0 0 186.524714 186.524715h578.555134a186.646388 186.646388 0 0 0 186.524714-186.524715v-650.95057A186.646388 186.646388 0 0 0 801.277567 0H222.722433A186.768061 186.768061 0 0 0 36.197719 186.524715z m83.832699 0v-650.95057a102.813688 102.813688 0 0 1 102.692015-102.692015h578.555134a102.935361 102.935361 0 0 1 102.813688 102.692015v650.95057a102.935361 102.935361 0 0 1-102.813688 102.692015H222.722433a102.813688 102.813688 0 0 1-102.692015-102.692015z"
                      fill="#4D4D4D" p-id="3650"></path>
                  <path
                      d="M222.722433 306.737643H812.471483a41.855513 41.855513 0 0 0 0-83.711027H222.722433a41.855513 41.855513 0 0 0 0 83.711027zM222.722433 565.657795H812.471483a41.977186 41.977186 0 0 0 0-83.8327H222.722433a41.977186 41.977186 0 0 0 0 83.8327zM222.722433 824.577947h597.171103a41.977186 41.977186 0 0 0 0-83.8327H222.722433a41.977186 41.977186 0 0 0 0 83.8327z"
                      fill="#4D4D4D" p-id="3651"></path>
                </svg>
              </template>
            </icon>
            <div style="margin-left: 0.2vw" class="div-7-span" v-if="i.value.length!==0">{{ i.file_name }}</div>
            <div style="margin-left: 0.2vw" class="div-7-span" v-if="i.value.length===0">无文件上传</div>
          </div>
        </div>
      </div>
      <div class="div4" v-if="counter.workflow_seed_load">
        <a-spin class="chat-show-load"/>
        <span>正在运行中，请稍等</span>
      </div>
      <div class="div5">
        <div class="div5-1" @click="result_add">
          <span style="margin-right: 0.2vw">全屏</span>
          <ExpandOutlined/>
        </div>
      </div>
    </a-tab-pane>
  </a-tabs>
</template>
<style scoped lang="less">
.div7-title {
  margin-bottom: 2vh;
  margin-top: 0.5vh;
  margin-left: 1vw;
  width: fit-content;
  max-width: 12vw; /* 保留最大宽度限制 */
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.1);
  padding: 1vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  .div-7-span {
    max-width: 9vw; /* 你可以根据需要调整这个值 */
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis; /* 这将添加省略号，如果文本超出其最大宽度 */
  }
}

.div5 {
  width: 100%;
  height: 100%;

  .div5-1 {
    width: 4vw;
    border-radius: 5px;
    padding: 1vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    top: 1vh;
    left: 1vw;
    background: #f0f0f0;

    &:hover {
      background: #dad8d8;
    }
  }
}

.div4 {
  height: 78vh;
  overflow: auto;
  border-bottom: 1px solid @theme-border-color;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.div3 {
  height: 78vh;
  overflow: auto;
  border-bottom: 1px solid @theme-border-color;
}

.div2 {
  position: relative;

  .div2-title {
    font-weight: 900;
    margin-left: 1vw;
  }

  .div2-content {
    margin-bottom: 2vh;
    margin-top: 0.5vh;
    margin-left: 1vw;
    border-radius: 5px;
    border: 1px solid @theme-border-color;
    min-height: 5vh;
    max-width: 12vw;
    white-space: pre-wrap;
    word-break: break-word;
  }
}

.div1 {
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid @theme-border-color;
}


</style>