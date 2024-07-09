<script setup lang="ts">
import {ref, onMounted, onUnmounted, watch} from 'vue'
import Icon, {DeleteOutlined, PlusOutlined} from "@ant-design/icons-vue";
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()
watch(() => counter.if_edit_open, () => {
  counter.edit_start = !counter.if_edit_open
})
// ------------------------------------提交保存------------------------------------
const handleOk = () => {
  for (let i = 0; i < counter.if_node_data.data.condition.length; i++) {
    if (counter.if_node_data.data.condition[i].var == undefined) {
      counter.if_node_data.data.condition[i].var = ""
    } else if (typeof counter.if_node_data.data.condition[i].var !== "string") {
      counter.if_node_data.data.condition[i].var = counter.if_node_data.data.condition[i].var[0]
    }
    if (counter.if_node_data.data.condition[i].dit == undefined) {
      counter.if_node_data.data.condition[i].dit = ""
    } else if (typeof counter.if_node_data.data.condition[i].dit !== "string") {
      counter.if_node_data.data.condition[i].dit = counter.if_node_data.data.condition[i].dit[0]
    }
  }
  counter.if_edit_open = false
}

// ------------------------------------添加变量------------------------------------
const add_variable = () => {
  let id = 0
  if (counter.if_node_data.data.condition.length !== 0) {
    for (let i = 0; i < counter.if_node_data.data.condition.length; i++) {
      if (counter.if_node_data.data.condition[i].id > id) {
        id = counter.if_node_data.data.condition[i].id
      }
    }
  }
  id += 1
  counter.if_node_data.data.condition.push({id: id, var: "", dit: "", value: ""})
}

// ------------------------------------删除变量------------------------------------
const delete_variable = (id) => {
  counter.if_node_data.data.condition = counter.if_node_data.data.condition.filter(item => item.id !== id)
}
const click_logic = () => {
  if (counter.if_node_data.data.logic === "AND") {
    counter.if_node_data.data.logic = "OR"
  } else if (counter.if_node_data.data.logic === "OR") {
    counter.if_node_data.data.logic = "AND"
  }
}
</script>

<template>
  <a-modal v-model:open="counter.if_edit_open" :title="`判断器${counter.if_node_data.data.order}`"
           @ok="handleOk"
           okText="保存" cancelText="关闭">
    <div class="div1">
      <div class="div1-1">
        <span class="div1-1-title">添加分类</span>
        <PlusOutlined class="div1-1-ico" @click="add_variable"/>
      </div>

      <div class="div2">
        <div class="div2-1">
          <span class="div2-1-title1">IF</span>
          <span class="div2-1-title2" @click="click_logic">{{ counter.if_node_data.data.logic }}</span>
        </div>
        <div v-for="(item) in counter.if_node_data.data.condition" :key="item.id">
          <div class="div2-2">
            <a-cascader v-model:value="item.var" :options="counter.input_options" class="div2-2-content1"/>
            <a-cascader v-model:value="item.dit" :options="counter.flow_if_condition_list" class="div2-2-content2"/>
            <a-textarea
                v-model:value="item.value"
                class="div2-2-content3"
                auto-size/>
            <DeleteOutlined class="div2-2-ico" @click="delete_variable(item.id)"/>
          </div>
        </div>
      </div>

    </div>
  </a-modal>
</template>

<style scoped lang="less">
.div1-1 {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 0.5vh;

  .div1-1-title {
    margin-left: 0.2vw;
  }

  .div1-1-ico {
    position: relative;
    left: 20vw;
    border-radius: 5px;
    padding: 1vh;

    &:hover {
      background: #e8eaee;
    }
  }
}

.div1 {
  display: flex;
  flex-direction: column;
  margin-bottom: 1vh;

  .div1-title1 {
    margin-left: 0.2vw;
    margin-bottom: 0.2vh;
  }

}

.div2 {
  background: #f5f6f8;
  width: 96%;
  min-height: 5vh;
  margin-top: 1vh;
  border-radius: 5px;
  padding: 1vh;

  .div2-1 {
    display: flex;
    flex-direction: row;
    align-items: center;

    .div2-1-title2 {
      margin-left: 19.5vw;
      color: #336ffd;
      font-size: 16px;
      user-select: none;
    }

  }

  .div2-2 {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 1vh;


    .div2-2-content1 {
      position: relative;
      margin-right: 1vh;
      border-radius: 5px;
      width: 9vw;
    }

    .div2-2-content2 {
      position: relative;
      margin-right: 1vh;
      border-radius: 5px;
      width: 5vw;
    }

    .div2-2-content3 {
      position: relative;
      margin-right: 1vh;
      border-radius: 5px;
      width: 9vw;
    }

    .div2-2-ico {
      border-radius: 5px;
      padding: 1vh;

      &:hover {
        background: #e8eaee;
      }
    }
  }
}


</style>