// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

import myaxios from "./utils/axios"
Vue.use(myaxios)

import Echarts from 'echarts'//引入echarts
Vue.prototype.$echarts = Echarts;//把echarts绑定在vue的原型上 这样在组件里面就可以通过this.$echarts来访问了

// 引入裁剪
import VueCropper from 'vue-cropper'
Vue.use(VueCropper)

// 引入日历
import { calendar } from "./utils/calendar";
Vue.prototype.$calendar = calendar

// 引入日期时间计算转化插件
import { timeDate } from "./utils/timeDate";
Vue.prototype.$timeDate = timeDate

// 引入打印
import Print from 'vue-print-nb-jeecg'
Vue.use(Print)

//引入element-ui
import ElementUI from 'element-ui'
//引入element样式
import '../node_modules/element-ui/lib/theme-chalk/index.css'
//使用
Vue.use(ElementUI)

//引入element的Message
import { Message } from 'element-ui'


// 引入进度条
import NProgress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'

// 引入自定义全局组件
import popupRegistry from './popup/popup'
Vue.use(popupRegistry)

// 引入websocket
import { connectSocket } from "./api/socket"
Vue.prototype.$connectSocket = connectSocket

//引入VCharts
import VCharts from "v-charts"
//使用
Vue.use(VCharts)

// 引入图片懒加载
import VueLazyload from 'vue-lazyload'
// 使用
Vue.use(VueLazyload)

// 引入百度地图
import BaiduMap from 'vue-baidu-map'
// 使用
Vue.use(BaiduMap, {
  /* Visit http://lbsyun.baidu.com/apiconsole/key for details about app key. */
  ak: 'gonXpzBIsYpB2ODe1DADGL9yVjZlQP5c'
})

//引入高德地图
import VueAMap from 'vue-amap'
// 使用
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: 'fd59a2541c7b4d61ba7d1ca1ead1e7a2',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
})

//设置导航守卫（路由拦截器）
router.beforeEach((to, from, next) => {
  // 完成登录逻辑,只要请求的不是login就需要登录验证
  // if(to.path != '/login' && to.path != '/register') {
  //   //判断是否存在token
  //   if(!window.localStorage.getItem('token')) {
  //     Message({
  //       type:'error',
  //       message:'无效的token!'
  //     })
  //     //跳转到登录页面
  //     router.push('/login')
  //     return
  //   }
  // }
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

