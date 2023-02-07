import Mock from 'mockjs'

Mock.mock('/api/users/list', 'get', {
  code: 200,
  data: {
    list: [...Array(10)].map((item: any, i: number) => ({
      id: i,
      name: "李小朋",
      phone: 13673717028,
      level: 2,
      create_time: '2023-02-28',
      state: '在线'
    }))
  }
})  