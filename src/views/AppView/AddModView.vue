<script lang="ts" setup>
import {reactive, ref} from 'vue';
import {PlusOutlined} from '@ant-design/icons-vue';
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()

const formState = reactive({
  chat_mod_name: '',
  chat_mod_img_name: '',
  chat_mod_img_data: '',
  chat_mod_label: '',
  chat_mod_desc: '',
  chat_mod_system: ''
});

const open = ref<boolean>(false);

const showDrawer = () => {
  open.value = true;
};

const onClose = () => {
  open.value = false;
};
const get_data = () => {
  const url = "/api/app/get_app_data"
  fetch(url).then((res) => {
    if (res.ok) {
      return res.json()
    }
  }).then((data) => {
    if (data["code"] == 1) {
      counter.app_user_data = []
      for (let i of data["user_data"]) {
        counter.app_user_data.push(i)
      }
    }
  })
}

// ------------------上传---------------------------
import type {UploadProps} from 'ant-design-vue';

function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const previewVisible = ref(false);
const previewImage = ref('');
const previewTitle = ref('');

let fileList = ref<UploadProps['fileList']>([]);

const handleCancel = () => {
  previewVisible.value = false;
  previewTitle.value = '';
};
const handlePreview = async (file: UploadProps['fileList'][number]) => {
  if (!file.url && !file.preview) {
    file.preview = (await getBase64(file.originFileObj)) as string;
  }
  previewImage.value = file.url || file.preview;
  previewVisible.value = true;
  previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
};

const onFinish = (values: any) => {
  const url = "/api/app/add_user_mod"
  let body = {
    chat_mod_name: values.chat_mod_name,
    chat_mod_img_name: fileList.value[0]["name"],
    chat_mod_img_data: fileList.value[0]["thumbUrl"],
    chat_mod_label: values.chat_mod_label,
    chat_mod_desc: values.chat_mod_desc,
    chat_mod_system: values.chat_mod_system,
  }
  fetch(url, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body)
  }).then((res) => {
    if (res.ok) {
      return res.json()
    }
  }).then((data) => {
    if (parseInt(data["code"]) === 1) {
      onClose()
      get_data()
      formState.chat_mod_name = ""
      formState.chat_mod_img_name = ""
      formState.chat_mod_img_data = ""
      fileList = ref<UploadProps['fileList']>([])
      formState.chat_mod_label = ""
      formState.chat_mod_desc = ""
      formState.chat_mod_system = ""
    }
  })
};
</script>
<template>
  <a-button type="primary" @click="showDrawer" class="app-add">
    <template #icon>
      <PlusOutlined/>
    </template>
    增加应用
  </a-button>
  <a-drawer
      title="填写应用信息"
      :width="540"
      :open="open"
      :body-style="{ paddingBottom: '80px' }"
      :footer-style="{ textAlign: 'right' }"
      @close="onClose"
  >
    <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 0 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @finish="onFinish"
        class="ant-form"
    >
      <a-form-item
          label="应用名称"
          name="chat_mod_name"
          :rules="[{ required: true, message: '请输入应用名称' }]"
      >
        <a-input v-model:value="formState.chat_mod_name"/>
      </a-form-item>

      <a-form-item
          label="应用头像"
          name="chat_mod_img_name"
          style="margin-left: 10px"
      >
        <a-upload
            v-model:file-list="fileList"
            list-type="picture-card"
            @preview="handlePreview"
        >
          <div v-if="fileList.length < 1">
            <plus-outlined/>
            <div style="margin-top: 8px">上传</div>
          </div>
        </a-upload>
        <a-modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
          <img alt="example" style="width: 100%" :src="previewImage"/>
        </a-modal>
      </a-form-item>

      <a-form-item
          label="应用标签"
          name="chat_mod_label"
          :rules="[{ required: true, message: '请输入应用标签' }]"
      >
        <a-input v-model:value="formState.chat_mod_label"/>
      </a-form-item>

      <a-form-item
          label="应用描述"
          name="chat_mod_desc"
          :rules="[{ required: true, message: '请输入应用描述' }]"
      >
        <a-input v-model:value="formState.chat_mod_desc"/>
      </a-form-item>

      <a-form-item
          label="应用设定"
          name="chat_mod_system"
          :rules="[{ required: true, message: '请输入应用设定' }]"
      >
        <a-input v-model:value="formState.chat_mod_system"/>
      </a-form-item>


      <a-form-item :wrapper-col="{ offset: 16, span: 16 }">
        <a-button type="primary" html-type="submit">提交</a-button>
      </a-form-item>
    </a-form>
  </a-drawer>
</template>

<style scoped lang="less">
@import "src/assets/css/theme.less";

.app-add {
  position: absolute;
  right: 0;
  z-index: 1;
}
</style>