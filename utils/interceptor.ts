// 拦截器
import pinia from '@/store/index';
import { useAccountStore } from '@/store/account';

const store = useAccountStore(pinia);
uni.addInterceptor('request', {
  invoke(args) {
    if (!args.url.includes('auth') && !args.url.includes('authUN') && !store.token) {
      console.log('token失效，请重新登录');
      return false;
    }
    // eslint-disable-next-line no-param-reassign
    args.header = {
      Authorization: `Bearer ${store.token}`,
    };
    return true;
  },
});
