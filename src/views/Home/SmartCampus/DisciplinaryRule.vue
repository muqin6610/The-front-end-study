<template>
    <el-card class='mycard'>
      <el-button type="primary" @click='addRule'>新增规则</el-button>
      <el-button>删除</el-button>
      <div>
        <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="" label="规则条件">
            <template slot-scope='scope'>
                <span>晚上 {{scope.row.time}} {{scope.row.rule}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width='120'>
            <template slot-scope='scope'>
              <span style='color:#409eff;margin-right:15px;cursor: pointer;'>编辑</span>
            </template>
          </el-table-column>
       </el-table>
      </div>
      <DisciplinaryRuleDrawer :DisciplinaryRuleShow='DisciplinaryRuleShow' @cancelDrawer='cancelDrawer'/>
    </el-card>
</template>

<script>
import DisciplinaryRuleDrawer from './modules/DisciplinaryRuleModule/DisciplinaryRuleDrawer'

export default {
    components: {
        DisciplinaryRuleDrawer
    },
    data() {
        return {
           DisciplinaryRuleShow: false,
           tableData: [
               {rule:'晚归',time:'23:00:00-24:00:00'},
           ] 
        }
    },
    methods: {
        // 点击新增规则
        addRule() {
            this.DisciplinaryRuleShow = true
        },
        // 关闭抽屉
        cancelDrawer() {
            this.DisciplinaryRuleShow = false
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