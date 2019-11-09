import Vue from 'vue'
import Router from 'vue-router'

// 路由懒加载
const Home = () => import ('@/views/Home/Home.vue' )
const SystemSetup = () => import ('@/views/Home/SystemSetup/systemSetup.vue')
const UserManage = () => import ('@/views/Home/SystemSetup/userManage.vue')
const RoleManage = () => import ('@/views/Home/SystemSetup/roleManage.vue') 
const PlateManage = () => import ('@/views/Home/SystemSetup/plateManage.vue') 
const LookPlateMore = () => import ('@/views/Home/SystemSetup/lookPlateMore.vue')
const MonitoringCenter = () => import ('@/views/Home/MonitoringCenter/monitoringCenter.vue')
const AllMonitoring = () => import ('@/views/Home/MonitoringCenter/allMonitoring.vue')
const UserMonitoring = () => import ('@/views/Home/MonitoringCenter/userMonitoring.vue')
const MapMonitoring = () => import ('@/views/Home/MonitoringCenter/mapMonitoring.vue')
const DataManagement = () => import ('@/views/Home/DataManagement/dataManagement.vue')
const HomePage = () => import ('@/views/Home/HomePage/HomePage.vue')
const Myhomepage = () => import ('@/views/Home/Users/myhomepage.vue')
const MessagePage = () =>  import ('@/views/Home/messagePage/messagePage.vue') 
const MyNes = () => import ('@/views/Home/Users/myNes.vue')
const ManagementZone = () => import ('@/views/Home/ManagementZone/managementZone.vue')
const BookDivision = () => import ('@/views/Home/ManagementZone/bookDivision.vue')
const VideoDivision = () => import ('@/views/Home/ManagementZone/videoDivision.vue')
const ForumDivision = () => import ('@/views/Home/ManagementZone/forumDivision.vue')
const RecommendDivision = () => import ('@/views/Home/ManagementZone/recommendDivision.vue')
const HotDivision = () => import ('@/views/Home/ManagementZone/hotDivision.vue')
const DownloadDivision = () => import ('@/views/Home/ManagementZone/downloadDivision.vue')
const Login = () => import ('@/views/Login/Login.vue') 
const Register = () => import ('@/views/Login/RegisterResult.vue') 
const Notfount404 = () => import ('@/views/404/404.vue') 

//引入element的Message
import { Message } from 'element-ui'

Vue.use(Router)

const router = new Router({
  mode: 'history', // 需要hash模式请直接注释此行
  routes: [
    { path: '/',redirect: '/home/homePage', meta:{
                title:'首页'
            } },
    { path: '*',name: 'notfount404',component: Notfount404, meta:{
                title:'404页面'
            } },
    { path: '/login',name: 'login',component: Login, meta:{
                title:'登录页面'
            } },
    { path: '/register',name: 'register',component: Register, meta:{
                title:'注册页面'
            } },
    { path: '/home',name: 'home',component: Home, 
      children: [
        { path: '/home/messagePage',name: 'messagePage',component: MessagePage, meta:{
                title:'消息通知'
            } },
        { path: '/home/homePage',name: 'homePage',component: HomePage, meta:{
                title:'首页'
            } },
        { path: '/home/systemSetup',name: 'systemSetup',component: SystemSetup, meta:{
                title:'系统设置'
            } },
        { path: '/home/systemSetup/userManage',name: 'userManage',component: UserManage, meta:{
                title:'用户管理'
            } },
        { path: '/home/systemSetup/roleManage',name: 'roleManage',component: RoleManage, meta:{
                title:'角色管理'
            } },
        { path: '/home/systemSetup/plateManage',name: 'plateManage',component: PlateManage, meta:{
                title:'模块管理'
            } },
        { path: '/home/systemSetup/plateManage/lookPlateMore',name: 'lookPlateMore',component: LookPlateMore, meta:{
                title:'查看更多'
            } },
        { path: '/home/monitoringCenter',name: 'monitoringCenter',component: MonitoringCenter, meta:{
                title:'监控中心'
            } },
        { path: '/home/monitoringCenter/allMonitoring',name: 'allMonitoring',component: AllMonitoring, meta:{
                title:'整体监控'
            } },
        { path: '/home/monitoringCenter/userMonitoring',name: 'userMonitoring',component: UserMonitoring, meta:{
                title:'用户监控'
            } },
        { path: '/home/monitoringCenter/mapMonitoring',name: 'mapMonitoring',component: MapMonitoring, meta:{
                title:'地图监控'
            } },
        { path: '/home/dataManagement',name: 'dataManagement',component: DataManagement, meta:{
                title:'资料管理'
            } },
        { path: '/home/myhomepage',name: 'myhomepage',component: Myhomepage, meta:{
                title:'我的主页'
            } },
        { path: '/home/myNes',name: 'myNes',component: MyNes, meta:{
                title:'个人设置'
            } },
        { path: '/home/ManagementZone',name: 'managementZone',component: ManagementZone, meta:{
                title:'专区管理'
            } },
        { path: '/home/ManagementZone/bookDivision',name: 'bookDivision',component: BookDivision, meta:{
                title:'书籍专区'
            } },
        { path: '/home/ManagementZone/videoDivision',name: 'videoDivision',component: VideoDivision, meta:{
                title:'视频专区'
            } },
        { path: '/home/ManagementZone/forumDivision',name: 'forumDivision',component: ForumDivision, meta:{
                title:'论坛专区'
            } },
        { path: '/home/ManagementZone/recommendDivision',name: 'recommendDivision',component: RecommendDivision, meta:{
                title:'推荐专区'
            } },
        { path: '/home/ManagementZone/hotDivision',name: 'hotDivision',component: HotDivision, meta:{
                title:'热门专区'
            } },
        { path: '/home/ManagementZone/downloadDivision',name: 'downloadDivision',component: DownloadDivision, meta:{
                title:'下载专区'
            } },
      ]
    },
  ]
})

// //添加一个路由守卫
// router.beforeEach((to,form,next) => {
//   //完成登录逻辑,只要请求的不是login就需要登录验证
//   if(to.path != '/login' && to.path != '/register') {
//     //判断是否存在token
//     if(!window.localStorage.getItem('token')) {
//       Message({
//         type:'error',
//         message:'无效的token!'
//       })
//       //跳转到登录页面
//       router.push('/login')
//       return
//     }
//   }
//   next()
// })

export default router
