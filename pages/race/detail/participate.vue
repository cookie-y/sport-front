<template>
  <u-action-sheet title="选择参赛队员" :show="show" round="6" v-bind="$attrs" @close="handleClose">
    <view>
      <cCheckBoxGroup
        v-model="participants"
        :list="memberList"
        :labelField="'name'"
        :valueField="'studentId'"
        :class="$style.container"
      >
        <template #default="{ data }">
          <cAvatar :avatar="data.image" :text="data.name" direction="row" />
          <u-tag v-if="data.type" :text="MEMBER_TYPES.get(data.type)" plain size="mini" class="ml-5" />
        </template>
      </cCheckBoxGroup>
      <u-button text="确认" type="warning" class="mt-10" @click="handleConfirm" />
    </view>
  </u-action-sheet>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { TMember } from '@/types/object/member';
import { MEMBER_TYPES } from '@/constants/member';
import { getMemberList } from '@/api/member';
import { addParticipants } from '@/api/race';

const props = defineProps(['show', 'kind', 'raceId']);
const emits = defineEmits(['update:show']);

// 选中队员列表
const participants = ref([]);

// 获取队员列表
const memberList = ref<Array<TMember>>([]);
const pageInfo = ref({
  page: 1,
  pageSize: 10,
  total: 10,
});
const getMembers = async () => {
  const { page, pageSize } = pageInfo.value;
  const params = {
    page,
    pageSize,
    kind: props.kind,
  };
  const { data } = await getMemberList({ data: params });
  const { list, total } = data;
  if (pageInfo.value.page === 1) {
    memberList.value = list;
  } else {
    memberList.value.push(...list);
  }
  pageInfo.value.page += 1;
  pageInfo.value.total = total;
};

// 处理确认
const handleConfirm = async () => {
  if (memberList.value.length === 0) {
    return;
  }
  try {
    const params = {
      data: {
        participants: participants.value.join(','),
        raceId: props.raceId,
      },
    };
    await addParticipants(params);
    emits('update:show', false);
  } catch (err) {
    console.log(err);
  }
};

// 处理关闭
const handleClose = () => {
  emits('update:show', false);
};

// 数据初始化
onMounted(() => {
  getMembers();
});
</script>

<style lang="scss" module>
.container {
  max-height: 200px;
  padding: 5px 10px;
  overflow-y: scroll;
}
</style>
