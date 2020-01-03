<template>
  <div class='mycon'>
    <el-container>
      <!--顶部区域-->
       <el-header>
         <Topheader/>
       </el-header>
      <el-container>
        <!--侧边区域-->
        <el-aside width="200px">
          <Aside/>
        </el-aside>
        <!--主体部分-->
        <el-main>
          <!--设置切换过度动画-->
          <transition name="on" mode="out-in">
            <router-view/>
          </transition>
        </el-main>
      </el-container>
    </el-container>

    <!--回到顶部-->
    <el-backtop target=".el-main"></el-backtop>
  </div>
</template>

<script>
  import Aside from './layout/aside.vue'
  import Topheader from './layout/topheader.vue'

export default {
  components:{
    Aside,
    Topheader,
  },
  name: 'Home',
  data () {
    return {
     
    }
  }
}
</script>

<style lang='scss' scoped>
.mycon {
  height: 100%;
}
// 顶部区域整体样式
.el-header {
  padding:0;
  border-bottom:2px solid #eaeefb;
  background-color: #fff;
}
// 侧边区域整体样式
.el-aside {
  background-color: #001529;
  color: #333;
  line-height: 200px;
}
// 主体区域整体样式
.el-main {
  color: #333;
  padding: 0;
  height: 100%;
  background-color: #eff1f4;
}
// 布局容器样式
.el-container {
  height: 100%;
}
// 过度动画相关样式
.on-enter-active{
  transition: .2s ease;
}
.on-leave-active{
  transition: .3s ease;
}
.on-enter,.on-leave-to{
  opacity: 0;
}
</style>