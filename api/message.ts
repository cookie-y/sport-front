import { get } from '@/utils/request';
import { specificRequest } from '@/types/request';
import { TResponceMsgList, TResponceSenderMsgs } from '@/types/request/message';

// 获取消息列表
export const getMsgList = (params: specificRequest): Promise<TResponceMsgList> => {
  return get('/mockapi/getMsgList', params);
};

export const getMsgDetail = (params: specificRequest): Promise<TResponceSenderMsgs> => {
  return get('/mockapi/getMsgDetail', params);
};
