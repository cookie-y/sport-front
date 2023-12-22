export default [
  // 获取有赛程安排的日期列表
  {
    url: '/mockapi/getScheduleDateList',
    method: 'get',
    response: () => ({
      code: 200,
      message: '成功',
      'data|5': ['2023-11-25', '2023-11-27', '2023-11-29', '2023-11-30', '2023-12-9', '2023-12-13', '2023-12-17'],
    }),
  },
  // 获取赛程安排
  {
    url: '/mockapi/getScheduleList',
    method: 'get',
    response: () => ({
      code: 200,
      message: '成功',
      data: {
        '08:00:00|0-6': [
          {
            id: '@integer(0, 2000)', // 赛程id
            raceId: '@integer(0, 2000)', // 所属比赛id
            results: '@string', // 赛程结果
            adversaryA: '@integer(0, 2000)', // 对战方A Id
            adversaryB: '@integer(0, 2000)', // 对战方B Id
            date: '@date', // 日期
            time: '08:00:00', // 时间段
            place: '@ctitle(2,3)', // 比赛场地
            A: {
              id: '@integer(0, 2000)', // 参赛记录id
              group: '@ctitle(2,3)', // 所属组别
              accountId: '@integer(0, 2000)',
              integral: '@integer(0,30)', // 参赛队伍积分
              participateTeam: {
                accountId: '@integer(0, 2000)', // 账号id
                accountName: '@cname', // 账号名称
                logo: '@image(50x50)', // 头像
              },
            },
            B: {
              id: '@integer(0, 2000)', // 参赛记录id
              group: '@ctitle(2,3)', // 所属组别
              accountId: '@integer(0, 2000)',
              integral: '@integer(0,30)', // 参赛队伍积分
              participateTeam: {
                accountId: '@integer(0, 2000)', // 账号id
                accountName: '@cname', // 账号名称
                logo: '@image(50x50)', // 头像
              },
            },
          },
        ],
        '10:30:00|0-2': [
          {
            id: '@integer(0, 2000)', // 赛程id
            raceId: '@integer(0, 2000)', // 所属比赛id
            results: '@string', // 赛程结果
            adversaryA: '@integer(0, 2000)', // 对战方A Id
            adversaryB: '@integer(0, 2000)', // 对战方B Id
            date: '@date', // 日期
            time: '08:00:00', // 时间段
            place: '@ctitle(2,3)', // 比赛场地
            A: {
              id: '@integer(0, 2000)', // 参赛记录id
              group: '@ctitle(2,3)', // 所属组别
              accountId: '@integer(0, 2000)',
              integral: '@integer(0,30)', // 参赛队伍积分
              participateTeam: {
                accountId: '@integer(0, 2000)', // 账号id
                accountName: '@cname', // 账号名称
                logo: '@image(50x50)', // 头像
              },
            },
            B: {
              id: '@integer(0, 2000)', // 参赛记录id
              group: '@ctitle(2,3)', // 所属组别
              accountId: '@integer(0, 2000)',
              integral: '@integer(0,30)', // 参赛队伍积分
              participateTeam: {
                accountId: '@integer(0, 2000)', // 账号id
                accountName: '@cname', // 账号名称
                logo: '@image(50x50)', // 头像
              },
            },
          },
        ],
      },
    }),
  },
  // 获取赛程详情
  {
    url: '/mockapi/getScheduleDetail',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: '成功',
        data: {
          id: '@integer(0, 2000)', // 赛程id
          raceId: '@integer(0, 2000)', // 所属比赛id
          adversaryA: '@integer(0, 2000)', // 对战方A Id
          adversaryB: '@integer(0, 2000)', // 对战方B Id
          date: '@date', // 日期
          time: '@time(mm:ss)', // 时间段
          place: '@ctitle(2,3)', // 比赛场地
          A: {
            id: '@integer(0, 2000)', // 参赛记录id
            accountId: '@integer(0, 2000)', // 账号id
            participateTeam: {
              accountId: '@integer(0, 2000)', // 账号id
              accountName: '@cname', // 账号名称
              logo: '@image(50x50)', // 头像
            },
          },
          B: {
            id: '@integer(0, 2000)', // 参赛记录id
            accountId: '@integer(0, 2000)',
            participateTeam: {
              accountId: '@integer(0, 2000)', // 账号id
              accountName: '@cname', // 账号名称
              logo: '@image(50x50)', // 头像
            },
          },
        },
      };
    },
  },
  // 新增或编辑赛程
  {
    url: '/mockapi/addOrUpdateScheduleList',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: '修改成功',
        data: null,
      };
    },
  },
  // 删除赛程
  {
    url: '/mockapi/delSchedule',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: '删除成功',
        data: null,
      };
    },
  },
  // 录入成绩
  {
    url: '/mockapi/enterScore',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: '录入成功',
        data: null,
      };
    },
  },
];
