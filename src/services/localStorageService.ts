export function generateId() {
  const mockId = Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
  return `mockId-${mockId}`
}
export function isMockId(str: string|number) {
  return str.toString().startsWith('mockId-')
}
export async function getLocalData(tableName: string) {
  try {
    const data = localStorage.getItem(`db-${tableName}`)
    return data ? JSON.parse(data): null
  } catch{
    return null
  }
}
/** 设置数据项 */
export async function setLocalData(tableName: string, params: any) {
  const localData = await getLocalData(tableName) || []
  localData.push({
    id: generateId(),
    ...params,
  })
  localStorage.setItem(`db-${tableName}`, JSON.stringify(localData))
}
/** 更新数据项 */
export async function updateLocalData(tableName: string, params: any) {
  const localData = await getLocalData(tableName) || []
  const dataIndex = localData.findIndex((item: any) => item.id === params.id)
  if (dataIndex === -1) {
    setLocalData(tableName, params)
  } else {
    localData[dataIndex] = params
    localStorage.setItem(`db-${tableName}`, JSON.stringify(localData))
  }
}
/** 保存删除数据 */
async function saveDelData(tableName: string, id: any) {
  const delData = await getLocalData(tableName) || {}
  if (delData[tableName]) {
    if (!delData[tableName].includes(id)) {
      delData[tableName].push(id)
    }
  } else {
    delData[tableName] = [id]
  }
  localStorage.setItem(`db-delete`, JSON.stringify(delData))
}
/** 删除数据项 */
export async function delLocalData(tableName: string, id: any) {
  const localData = await getLocalData(tableName) || []
  const dataIndex = localData.findIndex((item: any) => item.id === id)
  if (dataIndex !== -1) {
    localData.splice(dataIndex, 1)
    if (!isMockId(id)) {
      saveDelData(tableName, id)
      setLocalData('delData', {
        tableName,
        id,
      })
    }
    localStorage.setItem(`db-${tableName}`, JSON.stringify(localData))
  }
}

export async function getLocalDataList(tableName: string, list: any) {
  let dataList: any = []
  const localData = await getLocalData(tableName) || []
  const delData = await getLocalData('db-delete') || {}
  const { updateData, newData } = localData.reduce((acc: any, item: any) => {
    console.log(333, item)
    if (isMockId(item.id)) {
      acc.newData.push(item);
    } else {
      acc.updateData.push(item);
    }
    return acc;
  }, { updateData: [], newData: []});
  list.forEach((item: any) => {
    if (!delData[tableName]?.includes(item.id)) {
      const updateItem = updateData.find((updateItem: any) => updateItem.id === item.id)
      dataList.push(updateItem || item)
    }
  })

  return [
    ...dataList,
    ...newData,
  ]
}