<template>
  <view>
    <navigationBar title="设置" />
    <view>
      <u-cell-group class="bg-fff m-15 rounded-8" :border="false">
        <u-cell title="基本资料" isLink value="修改" url="/pages/me/editInf/index" />
        <u-cell title="更改密码" isLink url="/pages/me/editPassword/index" />
        <u-cell isLink :value="accountInfo?.email ? '修改' : '绑定'" url="/pages/me/editEmail/index">
          <template #title>
            <view class="flex mr-5">
              <u-text text="绑定邮箱" />
              <u-text v-if="accountInfo?.email" mode="text" :text="encryptEmail(accountInfo.email)" />
            </view>
          </template>
        </u-cell>
      </u-cell-group>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useAccountStore } from '@/store/account';
import { encryptEmail } from '@/utils/desensitization';

const store = useAccountStore();

const { accountInfo } = store;
</script>

<style lang="scss" module></style>
