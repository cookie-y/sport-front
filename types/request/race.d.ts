import { TRace, TRaceScheduleItem, TBasicRace } from '@/types/object/race';
import { TParticipateTeam } from '@/types/object/account';
import { resStructurePaging, resStructure } from '../request/index';
import { TMember } from '../object/member';

// 获取比赛列表接口返回数据
interface TResRaceListData extends resStructurePaging {
  list: Array<TRace>;
}
export interface TResRaceList extends resStructure {
  data: TResRaceListData;
}

// 获取推荐比赛接口返回数据
export interface TRecommendRace extends TBasicRace {
  raceStart: string;
  organizerName: string;
}
export interface TResRecommendRace extends resStructure {
  data: {
    list: Array<TRecommendRace>;
  };
}

// 获取比赛详情接口返回数据
export interface TResRaceDetail extends resStructure {
  data: TRace;
}

// 获取参赛队伍接口返回数据
interface TResRaceParticipateTeamListData extends resStructurePaging {
  list: Array<TParticipateTeam>;
}
export interface TResRaceParticipateTeamList extends resStructure {
  data: TResRaceParticipateTeamListData;
}

// 获取参赛队员列表接口返回数据
export interface TResRaceParticipantList extends resStructure {
  data: Array<{ member: TMember }>;
}

// 获取赛程列表接口返回数据
interface TResRaceScheduleListData extends resStructurePaging {
  list: Array<TRaceScheduleItem>;
}
export interface TResRaceScheduleList extends resStructure {
  data: TResRaceScheduleListData;
}
