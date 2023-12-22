<template>
  <view>
    <navigationBar title="我的队员" />
    <view class="flex-inline mt-10 ml-15">
      <u-button type="primary" size="small" text="新增队员" icon="man-add" @click="handleAdd" />
    </view>

    <u-swipe-action>
      <u-swipe-action-item
        v-for="item in memberList"
        :key="item.studentId"
        :name="item.studentId"
        :options="actionOption"
        class="m-15 rounded-4"
        @click="handleClick"
      >
        <memberItem :memberInfo="item" />
      </u-swipe-action-item>
    </u-swipe-action>
  </view>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue';
import { onReachBottom } from '@dcloudio/uni-app';
import { getMemberList, delMember } from '@/api/member';
import { TMember } from '@/types/object/member';
import memberItem from './components/memberItem.vue';

const memberList = ref<Array<TMember>>([]);

const pageInf = ref({
  page: 1,
  pageSize: 10,
  total: 0,
});
const finished = computed(() => {
  return pageInf.value.page > Math.ceil(pageInf.value.total / pageInf.value.pageSize);
});

const getMembers = async () => {
  const params = {
    data: { ...pageInf.value },
  };
  const { data } = await getMemberList(params);
  const { list, total } = data;

  memberList.value = list;

  if (pageInf.value.page === 1) {
    memberList.value = list;
  } else {
    memberList.value.push(...list);
  }
  pageInf.value.page += 1;
  pageInf.value.total = total;
};

// 触底加载
onReachBottom(() => {
  if (finished.value) {
    return;
  }
  getMembers();
});

onMounted(() => {
  getMembers();
});

// 处理新增队员
const handleAdd = () => {
  uni.navigateTo({ url: `/pages/member/edit` });
};

// 处理删除队员
const actionOption = [
  {
    text: '删除',
    icon: 'trash-fill',
    iconSize: '18',
    style: {
      backgroundColor: '#f5f5f5',
      color: '#cd3333',
    },
  },
];
const handleClick = async (data: any) => {
  try {
    await delMember({ data: { studentId: data.name } });
    if (pageInf.value.page !== 1) {
      pageInf.value.page -= 1;
    }
    getMembers();
  } catch (error) {
    console.log(error);
  }
};
</script>

<style></style>
