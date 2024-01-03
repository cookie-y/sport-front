<template>
  <view :class="$style.message">
    <u-text :text="dayjs(props.time).calendar()" align="center" color="#666" :size="14" />

    <view :class="$style.content">
      <u-text v-if="title" :text="title" :size="16" color="#333" class="mb-10" />
      <u-text :text="content" color="#666" />
      <view class="flex mt-5 flex-row-reverse" v-if="false">
        <view>
          <u-button text="录入比赛成绩" size="small" type="primary" />
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';

interface TMessage {
  time: string;
  title?: string;
  content: string;
}

const props = withDefaults(defineProps<TMessage>(), {});
</script>

<style lang="scss" module>
.message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
}

.content {
  display: flex;
  flex-direction: column;
  width: 315px;
  padding: 15px;
  margin: 5px 15px;
  border-radius: 4px;
  background-color: $u-gray9;
}
</style>
