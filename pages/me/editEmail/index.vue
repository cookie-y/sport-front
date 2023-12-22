<template>
  <navigationBar title="修改邮箱" />
  <view class="p-15">
    <u-form :model="form" labelWidth="80" :rules="rules" ref="info" errorType="toast">
      <u-form-item label="原邮箱" prop="oldEmail">
        <u-input class="bg-fff" placeholder="请输入原绑定完整邮箱" v-model="form.oldEmail" clearable />
      </u-form-item>
      <u-form-item label="新邮箱" prop="newEmail">
        <u-input class="bg-fff" placeholder="请输入新绑定邮箱" v-model="form.newEmail" clearable />
      </u-form-item>
    </u-form>

    <u-button text="提交" @click="handleSubmit" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { validateEmail, editEmail } from '@/api/account';
import { useAccountStore } from '@/store/account';

interface TForm {
  oldEmail: string; // 原邮箱
  newEmail: string; // 新邮箱
}
const form = ref<TForm>({
  oldEmail: '',
  newEmail: '',
});

// 表单校验
// 原密码是否正确
const rules = {
  oldEmail: [
    { required: true, message: '请输入原邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式错误', trigger: 'blur' },
    {
      // eslint-disable-next-line no-unused-vars
      asyncValidator: async (rule: any, value: string, callback: Function) => {
        try {
          const params = {
            data: {
              email: form.value.oldEmail,
            },
          };
          await validateEmail(params);
          callback();
        } catch (error) {
          callback(new Error('原邮箱错误，请重新输入'));
          uni.$u.toast('原邮箱错误，请重新输入');
        }
      },
      trigger: ['blur'],
    },
  ],
  newEmail: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { type: 'email', message: '邮箱格式错误', trigger: 'blur' },
  ],
};

// 处理提交
const info = ref();

const store = useAccountStore();
const { setEmail } = store;
const handleSubmit = async () => {
  try {
    await info.value.validate();
    const params = {
      data: form.value,
    };
    const res = await editEmail(params);
    setEmail(form.value.newEmail);
    uni.$u.toast(res.message);
    uni.navigateBack();
  } catch (error) {
    uni.$u.toast('邮箱修改失败');
  }
};
</script>

<style></style>
