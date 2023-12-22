import { resStructure, resStructurePaging } from '@/types/request';
import { TMember } from '../object/member';

// 获取团队成员列表接口返回数据
interface TResMemberListData extends resStructurePaging {
  list: Array<TMember>;
}
export interface TResMemberList extends resStructure {
  data: TResMemberListData;
}

// 获取成员详情接口返回数据
export interface TResMemberDetail extends resStructure {
  data: TMember;
}
