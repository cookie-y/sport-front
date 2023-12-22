<!-- 验证码校验 -->
<template>
  <navigationBar title="校验验证码" />
  <view class="h-80 flex flex-col justify-between m-10">
    <text>验证码已发送至邮箱:</text>
    <u-code-input focus @finish="handleFinish" class="code" />
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { authCode } from '@/api/auth';

let email: string | undefined;

onLoad((option) => {
  email = option.email;
});

const handleFinish = async (code: string) => {
  try {
    await authCode({ data: { code, email } });
    uni.navigateTo({ url: `/pages/auth/resetPassword?email=${email}` });
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
      background: #fff;
    }
  }
}
</style>
