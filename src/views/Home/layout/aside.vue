<template>
  <div class='el-menu-box'>
    
    <el-menu
      :router="true"
      :unique-opened="true"
      :default-active="activeIndex"
      class="el-menu-vertical-demo"
      background-color="#001529"
      text-color="#fff"
      active-text-color="#1890ff">
      <el-menu-item index="/home/homePage">
        <i class="el-icon-s-home"></i>
        <span>首页</span>
      </el-menu-item>
      <el-submenu v-for='(item,index1) in menuList' :key='index1' :index="item.path">
        <template slot="title">
          <i :class="item.class"></i>
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item-group>
          <template slot="title"></template>
          <el-menu-item v-for="(items, index2) in item.children" :key='index2' :index="items.path">{{ items.name }}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
    data() {
        return {
            activeIndex: '/home/homePage',
            //存放菜单栏数据
            menuList:[],
        }
    },
    created() {
        this.getAside()
    },
    methods: {
        //动态获取侧边栏数据 
        getAside(){
          this.menuList = [
                            { path: '/home/systemSetup', name:'系统设置', class:'el-icon-s-tools', children: [
                              { path: '/home/systemSetup/userManage', name:'用户管理' },
                              { path: '/home/systemSetup/roleManage', name:'角色管理' },
                              { path: '/home/systemSetup/plateManage', name:'板块管理' },
                            ] },
                            { path: '/home/monitoringCenter', name:'监控中心', class:'el-icon-pie-chart', children: [
                              { path: '/home/monitoringCenter/allMonitoring', name:'整体监控' },
                              { path: '/flowMonitoring', name:'流量监控' },
                              { path: '/home/monitoringCenter/userMonitoring', name:'用户监控' },
                              { path: '/home/monitoringCenter/mapMonitoring', name:'地图监控' },
                            ] },
                            { path: '/home/bookDivision', name:'专区管理', class:'el-icon-s-grid', children: [
                              { path: '/home/ManagementZone/bookDivision', name:'书籍专区' },
                              { path: '/home/ManagementZone/videoDivision', name:'视频专区' },
                              { path: '/home/ManagementZone/forumDivision', name:'论坛专区' },
                              { path: '/home/ManagementZone/recommendDivision', name:'推荐专区' },
                              { path: '/home/ManagementZone/hotDivision', name:'热门专区' },
                              { path: '/home/ManagementZone/downloadDivision', name:'下载专区' },
                            ] },
                            { path: '/home/dataManagement', name:'资料管理', class:'el-icon-first-aid-kit', children: [
                              { path: '/webGreenHand', name:'前端入门' },
                              { path: '/webAdvanced', name:'前端进阶' },
                              { path: '/webThorough', name:'前端深入' },
                              { path: '/home/dataManagement/demo', name:'充电特效Demo' },
                              { path: '/home/dataManagement/Css3Demo', name:'css3Demo' },
                            ] },
                            { path: '/home/smartCampus', name:'智慧校园', class:'el-icon-s-home', children: [
                              { path: '/home/smartCampus/waterPoloDemo', name:'体温统计' },
                              { path: '/home/smartCampus/waterPoloDemoM', name:'体温统计移动端' },
                              { path: '/home/smartCampus/classManagement', name:'班级管理' },
                              { path: '/home/smartCampus/blacklist', name:'黑名单列表' },
                              { path: '/home/smartCampus/disciplinaryRule', name:'违纪规则' },
                              { path: '/home/smartCampus/disciplinaryStatistics', name:'违纪统计' },
                              { path: '/home/smartCampus/deviceManagement', name:'设备管理' },
                              { path: '/home/smartCampus/trafficRulesList', name:'通行规则' },
                              { path: '/home/smartCampus/teacherManagement', name:'教师管理' },
                            ] },
                            { path: '/home/swatAuxiliary', name:'特警辅助', class:'el-icon-user-solid', children: [
                              { path: '/home/swatAuxiliary/tableDemo', name:'成绩考核表格' },
                              { path: '/home/swatAuxiliary/setCategory', name:'项目类别设置' },
                              { path: '/home/swatAuxiliary/trainingProgramList', name:'训练计划列表' },
                              { path: '/home/swatAuxiliary/trainingProjectList', name:'训练项目列表' },
                              { path: '/home/swatAuxiliary/departList', name:'前端部队列表' },
                            ] },
                            { path: '/home/flashlight', name:'手电报警', class:'el-icon-magic-stick', children: [
                              { path: '/home/flashlight/baiduMapDemo', name:'百度地图报警' },
                              { path: '/home/flashlight/amapJS', name:'高德地图JS报警' },
                              { path: '/home/flashlight/trackPlayback', name:'高德地图JS轨迹' },
                              { path: '/home/flashlight/alarmLog', name:'手电报警日志' },
                              { path: '/home/flashlight/flashlightList', name:'手电报警列表' },
                            ] },
                          ]
        }
    },
}
</script>

<style lang="scss" scoped>
.el-menu-box {
  width:201px;
}
</style>