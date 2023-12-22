<template>
  <view :class="$style['search-box']" @click="jumpToSearchPage">
    <u-icon name="search" size="30" />
    <text>搜索</text>
  </view>
</template>

<script lang="ts" setup>
// 跳转到搜索页
const jumpToSearchPage = () => {
  uni.navigateTo({
    url: '/pages/search/index',
  });
};
</script>

<style lang="scss" module>
.search-box {
  display: flex;
  align-items: center;
  width: 270px;
  height: 40px;
  padding: 4px;
  border: 1px solid #999;
  border-radius: 10px;
  background: white;
}
</style>
