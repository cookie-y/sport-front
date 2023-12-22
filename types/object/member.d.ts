// 团队成员
export interface TBasicMember {
  studentId: number; // 学号
  name: string; // 队员名称
}

export interface TMember extends TBasicMember {
  image: string; // 队员照片
  sex: number; // 性别
  phone: string; // 手机号
  type: number; // 类型
  isCaptain: boolean; // 是否是队长
}
