<template>
  <view v-if="raceData" class="p-15">
    <u-row justify="space-between">
      <u-col span="4"><text class="fs-14">比赛状态：</text> </u-col>
      <u-col span="8"><u-text :text="RACE_STATES.get(raceData.state)" /></u-col>
    </u-row>
    <u-row justify="space-between" class="mt-10">
      <u-col span="4"><text class="fs-14">场次类型：</text> </u-col>
      <u-col span="8"><u-text :text="RACE_KINDS.get(raceData.kind)" /></u-col>
    </u-row>
    <u-row justify="space-between" class="mt-10">
      <u-col span="4"><text class="fs-14">赛制：</text> </u-col>
      <u-col span="8"><u-text :text="RACE_RULES.get(raceData.rule)" /></u-col>
    </u-row>
    <u-row justify="space-between" class="mt-10">
      <u-col span="4"><text class="fs-14">报名截止日期：</text> </u-col>
      <u-col span="8"><u-text :text="raceData.applyDeadline" /></u-col>
    </u-row>
    <u-row justify="space-between" class="mt-10">
      <u-col span="4"><text class="fs-14">比赛开始日期：</text> </u-col>
      <u-col span="8"><u-text :text="raceData.raceStart" /></u-col>
    </u-row>
    <u-row v-if="raceData.venueImgs" justify="space-between" align="top" class="mt-10">
      <u-col span="4"><text class="fs-14">比赛地点：</text> </u-col>
      <u-col span="8"><u-album rowCount="2" :urls="placeList" /> </u-col>
    </u-row>
    <u-row v-if="raceData.tips" justify="space-between" align="top" class="mt-10">
      <u-col span="4"><text class="fs-14">注意事项：</text> </u-col>
      <u-col span="8"><u-text :text="raceData.tips" /> </u-col>
    </u-row>
    <u-row v-if="raceData.annex" justify="space-between" align="top" class="flex mt-10">
      <u-col span="4"><text class="fs-14">附件</text> </u-col>
    </u-row>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { TRace } from '@/types/object/race';
import { RACE_STATES, RACE_KINDS, RACE_RULES } from '@/constants/race';

const props = defineProps<{
  raceData: TRace;
}>();

const placeList = computed(() => props.raceData.venueImgs?.split(','));
</script>

<style lang="scss" module></style>
