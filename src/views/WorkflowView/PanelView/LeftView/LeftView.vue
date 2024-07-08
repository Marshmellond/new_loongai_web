<script setup lang="ts">
import Icon, {CoffeeOutlined, DeleteOutlined, FormOutlined, PlusOutlined} from "@ant-design/icons-vue";
import {useCounterStore} from '@/stores/counter'
import {ref, watch, onMounted, onUnmounted} from "vue";
import {useRouter} from 'vue-router';

import {Panel, VueFlow, useVueFlow} from '@vue-flow/core'
import {message, type UploadProps} from "ant-design-vue";

const router = useRouter();
const counter = useCounterStore()
const open = ref<boolean>(false);
const edit_name = ref("")
const edit_id = ref("")
// ------------------------------------变量初始化------------------------------------
counter.flow_data_select = localStorage.getItem("flow_data_select");

// ------------------------------------获取localStorage数据------------------------------------
const get_local_flow_data = () => {
  let local_flow_data = localStorage.getItem("flow_data")
  if (local_flow_data?.length > 0) {
    try {
      let json_flow_data = JSON.parse(local_flow_data)
      if (json_flow_data.nodes.length > 0) {
        counter.flow_data = json_flow_data
      }
    } catch (e) {
      console.log(e)
    }
  }
}

// ------------------------------------上传工作流数据至数据库------------------------------------
const set_flow_data = () => {
  const url2 = "/api/workflow/set_flow_data"
  let body = {
    flow_data_select: counter.flow_data_select,
    flow_data: JSON.stringify(counter.flow_data)
  }
  fetch(url2, {
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
      message.success("上传工作流数据至数据库成功")
    }
  })
}
// ------------------------------------获取工作流数据------------------------------------
const get_flow_data = () => {
  const url2 = "/api/workflow/get_flow_data"
  let body = {
    flow_data_select: counter.flow_data_select,
  }
  fetch(url2, {
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
      let flow_data = data["data"]["flow_data"]
      counter.flow_data = JSON.parse(flow_data)
      localStorage.setItem("flow_data", flow_data)
      counter.flow_data_status = true
    }
  })
}
// ------------------------------------获取工作流列表------------------------------------
const get_flow_data_list = (flow_data_select_status: Boolean = false, get_flow_data_status: Boolean = false) => {
  counter.flow_data_status = false
  const url = "/api/workflow/get_flow_data_list"
  fetch(url).then((res) => {
    if (res.ok) {
      return res.json()
    }
  }).then((data) => {
    if (data["code"] == 1) {
      counter.flow_data_list = data["data"]["flow_data_list"]
    }
    if (counter.flow_data_list.length !== 0) {
      if (flow_data_select_status) {
        localStorage.setItem('flow_data_select', counter.flow_data_list[0][0]);
        counter.flow_data_select = counter.flow_data_list[0][0]
      }
      if (get_flow_data_status) {
        if (counter.flow_data_select !== "") {
          get_flow_data()
        }
      } else {
        get_local_flow_data()
      }
    } else {
      localStorage.setItem('flow_data_select', "");
      counter.flow_data_select = "";
    }
  })
}
get_flow_data_list(false, true)
// ------------------------------------切换路由页面自动保存------------------------------------
router.beforeEach((to, from, next) => {
  if (from.name === 'workflow') { // 替换为你的路由名称
    set_flow_data();
  }
  next();
});

// ------------------------------------刷新网页自动保存------------------------------------
function handleBeforeUnload() {
  set_flow_data()
}

onMounted(() => {
  window.addEventListener('beforeunload', handleBeforeUnload);
});

onUnmounted(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload);
});
// ------------------------------------新增工作流------------------------------------

