<template>
  <div>
    <el-card class='mycard'>
      <p style='font-size:20px;font-weight:bold'>训练类别管理</p>
      <el-divider></el-divider>
      <el-button type='primary' @click='addCategory'>新增类别form表单</el-button>
      <el-button type='primary' @click='addCategoryTree'>新增类别树形控件</el-button>
      <el-button plain @click='deleteBatch'>批量删除</el-button>
      <el-table
      :data="tableData"
      style="width: 100%;margin-top:20px;"
      :header-cell-style="{background:'#fafafa',color:'#2c2626'}"
      @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="fenlei" label="项目分类">
        </el-table-column>
        <el-table-column prop="leixing" label="项目类型">
        </el-table-column>
        <el-table-column prop="leibie" label="项目类别">
        </el-table-column>
        <el-table-column align='center' prop="" label="操作" width='150'>
          <template slot-scope='scope'>
            <el-button size='small' style='float:left' type='primary'>编辑</el-button>
            <el-button size='small' style='float:right' plain @click='deleteCategory(scope.row.id)'>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!--新增类别-->
    <SetCategoryModule :showAddCategory='showAddCategory' @colseDialog='colseDialog'/>

  </div>
</template>

<script>
import SetCategoryModule from './modules/setCategoryModule'


export default {
    components: {
        SetCategoryModule,
    },
    data() {
        return {
            showAddCategory: false,
            showAddCategoryTree: false,
            multipleSelection: [],
            tableData: [
                {fenlei: '基础训练', leixing: '体能素质', leibie: '力量'},
                {fenlei: '基础训练', leixing: '体能素质', leibie: '耐力'},
                {fenlei: '基础训练', leixing: '体能素质', leibie: '速度'},
                {fenlei: '基础训练', leixing: '体能素质', leibie: '障碍'},
            ],
        }
    },
    methods: {
        addCategory() {
            this.showAddCategory = true
        },
        addCategoryTree() {
          this.$router.push('/home/swatAuxiliary/setCategory/setCategoryTree')
        },
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
            this.$message.warning('请先选择项目类别')
          }
        },
        deleteCategory() {
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
        colseDialog(data) {
            this.showAddCategory = false
            if(data) {

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
          console.log("人员选中-",this.multipleSelection)
        },
    },
}
</script>

<style lang="scss" scoped>
.mycard {
  margin: 20px;
}   
</style>