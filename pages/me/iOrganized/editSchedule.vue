<template>
  <view :model="form">
    <navigationBar title="成绩录入" />
    <u-form labelWidth="80" :model="form">
      <view :class="$style.info">
        <u-form-item label="比赛日期">
          <u-input v-model="form.date" disabled />
        </u-form-item>
        <u-form-item label="比赛时间">
          <u-input v-model="form.time" disabled />
        </u-form-item>
        <u-form-item label="比赛场地">
          <u-input v-model="form.place" disabled />
        </u-form-item>
        <u-form-item label="参赛方A">
          <ParticipateTeam v-bind="form.A.participateTeam" />
        </u-form-item>
        <u-form-item label="参赛方B">
          <ParticipateTeam v-bind="form.B.participateTeam" />
        </u-form-item>
      </view>
      <view :class="$style.info">
        <view class="flex mr-45">
          <u-text :text="form.A.participateTeam.accountName" align="center" />
          <u-text :text="form.B.participateTeam.accountName" align="center" />
        </view>
        <view v-for="(round, index) in form.scores" :key="`round${index}`" class="flex">
          <form-item>
            <u-input v-model="round[0]" />
          </form-item>
          <form-item>
            <u-input v-model="round[1]" />
          </form-item>
          <view class="flex items-center w-60 justify-center">
            <u-icon v-if="form.scores.length > 1" name="trash" size="22" @click="handleDelRound(index)" />
            <u-icon v-if="form.scores.length < 5" name="plus-circle" size="20" @click="handleAddRound" />
          </view>
        </view>
      </view>
    </u-form>
    <view class="flex">
      <u-button text="返回" class="w-200" @click="handleBack" />
      <u-button text="提交" class="w-200" type="primary" @click="handleSubmit" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { toNumber } from 'lodash';
import { onLoad } from '@dcloudio/uni-app';
import { TRaceScheduleItem } from '@/types/object/race';
import { getScheduleDetail, enterScore } from '@/api/schedule';
import ParticipateTeam from '@/components/race/participate.vue';
import { handleBack } from '@/utils/router';

let id: number;
onLoad((option: any) => {
  id = toNumber(option.id);
});

interface TForm extends TRaceScheduleItem {
  scores: Array<Array<number>>;
}

// 赛程详情
const form = ref<TForm>({
  id: 0, // 赛程id
  raceId: 0,
  date: '',
  time: '',
  place: '',
  A: {
    id: 0, // 参赛id
    group: '',
    participateTeam: {
      accountId: 0,
      accountName: '',
    },
  },
  B: {
    id: 0, // 参赛id
    group: '',
    participateTeam: {
      accountId: 0,
      accountName: '',
    },
  },
  scores: [],
});

// 获取赛程详情
const getSchedule = async () => {
  const params = {
    data: { id },
  };
  const { data } = await getScheduleDetail(params);
  const scores = data.results
    ? data.results.split(' ').map((item) => {
        const arr = item.split(',');
        return [+arr[0], +arr[1]];
      })
    : [[]];

  form.value = { ...data, scores };
};

onMounted(async () => {
  getSchedule();
});

// 处理新增一局成绩
const handleAddRound = () => {
  form.value.scores.push([]);
};

// 处理删除一局成绩
const handleDelRound = (index: number) => {
  form.value.scores.splice(index, 1);
};

// 处理保存
const handleSubmit = async () => {
  const { scores, raceId } = form.value;
  const params = {
    data: {
      id,
      results: scores.map((ietm) => ietm.join(',')).join(' '),
    },
  };
  await enterScore(params);
  uni.redirectTo({ url: `/pages/me/iOrganized/scheduleList?raceId=${raceId}` });
};
</script>
<style lang="scss" module>
.info {
  padding: 10px;
  border-radius: 8px;
  margin: 15px;
  background: #fff;
}
</style>
