export default [
  // 获取消息列表
  {
    url: '/mockapi/getMsgList',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: '成功',
        data: {
          page: '@integer(0, 10)',
          pageSize: '@integer(0, 10)',
          total: 14,
          'list|15': [
            {
              messageId: '@integer(0, 10)',
              content: '@cparagraph',
              lastOneTime: '@date',
              logo: '@image(60x60)',
              senderId: '@integer(0, 10)',
              senderName: '@cname',
            },
          ],
        },
      };
    },
  },
  // 获取消息详情
  {
    url: '/mockapi/getMsgDetail',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: '成功',
        data: {
          page: '@integer(0, 10)',
          pageSize: '@integer(0, 10)',
          total: 14,
          'list|10': [
            {
              readed: '@boolean',
              id: '@integer(0, 10)',
              message: {
                content: '@cparagraph',
                id: '@integer(0, 10)',
                raceId: '@integer(0, 10)',
                title: '@ctitle',
              },
              createdAt: '2023-11-14 @time(mm:ss)',
            },
          ],
        },
      };
    },
  },
];
