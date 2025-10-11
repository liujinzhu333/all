import { useConfigStore } from '@/stores/config'
import axios from 'axios'

// 创建axios实例
const http = axios.create({
  baseURL: '/',  // API的基础路径
  timeout: 10000,                       // 请求超时时间
})

const getJsonUrl = (config: any) => {
  // 重定向到 public 目录下的 data
  if (config.url === '/api/db/table/list') {
    return '/db/data/sqlite_sequence.json' 
  }
  if (config.url === '/api/db/table/info') {
    const { name } = config.params
    return `/db/data/table_info.json`
    // return `/db/table_info/${name}.json`
  }
  // 定义正则表达式并捕获 tableName
  const pattern = /^\/api\/db\/table\/([^/]+)\/list$/
  if (pattern.test(config.url)) {
    const match = config.url.match(pattern)
    return `/db/data/${match[1]}.json`
  }
  return config.url
}

// 请求拦截器
http.interceptors.request.use(config => {
  const { isDev } = useConfigStore()
  // 在发送请求之前做些什么，比如添加token等
  // config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  const isLocation =  config.url?.endsWith('.json')
  if (isLocation && isDev) {
    config.url = `/all${config.url}`
  }
  if (!isDev) {
    config.url = getJsonUrl(config)
    config.baseURL = '/all'
  }
  config.timeout = 30000
  return config
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 响应拦截器
http.interceptors.response.use(response => {
  const { isDev } = useConfigStore()
  const isLocation =  response.config.url?.endsWith('.json')
  // 对响应数据做点什么
  if (!isDev || isLocation) {
    return response.data
  } else {
    return response.data.data;
  }
}, error => {
  // 对响应错误做点什么，比如统一处理错误信息等
  if (error.response) {
    switch (error.response.status) {
      case 401:
        // 处理401错误，例如重新登录
        break;
      case 403:
        // 处理403错误，例如权限不足提示
        break;
      default:
        break;
    }
  }
  return Promise.reject(error);
})
 
export default http