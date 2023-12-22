export const RACE_STATES = new Map([
  [0, '编辑中'],
  [1, '审核中'],
  [2, '筹办中'],
  [3, '报名中'],
  [4, '已截止'],
  [5, '进行中'],
  [6, '已结束'],
]);

export const RACE_STATE = {
  EDIT: 0, // 编辑中
  EXAMINE: 1, // 审核中
  PREPARE: 2, // 筹备中
  ENTER: 3, // 报名中
  DEADLINE: 4, // 已截止
  IN_PROCESS: 5, // 进行中
  END: 6, // 已结束
};

// 比赛场次类型
export const RACE_KINDS = new Map([
  [1, '女场'],
  [2, '男场'],
  [3, '混合场'],
]);

// 赛制
export const RACE_RULES = new Map([
  [1, '五局三胜'],
  [2, '三局两胜'],
]);
