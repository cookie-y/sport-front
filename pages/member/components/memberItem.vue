<template>
  <view :class="$style['member-item']" @click="handleEdit">
    <u-image shape="circle" width="60" height="60" :src="memberInfo?.image" />
    <view class="ml-20 flex-1">
      <view class="flex">
        <u-text :text="memberInfo.name" size="14" />
        <u-text :text="memberInfo.sex ? '女' : '男'" size="14" />
        <view class="flex-1 flex flex-row-reverse">
          <u-tag :text="MEMBER_TYPES.get(memberInfo.type)" plain size="mini" class="ml-5" />
          <u-tag v-if="memberInfo.isCaptain" text="队长" plain size="mini" type="error" plainFill />
        </view>
      </view>
      <view class="flex items-center mt-10">
        <view class="flex items-center flex-1">
          <text class="icon mr-3 fs-18">&#xe7de;</text>
          <u-text :text="`${memberInfo.studentId}`" size="14" class="w-50" />
        </view>
        <u-text
          v-if="memberInfo.phone"
          prefixIcon="phone"
          iconStyle="font-size: 18px"
          :text="memberInfo.phone"
          mode="phone"
          size="14"
        />
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { TMember } from '@/types/object/member';
import { MEMBER_TYPES } from '@/constants/member';

interface member {
  memberInfo: TMember;
}
const props = withDefaults(defineProps<member>(), {});

// 处理编辑
const handleEdit = () => {
  uni.navigateTo({ url: `/pages/member/edit?id=${props.memberInfo.studentId}` });
};
</script>

<style lang="scss" module>
.member-item {
  display: flex;
  align-items: center;
  padding: 20px;
  margin-top: 5px;
  background-color: #fff;
}
</style>
