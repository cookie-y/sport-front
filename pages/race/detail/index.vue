<template>
  <view>
    <statusBar />

    <view :class="$style['race-inf']">
      <u-icon name="arrow-left" size="20" color="#fff" @click="handleBack" />
      <view class="flex">
        <image class="w-150px h-100px mt-10 ml-5 mr-10 rounded-6" :src="raceData.racePoster" />
        <view class="flex-1 relative">
          <text :class="[$style['race-name'], 'u-line-2']">{{ raceData.raceName }}</text>
          <text :class="$style.organize">{{ raceData.organizerName }}</text>
        </view>
      </view>
    </view>

    <view class="flex flex-row-reverse">
      <u-button
        v-if="raceData.state === ENTER"
        text="立即报名"
        size="mini"
        color="#ED7600"
        class="w-60 mr-10"
        @click="handleParticipate"
      />
    </view>

    <u-divider lineColor="#666" />
    <view>
      <u-tabs
        :list="tabList"
        :lineWidth="40"
        lineColor="#191970"
        class="mt-10 ml-4 mr-4"
        :current="currentTab"
        @click="handleChangeTab"
      />
      <component
        ref="tab"
        :is="tabList[currentTab].component"
        :raceData="raceData"
        :teamList="participateTeams"
        @getTeamList="getparticipateTeams"
      />
    </view>

    <Participate v-if="raceData.state === ENTER" v-model:show="show" :kind="raceData.kind" :raceId="raceData.raceId" />
  </view>
</template>

<script lang="ts" setup>
import { onLoad, onPullDownRefresh } from '@dcloudio/uni-app';
import { ref, shallowRef } from 'vue';
import { isEmpty, toNumber } from 'lodash';
import { getRaceDetail, getParticipateTeamList } from '@/api/race';
import { TRace } from '@/types/object/race';
import { TParticipateTeam } from '@/types/object/account';
import { RACE_STATES, RACE_STATE } from '@/constants/race';
import Notice from './notice.vue';
import Participant from './participant.vue';
import Schedule from './schedule.vue';
import Ranking from './ranking.vue';
import Participate from './participate.vue';

// #region tab处理
interface TTab {
  name: string;
  component: any;
}
const tabList = ref<Array<TTab>>([{ name: '比赛须知', component: shallowRef(Notice) }]);
const initTabData: Array<TTab> = [
  { name: '比赛须知', component: shallowRef(Notice) },
  { name: '参赛人员', component: shallowRef(Participant) },
  { name: '赛程安排', component: shallowRef(Schedule) },
  { name: '积分排名', component: shallowRef(Ranking) },
];
// tab初始化
const { EXAMINE, PREPARE, ENTER, DEADLINE, IN_PROCESS, END } = RACE_STATE;
const tabInit = (state: number) => {
  if (!RACE_STATES.has(state)) {
    return;
  }
  if ([EXAMINE, PREPARE].includes(state)) {
    tabList.value = tabList.value.slice(0, 1);
  }
  if ([ENTER].includes(state)) {
    tabList.value = [...initTabData].slice(0, 2);
  }
  if ([DEADLINE].includes(state)) {
    tabList.value = [...initTabData].slice(0, 3);
  }
  if ([IN_PROCESS, END].includes(state)) {
    tabList.value = [...initTabData];
  }
};
const currentTab = ref<number>(0); // 当前选中tab下标
// 处理切换tab
const handleChangeTab = (tab: { index: number }) => {
  currentTab.value = tab.index || 0;
};
// #endregion

// #region 比赛数据
let raceId: number;
onLoad((option: any) => {
  raceId = toNumber(option.raceId);
});
const raceData = ref<TRace>({
  raceId: 0,
  raceName: '',
  state: 0,
  racePoster: '',
  applyStart: '',
  applyDeadline: '',
  raceStart: '',
  rule: 1,
  kind: 1,
  organizerName: '',
});
// 获取比赛详情
const getDetail = async () => {
  if (!raceId) {
    return;
  }
  const params = { data: { raceId: +raceId } };
  const { data } = await getRaceDetail(params);
  raceData.value = data;
  tabInit(data.state);
};

onLoad(() => {
  getDetail();
});
// #endregion

// #region 处理参赛队伍
const participateTeams = ref<Array<TParticipateTeam>>([]);
const getparticipateTeams = async () => {
  if (!raceId || !isEmpty(participateTeams.value)) {
    return;
  }
  const params = { data: { raceId } };
  const { data } = await getParticipateTeamList(params);
  participateTeams.value = data.list;
};
// #endregion

// 处理回退
const handleBack = () => {
  uni.navigateBack();
};

// #region 下拉刷新处理
const tab = ref();
// 下拉刷新处理
onPullDownRefresh(async () => {
  if (currentTab.value === 0) {
    getDetail();
  } else {
    tab.value.pullDownRefresh(raceId);
  }
  uni.stopPullDownRefresh();
});
// #endregion

// 处理报名
const show = ref(false);
const handleParticipate = () => {
  show.value = true;
};
</script>

<style lang="scss" module>
.race-inf {
  height: 150px;
  padding: 10px;
  background: linear-gradient(to bottom, $u-blue1 0%, $u-blue1 60%, $u-gray8 60.01%, $u-gray8 100%);
  color: white;
}

.race-name {
  position: absolute;
  right: 5px;
  font-size: 20px;
  font-weight: bold;
}

.organize {
  position: absolute;
  bottom: 15px;
  right: 5px;
  font-size: 14px;
  color: #333;
}
</style>
