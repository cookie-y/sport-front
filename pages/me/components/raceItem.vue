<template>
  <view :class="$style.race">
    <u-tag :class="$style.tag" :text="RACE_STATES.get(raceData.state)" size="mini" />
    <u-image :src="raceData.racePoster" radius="4" width="120" height="90" />
    <view :class="$style.info">
      <text class="u-line-2 fs-16 font-600">{{ raceData.raceName }}</text>
      <view v-if="showOperation" class="flex">
        <u-tag
          v-if="raceData.state === EDIT"
          type="error"
          text="删除"
          size="mini"
          class="mr-3"
          plain
          @click="delNotice"
        />
        <u-tag v-if="[EDIT, EXAMINE].includes(raceData.state)" text="资料修改" size="mini" plain @click="editNotice" />
        <u-tag v-if="raceData.state === DEADLINE" class="mr-3" text="分组" size="mini" plain @click="editGroup" />
        <u-tag v-if="raceData.state === DEADLINE" text="安排赛程" size="mini" plain @click="editSchedule" />
      </view>
      <view class="flex flex-col items-end">
        <text class="fs-12">{{ raceData.raceStart }}</text>
        <text class="fs-12 mt-2">{{ raceData.organizerName }}</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { TRace } from '@/types/object/race';
import { delRace } from '@/api/race';
import { RACE_STATE, RACE_STATES } from '@/constants/race';

const { DEADLINE, EXAMINE, EDIT } = RACE_STATE;

interface TProps {
  raceData: TRace;
  showOperation?: boolean;
}
const props = withDefaults(defineProps<TProps>(), {
  showOperation: false,
});

const emits = defineEmits(['delRace']);

// 删除比赛
const delNotice = async () => {
  await delRace({ data: { raceId: props.raceData.raceId } });
  emits('delRace');
};

// 修改基本资料
const editNotice = () => {
  uni.navigateTo({ url: `/pages/me/iOrganized/editNotice?raceId=${props.raceData.raceId}` });
};

// 分组
const editGroup = () => {
  uni.navigateTo({ url: `/pages/me/iOrganized/editGroup?raceId=${props.raceData.raceId}` });
};

// 赛程安排
const editSchedule = () => {
  uni.navigateTo({ url: `/pages/me/iOrganized/scheduleList?raceId=${props.raceData.raceId}` });
};
</script>

<style lang="scss" module>
.race {
  position: relative;
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 12px 0;
  border-radius: 4px;
  background: #fff;
}

.info {
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: flex-end;
  justify-content: space-between;
  margin-left: 20px;
  min-height: 90px;
}

.tag {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}
</style>
