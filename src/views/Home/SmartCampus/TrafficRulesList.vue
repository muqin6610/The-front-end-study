<template>
  <el-card class='mycard'>
    <!--按钮区域-->
    <div>
      <el-button type="primary" @click='add'>新增班次</el-button>
      <el-button @click="batchDlete">批量删除</el-button>
    </div>
    <!--表格区域-->
    <div>
      <el-table 
        v-loading="loading"
        element-loading-text="加载中..."
        element-loading-spinner="el-icon-loading" 
        :data="tableData" 
        style="width: 100%" 
        @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="ruleName" label="规则名称" align="center">
          </el-table-column> 
          <el-table-column prop="startTime" label="开始日期" align="center">
          </el-table-column>
          <el-table-column prop="endTime" label="结束日期" align="center">
          </el-table-column>
          <el-table-column prop="count" label="过闸次数" align="center">
          </el-table-column>
          <el-table-column label="操作" width='120' align="center">
            <template slot-scope='scope'>
              <span class="edit-text" @click="edit(scope.row)">编辑</span>
              <span class="delete-text" @click="deleteRow(scope.row.id)">删除</span>
            </template>
          </el-table-column>
       </el-table>
    </div>

    <!--新增黑名单抽屉-->
    <TrafficRulesModal ref="modalForm"/>
  </el-card>
</template>

<script>
import TrafficRulesModal from './modules/TrafficRulesModal/TrafficRulesModal'
import { getApi, deleteApi } from '@/api/api.js'

export default {
    components: {
        TrafficRulesModal
    },
    data() {
        return {
          loading: false,
          tableData: []
        }
    },
    created() { this.getBlacklist() },
    methods: {
        // 获取黑名单数据
        async getBlacklist() {
          this.loading = true
          let res = await getApi('getTrafficRulesList', null)
          this.loading = false
          if(res.success) this.tableData = res.result
        },
        add() {
          this.$refs.modalForm.add()
          this.$refs.modalForm.title = "新增规则"
        },
        edit(row) {
          this.$refs.modalForm.edit(row)
          this.$refs.modalForm.title = "编辑规则"
        },
        deleteRow(id) {
          this.$confirm('你确定要删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async () => {
            let res = await deleteApi('deleteTrafficRulesList', {id: id})
            console.log(res)
            if(res.success) {
              this.$message({
                type: 'success',
                message: res.message
              })
              this.getBlacklist()
            }else {
              this.$message({
                type: 'wanring',
                message: res.message
              })
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })       
          })
        },
        batchDlete() {
          this.$confirm('你确定要删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async () => {
            let ids = this.multipleSelection.join(',')
            let res = await deleteApi('batchTrafficRulesList', {ids: ids})
            console.log(res)
            if(res.success) {
              this.$message({
                type: 'success',
                message: res.message
              })
              this.getBlacklist()
            }else {
              this.$message({
                type: 'wanring',
                message: res.message
              })
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })       
          })
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
.edit-text {
  color: #409eff;
  margin-right: 15px;
  cursor: pointer;
}
.delete-text {
  color: red;
  cursor: pointer;
}
</style>