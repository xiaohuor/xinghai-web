// 数据概览数据
export const overviewData = {
  // 顶部卡片数据
  topCards: {
    // 能力数据
    capability: {
      total: 128,
      tools: 45,
      models: 83,
    },
    // 模型调用数据
    calls: {
      total: 124.6,
      tools: 48.3,
      models: 76.3,
    },
    // 能力打造者数据
    creators: {
      total: 1033,
      perCapita: 1.0,
      ecosystem: 533,
      internal: 500,
    },
    // 能力使用者数据
    users: {
      total: 2456,
      customers: 1338,
      internal: 1234,
      external: 1222,
    },
  },

  // 能力调用排行--模型服务
  modelCapabilityRanking: [
    { name: '智能推荐', value: 23540 },
    { name: '标签识别', value: 19388 },
    { name: '文本分析', value: 18790 },
    { name: '语音合成', value: 3540 },
    { name: '图像识别', value: 2093 },
  ],
  // 能力调用排行--产品工具
  toolCapabilityRanking: [
    { name: '标签识别', value: 19388 },
    { name: '智能推荐', value: 13540 },
    { name: '语音合成', value: 1240 },
    { name: '文本分析', value: 1090 },
    { name: '图像识别', value: 830 },
  ],

  // 客户调用排行
  customerRanking: [
    { name: '京东集团', value: 26351 },
    { name: '量子科技材料有限公司', value: 19540 },
    { name: '创联生物科技有限公司', value: 16540 },
    { name: '富田电子科技有限公司', value: 16540 },
    { name: '京东集团', value: 16540 },
    { name: '量子科技材料有限公司', value: 16540 },
    { name: '创联生物科技有限公司', value: 16540 },
    { name: '富田电子科技有限公司', value: 16540 },
    { name: '创联生物科技有限公司', value: 9990 },
    { name: '富田电子科技有限公司', value: 8540 },
  ],

  // 专家创新排行
  expertRanking: [
    { name: '刘面', level: 23, value: 15.7 },
    { name: '张伟', level: 23, value: 15.7 },
    { name: '张伟', level: 23, value: 15.7 },
    { name: '张伟', level: 23, value: 29.7 },
    { name: '张伟', level: 23, value: 15.7 },
    { name: '张伟', level: 23, value: 15.7 },
    { name: '张伟', level: 23, value: 15.7 },
    { name: '张伟', level: 23, value: 15.7 },
    { name: '张伟', level: 23, value: 9.6 },
    { name: '张伟', level: 23, value: 8.6 },
  ],
};
// 能力分析数据
export const capabilityData = {
  // 顶部卡片数据
  topCards: {
    capability: {
      total: 128,
      tools: 45,
      models: 83,
    },
    // 模型调用数据
    calls: {
      total: 124.6,
      tools: 48.3,
      models: 76.3,
    },
    // 模型数据
    models: {
      rate: 99.5,
      time: 1.5,
    },
  },

  // 能力矩阵
  capabilityList: [
    {
      type: 'tool',
      code: 't2',
      name: 'XXXXXXXXXXXXXX模型',
      version: 'V3.2.1',
      users: 95,
      calls: 12890,
      rankingList: [
        { name: '京东集团', value: 16540 },
        { name: '量子讯达科技有限公司', value: 9324 },
        { name: '凯昭创生物科技有限公司', value: 8540 },
      ],
      trendData: {
        dates: ['11-01', '11-06', '11-11', '11-16', '11-21', '11-26', '11-30'],
        values: [1000, 3000, 5000, 7000, 6000, 5000, 4500],
      },
      versionList: [
        { date: '2024-04-23 15:00', version: 'V1', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V25', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
      ],
    },

    {
      type: 'tool',
      code: 't3',
      name: 'XXXXXXXXXXXXXX工具',
      version: 'V2.5.0',
      users: 65,
      calls: 7654,
      rankingList: [
        { name: '京东集团', value: 16540 },
        { name: '量子讯达科技有限公司', value: 9324 },
        { name: '凯昭创生物科技有限公司', value: 8540 },
      ],
      trendData: {
        dates: ['11-01', '11-06', '11-11', '11-16', '11-21', '11-26', '11-30'],
        values: [1000, 3000, 5000, 7000, 6000, 5000, 4500],
      },
      versionList: [
        { date: '2024-04-23 15:00', version: 'V1', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V25', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
      ],
    },
    {
      type: 'model',
      code: 's3',
      name: 'XXXXXXXXXXXXXX模型',
      version: 'V3.1.2',
      accuracy: 97.8,
      calls: 9876,
      responseTime: 1.9,
      successRate: 99.5,
      rankingList: [
        { name: '京东集团', value: 16540 },
        { name: '量子讯达科技有限公司', value: 9324 },
        { name: '凯昭创生物科技有限公司', value: 8540 },
      ],
      trendData: {
        dates: ['11-01', '11-06', '11-11', '11-16', '11-21', '11-26', '11-30'],
        values: [1000, 3000, 5000, 7000, 6000, 5000, 4500],
      },
      versionList: [
        { date: '2024-04-23 15:00', version: 'V1', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V25', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
      ],
    },
    {
      type: 'model',
      code: 's4',
      name: 'XXXXXXXXXXXXXX模型',
      version: 'V4.0.0',
      accuracy: 99.2,
      calls: 15432,
      responseTime: 2.7,
      successRate: 99.8,
      rankingList: [
        { name: '京东集团', value: 16540 },
        { name: '量子讯达科技有限公司', value: 9324 },
        { name: '凯昭创生物科技有限公司', value: 8540 },
      ],
      trendData: {
        dates: ['11-01', '11-06', '11-11', '11-16', '11-21', '11-26', '11-30'],
        values: [1000, 3000, 5000, 7000, 6000, 5000, 4500],
      },
      versionList: [
        { date: '2024-04-23 15:00', version: 'V1', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V25', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
      ],
    },
    {
      type: 'tool',
      code: 't4',
      name: 'XXXXXXXXXXXXXX工具',
      version: 'V3.0.1',
      users: 31,
      calls: 10987,
      rankingList: [
        { name: '京东集团', value: 16540 },
        { name: '量子讯达科技有限公司', value: 9324 },
        { name: '凯昭创生物科技有限公司', value: 8540 },
      ],
      trendData: {
        dates: ['11-01', '11-06', '11-11', '11-16', '11-21', '11-26', '11-30'],
        values: [1000, 3000, 5000, 7000, 6000, 5000, 4500],
      },
      versionList: [
        { date: '2024-04-23 15:00', version: 'V1', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V25', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
      ],
    },
    {
      type: 'model',
      code: 's5',
      name: 'XXXXXXXXXXXXXX模型',
      version: 'V3.3.2',
      accuracy: 97.2,
      calls: 8765,
      responseTime: 1.7,
      successRate: 99.3,
      rankingList: [
        { name: '京东集团', value: 16540 },
        { name: '量子讯达科技有限公司', value: 9324 },
        { name: '凯昭创生物科技有限公司', value: 8540 },
      ],
      trendData: {
        dates: ['11-01', '11-06', '11-11', '11-16', '11-21', '11-26', '11-30'],
        values: [1000, 3000, 5000, 7000, 6000, 5000, 4500],
      },
      versionList: [
        { date: '2024-04-23 15:00', version: 'V1', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V25', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
      ],
    },
    {
      type: 'tool',
      code: 't5',
      name: 'XXXXXXXXXXXXXX工具',
      version: 'V2.8.5',
      users: 58,
      calls: 6543,
      rankingList: [
        { name: '京东集团', value: 16540 },
        { name: '量子讯达科技有限公司', value: 9324 },
        { name: '凯昭创生物科技有限公司', value: 8540 },
      ],
      trendData: {
        dates: ['11-01', '11-06', '11-11', '11-16', '11-21', '11-26', '11-30'],
        values: [1000, 3000, 5000, 7000, 6000, 5000, 4500],
      },
      versionList: [
        { date: '2024-04-23 15:00', version: 'V1', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V25', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
      ],
    },
    {
      type: 'model',
      code: 's6',
      name: 'XXXXXXXXXXXXXX模型',
      version: 'V3.5.0',
      accuracy: 98.9,
      calls: 13456,
      responseTime: 2.4,
      successRate: 99.7,
      rankingList: [
        { name: '京东集团', value: 16540 },
        { name: '量子讯达科技有限公司', value: 9324 },
        { name: '凯昭创生物科技有限公司', value: 8540 },
      ],
      trendData: {
        dates: ['11-01', '11-06', '11-11', '11-16', '11-21', '11-26', '11-30'],
        values: [1000, 3000, 5000, 7000, 6000, 5000, 4500],
      },
      versionList: [
        { date: '2024-04-23 15:00', version: 'V1', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V25', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
      ],
    },
    {
      type: 'tool',
      code: 't6',
      name: 'XXXXXXXXXXXXXX工具',
      version: 'V3.1.0',
      users: 75,
      calls: 9876,
      rankingList: [
        { name: '京东集团', value: 16540 },
        { name: '量子讯达科技有限公司', value: 9324 },
        { name: '凯昭创生物科技有限公司', value: 8540 },
      ],
      trendData: {
        dates: ['11-01', '11-06', '11-11', '11-16', '11-21', '11-26', '11-30'],
        values: [1000, 3000, 5000, 7000, 6000, 5000, 4500],
      },
      versionList: [
        { date: '2024-04-23 15:00', version: 'V1', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V25', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
      ],
    },
    {
      type: 'model',
      code: 's7',
      name: 'XXXXXXXXXXXXXX模型',
      version: 'V3.2.5',
      accuracy: 96.9,
      calls: 7654,
      responseTime: 1.6,
      successRate: 99.1,
      rankingList: [
        { name: '京东集团', value: 16540 },
        { name: '量子讯达科技有限公司', value: 9324 },
        { name: '凯昭创生物科技有限公司', value: 8540 },
      ],
      trendData: {
        dates: ['11-01', '11-06', '11-11', '11-16', '11-21', '11-26', '11-30'],
        values: [1000, 3000, 5000, 7000, 6000, 5000, 4500],
      },
      versionList: [
        { date: '2024-04-23 15:00', version: 'V1', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V25', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
      ],
    },
    {
      type: 'tool',
      code: 't7',
      name: 'XXXXXXXXXXXXXX工具',
      version: 'V2.9.0',
      users: 63,
      calls: 11234,
      rankingList: [
        { name: '京东集团', value: 16540 },
        { name: '量子讯达科技有限公司', value: 9324 },
        { name: '凯昭创生物科技有限公司', value: 8540 },
      ],
      trendData: {
        dates: ['11-01', '11-06', '11-11', '11-16', '11-21', '11-26', '11-30'],
        values: [1000, 3000, 5000, 7000, 6000, 5000, 4500],
      },
      versionList: [
        { date: '2024-04-23 15:00', version: 'V1', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V25', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
      ],
    },
    {
      type: 'model',
      code: 's8',
      name: 'XXXXXXXXXXXXXX模型',
      version: 'V3.4.1',
      accuracy: 98.7,
      calls: 14321,
      responseTime: 2.5,
      successRate: 99.8,
      rankingList: [
        { name: '京东集团', value: 16540 },
        { name: '量子讯达科技有限公司', value: 9324 },
        { name: '凯昭创生物科技有限公司', value: 8540 },
      ],
      trendData: {
        dates: ['11-01', '11-06', '11-11', '11-16', '11-21', '11-26', '11-30'],
        values: [1000, 3000, 5000, 7000, 6000, 5000, 4500],
      },
      versionList: [
        { date: '2024-04-23 15:00', version: 'V1', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V25', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
      ],
    },
    {
      type: 'tool',
      code: 't8',
      name: 'XXXXXXXXXXXXXX工具',
      version: 'V3.2.0',
      users: 34,
      calls: 8765,
      rankingList: [
        { name: '京东集团', value: 16540 },
        { name: '量子讯达科技有限公司', value: 9324 },
        { name: '凯昭创生物科技有限公司', value: 8540 },
      ],
      trendData: {
        dates: ['11-01', '11-06', '11-11', '11-16', '11-21', '11-26', '11-30'],
        values: [1000, 3000, 5000, 7000, 6000, 5000, 4500],
      },
      versionList: [
        { date: '2024-04-23 15:00', version: 'V1', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V25', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
      ],
    },
    {
      type: 'model',
      code: 's9',
      name: 'XXXXXXXXXXXXXX模型',
      version: 'V3.3.0',
      accuracy: 97.9,
      calls: 10987,
      responseTime: 2.2,
      successRate: 99.6,
      rankingList: [
        { name: '京东集团', value: 16540 },
        { name: '量子讯达科技有限公司', value: 9324 },
        { name: '凯昭创生物科技有限公司', value: 8540 },
      ],
      trendData: {
        dates: ['11-01', '11-06', '11-11', '11-16', '11-21', '11-26', '11-30'],
        values: [1000, 3000, 5000, 7000, 6000, 5000, 4500],
      },
      versionList: [
        { date: '2024-04-23 15:00', version: 'V1', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V25', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
        { date: '2024-04-23 15:00', version: 'V3.0', description: '训练数据扩充', accuracy: 83 },
      ],
    },
  ],
};
// 客户分析数据
export const customerData = {
  // 顶部卡片数据
  topCards: {
    customers: {
      total: 5328,
    },
    // 能力打造者数据
    creators: {
      total: 1033,
      share: 560,
    },
    // 能力使用者数据
    users: {
      total: 2456,
      income: 138.2,
    },
  },

  // 能力使用者排行
  userList: [
    { name: 'xxx公司', belong: '江浙地区', callTimes: 23, income: 15.7 },
    { name: 'xxx单位', belong: '江浙地区', callTimes: 23, income: 15.7 },
    { name: 'xxx单位', belong: '江浙地区', callTimes: 23, income: 15.7 },
    { name: 'xxx单位', belong: '江浙地区', callTimes: 23, income: 29.7 },
    { name: 'xxx单位', belong: '江浙地区', callTimes: 2523, income: 15.7 },
    { name: 'xxx单位', belong: '江浙地区', callTimes: 23, income: 15.7 },
    { name: 'xxx单位', belong: '江浙地区', callTimes: 23, income: 15.7 },
    { name: 'xxx单位', belong: '江浙地区', callTimes: 23, income: 15.7 },
    { name: 'xxx单位', belong: '江浙地区', callTimes: 23, income: 9.6 },
    { name: 'xxx单位', belong: '江浙地区', callTimes: 23, income: 8.6 },
    { name: 'xxx单位', belong: '江浙地区', callTimes: 23, income: 8.1 },
  ],
  // 能力打造者排行
  creatorList: [
    { name: '刘面', belong: '技术分析部门', callTimes: 23, income: 15.7 },
    { name: '张伟', belong: '技术分析部门', callTimes: 23, income: 15.7 },
    { name: '张伟', belong: '技术分析部门', callTimes: 23, income: 15.7 },
    { name: '张伟', belong: '技术分析部门', callTimes: 23, income: 29.7 },
    { name: '张伟', belong: '技术分析部门', callTimes: 395623, income: 15.7 },
    { name: '张伟', belong: '技术分析部门', callTimes: 23, income: 15.7 },
    { name: '张伟', belong: '技术分析部门', callTimes: 23, income: 15.7 },
    { name: '张伟', belong: '技术分析部门', callTimes: 23, income: 15.7 },
    { name: '张伟', belong: '技术分析部门', callTimes: 23, income: 9.6 },
    { name: '张伟', belong: '技术分析部门', callTimes: 23, income: 8.6 },
    { name: '张伟', belong: '技术分析部门', callTimes: 23, income: 18.6 },
  ],
};
