<template>
  <el-card class='mycard'>
    <!--按钮区域-->
    <div>
      <el-button type="primary" @click='addBlacklist'>新增黑名单</el-button>
      <el-button>批量删除</el-button>
    </div>
    <!--表格区域-->
    <div>
      <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="img" label="照片">
            <template slot-scope='scope'>
              <img style="width: 60px; height: 40px" :src='scope.row.img'></img>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="姓名">
          </el-table-column>
          <el-table-column prop="type" label="类型">
          </el-table-column>
          <el-table-column label="操作" width='120'>
            <template slot-scope='scope'>
              <span style='color:#409eff;margin-right:15px;cursor: pointer;'>编辑</span>
              <span style='color:#409eff;cursor: pointer;'>删除</span>
            </template>
          </el-table-column>
       </el-table>
    </div>

    <!--新增黑名单抽屉-->
    <BlacklistDrawer :blacklistDrawer='blacklistDrawer' @cancelBlacklist='cancelBlacklist'/>
  </el-card>
</template>

<script>
import BlacklistDrawer from './modules/blacklistModule/blacklistDrawer'

export default {
    components: {
        BlacklistDrawer
    },
    data() {
        return {
            // 传递给新增黑名单组件
            blacklistDrawer: false,
            tableData: [
                {id:'1',img:'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',name:'李三',type:'小混混'},
                {id:'2',img:'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',name:'王五',type:'其他'},
                {id:'3',img:'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',name:'徐四',type:'不欢迎人群'},
            ]
        }
    },
    created() {
        
    },
    methods: {
        // 点击新增黑名单
        addBlacklist() {
            this.blacklistDrawer = true
        },
        // 取消新增黑名单
        cancelBlacklist() {
            this.blacklistDrawer = false
        },
        // 选择表格
        handleSelectionChange(val) {
          // 清除旧值以本次为准
          this.multipleSelection = []
          // 添加选中的学生id到数组
          for (let i = 0; i < val.length; i++) {
              if (this.multipleSelection.indexOf(val[i].id) === -1) {
                  this.multipleSelection.push(val[i].id)
              }
          }
        },
    },
}
</script>

<style lang="scss" scoped>
// 卡片
.mycard {
    margin: 10px;
}
// 表格
/deep/ .el-table {
    border: 1px solid #ebeef5;
    border-bottom: 0;
    margin-bottom: 400px;
    margin-top: 30px;
}
// 表头
/deep/ .has-gutter {
    color: #282c34;
}  
</style>