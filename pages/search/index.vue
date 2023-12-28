<template>
  <statusBar />
  <view :class="$style['search-box']">
    <u-icon name="arrow-left" size="20" class="mr-5" @click="handleBack" />
    <u-search
      v-model="keyword"
      placeholder="请输入文本"
      shape="round"
      bgColor="#fff"
      clearabled
      @search="handleSearch"
      @custom="handleSearch"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const keyword = ref('');

// 处理回退
const handleBack = () => {
  uni.navigateBack();
};

// 处理搜索
const handleSearch = (value: string) => {
  uni.navigateTo({
    url: `/pages/search/result?keyword=${value}`,
  });
};
</script>

<style lang="scss" module>
.search-box {
  display: flex;
  align-items: center;
  margin: 10px 5px;
}
</style>
