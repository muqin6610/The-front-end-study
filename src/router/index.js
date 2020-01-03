import Vue from 'vue'
import Router from 'vue-router'

// 路由懒加载
const Home = () => import ('@/views/Home/Home.vue' ) // 主页
const SystemSetup = () => import ('@/views/Home/SystemSetup/systemSetup.vue') // 系统设置
const UserManage = () => import ('@/views/Home/SystemSetup/userManage.vue') // 用户设置
const RoleManage = () => import ('@/views/Home/SystemSetup/roleManage.vue')  // 角色设置
const PlateManage = () => import ('@/views/Home/SystemSetup/plateManage.vue') // 模块设置
const LookPlateMore = () => import ('@/views/Home/SystemSetup/lookPlateMore.vue') //查看模块详情
const MonitoringCenter = () => import ('@/views/Home/MonitoringCenter/monitoringCenter.vue') // 监控中心
const AllMonitoring = () => import ('@/views/Home/MonitoringCenter/allMonitoring.vue') // 整体监控
const UserMonitoring = () => import ('@/views/Home/MonitoringCenter/userMonitoring.vue') // 用户监控
const MapMonitoring = () => import ('@/views/Home/MonitoringCenter/mapMonitoring.vue') // 地图监控
const DataManagement = () => import ('@/views/Home/DataManagement/dataManagement.vue') // 资料管理
const Demo = () => import ('@/views/Home/DataManagement/demo.vue') // 充电特效Demo
const Css3Demo = () => import ('@/views/Home/DataManagement/Css3Demo.vue') // css3Demo
const TableDemo = () => import ('@/views/Home/SwatAuxiliary/tableDemo.vue') // 成绩考核表格
const SetCategory = () => import ('@/views/Home/SwatAuxiliary/setCategory.vue') // 设置训练项目类别
const SetCategoryTree = () => import ('@/views/Home/SwatAuxiliary/setCategoryTree.vue') // 设置训练项目类别树
const TrainingProgramList = () => import ('@/views/Home/SwatAuxiliary/TrainingProgramList.vue') // 训练计划列表
const ProgramParticulars = () => import ('@/views/Home/SwatAuxiliary/ProgramParticulars.vue') // 训练计划详情
const AddProgramParticulars = () => import ('@/views/Home/SwatAuxiliary/AddProgramParticulars.vue') // 新增训练计划详情
const TrainingProgramAdd = () => import ('@/views/Home/SwatAuxiliary/TrainingProgramAdd.vue') // 新增训练计划
const TrainingProjectList = () => import ('@/views/Home/SwatAuxiliary/TrainingProjectList.vue') // 训练项目列表
const TrainingProjectAdd = () => import ('@/views/Home/SwatAuxiliary/TrainingProjectAdd.vue') // 新增项目
const LookPastProjucts = () => import ('@/views/Home/SwatAuxiliary/LookPastProjucts.vue') // 查看历史项目
const DepartList = () => import ('@/views/Home/SwatAuxiliary/DepartList.vue') // 部队列表
const AddDepartList = () => import ('@/views/Home/SwatAuxiliary/AddDepartList.vue') // 新增部队
const ListOfPersons = () => import ('@/views/Home/SwatAuxiliary/ListOfPersons.vue') // 部队详情
const AddFuzz = () => import ('@/views/Home/SwatAuxiliary/AddFuzz.vue') // 添加警员
const BaiduMapDemo = () => import ('@/views/Home/Flashlight/baiduMapDemo.vue') // 百度地图demo
const AmapJS = () => import ('@/views/Home/Flashlight/amapJS.vue') // 高德地图原生JS报警
const TrackPlayback = () => import ('@/views/Home/Flashlight/trackPlayback.vue') // 高德地图原生JS轨迹
const AlarmLog = () => import ('@/views/Home/Flashlight/alarmLog.vue') // 报警日志
const FlashlightList = () => import ('@/views/Home/Flashlight/flashlightList.vue') // 手电筒列表
const WaterPoloDemo = () => import ('@/views/Home/SmartCampus/waterPoloDemo.vue') // 体温统计demo
const StaffDetailsModule = () => import ('@/views/Home/SmartCampus/modules/waterPoloDemoModule/StaffDetailsModule.vue') // 体温统计人员详情
const ClassManagement = () => import ('@/views/Home/SmartCampus/classManagement.vue') // 班级管理
const Blacklist = () => import ('@/views/Home/SmartCampus/blacklist.vue') // 黑名单列表
const DisciplinaryRule = () => import ('@/views/Home/SmartCampus/DisciplinaryRule.vue') // 违纪规则
const DisciplinaryStatistics = () => import ('@/views/Home/SmartCampus/DisciplinaryStatistics.vue') // 违纪统计
const DeviceManagement = () => import ('@/views/Home/SmartCampus/DeviceManagement.vue') // 设备管理
const HomePage = () => import ('@/views/Home/HomePage/HomePage.vue') // 首页
const Myhomepage = () => import ('@/views/Home/Users/myhomepage.vue') // 我的主页
const MessagePage = () =>  import ('@/views/Home/messagePage/messagePage.vue') // 消息通知
const MyNes = () => import ('@/views/Home/Users/myNes.vue') // 个人中心
const ManagementZone = () => import ('@/views/Home/ManagementZone/managementZone.vue') // 专区管理
const BookDivision = () => import ('@/views/Home/ManagementZone/bookDivision.vue') // 书籍专区
const VideoDivision = () => import ('@/views/Home/ManagementZone/videoDivision.vue') // 视频专区
const ForumDivision = () => import ('@/views/Home/ManagementZone/forumDivision.vue') // 论坛专区
const RecommendDivision = () => import ('@/views/Home/ManagementZone/recommendDivision.vue') // 推荐专区
const HotDivision = () => import ('@/views/Home/ManagementZone/hotDivision.vue') // 热门专区
const DownloadDivision = () => import ('@/views/Home/ManagementZone/downloadDivision.vue') // 下载专区
const Login = () => import ('@/views/Login/Login.vue')  // 登录
const Register = () => import ('@/views/Login/RegisterResult.vue')  // 注册
const Notfount404 = () => import ('@/views/404/404.vue') // 404


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
        { path: '/home/dataManagement/demo',name: 'demo',component: Demo, meta:{
                title:'充电特效Demo'
            } },
        { path: '/home/dataManagement/css3Demo',name: 'css3Demo',component: Css3Demo, meta:{
                title:'css3Demo'
            } },
        { path: '/home/swatAuxiliary/tableDemo',name: 'tableDemo',component: TableDemo, meta:{
                title:'成绩考核表格'
            } },
        { path: '/home/swatAuxiliary/setCategory',name: 'setCategory',component: SetCategory, meta:{
                title:'项目类别设置'
            } },
        { path: '/home/swatAuxiliary/setCategory/setCategoryTree',name: 'setCategoryTree',component: SetCategoryTree, meta:{
                title:'项目类别设置树'
            } },
        { path: '/home/swatAuxiliary/trainingProgramList',name: 'trainingProgramList',component: TrainingProgramList, meta:{
                title:'训练计划列表'
            } },
        { path: '/home/swatAuxiliary/programParticulars',name: 'programParticulars',component: ProgramParticulars, meta:{
                title:'训练计划详情'
            } },
        { path: '/home/swatAuxiliary/addProgramParticulars',name: 'addProgramParticulars',component: AddProgramParticulars, meta:{
                title:'新增训练计划详情'
            } },
        { path: '/home/swatAuxiliary/trainingProgramAdd',name: 'trainingProgramAdd',component: TrainingProgramAdd, meta:{
                title:'新增训练计划'
            } },
        { path: '/home/swatAuxiliary/trainingProjectList',name: 'trainingProjectList',component: TrainingProjectList, meta:{
                title:'训练项目列表'
            } },
        { path: '/home/swatAuxiliary/trainingProjectAdd',name: 'trainingProjectAdd',component: TrainingProjectAdd, meta:{
                title:'新增项目'
            } },
        { path: '/home/swatAuxiliary/lookPastProjucts',name: 'lookPastProjucts',component: LookPastProjucts, meta:{
                title:'查看历史项目'
            } },
        { path: '/home/swatAuxiliary/departList',name: 'departList',component: DepartList, meta:{
                title:'部队列表'
            } },
        { path: '/home/swatAuxiliary/addDepartList',name: 'addDepartList',component: AddDepartList, meta:{
                title:'新增部队'
            } },
        { path: '/home/swatAuxiliary/listOfPersons',name: 'listOfPersons',component: ListOfPersons, meta:{
                title:'部队详情'
            } },
        { path: '/home/swatAuxiliary/addFuzz',name: 'addFuzz',component: AddFuzz, meta:{
                title:'添加警员'
            } },
        { path: '/home/flashlight/baiduMapDemo',name: 'baiduMapDemo',component: BaiduMapDemo, meta:{
                title:'百度地图demo'
            } },
        { path: '/home/flashlight/amapJS',name: 'amapJS',component: AmapJS, meta:{
                title:'高德地图JS报警'
            } },
        { path: '/home/flashlight/trackPlayback',name: 'trackPlayback',component: TrackPlayback, meta:{
                title:'高德地图JS轨迹'
            } },
        { path: '/home/flashlight/alarmLog',name: 'alarmLog',component: AlarmLog, meta:{
                title:'报警日志'
            } },
        { path: '/home/flashlight/flashlightList',name: 'flashlightList',component: FlashlightList, meta:{
                title:'手电筒列表'
            } },
        { path: '/home/smartCampus/waterPoloDemo',name: 'waterPoloDemo',component: WaterPoloDemo, meta:{
                title:'体温统计demo'
            } },
        { path: '/home/smartCampus/staffDetailsModule',name: 'staffDetailsModule',component: StaffDetailsModule, meta:{
                title:'体温统计人员详情'
            } },
        { path: '/home/smartCampus/classManagement',name: 'classManagement',component: ClassManagement, meta:{
                title:'班级管理'
            } },
        { path: '/home/smartCampus/disciplinaryRule',name: 'disciplinaryRule',component: DisciplinaryRule, meta:{
                title:'违纪规则'
            } },
        { path: '/home/smartCampus/disciplinaryStatistics',name: 'disciplinaryStatistics',component: DisciplinaryStatistics, meta:{
                title:'违纪统计'
            } },
        { path: '/home/smartCampus/deviceManagement',name: 'deviceManagement',component: DeviceManagement, meta:{
                title:'设备管理'
            } },
        { path: '/home/smartCampus/blacklist',name: 'blacklist',component: Blacklist, meta:{
                title:'黑名单列表'
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


export default router
