<template>
  <u-upload
    v-if="accept === 'image'"
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
</template>

<script setup lang="ts">
import { TFile } from '@/types/file';
import { uploadImg } from '@/api/common';

interface cUpload {
  fileList: Array<TFile>;
  type: string;
  accept?: string;
}
const props = withDefaults(defineProps<cUpload>(), {
  accept: 'image',
});
const emit = defineEmits(['update:fileList']);

interface Event {
  file: Array<TFile> | TFile;
  name: string;
  index: number;
}

// 处理删除
const deletePic = (event: Event) => {
  const arr = props.fileList;
  arr.splice(event.index, 1);
  emit('update:fileList', arr);
};

// 处理添加
const afterRead = async (event: Event) => {
  const lists: Array<TFile> = [].concat(event.file);
  const uploadList = lists.map((item) => {
    return uploadImg({ type: props.type, filePath: item.url });
  });

  const res = await Promise.all(uploadList);
  uni.$u.toast('上传成功');
  const arr = props.fileList.concat(res);
  emit('update:fileList', arr);
};
</script>

<style></style>
