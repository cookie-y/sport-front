export default [
  // 获取用户数据
  {
    url: '/mockapi/getAccountInfo',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: '成功',
        data: {
          accountId: '@integer(0)', // 用户id
          accountName: '@cname', // 球队名称
          state: '@integer(0)', // 账号状态
          email: '@email', // 邮箱
          logo: "@image('100x100', '#6e6944', '#FFF', 'Race Poster')", // 头像
          school: {
            schoolId: '@integer(0)', // 学校Id
            schoolName: '@cname', // 学校名
          },
        },
      };
    },
  },
  // 修改用户信息
  {
    url: '/mockapi/editAccountInfo',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: '修改成功',
        data: null,
      };
    },
  },
  // 校验原密码
  {
    url: '/mockapi/validatePassword',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: '密码正确',
        data: false,
      };
    },
  },
  // 修改密码
  {
    url: '/mockapi/editPassword',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: '修改成功',
        data: null,
      };
    },
  },
  // 校验原邮箱
  {
    url: '/mockapi/validateEmail',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: '邮箱正确',
        data: false,
      };
    },
  },
  // 修改密码
  {
    url: '/mockapi/editEmail',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: '修改成功',
        data: null,
      };
    },
  },
];
