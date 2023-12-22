<template>
  <view>
    <cCheckBoxGroup v-model="value" :list="list" :labelField="'name'" :valueField="'studentId'" />
  </view>
</template>

<script setup>
import { ref } from 'vue';

const value = ref([2018117236]);

const list = ref([
  { name: '杨楚琪', studentId: 2018117236 },
  { name: '朱琴', studentId: 2018117501 },
]);
</script>

<style></style>
