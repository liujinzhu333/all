import { useConfigStore } from '@/stores/config'
import http from './httpService'

const isDev = () => {
  const config = useConfigStore()
  return config.isDev
}
class ManageService {
  /** 数据库连接状态 */
  public async getDatabaseConnectStatus(): Promise<any>{
    return http.get('/api/db/status')
  }
  /** 连接数据库 */
  public async connectDatabase(): Promise<any>{
    return http.get('/api/db/connect')
  }
  /** 断开数据库连接 */
  public async closeConnection(): Promise<any>{
    return http.get('/api/db/close')
  }
  /** 同步数据库数据 */
  public async getAllDataJson(){
    return http.get('/api/db/get_json')
  }
  /** 获取全部数据表 */
  public async getAllTable(){
    return http.get('/api/db/table/list')
  }
  /** 新增数据表 */
  public async addTable(name: string, title: string, keys: any[]){
    return http.post('/api/db/table/create', { name, title, keys })
  }
  /** 修改数据表 */
  public async updateTable(name: string, title: string, keys: any[], oldName?: string){
    return http.post('/api/db/table/update', { name, title, keys, oldName })
  }
  /** 删除数据表 */
  public async delTable(name: string){
    return http.get('/api/db/table/delete', { params: { name }} )
  }
  /** 数据表添加字段 */
  public async addTableColumn(name: string, keys: any[]){
    return http.post('/api/db/table/add_column', { name, keys })
  }
  /** 获取数据表结构 */
  public async getTableInfo(name: string): Promise<any>{
    const res: any = await http.get<any>('/api/db/table/info', { params: { name }})
    if (!isDev()) {
      const info = res?.find((item: any) => item.name === name)
      return {
        ...info,
        rows: JSON.parse(info.info),
      }
    }
    return res
  }
  /** 获取数据表数据 */
  public async getDataList(tableName: string, params?: {
    page: number
    pageSize: number
    [key: string]: any
  }): Promise<any>{
    const res = await http.get(`/api/db/table/${tableName}/list`, { params })
    return res
  }
  /** 添加数据 */
  public async addDataItem(tableName: string, params?: any){
    if(isDev()) {
      return http.post(`/api/db/table/${tableName}/add`, params)
    } else {
      if ('sharedStorage' in window) {
        // 共享存储 API 可用
        const sharedStorage = window.sharedStorage;
        sharedStorage.set('ab-test-group', 'variant-a').then(res =>{
          console.log(3331, res)
        }).catch(e => {
          console.log(3332, e)
        })
        console.log(sharedStorage)
      } else {
        // 不支持共享存储 API，需要提供回退方案
        console.error('Shared Storage API is not supported in this browser.');
      }
      // window.sharedStorage.set('21313213', '2312131332')
      const bc = new BroadcastChannel('storage_channel');
      localStorage.setItem(tableName, JSON.stringify(params))
      bc.postMessage({ type: 'storageUpdate', key: 'shared', value: 'data' });
    }
  }
  /** 删除数据 */
  public async deleteDataItem(tableName: string, id: number){
    return http.get(`/api/db/table/${tableName}/delete`, { params: { id }})
  }
  /** 修改数据 */
  public async updateDataItem(tableName: string, params: any){
    return http.post(`/api/db/table/${tableName}/update`, params)
  }
  /** 获取数据详情 */
  public async getDataInfo(tableName: string, id: string){
    return http.get(`/api/db/table/${tableName}/info`, { params: { id }})
  }
}

export default new ManageService()