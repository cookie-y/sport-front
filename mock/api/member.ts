export default [
  // 获取成员列表
  {
    url: '/mockapi/getMemberList',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: '成功',
        data: {
          'list|10': [
            {
              studentId: '@integer(0,1000000)', // 用户id
              facultyId: '@integer(0,1000000)', // 关联的账号Id
              name: '@cname', // 成员名称
              image: '@image(60x60)', // 成员照片
              phone: '@string(number,11)', // 手机号
              sex: '@integer(0,1)', // 性别
              type: '@integer(0,5)', // 类型
              isCaptain: '@boolean', // 是否是队长
            },
          ],
          total: '@integer(0,50)',
          page: '@integer(0)',
          pageSize: 10,
        },
      };
    },
  },
  // 获取成员信息
  {
    url: '/mockapi/getMemberDetail',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: '获取成功',
        data: {
          studentId: '@integer(0,1000000)', // 用户id
          facultyId: '@integer(0,1000000)', // 关联的账号Id
          name: '@cname', // 成员名称
          image: '@image(60x60)', // 成员照片
          sex: '@integer(0,1)', // 性别
          phone: '@string(number,11)', // 手机号
          type: '@integer(0,5)', // 类型
          isCaptain: '@boolean', // 是否是队长
        },
      };
    },
  },
  // 新增成员
  {
    url: '/mockapi/addMember',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: '新增成功',
        data: null,
      };
    },
  },
  // 修改成员信息
  {
    url: '/mockapi/editMember',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: '修改成功',
        data: null,
      };
    },
  },
  // 删除成员信息
  {
    url: '/mockapi/delMember',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: '删除成功',
        data: null,
      };
    },
  },
];
