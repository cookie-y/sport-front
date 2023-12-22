<template>
  <navigationBar title="校验邮箱" />
  <view class="p-15">
    <u-form :model="form" labelWidth="80" :rules="rules" ref="info" errorType="toast">
      <u-form-item label="邮箱" prop="email">
        <u-input class="bg-fff" v-model="form.email" clearable placeholder="请输入邮箱" />
      </u-form-item>
    </u-form>

    <u-button text="提交" @click="handleSubmit" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getCode } from '@/api/auth';

interface TForm {
  email: string; // 邮箱
}
const form = ref<TForm>({
  email: '',
});
const rules = {
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式错误', trigger: 'blur' },
  ],
};

// 处理提交
const info = ref();
const handleSubmit = async () => {
  try {
    await info.value.validate();
    const params = {
      data: form.value,
    };
    await getCode(params);
    uni.navigateTo({ url: `/pages/auth/authCode?email=${form.value.email}` });
  } catch (error) {
    console.log(error);
  }
};
</script>

<style></style>
