<template>
  <view v-for="item in teamList" :key="item.participateTeam.accountId" class="flex-inline flex-col items-center">
    <u-image :src="item.participateTeam.logo" width="50" height="50" shape="circle" />
    <text class="w-70 text-center fs-14 u-line-1">{{ item.participateTeam.accountName }}</text>
  </view>
</template>

<script setup lang="ts">
import { TParticipateTeam } from '../../types/object/account';

interface TProps {
  teamList: Array<TParticipateTeam>;
}
withDefaults(defineProps<TProps>(), {});
</script>

<style lang="scss"></style>
