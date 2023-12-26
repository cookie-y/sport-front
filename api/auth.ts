import { post, get } from '@/utils/request';
import { specificRequest, resStructureSubmit, resStructure } from '@/types/request';

// 登录
export const signIn = (params: specificRequest): Promise<resStructure> => {
  return post('/eggapi/auth/signIn', params);
};

// 注册
export const signUp = (params: specificRequest): Promise<resStructureSubmit> => {
  return post('/eggapi/auth/signUp', params);
};

// 重置密码
export const resetPassword = (params: specificRequest): Promise<resStructureSubmit> => {
  return post('/eggapi/auth/resetPassword', params);
};

// 获取验证码
export const getCode = (params: specificRequest): Promise<resStructure> => {
  return get('/eggapi/auth/getCode', params);
};

// 校验验证码
export const authCode = (params: specificRequest): Promise<resStructureSubmit> => {
  return post('/eggapi/auth/authCode', params);
};
