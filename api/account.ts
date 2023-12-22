import { get, post } from '@/utils/request';
import { specificRequest, resStructure, resStructureSubmit } from '@/types/request';

// 获取账号信息
export const getAccountInfo = (): Promise<resStructure> => {
  return get('/mockapi/getAccountInfo');
};

// 修改基础资料
export const editAccountInfo = (params: specificRequest): Promise<resStructureSubmit> => {
  return post('/mockapi/editAccountInfo', params);
};

// 校验原密码
export const validatePassword = (params: specificRequest): Promise<resStructureSubmit> => {
  return post('/mockapi/validatePassword', params);
};

// 修改密码
export const editPassword = (params: specificRequest): Promise<resStructureSubmit> => {
  return post('/mockapi/editPassword', params);
};

// 校验邮箱
export const validateEmail = (params: specificRequest): Promise<resStructureSubmit> => {
  return post('/mockapi/validateEmail', params);
};

// 修改邮箱
export const editEmail = (params: specificRequest): Promise<resStructureSubmit> => {
  return post('/mockapi/editEmail', params);
};
