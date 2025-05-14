import http from './httpService'

class ConfigServices {
  public async deploy(): Promise<any>{
    return http.get('/api/script/deploy')
  }
}

export default new ConfigServices()