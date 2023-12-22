import { get, post } from '@/utils/request';
import { specificRequest, resStructureSubmit } from '@/types/request';
import { TResScheduleList, TResScheduleDetail, TResScheduleDateList } from '@/types/request/schedule';

// 获取指定日期的赛程安排
export const getScheduleList = (params: specificRequest): Promise<TResScheduleList> => {
  return get('/mockapi/getScheduleList', params);
};

// 获取赛程详情
export const getScheduleDetail = (params: specificRequest): Promise<TResScheduleDetail> => {
  return get('/mockapi/getScheduleDetail', params);
};

// 新增或编辑赛程
export const addOrUpdateScheduleList = (params: specificRequest): Promise<resStructureSubmit> => {
  return post('/mockapi/addOrUpdateScheduleList', params);
};

// 删除赛程
export const delSchedule = (params: specificRequest): Promise<resStructureSubmit> => {
  return post('/mockapi/delSchedule', params);
};

// 获取有赛程安排的日期列表
export const getScheduleDateList = (params: specificRequest): Promise<TResScheduleDateList> => {
  return get('/mockapi/getScheduleDateList', params);
};

// 录入成绩
export const enterScore = (params: specificRequest): Promise<resStructureSubmit> => {
  return post('/mockapi/enterScore', params);
};