const on_add_flow_data = () => {
  const ai_id = `ai_${Date.now().toString()}`
  const flow_data = {
    "nodes": [{
      id: `start_${Date.now().toString()}`,
      data: {
        variable: [
          {
            id: "0",
            name: "输入内容",
            label: "content",
            value: "",
            max_len: "40",
            type: "String",
            must: true
          },
        ],
        order: 1,
        flow_name: "",
        flow_order: "",
        flow_create_time: "",
        isSelected: false,
      },
      type: 'start', // 节点类型
      position: {x: 100, y: 400},
    }, {
      id: `end_${Date.now().toString()}`,
      data: {
        variable_print: [],
        variable_content: [],
        order: counter.flow_data.nodes.length + 1,
        isSelected: false,
      },
      type: 'end', // 节点类型
      position: {x: 900, y: 420},
    }, {
      id: ai_id,
      data: {
        edit_mod: [
          "openai",
          0
        ],
        edit_mod_view: "gpt-3.5-turbo",
        edit_mod_img: "http://127.0.0.1:8000/img/head?path=api&name=openai.png",
        app_mod: [
          "无"
        ],
        app_mod_view: "无",
        app_mod_img: "http://127.0.0.1:8000/img/head?path=model&name=null.png",
        system: "",
        input: "",
        print: `AI回复内容${counter.flow_data.nodes.length + 1}`,
        order: counter.flow_data.nodes.length + 1,
        isSelected: false,
        id: ai_id,
      },
      type: 'ai', // 节点类型
      position: {x: 500, y: 250},
    }], "edges": [], "position": [],
  }


  const url = "/api/workflow/add_flow_data"
  let body = {
    flow_data: JSON.stringify(flow_data),
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
      set_flow_data()
      get_flow_data_list(true, true)
      message.success("新增工作流成功")
    }
  })
}

// ------------------------------------导入工作流------------------------------------
const on_import_flow_data = () => {
}
// ------------------------------------选择工作流------------------------------------
const selectItem = (id: string) => {
  set_flow_data()
  counter.flow_data_select = id;
  localStorage.setItem('flow_data_select', id);
  get_flow_data()
};

// ------------------------------------修改工作流------------------------------------
const show_edit = (item) => {
  open.value = true
  edit_id.value = item[0].toString()
  edit_name.value = item[1]
}
const handleOk = () => {
  const url = "/api/workflow/alter_flow_name"
  let body = {
    flow_id: edit_id.value,
    flow_name: edit_name.value,
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
      set_flow_data()
      get_flow_data_list(false, true)
      message.success("工作流信息更新成功")
    }
  })
  open.value = false
  edit_id.value = ""
  edit_name.value = ""
}
// ------------------------------------删除工作流------------------------------------

const delete_record = (id) => {
  const url = "/api/workflow/delete_flow_name"
  let body = {
    flow_id: id,
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
      set_flow_data()
      get_flow_data_list(true, true)
      message.success("工作流删除成功")
    }
  })
};
// ------------------------------------AI对话节点------------------------------------
const add_ai_node = () => {
  const ai_id = `ai_${Date.now().toString()}`
  const newNode = {
    id: ai_id,
    data: {
      edit_mod: [
        "openai",
        0
      ],
      edit_mod_view: "gpt-3.5-turbo",
      edit_mod_img: "http://127.0.0.1:8000/img/head?path=api&name=openai.png",
      app_mod: [
        "无"
      ],
      app_mod_view: "无",
      app_mod_img: "http://127.0.0.1:8000/img/head?path=model&name=null.png",
      system: "",
      input: "",
      print: `AI回复内容${counter.flow_data.nodes.length + 1}`,
      order: counter.flow_data.nodes.length + 1,
      isSelected: false,
      id: ai_id,
    },
    type: 'ai', // 节点类型
    position: {x: 900, y: 500},
  };
  counter.flow_data.nodes.push(newNode);
}
// ------------------------------------问题分类器节点------------------------------------
const add_reply_node = () => {
  const newNode = {
    id: `reply_${Date.now().toString()}`,
    data: {
      label: '',
      order: counter.flow_data.nodes.length + 1,
      isSelected: false,
    },
    type: 'reply', // 节点类型
    position: {x: 1200, y: 500},
  };
  counter.flow_data.nodes.push(newNode);
}
// ------------------------------------判断器节点------------------------------------
const add_if_node = () => {
  const newNode = {
    id: `if_${Date.now().toString()}`,
    data: {
      order: counter.flow_data.nodes.length + 1,
      isSelected: false,
    },
    type: 'if', // 节点类型
    position: {x: 900, y: 200},
  };
  counter.flow_data.nodes.push(newNode);
}
// ------------------------------------变量更新节点------------------------------------
const add_var_node = () => {
  const newNode = {
    id: `var_${Date.now().toString()}`,
    data: {
      order: counter.flow_data.nodes.length + 1,
      isSelected: false,
    },
    type: 'var', // 节点类型
    position: {x: 1200, y: 200},
  };
  counter.flow_data.nodes.push(newNode);
}
</script>

