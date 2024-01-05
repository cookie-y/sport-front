module.exports = {
  types: [
    { value: 'build', name: 'build:    构建流程、外部依赖变更（如升级 npm 包、修改 脚手架 配置等）' },
    { value: 'chore', name: 'chore:    对构建过程或辅助工具和库的更改（不影响源文件、测试用例）' },
    { value: 'docs', name: 'docs:     文档变更' },
    { value: 'feat', name: 'feat:     新增功能' },
    { value: 'fix', name: 'fix:      修复bug' },
    { value: 'perf', name: 'perf:     性能优化' },
    { value: 'refactor', name: 'refactor:    代码重构' },
    { value: 'revert', name: 'revert:   回滚 commit' },
    { value: 'style', name: 'style:    代码格式修正' },
  ],

  scopes: [
		['projects', '项目搭建'],
    ['components', '公共组件'],
    ['utils', 'utils 相关'],
    ['types', 'ts类型相关'],
    ['deps', '项目依赖'],
    ['other', '其他修改'],
    ['custom', '以上都不是？我要自定义']
  ].map(([value, description]) => {
    return {
      value,
      name: `${value.padEnd(30)} (${description})`
    }
  }),

  messages: {
    type: '请选择你要提交的类型:',
    scope: '请输入文件修改范围(可选):',
    customScope: '请输入修改范围(可选):',
    subject: '请简要描述提交(必填):',
    body: '请输入详细描述(可选):',
    breaking: '列举非兼容性重大的变更(可选):',
    footer: '请输入要关闭的issue(可选):',
    confirmCommit: '确认提交？'
  },
  allowBreakingChanges: ['feat', 'fix'],
  breaklineChar: '|'
}
