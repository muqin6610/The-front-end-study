<template>
  <el-card>
    <div class='top-button'>
      <el-button type="primary"  @click='newteacher'>添加</el-button>
      <el-button type="primary"  @click='batchAdd'>批量添加</el-button>
    </div>
    <div class="table-page-search-wrapper">
      <el-form layout="inline">
        <el-row :gutter="24">

          <el-col :span="5">
            <el-form-item label="" >
              <el-select clearable v-model="selectRole" placeholder="请选择角色" @change='changRole'>
                <el-option
                  v-for="item in roleDatas"
                  :key="item.id"
                  :label="item.roleName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

            <el-col :span="5">
              <el-form-item label="" >
                <el-input
                  placeholder="姓名搜索"
                  v-model="input"
                  @keyup.enter.native='clickSearch()'>
                </el-input>
              </el-form-item>
            </el-col>

            <el-col :span="5">
              <el-form-item label="">
                <el-input
                  placeholder="工号搜索"
                  v-model="passengerCode"
                  @keyup.enter.native='clickSearch()'>
                </el-input>
              </el-form-item>
            </el-col>
          <el-col :span="5">
              <el-button class='search-button' type="primary"  @click='clickSearch'>搜索</el-button>
              <el-button class='reset-button' type="primary"  @click='clickReset'>重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class='table-box'>
      <transition name="el-zoom-in-top">
        <el-button v-if='multipleSelection.length > 0' class='batchDelete' @click='batchDelete'>批量删除</el-button>
      </transition>
      <el-table
        v-loading="loading"
        element-loading-text="加载中..."
        element-loading-spinner="el-icon-loading"
        :data="tableData"
        @selection-change="handleSelectionChange"
        stripe
        style="width: 100%;margin-top:20px;"
        :header-cell-style="{background:'#fafafa',color:'#2c2626'}">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column align='center' prop="faceImg" label="照片">
          <template slot-scope='scope'>
            <el-popover
                placement="left"
                title=""
                width ="220"
                trigger="hover">
                <img :onerror='defaultImg' :src="scope.row.faceImg" width="100%" height="100%"/>
                <img :onerror='defaultImg' style='border-radius:5px;' slot="reference" :src="scope.row.faceImg" width="40" height="40"/>
             </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="realName" label="姓名">
        </el-table-column>
        <el-table-column prop="passengerCode" label="工号">
        </el-table-column>
        <el-table-column prop="roleName" label="角色名称">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="areaIdList" label="通行权限">
          <template slot-scope='scope'>
             <span v-for='(item, index) in scope.row.areaIdList' :key='index'>{{item}}  </span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope='scope'>
            <span class='table-edit' @click='editPerson(scope.row)'>编辑</span>
            <span class='table-delete' @click='deletePerson(scope.row.id)'>删除</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class='el-pagination'
        background
        hide-on-single-page
        @size-change='sizeChange'
        @current-change='currentChange'
        :page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        :current-page='pageCurrent'
        :pager-count='pagerCount'
        layout="total, prev, pager, next, sizes, jumper"
        :total="total">
      </el-pagination>
    </div>
    <!--新建老师抽屉--> 
    <TeacherDialog ref="teacherForm"/>
    <!--批量添加老师-->
    <BatchTeacherDialog ref="batchForm"/>
    <!--编辑教师人员弹窗-->
    <EditPersonDialog ref="editForm"/>
  </el-card>
</template>

