import { request } from '@/utils/request';
import { specificRequest } from '@/types/request';
import { TResponceWeatherInfo, TResponceIpInfo } from '@/types/request/restapi';

export const key = '0cc23bbba944ac0af1eb6fea5727af42';

// 获取天气消息
export const getWeatherInfo = (params: specificRequest): Promise<TResponceWeatherInfo> => {
  return request({ url: `/restapi/v3/weather/weatherInfo?key=${key}`, data: params.data });
};

// 获取定位
export const getIpInfo = (): Promise<TResponceIpInfo> => {
  return request({ url: `/restapi/v3/ip?key=${key}` });
};
