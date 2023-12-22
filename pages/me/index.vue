<template>
  <view :class="$style.container">
    <view :class="$style.info" @click="handleEdit">
      <image :src="accountInfo?.logo" :class="$style.logo" />
      <view class="flex flex-col items-center">
        <text>{{ accountInfo?.accountName }}</text>
        <text>排球队</text>
      </view>
    </view>

    <view class="mt-50">
      <u-cell-group class="bg-fff">
        <u-cell title="我的队员" isLink url="/pages/member/list">
          <template #icon>
            <u-icon size="20" name="/static/images/myMember.png" />
          </template>
        </u-cell>
      </u-cell-group>
      <u-cell-group class="mt-10 bg-fff">
        <u-cell icon="setting-fill" title="我举办的" isLink url="/pages/me/iOrganized/index">
          <template #icon>
            <u-icon size="20" name="/static/images/medal.png" />
          </template>
        </u-cell>
        <u-cell icon="integral-fill" title="我参加的" isLink url="/pages/me/iParticipate/index">
          <template #icon>
            <u-icon size="20" name="/static/images/list.png" />
          </template>
        </u-cell>
      </u-cell-group>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAccountStore } from '@/store/account';

const store = useAccountStore();

const accountInfo = ref({});
onMounted(async () => {
  const { getAccountInfo } = store;
  accountInfo.value = await getAccountInfo();
});

// 处理编辑
const handleEdit = () => {
  uni.navigateTo({ url: '/pages/me/editSelect/index' });
};
</script>

<style lang="scss" module>
.container {
  height: 90vh;
  padding-top: 20px;
}

.info {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 20px;
  padding: 25px 0;
  border-radius: 8px;
  background: #fff;
  .logo {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
}
</style>
