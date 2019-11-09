<template>
  <div>
    <el-card class='mycard'>
      <p style='font-size:20px;font-weight:bold'>书籍专区</p>
      <el-divider></el-divider>
      <div class='select-sort'>
        <p style='font-weight:bold;font-size:16px;'>请选择书籍分类 ：</p>
      </div>
      <div class='el-tabs-box'>
        <el-tabs tab-position="top" style="height: 200px;">
          <el-tab-pane label="前端基础篇">html+css</el-tab-pane>
          <el-tab-pane label="前端之javaScript">dom+bom</el-tab-pane>
          <el-tab-pane label="前端框架学习">vue+react</el-tab-pane>
          <el-tab-pane label="CSS的世界">css的别样用法</el-tab-pane>
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