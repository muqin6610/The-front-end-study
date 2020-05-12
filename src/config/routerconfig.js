/**
* 路由配置
 */

export const constantRouterMap = [
    { 
        path: '/',
        name: 'homePage', 
        redirect: '/home/homePage', 
        meta:{
                title:'首页'
            } },
    { 
        path: '*',
        name: 'notfount404', 
        component: () => import ('@/views/404/404.vue'), 
        meta:{
                title:'404页面'
            } },
    { 
        path: '/login',
        name: 'login', 
        component: () => import ('@/views/Login/Login.vue'), 
        meta:{
                title:'登录页面'
            } },
    { 
        path: '/register',
        name: 'register', 
        component: () => import ('@/views/Login/RegisterResult.vue'), 
        meta:{
                title:'注册页面'
            } },
    { 
        path: '/home',
        name: 'home',
        component: () => import ('@/views/Home/Home.vue' ), 
      children: [
        { 
            path: '/home/messagePage',
            name: 'messagePage', 
            component: () =>  import ('@/views/Home/messagePage/messagePage.vue'), 
            meta:{
                title:'消息通知'
            } },
        { 
            path: '/home/homePage',
            name: 'homePage', 
            component: () => import ('@/views/Home/HomePage/HomePage.vue'), 
            meta:{
                title:'首页'
            } },

        { 
            path: '/home/systemSetup',
            name: 'systemSetup', 
            component: () => import ('@/views/Home/SystemSetup/systemSetup.vue'), 
            meta:{
                title:'系统设置'
            } },
        { 
            path: '/home/systemSetup/userManage',
            name: 'userManage', 
            component: () => import ('@/views/Home/SystemSetup/userManage.vue'), 
            meta:{
                title:'用户管理'
            } },
        { 
            path: '/home/systemSetup/roleManage',
            name: 'roleManage', 
            component: () => import ('@/views/Home/SystemSetup/roleManage.vue'), 
            meta:{
                title:'角色管理'
            } },
        { 
            path: '/home/systemSetup/plateManage',
            name: 'plateManage', 
            component: () => import ('@/views/Home/SystemSetup/plateManage.vue'), 
            meta:{
                title:'模块管理'
            } },
        { 
            path: '/home/systemSetup/plateManage/lookPlateMore',
            name: 'lookPlateMore', 
            component: () => import ('@/views/Home/SystemSetup/lookPlateMore.vue'), 
            meta:{
                title:'查看更多'
            } },

        { 
            path: '/home/monitoringCenter',
            name: 'monitoringCenter', 
            component: () => import ('@/views/Home/MonitoringCenter/monitoringCenter.vue'), 
            meta:{
                title:'监控中心'
            } },
        { 
            path: '/home/monitoringCenter/allMonitoring',
            name: 'allMonitoring', 
            component: () => import ('@/views/Home/MonitoringCenter/allMonitoring.vue'), 
            meta:{
                title:'整体监控'
            } },
        { 
            path: '/home/monitoringCenter/userMonitoring',
            name: 'userMonitoring', 
            component: () => import ('@/views/Home/MonitoringCenter/userMonitoring.vue'), 
            meta:{
                title:'用户监控'
            } },
        { 
            path: '/home/monitoringCenter/mapMonitoring',
            name: 'mapMonitoring', 
            component: () => import ('@/views/Home/MonitoringCenter/mapMonitoring.vue'), 
            meta:{
                title:'地图监控'
            } },

        { 
            path: '/home/dataManagement',
            name: 'dataManagement',
            component: () => import ('@/views/Home/DataManagement/dataManagement.vue'), 
            meta:{
                title:'资料管理'
            } },
        { 
            path: '/home/dataManagement/demo',
            name: 'demo', 
            component: () => import ('@/views/Home/DataManagement/demo.vue'), 
            meta:{
                title:'充电特效Demo'
            } },
        { 
            path: '/home/dataManagement/css3Demo',
            name: 'css3Demo', 
            component: () => import ('@/views/Home/DataManagement/Css3Demo.vue'), 
            meta:{
                title:'css3Demo'
            } },

        { 
            path: '/home/swatAuxiliary/tableDemo',
            name: 'tableDemo', 
            component: () => import ('@/views/Home/SwatAuxiliary/tableDemo.vue'), 
            meta:{
                title:'成绩考核表格'
            } },
        { 
            path: '/home/swatAuxiliary/setCategory',
            name: 'setCategory', 
            component: () => import ('@/views/Home/SwatAuxiliary/setCategory.vue'), 
            meta:{
                title:'项目类别设置'
            } },
        { 
            path: '/home/swatAuxiliary/setCategory/setCategoryTree',
            name: 'setCategoryTree', 
            component: () => import ('@/views/Home/SwatAuxiliary/setCategoryTree.vue'), 
            meta:{
                title:'项目类别设置树'
            } },
        { 
            path: '/home/swatAuxiliary/trainingProgramList',
            name: 'trainingProgramList', 
            component: () => import ('@/views/Home/SwatAuxiliary/TrainingProgramList.vue'), 
            meta:{
                title:'训练计划列表'
            } },
        { 
            path: '/home/swatAuxiliary/programParticulars',
            name: 'programParticulars', 
            component: () => import ('@/views/Home/SwatAuxiliary/ProgramParticulars.vue'), 
            meta:{
                title:'训练计划详情'
            } },
        { 
            path: '/home/swatAuxiliary/addProgramParticulars',
            name: 'addProgramParticulars', 
            component: () => import ('@/views/Home/SwatAuxiliary/AddProgramParticulars.vue'), 
            meta:{
                title:'新增训练计划详情'
            } },
        { 
            path: '/home/swatAuxiliary/trainingProgramAdd',
            name: 'trainingProgramAdd', 
            component: () => import ('@/views/Home/SwatAuxiliary/TrainingProgramAdd.vue'), 
            meta:{
                title:'新增训练计划'
            } },
        { 
            path: '/home/swatAuxiliary/trainingProjectList',
            name: 'trainingProjectList', 
            component: () => import ('@/views/Home/SwatAuxiliary/TrainingProjectList.vue'), 
            meta:{
                title:'训练项目列表'
            } },
        { 
            path: '/home/swatAuxiliary/trainingProjectAdd',
            name: 'trainingProjectAdd', 
            component: () => import ('@/views/Home/SwatAuxiliary/TrainingProjectAdd.vue'), 
            meta:{
                title:'新增项目'
            } },
        { path: '/home/swatAuxiliary/lookPastProjucts',
        name: 'lookPastProjucts', 
        component: () => import ('@/views/Home/SwatAuxiliary/LookPastProjucts.vue'), 
        meta:{
                title:'查看历史项目'
            } },
        { path: '/home/swatAuxiliary/departList',
        name: 'departList', 
        component: () => import ('@/views/Home/SwatAuxiliary/DepartList.vue'), 
        meta:{
                title:'部队列表'
            } },
        { 
            path: '/home/swatAuxiliary/addDepartList',
            name: 'addDepartList', 
            component: () => import ('@/views/Home/SwatAuxiliary/AddDepartList.vue'), 
            meta:{
                title:'新增部队'
            } },
        { 
            path: '/home/swatAuxiliary/listOfPersons',
            name: 'listOfPersons', 
            component: () => import ('@/views/Home/SwatAuxiliary/ListOfPersons.vue'), 
            meta:{
                title:'部队详情'
            } },
        { 
            path: '/home/swatAuxiliary/addFuzz',
            name: 'addFuzz', 
            component: () => import ('@/views/Home/SwatAuxiliary/AddFuzz.vue'), 
            meta:{
                title:'添加警员'
            } },

        { 
            path: '/home/flashlight/baiduMapDemo',
            name: 'baiduMapDemo', 
            component: () => import ('@/views/Home/Flashlight/baiduMapDemo.vue'), 
            meta:{
                title:'百度地图demo'
            } },
        { 
            path: '/home/flashlight/amapJS',
            name: 'amapJS', 
            component: () => import ('@/views/Home/Flashlight/amapJS.vue'), 
            meta:{
                title:'高德地图JS报警'
            } },
        { 
            path: '/home/flashlight/trackPlayback',
            name: 'trackPlayback', 
            component: () => import ('@/views/Home/Flashlight/trackPlayback.vue'), 
            meta:{
                title:'高德地图JS轨迹'
            } },
        { 
            path: '/home/flashlight/alarmLog',
            name: 'alarmLog', 
            component: () => import ('@/views/Home/Flashlight/alarmLog.vue'), 
            meta:{
                title:'报警日志'
            } },
        { 
            path: '/home/flashlight/flashlightList',
            name: 'flashlightList', 
            component: () => import ('@/views/Home/Flashlight/flashlightList.vue'), 
            meta:{
                title:'手电筒列表'
            } },

        { 
            path: '/home/smartCampus/waterPoloDemo',
            name: 'waterPoloDemo', 
            component: () => import ('@/views/Home/SmartCampus/waterPoloDemo.vue'), 
            meta:{
                title:'体温统计demo'
            } },
        { 
            path: '/home/smartCampus/waterPoloDemoM',
            name: 'waterPoloDemoM', 
            component: () => import ('@/views/Home/SmartCampus/waterPoloDemoM.vue'), 
            meta:{
                title:'体温统计移动端'
            } },
        { 
            path: '/home/smartCampus/staffDetailsModule',
            name: 'staffDetailsModule', 
            component: () => import ('@/views/Home/SmartCampus/modules/waterPoloDemoModule/StaffDetailsModule.vue'), 
            meta:{
                title:'体温统计人员详情'
            } },
        { 
            path: '/home/smartCampus/staffDetailsMModule',
            name: 'staffDetailsMModule', 
            component: () => import ('@/views/Home/SmartCampus/modules/waterPoloDemoMModule/StaffDetailsMModule.vue'), 
            meta:{
                title:'体温统计人员详情移动端'
            } },
        { 
            path: '/home/smartCampus/classManagement',
            name: 'classManagement', 
            component: () => import ('@/views/Home/SmartCampus/classManagement.vue'), 
            meta:{
                title:'班级管理'
            } },
        { 
            path: '/home/smartCampus/disciplinaryRule',
            name: 'disciplinaryRule', 
            component: () => import ('@/views/Home/SmartCampus/DisciplinaryRule.vue'), 
            meta:{
                title:'违纪规则'
            } },
        { 
            path: '/home/smartCampus/disciplinaryStatistics',
            name: 'disciplinaryStatistics', 
            component: () => import ('@/views/Home/SmartCampus/DisciplinaryStatistics.vue'), 
            meta:{
                title:'违纪统计'
            } },
        { 
            path: '/home/smartCampus/deviceManagement',
            name: 'deviceManagement', 
            component: () => import ('@/views/Home/SmartCampus/DeviceManagement.vue'), 
            meta:{
                title:'设备管理'
            } },
        { 
            path: '/home/smartCampus/blacklist',
            name: 'blacklist', 
            component: () => import ('@/views/Home/SmartCampus/blacklist.vue'), 
            meta:{
                title:'黑名单列表'
            } },
        { 
            path: '/home/smartCampus/trafficRulesList',
            name: 'trafficRulesList', 
            component: () => import ('@/views/Home/SmartCampus/TrafficRulesList.vue'), 
            meta:{
                title:'班次管理'
            } },

        { 
            path: '/home/myhomepage',
            name: 'myhomepage', 
            component: () => import ('@/views/Home/Users/myhomepage.vue'), 
            meta:{
                title:'我的主页'
            } },
        { 
            path: '/home/myNes',
            name: 'myNes', 
            component: () => import ('@/views/Home/Users/myNes.vue'), 
            meta:{
                title:'个人设置'
            } },

        { 
            path: '/home/ManagementZone',
            name: 'managementZone', 
            component: () => import ('@/views/Home/ManagementZone/managementZone.vue'), 
            meta:{
                title:'专区管理'
            } },
        { 
            path: '/home/ManagementZone/bookDivision',
            name: 'bookDivision', 
            component: () => import ('@/views/Home/ManagementZone/bookDivision.vue'), 
            meta:{
                title:'书籍专区'
            } },
        { 
            path: '/home/ManagementZone/videoDivision',
            name: 'videoDivision', 
            component: () => import ('@/views/Home/ManagementZone/videoDivision.vue'), 
            meta:{
                title:'视频专区'
            } },
        { 
            path: '/home/ManagementZone/forumDivision',
            name: 'forumDivision', 
            component: () => import ('@/views/Home/ManagementZone/forumDivision.vue'), 
            meta:{
                title:'论坛专区'
            } },
        { 
            path: '/home/ManagementZone/recommendDivision',
            name: 'recommendDivision', 
            component: () => import ('@/views/Home/ManagementZone/recommendDivision.vue'), 
            meta:{
                title:'推荐专区'
            } },
        { 
            path: '/home/ManagementZone/hotDivision',
            name: 'hotDivision', 
            component: () => import ('@/views/Home/ManagementZone/hotDivision.vue'), 
            meta:{
                title:'热门专区'
            } },
        { 
            path: '/home/ManagementZone/downloadDivision',
            name: 'downloadDivision', 
            component: () => import ('@/views/Home/ManagementZone/downloadDivision.vue'), 
            meta:{
                title:'下载专区'
            } },
      ]
    },
]
