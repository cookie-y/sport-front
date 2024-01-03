<template>
  <view class="c-check-box-group">
    <cCheckBox
      v-for="item in list"
      :key="item[valueField]"
      :label="item[labelField]"
      :value="item[valueField]"
      :checked="modelValue.includes(item[valueField])"
      @change="handleChange"
    >
      <slot :data="item"></slot>
    </cCheckBox>
  </view>
</template>

<script setup lang="ts">
interface TProps {
  modelValue: Array<any>; // 绑定值
  list?: Array<any>; // 展示列表
  labelField: string;
  valueField: string;
}
const props = withDefaults(defineProps<TProps>(), {
  modelValue: () => [],
  list: () => [],
  labelField: 'label',
  valueField: 'value',
});
const emit = defineEmits(['update:modelValue']);

const handleChange = (checked: boolean, checkedValue: number) => {
  let lastValue;
  if (checked) {
    // 取消勾选
    lastValue = props.modelValue.filter((item) => item !== checkedValue);
  } else {
    // 添加勾选
    lastValue = [...props.modelValue, checkedValue];
  }
  emit('update:modelValue', lastValue);
};
</script>

<style lang="scss" scoped>
.c-check-box-group {
  border-radius: 10px;
  background-color: #fff;
}
</style>
