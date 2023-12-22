<template>
  <view class="p-15">
    <cCalendar
      v-model:date="date"
      v-slot="slotProps"
      mode="single"
      :minDate="dateList[0]"
      :formatter="formatter"
      @handleConfirm="getSchedules"
    >
      <view class="flex items-center justify-end" @click="slotProps.show">
        <u-icon size="25" name="/static/images/calendar.png" />
        <text class="ml-5">{{ date }}</text>
      </view>
    </cCalendar>
    <view class="mt-10">
      <scheduleCard
        v-for="(time, index) in Object.keys(schedules)"
        :key="index"
        :time="time"
        :schedule="schedules[time]"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import dayjs from 'dayjs';
import { TRaceSchedule, TRace } from '@/types/object/race';
import { TParticipateTeam } from '@/types/object/account';
import { getScheduleList, getScheduleDateList } from '@/api/schedule';

defineProps<{
  raceData: TRace;
  teamList: Array<TParticipateTeam>;
}>();

let raceId = '';

// 处理日期切换
const date = ref(dayjs().format('YYYY-MM-DD'));
const dateList = ref<Array<string>>([]);

// 获取日期列表
const getDateList = async () => {
  const params = { data: { raceId } };
  const { data } = await getScheduleDateList(params);
  dateList.value = data;
};

const formatter = (day: any) => {
  const has = dateList.value.some((item) => dayjs(day.date).isSame(item, 'day'));
  if (has) {
    // eslint-disable-next-line no-param-reassign
    day.bottomInfo = '已安排';
    // eslint-disable-next-line no-param-reassign
    day.dot = true;
  } else {
    // eslint-disable-next-line no-param-reassign
    day.disabled = true;
  }
  return day;
};

// 获取赛程安排
const schedules = ref<TRaceSchedule>({});
const getSchedules = async () => {
  if (!raceId) {
    return;
  }
  const params = { data: { raceId, date: date.value } };
  const { data } = await getScheduleList(params);
  schedules.value = data;
};

onLoad((options) => {
  raceId = options.raceId as string;
  getSchedules();
  getDateList();
});

// 处理下拉刷新数据重新加载
const pullDownRefresh = () => {
  getSchedules();
};
defineExpose({
  pullDownRefresh,
});
</script>

<style lang="scss" module></style>
