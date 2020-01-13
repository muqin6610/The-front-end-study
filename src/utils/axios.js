// 封装的一个axios插件
// 导入vue
import Vue from 'vue'
// 导入axios
import axios from 'axios'

import { Notification } from 'element-ui'

// 创建插件对象
let myaxios = {}
// 添加install方法
myaxios.install = function (Vue) {
  // 统一设置请求的api
  axios.defaults.baseURL = 'http://localhost:4000/api/'
  // 给Vue实例对象添加方法
  Vue.prototype.$http = axios
  // 设置请求拦截器
  axios.interceptors.request.use((config) => {
    // 非login页面都设置请求头
    if (config.url !== 'login') {
      config.headers.common['Authorization'] = localStorage.getItem('token')
    }
    return config
  })
  // 添加响应拦截器
  axios.interceptors.response.use(response => {
    // 响应数据
    return response
  }, error => {
    Notification.error({
      title: '错误',
      message: error
    })
  })
}
export default myaxios