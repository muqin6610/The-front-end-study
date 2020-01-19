<template>
  <div>
    <el-card class="box-card">
      <p class='box-card-title'>{{depart_name}}</p>
      <div style='height:50px'>
         <div class='myfont'>人员名单</div>
         <el-input
           class='search-input'
           placeholder="请输入内容"
           suffix-icon="el-icon-search"
           v-model="searchPersons">
         </el-input>
      </div>
      <div>
          <el-row>
           <el-button @click='addFuzz' type="primary">添加警员</el-button>
           <el-button @click='deleteBatchPerson'>删除警员</el-button>
         </el-row>
      </div>
      <el-table v-loading="loading" element-loading-text="加载中..." element-loading-spinner="el-icon-loading" @selection-change="handleSelectionChange" :header-cell-style="{background:'#fafafa',color:'#2c2626'}" :data="tables" style="width: 100%;margin-top:15px;">
       <el-table-column type="selection" width="55"></el-table-column>
       <el-table-column prop="avatar" label="警员照片">
         <template slot-scope="scope">
            <el-popover
             placement="right"
             width="200"
             trigger="click">
             <img :src="scope.row.avatar" width="100%" height="100%"/>
             <img style='cursor:pointer;border-radius:5px' slot="reference" :src="scope.row.avatar" width="30" height="30"/>
            </el-popover>
         </template>
       </el-table-column>
       <el-table-column prop="realname" label="姓名"> </el-table-column>
       <el-table-column prop="policeCode" label="警员编号"> </el-table-column>
       <el-table-column sortable prop="rankName" label="职级"></el-table-column>
       <el-table-column sortable align='center' prop="age" label="年龄"></el-table-column>
       <el-table-column sortable align='center' prop="sex_dictText" label="性别"></el-table-column>
       <el-table-column align='center' prop="policeCategory" label="功能手">
         <template slot-scope="scope">
            <span v-for='item in scope.row.policeCategory'>{{item}} &nbsp;</span>
         </template>
       </el-table-column>
       <el-table-column align='center' prop="date" label="操作" width="180">
         <template slot-scope="scope">
          <el-button size="mini" type="primary" @click='editPerson(scope.row)'>编辑</el-button>
          <el-button size="mini" type="primary" @click='deletePerson(scope.row.userId)'>删除</el-button>
          </template>
       </el-table-column>
    </el-table>
    <div class='myPagination'>
	    <el-pagination 
        background 
        hide-on-single-page
	    	layout="total, prev, pager, next,  jumper"
	    	:page-size="pageSize"
        @current-change='currentChange'
	    	:total="totals">
	    </el-pagination>
    </div>
    <!-- 编辑警员弹出框 -->
    <EditPersonDialog :PersonData='PersonData' @colseEditPerson='colseEditPerson'/>
   </el-card>
    <div class='footer-button-box'>
      <el-button @click='abrogate'>返回</el-button>  
    </div>
  </div>
</template>

<script>
  import { MessageBox,Message } from 'element-ui'
  import EditPersonDialog from './modules/editPersonDialog/EditPersonDialog.vue'
  import { getStore, setStore } from '@/utils/storage.js'


