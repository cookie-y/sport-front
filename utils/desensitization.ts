// 脱敏处理
export const encryptEmail = (text: string) => {
  return text.replace(/(\w{1}).+(\w{1}@.+)/, '$1***$2');
};
