import http from './httpService'

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
  /** 断开数据库连接 */
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
    return http.get('/api/db/table/info', { params: { name }})
  }
  /** 获取数据表数据 */
  public async getDataList(tableName: string, params?: any): Promise<any>{
    return http.get(`/api/db/table/${tableName}/list`, { params })
  }
  /** 添加数据 */
  public async addDataItem(tableName: string, params?: any){
    return http.post(`/api/db/table/${tableName}/add`, params)
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