import { request as paramsType, specificRequest, resStructure } from '@/types/request';

let baseURL = '';
// #ifdef APP-PLUS
baseURL = 'http://192.168.0.192:8888';
// #endif

export const request = (params: paramsType): Promise<any> => {
  return new Promise((resolve, reject) => {
    const { url, ...other } = params;
    const config = {
      ...other,
      url: baseURL + url,
      success: (res: any) => {
        if (!/^\/eggapi/.test(url)) {
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

export const upload = (url: string, params: any) => {
  return new Promise((resolve, reject) => {
    const { filePath, ...formData } = params;
    uni.uploadFile({
      url: baseURL + url,
      filePath,
      name: 'files',
      formData,
      success: (res: any) => {
        const result = JSON.parse(res.data);
        if ([1, 200].includes(result.code)) {
          resolve(result.data);
        } else {
          reject(res);
        }
      },
      fail: (res: any) => {
        reject(res);
      },
    });
  });
};
