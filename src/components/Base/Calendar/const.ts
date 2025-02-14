export const weekList = ['日','一','二','三','四','五','六']

export const getMonthDays = (year: string|number, month: string|number) => {
  return new Date(Number(year), Number(month), 0).getDate()
}
// 获取某月第一天是周几
export const getDayOfWeek = (year: string|number, month: string|number) => {
  // 创建一个日期对象，设置为当前月的第一天
  return new Date(Number(year), Number(month) - 1, 1).getDay(); // 月份是从0开始的，所以需要减1 返回0（星期天）到6（星期六） 
}

export const getMonthList = (year: string|number, month: string|number, isMin?: boolean) => {
  let list: any[] = []
  const days = getMonthDays(year, month)
  const dayOfWeek = getDayOfWeek(year, month)
  for (let i = 0;i < days; i++) {
    list.push({
      date: `${year}-${month}-${i + 1}`,
    })
  }
  if (isMin) {
    return [...new Array(dayOfWeek),...list]
  }
  return [...new Array(dayOfWeek),...list]
}