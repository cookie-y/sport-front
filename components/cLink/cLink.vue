<template>
  <text v-bind="$attrs" class="font-bold underline c-link" :style="{ color }" @click="handleClick">{{ text }}</text>
</template>

<script setup lang="ts">
interface TProps {
  text: string; // 链接文字
  path: string; // 跳转路径
  color?: string; // 链接颜色
}

const props = withDefaults(defineProps<TProps>(), {
  text: '',
  color: '#003eb3',
});

const handleClick = () => {
  uni.navigateTo({ url: props.path });
};
</script>

<style lang="scss">
.c-link {
}
</style>