<template>
  <div class="div1-head">
    <span style="font-size: 20px;margin-top: 1vh;margin-bottom: 1vh">工具面板</span>
  </div>
  <div class="div1-content">
    <span style="font-size: 16px;margin-top: 2vh">文本输出</span>
    <div class="div1-t1" @click="add_ai_node">
      <icon :style="{ color: '#000000'}">
        <template #component>
          <svg t="1720336272526" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               p-id="14025" width="32" height="32">
            <path
                d="M832 839.9H203.3c-10.8 0-19.6-8.8-19.6-19.6V547.5c0-109.8 89.3-199.2 199.2-199.2h269.4c109.8 0 199.2 89.4 199.2 199.2v272.8c0.1 10.8-8.7 19.6-19.5 19.6z m-609.1-39.2h589.5V547.5c0-88.2-71.8-160-160-160H382.9c-88.2 0-160 71.8-160 160v253.2z"
                fill="#1E94FC" p-id="14026"></path>
            <path
                d="M665.8 609.2H369.5c-33.1 0-60-26.9-60-60s26.9-60 60-60h296.4c33.1 0 60 26.9 60 60-0.1 33.1-27 60-60.1 60z m-296.3-80.8c-11.5 0-20.8 9.3-20.8 20.8S358 570 369.5 570h296.4c11.5 0 20.8-9.4 20.8-20.8 0-11.5-9.3-20.8-20.8-20.8H369.5z"
                fill="#28E3C4" p-id="14027"></path>
            <path
                d="M192.1 730.4h-44.9c-15.8 0-28.6-12.8-28.6-28.6V612c0-15.8 12.8-28.6 28.6-28.6h44.9c10.8 0 19.6 8.8 19.6 19.6s-8.8 19.6-19.6 19.6h-34.3v68.6h34.3c10.8 0 19.6 8.8 19.6 19.6s-8.8 19.6-19.6 19.6zM883.6 730.4h-44.9c-10.8 0-19.6-8.8-19.6-19.6s8.8-19.6 19.6-19.6H873v-68.6h-34.3c-10.8 0-19.6-8.8-19.6-19.6s8.8-19.6 19.6-19.6h44.9c15.8 0 28.6 12.8 28.6 28.6v89.8c0 15.8-12.8 28.6-28.6 28.6zM627.7 384.7c-4.4 0-8.9-1.5-12.6-4.6-8.3-6.9-9.4-19.3-2.4-27.6l139.2-166.1c6.9-8.3 19.3-9.4 27.6-2.4 8.3 6.9 9.4 19.3 2.4 27.6L642.7 377.7c-3.9 4.6-9.4 7-15 7zM403.1 384.7c-5.6 0-11.1-2.4-15-7L248.9 211.5c-7-8.3-5.9-20.7 2.4-27.6 8.3-7 20.6-5.9 27.6 2.4l139.2 166.1c7 8.3 5.9 20.7-2.4 27.6-3.6 3.2-8.1 4.7-12.6 4.7z"
                fill="#1E94FC" p-id="14028"></path>
            <path
                d="M780.3 218.9c-23.4 0-42.5-19-42.5-42.5s19-42.5 42.5-42.5 42.5 19 42.5 42.5-19 42.5-42.5 42.5z m0-44.9c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5-1.1-2.5-2.5-2.5zM250.5 218.9c-23.4 0-42.5-19-42.5-42.5s19-42.5 42.5-42.5 42.5 19 42.5 42.5-19.1 42.5-42.5 42.5z m0-44.9c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5-1.2-2.5-2.5-2.5z"
                fill="#1E94FC" p-id="14029"></path>
          </svg>
        </template>
      </icon>
      <span style="margin-left: 1vh">AI 对话</span>
    </div>
    <div class="div1-t1" @click="add_reply_node">
      <icon :style="{ color: '#000000'}">
        <template #component>
          <svg t="1720335787780" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               p-id="6222" width="32" height="32">
            <path
                d="M634.9 770.3l-4.4 28H393.6l-4.4-28h245.7zM512 931c-30.4 0-55.9-21.6-62-50.2h124c-6.1 28.6-31.6 50.2-62 50.2z m103.5-79.3h-207c-3.4 0-6.4-2.2-7.4-5.5l-2.9-18.9H626l-3 18.9c-1 3.3-4 5.5-7.5 5.5zM384.7 741.3l-8.1-51.9-0.1-0.6c-7.4-30.4-22.6-58.6-43.8-81.7-42.5-46.2-65.9-106.1-65.9-168.7 0-135.1 109.9-245.1 245-245.3h0.3c134 0 244 108.9 245.3 242.9 0.6 62.7-22.5 122.6-65 168.6-21.5 23.2-36.8 51.7-44.3 82.4l-0.1 0.6-8.4 53.6H384.7z"
                fill="#FFFFFF" p-id="6223"></path>
            <path
                d="M357 741.1l-8-51.9-0.1-0.6c-7.4-30.4-22.4-58.6-43.5-81.7-42.2-46.2-65.4-106.1-65.4-168.7 0-135.1 109-245.1 243.1-245.3h0.3c133 0 242.1 108.9 243.3 242.9 0.6 62.7-22.3 122.6-64.5 168.6-21.3 23.2-36.5 51.7-43.9 82.4l-0.1 0.6-8.3 53.6H357z"
                fill="#F7DF8A" p-id="6224"></path>
            <path
                d="M605.8 770.8l-4.3 28H370.4l-4.3-28h239.7zM587 852.2H384.9c-3.3 0-6.3-2.2-7.2-5.5l-2.9-18.9h222.3l-2.9 18.9c-1 3.3-3.9 5.5-7.2 5.5z"
                fill="#E87A66" p-id="6225"></path>
            <path d="M484.9 931c-29 0-53.4-21.6-59.2-50.2H544c-5.8 28.6-30.1 50.2-59.1 50.2z" fill="#65D5EF"
                  p-id="6226"></path>
            <path
                d="M512 164.1h-0.3c-73.2 0.1-142 28.6-193.7 80.4-51.7 51.8-80.2 120.6-80.2 193.9 0 35.2 6.6 69.7 19.7 102.6 12.7 31.8 30.8 60.7 53.8 85.7 17.8 19.3 30.5 42.9 36.8 68.4l24.5 157 0.1 0.6c4 16.5 18.7 28 35.7 28h12c6.4 44.7 45 79.2 91.5 79.2s85.1-34.5 91.5-79.2h12c17 0 31.7-11.5 35.7-28l0.1-0.6 5.6-35.7c0.2-0.9 0.4-1.8 0.4-2.7l18.9-120.4c6.4-25.7 19.3-49.6 37.3-69.1 47.5-51.5 73.3-118.5 72.7-188.6-0.7-72.6-29.6-140.9-81.5-192.2-51.6-51.1-120.1-79.3-192.6-79.3z m122.9 606.2l-4.4 28H393.6l-4.4-28h245.7zM512 931c-30.4 0-55.9-21.6-62-50.2h124c-6.1 28.6-31.6 50.2-62 50.2z m103.5-79.3h-207c-3.4 0-6.4-2.2-7.4-5.5l-2.9-18.9H626l-3 18.9c-1 3.3-4 5.5-7.5 5.5z m76.8-247c-21.5 23.2-36.8 51.7-44.3 82.4l-0.1 0.6-8.4 53.6h-113V570.8c0-8-6.5-14.5-14.5-14.5s-14.5 6.5-14.5 14.5v170.5H384.7l-8.1-51.9-0.1-0.6c-7.4-30.4-22.6-58.6-43.8-81.7-42.5-46.2-65.9-106.1-65.9-168.7 0-135.1 109.9-245.1 245-245.3h0.3c134 0 244 108.9 245.3 242.9 0.4 62.8-22.6 122.6-65.1 168.7z"
                fill="#274359" p-id="6227"></path>
            <path
                d="M512 467c-8 0-14.5 6.5-14.5 14.5v29.7c0 8 6.5 14.5 14.5 14.5s14.5-6.5 14.5-14.5v-29.7c0-8-6.5-14.5-14.5-14.5zM511.4 146.9c8 0 14.5-6.5 14.5-14.5V78.5c0-8-6.5-14.5-14.5-14.5s-14.5 6.5-14.5 14.5v53.8c0 8.1 6.5 14.6 14.5 14.6zM281.4 234.1c2.8 2.8 6.5 4.3 10.3 4.3 3.7 0 7.4-1.4 10.3-4.3 5.7-5.7 5.7-14.9 0-20.5l-38.1-38.1c-5.7-5.7-14.9-5.7-20.5 0-5.7 5.7-5.7 14.9 0 20.5l38 38.1zM201 429.4h-53.8c-8 0-14.5 6.5-14.5 14.5s6.5 14.5 14.5 14.5H201c8 0 14.5-6.5 14.5-14.5 0.1-8-6.4-14.5-14.5-14.5zM282.3 653.4l-38.1 38.1c-5.7 5.7-5.7 14.9 0 20.5 2.8 2.8 6.5 4.3 10.3 4.3 3.7 0 7.4-1.4 10.3-4.3l38.1-38.1c5.7-5.7 5.7-14.9 0-20.5-5.8-5.7-14.9-5.7-20.6 0zM742.6 652.5c-5.7-5.7-14.9-5.7-20.5 0-5.7 5.7-5.7 14.9 0 20.5l38.1 38.1c2.8 2.8 6.5 4.3 10.3 4.3s7.4-1.4 10.3-4.3c5.7-5.7 5.7-14.9 0-20.5l-38.2-38.1zM876.8 428.2H823c-8 0-14.5 6.5-14.5 14.5s6.5 14.5 14.5 14.5h53.8c8 0 14.5-6.5 14.5-14.5s-6.5-14.5-14.5-14.5zM731.4 237.5c3.7 0 7.4-1.4 10.3-4.3l38.1-38.1c5.7-5.7 5.7-14.9 0-20.5-5.7-5.7-14.9-5.7-20.5 0l-38.1 38.1c-5.7 5.7-5.7 14.9 0 20.5 2.8 2.9 6.5 4.3 10.2 4.3z"
                fill="#274359" p-id="6228"></path>
          </svg>
        </template>
      </icon>
      <span style="margin-left: 1vh">问题分类器</span>
    </div>
    <span style="font-size: 16px;margin-top: 2vh">工具</span>
    <div class="div1-t1" @click="add_if_node">
      <icon :style="{ color: '#000000'}">
        <template #component>
          <svg t="1720336319226" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               p-id="16315" width="32" height="32">
            <path
                d="M640.6 429.8h257.1c7.9 0 14.3-6.4 14.3-14.3V158.3c0-7.9-6.4-14.3-14.3-14.3H640.6c-7.9 0-14.3 6.4-14.3 14.3v92.9H490.6c-3.9 0-7.1 3.2-7.1 7.1v221.5h-85.7v-96.5c0-7.9-6.4-14.3-14.3-14.3H126.3c-7.9 0-14.3 6.4-14.3 14.3v257.2c0 7.9 6.4 14.3 14.3 14.3h257.1c7.9 0 14.3-6.4 14.3-14.3V544h85.7v221.5c0 3.9 3.2 7.1 7.1 7.1h135.7v92.9c0 7.9 6.4 14.3 14.3 14.3h257.1c7.9 0 14.3-6.4 14.3-14.3v-257c0-7.9-6.4-14.3-14.3-14.3h-257c-7.9 0-14.3 6.4-14.3 14.3v100h-78.6v-393h78.6v100c0 7.9 6.4 14.3 14.3 14.3z m53.5-217.9h150V362h-150V211.9zM329.9 587h-150V437h150v150z m364.2 75.1h150v150.1h-150V662.1z"
                fill="#1296DB" p-id="16316"></path>
          </svg>
        </template>
      </icon>
      <span style="margin-left: 1vh">判断器</span>
    </div>
    <div class="div1-t1" @click="add_var_node">
      <icon :style="{ color: '#000000'}">
        <template #component>
          <svg t="1720336548034" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               p-id="21758" width="32" height="32">
            <path
                d="M864.71111108 102.39999999h-142.93333333a34.13333333 34.13333333 0 0 0-28.032 14.656l-170.45333333 245.33333333-170.45333334-245.33333333A34.13333333 34.13333333 0 0 0 324.97777775 102.39999999H182.04444442A34.13333333 34.13333333 0 0 0 147.91111108 136.53333332v102.4a34.13333333 34.13333333 0 0 0 34.13333334 34.13333334h71.424l165.99466666 238.93333333-165.99466666 238.93333333H182.04444442a34.13333333 34.13333333 0 0 0-34.13333334 34.13333334v102.4a34.13333333 34.13333333 0 0 0 34.13333334 34.13333333h142.93333333a34.13333333 34.13333333 0 0 0 28.032-14.656l170.45333333-245.33333333 170.45333334 245.33333333A34.13333333 34.13333333 0 0 0 721.77777775 921.59999999h142.93333333a34.13333333 34.13333333 0 0 0 34.13333334-34.13333333v-102.4a34.13333333 34.13333333 0 0 0-34.13333334-34.13333334h-71.424l-165.99466666-238.93333333 165.99466666-238.93333333H864.71111108a34.13333333 34.13333333 0 0 0 34.13333334-34.13333334V136.53333332a34.13333333 34.13333333 0 0 0-34.13333334-34.13333333z"
                p-id="21759" data-spm-anchor-id="a313x.search_index.0.i40.4ed63a810dnio2" fill="#4381fd"
                class="selected"></path>
            <path
                d="M1524.62222214 921.59999999h-34.13333333V614.39999999a34.13333333 34.13333333 0 0 0-34.13333333-34.13333333h-102.4a34.13333333 34.13333333 0 0 0-30.48533334 18.83733333l-34.13333333 68.26666667A34.13333333 34.13333333 0 0 0 1319.82222214 716.79999999h34.13333334v204.8h-34.13333334a34.13333333 34.13333333 0 0 0-34.13333333 34.13333333v68.26666667a34.13333333 34.13333333 0 0 0 34.13333333 34.13333333h204.8a34.13333333 34.13333333 0 0 0 34.13333334-34.13333333v-68.26666667a34.13333333 34.13333333 0 0 0-34.13333334-34.13333333z"
                p-id="21760" fill="#4381fd"></path>
          </svg>
        </template>
      </icon>
      <span style="margin-left: 1vh">变量更新</span>
    </div>
    <div class="div1-t1" @click="add_var_node">
      <icon :style="{ color: '#000000'}">
        <template #component>
          <svg t="1720336682929" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               p-id="25877" width="32" height="32">
            <path
                d="M744.533333 341.333333h-469.333333c-12.8 0-21.333333-8.533333-21.333333-21.333333v-42.666667c0-12.8 8.533333-21.333333 21.333333-21.333333h469.333333c12.8 0 21.333333 8.533333 21.333334 21.333333v42.666667c0 12.8-8.533333 21.333333-21.333334 21.333333zM661.333333 213.333333H362.666667c-12.8 0-21.333333-8.533333-21.333334-21.333333V149.333333c0-12.8 8.533333-21.333333 21.333334-21.333333h298.666666c12.8 0 21.333333 8.533333 21.333334 21.333333v42.666667c0 12.8-8.533333 21.333333-21.333334 21.333333zM853.333333 384H170.666667c-23.466667 0-42.666667 19.2-42.666667 42.666667v426.666666c0 23.466667 19.2 42.666667 42.666667 42.666667h682.666666c23.466667 0 42.666667-19.2 42.666667-42.666667V426.666667c0-23.466667-19.2-42.666667-42.666667-42.666667z m-42.666666 405.333333c0 12.8-8.533333 21.333333-21.333334 21.333334H234.666667c-12.8 0-21.333333-8.533333-21.333334-21.333334V490.666667c0-12.8 8.533333-21.333333 21.333334-21.333334h554.666666c12.8 0 21.333333 8.533333 21.333334 21.333334v298.666666z"
                fill="#297AFF" p-id="25878"></path>
            <path
                d="M629.333333 755.2c0 2.133333-2.133333 4.266667-4.266666 4.266667-4.266667 0-12.8 2.133333-32 2.133333-14.933333 0-25.6 0-29.866667-2.133333-4.266667 0-6.4-4.266667-6.4-8.533334-4.266667-17.066667-6.4-25.6-8.533333-25.6-2.133333 0-17.066667-2.133333-44.8-2.133333-19.2 0-29.866667 0-29.866667 2.133333-2.133333 2.133333-4.266667 8.533333-6.4 17.066667-2.133333 8.533333-4.266667 14.933333-8.533333 14.933333s-17.066667 2.133333-38.4 2.133334c-17.066667 0-25.6-2.133333-25.6-4.266667s12.8-38.4 38.4-106.666667c27.733333-74.666667 42.666667-115.2 44.8-121.6 2.133333-4.266667 2.133333-6.4 4.266666-6.4h55.466667c2.133333 0 4.266667 2.133333 6.4 6.4 6.4 10.666667 21.333333 51.2 46.933333 119.466667 25.6 68.266667 38.4 104.533333 38.4 108.8z m-119.466666-153.6c-2.133333 4.266667-6.4 14.933333-12.8 32-4.266667 19.2-6.4 27.733333-6.4 32 0 2.133333 4.266667 2.133333 10.666666 4.266667h17.066667c6.4 0 10.666667 0 12.8-2.133334v-2.133333c0-4.266667-2.133333-12.8-8.533333-29.866667-6.4-19.2-10.666667-27.733333-12.8-34.133333z"
                fill="#297AFF" p-id="25879"></path>
          </svg>
        </template>
      </icon>
      <span style="margin-left: 1vh">注释</span>
    </div>
  </div>
  <div class="div2">
    <span class="div3_title">工作流列表</span>
  </div>

  <div class="div3">
    <div v-if="counter.flow_data_list.length===0" class="no-chat">
      <CoffeeOutlined class="no-ico"/>
      <span class="no-txt">暂无记录</span>
    </div>
    <div v-for="(item) in counter.flow_data_list" :key="item[0]">
      <div v-if="counter.flow_data_list.length!==0"
           :class="{ 'selected': item[0] == counter.flow_data_select }"
           @click="selectItem(item[0])"
           class="div3-div">
        <div class="div3-title">{{ item[1] }}</div>
        <div class="div3-time">{{ item[2] }}</div>
        <FormOutlined class="div3-edit" @click="show_edit(item)"/>
        <DeleteOutlined class="div3-delete" @click="delete_record(item[0])"/>
        <a-modal v-model:open="open" title="工作流信息" @ok="handleOk" okText="保存" cancelText="关闭">
          <div class="edit-title">名称</div>
          <a-input v-model:value="edit_name"/>
        </a-modal>
      </div>
    </div>
  </div>

  <div class="div4">
    <a-button type="primary" size="large" class="ant-button1" @click="on_import_flow_data">
      <icon :style="{ color: '#000000'}">
        <template #component>
          <svg t="1720337863663" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               p-id="27526" width="20" height="20">
            <path
                d="M937.2 851.5V599c-0.7-23.7-20.1-42.7-44-42.7s-43.3 19-44 42.7v217H178.5V599c-0.7-23.7-20.1-42.7-44-42.7s-43.3 19-44 42.7v252.5c0 28.9 23.6 52.5 52.5 52.5h741.8c28.8 0 52.4-23.6 52.4-52.5z"
                p-id="27527" fill="#515151"></path>
            <path
                d="M482.8 625.2c17.1 17.1 45.1 17.1 62.2 0l164-164c17.1-17.1 17.1-45.1 0-62.2s-45.1-17.1-62.2 0l-85.7 85.7V169.9c0-26-21.3-47.2-47.2-47.2-26 0-47.2 21.3-47.2 47.2v314.7L381 398.9c-17.1-17.1-45.1-17.1-62.2 0s-17.1 45.1 0 62.2l164 164.1z"
                p-id="27528" fill="#515151"></path>
          </svg>
        </template>
      </icon>
      <span class="div4-title">导入</span>
    </a-button>
    <a-button type="primary" size="large" class="ant-button1" @click="on_add_flow_data" style="margin-left: 0.2vw">
      <PlusOutlined style="color: black"/>
      <span class="div4-title">新建</span>
    </a-button>
  </div>
