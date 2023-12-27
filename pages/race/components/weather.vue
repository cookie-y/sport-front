<template>
  <view>
    <u-image v-if="image" :showLoading="true" :src="`/static/images/weather/${image}.png`" width="50px" height="50px" />
    <text v-else class="fs-16">{{ weatherInfo?.weather }}</text>
  </view>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue';
import { TWeatherInfo } from '@/types/request/restapi';
import { getWeatherInfo, getIpInfo } from '@/api/third';

const WEATHER = new Map([
  ['晴', 'qing'],
  ['多云', 'duoyun'],
  ['阴', 'yin'],
  ['小雨', 'xiaoyu'],
  ['大雨', 'dayu'],
  ['小雪', 'xiaoxue'],
  ['大雪', 'daxue'],
]);

// #region 天气信息
const weatherInfo = ref<TWeatherInfo>();
const getWeather = async () => {
  const { adcode } = await getIpInfo();
  const params = {
    data: {
      city: adcode,
    },
  };
  const { lives } = await getWeatherInfo(params);
  console.log('天气', lives);
  [weatherInfo.value] = lives;
};
// #endregion
const image = computed(() => weatherInfo.value?.weather && WEATHER.get(weatherInfo.value?.weather));

onMounted(async () => {
  await getWeather();
});
</script>

<style lang="scss" module></style>
