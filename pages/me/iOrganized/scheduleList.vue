<template>
  <view>
    <navigationBar title="赛程安排" />
    <view class="flex justify-between m-15">
      <u-button type="primary" size="small" text="新增赛程" icon="man-add" class="w-70 m-0" @click="handleAdd" />
      <cCalendar
        v-model:date="date"
        v-slot="slotProps"
        mode="single"
        :minDate="dateList[0]"
        :formatter="formatter"
        @handleConfirm="getSchedules"
      >
        <view class="flex items-center" @click="slotProps.show">
          <u-icon size="25" name="/static/images/calendar.png" />
          <text class="ml-5">{{ date }}</text>
        </view>
      </cCalendar>
    </view>

    <view :class="$style.container">
      <scheduleCard
        v-for="(time, index) in Object.keys(schedules)"
        :key="index"
        :time="time"
        :schedule="schedules[time]"
        @handleEdit="handleEdit"
        @handleEnterScore="handleEnterScore"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import dayjs from 'dayjs';
import { onLoad } from '@dcloudio/uni-app';
import { toNumber } from 'lodash';
import { TRaceSchedule } from '@/types/object/race';
import { getScheduleList, getScheduleDateList } from '@/api/schedule';

let raceId: number;
onLoad((option: any) => {
  raceId = toNumber(option.raceId);
});

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

onMounted(() => {
  getSchedules();
  getDateList();
});

// 处理新增
const handleAdd = () => {
  uni.navigateTo({ url: `/pages/me/iOrganized/editScheduleList?raceId=${raceId}` });
};

// 处理编辑
const handleEdit = () => {
  uni.navigateTo({ url: `/pages/me/iOrganized/editScheduleList?raceId=${raceId}&date=${date.value}` });
};

// 处理成绩录入
const handleEnterScore = (id: number) => {
  uni.navigateTo({ url: `/pages/me/iOrganized/editSchedule?id=${id}` });
};
</script>

<style lang="scss" module>
.container {
  margin: 0 15px;
}
</style>
