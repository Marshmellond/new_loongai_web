<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useCounterStore} from "@/stores/counter";
import Icon, {DownloadOutlined, PlusOutlined} from "@ant-design/icons-vue";
import {message} from "ant-design-vue";
import {marked} from "marked";

// -----------------------------代码高亮-----------------------------
import Prism from "prismjs"
import "prismjs/themes/prism-okaidia.min.css"

const counter = useCounterStore()


const push_func = () => {
  counter.ass_ai_content = ""
  console.log("sb")
  console.log(counter.ass_ai_content = "")
  counter.ass_show_load_status = true
  const url = "/api/ass/generate/openai"
  let body = {
    content: counter.ass_inp_data.content,
    name: counter.ass_inp_data.name,
    type: counter.ass_inp_data.type,
    clean: counter.ass_ai_clean,
    ass: counter.ass_ai_ass,
    vis: counter.ass_ai_vis,
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
      counter.ass_ai_content = data["data"]["ass_ai_content"]
      console.log(counter.ass_ai_content)
      const validJsonString = counter.ass_ai_content
          .replace(/'/g, '"')  // 将所有单引号替换为双引号
          .replace(/(\w+):/g, '"$1":');  // 给所有的键添加双引号
      counter.ass_ai_echarts = JSON.parse(validJsonString);
      counter.ass_show_load_status = false
    } else {
      counter.ass_show_load_status = false
      message.error("生成出现错误：输入内容不合法或key错误")
    }
  })
}

const on_generate = () => {
  if (counter.ass_inp_data.content.length === 0) {
    message.error("文件未上传")
  } else if (counter.ass_ai_clean.length === 0) {
    message.error("数据清洗为空")
  } else if (counter.ass_ai_ass.length === 0) {
    message.error("数据分析为空")
  } else if (counter.ass_ai_vis.length === 0) {
    message.error("数据可视化为空")
  } else {
    push_func()
  }
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

const handleChange2 = (info) => {
  const status = info.file.status;
  if (status === 'done') {
    processUploadedFile2(info.file.originFileObj, info.file.name);
  } else if (status === 'error') {
    message.error(`文件 ${info.file.name} 上传失败`);
  }
};

const processUploadedFile2 = (file, fileName) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const fileContent = e.target.result;
    uploadFileToServer2(fileContent, fileName, file.type);
  };
  reader.readAsText(file);
};

const customRequest2 = ({file, onSuccess}) => {
  setTimeout(() => {
    onSuccess("ok", file);
  }, 0);
};

const uploadFileToServer2 = (fileContent, fileName, fileType) => {
  counter.ass_inp_data.content = fileContent
  counter.ass_inp_data.name = fileName
  counter.ass_inp_data.type = fileType
  console.log(fileContent, fileName, fileType)
};
const delete_put_file = () => {
  counter.ass_inp_data.content = ""
  counter.ass_inp_data.name = ""
  counter.ass_inp_data.type = ""
}
</script>

<template>
  <div class="div-home">数据分析</div>
  <div class="div1">
    <div class="div-title"
    >支持上传的格式：txt、json、csv
    </div>
    <a-upload
        :showUploadList="false"
        :beforeUpload="beforeUpload2"
        @change="handleChange2"
        :customRequest="customRequest2">
      <a-space direction="vertical" class="ant-space-a">
        <a-button type="primary" size="large" class="ant-button1-a">
          <template #icon>
            <PlusOutlined style="color: black"/>
          </template>
          <span style="color: black">文件上传</span>
        </a-button>
      </a-space>
    </a-upload>
    <div class="div7-content" v-if="counter.ass_inp_data.content.length!==0">
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
        <span style="margin-left: 0.2vw" class="div-7-span">{{ counter.ass_inp_data.name }}</span>
      </div>
      <icon :style="{ color: '#000000'}" class="div7-delete" @click="delete_put_file">
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
    <div class="div-title2">数据清洗</div>
    <a-textarea
        v-model:value="counter.ass_ai_clean"
        placeholder="比如：删除重复数据、处理异常值等"
        :auto-size="{ minRows: 2, maxRows: 7 }"
        class="div-inp"
    />
    <div class="div-title2">数据分析</div>
    <a-textarea
        v-model:value="counter.ass_ai_ass"
        placeholder="比如：年龄分布情况等"
        :auto-size="{ minRows: 2, maxRows: 7 }"
        class="div-inp"
    />
    <div class="div-title2">数据可视化</div>
    <a-textarea
        v-model:value="counter.ass_ai_vis"
        placeholder="比如：饼图、折线图等"
        :auto-size="{ minRows: 2, maxRows: 7 }"
        class="div-inp"
    />
  </div>


  <div class="div2">
    <a-space direction="vertical" class="ant-space">
      <a-button type="primary" size="large" class="ant-button1" @click="on_generate">
        <template #icon>
          <PlusOutlined style="color: black"/>
        </template>
        <span style="color: black">分析</span>
      </a-button>
    </a-space>
  </div>
</template>

<style scoped lang="less">

.ant-space-a {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 1vh;

  .ant-button1-a {
    width: 280%;
    position: relative;
    background: #fdfdfd;
    border: 1px solid #e4e4e4;

    &:hover {
      background: #f0f0f0;
    }
  }
}

.div7-content {
  display: flex;
  margin-top: 1vh;

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

.div-home {
  font-size: 24px;
  font-weight: 900;
  display: flex;
  justify-content: center;
  background: white;
  padding: 1vh;
  border-bottom: 1px solid @theme-border-color;
}

.div1 {
  overflow: auto;
  padding: 1vh;
  width: 100%;
  height: 83vh;
  background: white;

  .div-title {
    margin-left: 0.2vw;
  }

  .div-title2 {
    margin-left: 0.2vw;
    margin-top: 2vh;
  }

  .div-inp {
    margin-top: 1vh;
  }

  .div-mod-div-select {
    border: 1px solid #4e90ec !important;;
    background: white;
  }

  .div-mod-div {
    display: flex;
    margin-top: 1vh;

    .div-mod1 {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50%;
      height: 6vh;
      border: 1px solid @theme-border-color;
      border-radius: 3px;

      &:hover {
        background: #fdfdfd;
      }
    }

    .div-mod2 {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50%;
      height: 6vh;
      border: 1px solid @theme-border-color;
      border-radius: 3px;

      &:hover {
        background: #fdfdfd;
      }
    }
  }
}

.div2 {
  height: 7vh;
  border-top: 1px solid @theme-border-color;
  background: white;
  overflow: auto;
  padding: 1vh;

  .ant-space {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .ant-button1 {
      width: 18vw;
      position: relative;
      background: #fdfdfd;
      border: 1px solid #e4e4e4;

      &:hover {
        background: #f0f0f0;
      }
    }
  }
}
</style>