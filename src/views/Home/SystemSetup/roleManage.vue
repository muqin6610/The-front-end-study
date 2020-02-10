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
            <el-button size='small' style='float:left' type='primary'>编辑</el-button>
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
    <RoleManageModule :showRoleModule='showRoleModule' @colseDialog='colseDialog'/>
  </div>
</template>

<script>
import RoleManageModule from './modules/roleManageModule.vue'

export default {
    components: {
      RoleManageModule,
    },
    data() {
        return {
           multipleSelection: [],
           // 传值给子组件
           showRoleModule:false,
           //表格数据源
           tableData: [{
            date: '2019-10-02',
            level:'S',
            name: '管理员',
            people: '1',
            maxPeople: '2',
            phone: '18475435693',
            id: '1',
            switchs: true,
          }, {
            date: '2019-10-06',
            name: '十级用户',
            level: 'A',
            people: '3',
            maxPeople: '10',
            phone: '17475436193',
            id: '2',
            switchs: true,
          }, {
            date: '2016-10-08',
            name: '九级用户',
            maxPeople: '15',
            people: '5',
            level: 'A',
            phone: '13875035693',
            id: '3',
            switchs: true,
          }, {
            date: '2016-10-13',
            name: '八级用户',
            people: '10',
            maxPeople: '25',
            level: 'A',
            phone: '17476431693',
            id: '4',
            switchs: false,
          }, {
            date: '2016-10-13',
            name: '七级用户',
            maxPeople: '40',
            level: 'B',
            people: '15',
            phone: '17476431693',
            id: '5',
            switchs: false,
          }, {
            date: '2016-10-13',
            name: '六级用户',
            level: 'B',
            people: '18',
            maxPeople: '55',
            phone: '17476431693',
            id: '6',
            switchs: true,
          }, {
            date: '2016-10-13',
            name: '五级用户',
            level: 'C',
            people: '25',
            maxPeople: '75',
            phone: '17476431693',
            id: '7',
            switchs: true,
          }, {
            date: '2016-10-13',
            name: '四级用户',
            level: 'C',
            people: '30',
            maxPeople: '90',
            phone: '17476431693',
            id: '8',
            switchs: true,
          }, {
            date: '2016-10-13',
            name: '三级用户',
            level: 'D',
            people: '30',
            maxPeople: '100',
            phone: '17476431693',
            id: '9',
            switchs: true,
          }, {
            date: '2016-10-13',
            name: '二级用户',
            level: 'D',
            people: '35',
            maxPeople: '150',
            phone: '17476431693',
            id: '10',
            switchs: true,
          }, {
            date: '2016-10-13',
            name: '一级用户',
            level: 'E',
            people: '50',
            maxPeople: '200',
            phone: '17476431693',
            id: '11',
            switchs: true,
          }] ,
        }
    },
    methods: {
        // 点击新增角色
        addRole() {
          this.showRoleModule = true
        },
        // 关闭子组件
        colseDialog(data) {
          this.showRoleModule = false
          if(data) {
            // 确定新增用户
          }
        },
        // 点击删除
        deleteUser(id) {
          this.$confirm('你确定要删除吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(async () => {
            let res = await httpDelete(this.url.delete,{id:id})
            if(res.success){
              this.$message.success('删除成功')
              this.getPliceUserList()
            }else {
              this.$message.error('删除失败')
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
                this.$message.success('删除成功')
                this.getPliceUserList()
              }else {
                this.$message.error('删除失败')
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
           for (let i = 0; i < val.length; i++) {
               if (this.multipleSelection.indexOf(val[i].id) === -1) {
                   this.multipleSelection.push(val[i].id)
               }
           }
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