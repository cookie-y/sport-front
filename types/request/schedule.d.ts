import { resStructure } from '@/types/request/index';
import { TRaceSchedule, TRaceScheduleItem } from '@/types/object/race';

// 获取指定日期赛程安排列表接口返回数据
export interface TResScheduleList extends resStructure {
  data: TRaceSchedule;
}

// 获取赛程安排详情接口返回数据
export interface TResScheduleDetail extends resStructure {
  data: TRaceScheduleItem;
}

// 获取赛程安排详情接口返回数据
export interface TResScheduleDateList extends resStructure {
  data: Array<string>;
}
