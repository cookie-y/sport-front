<template>
  <view :class="$style.race" @click="handleClickRace">
    <image :src="raceData.racePoster" :class="$style.poster" />
    <view :class="$style.intro">
      <u-text :lines="2" :text="raceData.raceName" align="right" bold size="18" :class="$style.title" />
      <u-text :text="raceData.applyStart" align="right" size="12" />
      <u-text :text="raceData.organizerName" align="right" size="12" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { TRace } from '@/types/object/race';

interface Props {
  raceData: TRace;
}

const props = defineProps<Props>();

const handleClickRace = () => {
  uni.navigateTo({ url: `/pages/race/detail/index?raceId=${props.raceData.raceId}` });
};
</script>

<style lang="scss" module>
.race {
  position: relative;
  display: flex;
  justify-content: space-between;
  margin: 0 15px;
  border-bottom: 1px solid #f5f5f5;
  border-radius: 4px;
  background-color: #fff;
}

.poster {
  width: 150px;
  height: 100px;
  border-radius: 4px;
  margin-right: 15px;
}

.intro {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px 5px 5px 0;
}

.title {
  flex: 2;
}
.state {
  position: absolute;
}
</style>
