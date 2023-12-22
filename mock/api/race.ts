export default [
  // 获取比赛列表
  {
    url: '/mockapi/getRaceList',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: '成功',
        data: {
          'list|10': [
            {
              raceId: '@integer(0)', // 比赛id
              raceName: '@ctitle(10)', // 比赛名称
              organizer: '@integer(0)', // 举办方Id
              organizerName: '@cname', // 举办者名称
              state: '@integer(0,5)', // 比赛状态
              racePoster: "@image('200x100', '#13227a', '#FFF', 'Race Poster')", // 比赛海报
              venueImgs: "@image('200x100', '#fff', '示例1'),@image('200x100', '#fff', '示例2')", // 比赛场地图
              raceStart: '@date', // 比赛开始时间
              raceEnd: '@date', // 比赛结束时间
              applyStart: '@date', // 报名开始时间
              applyDeadline: '@date', // 报名结束时间
              type: 0, // 比赛类型
              kind: '@integer(1,3)', // 场次类型
              rule: '@integer(1,2)', // 场次类型
              pv: '@integer(0)', // 比赛浏览量
              tips: '@cparagraph', // 比赛名称
            },
          ],
          total: '@integer(0,50)',
          page: '@integer(0)',
          pageSize: 10,
        },
      };
    },
  },
  // 获取推荐比赛
  {
    url: '/mockapi/getRecommendRace',
    method: 'get',
    response: () => ({
      code: 200,
      message: '成功',
      data: {
        'list|5': [
          {
            raceId: '@integer(0)', // 比赛id
            raceName: '@ctitle(30)', // 比赛名称
            type: 0, // 比赛类型
            organizer: '@integer(0)', // 举办方Id
            organizerName: '@cname', // 举办者名称
            state: '@integer(0,5)', // 比赛状态
            racePoster: "@image('200x100', '#13227a', '#FFF', 'Race Poster')", // 比赛海报
            applyStart: '@date', // 报名开始时间
            applyDeadline: '@date', // 报名截止时间
            raceStart: '@date', // 比赛开始时间
            raceEnd: '@date', // 比赛结束时间
            venueImgs: "@image('200x100', '#fff', '示例1'),@image('200x100', '#fff', '示例2')", // 比赛场地图
            tips: '@cparagraph', // 比赛名称
            rule: '@integer(1,2)', // 赛制 1 五局三胜 2 三局两胜
            kind: '@integer(1,3)', // 限制 1 女队 2 男队 3 混合场
            pv: '@integer(0)', // 比赛浏览量
          },
        ],
      },
    }),
  },
  // 获取比赛详情
  {
    url: '/mockapi/getRaceDetail',
    method: 'get',
    response: () => ({
      code: 200,
      message: '成功',
      data: {
        raceId: '@integer(0)', // 比赛id
        raceName: '@ctitle(20)', // 比赛名称
        organizer: '@integer(0)', // 举办方Id
        organizerName: '@cname', // 举办者名称
        pv: '@integer(0)', // 比赛浏览量
        type: 0, // 比赛类型
        rule: '@integer(1,2)', // 赛制 1 五局三胜 2 三局两胜
        kind: '@integer(1,3)', // 限制 1 女队 2 男队 3 混合场
        state: '@integer(0,5)', // 比赛状态
        racePoster: "@image('200x100', '#a8071a', '#FFF', 'Race Poster')", // 比赛海报
        applyStart: '@date', // 报名开始时间
        applyDeadline: '@date', // 报名截止时间
        raceStart: '@date', // 比赛开始时间
        raceEnd: '@date', // 比赛结束时间
        venueImgs: "@image('200x100', '#fff', '示例1'),@image('200x100', '#fff', '示例2')", // 比赛场地图
        tips: '@cparagraph',
      },
    }),
  },
  // 新增比赛（填写基本信息）
  {
    url: '/mockapi/addRace',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: '新增成功',
        data: null,
      };
    },
  },
  // 编辑比赛基本信息
  {
    url: '/mockapi/editRace',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: '编辑成功',
        data: null,
      };
    },
  },
  // 删除比赛
  {
    url: '/mockapi/delRace',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: '删除成功',
        data: null,
      };
    },
  },
  // 获取参赛队伍列表
  {
    url: '/mockapi/getParticipateTeamList',
    method: 'get',
    response: () => ({
      code: 200,
      message: '成功',
      data: {
        'list|0-20': [
          {
            accountId: '@integer(0)', // 参赛队伍Id
            raceId: '@integer(0)', // 参加的比赛id
            'group|1': ['A', 'B', 'C'], // 参赛队伍所属组别
            id: '@integer(0)', // 参赛记录id
            integral: '@integer(0,30)', // 参赛队伍积分
            participateTeam: {
              accountId: '@integer(0)', // 参赛队伍Id
              accountName: '@cname',
              logo: '@image(50x50)',
            },
          },
        ],
        total: '@integer(0,50)',
      },
    }),
  },
  // 获取参赛队伍的参赛队员列表
  {
    url: '/mockapi/getTeamParticipantList',
    method: 'get',
    response: () => ({
      code: 200,
      message: '成功',
      data: {
        'list|0-20': [
          {
            id: '@integer(0)',
            participateId: '@integer(0)',
            studentId: '@integer(0)',
            'member|10-15': [
              {
                facultyId: '@integer(0)', // 所属组织Id
                studentId: '@integer(0)', // 比赛id
                image: '@image(50x50)', // 图片
                name: '@cname', // 姓名
                isCaptain: '@boolean', // 是否是队长
                sex: '@integer(0,1)', // 性别 1：女 0：男
                type: '@integer(0,5)', // 类型 0：暂无 1：主攻 2：二传 3：副攻 4：自由人 5：接应
              },
            ],
          },
        ],
      },
    }),
  },
  // 上传分组名单
  {
    url: '/mockapi/editGroupInf',
    method: 'post',
    response: () => ({
      code: 200,
      message: '分组成功',
      data: null,
    }),
  },
  // 新增参赛名单
  {
    url: '/mockapi/addParticipants',
    method: 'post',
    response: () => ({
      code: 200,
      message: '参赛成功',
      data: null,
    }),
  },
];
