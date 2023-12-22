/**
 * 通用方法
 */

// 对象扁平化
export const flatObject = (object: any, arrField: string) => {
  const { [arrField]: arr, ...others } = object;
  return object[arrField].map((item: any) => ({ ...item, ...others }));
};
