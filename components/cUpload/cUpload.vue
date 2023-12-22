<template>
  <u-upload
    v-if="!accept"
    v-bind="$attrs"
    :fileList="fileList"
    :previewFullImage="true"
    @delete="deletePic"
    @afterRead="afterRead"
  >
    <slot>
      <u-icon name="/static/images/uploadImg.png" width="60" height="60" />
    </slot>
  </u-upload>
  <view v-else>
    <u-button text="上传附件" icon="plus" type="primary" @click="handleClick" />
  </view>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue';
import { TFile } from '@/types/file';

interface cUpload {
  fileList: Array<TFile>;
  accept?: string;
}
const props = defineProps<cUpload>();
const emit = defineEmits(['update:fileList']);

interface Event {
  file: Array<TFile> | TFile;
  name: string;
  index: number;
}

// 处理文件上传
const inputRef = shallowRef<HTMLInputElement>();

const handleClick = () => {
  inputRef.value!.value = '';
  inputRef.value!.click();
};

// 处理删除
const deletePic = (event: Event) => {
  const arr = props.fileList;
  arr.splice(event.index, 1);
  emit('update:fileList', arr);
};

// 处理添加
const afterRead = (event: Event) => {
  const arr = props.fileList.concat(event.file);
  emit('update:fileList', arr);
};
</script>

<style></style>
