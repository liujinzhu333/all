export const statusMap:any = {
  1: {
    type: 'info',
    text: '待开始',
  },
  2: {
    type: 'primary',
    text: '进行中',
  },
  3: {
    type: 'success',
    text: '已完成',
  },
}

export function buildTree(items: any, pid: string|number|null = null, filter?: string) {
  const tree = [];
  
  for (const item of items) {
    if (item.pid === pid) {
      const children = buildTree(items, item.id, filter);
      if (children.length > 0) {
        item.children = children;
      }
      if (children.length > 0 ||  filter === item.status || filter === '0' || !filter) {
        tree.push(item)
      }
    }
  }
  
  return tree;
}