<template>
  <view>
    <navigationBar :title="title" />

    <view>
      <MessageItem
        v-for="item in msgList"
        :key="item.message.messageId"
        :time="item.createdAt"
        :content="item.message.content"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { onLoad, onReachBottom } from '@dcloudio/uni-app';
import { getMsgDetail } from '@/api/message';
import MessageItem from './components/messageItem.vue';
import { TMessage } from '@/types/object/message';

const title = ref('');
const senderId = ref('');

const pageInfo = ref({
  page: 1,
  pageSize: 10,
  total: 0,
});
const finished = computed(() => {
  return pageInfo.value.page > Math.ceil(pageInfo.value.total / pageInfo.value.pageSize);
});

const msgList = ref<Array<{ message: TMessage; createdAt: string }>>([]);
const getList = async () => {
  try {
    const params = {
      data: {
        senderId: +senderId.value,
        ...pageInfo.value,
      },
    };
    const { data } = await getMsgDetail(params);
    const { list, total } = data;
    if (pageInfo.value.page === 1) {
      msgList.value = list;
    } else {
      msgList.value.push(...list);
    }
    pageInfo.value.page += 1;
    pageInfo.value.total = total;
  } catch (error) {
    console.log(error);
  }
};

// 触底加载
onReachBottom(() => {
  if (finished.value) {
    return;
  }
  getList();
});

onLoad((options) => {
  title.value = options.title || '';
  senderId.value = options.senderId || '';

  getList();
});
</script>

<style lang="scss" module>
.container {
  padding: 10px;
  margin: 10px 30px;
  border-radius: 6px;
  background-color: #fff;
}
</style>
