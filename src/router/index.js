import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap } from "@/config/routerconfig";

Vue.use(Router)

const router = new Router({
  mode: 'history', // 需要hash模式请直接注释此行
  routes: constantRouterMap
})

// // 添加一个路由守卫
// router.beforeEach((to, from, next) => {
//   // 只要请求的路由不是 login 就需要进行登录验证
//   if (to.path != '/login') {
//     console.log(localStorage.getItem('token'))
//     // 判断是否存在  token
//     if (!localStorage.getItem('token')) {
//       console.log(localStorage.getItem('token'))
//       this.$message.error('您还没有登录!')
//       router.push('/login')
//       return
//     } 
//   }
//   next()
// })

export default router
