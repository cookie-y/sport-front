import { TParticipateTeam } from './account';

// 比赛基本信息
export interface TBasicRace {
  raceId: number; // 比赛ID
  raceName: string; // 比赛名称
  racePoster: string; // 海报
  organizerName: string; // 举办方
}

export interface TRace extends TBasicRace {
  venueImgs?: string; // 场地示意图
  state: number; // 状态
  rule: number; // 赛制 1 五局三胜 2 三局两胜
  kind: number; // 限制 1 女队 2 男队 3 混合场
  applyStart: string; // 报名开始日期
  applyDeadline: string; // 报名截止日期
  raceStart: string; // 比赛开始时间
  raceEnd?: string; // 比赛结束时间
  tips?: string; // 备注
  annex?: string; // 附件
}

// 赛程安排
export interface TRaceScheduleItem {
  id?: number; // ID
  raceId: number; // 比赛ID
  date: string; // 比赛日期
  time: string; // 比赛时间
  stage?: number; // 赛段
  A: TParticipateTeam; // A方
  B: TParticipateTeam; // B方
  place: string; // 场地
  results?: string;
}

// 赛程安排
export interface TRaceSchedule {
  [propName: string]: Array<TRaceScheduleItem>;
}
