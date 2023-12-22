<template>
  <view>
    <navigationBar title="分组设置" />
    <view :class="$style.container">
      <text>参赛队伍数量为：{{ participants.length }}</text>
      <u-form :model="form" ref="info" labelWidth="100" errorType="toast" :class="$style.form">
        <u-form-item label="分组数" prop="groupNum">
          <u-number-box v-model="form.groupNum" :max="participants.length" />
        </u-form-item>
      </u-form>
      <view class="flex mt-20 flex-col">
        <view class="flex mb-15">
          <u-button
            :loading="grouping"
            text="开始分组"
            loadingText="分组中"
            type="primary"
            class="mr-20"
            @click="handleGroup"
            v-show="form.groupNum > 1"
          />

          <u-button :loading="grouping" text="确认" type="primary" @click="handleComfirm" />
        </view>

        <view :class="$style['group-results']" v-show="form.groupNum === 1">
          <ParticipateTeam :team-list="participants" />
        </view>

        <view v-show="form.groupNum > 1">
          <view v-for="(item, index) in groupedList" :key="index" class="mb-15">
            <text class="font-bold">{{ String.fromCharCode(index + 65) }}组</text>
            <view :class="[$style['group-results'], 'mt-5']">
              <ParticipateTeam :team-list="item" />
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { random, ceil } from 'lodash';
import { getParticipateTeamList, editGroupInf } from '@/api/race';
import { TParticipateTeam } from '@/types/object/account';
import ParticipateTeam from '@/components/race/participateTeam.vue';

const participants = ref<Array<TParticipateTeam>>([]);
let raceId: number;

// 获取参赛人员信息
const getParticipants = async () => {
  const params = { data: { raceId } };
  const { data } = await getParticipateTeamList(params);
  participants.value = data.list;
};

onLoad((options) => {
  raceId = +(options?.raceId || 0);
  getParticipants();
});

interface TForm {
  groupNum: number; // 小组数量
  hasFixed: boolean; // 是否存在固定位置
  applyDeadline: string; // 报名截止日期
  raceStart: string; // 比赛开始时间
  tips?: string; // 备注
}
const form = ref<TForm>({
  groupNum: 1,
  hasFixed: false,
  raceStart: '',
  applyDeadline: '',
  tips: '',
});

// 分组
const grouping = ref(false);
const groupedList = ref<Array<Array<TParticipateTeam>>>([]);
// 随机分组
const raceArrangement = (group: number, list: Array<TParticipateTeam>) => {
  // 每组名额
  const maxSum = ceil(list.length / group);
  const result: Array<Array<TParticipateTeam>> = [];

  list.forEach((value) => {
    let tem;
    do {
      tem = random(group - 1);
      result[tem] = result[tem] || [];
    } while (result[tem].length >= maxSum);
    result[tem].push(value);
  });

  return result;
};
// 处理分组
const handleGroup = () => {
  grouping.value = true;
  groupedList.value = raceArrangement(form.value.groupNum, participants.value);
  grouping.value = false;
};

// 处理确认分组
const handleComfirm = async () => {
  try {
    const list =
      form.value.groupNum === 1
        ? participants.value.map((item) => item.participateTeam.accountId)
        : groupedList.value.map((group) => group.map((item) => item.participateTeam.accountId));
    const params = {
      data: {
        list,
        raceId,
      },
    };
    await editGroupInf(params);
    uni.navigateTo({ url: `/pages/me/iOrganized/scheduleList?raceId=${raceId}` });
  } catch (err) {
    console.log(err);
  }
};
</script>

<style lang="scss" module>
.container {
  margin: 15px;
}

.form {
  padding: 5px 10px;
  margin-top: 5px;
  border-radius: 4px;
  background: #fff;
}

.group-results {
  display: grid;
  grid-template-columns: repeat(4, 70px);
  grid-row-gap: 5px;
  justify-content: space-between;
  padding: 10px;
  border-radius: 6px;
  background: #fff;
}
</style>
