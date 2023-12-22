<template>
  <view>
    <u-button plain :text="modelValue || '选择'" size="small" @click="handleChooseTime" />
    <u-datetime-picker
      :show="show"
      v-bind="$attrs"
      :formatter="formatter"
      @cancel="handleCancel"
      @confirm="handleConfirm"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import dayjs from 'dayjs';

interface TProps {
  modelValue: string | number;
  format?: string;
}

const props = withDefaults(defineProps<TProps>(), {
  modelValue: '',
  format: 'YYYY-MM-DD HH:MM',
});

const emit = defineEmits(['update:modelValue', 'handleConfirm']);

// 处理选择时间
const show = ref(false);
const handleChooseTime = () => {
  show.value = true;
};

const config = {
  year: '年',
  month: '月',
  day: '日',
  hour: '时',
  minute: '分',
};

const formatter = (type: keyof typeof config, value: string) => {
  return `${value}${config[type]}`;
};

const handleCancel = () => {
  show.value = false;
};

const handleConfirm = ({ value, mode }: { value: string; mode: string }) => {
  const result = mode === 'time' ? value : dayjs(value).format(props.format);
  emit('update:modelValue', result);
  emit('handleConfirm');
  show.value = false;
};
</script>

<style></style>
