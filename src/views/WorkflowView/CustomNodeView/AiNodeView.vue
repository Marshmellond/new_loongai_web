<template>
  <div class="ai-node" :class="{'selected': data.isSelected}">
    <Handle type="target" :position="Position.Left"/>
    <Handle type="target" :position="Position.Right"/>
    <div class="div1">
      <div class="div1-ico">
        <icon :style="{ color: '#000000'}">
          <template #component>
            <svg t="1719994456572" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="11403" width="16" height="16">
              <path
                  d="M511.500488 63.937561c33.104671 0 59.941463 26.836792 59.941463 59.941463 0 21.351149-11.163099 40.094845-27.971684 50.713476L543.469268 255.750244h287.719025c17.655758 0 31.96878 14.313022 31.96878 31.96878v575.438049c0 17.655758-14.313022 31.96878-31.96878 31.968781H191.812683c-17.655758 0-31.96878-14.313022-31.968781-31.968781V287.719024c0-17.655758 14.313022-31.96878 31.968781-31.96878h287.719024v-81.157744c-16.548839-10.452792-27.625022-28.781893-27.96469-49.721444L451.559024 123.879024c0-33.104671 26.836792-59.941463 59.941464-59.941463z m279.726829 263.742439H231.773659v495.516098h559.453658V327.68zM631.383415 672.343415a7.992195 7.992195 0 0 1 7.992195 7.992195v47.95317a7.992195 7.992195 0 0 1-7.992195 7.992196H391.617561a7.992195 7.992195 0 0 1-7.992195-7.992196v-47.95317a7.992195 7.992195 0 0 1 7.992195-7.992195h239.765854zM119.882927 399.609756a7.992195 7.992195 0 0 1 7.992195 7.992195v303.703415a7.992195 7.992195 0 0 1-7.992195 7.992195H71.929756a7.992195 7.992195 0 0 1-7.992195-7.992195V407.601951a7.992195 7.992195 0 0 1 7.992195-7.992195h47.953171z m831.188293 0a7.992195 7.992195 0 0 1 7.992195 7.992195v303.703415a7.992195 7.992195 0 0 1-7.992195 7.992195h-47.953171a7.992195 7.992195 0 0 1-7.992195-7.992195V407.601951a7.992195 7.992195 0 0 1 7.992195-7.992195h47.953171z m-607.40683 63.937561c30.897826 0 55.945366 25.04754 55.945366 55.945366s-25.04754 55.945366-55.945366 55.945366-55.945366-25.04754-55.945366-55.945366 25.04754-55.945366 55.945366-55.945366z m335.672195 0c30.897826 0 55.945366 25.04754 55.945366 55.945366s-25.04754 55.945366-55.945366 55.945366-55.945366-25.04754-55.945365-55.945366 25.04754-55.945366 55.945365-55.945366z"
                  fill="#ffffff" p-id="11404"></path>
            </svg>
          </template>
        </icon>
      </div>
      <span class="div1-title">AI对话</span>
      <FormOutlined class="div1-edit" @click="show_edit"/>
    </div>
    <div class="div2">
      <div>全局变量</div>
    </div>
  </div>
</template>

<script setup>
import {Position, Handle} from '@vue-flow/core';
import Icon, {FormOutlined} from "@ant-design/icons-vue";

const props = defineProps(['data']);
</script>

<style scoped>
.selected {
  border: 1px solid #336ffd;
}

.div2 {
  display: flex;
  flex-direction: row;
  margin-top: 1vh;
  background: #f5f6f8;
  border-radius: 5px;
  overflow: hidden;
}

.div1 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  .div1-ico {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #296ffd;
    border-radius: 7px;
    width: 1.25vw;
    height: 2.5vh;
    margin-right: 0.3vw;
  }

  .div1-title {
    font-weight: 900;
    margin-right: 3.7vw;
  }

  .div1-edit {
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    background: #296ffd;
    border-radius: 7px;
    width: 1.25vw;
    height: 2.5vh;
    font-size: 12px;
  }
}

.ai-node {
  background: #fdfdfd;
  padding: 1vh;
  border-radius: 5px;
  width: 10vw;
  height: 30vh;
}
</style>