module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:vue/vue3-essential', 'airbnb-base', 'plugin:prettier/recommended'],
  // 解析器
  parserOptions: {
    // es版本
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    // 模块化
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint'],
  globals: {
    uni: true,
  },
  rules: {
    // 不允许引入开发依赖包
    'import/no-extraneous-dependencies': [
      'error',
      {
        optionalDependencies: false,
      },
    ],
    // 不一定要export default
    'import/prefer-default-export': 'off',
    // 引入文件后缀
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'vue/multi-word-component-names': 'off',
    // 强制行的最大长度
    'max-len': ['error', { code: 120 }],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ], // 自闭合组件
  },
};
