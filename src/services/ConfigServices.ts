import http from './httpService'

class ConfigServices {
  public async deploy(message: string, isTypeCheck: boolean): Promise<any>{
    return http.get('/api/script/deploy', { params: {  
      message,
      isTypeCheck,
    }})
  }
}

export default new ConfigServices()