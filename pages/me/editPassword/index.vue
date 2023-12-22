<template>
  <navigationBar title="修改密码" />
  <view class="p-15">
    <u-form :model="form" labelWidth="80" :rules="rules" ref="info" errorType="toast">
      <u-form-item label="原密码" prop="oldPassword">
        <u-input class="bg-fff" type="password" v-model="form.oldPassword" clearable placeholder="请输入原密码" />
      </u-form-item>
      <u-form-item label="新密码" prop="newPassword">
        <u-input class="bg-fff" type="password" v-model="form.newPassword" clearable placeholder="请输入新密码" />
      </u-form-item>
      <u-form-item label="确认密码" prop="confirmPassword">
        <u-input class="bg-fff" type="password" v-model="form.confirmPassword" clearable placeholder="请再输入一次" />
      </u-form-item>
      <text :class="$style.tips">提示：密码格式为8-12位的字母数字组合</text>
    </u-form>

    <u-button text="提交" class="mt-15" @click="handleSubmit" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { validatePassword, editPassword } from '@/api/account';
import { PASSWORD } from '@/constants/validateRule';

interface TForm {
  oldPassword: string; // 原密码
  newPassword: string; // 新密码
  confirmPassword: string; // 确认密码
}
const form = ref<TForm>({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
});

// 表单校验
// 原密码是否正确
const rules = {
  oldPassword: [
    { required: true, message: '请输入原密码', trigger: 'blur' },
    {
      // eslint-disable-next-line no-unused-vars
      asyncValidator: async (rule: any, value: string, callback: Function) => {
        try {
          const params = {
            data: {
              password: form.value.oldPassword,
            },
          };
          await validatePassword(params);
          callback();
        } catch (error) {
          callback(new Error('原密码错误，请重新输入'));
          uni.$u.toast('原密码错误，请重新输入');
        }
      },
      trigger: ['blur'],
    },
  ],
  newPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' }, ...PASSWORD],
  confirmPassword: [
    ...PASSWORD,
    { required: true, message: '请再次输入新密码', trigger: 'blur' },
    {
      validator: (rule: any, value: string) => {
        return value === form.value.newPassword;
      },
      message: '两次新密码不同，请重新输入',
    },
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
    const res = await editPassword(params);
    uni.$u.toast(res.message);
    uni.navigateBack();
  } catch (error) {
    uni.$u.toast('密码设置失败');
  }
};
</script>

<style lang="scss" module>
.tips {
  color: #999;
  font-size: 14px;
}
</style>
