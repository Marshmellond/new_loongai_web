<script setup lang="ts">
import {ref, onMounted, onUnmounted, watch} from 'vue'
import Icon, {PlusOutlined} from "@ant-design/icons-vue";
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()
const handleOk = () => {
  counter.start_edit_open = false
}
watch(() => counter.start_edit_open, () => {
  counter.edit_start = !counter.start_edit_open
})
const add_variable1 = () => {
  counter.select_variable_data = "添加变量"
  counter.variable_data = {
    id: `start_variable_${Date.now().toString()}`,
    name: "",
    label: "",
    value: "",
    max_len: "42",
    type: "String",
    must: true
  }
  counter.select_modal_node2 = true
  counter.start_edit_open2 = true
}
const add_variable2 = (item) => {
  counter.select_variable_data = "编辑变量"
  counter.variable_data = item.id
  counter.variable_data = counter.flow_data.nodes[0].data.variable.filter((item) => {
    return item.id == item.id
  })
  counter.variable_data = counter.variable_data[0]
  counter.select_modal_node2 = true
  counter.start_edit_open2 = true
}
const delete_variable = (id) => {
  counter.flow_data.nodes[0].data.variable = counter.flow_data.nodes[0].data.variable.filter(variable => variable.id != id)
}
</script>

<template>
  <a-modal v-model:open="counter.start_edit_open" title="开始" @ok="handleOk" okText="保存" cancelText="关闭">
    <div class="div1">
      <span class="div1-title">全局变量</span>
      <PlusOutlined class="div1-ico" @click="add_variable1"/>
    </div>
    <div class="div2"
         v-for="(item) in counter.flow_data.nodes[0].data.variable" :key="item.id">
      <icon :style="{ color: '#4381fd'}" class="div2-ico-label">
        <template #component>
          <svg t="1719996910739" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               p-id="1478" width="16" height="16">
            <path
                d="M818.412608 812.995801c-28.954791-3.238916-66.230245 10.24726-79.688498 47.46687l-0.223374 0.642199c-8.571958 26.078857-23.370453 36.633255-30.713857 37.135845-6.086928 0.390904-20.354911-6.61744-33.198888-27.363254l-0.16753-0.279217c-22.588646-35.488466-58.635546-114.032175-94.93374-206.620494 72.791842-104.092054 165.436004-224.40661 218.598898-283.656432 20.82958-23.370453 37.973496-48.192834 22.588646-71.647053-16.445874-25.12952-58.21672-27.921688-76.393739-29.038556-33.785243-2.596717-60.953046-2.14997-83.765065 8.376507-23.8172 11.168675-34.06446 29.345694-42.440967 47.187653-15.04979 29.541146-32.165785 59.36151-108.894585 166.915853-39.369581-88.427987-60.087473-123.134646-91.527294-158.902328a188.890222 188.890222 0 0 0-134.247478-63.465998c-43.557834-1.870753-84.128047 11.168675-111.240006 35.516388l-0.279217 0.223373c-18.512079 17.060152-21.611387 39.788406-7.92976 57.909582 14.630965 19.34973 44.870153 29.513225 78.571631 26.525604 26.30223-2.14997 47.857774 4.80253 64.219884 20.662049 37.582593 38.448165 86.333861 118.108742 118.611332 193.218084-30.26711 38.69946-62.209522 78.376179-93.202596 116.852266-56.597262 70.334733-110.067296 136.816273-154.79784 198.243987-12.927742 17.925724-30.713857 42.49681-15.021869 64.750396 14.993947 21.360092 50.119431 24.794459 69.189944 26.609369 57.853738 6.031085 92.532475-7.818073 119.672357-47.801931l0.446747-0.67012c33.366418-52.576539 86.389704-121.850248 136.816273-186.824017 28.647652 81.670939 58.300485 144.187599 85.412444 179.396848 24.543164 32.556689 53.497955 51.320063 88.511753 57.406991a144.131755 144.131755 0 0 0 24.682772 2.066205c31.970333 0 60.925124-9.940121 81.475487-18.288706 64.219883-25.408736 96.469433-89.712385 99.875879-142.400611 1.64738-30.406719-24.766538-47.355184-50.007744-50.147352zM930.825326 111.686754H93.174674a55.843377 55.843377 0 0 1 0-111.686754h837.650652a55.843377 55.843377 0 0 1 0 111.686754z"
                fill="#4381fd" p-id="1479"></path>
          </svg>
        </template>
      </icon>
      <span class="div2-txt-must" v-if="item.must">*</span>
      <span class="div2-txt-label">{{ item.label }}</span>
      <span class="div2-txt-name">{{ item.name }}</span>
      <span class="div2-txt-type">{{ item.type }}</span>
      <icon :style="{ color: '#4381fd'}" class="div2-ico-edit" @click="add_variable2(item)">
        <template #component>
          <svg t="1720003009290" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               p-id="2655" width="16" height="16">
            <path
                d="M775.84 392.768l-155.2-172.352L160.768 643.264l-38.368 187.936 190.56-12.832zM929.952 229.952l-131.2-150.944-0.288-0.32a16 16 0 0 0-22.592-0.96l-131.168 120.576 155.168 172.352 128.832-118.464a15.936 15.936 0 0 0 1.248-22.24zM96 896h832v64H96z"
                p-id="2656"></path>
          </svg>
        </template>
      </icon>
      <icon :style="{ color: '#4381fd'}" class="div2-ico-delete" @click="delete_variable(item.id)">
        <template #component>
          <svg t="1720003065029" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               p-id="3968" width="16" height="16">
            <path
                d="M861.184 192.512q30.72 0 50.688 10.24t31.744 25.6 16.384 33.28 4.608 33.28q0 7.168-0.512 11.264t-0.512 7.168l0 6.144-67.584 0 0 537.6q0 20.48-8.192 39.424t-23.552 33.28-37.376 23.04-50.688 8.704l-456.704 0q-26.624 0-50.176-8.192t-40.448-23.04-26.624-35.84-9.728-47.616l0-527.36-63.488 0q-1.024-1.024-1.024-5.12-1.024-5.12-1.024-31.744 0-13.312 6.144-29.696t18.432-30.208 31.744-23.04 46.08-9.216l91.136 0 0-62.464q0-26.624 18.432-45.568t45.056-18.944l320.512 0q35.84 0 49.664 18.944t13.824 45.568l0 63.488q21.504 1.024 46.08 1.024l47.104 0zM384 192.512l320.512 0 0-64.512-320.512 0 0 64.512zM352.256 840.704q32.768 0 32.768-41.984l0-475.136-63.488 0 0 475.136q0 21.504 6.656 31.744t24.064 10.24zM545.792 839.68q17.408 0 23.552-9.728t6.144-31.232l0-475.136-63.488 0 0 475.136q0 40.96 33.792 40.96zM738.304 837.632q18.432 0 24.576-9.728t6.144-31.232l0-473.088-64.512 0 0 473.088q0 40.96 33.792 40.96z"
                p-id="3969"></path>
          </svg>
        </template>
      </icon>
    </div>
  </a-modal>
</template>

<style scoped lang="less">
.div2 {
  display: flex;
  align-items: center;
  width: 100%;
  height: 4vh;
  border: 1px solid @theme-border-color;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 1vh;

  .div2-ico-label {
    position: relative;
    left: 0.2vw;
  }

  .div2-txt-must {
    position: absolute;
    left: 2.45vw;
    color: red;
    font-weight: 700;
  }

  .div2-txt-label {
    position: relative;
    left: 0.7vw;
  }

  .div2-txt-name {
    position: relative;
    left: 1.2vw;
  }


  .div2-txt-type {
    position: absolute;
    left: 20vw;
  }

  .div2-ico-edit {
    position: absolute;
    left: 22.5vw;
    border-radius: 5px;
    padding: 0.5vh;

    &:hover {
      background: #e8eaee;
    }
  }

  .div2-ico-delete {
    position: absolute;
    left: 24vw;
    border-radius: 5px;
    padding: 0.5vh;

    &:hover {
      background: #e8eaee;
    }
  }

}

.div1 {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 0.5vh;

  .div1-title {
    margin-left: 0.2vw;
  }

  .div1-ico {
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