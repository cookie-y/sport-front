<template>
  <view class="mr-5 mt-5 flex-inline flex-col items-center">
    <u-image :src="logo" width="50" height="50" shape="circle" />
    <text class="w-70 text-center fs-14 u-line-1">{{ accountName }}</text>
  </view>
</template>

<script setup lang="ts">
interface TProps {
  accountName: string;
  logo?: string;
}
withDefaults(defineProps<TProps>(), {});
</script>

<style lang="scss"></style>
