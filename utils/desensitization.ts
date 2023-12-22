// 脱敏处理
export const email = (text: string) => {
  return text.replace(/(\w{1}).+(\w{1}@.+)/, '$1***$2');
};
