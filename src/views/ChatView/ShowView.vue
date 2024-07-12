<script setup lang="ts">
import {ref, onUpdated, watch} from 'vue';
import {useCounterStore} from '@/stores/counter'
import {marked} from 'marked';
import hljs from 'highlight.js'
import Icon from '@ant-design/icons-vue';
import {onMounted} from "vue";

import {
  LoadingOutlined,
  DeleteOutlined,
  FormOutlined,
  AudioOutlined,
} from '@ant-design/icons-vue';
import {h} from 'vue';
import {message} from "ant-design-vue";
import '/src/voice-utils/utilJS/crypto-js.js'; //鉴权的引用地址
import '/src/voice-utils/utilJS/index.umd.js'; // 调用Web Speech API 的依赖，应该是官方的写的工具类
const btnText = ref("开始录音");
const btnStatus = ref("UNDEFINED"); // "UNDEFINED" "CONNECTING" "OPEN" "CLOSING" "CLOSED"
const recorder = new RecorderManager('/src/voice-utils/voice_dist')
let APPID = ""; // TODO 你的讯飞模型APPID
let API_SECRET = ""; // TODO 你的讯飞模型API_SECRET
let API_KEY = ""; // TODO 你的讯飞模型API_KEY
let iatWS; //监听录音的变量
let resultTextTemp = ref('');
let countdownInterval;
// -----------------------------对话页面stt_xunfei传key-----------------------------
const get_stt_xunfei_key = () => {
  const url = "/api/chat/stt_xunfei"
  fetch(url).then((res) => {
    return res.json()
  }).then((data) => {
    if (data["code"] == 1) {
      APPID = data["data"]["app_id"]
      API_SECRET = data["data"]["api_secret"]
      API_KEY = data["data"]["api_key"]
    }
  })
}
onMounted(get_stt_xunfei_key)


