export default [
  // 获取高校列表
  {
    url: '/mockapi/authUN/getSchoolList',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: '成功',
        'data|15': [
          {
            schoolId: '@integer(0, 10)',
            schoolName: '@ctitle',
          },
        ],
      };
    },
  },
];
