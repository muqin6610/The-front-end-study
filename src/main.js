// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import { httpGet, httpPost, httpPut, httpDelete } from './utils/api'

// 定义请求的全局变量
Vue.prototype.$post = httpGet
Vue.prototype.$get = httpPost
Vue.prototype.$put = httpPut
Vue.prototype.$delete = httpDelete

//引入element-ui
import ElementUI from 'element-ui'
//引入element样式
import '../node_modules/element-ui/lib/theme-chalk/index.css'
//使用
Vue.use(ElementUI)

// 引入进度条
import NProgress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'

//引入VCharts
import VCharts from "v-charts"
//使用
Vue.use(VCharts)

//封装的标准日期格式化:yyyy-mm-dd HH:mm
import { dateFormat } from "./utils/util"
//挂载到vue原型,所有页面钩子函数均可使用
Vue.prototype.dateFormat = dateFormat

//设置导航守卫（路由拦截器）
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
      document.title = to.meta.title
  }
  NProgress.start()
  next()
});

router.afterEach(transition => {
  NProgress.done()
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
