export const PASSWORD = [
  { min: 8, max: 12, message: '长度在8-10个字符之间' },
  { pattern: /^[0-9a-zA-Z]*$/g, message: '只能包含字母或数字' },
];
