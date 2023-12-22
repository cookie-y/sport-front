<template>
  <navigationBar title="重置密码" />
  <view class="p-15">
    <u-form :model="form" labelWidth="80" :rules="rules" ref="info" errorType="toast" labelPosition="top">
      <u-form-item label="密码" prop="password">
        <u-input class="bg-fff" v-model="form.password" clearable placeholder="请输入新密码" password />
      </u-form-item>
      <u-form-item label="请确认" prop="confirm">
        <u-input class="bg-fff" v-model="form.confirm" clearable placeholder="请再输入一次" password />
      </u-form-item>
      <text :class="$style.tips">提示：密码格式为8-12位的字母数字组合</text>
    </u-form>

    <u-button text="提交" @click="handleSubmit" class="mt-15" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { resetPassword } from '@/api/auth';
import { getUrlParam } from '@/utils/router';
import { PASSWORD } from '@/constants/validateRule';

interface TForm {
  password: string; // 密码
  confirm: string; // 确认密码
}
const form = ref<TForm>({
  password: '',
  confirm: '',
});
const rules = {
  password: [...PASSWORD, { required: true, message: '请输入新密码', trigger: 'blur' }],
  confirm: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    ...PASSWORD,
    { validator: (rule: any, value: string) => value === form.value.password, message: '密码不一致，请重新输入' },
  ],
};

// 处理提交
const info = ref();
const email = getUrlParam('email');
const handleSubmit = async () => {
  try {
    await info.value.validate();
    const params = {
      data: { password: form.value.password, email },
    };
    const res = await resetPassword(params);
    uni.$u.toast(res.message);
    uni.navigateTo({ url: `/pages/auth/signIn` });
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="scss" module>
.tips {
  color: #999;
  font-size: 14px;
}
</style>