export default {
    components:{
      EditPersonDialog
    },
    data() {
        return {
        //传给弹框子组件的数据
        PersonData:{
          editPersonDialog:false,
          rowData:{},
        },
        //加载效果
        loading:false,
        //页面标题内容(部队名称)
        depart_name:'',
        //分页器条数
        totals:0,
        //分页器的页码
        pageNo:1,
        //每页多少条
        pageSize:10,
        //搜索框
        searchPersons:'',
        //表格数据
        tableData: [],
        //表格多选值
        multipleSelection:[], 
        //字典查询到的功能手信息
        trainingPoliceCategory:[],
      }
    },
    created () {
      //页面打开调用获取警员信息的方法
      this.getPliceUserList()
    },
    watch: {
      //监听路由是否变化
      '$route' (to, from) {
        this.getPliceUserList(this.pageNo)
        let id = getStore("id")
        let depart_name = getStore("depart_name")
        this.depart_name = depart_name
      },
      //监听到搜索内容
      searchPersons:(function(val){
        if(!val){
          this.getPliceUserList(this.pageNo,10)
        }else {
          this.getPliceUserList(1,9999)
        }
      })
    },
    computed: {      
     // 人员搜索      
     tables:function() {        
       const searchPersons = this.searchPersons   //这里要定义        
       if (searchPersons) {
        // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。          
        return this.tableData.filter(data => {
          // some() 方法用于检测数组中的元素是否满足指定条件;
          // some() 方法会依次执行数组的每个元素：
          // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
          // 如果没有满足条件的元素，则返回false。           
          return Object.keys(data).some(key => {
            // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；              
            return String(data[key]).indexOf(searchPersons) > -1})          
          })      
        }  
      return this.tableData  
      }    
    },
    methods: {
      // 获取对应的警员信息
      getPliceUserList(pageNo,pageSize){
        let org_code = getStore("org_code")
        let depart_name = getStore("depart_name")
        this.depart_name = depart_name

        this.tableData = [
          {
            avatar:'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
            realname:'小王',
            policeCode:'PL001',
            age:'23',
            rankName:'大队长',
            sex_dictText:'男',
            policeCategory:['突击手','警备手','炮手','指挥官'],
          },
          {
            avatar:'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
            realname:'小吴',
            policeCode:'PL002',
            age:'22',
            rankName:'警员',
            sex_dictText:'男',
            policeCategory:['突击手','警备手'],
          },
        ]
      },
      //页码改变
      currentChange(val){
        this.pageNo = val
        this.getPliceUserList(this.pageNo)
      },
      //点击添加警员,跳转到新增警员页面
      addFuzz(){

        let departId = getStore("departId")
        setStore("departId", departId)
        this.$router.push('/home/swatAuxiliary/addFuzz')
      },
      //点击编辑按钮获取id对应的角色权限,并弹出编辑框
      editPerson(row){
        this.PersonData.rowData = row
        this.PersonData.editPersonDialog = true
      },
      //提交编辑数据
      submitEditPerson(dataObj){
 
      },
      //关闭弹框
      colseEditPerson(){
        this.PersonData.editPersonDialog = false
      },
      //表格多选值
      handleSelectionChange(val) {
         this.multipleSelection = []
         for (let i = 0; i < val.length; i++) {
             if (this.multipleSelection.indexOf(val[i].userId) === -1) {
                 this.multipleSelection.push(val[i].userId)
             }
         }
      },
      //点击删除按钮
       deletePerson(userId){
        MessageBox.confirm('你确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
  
        }).catch(() => {
          Message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      //批量删除警员
      deleteBatchPerson(){
        if(this.multipleSelection.length != 0){
            MessageBox.confirm('你确定要删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async () => {
            let userId = this.multipleSelection.join(',')

          }).catch(() => {
            Message({
              type: 'info',
              message: '已取消删除'
            });          
          });
        }else {
          this.$message.warning('请勾选警员')
        }
      },
      //返回
      abrogate(){
        this.$router.go(-1)
      }
    },
}
</script>

<style lang="scss" scoped>
.box-card {
  margin: 10px;
}
// 卡片标题
.box-card-title {
  font-size: 18px;
  font-weight: bold;
}
/**清除浮动影响 */
.clearfix {
  overflow: auto;
}
/**文员名单文字相关 */
.myfont {
  float: left;
  font-size: 14px;
  font-weight: bold;
  line-height: 40px
}
/**分页器 */
.myPagination {
    float: right;
    margin: 50px 20px 20px 0;
}
// 搜索输入框
.search-input {
  width: 300px;
  float: right;
  margin-right: 20px
}
// 底部按钮盒子
.footer-button-box {
  margin-top: 20px;
  margin-left: 10px;
}
</style>