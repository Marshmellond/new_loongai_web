<script setup>
import {Position, Handle} from '@vue-flow/core';
import Icon, {FormOutlined} from "@ant-design/icons-vue";
import {ref, onMounted, onUnmounted, watch} from 'vue'
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()
const props = defineProps(['data']);
// ------------------------------------编辑node------------------------------------
const show_edit = () => {
  setTimeout(() => {
    counter.end_node_data = counter.flow_data.nodes.filter(node => node.id === counter.selectedNode)
    counter.end_node_data = counter.end_node_data[0]
    counter.select_modal_node = 'end_edit'
    counter.input_options = []
    for (let i of counter.flow_data.nodes[0].data.variable) {
      counter.input_options.push({value: i.name, label: i.name})
    }


    let temp_edges = [];

    function func_add_edge(nodeId) {
      for (let i = 0; i < counter.flow_data.edges.length; i++) {
        let edge = counter.flow_data.edges[i];
        if (edge.target === nodeId && edge.targetHandle === "left") {
          temp_edges.push(edge.source);
          func_add_edge(edge.source);
        }
      }
    }

    func_add_edge(counter.selectedNode);
    for (let i = 0; i < counter.flow_data.nodes.length; i++) {
      if (temp_edges.includes(counter.flow_data.nodes[i].id) && counter.flow_data.nodes[i].type === "ai") {
        counter.input_options.push({
          value: counter.flow_data.nodes[i].data.print,
          label: counter.flow_data.nodes[i].data.print
        })
      }
    }
    counter.end_edit_open = true
  }, 100)
}
</script>


<template>
  <div class="end-node" :class="{'selected': data.isSelected}">
    <Handle type="source" position="left" id="left" class="div-Handle"/>
    <div class="div0">
      <div class="div0-ico">
        <icon :style="{ color: '#000000'}">
          <template #component>
            <svg t="1719994574491" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="13831" width="16" height="16">
              <path
                  d="M718.9248 239.328c24.1984 17.2096 45.7152 36.704 64.5376 58.4896s34.9568 45.312 48.4032 70.592c13.4464 25.28 23.6608 52.032 30.6496 80.2688 6.9952 28.2368 10.4896 56.8704 10.4896 85.9136 0 50.016-9.5424 96.9408-28.64 140.7744-19.0848 43.8336-44.9088 82.016-77.4464 114.5536s-70.7264 58.3552-114.5536 77.4464C608.5376 886.4576 561.6192 896 511.5968 896c-49.472 0-96.1344-9.5424-139.9616-28.64-43.8336-19.0848-82.1504-44.9088-114.9568-77.4464s-58.6176-70.7264-77.4464-114.5536-28.2368-90.7584-28.2368-140.7744c0-28.4992 3.36-56.4736 10.0864-83.8976 6.72-27.4304 16.2624-53.5104 28.64-78.2464 12.3712-24.7424 27.6928-47.872 45.984-69.376 18.2848-21.5168 38.72-40.8768 61.3056-58.0928 11.84-8.6016 24.608-11.8272 38.3232-9.6768 13.7152 2.1504 24.8704 8.8768 33.472 20.1664 8.608 11.296 11.84 23.936 9.6896 37.92-2.1568 13.984-8.8768 25.28-20.1728 33.8816C324.4352 352 298.4896 382.3872 280.4736 418.4192c-18.016 36.032-27.0336 74.7584-27.0336 116.1664 0 35.5008 6.7264 68.9728 20.1728 100.4352 13.4464 31.4624 31.8656 58.8928 55.2576 82.2848 23.3984 23.392 50.8224 41.952 82.2848 55.6608 31.4624 13.7216 64.9344 20.576 100.4288 20.576 35.5008 0 68.9792-6.8544 100.4352-20.576 31.4624-13.7152 58.8928-32.2688 82.2848-55.6608 23.3984-23.392 41.952-50.8224 55.6608-82.2848 13.7216-31.4624 20.576-64.9344 20.576-100.4352 0-41.952-9.6832-81.6128-29.0432-118.9888s-46.5216-68.1664-81.472-92.3712c-11.84-8.064-18.9632-19.0912-21.3824-33.0688-2.4192-13.9904 0.4032-26.8928 8.4672-38.7264 8.0704-11.296 19.0912-18.1504 33.0752-20.5696C694.1824 228.4352 707.0912 231.264 718.9248 239.328L718.9248 239.328zM511.5968 537.0048c-13.984 0-25.9456-4.9728-35.8912-14.9184-9.952-9.952-14.9248-21.92-14.9248-35.904L460.7808 179.6288c0-13.984 4.9728-26.08 14.9248-36.3008S497.6128 128 511.5968 128c14.528 0 26.7648 5.1072 36.704 15.328 9.9584 10.2208 14.9312 22.3168 14.9312 36.3008l0 306.5536c0 13.984-4.9728 25.952-14.9312 35.904C538.3552 532.032 526.1184 537.0048 511.5968 537.0048L511.5968 537.0048zM511.5968 537.0048"
                  fill="#ffffff" p-id="13832"></path>
            </svg>
          </template>
        </icon>
      </div>
      <span class="div0-title">结束</span>
      <FormOutlined class="div0-edit" @click="show_edit"/>
    </div>

    <div class="div1" style="margin-top: 2vh;">
      <div class="div1-1">
        <icon :style="{ color: '#4381fd'}" class="div1-1-ico">
          <template #component>
            <svg t="1720073288376" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="7701" width="16" height="16">
              <path
                  d="M558.6 960.2h-157c-27.5 0-50-22.5-50-50v-795c0-27.5 22.5-50 50-50h157.1c27.5 0 50 22.5 50 50v795.1c-0.1 27.4-22.6 49.9-50.1 49.9z"
                  p-id="7702" fill="#4381fd"></path>
            </svg>
          </template>
        </icon>
        <span class="div1-1-title">输出</span>
      </div>
      <div class="div1-2"
           v-for="(item, index) in data.variable_print" :key="index">
        <icon :style="{ color: '#4381fd'}" class="div1-2-ico">
          <template #component>
            <svg t="1719996910739" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="1478" width="16" height="16">
              <path
                  d="M818.412608 812.995801c-28.954791-3.238916-66.230245 10.24726-79.688498 47.46687l-0.223374 0.642199c-8.571958 26.078857-23.370453 36.633255-30.713857 37.135845-6.086928 0.390904-20.354911-6.61744-33.198888-27.363254l-0.16753-0.279217c-22.588646-35.488466-58.635546-114.032175-94.93374-206.620494 72.791842-104.092054 165.436004-224.40661 218.598898-283.656432 20.82958-23.370453 37.973496-48.192834 22.588646-71.647053-16.445874-25.12952-58.21672-27.921688-76.393739-29.038556-33.785243-2.596717-60.953046-2.14997-83.765065 8.376507-23.8172 11.168675-34.06446 29.345694-42.440967 47.187653-15.04979 29.541146-32.165785 59.36151-108.894585 166.915853-39.369581-88.427987-60.087473-123.134646-91.527294-158.902328a188.890222 188.890222 0 0 0-134.247478-63.465998c-43.557834-1.870753-84.128047 11.168675-111.240006 35.516388l-0.279217 0.223373c-18.512079 17.060152-21.611387 39.788406-7.92976 57.909582 14.630965 19.34973 44.870153 29.513225 78.571631 26.525604 26.30223-2.14997 47.857774 4.80253 64.219884 20.662049 37.582593 38.448165 86.333861 118.108742 118.611332 193.218084-30.26711 38.69946-62.209522 78.376179-93.202596 116.852266-56.597262 70.334733-110.067296 136.816273-154.79784 198.243987-12.927742 17.925724-30.713857 42.49681-15.021869 64.750396 14.993947 21.360092 50.119431 24.794459 69.189944 26.609369 57.853738 6.031085 92.532475-7.818073 119.672357-47.801931l0.446747-0.67012c33.366418-52.576539 86.389704-121.850248 136.816273-186.824017 28.647652 81.670939 58.300485 144.187599 85.412444 179.396848 24.543164 32.556689 53.497955 51.320063 88.511753 57.406991a144.131755 144.131755 0 0 0 24.682772 2.066205c31.970333 0 60.925124-9.940121 81.475487-18.288706 64.219883-25.408736 96.469433-89.712385 99.875879-142.400611 1.64738-30.406719-24.766538-47.355184-50.007744-50.147352zM930.825326 111.686754H93.174674a55.843377 55.843377 0 0 1 0-111.686754h837.650652a55.843377 55.843377 0 0 1 0 111.686754z"
                  fill="#4381fd" p-id="1479"></path>
            </svg>
          </template>
        </icon>
        <span class="div1-2-title">{{ item[0] }}</span>
        <span class="div1-2-title2">String</span>
      </div>
    </div>

  </div>
