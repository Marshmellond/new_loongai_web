<script setup lang="ts">
import {ref} from 'vue';
import {message} from "ant-design-vue";
import {onMounted} from "vue";
import {useCounterStore} from '@/stores/counter'
import Icon from "@ant-design/icons-vue";

const counter = useCounterStore()
localStorage.setItem('selectedKey', "7");
counter.selectedKeys = [localStorage.getItem("selectedKey")]
const get_data = () => {
  const url = "/api/gallery/get_img"
  fetch(url).then((res) => {
    if (res.ok) {
      return res.json()
    }
  }).then((data) => {
    counter.gallery_img_list = []
    if (data["code"] == 1) {
      for (let i of data["img_list"]) {
        counter.gallery_img_list.push(i)
      }
    }
  }).catch(() => {
    message.error("获取失败")
  })
}
onMounted(get_data)
</script>

<template>
  <div class="div1">
    <div class="container" v-if="counter.gallery_img_list.length!==0">
      <div class="div2" v-for="(item) in counter.gallery_img_list" :key="item[0]">
        <a-image :src="item[1]"/>
      </div>
    </div>
    <div class="blank" v-if="counter.gallery_img_list.length===0">
      <icon :style="{ color: '#8994a6'}" class="icon-ai-blue">
        <template #component>
          <svg t="1720846833394" class="icon" viewBox="0 0 1281 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               p-id="4813" width="128" height="128">
            <path
                d="M106.805737 997.298566a80.104302 80.104302 0 0 1-80.104303-80.104303V106.805737a80.104302 80.104302 0 0 1 80.104303-80.104303h1068.057366a80.104302 80.104302 0 0 1 80.104302 80.104303v825.074315a80.104302 80.104302 0 0 1-80.104302 65.418514z"
                fill="#9FDBAD" p-id="4814"></path>
            <path
                d="M1174.863103 53.402868a53.402868 53.402868 0 0 1 53.402868 53.402869v822.404172a53.402868 53.402868 0 0 1-53.402868 41.387223H106.805737a53.402868 53.402868 0 0 1-53.402869-53.402869V106.805737a53.402868 53.402868 0 0 1 53.402869-53.402869h1068.057366m0-53.402868H106.805737a106.805737 106.805737 0 0 0-106.805737 106.805737v810.388526a106.805737 106.805737 0 0 0 106.805737 106.805737h1068.057366a106.805737 106.805737 0 0 0 106.805737-106.805737h-1.335072V106.805737a106.805737 106.805737 0 0 0-106.805737-106.805737z"
                fill="#5C2D51" p-id="4815"></path>
            <path
                d="M299.056063 400.521512a99.863364 99.863364 0 0 1-100.931422-101.465449A100.931421 100.931421 0 1 1 299.056063 400.521512z"
                fill="#F05071" p-id="4816"></path>
            <path
                d="M299.056063 223.491004a73.695958 73.695958 0 0 1 74.764015 74.497001A75.03103 75.03103 0 0 1 299.056063 373.820078a73.428944 73.428944 0 0 1-74.229987-74.764015 75.03103 75.03103 0 0 1 74.229987-75.565059m0-53.402868a128.166884 128.166884 0 1 0 128.166884 127.899869 128.166884 128.166884 0 0 0-128.166884-127.899869z"
                fill="#5C2D51" p-id="4817"></path>
            <path
                d="M198.124641 827.744459v-93.45502l186.91004-186.910039 70.224771 69.957758a51.266754 51.266754 0 0 0 72.360887 0l305.731421-302.794264 252.328553 252.061539v260.605997z"
                fill="#FDCA89" p-id="4818"></path>
            <path
                d="M833.35176 352.191917l224.559061 224.292046V801.043025H224.826076v-53.402869l160.208605-160.208605 51.266753 51.266754a77.968188 77.968188 0 0 0 110.276923 0l286.773403-286.506388m0-65.1515a24.565319 24.565319 0 0 0-17.355932 7.209387L509.196349 599.714211a24.565319 24.565319 0 0 1-34.711864 0l-71.559844-71.559843a24.565319 24.565319 0 0 0-34.711864 0l-189.847197 189.580182a23.230248 23.230248 0 0 0-6.942373 16.554889v95.591135a23.230248 23.230248 0 0 0 23.497262 24.565319h893.162973a23.230248 23.230248 0 0 0 23.230248-23.230248v-267.014341a23.230248 23.230248 0 0 0-6.942373-16.554889L850.707692 293.715776a24.565319 24.565319 0 0 0-17.355932-7.209387z"
                fill="#5C2D51" p-id="4819"></path>
          </svg>
        </template>
      </icon>
      <span style="font-size: 28px;">无生成的图片</span>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "src/assets/css/theme.less";

.blank {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 25vh;
}

.div1 {
  overflow: auto;
  height: 95.5vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container {
  width: 80vw;
  column-count: 4;
  column-gap: 1vh;
  margin-top: 1vh;
}

.div2 {
  margin-bottom: 1vh;
  border-radius: 7px;
  overflow: hidden;

}


@media (max-width: 1200px) {
  .container {
    columns: 4;
  }
}

@media (max-width: 850px) {
  .container {
    columns: 3;
  }
}

@media (max-width: 600px) {
  .container {
    columns: 2;
  }
}


</style>