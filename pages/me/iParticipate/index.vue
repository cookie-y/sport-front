<template>
  <view>
    <navigationBar title="我参加的" />

    <view>
      <raceItem v-for="item in raceList" :key="item.raceId" :raceData="item" @click="handleClick(item.raceId)" />
    </view>
  </view>

  <view class="p-20">
    <u-divider :text="finished ? '已加载完毕' : '加载中'" />
  </view>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue';
import { onReachBottom } from '@dcloudio/uni-app';
import { getRaceList } from '@/api/race';
import { TRace } from '@/types/object/race';
import raceItem from '../components/raceItem.vue';

const raceList = ref<Array<TRace>>([]);

const pageInfo = ref({
  page: 1,
  pageSize: 10,
  total: 0,
});
const getList = async () => {
  const { page, pageSize } = pageInfo.value;
  const { data } = await getRaceList({
    data: { page, pageSize, type: 'attend' },
  });
  const { list, total } = data;
  if (pageInfo.value.page === 1) {
    raceList.value = list;
  } else {
    raceList.value.push(...list);
  }
  pageInfo.value.page += 1;
  pageInfo.value.total = total;
};

// 加载下一页
const finished = computed(() => {
  return pageInfo.value.page > Math.ceil(pageInfo.value.total / pageInfo.value.pageSize);
});
// 触底加载
onReachBottom(() => {
  if (finished.value) {
    return;
  }
  getList();
});

onMounted(() => {
  getList();
});

// 处理点击
const handleClick = (raceId: number) => {
  uni.navigateTo({ url: `/pages/race/detail/index?raceId=${raceId}` });
};
</script>

<style></style>
