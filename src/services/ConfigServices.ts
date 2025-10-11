import http from './httpService'

class ConfigServices {
  public async deploy(message: string, isTypeCheck: boolean): Promise<any>{
    return http.get('/api/script/deploy', { params: {  
      message,
      isTypeCheck,
    },
    timeout: 60000, // 构建提交超时时间设置为60s
    })
  }
}

export default new ConfigServices()