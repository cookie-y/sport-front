import { get, post } from '@/utils/request';
import { specificRequest, resStructureSubmit } from '@/types/request';
import { TResMemberList, TResMemberDetail } from '@/types/request/member';

// 获取团队成员列表
export const getMemberList = (params: specificRequest): Promise<TResMemberList> => {
  return get('/mockapi/getMemberList', params);
};

// 获取成员信息
export const getMemberDetail = (params: specificRequest): Promise<TResMemberDetail> => {
  return get('/mockapi/getMemberDetail', params);
};

// 新增成员
export const addMember = (params: specificRequest): Promise<resStructureSubmit> => {
  return post('/mockapi/addMember', params);
};

// 编辑成员信息
export const editMember = (params: specificRequest): Promise<resStructureSubmit> => {
  return post('/mockapi/editMember', params);
};

// 删除成员信息
export const delMember = (params: specificRequest): Promise<resStructureSubmit> => {
  return post('/mockapi/delMember', params);
};
