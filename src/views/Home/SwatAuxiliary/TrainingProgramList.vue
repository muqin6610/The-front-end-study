<template>
  <el-card>
    <div class="table-operator">
      <p class='top-title'>训练计划清单</p>
      <el-button @click="handleAdd" type="primary">新建训练计划</el-button>
      <el-table v-loading="loading" element-loading-text="加载中..." element-loading-spinner="el-icon-loading" :header-cell-style="{background:'#fafafa',color:'#2c2626'}" :data="tableData" style="width: 100%;margin-top:15px;">
       <el-table-column align='left' prop="key" label="训练计划名称"> </el-table-column>
       <el-table-column align='center'  label="操作" width="150">
         <template slot-scope="scope">
          <span class='operating-text' @click='seeDetails(scope.row)'>查看详情</span>
          <span class='operating-text' @click='deleteData(scope.row.value)'>删除</span>
          </template>
       </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>

<script>
import { setStore }  from '@/utils/storage.js'

  export default {
    name: "TrainingProgramList",
    data () {
      return {
        //加载效果
        loading:false,
        //登陆的用户数据
        userInfo:[],
        //表格数据源
        tableData:[],
        //请求相关
		    url: {
          //训练计划分组的查询
          ProgramByOrgCode: "/judged/trainingProgram/listTrainingProgramByOrgCode",
          //训练计划删除
          delete: "/judged/trainingProgram/delete",
          // 训练计划批量删除接口
          deleteBatch:'/judged/trainingProgram/deleteBatch',
       },
     }
  },
  created () {
    //页面打开调用获取训练计划清单的数据的方法
    this.listTrainingProgram()
  },
  watch: {
      //监听路由是否变化
      '$route' (to, from) {
        //路由发生变化调用获取训练计划清单的数据的方法
        this.listTrainingProgram()
      }
    },
    methods: {
      //点击新建项目计划跳转到新增训练计划页面
      handleAdd(){
        //跳转到新增训练计划页面
        this.$router.push("/home/swatAuxiliary/trainingProgramAdd")
      },
      //删除
      async deleteData(val){
        console.log('删除的训练计划id:',val)
        //声明一个空数组存放ids
        let ids = []
        this.$confirm('你确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          //获取ids
          for(let i = 0;i< val.length;i++){
            ids.push(val[i].termValue[0].trainingId)
          }
          ids = ids.join(',')
          console.log(ids,'要删除得所有id')
          let res = await deleteAction(this.url.deleteBatch,{ids:ids})
          if(res.success){
            this.$message.success(res.message)
            //删除成功重新请求刷新数据
            this.listTrainingProgram()
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
      //点击查看详情跳转到对应的队伍训练安排详情
      seeDetails(record){
        setStore('recordData', record)
        //跳转到对应的队伍训练安排详情
        this.$router.push('/home/swatAuxiliary/programParticulars')
      },
      //获取训练计划清单的数据
      listTrainingProgram() {
        //打开加载效果
        this.loading = true
        setTimeout(() => {
            this.tableData = [
                {key:'前端训练计划',id:'1'},
            ]
            //关闭加载效果
            this.loading = false
        }, 500)
      }
    }
  }
</script>
<style lang="scss" scoped>
// 操作区域文本
.operating-text {
  margin-right: 15px;
  cursor: pointer;
  color: #409eff;
}
// 顶部标题
.top-title {
  font-weight: bold;
  font-size: 16px;
  color: #272727;
  margin-bottom: 15px;
  margin-left: 10px;
}
</style>