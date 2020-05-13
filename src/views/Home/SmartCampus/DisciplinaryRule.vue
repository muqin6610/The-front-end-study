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
              <span class="edit-text" @click="edit(scope.row)">编辑</span>
            </template>
          </el-table-column>
       </el-table>
      </div>
      <!--新增违纪规则-->
      <DisciplinaryRuleDrawer ref="ruleForm"/>
    </el-card>
</template>

<script>
import DisciplinaryRuleDrawer from './modules/DisciplinaryRuleModule/DisciplinaryRuleDrawer'
import { getApi } from '@/api/api.js'

export default {
    components: {
        DisciplinaryRuleDrawer
    },
    data() {
        return {
           tableData: [] 
        }
    },
    created() {
        this.getDisciplinaryRule()
    },
    methods: {
        // 获取违纪规则数据
        async getDisciplinaryRule() {
            let res = await getApi('getDisciplinaryRule', null)
            if(res.success) this.tableData = res.result
        },
        // 点击新增规则
        addRule() { 
            this.$refs.ruleForm.add()
            this.$refs.ruleForm.title = "新增规则"
        },
        // 编辑规则
        edit(row) {
            this.$refs.ruleForm.edit(row)
            this.$refs.ruleForm.title = "编辑规则"
        },
        // 选择表格
        handleSelectionChange(val) {
          this.multipleSelection = []
          val.forEach(item => {
              if (this.multipleSelection.indexOf(item.id) === -1) {
                  this.multipleSelection.push(item.id)
              }
          })
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
.edit-text {
  color: #409eff;
  margin-right: 15px;
  cursor: pointer;
}
</style>