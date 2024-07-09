<script setup lang="ts">
import {ref, onMounted, onUnmounted, watch} from 'vue'
import Icon, {DeleteOutlined, PlusOutlined} from "@ant-design/icons-vue";
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()


// ------------------------------------提交保存------------------------------------
const handleOk = () => {
  if (counter.reply_node_data.data.edit_mod === undefined) {
    counter.reply_node_data.data.edit_mod = [
      "openai",
      0
    ]
    counter.reply_node_data.data.edit_mod_view = "gpt-3.5-turbo"
  } else {
    let mod_label = counter.reply_node_data.data.edit_mod[0]
    let mod_index = counter.reply_node_data.data.edit_mod[1]
    counter.reply_node_data.data.edit_mod_view = counter.edit_mod_options.filter(item => item.label === mod_label)[0].children[mod_index].label
  }

  counter.reply_node_data.data.edit_mod_img = counter.edit_mod_img_options.filter(item => item.name === counter.reply_node_data.data.edit_mod[0])[0].img
  counter.reply_edit_open = false
}
// ------------------------------------添加分类------------------------------------
const add_variable = () => {
  let id = 0
  let percentage = 24
  if (counter.reply_node_data.data.question.length !== 0) {
    for (let i = 0; i < counter.reply_node_data.data.question.length; i++) {
      if (counter.reply_node_data.data.question[i].id > id) {
        id = counter.reply_node_data.data.question[i].id
      }
      if (counter.reply_node_data.data.question[i].percentage > id) {
        percentage = counter.reply_node_data.data.question[i].percentage
      }
    }
  }
  id += 1
  percentage += 7.5
  counter.reply_node_data.data.question.push({
    id: id, value: "", percentage: percentage
  })
}
// ------------------------------------删除分类------------------------------------
const delete_variable = (id) => {
  counter.reply_node_data.data.question = counter.reply_node_data.data.question.filter(item => item.id !== id)
}
watch(() => counter.reply_edit_open, () => {

  if (counter.reply_node_data.data.input == undefined) {
    counter.reply_node_data.data.input = ""
    counter.reply_node_data.data.input_id = ""
  } else if (typeof counter.reply_node_data.data.input !== "string") {
    counter.reply_node_data.data.input = counter.reply_node_data.data.input[0]
    for (let i = 0; i < counter.flow_data.nodes[0].data.variable.length; i++) {
      if (!counter.reply_node_data.data.input.startsWith("AI回复内容")) {
        if (counter.reply_node_data.data.input === counter.flow_data.nodes[0].data.variable[i].name) {
          counter.reply_node_data.data.input_id = counter.flow_data.nodes[0].data.variable[i].id
        }
      } else if (counter.reply_node_data.data.input.startsWith("AI回复内容")) {
        for (let i = 0; i < counter.flow_data.nodes.length; i++) {
          if (counter.flow_data.nodes[i].type === "ai") {
            if (counter.flow_data.nodes[i].data.print === counter.reply_node_data.data.input) {
              counter.reply_node_data.data.input_id = counter.flow_data.nodes[i].data.print_id
            }
          }
        }
      }
    }
  }


  console.log(counter.reply_node_data.data.input)
  console.log(counter.reply_node_data.data.input_id)


  counter.edit_start = !counter.reply_edit_open
})
</script>

<template>
  <a-modal v-model:open="counter.reply_edit_open" :title="`问题分类器${counter.reply_node_data.data.order}`"
           @ok="handleOk"
           okText="保存" cancelText="关闭">
    <div class="div1">
      <span class="div1-title1">模型</span>
      <a-cascader v-model:value="counter.reply_node_data.data.edit_mod" :options="counter.edit_mod_options"
                  :placeholder="counter.reply_node_data.data.edit_mod_view"/>
      <span class="div1-title1" style="margin-top: 1vh">用户问题</span>
      <a-cascader v-model:value="counter.reply_node_data.data.input" :options="counter.input_options"/>
      <div class="div2">
        <span class="div2-title">添加分类</span>
        <PlusOutlined class="div2-ico" @click="add_variable"/>
      </div>
      <div class="div3">
        <div v-for="(item) in counter.reply_node_data.data.question" :key="item.id">
          <div class="div3-title2">
            分类{{ item.id }}
            <DeleteOutlined class="div3-ico" @click="delete_variable(item.id)"/>
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
  .div3-title2 {
    margin-left: 0.2vw;
  }

  .div3-ico {
    position: relative;
    left: 20.5vw;
    border-radius: 5px;
    padding: 1vh;

    &:hover {
      background: #e8eaee;
    }
  }

  .div3-textarea {
    margin-bottom: 0.5vh;
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
    left: 20vw;
    border-radius: 5px;
    padding: 1vh;

    &:hover {
      background: #e8eaee;
    }
  }
}
</style>