import { resStructurePaging, resStructure } from '../request/index';
import { TMessage } from '../object/message';

// 获取信息列表接口返回数据
export interface TResponceMsgListItem {
  content: string; // 最新消息的内容
  unreadNum: number; // 未读消息数量
  senderName: string; // 发送者账号名
  lastOneTime: string; // 最新消息的发送时间
  senderId: number; // 发送人ID
  logo: string; // logo图
  type: number; // 消息类型 0 系统消息
}

interface TResponceMsgListData extends resStructurePaging {
  list: Array<TResponceMsgListItem>;
}

export interface TResponceMsgList extends resStructure {
  data: TResponceMsgListData;
}

// 获取某个发送方发送的消息
interface TResponceSenderMsgsData extends resStructurePaging {
  list: Array<TMessage>;
}

export interface TResponceSenderMsgs extends resStructure {
  data: TResponceSenderMsgsData;
}
