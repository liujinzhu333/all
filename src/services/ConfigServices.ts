import http from './httpService'

class ConfigServices {
  public async deploy(message: string): Promise<any>{
    return http.get('/api/script/deploy', { params: { message}})
  }
}

export default new ConfigServices()