<template>
  <view :class="$style.card" @click="jumpToDetail">
    <image :src="recommendRace.racePoster" :class="$style.poster" />
    <view :class="$style.description">
      <text class="mb-5 fs-20">{{ recommendRace.raceName }}</text>
      <text class="fs-14 mb-5">{{ recommendRace.organizerName }} {{ recommendRace.raceStart }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { TRecommendRace } from '@/types/request/race';

const props = defineProps<{
  recommendRace: TRecommendRace;
}>();

// 跳转至详情页
const jumpToDetail = () => {
  uni.navigateTo({ url: `/pages/race/detail/index?raceId=${props.recommendRace.raceId}` });
};
</script>

<style lang="scss" module>
.card {
  position: relative;
  margin-bottom: 15px;
  border: 1px solid #999;
  border-radius: 8px;
  font-size: 0;
  background: #fff;
}

.description {
  display: flex;
  position: absolute;
  bottom: 0;
  left: 15px;
  flex-direction: column;
  color: white;
}

.poster {
  width: 100%;
  height: 200px;
  border-radius: 8px;
}
</style>
