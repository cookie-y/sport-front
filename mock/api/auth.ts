export default [
  // 登录
  {
    url: '/mockapi/auth/signIn',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: '登录成功',
        data: null,
      };
    },
  },
  // 注册
  {
    url: '/mockapi/auth/signUp',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: '注册成功，待管理员审核',
        data: null,
      };
    },
  },
  // 获取验证码
  {
    url: '/mockapi/auth/getCode',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: '验证码已发送',
        data: null,
      };
    },
  },
  // 校验验证码
  {
    url: '/mockapi/auth/authCode',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: '验证通过',
        data: null,
      };
    },
  },
  // 重置密码
  {
    url: '/mockapi/auth/resetPassword',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: '密码已重置，请重新登录',
        data: null,
      };
    },
  },
  // 退出
  {
    url: '/mockapi/signOut',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: '退出成功',
        data: null,
      };
    },
  },
];
