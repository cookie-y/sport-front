import { defineStore } from 'pinia';
import { getAccountInfo } from '@/api/account';
import { TAccount } from '@/types/object/account';

export const useAccountStore = defineStore('account', {
  state: () => ({
    accountInfo: null as TAccount | null,
    loginToken: '',
  }),
  getters: {
    token: (state) => state.loginToken || uni.getStorageSync('token'),
  },
  actions: {
    // 保存token
    setToken(token: string) {
      uni.setStorageSync('token', token);
      this.loginToken = token;
    },
    // 更新邮箱
    setEmail(email: string) {
      this.accountInfo!.email = email;
    },
    // 更新用户数据
    setAccountInfo(account: any) {
      this.accountInfo = account;
    },
    // 获取用户基本数据
    async getAccountInfo() {
      if (this.accountInfo === null && this.token) {
        const { data } = await getAccountInfo();
        this.accountInfo = data;
      }
      return this.accountInfo;
    },
  },
});
