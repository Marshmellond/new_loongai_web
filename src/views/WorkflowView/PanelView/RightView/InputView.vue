<script setup lang="ts">

import Icon, {PlusOutlined} from "@ant-design/icons-vue";
import {ref, onMounted, onUnmounted, watch} from 'vue'
import {Input, Button, Typography, message} from 'ant-design-vue';
import {useCounterStore} from '@/stores/counter'
import Prism from "prismjs"
import "prismjs/themes/prism-okaidia.min.css"

const counter = useCounterStore()

const clear_variable_content = () => {
  for (let i = 0; i < counter.flow_data.nodes.filter(item => item.type === 'end')[0].data.variable_content.length; i++) {
    counter.flow_data.nodes.filter(item => item.type === 'end')[0].data.variable_content[i].value = ""
  }
}
const clear_start_variable = () => {
  for (let i = 0; i < counter.flow_data.nodes.filter(item => item.type === 'start')[0].data.variable.length; i++) {
    counter.flow_data.nodes.filter(item => item.type === 'start')[0].data.variable[i].value = ""
  }
}
const seed_meg = () => {
  console.log(counter.flow_data.nodes.filter(item => item.type === 'end')[0].data.variable_content)
  clear_variable_content()
  counter.workflow_seed_load = true
  const url = "/api/workflow/seed"
  let body = {
    flow_data: JSON.stringify(counter.flow_data),
  }
  fetch(url, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body),
    credentials: "include"
  }).then((res) => {
    if (res.ok) {
      return res.json()
    }
  }).then((data) => {
    if (data["code"] == 1) {
      counter.flow_data.nodes.filter(item => item.type === 'end')[0].data.variable_content = data["data"]
      clear_start_variable()
      counter.workflow_seed_load = false
      setTimeout(() => {
        Prism.highlightAll()
      }, 100)
    } else if (data["code"] == -1) {
      message.error("生成出现错误：输入内容不合法或key错误")
      clear_start_variable()
      counter.workflow_seed_load = false
    }
  })
}
const on_generate = () => {
  for (let i = 0; i < counter.flow_data.nodes[0].data.variable.length; i++) {
    if (counter.flow_data.nodes[0].data.variable[i].must) {
      if (counter.flow_data.nodes[0].data.variable[i].value.length === 0) {
        message.error(`${counter.flow_data.nodes[0].data.variable[i].name} 输入为空`)
        return
      }
    }
  }
  seed_meg()
  counter.right_select_key = "2"

}


// ------------------------------------上传文本文件------------------------------------
const beforeUpload2 = (file) => {
  const allowedTypes = ['text/plain', 'application/json', 'text/csv'];
  const isAllowedType = allowedTypes.includes(file.type);
  if (!isAllowedType) {
    message.error('只能上传 txt、json 或 csv 文件');
    return Upload.LIST_IGNORE;
  }
  const isLt2M = file.size / 1024 / 1024 < 1;
  if (!isLt2M) {
    message.error('文件大小不能超过1MB');
    return Upload.LIST_IGNORE;
  }
  return isAllowedType && isLt2M;
};

const handleChange2 = (info, itemId) => {
  const status = info.file.status;
  if (status === 'done') {
    processUploadedFile2(info.file.originFileObj, info.file.name, itemId);
  } else if (status === 'error') {
    message.error(`文件 ${info.file.name} 上传失败`);
  }
};

const processUploadedFile2 = (file, fileName, itemId) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const fileContent = e.target.result;
    uploadFileToServer2(fileContent, fileName, file.type, itemId);
  };
  reader.readAsText(file);
};

const customRequest2 = ({file, onSuccess}) => {
  setTimeout(() => {
    onSuccess("ok", file);
  }, 0);
};

const uploadFileToServer2 = (fileContent, fileName, fileType, itemId) => {
  for (let i = 0; i < counter.flow_data.nodes[0].data.variable.length; i++) {
    if (counter.flow_data.nodes[0].data.variable[i].id === itemId) {
      counter.flow_data.nodes[0].data.variable[i].value = fileContent
      counter.flow_data.nodes[0].data.variable[i].file_name = fileName
      counter.flow_data.nodes[0].data.variable[i].file_type = fileType
    }
  }

  for (let i = 0; i < counter.flow_data.nodes.filter(item => item.type === 'end')[0].data.variable_content.length; i++) {
    if (counter.flow_data.nodes.filter(item => item.type === 'end')[0].data.variable_content[i].input_id === itemId) {
      counter.flow_data.nodes.filter(item => item.type === 'end')[0].data.variable_content[i].value = fileContent
      counter.flow_data.nodes.filter(item => item.type === 'end')[0].data.variable_content[i].file_name = fileName
      counter.flow_data.nodes.filter(item => item.type === 'end')[0].data.variable_content[i].file_type = fileType
    }
  }
};

const delete_put_file_list = (id) => {
  for (let i = 0; i < counter.flow_data.nodes[0].data.variable.length; i++) {
    if (counter.flow_data.nodes[0].data.variable[i].id === id) {
      counter.flow_data.nodes[0].data.variable[i].value = ""
      counter.flow_data.nodes[0].data.variable[i].file_name = ""
      counter.flow_data.nodes[0].data.variable[i].file_type = ""
    }
  }

  for (let i = 0; i < counter.flow_data.nodes.filter(item => item.type === 'end')[0].data.variable_content.length; i++) {
    if (counter.flow_data.nodes.filter(item => item.type === 'end')[0].data.variable_content[i].input_id === id) {
      counter.flow_data.nodes.filter(item => item.type === 'end')[0].data.variable_content[i].value = ""
      counter.flow_data.nodes.filter(item => item.type === 'end')[0].data.variable_content[i].file_name = ""
      counter.flow_data.nodes.filter(item => item.type === 'end')[0].data.variable_content[i].file_type = ""
    }
  }
}
</script>

