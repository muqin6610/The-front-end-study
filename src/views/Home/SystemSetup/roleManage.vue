<template>
  <div>
    <el-card class='mycard'>
      <p style='font-size:20px;font-weight:bold'>角色管理</p>
      <el-divider></el-divider>
      <el-button type='primary' @click='addRole'>新增角色</el-button>
      <el-button plain @click='deleteBatch'>批量删除</el-button>
      <el-table :data="tableData" style="width: 100%;margin-top:20px;" @selection-change="handleSelectionChange" :header-cell-style="{background:'#fafafa',color:'#2c2626'}">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" width='80' label="角色名"></el-table-column>
        <el-table-column align='center' label="权限级别">
          <template slot-scope='scope'>
            <span>{{ scope.row.level }}级</span>
          </template>
        </el-table-column>
        <el-table-column prop="date" align='center' label="创建日期">
        </el-table-column>
        <el-table-column align='center' label="已绑定人数">
          <template slot-scope='scope'>
            <span>{{ scope.row.people }}人</span>
          </template>
        </el-table-column>
        <el-table-column align='center' label="最大绑定人数">
          <template slot-scope='scope'>
            <span>{{ scope.row.maxPeople }}人</span>
          </template>
        </el-table-column>
        <el-table-column  prop=""  label="角色状态" width='200'>
          <template slot-scope='scope'>
            <el-switch
              inactive-text="停用"
              active-text="启用"
              @change="chageSwitch(scope.row.id, scope.row.switchs)"
              v-model='scope.row.switchs'
              :value="scope.row.switchs"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align='center' width='150'>
          <template slot-scope='scope'>
            <el-button size='small' style='float:left' type='primary' @click="edit(scope.row)">编辑</el-button>
            <el-button size='small' style='float:right' plain @click='deleteUser(scope.row.id)'>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!--分页器-->
    <el-pagination
      style='float:right;margin:10px 20px 20px 0'
      background
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length">
    </el-pagination>

    <!--新增角色组件-->
    <RoleManageModule ref="roleForm" @OK='colseDialog'/>
  </div>
</template>

<script>
import RoleManageModule from './modules/roleManageModule.vue'
import { getApi } from '@/api/api.js'

export default {
    components: {
      RoleManageModule,
    },
    data() {
        return {
           multipleSelection: [],
           tableData: []
        }
    },
    created() {
      this.getRoleData()
    },
    methods: {
        addRole() { this.$refs.roleForm.add() },
        edit(row) { this.$refs.roleForm.edit(row) },
        async getRoleData() {
          let res = await getApi('getRoleData', null)
          if(res.success) this.tableData = res.result
        },
        colseDialog() { this.getRoleData() },
        // 点击删除
        deleteUser(id) {
          this.$confirm('你确定要删除吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(async () => {
            let res = await httpDelete(this.url.delete,{id:id})
            if(res.success){
              this.$message.success(res.message)
              this.getRoleData()
            }else {
              this.$message.error(res.message)
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });
        },
        // 点击批量删除
        deleteBatch() {
          if(this.multipleSelection.length != 0){
            this.$confirm('你确定要删除吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(async () => {
              let ids = this.multipleSelection.join(',')
              let res = await deleteAction(this.url.deleteBatch,{ids:ids})
              if(res.success){
                this.$message.success(res.message)
                this.getRoleData()
              }else {
                this.$message.error(res.message)
              }
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });          
            });
          }else {
            this.$message.warning('请先选择角色')
          }
        },
        //表格多选值
        handleSelectionChange(val) {
           this.multipleSelection = []
           val.forEach(item => {
             if (this.multipleSelection.indexOf(item.id) === -1) {
                 this.multipleSelection.push(item.id)
             }
           })
        },
        //修改角色状态
        chageSwitch(id, state) {
          //发送请求
          
        },
    },
}
</script>

<style lang="scss" scoped>
// 卡片样式
.mycard {
  margin: 20px 20px 0 20px;
}   
</style>