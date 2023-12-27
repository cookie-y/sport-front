import { request as paramsType, specificRequest, resStructure } from '@/types/request';

export const baseURL = 'http://192.168.0.192:8888';

export const request = (params: paramsType): Promise<any> => {
  return new Promise((resolve, reject) => {
    const { url, ...other } = params;
    const config = {
      ...other,
      url: baseURL + url,
      success: (res: any) => {
        if (/^\/mockapi/.test(params.url)) {
          console.log('mock接口');
          resolve(res.data);
        } else if (!/^\/eggapi/.test(url)) {
          console.log('第三方接口');
          resolve(res.data);
        }
        if ([1, 200].includes(res.data.code)) {
          resolve(res.data);
        } else {
          reject(res);
        }
      },
      fail: (res: any) => {
        reject(res);
      },
    };
    uni.request(config);
  });
};

export const get = (url: string, params?: specificRequest): Promise<resStructure> => {
  return request({ url, ...params });
};

export const post = (url: string, params: specificRequest): Promise<resStructure> => {
  return request({ url, method: 'POST', ...params });
};
