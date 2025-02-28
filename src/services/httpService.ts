import axios from 'axios'

const isDev = import.meta.env.DEV;
const useJson = !isDev

// 创建axios实例
const http = axios.create({
  baseURL: '/',  // API的基础路径
  timeout: 10000,                       // 请求超时时间
})

const getJsonUrl = (config: any) => {
  // 重定向到 public 目录下的 data
  if (config.url === '/api/db/table/list') {
    return '/all/sqlite_sequence.json' 
  }
  if (config.url === '/api/db/table/info') {
    return 
  }
  return 
}

// 请求拦截器
http.interceptors.request.use(config => {
  // 在发送请求之前做些什么，比如添加token等
  if (useJson) {
    config.url = getJsonUrl(config)
  }
  // config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  return config;
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 响应拦截器
http.interceptors.response.use(response => {
  // 对响应数据做点什么
  if (useJson) {
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