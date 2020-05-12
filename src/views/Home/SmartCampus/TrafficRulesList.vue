<template>
  <el-card class='mycard'>
    <!--按钮区域-->
    <div>
      <el-button type="primary" @click='add'>新增班次</el-button>
      <el-button>批量删除</el-button>
    </div>
    <!--表格区域-->
    <div>
      <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
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
              <span class="delete-text">删除</span>
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
import { getApi } from '@/api/api.js'

export default {
    components: {
        TrafficRulesModal
    },
    data() {
        return {
            tableData: []
        }
    },
    created() {
        this.getBlacklist()
    },
    methods: {
        // 获取黑名单数据
        async getBlacklist() {
          let res = await getApi('getTrafficRulesList', null)
          if(res.success) { this.tableData = res.result }
        },
        // 点击新增黑名单
        add() {
          this.$refs.modalForm.add()
          this.$refs.modalForm.title = "新增规则"
        },
        edit(row) {
          this.$refs.modalForm.edit(row)
          this.$refs.modalForm.title = "编辑规则"
        },
        // 取消新增黑名单
        cancelBlacklist() {
            this.blacklistDrawer = false
        },
        // 选择表格
        handleSelectionChange(val) {
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