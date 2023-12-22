// 返回上一页
export const handleBack = () => {
  uni.navigateBack();
};

// 获取URL参数
export const getUrlParam = (key: string) => {
  const reg = new RegExp(`(?<=${key}=)[^&]+`);
  return reg.exec(window.location.href)?.[0];
};
