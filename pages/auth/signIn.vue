<template>
  <view :class="$style.container">
    <view>
      <u-form :model="form" labelWidth="80" :rules="rules" ref="info" errorType="toast">
        <u-form-item label="账号" prop="accountId">
          <u-input class="bg-fff" v-model="form.accountId" clearable />
        </u-form-item>
        <u-form-item label="密码" prop="password">
          <u-input class="bg-fff" type="password" v-model="form.password" clearable />
        </u-form-item>
        <u-form-item prop="agree">
          <u-checkbox-group v-model="form.agree">
            <u-checkbox :name="true" />
            <view class="flex items-center mt-5 mb-5">
              <text>同意</text>
              <cLink text="《隐私协议》" path="/pages/auth/privacyAgreement" />
            </view>
          </u-checkbox-group>
        </u-form-item>
      </u-form>
      <u-button text="登录" @click="handleSignIn" />
    </view>
    <view class="flex justify-between">
      <cLink text="注册" path="/pages/auth/signUp" color="#333" />
      <cLink text="忘记密码" path="/pages/auth/authEmail" color="#333" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { signIn } from '@/api/auth';
import { useAccountStore } from '@/store/account';

interface TForm {
  accountId: string; // 账号
  password: string; // 密码
  agree: Array<boolean>;
}
const form = ref<TForm>({
  accountId: '',
  password: '',
  agree: [],
});

const rules = {
  accountId: [{ required: true, message: '请输入账号', trigger: ['change', 'blur'] }],
  password: [{ required: true, message: '请输入密码', trigger: ['change', 'blur'] }],
  agree: [{ required: true, type: 'array', message: '请勾选隐私协议', trigger: 'change' }],
};

// 处理登录
const info = ref();
const store = useAccountStore();
const { setToken, getAccountInfoAction } = store;
const handleSignIn = async () => {
  try {
    console.log('fhuwohfod');
    await info.value.validate();
    const { accountId, password } = form.value;
    const params = {
      data: {
        accountId: +accountId,
        password,
      },
    };
    const res = await signIn(params);
    setToken(res.data);
    getAccountInfoAction();
    uni.$u.toast(res.message);
    uni.switchTab({ url: '/pages/race/index' });
  } catch (errors: any) {
    console.log(errors);
    if (errors?.data?.message) {
      uni.$u.toast(errors?.data?.message);
    } else {
      console.log(errors);
    }
  }
};
</script>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 8rem;
  height: 400px;
  margin: 50px auto;
  padding: 100px 20px 0;
  background: url('/static/images/volleyball.png') 60% top;
}
</style>
