<template>
  <cCard :title="dayjs(time, 'HH:mm:ss').format('HH:mm')" @click="handleEdit">
    <view
      v-for="(item, index) in schedule"
      :key="index"
      :class="[$style.content, { [$style.border]: index + 1 !== schedule?.length }]"
    >
      <view class="flex mb-10 items-center">
        <text class="u-line-1 w-100">{{ item.place }}</text>
        <view :class="$style.against">
          <view class="flex items-center">
            <u-image width="35" height="35" shape="circle" :src="item.A?.participateTeam.logo" />
            <text class="u-line-1 w-80 ml-5">{{ item.A?.participateTeam.accountName }}</text>
          </view>
          <view class="flex items-center mt-5">
            <u-image width="35" height="35" shape="circle" :src="item.B?.participateTeam.logo" />
            <text class="u-line-1 ml-5">{{ item.B?.participateTeam.accountName }}</text>
          </view>
        </view>
      </view>
      <view class="flex flex-row-reverse">
        <view
          v-if="!item.results"
          @click.stop="
          () => {
            handleEnterScore(item.id as number);
          }
        "
        >
          <u-button text="录入成绩" />
        </view>
      </view>
    </view>
  </cCard>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
import { TRaceScheduleItem } from '@/types/object/race';

defineProps<{
  time?: string;
  schedule?: Array<TRaceScheduleItem>;
}>();

const emits = defineEmits(['handleEnterScore', 'handleEdit']);
const handleEnterScore = (id: number) => {
  emits('handleEnterScore', id);
};
const handleEdit = () => {
  emits('handleEdit');
};
</script>

<style lang="scss" module>
.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
}
.against {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 150px;
  max-width: 200px;
}

.border {
  border-bottom: 1px solid $u-gray8;
}
</style>
