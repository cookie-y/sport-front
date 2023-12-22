<template>
  <view :class="$style['c-avatar']" :style="{ flexDirection: direction }">
    <u-image :src="avatar" width="50" height="50" shape="circle" />
    <text class="w-70 text-center fs-14 u-line-1">{{ text }}</text>
  </view>
</template>

<script setup lang="ts">
import { FlexDirectionProperty } from 'csstype';

interface TProps {
  avatar?: string;
  text: string;
  direction: FlexDirectionProperty;
}
withDefaults(defineProps<TProps>(), {
  direction: 'column',
});
</script>

<style lang="scss" module>
.c-avatar {
  display: inline-flex;
  align-items: center;
  margin: 0 5px;
}
</style>
