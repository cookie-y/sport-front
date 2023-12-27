<template>
  <statusBar />

  <view class="flex m-15 justify-between items-center">
    <!-- 搜索 -->
    <search-box />
    <weather-box />
  </view>

  <view :class="$style.race">
    <recommendCard v-for="item in recommendRace" :key="item.raceId" :recommendRace="item" />
  </view>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import searchBox from './components/searchBox.vue';
import WeatherBox from './components/weather.vue';
import recommendCard from './components/recommendCard.vue';
import { getRecommendRace } from '@/api/race';
import { TRecommendRace } from '@/types/request/race';

const recommendRace = ref<Array<TRecommendRace>>([]);

onMounted(async () => {
  const { data } = await getRecommendRace({});
  recommendRace.value = data.list;
});
</script>

<style lang="scss" module>
.race {
  display: flex;
  flex-direction: column;
  margin: 0 30rpx 20px;
}
</style>
