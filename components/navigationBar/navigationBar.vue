<template>
  <view class="flex justify-between pl-5 pr-15 pt-10">
    <u-icon name="arrow-left" size="18" @click="handleBack" />
    <text class="fs-20">{{ title }}</text>
  </view>
</template>

<script lang="ts" setup>
interface navigation {
  title: string; // 标题
}
withDefaults(defineProps<navigation>(), {
  title: '',
});
// 处理回退
const handleBack = () => {
  uni.navigateBack();
};
</script>

<style></style>
