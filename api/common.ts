import { upload } from '@/utils/request';
import { TResUpload } from '@/types/request/common';

// 上传文件
export const uploadImg = (params: any): Promise<TResUpload> => {
  return upload('/eggapi/upload', params);
};