</template>

<style scoped lang="less">
.selected {
  border-left: 1px solid #3086fd;
  background: #f0f0f0;
}

.no-chat {
  position: relative;
  margin-top: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .no-ico {
    color: #c1c1c1;
    font-size: 150%;
  }

  .no-txt {
    margin-top: 1vh;
    color: #c1c1c1;
    font-size: 120%;
  }
}

.div3 {
  border-top: 1px solid @theme-border-color;
  border-bottom: 1px solid @theme-border-color;
  height: 35vh;
  overflow: auto;
  padding: 0.5vh;

  .div3-div {
    height: 5vh;
    margin-bottom: 1vh;

    &:hover {
      background: #f0f0f0;
    }

    .div3-title {
      position: relative;
      top: 0.5vh;
      left: 0.2vw;
      max-width: 5.5vw; /* 你可以根据需要调整这个值 */
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis; /* 这将添加省略号，如果文本超出其最大宽度 */
    }

    .div3-time {
      position: relative;
      left: 0.2vw;
      font-size: 11px;
      margin-top: 1vh;
    }

    .div3-edit {
      position: relative;
      top: -3vh;
      left: 6.3vw;

      font-weight: bold;
      transition: color 0.3s ease;

      &:hover {
        color: #3085fb;
      }


    }

    .div3-delete {
      position: relative;
      top: -3vh;
      left: 6.7vw;
      transition: color 0.3s ease;

      &:hover {
        color: #3085fb;
      }
    }
  }
}

.div1-head {
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid @theme-border-color;
}

.div1-content {
  display: flex;
  flex-direction: column;
  height: 45vh;
  padding: 0.01vh 1vh 1vh 1vh;

  .div1-t1 {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1vh;
    border-radius: 5px;
    margin-top: 1vh;
    cursor: pointer;
    user-select: none;

    &:hover {
      background: #f2f4f6;
    }
  }
}

.div2 {
  border-top: 1px solid @theme-border-color;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .div3_title {
    font-size: 20px;
    margin-bottom: 1vh;
    margin-top: 1vh;
  }
}


.div4 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0.5vh;

  .ant-button1 {
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

    .div4-title {
      color: black;
    }
  }
}
</style>