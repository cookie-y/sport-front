<template>
  <view class="flex justify-between pl-5 pr-15 pt-10">
    <u-icon name="arrow-left" size="18" @click="handleBack" />
    <text class="fs-20">{{ title }}</text>
  </view>
</template>

<script lang="ts" setup>
import { handleBack } from '@/utils/router';

interface navigation {
  title: string; // 标题
}
withDefaults(defineProps<navigation>(), {
  title: '',
});
</script>

<style></style>
