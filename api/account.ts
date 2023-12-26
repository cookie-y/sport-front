import { get, post } from '@/utils/request';
import { specificRequest, resStructure, resStructureSubmit } from '@/types/request';

// 获取账号信息
export const getAccountInfo = (): Promise<resStructure> => {
  return get('/eggapi/getAccountInfo');
};

// 修改基础资料
export const editAccountInfo = (params: specificRequest): Promise<resStructureSubmit> => {
  return post('/eggapi/editAccountInfo', params);
};

// 校验原密码
export const validatePassword = (params: specificRequest): Promise<resStructureSubmit> => {
  return post('/eggapi/validatePassword', params);
};

// 修改密码
export const editPassword = (params: specificRequest): Promise<resStructureSubmit> => {
  return post('/eggapi/editPassword', params);
};

// 校验邮箱
export const validateEmail = (params: specificRequest): Promise<resStructureSubmit> => {
  return post('/eggapi/validateEmail', params);
};

// 修改邮箱
export const editEmail = (params: specificRequest): Promise<resStructureSubmit> => {
  return post('/eggapi/editEmail', params);
};
