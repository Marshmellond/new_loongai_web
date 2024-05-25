<script setup lang="ts">
import {ref} from 'vue';
import type {SizeType} from 'ant-design-vue/es/config-provider';
import {PlusOutlined, DeleteOutlined} from '@ant-design/icons-vue';
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()
const size = ref<SizeType>('large');

// ---------------搜索历史---------------
const search_value = ref<string>('');
let show_recording = counter.recording.reverse();
const search_record = () => {
  for (let i = 0; i < show_recording.length; i++) {
    if (show_recording[i][1].indexOf(search_value.value) === -1) {
      show_recording.splice(i, 1)
      i--
    }
  }
};
// ---------------end---------------

// ---------------对话记录---------------
const delete_record = (list_index) => {
  counter.recording.splice(list_index, 1);
};
const one_record = counter.recording[0][0];

const selectedItem = ref<string>(one_record);
const selectItem = (id: string) => {
  selectedItem.value = id;
};
// ---------------end---------------

// ---------------新建对话---------------
const add_record = () => {
  let max_id = counter.recording[0][0]
  let add_id = parseInt(max_id) + 1
  let date = new Date()
  let format_date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()} ${date.getHours()}:${date.getDate()}`
  counter.recording.unshift([add_id.toString(), `对话记录${add_id}`, format_date])
  selectedItem.value = add_id.toString()
}
// ---------------end---------------


</script>

<template>
  <a-layout-sider
      class="ant-sidebar1"
      width="250px"
  >
    <a-layout-sider
        class="ant-sidebar2"
        width="250px"
    >
      <a-space direction="vertical" class="ant-space">
        <a-input-search
            v-model:value="search_value"
            placeholder="搜索历史"
            enter-button
            @search="search_record"
            class="ant-search"
            :allowClear="true"
        />
      </a-space>
    </a-layout-sider>

    <a-layout-sider
        class="ant-sidebar3"
        width="250px"
    >
      <div v-if="show_recording.length===0">
        暂无对话
      </div>
      <a-layout-sider
          class="ant-sidebar5"
          width="245px"
          v-for="(item, index) in show_recording" :key="item[0]"
          v-if="show_recording.length!==0"
      >
        <div class="ant-div" :class="{ 'selected': item[0] === selectedItem }" @click="selectItem(item[0])">
          <span class="ant-title">{{ item[1] }}</span>
          <span class="ant-time">{{ item[2] }}</span>
          <DeleteOutlined class="ant-delete" @click="delete_record(index)"/>
        </div>
      </a-layout-sider>
    </a-layout-sider>

    <a-layout-sider
        class="ant-sidebar4"
        width="250px"
    >
      <a-space direction="vertical" class="ant-space">
        <a-button type="primary" :size="size" class="ant-button" @click="add_record">
          <template #icon>
            <PlusOutlined style="color: black"/>
          </template>
          <span style="color: black">新建对话</span>
        </a-button>
      </a-space>
    </a-layout-sider>

  </a-layout-sider>


</template>

<style lang="less" scoped>
@import "src/assets/css/theme.less";

.selected {
  border-left: 2px solid #3086fd;
  background: #f0f0f0;

  .ant-delete {
    visibility: visible !important;
  }
}


.ant-sidebar1 {
  height: 95.5vh;
  border-left: 1px solid @theme-border-color;
  background-color: @theme-background-color;

  .ant-sidebar2 {
    height: 50px;
    border-bottom: 1px solid @theme-border-color;
    background-color: @theme-background-color;
  }

  .ant-sidebar3 {
    height: 82vh;
    border-left: 1px solid @theme-border-color;
    background-color: @theme-background-color;
    overflow: auto; /* 添加这一行 */

    .ant-sidebar5 {
      height: 70px;
      position: relative;
      top: 1%;
      left: 1%;
      margin-bottom: 2%;
      background: #fdfdfd;
      border-radius: 1px;
      //border: 1px solid #e4e4e4;

      .ant-div {
        display: flex;
        flex-direction: column;
        height: 100%;

        &:hover {
          border-left: 2px solid #3086fd;
          background: #f0f0f0;
        }

        .ant-title {
          position: relative;
          left: 5%;
          top: 10px;
          font-size: 0.9rem;
          color: black;
          max-width: 210px; /* 你可以根据需要调整这个值 */
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis; /* 这将添加省略号，如果文本超出其最大宽度 */
        }

        .ant-time {
          position: relative;
          left: 5%;
          top: 20px;
          font-size: 0.8rem;
          width: 90%;
          color: black;
        }

        .ant-delete {
          position: relative;
          width: 8%;
          left: 85%;
          top: 3px;
          font-size: 1.2rem;
          visibility: hidden;

          &:hover {
            color: red; // 使用你在 theme.less 文件中定义的颜色变量
          }
        }

        &:hover {
          .ant-delete {
            visibility: visible;
          }
        }
      }
    }
  }

  .ant-sidebar4 {
    border-top: 1px solid @theme-border-color;
    background-color: @theme-background-color;
  }


  .ant-space {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .ant-button {
      width: 185%;
      position: relative;
      top: 1vh;
      left: -45%;
      background: #fdfdfd;
      border: 1px solid #e4e4e4;
    }

    .ant-search {
      width: 100%;
      position: relative;
      top: 1vh;
    }
  }
}
</style>