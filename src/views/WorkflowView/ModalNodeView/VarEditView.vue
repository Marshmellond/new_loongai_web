<script setup lang="ts">
import {ref, onMounted, onUnmounted, watch} from 'vue'
import Icon, {DeleteOutlined, PlusOutlined} from "@ant-design/icons-vue";
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()
// ------------------------------------提交保存------------------------------------
const handleOk = () => {
  counter.var_edit_open = false
}
// ------------------------------------添加变量------------------------------------
const add_variable = () => {
  let id = 0
  if (counter.var_node_data.data.var_update_data.length !== 0) {
    for (let i = 0; i < counter.var_node_data.data.var_update_data.length; i++) {
      if (counter.var_node_data.data.var_update_data[i].id > id) {
        id = counter.var_node_data.data.var_update_data[i].id
      }
    }
  }
  id += 1
  counter.var_node_data.data.var_update_data.push({id: id, input_id: "", input: "", value: ""})
}

// ------------------------------------删除变量------------------------------------
const delete_variable = (id) => {
  `1`
  counter.var_node_data.data.var_update_data = counter.var_node_data.data.var_update_data.filter(item => item.id !== id)
}

watch(() => counter.var_edit_open, () => {

  for (let i = 0; i < counter.var_node_data.data.var_update_data.length; i++) {
    if (counter.var_node_data.data.var_update_data[i].input == undefined) {
      counter.var_node_data.data.var_update_data[i].input = ""
      counter.var_node_data.data.var_update_data[i].input_id = ""
    } else if (typeof counter.var_node_data.data.var_update_data[i].input !== "string") {
      counter.var_node_data.data.var_update_data[i].input = counter.var_node_data.data.var_update_data[i].input[0]
      for (let a = 0; a < counter.flow_data.nodes[0].data.variable.length; a++) {
        if (!counter.var_node_data.data.var_update_data[i].input.startsWith("AI回复内容")) {
          if (counter.var_node_data.data.var_update_data[i].input === counter.flow_data.nodes[0].data.variable[a].name) {
            counter.var_node_data.data.var_update_data[i].input_id = counter.flow_data.nodes[0].data.variable[a].id
          }
        } else if (counter.var_node_data.data.var_update_data[i].input.startsWith("AI回复内容")) {
          for (let b = 0; b < counter.flow_data.nodes.length; b++) {
            if (counter.flow_data.nodes[b].type === "ai") {
              if (counter.flow_data.nodes[b].data.print === counter.var_node_data.data.var_update_data[i].input) {
                counter.var_node_data.data.var_update_data[i].input_id = counter.flow_data.nodes[b].data.print_id
              }
            }
          }
        }
      }
    }
    if (counter.var_node_data.data.var_update_data[i].dit == undefined) {
      counter.var_node_data.data.var_update_data[i].dit = ""
    } else if (typeof counter.var_node_data.data.var_update_data[i].dit !== "string") {
      counter.var_node_data.data.var_update_data[i].dit = counter.var_node_data.data.var_update_data[i].dit[0]
    }
  }


  console.log(counter.var_node_data.data.var_update_data)

  counter.edit_start = !counter.var_edit_open
})
</script>

<template>
  <a-modal v-model:open="counter.var_edit_open" :title="`变量更新${counter.var_node_data.data.order}`"
           @ok="handleOk"
           width="20vw"
           okText="保存" cancelText="关闭">
    <div class="div1">
      <div class="div2">
        <span class="div2-title">添加变量</span>
        <PlusOutlined class="div2-ico" @click="add_variable"/>
      </div>
      <div class="div3">
        <div v-for="(item) in counter.var_node_data.data.var_update_data" :key="item.id" class="div3-div">
          <div class="div3-title2">
            变量
            <DeleteOutlined class="div3-ico" @click="delete_variable(item.id)"/>
          </div>
          <a-cascader v-model:value="item.input" :options="counter.input_options"/>
          <div class="div3-title2">
            值
          </div>
          <a-textarea
              v-model:value="item.value"
              class="div3-textarea"
              auto-size/>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<style scoped lang="less">
.div3 {
  .div3-div {
    margin-top: 1vh;
    background: #f5f6f8;
    margin-bottom: 1vh;
    border-radius: 5px;
    padding: 0.5vh;

    .div3-title2 {
      margin-left: 0.2vw;
    }

    .div3-ico {
      position: relative;
      left: 12.5vw;
      border-radius: 5px;
      padding: 1vh;

      &:hover {
        background: #e8eaee;
      }
    }

    .div3-textarea {
      margin-bottom: 0.5vh;
      width: 10.6vw;
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
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 0.5vh;

  .div2-title {
    margin-left: 0.2vw;
  }

  .div2-ico {
    position: relative;
    left: 11.5vw;
    border-radius: 5px;
    padding: 1vh;

    &:hover {
      background: #e8eaee;
    }
  }
}
</style>