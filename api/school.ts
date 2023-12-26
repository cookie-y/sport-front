import { get } from '@/utils/request';
import { TResponceSchoolList } from '@/types/request/school';

// 获取高校列表
export const getSchoolList = (): Promise<TResponceSchoolList> => {
  return get('/eggapi/authUN/getSchoolList');
};
