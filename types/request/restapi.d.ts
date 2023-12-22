export interface TWeatherInfo {
  province: string; // 省份名
  city: string; // 城市名
  adcode: number; // 区域编码
  weather: string; // 天气现象（汉字描述）
  temperature: string; // 实时气温，单位：摄氏度
  winddirection: string; // 风向描述
  windpower: string; // 风力级别，单位：级
  humidity: string; // 空气湿度
}

export interface TResponceWeatherInfo {
  status: number; // 返回状态
  count: number; // 返回结果总数目
  lives: Array<TWeatherInfo>;
}
export interface TResponceIpInfo {
  status: number; // 返回状态
  province: string; // 省份名称
  city: string; // 城市名称
  adcode: number; // 城市的adcode编码
}