<template>
  <div class="div1">
    <div class="div1-2"
         v-for="(item) in counter.flow_data.nodes[0].data.variable" :key="item.id">
      <div class="div1-2-title-div">
        <div class="div1-2-title-span">{{ item.name }}</div>
        <div class="div1-2-title-must" v-if="item.must">*</div>
      </div>
      <a-textarea
          style="margin-top: 0.5vh; margin-bottom: 1vh" v-model:value="item.value"
          v-if="item.type==='String'"
          auto-size/>
      <a-upload
          :showUploadList="false"
          :beforeUpload="beforeUpload2"
          @change="(info) => handleChange2(info, item.id)"
          :customRequest="customRequest2"
          v-if="item.type==='File'">
        <a-button style="margin-top: 0.5vh; margin-bottom: 1vh">
          上传
        </a-button>
      </a-upload>
      <div class="div7-content" v-if="item.type==='File' && item.value.length!==0">
        <div class="div7-title">
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
          <span style="margin-left: 0.2vw" class="div-7-span">{{ item.file_name }}</span>
        </div>
        <icon :style="{ color: '#000000'}" class="div7-delete" @click="delete_put_file_list(item.id)">
          <template #component>
            <svg t="1720785675237" class="icon" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg"
                 p-id="2573" width="16" height="16">
              <path
                  d="M512 64c-247.00852 0-448 200.960516-448 448S264.960516 960 512 960c247.00852 0 448-200.960516 448-448S759.039484 64 512 64zM694.752211 649.984034c12.480043 12.54369 12.447359 32.768069-0.063647 45.248112-6.239161 6.208198-14.399785 9.34412-22.591372 9.34412-8.224271 0-16.415858-3.135923-22.65674-9.407768l-137.60043-138.016718-138.047682 136.576912c-6.239161 6.14455-14.368821 9.247789-22.496761 9.247789-8.255235 0-16.479505-3.168606-22.751351-9.504099-12.416396-12.576374-12.320065-32.800753 0.25631-45.248112l137.887703-136.384249-137.376804-137.824056c-12.480043-12.512727-12.447359-32.768069 0.063647-45.248112 12.512727-12.512727 32.735385-12.447359 45.248112 0.063647l137.567746 137.984034 138.047682-136.575192c12.54369-12.447359 32.831716-12.320065 45.248112 0.25631 12.447359 12.576374 12.320065 32.831716-0.25631 45.248112L557.344443 512.127295 694.752211 649.984034z"
                  fill="#2c2c2c" p-id="2574"></path>
            </svg>
          </template>
        </icon>
      </div>
    </div>
  </div>
  <div class="div2">
    <a-button type="primary" size="large" class="ant-button1" @click="on_generate">
      <icon :style="{ color: '#000000'}">
        <template #component>
          <svg t="1719992329172" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               p-id="7820" width="32" height="32">
            <path
                d="M516.5 869c-49.4 0-97.3-9.7-142.5-28.8-43.6-18.4-82.7-44.8-116.3-78.4s-60-72.7-78.4-116.3c-19.1-45.1-28.8-93.1-28.8-142.5s9.7-97.3 28.8-142.5c18.4-43.6 44.8-82.7 78.4-116.3 33.6-33.6 72.7-60 116.3-78.4 45.1-19.1 93.1-28.8 142.5-28.8s97.3 9.7 142.5 28.8c43.6 18.4 82.7 44.8 116.3 78.4 33.6 33.6 60 72.7 78.4 116.3 19.1 45.1 28.8 93.1 28.8 142.5s-9.7 97.3-28.8 142.5c-18.4 43.6-44.8 82.7-78.4 116.3-33.6 33.6-72.7 60-116.3 78.4-45.1 19.1-93.1 28.8-142.5 28.8z m0-660c-162.1 0-294 131.9-294 294s131.9 294 294 294 294-131.9 294-294-131.9-294-294-294z"
                p-id="7821"></path>
            <path d="M436 341.3L676.1 497 436 652.6z" p-id="7822"></path>
          </svg>
        </template>
      </icon>
      <span class="div2-title">运行</span>
    </a-button>
  </div>
</template>

<style scoped lang="less">


.div7-content {
  display: flex;

  .div7-title {
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.1);
    padding: 1vh;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .div-7-span {
      max-width: 9vw; /* 你可以根据需要调整这个值 */
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis; /* 这将添加省略号，如果文本超出其最大宽度 */
    }
  }

  .div7-delete {
    cursor: pointer;
    height: 2vh;
    padding: 0.2vh;
  }

}


.div1 {
  display: flex;
  flex-direction: column;
  padding: 1vh;
  height: 77vh;
  overflow: auto;
  border-bottom: 1px solid @theme-border-color;
}

.div1-2 {
  margin-bottom: 1vh;

  .div1-2-title-div {
    position: relative;
    display: flex;
    flex-direction: row;


    .div1-2-title-span {
      margin-left: 0.2vw;
      font-size: 15px;
      font-weight: 900;
    }

    .div1-2-title-must {
      position: relative;
      margin-left: 0.2vw;
      color: red;
    }
  }
}

.div2 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 1vh;

  .ant-button1 {
    width: 80%;
    position: relative;
    background: #fdfdfd;
    border: 1px solid #e4e4e4;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    &:hover {
      background: #f0f0f0;
    }

    .div2-title {
      color: black;
      font-weight: 600;
      position: relative;
      right: 0.3vw;
    }
  }
}
</style>