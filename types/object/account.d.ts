import { TSchool } from './school';

export interface TBasicAccount {
  accountId: number; // 账号Id
  accountName: string; // 账号名称
  logo?: string; // 学院图标
}

// 用户基本信息
export interface TAccount extends TBasicAccount {
  school: TSchool; // 所属学校信息
  email?: string; // 邮箱
}

// 参赛队伍
export interface TParticipateTeam {
  id: number; // 记录id
  group?: string; // 所属分组
  integral?: string; // 积分
  participateTeam: TBasicAccount; // 参赛队伍详细数据
}
