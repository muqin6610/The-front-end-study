<template>
  <div>
    <el-card>
      <h3>历史项目</h3>
    </el-card>
    <el-card class='mycard'>
      <el-table v-loading="loading" element-loading-text="加载中..." element-loading-spinner="el-icon-loading"  :header-cell-style="{background:'#fafafa',color:'#2c2626'}" :data="tableData" style="width: 100%;margin-top:15px;">
        <el-table-column width='220' prop="name" label="项目名称"></el-table-column>
        <el-table-column align='left' prop="time" label="列入历史项目时间"></el-table-column>
        <el-table-column width='120' label="操作">
          <template>
            <span class='operating'>查看详情</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <div class='footer-button-box'>
      <el-button @click='cancelReturn'>返回</el-button>  
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            //加载特效
            loading:false,
            //表格数据
            tableData:[
                {time:'2019-10-01',name:'歼20试飞'}
            ],
        }
    },
    created(){
        
    },
    watch: {
        
    },
    methods: {
        //点击返回
        cancelReturn(){
            //返回上一级页面
            this.$router.go(-1)
        }
    },
}
</script>

<style lang="scss" scoped>
// 卡片
.mycard {
  margin: 10px 20px 0 20px;
} 
// 底部按钮盒子
.footer-button-box {
  margin: 25px 0 30px 20px;
}  
// 操作区域文本
.operating {
  color: #409eff;
  cursor: pointer;
}
</style>