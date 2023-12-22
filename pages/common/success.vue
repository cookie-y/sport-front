<template>
  <navigationBar title="成功" />
  <view class="flex flex-col items-center mt-15">
    <u-image src="/static/images/success.png" />
    <text :class="$style.text">{{ text }}</text>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';

const text = ref<string | undefined>('');

onLoad((option) => {
  console.log(option);
  text.value = option.text;
});
</script>

<style lang="scss" module>
.text {
  margin-top: 15px;
  font-size: 14px;
  color: $u-gray1;
}
</style>