<script>
  import TeacherDialog from './modules/TeacherManagementModule/TeacherDialog.vue'
  import EditPersonDialog from './modules/TeacherManagementModule/EditPersonDialog'
  import BatchTeacherDialog from './modules/TeacherManagementModule/BatchTeacherDialog'
  import { getApi, deleteApi } from '@/api/api.js'

  export default {
    components: {
      TeacherDialog,
      EditPersonDialog,
      BatchTeacherDialog
    },
    data () {
      return {
        defaultImg: 'this.src="' + require('../../../assets/image/Snipaste_2019-11-27_10-07-38.png') +'"',
        total: null,
        pageSize: 10,
        pageCurrent: null,
        pagerCount: 5,
        loading: false,
        roleDatas: [],
        multipleSelection: [],
        tableData: [],
        input: '',
        passengerCode:'',
        selectRole: '',
    }
  },
  mounted() {
    this.getSchoolRoleList()
    this.getListTeacher()
  },
  created() {

  },
    methods: {
      // 获取学校角色
      async getSchoolRoleList() {
        let res = await getApi('getSchoolRoleList', null)
        if(res.success) this.roleDatas = res.result
      },
      // 获取教师人员
      async getListTeacher(pageNo, pageSize) {
        // 开启加载
        this.loading = true
        let res = await getApi('getTeacherList', {
          personRoleId: this.selectRole, 
          name: this.input,
          passengerCode: this.passengerCode,
          pageNo: pageNo, 
          pageSize: pageSize,
        })
        console.log(res,'教师人员数据')
        // 关闭加载
        this.loading = false
        if(res.success) {
          let { records, total, size, current } = res.result
          this.tableData = records
          this.total = total
          this.pageSize = size
          this.pageCurrent = current
        }
      },
      // 添加老师
      newteacher() { this.$refs.teacherForm.add() },
      // 批量添加老师
      batchAdd() { this.$refs.batchForm.add() },
      // 编辑人员
      editPerson(row) { this.$refs.editForm.edit(row) },
      // 删除人员
       deletePerson(id) {
         this.$confirm("你确定删除吗?", '提示', {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: 'warning'
        }).then(async () => {

          let res = await deleteApi('deleteTeacher', {id: id})
          if(res.success) {
              this.$message.success(res.message)
              this.getListTeacher()
          }else {
              this.$message.warning(res.message)
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: "取消删除"
          })        
        })
       },
       // 批量删除人员
       batchDelete() {
        if(this.multipleSelection.length != 0){
            this.$confirm("你确定删除吗?", '提示', {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: 'warning'
          }).then(async () => {
            let ids = this.multipleSelection.join(',')
            let res = await deleteApi('batchTeacher',{ids: ids})
            if(res.success){
              this.$message.success(res.message)
              this.getListTeacher()
            }else {
              this.$message.error(res.message)
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: "取消删除"
            });          
          });
        }else {
          this.$message.warning("请选择需要删除的人员")
        }
       },
      // 选择角色
      changRole() { this.getListTeacher() },
      // 搜索
      clickSearch() { this.getListTeacher() },
      // 重置
      clickReset() {
        this.input = ''
        this.passengerCode =''
        this.selectRole = ''
        this.getListTeacher()
      },
      // 当前页改变
      currentChange(val) { this.getListTeacher(val, this.pageSize) },
      // 每页条数改变
      sizeChange(val) { this.getListTeacher(1, val) },
      // 选择表格
      handleSelectionChange(val) {
        this.multipleSelection = []
        val.forEach(item => {
            if (this.multipleSelection.indexOf(item.id) === -1) {
                this.multipleSelection.push(item.id)
            }
        })
      },
    }
  }
</script>
<style lang="scss" scoped>
/deep/ .el-select {
  width: 100%;
}

.title-text {
  margin-right: 10px;
}

.input-box {
  display: inline-block;
}

.search-button {
  margin-left: 10px;
}
.reset-button {
  margin-left: 10px;
}

// 删除文本
.table-delete {
  color: red;
  cursor: pointer;
}
// 分页器样式
.el-pagination {
  float: right;
  margin: 20px 0 40px 0 ;
}

// 体温异常文本颜色
.red-color {
  color: #ff5858;
}

.batchDelete {
  margin-top: 20px;
}
/deep/ .el-date-editor {
  width: 100%;
}
.top-button {
  margin-bottom: 20px;
}
.set-text {
  font-size: 16px;
  color: #409EFF;
  cursor: pointer;
  &:hover {
    color: #0563C5;
  }
}
/deep/ .el-dialog {
  border-radius: 10px;
}
.content-text {
  font-size: 16px;
  color: #060606;
}
// 表格编辑按钮
.table-edit {
  color: #409eff;
  margin-right: 15px;
  cursor: pointer;
}
</style>