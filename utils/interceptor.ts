// 拦截器
import pinia from '@/store/index';
import { useAccountStore } from '@/store/account';

const store = useAccountStore(pinia);

const authToken = (args) => {
  if (!args.url.includes('auth') && !args.url.includes('authUN') && !store.token) {
    console.log('token失效，请重新登录');
    return false;
  }
  // eslint-disable-next-line no-param-reassign
  args.header = {
    Authorization: `Bearer ${store.token}`,
  };
  return true;
};

// 拦截request请求
uni.addInterceptor('request', {
  invoke(args) {
    authToken(args);
  },
});

// 拦截上传文件请求
uni.addInterceptor('uploadFile', {
  invoke(args) {
    authToken(args);
  },
});
