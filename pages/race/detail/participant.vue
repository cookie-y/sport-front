<template>
  <view class="p-15">
    <view v-for="key in Array.from(participateTeams.keys()).sort()" :key="key" class="mb-10">
      <view>{{ key }}</view>
      <scroll-view scroll-x :class="$style.team">
        <view
          v-for="team in participateTeams.get(key)"
          :key="team.participateTeam.accountId"
          class="flex-inline flex-col items-center"
          @click="
            () => {
              handleClickTeam(team.id);
            }
          "
        >
          <u-image :src="team.participateTeam.logo" width="50" shape="circle" height="50" />
          <text class="w-70 text-center fs-14 u-line-1">{{ team.participateTeam.accountName }}</text>
        </view>
      </scroll-view>
    </view>

    <!-- 展示参赛队员列表 -->
    <u-action-sheet :show="show" title="参赛队员列表" @close="show = false">
      <view class="flex pb-10 pt-5">
        <cAvatar v-for="item in memberList" :key="item.studentId" :text="item.name" :avatar="item.image" />
      </view>
    </u-action-sheet>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { isEmpty, sortBy } from 'lodash';
import { TRace } from '@/types/object/race';
import { TMember } from '@/types/object/member';
import { TParticipateTeam } from '@/types/object/account';
import { getParticipantList } from '@/api/race';

const props = defineProps<{
  raceData: TRace;
  teamList: Array<TParticipateTeam>;
}>();
const emits = defineEmits(['getTeamList']);

// #region 参赛队伍数据
type ParticipateTeams = Map<string, Array<TParticipateTeam>>;
const participateTeams = computed(() =>
  props.teamList.reduce((lastVal: ParticipateTeams, currentVal: TParticipateTeam) => {
    if (lastVal.has(currentVal.group)) {
      lastVal.get(currentVal.group)?.push(currentVal);
    } else {
      lastVal.set(currentVal.group, [currentVal]);
    }
    return lastVal;
  }, new Map()),
);

console.log(
  sortBy(participateTeams.value.keys(), (a) => {
    console.log(a);
  }),
);
onLoad(() => {
  emits('getTeamList');
});
// #endregion

// #region 参赛队员数据
const show = ref(false); // 参赛队员数据显示和隐藏
const memberList = ref<Array<TMember>>([]);

// 处理参赛队伍的点击事件
const handleClickTeam = async (participateId: number) => {
  const params = {
    data: { participateId },
  };
  const { data } = await getParticipantList(params);
  memberList.value = data.map((item) => item.member);
  if (isEmpty(memberList.value)) {
    uni.$u.toast('该队伍还未添加参赛队员');
  } else {
    show.value = true;
  }
};
// #endregion

// #region 处理下拉刷新数据重新加载
const pullDownRefresh = () => {
  emits('getTeamList');
};
defineExpose({
  pullDownRefresh,
});
// #endregion
</script>

<style lang="scss" module>
.team {
  white-space: nowrap;
  width: 100%;
  margin-top: 5px;
}
</style>
