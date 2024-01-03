<template>
  <view class="c-card">
    <text class="font-600">{{ title }}</text>
    <slot></slot>
    <view v-if="showFooter">
      <slot name="footer">
        <u-button text="编辑" @click="handleEdit" />
        <u-button text="删除" @click="handleDel" />
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
interface TProps {
  title?: string;
  showFooter?: boolean;
}
withDefaults(defineProps<TProps>(), {
  showFooter: false,
});

const emits = defineEmits(['handleEdit', 'handleDel']);

const handleEdit = () => {
  emits('handleEdit');
};

// 处理删除
const handleDel = () => {
  emits('handleDel');
};
</script>

<style lang="scss" scoped>
.c-card {
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 8px;
  background-color: #fff;
}
</style>
