<template>
  <div class='el-breadcrumb-box'>
    <el-breadcrumb class='el-breadcrumb' separator="/">
      <el-breadcrumb-item v-for='( item, index ) in breadcrumbList' :key='index' :to="item.path">
        {{item.meta.title}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
    data() {
        return {
          breadcrumbList: []
        }
    },
    created() {
      this.getBreadcrumb()
    },
    watch: {
      $route() {
        this.getBreadcrumb()
      }
    },
    methods: {
        getBreadcrumb() {
          let matched = this.$route.matched.filter(item => item.name)
          const first = matched[0]
          if (first && first.name.trim().toLocaleLowerCase() !== 'HomePage'.toLocaleLowerCase()) {
              matched = [{ path: '/', meta: { title: '首页' }}].concat(matched)
          }
          this.breadcrumbList = matched
          console.log(this.breadcrumbList )
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