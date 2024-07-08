<script setup>
import {ref, onMounted, onUnmounted, watch} from 'vue'
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()
import {Position, Handle} from '@vue-flow/core';
import Icon, {DeleteOutlined, FormOutlined, PlusOutlined} from "@ant-design/icons-vue";

const props = defineProps(['data']);

const show_edit = () => {
  counter.select_modal_node = 'start_edit'
  counter.start_edit_open = true
}
</script>

<template>
  <div class="start-node" :class="{'selected': data.isSelected}">
    <Handle type="source" position="right" id="right" class="div-Handle"/>
    <div class="div0">
      <div class="div0-ico">
        <icon :style="{ color: '#000000'}">
          <template #component>
            <svg t="1719928349868" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="6773" width="18" height="18">
              <path
                  d="M946.5 505L560.1 118.8l-25.9-25.9c-12.3-12.2-32.1-12.2-44.4 0L77.5 505c-12.3 12.3-18.9 28.6-18.8 46 0.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8 12.1-12.1 18.7-28.2 18.7-45.3 0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204z m217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"
                  p-id="6774" fill="#ffffff"></path>
            </svg>
          </template>
        </icon>
      </div>
      <span class="div0-title">开始{{ data.order }}</span>
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
        <span class="div1-1-title">全局变量</span>
      </div>
      <div class="div1-2"
           v-for="(item) in counter.flow_data.nodes[0].data.variable" :key="item[0]">
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
        <span class="div1-2-title-must" v-if="item.must">*</span>
        <span class="div1-2-title-label">{{ item.label }}</span>
        <span class="div1-2-title-name">{{ item.name }}</span>
        <span class="div1-2-title-type">{{ item.type }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.div-Handle {
  width: 0.8vw;
  height: 1.6vh;
  background-color: #ffffff;
  border: solid #007bff;
  border-radius: 50%;
}

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

    .div1-2-title-must {
      position: absolute;
      margin-left: 1vw;
      color: red;
    }

    .div1-2-title-label {
      position: relative;
      margin-left: 0.5vw;
    }

    .div1-2-title-name {
      position: relative;
      margin-left: 0.5vw;
    }

    .div1-2-title-type {
      position: absolute;
      margin-left: 11vw;
    }
  }

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
    background: #296ffd;
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

.start-node {
  background: #fdfdfd;
  padding: 1vh;
  border-radius: 5px;
  min-width: 15vw;
  min-height: 10vh;
}


</style>