</template>

<style scoped lang="less">


.div1 {
  display: flex;
  flex-direction: column;
  font-weight: 600;

  .div1-1 {
    display: flex;
    flex-direction: row;
    align-items: center;

    .div1-1-ico {
      margin-top: 1vh;
    }

    .div1-1-title {
      font-size: 15px;
      margin-top: 1vh;
    }
  }

  .div1-2 {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 5px;
    border: 1px solid @theme-border-color;
    padding: 0.4vh;
    margin-top: 0.5vh;
    min-height: 4vh;
    min-width: 14vw;
    max-width: 14vw;

    .div1-2-title {
      white-space: pre-wrap;
      word-break: break-word;
      position: relative;
      margin-left: 0.2vw;
    }

    .div1-2-title2 {
      position: absolute;
      margin-left: 11vw;
    }
  }

}

.div-Handle {
  width: 0.8vw;
  height: 1.6vh;
  background-color: #ffffff;
  border: solid #007bff;
  border-radius: 50%;
}

.div0 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  .div0-ico {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f58f09;
    border-radius: 7px;
    width: 1.5vw;
    height: 3vh;
    margin-right: 0.3vw;
  }

  .div0-title {
    font-weight: 900;
    font-size: 18px;
    margin-right: 8.6vw;
  }

  .div0-edit {
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    background: #296ffd;
    border-radius: 7px;
    width: 1.5vw;
    height: 3vh;
    font-size: 15px;
  }
}

.selected {
  border: 1px solid #336ffd;
}


.end-node {
  background: #fdfdfd;
  padding: 1vh;
  border-radius: 5px;
  min-width: 15vw;
  min-height: 10vh;
}
</style>