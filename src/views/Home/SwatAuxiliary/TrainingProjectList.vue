<template>
  <div class='mybox'>
    <div class='top-box'>
      <el-card class='top-card'>
        <span class='top-card-title'>基础项目训练</span>
        <div class='top-card-content'>125个</div>
      </el-card>
      <el-card class='top-card'>
        <span class='top-card-title'>专业项目训练</span>
        <div class='top-card-content'>80个</div>
      </el-card>
      <el-card class='top-card'>
        <span class='top-card-title'>专项训练</span>
        <div class='top-card-content'>60个</div>
      </el-card>
      <el-card class='top-card'>
        <span class='top-card-title'>综合训练</span>
        <div class='top-card-content'>50个</div>
      </el-card>
    </div>
    <div class='content-box'>
      <el-button type="primary" @click='addProject'>新增项目</el-button>
      <el-button class='lookButton' @click='lookPastProjucts'>查看历史项目</el-button>
      <div class='collapse-box'>
        <el-collapse @change='changeCollapse' v-model="activeName" accordion>
          <el-collapse-item title="基础训练" name="1">
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column prop="date" label="归属项目">
              </el-table-column>
              <el-table-column prop="name" label="归属类别">
              </el-table-column>
              <el-table-column prop="address" label="训练内容">
              </el-table-column>
              <el-table-column prop="" label="操作" width="180">
                <template slot-scope='scope'>
                  <span class='edit-button operating' @click='clickDeit'>编辑</span>
                  <span class='operating' @click='included'>列入历史项目</span>
                </template>
              </el-table-column>
            </el-table>
          </el-collapse-item>
          <el-collapse-item title="专业训练" name="2">
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column prop="date" label="归属项目">
              </el-table-column>
              <el-table-column prop="name" label="归属类别">
              </el-table-column>
              <el-table-column prop="address" label="训练内容">
              </el-table-column>
              <el-table-column prop="" label="操作" width="180">
                <template slot-scope='scope'>
                  <span class='edit-button operating'>编辑</span>
                  <span class='operating'>列入历史项目</span>
                </template>
              </el-table-column>
            </el-table>
          </el-collapse-item>
          <el-collapse-item title="专项训练" name="3">
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column prop="date" label="归属项目">
              </el-table-column>
              <el-table-column prop="name" label="归属类别">
              </el-table-column>
              <el-table-column prop="address" label="训练内容">
              </el-table-column>
              <el-table-column prop="" label="操作" width="180">
                <template slot-scope='scope'>
                  <span class='edit-button operating'>编辑</span>
                  <span class='operating'>列入历史项目</span>
                </template>
              </el-table-column>
            </el-table>
          </el-collapse-item>
          <el-collapse-item title="综合训练" name="4">
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column prop="date" label="归属项目">
              </el-table-column>
              <el-table-column prop="name" label="归属类别">
              </el-table-column>
              <el-table-column prop="address" label="训练内容">
              </el-table-column>
              <el-table-column prop="" label="操作" width="180">
                <template slot-scope='scope'>
                  <span class='edit-button operating'>编辑</span>
                  <span class='operating'>列入历史项目</span>
                </template>
              </el-table-column>
            </el-table>
          </el-collapse-item>
        </el-collapse>
        <el-pagination
          class='el-pagination'
          background
          layout="total, prev, pager, next, jumper"
          :total="tableData.length">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>


  export default {
    data () {
      return {
        activeName: '',
        tableData: []
    }
  },
  computed: {

  },
    created(){

    },
    watch: {
      //监听路由是否变化
      '$route' (to, from) {

      }
    },
   mounted(){

    },
   methods: {
     // 点击折叠面板
     changeCollapse(a) {
       console.log(a,'2222222222')
       switch(a) {
          case '' :
            this.tableData = []
          break;
          case '1' :
            this.tableData = [
              {
               date: '体能素质',
               name: '耐力',
               address: '徒手三公里'
              }
           ]
          break;
          case '2' :
            this.tableData = [
              {
               date: '射击',
               name: '夜间射击',
               address: '精确夜间射击'
              }
           ]
          break;
          case '3' :
            this.tableData = [
              {
               date: '射击',
               name: '夜间射击',
               address: '精确夜间射击'
              }
           ]
          break;
          case '4' :
            this.tableData = [
              {
               date: '射击',
               name: '夜间射击',
               address: '精确夜间射击'
              }
           ]
          break;
       }
     },
     //编辑
     editProjectList(record){
       sessionStorage.setItem("record", JSON.stringify(record))
       //跳转到编辑页面
       this.$router.push({name:'editProjectList'})
     },
      // 搜索按回车
      submitForm() {
         this.searchQuery()
      },
      //查看历史项目
      lookPastProjucts(){
        //跳转到历史项目页面
        this.$router.push('/judged/lookPastProjucts')
      },
      // 新增项目
      addProject() {
        this.$router.push('/home/swatAuxiliary/trainingProjectAdd')
      },
      //查看历史项目
      lookPastProjucts(){
        //跳转到历史项目页面
        this.$router.push('/home/swatAuxiliary/lookPastProjucts')
      },
      // 列入历史项目
      included() {
        alert('此项已被列入历史项目!')
      },
      // 点击编辑
      clickDeit() {
        alert('点击了编辑按钮!')
      }
    }
  }
</script>
<style lang="scss" scoped>
.mybox {
  margin: 10px;
}
// 顶部盒子
.top-box {
  display: flex;
  justify-content: space-between;
  // 顶部盒子卡片
  .top-card {
    width: 22%;
    // 顶部卡片标题
    .top-card-title {
      color: #929292;
    }
    // 顶部卡片内容
    .top-card-content {
      font-size: 30px;
      line-height: 60px;
    }
  }
}

// 内容盒子
.content-box {
  margin-top: 20px;
  // 查看历史按钮
  .lookButton {
    float: right;
  }
  // 折叠面板盒子
  .collapse-box {
    margin-top: 10px;
    // 折叠面板标题
    /deep/ .el-collapse-item__header {
      padding-left: 20px;
      font-weight: bold;
      font-size: 16px;
    }
    // 折叠面板内容
    /deep/ .el-collapse-item__content {
      margin-left: 20px;
    }
  }
}
// 表格表头
/deep/ .el-table__header-wrapper {
  border-bottom: 1px solid #e8e8e8;
}
// 表头文本
/deep/ .cell {
  color: #282c34;
}
// 表格编辑按钮
.edit-button {
  margin-right: 20px;
}
// 表格操作区域
.operating {
  color: #409eff;
  cursor: pointer;
}
// 分页器样式
.el-pagination {
  float: right;
  margin: 10px 10px 10px 0;
}
</style>