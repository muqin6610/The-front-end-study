<template>
  <div class='el-breadcrumb-box'>
    <el-breadcrumb class='el-breadcrumb' separator="/">
      <el-breadcrumb-item v-for='( item, index ) in breadcrumbList' :key='index' :to="item.path">{{ item.name }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
    data() {
        return {
           // 面包屑数据
           breadcrumbList:[], 
        }
    },
    created() {
      //调用获取面包屑数据
      this.getBreadcrumb()
    },
    methods: {
        getBreadcrumb() {
          this.breadcrumbList = [
            {path:'/', name: '首页'},
            {path:'/', name: '系统设置'},
            {path:'/', name: '角色管理'},
          ]
        }
    },
}
</script>

<style lang="scss" scoped>
// 面包屑区域样式
.el-breadcrumb-box {
  float: left;
  margin: 35px 0 0 20px;
}
</style>