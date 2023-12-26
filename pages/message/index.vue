<template>
  <view>
    <statusBar />

    <ReceivedItem
      v-for="(item, index) in msgList"
      :key="index"
      :time="item.lastOneTime"
      :title="item.senderName"
      :image="item.logo"
      :content="item.content"
      :unread-num="item.unreadNum"
      @click="handleClick(item)"
    />
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { onReachBottom } from '@dcloudio/uni-app';
import { getMsgList } from '@/api/message';
import ReceivedItem from './components/receivedItem.vue';
import { TResponceMsgListItem } from '@/types/request/message';

const msgList = ref<Array<TResponceMsgListItem>>([]);
const pageInfo = ref({
  page: 1,
  pageSize: 10,
  total: 10,
});

const getList = async () => {
  const { data } = await getMsgList({
    data: { ...pageInfo.value },
  });
  const { list, total } = data;
  if (pageInfo.value.page === 1) {
    msgList.value = list;
  } else {
    msgList.value.push(...list);
  }
  pageInfo.value.page += 1;
  pageInfo.value.total = total;
};

onMounted(() => {
  getList();
});

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

// 打开消息详情
const handleClick = (item: TResponceMsgListItem) => {
  uni.navigateTo({ url: `/pages/message/detail?senderId=${item.senderId}&type=${item.type}&title=${item.senderName}` });
};
</script>

<style lang="scss" module></style>
