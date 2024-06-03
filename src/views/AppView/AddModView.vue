<script lang="ts" setup>
import {reactive, ref} from 'vue';
import {PlusOutlined} from '@ant-design/icons-vue';
import type {Rule} from 'ant-design-vue/es/form';


const form = reactive({
  chat_mod_name: '',
  chat_mod_label: '',
  chat_mod_desc: '',
  chat_mod_system: ''
});

const rules: Record<string, Rule[]> = {
  chat_mod_name: [{required: true, message: '请输入应用名称'}],
  chat_mod_label: [{required: true, message: '请输入应用标签'}],
  chat_mod_desc: [{required: true, message: '请输入应用描述'}],
  chat_mod_system: [{required: true, message: '请输入应用设定'}],
};

const open = ref<boolean>(false);

const showDrawer = () => {
  open.value = true;
};

const onClose = () => {
  open.value = false;
};
const add_mod_func = () => {
  validate()
    .then(() => {
      alert('表单验证成功');
      // 在这里添加你的表单提交逻辑
      // ...
      resetFields();
    })
    .catch((error) => {
      console.log('error', error);
      alert('表单验证失败');
    });
};
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

const fileList = ref<UploadProps['fileList']>([
  {
    uid: '-1',
    name: 'image.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
]);

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
    <a-form :model="form" :rules="rules" layout="vertical">
      <a-row :gutter="16">
        <a-col :span="16">
          <a-form-item label="应用名称" name="chat_mod_name">
            <a-input v-model:value="form.chat_mod_name" placeholder="输入应用名称"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="16">
          <a-form-item label="头像">
            <a-upload
                v-model:file-list="fileList"
                list-type="picture-card"
                @preview="handlePreview"
            >
              <div v-if="fileList.length < 1">
                <plus-outlined/>
                <div style="margin-top: 8px">Upload</div>
              </div>
            </a-upload>
            <a-modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
              <img alt="example" style="width: 100%" :src="previewImage"/>
            </a-modal>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="16">
          <a-form-item label="应用标签" name="chat_mod_label">
            <a-input v-model:value="form.chat_mod_label" placeholder="输入应用标签"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="16">
          <a-form-item label="应用描述" name="chat_mod_desc">
            <a-input v-model:value="form.chat_mod_desc" placeholder="输入应用描述"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="16">
          <a-form-item label="应用设定" name="chat_mod_system">
            <a-input v-model:value="form.chat_mod_system" placeholder="输入应用设定"/>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <template #extra>
      <a-space>
        <a-button @click="onClose">返回</a-button>
        <a-button type="primary" @click="add_mod_func">提交</a-button>
      </a-space>
    </template>
  </a-drawer>
</template>

<style scoped lang="less">
@import "src/assets/css/theme.less";

.app-add {
  position: absolute;
  right: 0;
  z-index: 1;
}

/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>