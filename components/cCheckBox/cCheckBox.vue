<template>
  <view :class="['c-check-box', { 'c-check-box-checked': checked }]" @click="handleCheck">
    <slot>{{ label }}</slot>
  </view>
</template>

<script setup lang="ts">
interface TProps {
  value: string | number;
  label: string;
  checked?: boolean;
}
const props = withDefaults(defineProps<TProps>(), {
  checked: false,
});
const emit = defineEmits(['change']);
// 处理选中切换
const handleCheck = () => {
  emit('change', props.checked, props.value);
};
</script>

<style lang="scss" scoped>
.c-check-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background: #fff;

  &-checked {
    background: $u-orange8 !important;
  }
}
</style>
