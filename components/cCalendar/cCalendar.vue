<template>
  <view>
    <slot :show="handleChooseDate">
      <u-button :text="dateLabel || '选择日期'" size="small" :disabled="disabled" @click="handleChooseDate" />
    </slot>
    <u-calendar :show="show" v-bind="$attrs" @confirm="handleConfirm" @close="handleClose" />
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { isString } from 'lodash';

const show = ref(false);

const handleChooseDate = () => {
  show.value = true;
};

interface Props {
  date: Array<string> | string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  date: '',
  disabled: false,
});

const dateLabel = computed(() => {
  return Array.isArray(props.date) ? props.date.join('-') : props.date;
});

const emit = defineEmits(['update:date', 'handleConfirm']);

const handleConfirm = (value: Array<string>) => {
  if (isString(props.date)) {
    const [date] = value;
    emit('update:date', date);
  } else {
    emit('update:date', value);
  }
  emit('handleConfirm');
  show.value = false;
};
const handleClose = () => {
  show.value = false;
};
</script>
