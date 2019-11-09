<template>
  <div>
    <el-card class='mycard'>
      <p style='font-size:20px;font-weight:bold'>视频专区</p>
      <el-divider></el-divider>
      <div class='select-sort'>
        <p style='font-weight:bold;font-size:16px;'>请选择视频分类 ：</p>
      </div>
      <div class='el-tabs-box'>
        <el-tabs tab-position="top" style="height: 200px;">
          <el-tab-pane label="带你走进前端开发的世界">html+css+js</el-tab-pane>
          <el-tab-pane label="进阶的前端开发者">js的使用和dom的操作</el-tab-pane>
          <el-tab-pane label="深入学习前端框架的使用">vue和react的项目实战</el-tab-pane>
          <el-tab-pane label="算法和数据结构的学习">算法,数据结构</el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
        
    },
}
</script>

<style lang="scss" scoped>
.mycard {
  margin: 20px 20px 20px 20px;
} 
// tabs栏盒子
.el-tabs-box {
  margin: 20px 0 0 40px;
}
</style>