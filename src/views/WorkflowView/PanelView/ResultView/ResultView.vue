<script setup lang="ts">
import {ref, onMounted, onUnmounted, watch} from 'vue'
import Icon, {DeleteOutlined, ExpandOutlined, PlusOutlined} from "@ant-design/icons-vue";
import {useCounterStore} from '@/stores/counter'
import {marked} from "marked";

const counter = useCounterStore()
const handleOk = () => {
  counter.workflow_result_open = false
}
watch(() => counter.workflow_result_open, () => {
  counter.edit_start = !counter.workflow_result_open
})
</script>

<template>
  <a-modal v-model:open="counter.workflow_result_open" title="结果"
           @ok="handleOk"
           okText="保存"
           cancelText="关闭"
           width="100vw"
           style="top: 1vh">
    <div
        v-for="(i, index) in counter.flow_data.nodes.filter(item => item.type === 'end')[0].data.variable_content"
        :key="index"
        class="div1">
      <span class="div1-title">{{ i.input }}</span>
      <div class="div1-content" v-html="marked.parse(i.value)" v-if="i.type==='String'"></div>
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
  </a-modal>
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

.div1 {
  position: relative;

  .div1-title {
    font-weight: 900;
    margin-left: 1vw;
  }

  .div1-content {
    margin-bottom: 2vh;
    margin-top: 0.5vh;
    margin-left: 1vw;
    border-radius: 5px;
    border: 1px solid @theme-border-color;
    min-height: 5vh;
    white-space: pre-wrap;
    word-break: break-word;
  }
}
</style>