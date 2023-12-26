import { get, post } from '@/utils/request';
import { specificRequest, resStructureSubmit } from '@/types/request';
import {
  TResRaceList,
  TResRecommendRace,
  TResRaceDetail,
  TResRaceParticipateTeamList,
  TResRaceParticipantList,
} from '@/types/request/race';

// 获取比赛列表
export const getRaceList = (params: specificRequest): Promise<TResRaceList> => {
  return get('/eggapi/getRaceList', params);
};

// 获取推荐比赛
export const getRecommendRace = (params: specificRequest): Promise<TResRecommendRace> => {
  return get('/eggapi/getRecommendRace', params);
};

// 获取比赛详情
export const getRaceDetail = (params: specificRequest): Promise<TResRaceDetail> => {
  return get('/eggapi/getRaceDetail', params);
};

// 获取参赛队伍列表
export const getParticipateTeamList = (params: specificRequest): Promise<TResRaceParticipateTeamList> => {
  return get('/eggapi/getParticipateTeamList', params);
};

// 获取参赛队员列表
export const getParticipantList = (params: specificRequest): Promise<TResRaceParticipantList> => {
  return get('/eggapi/getTeamParticipantList', params);
};

// 上传分组名单
export const editGroupInf = (params: specificRequest): Promise<resStructureSubmit> => {
  return post('/eggapi/editGroupInf', params);
};

// 参赛
export const addParticipants = (params: specificRequest): Promise<resStructureSubmit> => {
  return post('/eggapi/addParticipants', params);
};

// 新增比赛
export const addRace = (params: specificRequest): Promise<resStructureSubmit> => {
  return post('/eggapi/addRace', params);
};

// 编辑比赛基本信息
export const editRace = (params: specificRequest): Promise<resStructureSubmit> => {
  return post('/eggapi/editRace', params);
};

// 删除比赛基本信息
export const delRace = (params: specificRequest): Promise<resStructureSubmit> => {
  return post('/eggapi/delRace', params);
};