// 生成 WebSocket URL 生成规则由平台决定
function getWebSocketUrl() {
  // 请求地址根据语种不同变化
  var url = "wss://iat-api.xfyun.cn/v2/iat";
  var host = "iat-api.xfyun.cn";
  var apiKey = API_KEY;
  var apiSecret = API_SECRET;
  var date = new Date().toGMTString();
  var algorithm = "hmac-sha256";
  var headers = "host date request-line";
  var signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v2/iat HTTP/1.1`;
  var signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret);
  var signature = CryptoJS.enc.Base64.stringify(signatureSha);
  var authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;
  var authorization = btoa(authorizationOrigin);
  url = `${url}?authorization=${authorization}&date=${date}&host=${host}`;
  return url;
}

// 加密工具函数
function toBase64(buffer) {
  var binary = "";
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

// 计数函数
function countdown() {
  let seconds = 60;
  btnText.value = `录制中：${seconds}s`;
  countdownInterval = setInterval(() => {
    seconds = seconds - 1;
    if (seconds <= 0) {
      clearInterval(countdownInterval);
      recorder.stop();
    } else {
      btnText.value = `录制中：${seconds}s`;
    }
  }, 1000);
}

// 录音状态变化函数
function changeStatus(status) {
  btnStatus.value = status;
  if (status === "CONNECTING") {
    btnText.value = "建立连接中";
    resultTextTemp.value = "";
  } else if (status === "OPEN") {
    countdown();
  } else if (status === "CLOSING") {
    btnText.value = "关闭连接中";
  } else if (status === "CLOSED") {
    btnText.value = "开始录制";
  }
}

// 结果解析函数
function renderResult(resultData) {
  // 识别结束
  let jsonData = JSON.parse(resultData);
  if (jsonData.data && jsonData.data.result) {
    let data = jsonData.data.result;
    let str = "";
    let ws = data.ws;
    for (let i = 0; i < ws.length; i++) {
      str = str + ws[i].cw[0].w;
    }
    // 开启wpgs会有此字段(前提：在控制台开通动态修正功能)
    // 取值为 "apd"时表示该片结果是追加到前面的最终结果；取值为"rpl" 时表示替换前面的部分结果，替换范围为rg字段
    if (data.pgs) {
      if (data.pgs === "apd") {
        // 将resultTextTemp同步给
        textarea_input.value = resultTextTemp;
      }
      // 将结果存储在resultTextTemp中
      resultTextTemp.value = textarea_input.value + str;
    } else {
      textarea_input.value = textarea_input.value + str;
    }
  }
  if (jsonData.code === 0 && jsonData.data.status === 2) {
    iatWS.close();
  }
  if (jsonData.code !== 0) {
    iatWS.close();
    console.error(jsonData);
  }
}

// 连接 WebSocket
function connectWebSocket() {
  const websocketUrl = getWebSocketUrl();
  if ("WebSocket" in window) {
    iatWS = new WebSocket(websocketUrl);
  } else if ("MozWebSocket" in window) {
    iatWS = new MozWebSocket(websocketUrl);
  } else {
    alert("浏览器不支持WebSocket");
    return;
  }
  changeStatus("CONNECTING");
  iatWS.onopen = (e) => {
    // 开始录音
    recorder.start({
      sampleRate: 16000,
      frameSize: 1280,
    });
    var params = {
      common: {
        app_id: APPID,
      },
      business: {
        language: "zh_cn",
        domain: "iat",
        accent: "mandarin",
        vad_eos: 5000,
        dwa: "wpgs",
      },
      data: {
        status: 0,
        format: "audio/L16;rate=16000",
        encoding: "raw",
      },
    };
    iatWS.send(JSON.stringify(params));
  };
  iatWS.onmessage = (e) => {
    renderResult(e.data);
  };
  iatWS.onerror = (e) => {
    console.error(e);
    recorder.stop();
    changeStatus("CLOSED");
  };
  iatWS.onclose = (e) => {
    recorder.stop();
    changeStatus("CLOSED");
  };
}

// 定义监听开始的函数
recorder.onStart = () => {
  changeStatus("OPEN");
}
// 处理回调的结果
recorder.onFrameRecorded = ({isLastFrame, frameBuffer}) => {
  if (iatWS.readyState === iatWS.OPEN) {
    iatWS.send(
        JSON.stringify({
          data: {
            status: isLastFrame ? 2 : 1,
            format: "audio/L16;rate=16000",
            encoding: "raw",
            audio: toBase64(frameBuffer),
          },
        })
    );
    if (isLastFrame) {
      changeStatus("CLOSING");
    }
  }
};
// 停止录音的处理
recorder.onStop = () => {
  clearInterval(countdownInterval);
};
// 按钮点击的启动 | 结束函数
const startRecording = () => {
  if (btnStatus.value === "UNDEFINED" || btnStatus.value === "CLOSED") {
    microphone_status.value = true
    connectWebSocket();
  } else if (btnStatus.value === "CONNECTING" || btnStatus.value === "OPEN") {
    // 结束录音
    recorder.stop();
    microphone_status.value = false
  }
}


const counter = useCounterStore()


const seed_microphone = () => {
  microphone_status.value = true

}
const seed_microphone_stop = () => {
  microphone_status.value = false
}


const microphone_status = ref(false);


const chat_show_load = ref(false)
const textarea_input = ref<string>('');
const open = ref<boolean>(false);
const indicator = h(LoadingOutlined, {
  style: {
    fontSize: '24px',
  },
  spin: true,
});
watch(() => counter.selected_item, () => {
  get_data()
})
let chat_rec_id = ref("")
const get_data = () => {
  counter.contents = []
  if (counter.selected_item) {
    let rec_data = counter.recording.filter(item => item[0] == counter.selected_item)[0]
    chat_rec_id.value = rec_data[0]
    let body1 = {
      chat_rec_id: chat_rec_id.value,
    }
    const url1 = "/api/chat/get_api_ver"
    fetch(url1, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body1),
      credentials: "include"
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
    }).then((data) => {
      if (data["code"] == 1) {
        counter.chat_api = ""
        counter.chat_api += `${data["api_name"]}-${data["api_ver"]}`
        counter.chat_img_head = data["chat_img_head"]
        counter.chat_mod_img_head = data["chat_mod_img_head"]
        counter.chat_mod_name = data["chat_mod_name"]
        counter.chat_rec_title = data["chat_rec_title"]
      }
    })
    const url2 = "/api/chat/get_con_chat"
    let body2 = {
      chat_rec_id: chat_rec_id.value,
    }
    fetch(url2, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body2),
      credentials: "include"
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
    }).then((data) => {
      if (data["code"] == 1) {
        counter.contents = []
        for (let i of data["data"]) {
          counter.contents.push([i[0], marked.parse(i[1]), i[2], i[3], i[4], i[1], false])
        }
      }
    })

  }
}
onMounted(get_data)


const scrollContainer = ref(null);
onUpdated(() => {
  const container = scrollContainer.value;
  container.scrollTop = container.scrollHeight;
});


const push_message = (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    seed_message();
    event.preventDefault();
  }
}
let temp_meg = ref("")
const chat_status_bool = ref(false)
const seed_message = () => {
  if (textarea_input.value.length == 0) {
    message.warn("输入不能为空")
    return
  }
  const url1 = "/api/chat/add_con_data"
  let chat_con_user = textarea_input.value
  let img_textarea = ""
  textarea_input.value = ''
  if (counter.chat_put_img_list.length > 0) {
    for (let i of counter.chat_put_img_list) {
      img_textarea += `![](${i.url})<br>`
    }
    img_textarea += `${chat_con_user}`
    chat_con_user = img_textarea
  }

  let put_img_list = JSON.stringify(counter.chat_put_img_list)
  counter.chat_put_img_list = []
  chat_status_bool.value = true
  let body = {
    chat_rec_id: chat_rec_id.value,
    textarea_input: chat_con_user,
    chat_emotion_status: counter.chat_emotion_status
  }
  fetch(url1, {
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
      for (let i of data["data"]) {
        counter.contents.push([i[0], marked.parse(i[1]), i[2], i[3], i[4], i[1], false])
      }
      chat_show_load.value = true
      const url2 = "/api/chat/add_con_chat"
      console.log(put_img_list)
      console.log(typeof put_img_list)
      let body2 = {
        chat_rec_id: chat_rec_id.value,
        textarea_input: chat_con_user,
        put_img_list: put_img_list,
        chat_con_order: data["data"][0][0],
        chat_con_user_time: data["data"][0][2],
        chat_con_user_img: data["data"][0][3],
        chat_con_ai_img: data["data"][1][3],
      }
      fetch(url2, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body2)
      }).then((res) => {
        if (res.ok) {
          temp_meg.value = ""
          chat_show_load.value = false
          return res.body;
        }
      }).then((rb) => {
        const reader = rb?.getReader();
        const decoder = new TextDecoder("utf-8");

        function process({done, value}) {
          if (done) {
            chat_status_bool.value = false
            return;
          }
          if (chat_status_bool.value === false) {
            return;
          }
          temp_meg.value += decoder.decode(value);
          counter.contents[counter.contents.length - 1][1] = marked(temp_meg.value)
          counter.contents[counter.contents.length - 1][5] = temp_meg.value
          reader?.read().then(process);
        }

        reader?.read().then(process);
        console.log("结束了")
      })
    }
  })
}
const get_rec_data = (status: boolean) => {
  const url = "/api/chat/get_rec_data"
  fetch(url).then((res) => {
    return res.json()
  }).then((data) => {
    counter.recording = []
    if (data["code"] == 1) {
      for (let i of data["data"]) {
        counter.recording.unshift(i)
      }
    }
    if (status) {
      localStorage.setItem('chat_selected_item', counter.recording[0][0]);
      counter.selected_item = counter.recording[0][0]
    }
    if (counter.recording.length === 0) {
      localStorage.setItem('chat_selected_item', "");
      counter.selected_item = "";
    }
  })

}
const delete_record = () => {
  const url = "/api/chat/del_rec_data"
  let body = {
    chat_rec_id: counter.selected_item
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
      counter.chat_api = ""
      counter.chat_img_head = ""
      counter.chat_mod_img_head = ""
      get_rec_data(true)
      message.success("对话信息删除成功")
    }
  })
  if (counter.recording.length === 0) {
    localStorage.setItem('chat_selected_item', "");
    counter.selected_item = "";
  }

};


const show_edit = () => {
  const url = "/api/chat/edit_rec_data"
  let body = {
    chat_rec_id: counter.selected_item,
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
      counter.edit_name = data["data"]["edit_name"]
      counter.edit_mod_view = data["data"]["edit_mod_view"]
      counter.edit_app_view = data["data"]["edit_app_view"]
      counter.edit_mod_options = data["data"]["edit_mod_options"]
      counter.edit_app_options = data["data"]["edit_app_options"]
    }
  })
  open.value = true;
}

const handleOk = () => {
  const url = "/api/chat/alter_edit_rec_data"
  if (counter.edit_mod.length == 0) {
    counter.edit_mod = {0: "data-null", 1: "data-null"}
  }
  if (counter.edit_app.length == 0) {
    counter.edit_app = {0: "data-null", 1: "data-null"}
  }
  if (counter.edit_app[0] == "无") {
    counter.edit_app = {0: "无", 1: "无"}
  }
  const chat_rec_id = counter.selected_item
  let body = {
    chat_rec_id: chat_rec_id,
    chat_rec_title: counter.edit_name,
    chat_api: counter.edit_mod[0],
    api_select: counter.edit_mod[1],
    chat_mod_id: counter.edit_app[1]
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
      get_rec_data()
      const get_show_data = () => {
        let body = {
          chat_rec_id: chat_rec_id,
        }
        const url = "/api/chat/get_api_ver"
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
            counter.chat_api = ""
            counter.chat_api += `${data["api_name"]}-${data["api_ver"]}`
            counter.chat_img_head = data["chat_img_head"]
            counter.chat_mod_img_head = data["chat_mod_img_head"]
            counter.chat_mod_name = data["chat_mod_name"]
            counter.chat_rec_title = data["chat_rec_title"]
          }
        })
      }
      get_show_data()
      message.success("对话信息更新成功")
    }
  })

  counter.edit_name = ""
  counter.edit_mod_view = ""
  counter.edit_app_view = ""
  counter.edit_mod = ""
  counter.edit_app = ""
  counter.edit_temp_select_red_id = ""
  open.value = false;

};
const click_sound = (text: string, index) => {
  counter.contents[index][6] = true
  const utterance = new SpeechSynthesisUtterance(text);

  utterance.rate = 1.5; // 语速 0.1-10
  utterance.volume = 1 // 音量 0-1
  utterance.pitch = 1.5; // 音调 0-2

  // 朗读文本
  speechSynthesis.speak(utterance);

  utterance.onend = () => {
    counter.contents[index][6] = false;
  };
}
const click_sound_stop = (index) => {
  speechSynthesis.cancel()
  counter.contents[index][6] = false
}
const click_copy = (text: string) => {
  navigator.clipboard.writeText(text);
  message.success("复制成功")
}
const stop_chat = () => {
  chat_show_load.value = false
  chat_status_bool.value = false
}

const delete_message = (id) => {
  counter.contents = counter.contents.filter(item => item[0] !== id)
  let body = {
    chat_con_id: id,
  }
  const url = "/api/chat/delete/chat_con_id"
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
      message.success("删除成功")
    }
  })
}
// ------------------------------------上传图片------------------------------------
const beforeUpload = (file) => {
  const isImage = file.type.startsWith('image/');
  if (!isImage) {
    message.error('只能上传图片文件');
    return Upload.LIST_IGNORE;
  }
  const isLt5M = file.size / 1024 / 1024 < 5;
  if (!isLt5M) {
    message.error('图片大小不能超过5MB');
    return Upload.LIST_IGNORE;
  }
  return isImage && isLt5M;
};

const handleChange = (info) => {
  const status = info.file.status;
  if (status === 'done') {
    processUploadedImage(info.file.originFileObj, info.file.name);
  } else if (status === 'error') {
    message.error(`图片 ${info.file.name} 上传失败`);
  }
};

const processUploadedImage = (file, file_name) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const imageDataUrl = e.target.result;
    uploadImageToServer(imageDataUrl, file_name);
  };
  reader.readAsDataURL(file);
};

const customRequest = ({file, onSuccess}) => {
  setTimeout(() => {
    onSuccess("ok", file);
  }, 0);
};

const uploadImageToServer = (imageDataUrl, file_name) => {
  console.log(imageDataUrl)
  console.log(file_name)
  const url = "/api/chat/put_img";
  let body = {
    image_data: imageDataUrl,
    file_name: file_name
  };
  fetch(url, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body),
    credentials: "include"
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
  }).then((data) => {
    if (data["code"] == 1) {
      counter.chat_put_img_list.push({"id": crypto.randomUUID(), "url": data["data"]["img_url"]})
      message.success("图片上传成功");
    } else {
      message.error("图片上传失败");
    }
  }).catch((error) => {
    console.error('Error uploading image:', error);
    message.error("图片上传失败");
  });
};
// ------------------------------------删除图片------------------------------------
const delete_put_img_list = (id) => {
  counter.chat_put_img_list = counter.chat_put_img_list.filter(item => item.id !== id)
}
</script>
<template>

  <div class="div1">
    <div class="div2">
      <FormOutlined class="ant-edit" @click="show_edit"/>
      <DeleteOutlined class="ant-delete" @click="delete_record"/>
      <div class="ant-emotion">
        <span style="margin-right: 0.2vw">情感识别</span>
        <a-switch v-model:checked="counter.chat_emotion_status"/>
      </div>
      <div v-if="counter.chat_img_head" style="margin-left: -3vw">
        <a-avatar shape="square" class="ant-head1">
          <template #icon>
            <img :src="counter.chat_img_head" alt="">
          </template>
        </a-avatar>
        <span class="div2-title">{{ counter.chat_api }}</span>
      </div>
      <div v-if="counter.chat_mod_img_head" style="margin-left: 2vw">
        <a-avatar shape="square" class="ant-head1">
          <template #icon>
            <img :src="counter.chat_mod_img_head" alt="">
          </template>
        </a-avatar>
        <span class="div2-title">{{ counter.chat_mod_name }}</span>
      </div>
      <span class="div2-recode-title">{{ counter.chat_rec_title }}</span>
      <a-modal v-model:open="open" title="对话信息" @ok="handleOk" okText="保存" cancelText="关闭">
        <div class="edit-title">名称</div>
        <a-input v-model:value="counter.edit_name"/>
        <div class="edit-title">模型</div>
        <a-cascader v-model:value="counter.edit_mod" :options="counter.edit_mod_options"
                    :placeholder="counter.edit_mod_view"/>
        <div class="edit-title">应用</div>
        <a-cascader v-model:value="counter.edit_app" :options="counter.edit_app_options"
                    :placeholder="counter.edit_app_view"/>
      </a-modal>
    </div>
    <div class="div3" ref="scrollContainer">
      <span class="div3_5_title"
            v-if="counter.contents.length===0">你好！我是AI助手，随时为您提供支持和解答，欢迎向我提问！</span>
      <div v-for="(item, index) in counter.contents" :key="item[0]">
        <div class="div-div-user" v-if="item[4]=='user'">
          <a-radio-group size="small" class="div-utils-user">
            <a-radio-button value="a" @click="click_copy(item[5])">
              <icon :style="{ color: '#8994a6'}" class="icon-user-blue">
                <template #component>
                  <svg t="1719391307585" class="icon" viewBox="0 0 1024 1024" version="1.1"
                       xmlns="http://www.w3.org/2000/svg" p-id="14272" width="16" height="16">
                    <path
                        d="M394.666667 106.666667h448a74.666667 74.666667 0 0 1 74.666666 74.666666v448a74.666667 74.666667 0 0 1-74.666666 74.666667H394.666667a74.666667 74.666667 0 0 1-74.666667-74.666667V181.333333a74.666667 74.666667 0 0 1 74.666667-74.666666z m0 64a10.666667 10.666667 0 0 0-10.666667 10.666666v448a10.666667 10.666667 0 0 0 10.666667 10.666667h448a10.666667 10.666667 0 0 0 10.666666-10.666667V181.333333a10.666667 10.666667 0 0 0-10.666666-10.666666H394.666667z m245.333333 597.333333a32 32 0 0 1 64 0v74.666667a74.666667 74.666667 0 0 1-74.666667 74.666666H181.333333a74.666667 74.666667 0 0 1-74.666666-74.666666V394.666667a74.666667 74.666667 0 0 1 74.666666-74.666667h74.666667a32 32 0 0 1 0 64h-74.666667a10.666667 10.666667 0 0 0-10.666666 10.666667v448a10.666667 10.666667 0 0 0 10.666666 10.666666h448a10.666667 10.666667 0 0 0 10.666667-10.666666v-74.666667z"
                        fill="#8994a6" p-id="14273"></path>
                  </svg>
                </template>
              </icon>
            </a-radio-button>
            <a-radio-button value="b">
              <icon :style="{ color: '#8994a6'}" class="icon-user-green">
                <template #component>
                  <svg t="1719393386501" class="icon" viewBox="0 0 1024 1024" version="1.1"
                       xmlns="http://www.w3.org/2000/svg" p-id="22424" width="16" height="16">
                    <path
                        d="M913.408 384H732.16c-23.04 0-41.984-18.944-41.984-41.984 0-23.04 18.944-41.984 41.984-41.984h72.704c-65.536-92.672-173.568-153.088-295.936-153.088-200.192 0-362.496 162.304-362.496 362.496 0 200.192 162.304 362.496 362.496 362.496 200.192 0 362.496-162.304 362.496-362.496 0-23.04 18.944-41.984 41.984-41.984 23.04 0 41.984 18.944 41.984 41.984 0 246.272-199.68 445.952-445.952 445.952-246.272 0-445.952-199.68-445.952-445.952 0-246.272 199.68-445.952 445.952-445.952 149.504 0 281.6 73.728 362.496 186.368V175.104c0-23.04 18.944-41.984 41.984-41.984 23.04 0 41.984 18.944 41.984 41.984v167.424c-1.024 23.04-19.456 41.472-42.496 41.472z"
                        fill="#8994a6" p-id="22425"></path>
                  </svg>
                </template>
              </icon>
            </a-radio-button>
            <a-radio-button value="c" @click="delete_message(item[0])">
              <DeleteOutlined class="icon-user-red" :style="{ color: '#8994a6'}"/>
            </a-radio-button>
          </a-radio-group>
          <a-avatar shape="square" class="ant-head2-user">
            <template #icon>
              <img :src="item[3]" alt="">
            </template>
          </a-avatar>
        </div>
        <div class="div-div-user2" v-if="item[4]=='user'">
          <div class="div-content-user">
            <span v-html="item[1]" class="div-content-txt-user"></span>
          </div>
        </div>

        <div class="div-div-ai" v-if="item[4]=='ai'">
          <a-avatar shape="square" class="ant-head2-ai">
            <template #icon>
              <img :src="item[3]" alt="">
            </template>
          </a-avatar>
          <a-radio-group size="small" class="div-utils-ai">
            <a-radio-button value="a" @click="click_copy(item[5])">
              <icon :style="{ color: '#8994a6'}" class="icon-ai-blue">
                <template #component>
                  <svg t="1719391307585" class="icon" viewBox="0 0 1024 1024" version="1.1"
                       xmlns="http://www.w3.org/2000/svg" p-id="14272" width="16" height="16">
                    <path
                        d="M394.666667 106.666667h448a74.666667 74.666667 0 0 1 74.666666 74.666666v448a74.666667 74.666667 0 0 1-74.666666 74.666667H394.666667a74.666667 74.666667 0 0 1-74.666667-74.666667V181.333333a74.666667 74.666667 0 0 1 74.666667-74.666666z m0 64a10.666667 10.666667 0 0 0-10.666667 10.666666v448a10.666667 10.666667 0 0 0 10.666667 10.666667h448a10.666667 10.666667 0 0 0 10.666666-10.666667V181.333333a10.666667 10.666667 0 0 0-10.666666-10.666666H394.666667z m245.333333 597.333333a32 32 0 0 1 64 0v74.666667a74.666667 74.666667 0 0 1-74.666667 74.666666H181.333333a74.666667 74.666667 0 0 1-74.666666-74.666666V394.666667a74.666667 74.666667 0 0 1 74.666666-74.666667h74.666667a32 32 0 0 1 0 64h-74.666667a10.666667 10.666667 0 0 0-10.666666 10.666667v448a10.666667 10.666667 0 0 0 10.666666 10.666666h448a10.666667 10.666667 0 0 0 10.666667-10.666666v-74.666667z"
                        fill="#8994a6" p-id="14273"></path>
                  </svg>
                </template>
              </icon>
            </a-radio-button>
            <a-radio-button value="b">
              <icon :style="{ color: '#8994a6'}" class="icon-ai-pink" v-if="!item[6]"
                    @click="click_sound(item[5], index)">
                <template #component>
                  <svg t="1719391283706" class="icon" viewBox="0 0 1024 1024" version="1.1"
                       xmlns="http://www.w3.org/2000/svg" p-id="12977" width="16" height="16">
                    <path
                        d="M128 420.576v200.864h149.12l175.456 140.064V284.288l-169.792 136.288H128z m132.256-64l204.288-163.968a32 32 0 0 1 52.032 24.96v610.432a32 32 0 0 1-51.968 24.992l-209.92-167.552H96a32 32 0 0 1-32-32v-264.864a32 32 0 0 1 32-32h164.256zM670.784 720.128a32 32 0 0 1-44.832-45.664 214.08 214.08 0 0 0 64.32-153.312 213.92 213.92 0 0 0-55.776-144.448 32 32 0 1 1 47.36-43.04 277.92 277.92 0 0 1 72.416 187.488 278.08 278.08 0 0 1-83.488 198.976zM822.912 858.88a32 32 0 1 1-45.888-44.608A419.008 419.008 0 0 0 896 521.152c0-108.704-41.376-210.848-114.432-288.384a32 32 0 0 1 46.592-43.872c84.16 89.28 131.84 207.04 131.84 332.256 0 127.84-49.76 247.904-137.088 337.728z"
                        fill="#8994a6" p-id="12978"></path>
                  </svg>
                </template>
              </icon>
              <icon :style="{ color: '#8994a6'}" class="icon-ai-pink" v-if="item[6]"
                    @click="click_sound_stop(index)">
                <template #component>
                  <svg t="1719393700872" class="icon" viewBox="0 0 1024 1024" version="1.1"
                       xmlns="http://www.w3.org/2000/svg" p-id="25036" width="16" height="16">
                    <path
                        d="M512 938.666667C277.333333 938.666667 85.333333 746.666667 85.333333 512S277.333333 85.333333 512 85.333333s426.666667 192 426.666667 426.666667-192 426.666667-426.666667 426.666667z m0-789.333334c-200.533333 0-362.666667 162.133333-362.666667 362.666667s162.133333 362.666667 362.666667 362.666667 362.666667-162.133333 362.666667-362.666667-162.133333-362.666667-362.666667-362.666667z"
                        fill="#df57cd" p-id="25037"></path>
                    <path
                        d="M571.733333 627.2h-115.2c-29.866667 0-55.466667-25.6-55.466666-55.466667v-115.2c0-29.866667 25.6-55.466667 55.466666-55.466666h115.2c29.866667 0 55.466667 25.6 55.466667 55.466666v115.2c0 29.866667-25.6 55.466667-55.466667 55.466667z m-110.933333-64h98.133333v-98.133333h-98.133333v98.133333z"
                        fill="#df57cd" p-id="25038"></path>
                  </svg>
                </template>
              </icon>
            </a-radio-button>
          </a-radio-group>
        </div>

        <div class="div-div-ai2" v-if="item[4]=='ai'">
          <div class="div-content-ai">
            <a-spin :indicator="indicator" class="chat-show-load-ai"
                    v-show="chat_show_load && index === counter.contents.length - 1"/>
            <span v-html="item[1]"></span>
          </div>
        </div>
      </div>

    </div>
    <div class="div4">
      <a-textarea
          v-model:value="textarea_input"
          placeholder="输入消息内容"
          :autoSize="{ minRows: 5, maxRows: 5}"
          style="width: 100%"
          :allowClear="true"
          class="textarea-input"
          :bordered="false"
          @keydown="push_message"
      />
      <div class="div4-utils">
        <div class="div4-microphone">
          <AudioOutlined v-if="!microphone_status" class="div4-microphone1" @click="startRecording()"/>
          <icon :style="{ color: '#000000'}" v-show="microphone_status" class="div4-microphone2"
                @click="startRecording()">
            <template #component>
              <svg t="1719568564008" class="icon" viewBox="0 0 1024 1024" version="1.1"
                   xmlns="http://www.w3.org/2000/svg"
                   p-id="7474" width="25" height="25">
                <path
                    d="M128 128m58.0608 0l651.9296 0q58.0608 0 58.0608 58.0608l0 651.9296q0 58.0608-58.0608 58.0608l-651.9296 0q-58.0608 0-58.0608-58.0608l0-651.9296q0-58.0608 58.0608-58.0608Z"
                    fill="#000000" p-id="7475"></path>
              </svg>
            </template>
          </icon>
          <div class="div4-microphone-desc" v-show="microphone_status">
            <span style="color: white;font-size: 12px">{{ btnText }}</span>
          </div>
        </div>
        <a-upload
            :showUploadList="false"
            :beforeUpload="beforeUpload"
            @change="handleChange"
            :customRequest="customRequest"
        >
          <icon :style="{ color: '#000000'}" class="div4-gallery">
            <template #component>
              <svg t="1719564468784" class="icon" viewBox="0 0 1024 1024" version="1.1"
                   xmlns="http://www.w3.org/2000/svg"
                   p-id="3965" width="30" height="30">
                <path
                    d="M828.8 598.4c-6.4-6.4-12.8-9.6-22.4-9.6-9.6 0-16 3.2-22.4 9.6L694.4 688c-12.8 12.8-12.8 32 0 44.8 12.8 12.8 32 12.8 44.8 0l35.2-35.2V896c0 16 12.8 32 32 32s32-12.8 32-32V697.6l38.4 38.4c12.8 12.8 32 12.8 44.8 0 12.8-12.8 12.8-32 0-44.8l-92.8-92.8z m-419.2-240c16-35.2 6.4-76.8-19.2-105.6-28.8-28.8-73.6-35.2-108.8-22.4-35.2 16-57.6 54.4-57.6 92.8 0 51.2 41.6 92.8 92.8 92.8 38.4 0 76.8-22.4 92.8-57.6zM288 323.2c0-9.6 3.2-16 9.6-22.4 3.2-9.6 12.8-12.8 22.4-12.8 16 0 32 12.8 32 28.8s-12.8 32-28.8 35.2c-19.2 0-35.2-12.8-35.2-28.8z"
                    fill="#000000" p-id="3966"></path>
                <path
                    d="M896 96H128c-35.2 0-64 28.8-64 64v640c0 35.2 28.8 64 64 64h544v-64H160c-19.2 0-32-16-32-32V192c0-16 12.8-32 32-32h704c19.2 0 32 16 32 32v416h64V160c0-35.2-28.8-64-64-64z"
                    fill="#000000" p-id="3967"></path>
                <path
                    d="M182.4 713.6c12.8 12.8 32 12.8 44.8 0l134.4-134.4 112 112c3.2 3.2 3.2 3.2 6.4 3.2 12.8 6.4 25.6 6.4 38.4-3.2l316.8-316.8c12.8-12.8 12.8-32 0-44.8-12.8-12.8-32-12.8-44.8 0L496 624 384 508.8l-3.2-3.2c-12.8-9.6-28.8-9.6-41.6 3.2l-160 160c-9.6 12.8-9.6 32 3.2 44.8z"
                    fill="#000000" p-id="3968"></path>
              </svg>
            </template>
          </icon>
        </a-upload>
        <icon :style="{ color: '#000000'}" class="div4-clear">
          <template #component>
            <svg t="1719565031756" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="5248" width="25" height="25">
              <path
                  d="M783.36 331.52l162.56-161.92a71.68 71.68 0 0 0-101.12-101.12L682.24 230.4h-7.04A183.04 183.04 0 0 0 448 251.52a5.76 5.76 0 0 0 0 7.68l307.2 306.56a5.12 5.12 0 0 0 7.04 0 183.04 183.04 0 0 0 20.48-227.2s0.64-4.48 0.64-7.04zM228.48 115.84a64 64 0 0 0 17.92 42.88 64 64 0 0 0 43.52 17.92 59.52 59.52 0 0 0 42.88-17.92 64 64 0 0 0 0-86.4 59.52 59.52 0 0 0-42.88-17.92 64 64 0 0 0-43.52 17.92 64 64 0 0 0-17.92 43.52zM689.92 822.4a76.16 76.16 0 0 0 22.4 54.4 77.44 77.44 0 0 0 53.76 22.4 76.8 76.8 0 0 0 76.8-76.8A76.8 76.8 0 0 0 768 746.24a74.24 74.24 0 0 0-53.76 22.4 73.6 73.6 0 0 0-24.32 53.76zM908.8 754.56a41.6 41.6 0 1 0 12.16-29.44 42.24 42.24 0 0 0-12.16 29.44zM393.6 308.48l305.92 305.92a7.04 7.04 0 0 1 0 8.32A905.6 905.6 0 0 0 576 974.72l-104.32-64C480 890.24 576 694.4 564.48 704a1314.56 1314.56 0 0 0-123.52 149.12l-28.16 38.4a792.32 792.32 0 0 1-142.72-119.68c21.76-26.88 137.6-177.28 137.6-177.28L211.2 710.4a998.4 998.4 0 0 1-96.64-117.12l128-104.96-149.12 52.48-60.8-106.24A1183.36 1183.36 0 0 0 384 307.2a6.4 6.4 0 0 1 9.6 1.28z"
                  fill="#000000" p-id="5249"></path>
            </svg>
          </template>
        </icon>
        <span class="div4-seed-desc">Enter发送 / Shift+Enter换行</span>
        <div class="div4-seed" @click="seed_message">
          <icon :style="{ color: '#000000'}" class="icon-div4-seed" @click="stop_chat">
            <template #component>
              <svg t="1719487236129" class="icon" viewBox="0 0 1024 1024" version="1.1"
                   xmlns="http://www.w3.org/2000/svg"
                   p-id="13290" width="32" height="32">
                <path
                    d="M512.877641 511.997001m-301.216175 301.216175a425.984 425.984 0 1 0 602.43235-602.43235 425.984 425.984 0 1 0-602.43235 602.43235Z"
                    fill="#000000" p-id="13291" data-spm-anchor-id="a313x.search_index.0.i17.4ed63a81Ka2GI0"
                    class="selected"></path>
                <path
                    d="M266.24 427.7248l422.5024-103.5776a24.9856 24.9856 0 0 1 28.4672 34.9696l-188.2624 395.1616a24.9344 24.9344 0 0 1-46.08-3.072l-47.9744-149.4016a24.7808 24.7808 0 0 1 5.12-24.3712L522.24 486.4a6.6048 6.6048 0 0 0-8.192-10.24l-109.0048 63.6416a24.9856 24.9856 0 0 1-24.6272 0.3072L260.2496 473.8048a24.9856 24.9856 0 0 1 5.9904-46.08z"
                    fill="#FFFFFF" p-id="13292"></path>
              </svg>
            </template>
          </icon>
          <span style="cursor: pointer">发送</span>
        </div>
      </div>
    </div>

    <div class="div5" v-if="counter.chat_put_img_list.length!==0">
      <div class="div5-img" v-for="(item) in counter.chat_put_img_list" :key="item.id">
        <div class="div5-content">
          <a-image :src="item.url"/>
          <icon :style="{ color: '#000000'}" class="div5-delete" @click="delete_put_img_list(item.id)">
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
    <div class="div6" v-if="chat_status_bool">
      <div class="div6-content">
        <icon :style="{ color: '#000000'}" class="icon-div4-stop" @click="stop_chat">
          <template #component>
            <svg t="1719484882928" class="icon" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg"
                 p-id="2570" width="32" height="32">
              <path
                  d="M512 42.666667C252.793333 42.666667 42.666667 252.793333 42.666667 512s210.126667 469.333333 469.333333 469.333333 469.333333-210.126667 469.333333-469.333333S771.206667 42.666667 512 42.666667z m213.333333 645.333333a37.373333 37.373333 0 0 1-37.333333 37.333333H336a37.373333 37.373333 0 0 1-37.333333-37.333333V336a37.373333 37.373333 0 0 1 37.333333-37.333333h352a37.373333 37.373333 0 0 1 37.333333 37.333333z"
                  fill="#000000" p-id="2571"></path>
            </svg>
          </template>
        </icon>
        <span>停止对话</span>
      </div>
    </div>


  </div>


</template>

<style scoped lang="less">
@import "src/assets/css/theme.less";

.div6 {
  position: absolute;
  top: 68vh;
  z-index: 1000;
  width: 100%;
  height: 8vh;
  overflow: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .div6-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0.3vh 1.5vh 0.3vh 1.5vh;
    transition: background-color 0.3s ease;
    border-radius: 5px;

    &:hover {
      background-color: #d0e4f4;
    }
  }
}

.div5 {
  position: absolute;
  top: 65.5vh;
  z-index: 1000;
  width: 100%;
  height: 10vh;
  background: rgba(0, 0, 0, 0.1);
  overflow: auto;
  display: flex;
  flex-direction: row;

  .div5-img {
    width: 4.5vw;
    height: 9vh;
    position: relative;
    top: 1vh;
    left: 0.5vw;

    .div5-content {
      display: flex;

      .div5-delete {
        cursor: pointer;
        height: 2vh;
        padding: 0.2vh;
      }

    }
  }
}

.div4 {
  width: 99.96%;
  height: 19.65vh;
  display: flex;
  flex-direction: column;

  .div4-utils {
    display: flex;


    .textarea-input {
      position: relative;
    }

    .div4-microphone-desc {
      position: absolute;
      top: -5vh;
      left: -0.2vw;
      width: 5vw;
      height: 4vh;
      display: flex;
      flex-direction: row;
      align-items: center;
      border-radius: 5px;
      justify-content: center;
      background: #000000;
    }

    .div4-microphone {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      left: 0.5vw;
      top: 2vh;
      width: 2vw;

      .div4-microphone1 {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        font-size: 24px;
        padding: 0.77vh 1.3vh 0.77vh 1.3vh;
        transition: background-color 0.3s ease, color 0.3s ease;
        border-radius: 5px;

        &:hover {
          background-color: #d0e4f4;
          color: #2664c5;
        }
      }

      .div4-microphone2 {
        font-size: 24px;
      }
    }

    .div4-gallery {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      left: 1vw;
      top: 2vh;
      padding: 0.3vh 1vh 0.3vh 1vh;
      transition: background-color 0.3s ease;
      border-radius: 5px;
    }

    .div4-gallery:hover {
      background-color: #d0e4f4;
    }

    .div4-gallery:hover .icon path {
      fill: #2664c5;
    }

    .div4-gallery .icon path {
      transition: fill 0.3s ease;
    }

    .div4-clear {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      top: 2vh;
      left: 55.5vw;
      padding: 0.3vh 1.2vh 0.3vh 1.2vh;
      transition: background-color 0.3s ease;
      border-radius: 5px;


    }

    .div4-clear:hover {
      background-color: #d0e4f4; /* 鼠标悬停时 div 的背景色 */
    }

    .div4-clear:hover .icon path {
      fill: #2664c5; /* 鼠标悬停时 icon 的填充色 */
    }

    .div4-clear .icon path {
      transition: fill 0.3s ease;
    }

    .div4-seed-desc {
      position: relative;
      left: 56.5vw;
      top: 3vh;
      color: #b4b4b4;
    }

    .div4-seed {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      left: 57vw;
      top: 2vh;
      padding: 0.3vh 1.5vh 0.3vh 1.5vh;
      transition: background-color 0.3s ease;
      border-radius: 5px;

      &:hover {
        background-color: #d0e4f4;
      }

      .icon-div4-seed {
        position: relative;

      }

      .icon-div4-stop {
        position: relative;
      }
    }


  }

}

.div3 {
  width: 99.96%;
  height: 70vh;
  background-color: @theme-background-color;
  border-bottom: 1px solid @theme-border-color;
  overflow: auto;


  .div3_5_title {
    position: relative;
    top: 2vh;
    left: 33%;
    color: #b4b4b4;
  }

  .div-div-user {
    display: flex;
    justify-content: flex-end;
    margin-right: 2vw;
    margin-top: 1vh;

    .ant-head2-user {
      background-color: #e8e4e4;
    }

    .div-utils-user {
      margin-top: 0.3%;
      margin-right: 0.5%;

      .icon-user-blue:hover path {
        fill: #3086fd;
      }

      .icon-user-green:hover path {
        fill: #df57cd;
      }

      .icon-user-red:hover {
        color: #fc2c54 !important; /* 鼠标悬停时改变的颜色为红色 */
      }
    }

  }

  .div-div-user2 {
    display: flex;
    justify-content: flex-end;
    margin-right: 2vw;

    .div-content-user {
      margin-top: 0.5%;
      margin-bottom: 1%;
      max-width: 60vw;
      min-height: 10%; /* 设置最小高度 */
      background: #dfe8fd;
      border-radius: 5px 0 5px 5px;
      padding: 0.01vh 1vh 0.01vh 1vh;
      word-wrap: break-word; /* 设置文字换行 */
      overflow-wrap: break-word; /* 设置文字换行 */

      .div-content-txt-user {
        ::v-deep img {
          width: 150px;
          border-radius: 5px;
          height: auto;
        }
      }
    }

  }


  .div-div-ai {
    display: flex;
    justify-content: flex-start;
    margin-left: 2vw;

    .ant-head2-ai {
      background-color: #e8e4e4;
    }

    .div-utils-ai {
      margin-top: 0.3%;
      margin-left: 0.5%;

      .icon-ai-blue:hover path {
        fill: #3086fd;
      }

      .icon-ai-pink:hover path {
        fill: #df57cd;
      }
    }

  }

  .div-div-ai2 {
    display: flex;
    justify-content: flex-start;
    margin-left: 2vw;

    .div-content-ai {
      margin-top: 0.5%;
      margin-bottom: 1%;
      max-width: 60vw; // 指定最大宽度，超过这个宽度内容会自动换行
      min-height: 10%; // 设置最小高度
      background: #f5f6f8;
      border-radius: 0 5px 5px 5px;
      padding: 0.01vh 1vh 0.01vh 1vh;
      word-wrap: break-word; // 设置文字换行
      overflow-wrap: break-word; // 设置文字换行

      .chat-show-load-ai {
        width: 2.5vw;
        height: 4.5vh;
        position: relative;
        top: 1vh;
      }

    }
  }


}

.div1 {
  position: relative;
  width: 100%;
  height: 95.5vh;
  overflow: hidden;
  border-left: 1px solid @theme-border-color;
  background: @theme-background-color;
}

.edit-title {
  margin-top: 2vh;
  margin-bottom: 0.5vh;
}

.div2 {
  width: 99.96%;
  height: 5.9vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid @theme-border-color;
  background-color: @theme-background-color;

  .div2-recode-title {
    position: absolute;
    left: 35vw;
    font-size: 0.9rem;
    color: black;
    max-width: 10vw; /* 你可以根据需要调整这个值 */
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis; /* 这将添加省略号，如果文本超出其最大宽度 */
  }

  .ant-head1 {
    background-color: #e8e4e4;
  }

  .div2-title {
    position: relative;
    left: 0.3vw;
  }

  .ant-edit {
    position: relative;
    left: 74.5vw;
    font-size: 18px;
    border: 1px solid #b0b0b3;
    border-radius: 5px;
    padding: 0.6vh;
    transition: color 0.3s ease, border-color 0.3s ease;

    &:hover {
      color: #3085fb;
      border: 1px solid #3085fb;
    }
  }

  .ant-emotion {
    position: absolute;
    left: 65vw;
  }

  .ant-delete {
    position: relative;
    left: 75vw;
    font-size: 18px;
    border: 1px solid #b0b0b3;
    border-radius: 5px;
    padding: 0.6vh;
    transition: color 0.3s ease, border-color 0.3s ease;

    &:hover {
      color: #3085fb;
      border: 1px solid #3085fb;
    }
  }
}
</style>