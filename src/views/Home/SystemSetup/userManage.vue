<template>
  <div>
    <el-card class='mycard'>
      <p style='font-size:20px;font-weight:bold'>用户管理</p>
      <el-divider></el-divider>
      <el-button type='primary' @click='addUser'>新增用户</el-button>
      <el-button plain @click='deleteBatch'>批量删除</el-button>
      <el-table
      :data="tableData"
      style="width: 100%;margin-top:20px;"
      :header-cell-style="{background:'#fafafa',color:'#2c2626'}"
      @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column
          prop="avatar"
          label="头像">
          <template slot-scope='scope'>
            <el-popover
             placement="right"
             width="200"
             trigger="hover">
             <img v-lazy="scope.row.avatar" width="100%" height="100%"/>
             <img style='cursor:pointer;border-radius:5px;' slot="reference" v-lazy="scope.row.avatar" width="40" height="40"/>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="用户名">
        </el-table-column>
        <el-table-column prop="sex" label="性别">
        </el-table-column>
        <el-table-column prop="date" label="创建日期">
        </el-table-column>
        <el-table-column align='center' prop="address" label="用户性质">
        </el-table-column>
        <el-table-column align='center' prop="phone" label="手机号码">
        </el-table-column>
        <el-table-column align='center' prop=""  label="用户状态" width='200'>
          <template slot-scope='scope'>
            <el-switch
              inactive-text="禁用"
              active-text="正常"
              @change="chageSwitch(scope.row.id, scope.row.switchs)"
              v-model='scope.row.switchs'
              :value="scope.row.switchs"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column align='center' prop="" label="操作" width='150'>
          <template slot-scope='scope'>
            <el-button size='small' style='float:left' type='primary'>编辑</el-button>
            <el-button size='small' style='float:right' plain @click='deleteUser(scope.row.id)'>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!--分页器-->
    <el-pagination
      style='float:right;margin:10px 20px 0 0'
      background
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length">
    </el-pagination>

    <!--新增用户组件-->
    <UserManageModule :showUserModule='showUserModule' @colseDialog='colseDialog' @addUserData='addUserData'/>
  </div>
</template>

<script>
  import UserManageModule from './modules/userManageModule.vue'

export default {
    components: {
      UserManageModule,
    },
    data() {
        return {
           multipleSelection: [],
           // 传值给子组件
           showUserModule:false,
           //用户状态
           switchs:'',
           //表格数据源
           tableData: [{
            avatar: 'https://user-gold-cdn.xitu.io/2019/11/5/16e39396b5133aae?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1',
            date: '2019-10-02',
            name: '慕钦C',
            address: '管理员',
            switchs: true,
            phone: '18475435693',
            id: '1',
            sex: '男',
          }, {
            avatar: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
            date: '2019-10-06',
            name: '凌凌漆',
            address: '十级用户',
            switchs: true,
            phone: '17475436193',
            id: '2',
            sex: '男',
          }, {
            avatar: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
            date: '2019-10-08',
            name: '曹达华',
            address: '九级用户',
            switchs: false,
            phone: '13875035693',
            id: '3',
            sex: '男',
          }, {
            avatar: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
            date: '2019-10-13',
            name: '周星星',
            address: '一级用户',
            switchs: true,
            phone: '17476431693',
            id: '4',
            sex: '男',
          }, {
            avatar: 'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
            date: '2019-11-01',
            name: '是花花啊',
            address: '二级用户',
            switchs: false,
            phone: '15585642136',
            id: '5',
            sex: '女',
          }] ,
        }
    },
    methods: {
        // 点击新增用户
        addUser() {
          this.showUserModule = true
        },
        // 关闭子组件
        colseDialog(bur) {
          this.showUserModule = bur
        },
        // 确定新增用户
        addUserData(data) {
          console.log(data,'新增用户的数据')
          // 关闭弹框
          this.showUserModule =false
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
              //删除成功重新请求刷新数据
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
              //将数组转为字符串用逗号隔开
              let ids = this.multipleSelection.join(',')
              let res = await deleteAction(this.url.deleteBatch,{ids:ids})
              if(res.success){
                this.$message.success('删除成功')
                //删除成功重新请求刷新数据
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
          //每次选择人员信息的时候都先清除之前的选中值
           this.multipleSelection = []
           for (let i = 0; i < val.length; i++) {
               if (this.multipleSelection.indexOf(val[i].id) === -1) {
                   this.multipleSelection.push(val[i].id)
               }
           }
          console.log("人员选中-",this.multipleSelection)
        },
        //修改用户状态
        chageSwitch(id, state) {
          //发送请求
          
        },
    },
}
</script>

<style lang="scss" scoped>
// 卡片样式
.mycard {
  margin:20px 20px 0 20px;
}   
</style>