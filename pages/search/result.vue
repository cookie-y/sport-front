<template>
  <view>
    <navigationBar title="搜索结果" />

    <cTabs :list="tabList" :lineWidth="30" :current="currentTab" @click="handleChangeRaceState" />

    <race-item v-for="item in raceList" :key="item.raceId" :raceData="item" />

    <view v-show="finished" class="p-20">
      <u-divider text="已加载完毕" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue';
import { onLoad, onReachBottom } from '@dcloudio/uni-app';
import { pick } from 'lodash';
import { RACE_STATES } from '@/constants/race';
import { getRaceList } from '@/api/race';
import { TRace } from '@/types/object/race';
import raceItem from './components/raceItem.vue';

const params = ref({
  keyword: '', // 模糊搜索关键词
  state: 2, // 比赛状态
  page: 1, // 当前页
  pageSize: 10, // 每页数量
  total: 0, // 总数
});

const raceList = ref<Array<TRace>>([]);
const getList = async () => {
  const { data } = await getRaceList({
    data: pick(params.value, ['keyword', 'page', 'pageSize', 'state']),
  });
  const { list, total } = data;
  if (params.value.page === 1) {
    raceList.value = list;
  } else {
    raceList.value.push(...list);
  }
  params.value.page += 1;
  params.value.total = total;
};

onLoad((options) => {
  params.value.keyword = options?.keyword || '';
});

onMounted(() => {
  getList();
});

// 加载下一页
const finished = computed(() => {
  return params.value.page > Math.ceil(params.value.total / params.value.pageSize);
});
// 触底加载
onReachBottom(() => {
  if (finished.value) {
    return;
  }
  getList();
});

// 切换tab栏
const tabList = [...RACE_STATES.keys()]
  .filter((key) => ![0, 1].includes(key))
  .map((key) => ({ value: key, name: RACE_STATES.get(key) }));

const currentTab = ref<number>(0); // 当前选中tab下标
const handleChangeRaceState = ({ index, value }: { index: number; value: number }) => {
  currentTab.value = index;
  params.value.state = value;
  params.value.page = 1;
  getList();
};
</script>

<style lang="scss" module></style>
