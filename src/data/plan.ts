export interface PlanItem {
  title: string // 标题
  type?: string // 类型
  status?: string // 状态
  time?: string // 时间
  children?: PlanItem[]
}
export const planList:PlanItem[] = [
  {
    title: '项目',
    status: '进行中',
    children: [
      {
        title: 'UI-页面',
        status: '进行中',
        children: [
          {
            title: 'UI-框架',
            status: '进行中',
          },
          {
            title: '首页',
            status: '进行中',
          },
          {
            title: '组件库',
            status: '未开始',
          },
          {
            title: '项目',
            status: '未开始',
          },
          {
            title: '文档',
            status: '未开始',
          },
          {
            title: '记录',
            status: '未开始',
          },
        ]
      },
      {
        title: '框架完善',
        status: '未开始',
        children: [
          {
            title: 'stores-pinia'
          },
          {
            title: '接口请求-axios'
          },
        ]
      },
      {
        title: '部署',
        status: '未开始',
      }
    ]
  },
  {
    title: '生活项',
    children: [
      {
        title: '驾照体检',
      },
      {
        title: '公司体检',
      },
      {
        title: '孕检-2.8',
      },
      {
        title: '看房子',
      }
    ]
  }
]