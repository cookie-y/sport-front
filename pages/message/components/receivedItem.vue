<template>
  <view :class="$style.message">
    <u-image v-if="image" :src="image" width="60" height="60" class="mr-15" />
    <view class="flex-1">
      <view class="flex justify-between items-center">
        <u-text :text="title" block bold color="#333" :size="18" />
        <u-text :text="time" color="#999" :size="12" block align="right" />
      </view>
      <view class="flex justify-between items-center mt-10">
        <u-text :text="content" color="#999" block :size="12" :lines="1" margin="0 5px 0 0" />
        <u-badge max="99" :value="unreadNum" :class="$style.badge" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
interface TReceive {
  title: string; // 消息标题
  content: string; // 消息内容
  time: string; // 消息时间
  unreadNum?: number; // 未读数量
  image: string; // 头像
}
withDefaults(defineProps<TReceive>(), {});
</script>

<style lang="scss" module>
.message {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  padding: 10px;
  border-bottom: 1px $u-gray8 solid;
  background: #fff;
}

.content {
}
.badge {
  height: 11px;
}
</style>
