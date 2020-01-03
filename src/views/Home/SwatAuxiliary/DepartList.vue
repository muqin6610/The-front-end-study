<template>
    <div>
     <div class='top-box'>
      <el-button type="primary" @click='addDepartList'>新增部队</el-button>
      <el-select  v-model='selectBattalionValue' style='margin-left:20px' placeholder="请选择大队">
        <el-option
          v-for="item in Battalion"
          :key="item.id"
          :label="item.departName"
          :value="item.id">
        </el-option>
      </el-select>
      <el-select v-model='selectSquadronValue' style='margin-left:20px' placeholder="请选择中队">
        <el-option
          v-for="item in Squadron"
          :key="item.id"
          :label="item.departName"
          :value="item.id">
        </el-option>
      </el-select>
     </div>
     <el-card class="main-card">
     <el-table v-loading="loading" element-loading-text="加载中..." element-loading-spinner="el-icon-loading" :empty-text='selectBattalionValue ? (selectSquadronValue ? "暂无数据" : "请选择具体中队") : "暂无数据"' :show-header='false' :header-cell-style="{background:'#fafafa',color:'#2c2626'}" :data="tableData" style="width: 100%;margin-top:15px;">
       <el-table-column align='center' prop="depart_avatar" label="部队队徽"  width="150">
         <template slot-scope="scope">
            <img :src="scope.row.depart_avatar" width="30" height="30"/>
         </template>
       </el-table-column>
       <el-table-column prop='depart_name' label="队伍名称" width="300">
         <template slot-scope="scope">
            <div style='color:#272727;font-weight:bold'>{{scope.row.depart_name}}</div>
            <div style='color:#8d8d8d;'>{{scope.row.departName}}</div>
         </template>
       </el-table-column>
       <el-table-column align='left' prop='userCount' label="队伍人数">
         <template slot-scope="scope">
            <p style='color:#8d8d8d'>部队人员:{{scope.row.userCount}}人{{scope.row.userCount === 0 ? "(无分队人员)" : ''}}</p>
         </template>
       </el-table-column>
       <el-table-column align='center' label="操作" width="180">
         <template slot-scope="scope">
          <span class='operating' @click='seeDetails(scope.row)'>查看详情</span>
         </template>
       </el-table-column>
      </el-table>
     </el-card>
    </div>
</template>

<script>

export default {
    data() {
        return {
            //加载效果
            loading:false,
            //登陆用户信息
            userInfo:[],
            //大队头像
            departAvatar:'',
            //支队数据源
            detachment:[],
            // 大队数据源
            Battalion:[],
            //中队数据源
            Squadron:[],
            //表格数据源
            tableData:[],
            //选中得大队
            selectBattalionValue:'',
            //选中得中队
            selectSquadronValue:'',
        }
    },
    created () {
      //页面打开调用获取队伍数据的方法
      this.getQueryIdTreeList()
    },
    watch: {
      //监听路由是否变化
      '$route' (to, from) {
        //路由发生变化调用获取所有部队数据的方法
        this.getQueryIdTreeList()
        //清除数据
        this.selectBattalionValue = ''
        this.selectSquadronValue = ''
      },
      // 监听选择大队
      selectBattalionValue(newVal,oldVal) {
        if(newVal != oldVal) {
          console.log(this.Battalion)
          console.log('大队id:' + this.selectBattalionValue)
          this.tableData = []
          this.selectSquadronValue = ''
          for(let i = 0;i < this.Battalion.length;i++){
            if(this.selectBattalionValue === this.Battalion[i].id){
              this.Squadron = this.Battalion[i].children
            }
          }
        }
      },
      // 监听选择中队
      selectSquadronValue(newVal,oldVal) {
        if(newVal != oldVal) {
          this.tableData = [
            {
              depart_avatar:'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
              departName:'前端特战队',
              depart_name:'第一分队',
              userCount:12,
              id:'1',
              org_code:'A01A01A01A01'
            },
            {
              depart_avatar:'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
              departName:'前端特战队',
              depart_name:'第二分队',
              userCount:10,
              id:'2',
              org_code:'A02A02A02A02'
            },
          ]
        }
      }
    },
    methods: {
         //获取队伍的数据
         getQueryIdTreeList(){
           this.Battalion = [
             {id:'1',departName:'第一大队',children:[
               {id:'11',departName:'第一大队第一中队'},
             ] 
             },
             {id:'2',departName:'第二大队',children:[
               {id:'22',departName:'第二大队第一中队'},
             ]},
             {id:'3',departName:'第三大队',children:[
               {id:'33',departName:'第三大队第一中队'},
             ]},
           ]
         },
         //点击查看详情
         seeDetails(data){
           console.log(data)
           //将ID和队名通过localstorage传给详情页面
           localStorage.setItem("org_code", data.org_code)
           localStorage.setItem("departId", data.id)
           localStorage.setItem("depart_name", data.depart_name)
           //跳转到人员名单
           this.$router.push('/home/swatAuxiliary/listOfPersons')
         },
        //点击新增部队,跳转到新增部队页面
        addDepartList(){
           //跳转之前清空队伍数据
           this.selectBattalionValue = ''
           this.selectSquadronValue = ''
           this.tableData = []
           this.$router.push('/home/swatAuxiliary/addDepartList')
        },
    },
}
</script>

<style lang="scss" scoped>
// 顶部盒子
.top-box {
  margin: 20px 0 0 10px;
}
// 主体卡片
.main-card {
  margin: 10px 10px 10px 10px;
}
// 表格操作区域
.operating {
  color: #409eff;
  cursor: pointer;
}
</style>