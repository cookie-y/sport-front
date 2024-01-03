<!-- 验证码校验 -->
<template>
  <view>
    <navigationBar title="校验验证码" />
    <view class="h-80 flex flex-col justify-between m-10">
      <text>验证码已发送至邮箱：{{ encryptEmail(email) }}</text>
      <u-code-input focus @finish="handleFinish" class="code" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import { encryptEmail } from '@/utils/desensitization';
import { authCode } from '@/api/auth';

const email = ref<string | undefined>('');

onLoad((option) => {
  email.value = option.email;
});

const handleFinish = async (code: string) => {
  try {
    await authCode({ data: { code, email: email.value } });
    uni.navigateTo({ url: `/pages/auth/resetPassword?email=${email.value}` });
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="scss" scoped>
.code {
  justify-content: center;
  :deep {
    .u-code-input__item {
      background-color: #fff;
    }
  }
}
</style>
