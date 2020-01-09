import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap } from "@/config/routerconfig";

Vue.use(Router)

const router = new Router({
  mode: 'history', // 需要hash模式请直接注释此行
  routes: constantRouterMap
})


export default router
