// axios插件
import Vue from 'vue'
import axios from 'axios'

// 创建插件对象
let axios = {}
// 添加install方法
axios.install = function(Vue) {
    // 统一设置请求的api
    axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5d4ab4f260f3f448a4ec933b/example'
    // 设请求超时
    axios.defaults.timeout = 6000
    //给Vue实例添加方法
    Vue.prototype.$http = axios
    //设置请求拦截器
    axios.interceptors.request.use((config) => {
        //非login相关页面设置请求头
        if(config.url !== 'login') {
            config.headers.common['Authorization'] = localStorage.getItem('token')
        }
        return config
    })

    // 设置响应拦截器
    axios.interceptors.response.use( response => { 
        if(response.data.errCode === 2) {
            router.push({
                path:'/login',
                query:{redirect:router.currentRoute.fullPath}
            })
        }
        return response
    },error => {
        return Promise.reject(error)
    })
}

// 导出
export default axios