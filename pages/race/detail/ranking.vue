<template>
  <view class="flex flex-col p-15">
    <view v-for="(item, index) in teamList" :key="index" class="flex-inline items-center justify-between pt-5 pb-5">
      <text>{{ index + 1 }}</text>
      <image :src="item.participateTeam.logo" class="w-50 h-50 rounded-25" />
      <text class="w-150 u-line-1 text-center">{{ item.participateTeam.accountName }}</text>
      <text>{{ item.integral }}</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app';
import { TRace } from '@/types/object/race';
import { TParticipateTeam } from '@/types/object/account';

defineProps<{
  raceData: TRace;
  teamList: Array<TParticipateTeam>;
}>();
const emits = defineEmits(['getTeamList']);

onLoad(() => {
  emits('getTeamList');
});

// 处理下拉刷新数据重新加载
const pullDownRefresh = () => {
  emits('getTeamList');
};
defineExpose({
  pullDownRefresh,
});
</script>

<style></style>
