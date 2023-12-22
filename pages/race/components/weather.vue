<template>
  <view :class="$style['weather-box']">
    <u-image v-if="image" :showLoading="true" :src="`/static/images/weather/${image}.png`" width="50px" height="50px" />
    <text v-else class="fs-16">{{ weatherInfo?.weather }}</text>
  </view>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { TWeatherInfo } from '@/types/request/restapi';

const WEATHER = new Map([
  ['晴', 'qing'],
  ['多云', 'duoyun'],
  ['阴', 'yin'],
  ['小雨', 'xiaoyu'],
  ['大雨', 'dayu'],
  ['小雪', 'xiaoxue'],
  ['大雪', 'daxue'],
]);
const props = defineProps<{
  weatherInfo?: TWeatherInfo;
}>();

const image = computed(() => props.weatherInfo?.weather && WEATHER.get(props.weatherInfo?.weather));
</script>

<style lang="scss" module>
.weather-box {
}
</style>
