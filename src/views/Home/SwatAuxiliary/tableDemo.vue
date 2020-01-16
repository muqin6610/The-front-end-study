<template>
  <div>
    <el-card class='mycard' v-for='(item,index) in tableData' :key='index'>
      <div style='font-weight:bold;'>{{item.key}}考核详情</div>
      <table class='table-box' border='1' cellspacing="0" cellpadding="0">
       <thead>
         <tr style='height:60px;'>
           <th id="lineTd">
             <span class='people-span'>人员信息<i class='el-icon-s-fold' @click='clickShowName(item.projectDetails,index)'></i></span>
	     			 <span class='project-span'>项目名称</span>
           </th> 
           <th v-for='(items,index2) in item.value'>{{ items.key }}<i class='el-icon-s-grid' @click='clickShowBox(items.value, items.key, index)'></i></th>
         </tr>
       </thead>
       <tbody>
	     	<tr style='text-align:center' v-for='(itemd,index3) in item.projectDetails'>
	     		<td>{{ itemd.name }}</td>
	     		<td style='height:40px;' v-for='(items,index2) in item.value'>{{ itemd.item_name === items.key ? itemd.chengji : '/' }}</td>
	     	</tr>
	     </tbody>
     </table>
    </el-card>

    <!--详细表格-->
    <el-dialog title="项目详情" width='50%' :visible.sync="showBox">
      <el-table class='out-table' :data="showtableData">
        <el-table-column property="realname" label="人员信息">
          <template slot-scope='scope'>
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column property="exam_grade" label="评级">
          <template slot-scope='scope'>
            <span>{{scope.row.exam_grade === 'A' ? '优秀' : (scope.row.exam_grade === 'B' ? '良好' : (scope.row.exam_grade === 'C' ? '合格' : '不合格'))}}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip property="exam_start" label="考核时间">
          <template slot-scope='scope'>
            <span>{{scope.row.exam_start ? scope.row.exam_start : '---/--/--'}}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip property="exam_addr" label="计划地点">
          <template slot-scope='scope'>
            <span>{{scope.row.exam_addr ? scope.row.exam_addr : '---'}}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip property="location" label="GPS定位">
        <template slot-scope='scope'>
            <span>{{scope.row.gps ? scope.row.gps : '---'}}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip property="exam_assessor" label="考核员">
          <template slot-scope='scope'>
            <span>{{scope.row.exam_assessor ? scope.row.exam_assessor : '---'}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
 </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            // 表格数据
            tableData: [],
            // 详细信息表格
            showtableData: [],
            // 控制表头详情的显示和隐藏
            showBox:false,
            // 选择的个人信息深克隆中转
            objData: '',
            // 整体表格数据源深克隆中转
            seveData: '',
        }
    },
    created() {
      this.getListExamDataByGroup()
    },
    methods: {
      //获取分组考核数据详情
      getListExamDataByGroup(){
        this.tableData = [
          {key:'第一大队', value: [
            {key: '徒手十公里', value: [
              {gps: '篮球场',exam_assessor: '大队长',age: '25',exam_addr: '白云山',exam_start: '2019-11-11',exam_grade: 'A',rank: '大队长', name: '张三', sex: '男', departName: '第一大队', chengji: '90', item_name:'徒手十公里'},
              {gps: '篮球场',exam_assessor: '大队长',age: '25',exam_addr: '白云山',exam_start: '2019-10-01',exam_grade: 'C',rank: '中队长', name: '李四', sex: '女', departName: '第一大队', chengji: '80', item_name:'徒手十公里'},
              {gps: '篮球场',exam_assessor: '大队长',age: '25',exam_addr: '白云山',exam_start: '2019-09-11',exam_grade: 'D',rank: '中队长', name: '李四', sex: '女', departName: '第一大队', chengji: '100', item_name:'徒手十公里'},
              {gps: '篮球场',exam_assessor: '大队长',age: '25',exam_addr: '白云山',exam_start: '2019-08-11',exam_grade: 'A',rank: '分队长', name: '王五', sex: '男', departName: '第一大队', chengji: '50', item_name:'徒手十公里'},
              {gps: '篮球场',exam_assessor: '大队长',age: '25',exam_addr: '白云山',exam_start: '2019-08-11',exam_grade: 'A',rank: '分队长', name: '李四', sex: '男', departName: '第一大队', chengji: '70', item_name:'徒手十公里'},
            ]},
            {key: '射击', value: [
              {gps: '篮球场',exam_assessor: '大队长',age: '25',exam_addr: '白云山',exam_start: '2019-11-11',exam_grade: 'A',rank: '大队长',name: '刘备', sex: '男', departName: '第一大队', chengji: '100', item_name:'射击'},
              {gps: '篮球场',exam_assessor: '大队长',age: '25',exam_addr: '白云山',exam_start: '2019-11-11',exam_grade: 'A',rank: '中队长',name: '李四', sex: '女', departName: '第一大队', chengji: '60', item_name:'射击'},
              {gps: '篮球场',exam_assessor: '大队长',age: '25',exam_addr: '白云山',exam_start: '2019-11-11',exam_grade: 'A',rank: '分队长',name: '下达', sex: '男', departName: '第一大队', chengji: '70', item_name:'射击'},
            ]},
            {key: '骑单车', value: [
              {gps: '篮球场',exam_assessor: '大队长',age: '25',exam_addr: '白云山',exam_start: '2019-11-11',exam_grade: 'A',rank: '大队长',name: '张三', sex: '男', departName: '第一大队', chengji: '90', item_name:'骑单车'},
              {gps: '篮球场',exam_assessor: '大队长',age: '25',exam_addr: '白云山',exam_start: '2019-11-11',exam_grade: 'A',rank: '中队长',name: '爱深', sex: '女', departName: '第一大队', chengji: '10', item_name:'骑单车'},
              {gps: '篮球场',exam_assessor: '大队长',age: '25',exam_addr: '白云山',exam_start: '2019-11-11',exam_grade: 'A',rank: '分队长',name: '王五', sex: '男', departName: '第一大队', chengji: '120', item_name:'骑单车'},
            ]},
          ]},
          {key:'第二大队', value: [
            {key: '徒手50公里', value: [
              {gps: '篮球场',exam_assessor: '大队长',age: '25',exam_addr: '白云山',exam_start: '2019-11-11',exam_grade: 'A',rank: '大队长',name: '张飞', sex: '男', departName: '第二大队', chengji: '85', item_name:'徒手50公里'},
              {gps: '篮球场',exam_assessor: '大队长',age: '25',exam_addr: '白云山',exam_start: '2019-11-11',exam_grade: 'A',rank: '中队长',name: '光武', sex: '男', departName: '第二大队', chengji: '45', item_name:'徒手50公里'},
            ]},
            {key: '搏斗', value: [
              {gps: '篮球场',exam_assessor: '大队长',age: '25',exam_addr: '白云山',exam_start: '2019-11-11',exam_grade: 'A',ank: '大队长',name: '阿斯蒂芬', sex: '男', departName: '第二大队', chengji: '11', item_name:'搏斗'},
              {gps: '篮球场',exam_assessor: '大队长',age: '25',exam_addr: '白云山',exam_start: '2019-11-11',exam_grade: 'A',ank: '中队长',name: '风格', sex: '男', departName: '第二大队', chengji: '36', item_name:'搏斗'},
            ]},
          ]},
          {key:'第三大队', value: [
            {key: '徒手100公里', value: [
              {gps: '篮球场',exam_assessor: '大队长',age: '25',exam_addr: '白云山',exam_start: '2019-11-11',exam_grade: 'A',rank: '大队长',name: '大侠', sex: '男', departName: '第三大队', chengji: '65', item_name:'徒手100公里'},
              {gps: '篮球场',exam_assessor: '大队长',age: '25',exam_addr: '白云山',exam_start: '2019-11-11',exam_grade: 'A',rank: '中队长',name: '阿凡', sex: '女', departName: '第三大队', chengji: '55', item_name:'徒手100公里'},
              {gps: '篮球场',exam_assessor: '大队长',age: '25',exam_addr: '白云山',exam_start: '2019-11-11',exam_grade: 'A',rank: '大队长',name: '续费', sex: '男', departName: '第三大队', chengji: '65', item_name:'徒手100公里'},
              {gps: '篮球场',exam_assessor: '大队长',age: '25',exam_addr: '白云山',exam_start: '2019-11-11',exam_grade: 'A',rank: '中队长',name: '六一', sex: '女', departName: '第三大队', chengji: '85', item_name:'徒手100公里'},
            ]},
            {key: '开飞机', value: [
              {gps: '篮球场',exam_assessor: '大队长',age: '25',exam_addr: '白云山',exam_start: '2019-11-11',exam_grade: 'A',rank: '大队长',name: '热我国', sex: '男', departName: '第三大队', chengji: '605', item_name:'开飞机'},
              {gps: '篮球场',exam_assessor: '大队长',age: '25',exam_addr: '白云山',exam_start: '2019-11-11',exam_grade: 'A',rank: '中队长',name: '违法', sex: '女', departName: '第三大队', chengji: '85', item_name:'开飞机'},
              {gps: '篮球场',exam_assessor: '大队长',age: '25',exam_addr: '白云山',exam_start: '2019-11-11',exam_grade: 'A',rank: '大队长',name: '违规', sex: '男', departName: '第三大队', chengji: '35', item_name:'开飞机'},
              {gps: '篮球场',exam_assessor: '大队长',age: '25',exam_addr: '白云山',exam_start: '2019-11-11',exam_grade: 'A',rank: '中队长',name: '我如果', sex: '女', departName: '第三大队', chengji: '95', item_name:'开飞机'},
            ]},
          ]}
        ]
        // 添加标识
        for(let i = 0;i < this.tableData.length;i++){
          this.tableData[i].showPerson = false
        }
        //人员数据
        for(let i = 0;i < this.tableData.length;i++){
          // 初始化一个存放所有人员数据的数组
          this.tableData[i].projectDetails = []
          // 添加部队名称和所有人员数据
          for(let j = 0;j < this.tableData[i].value.length;j++){
            //部队名称
            this.tableData[i].departName = this.tableData[i].value[0].value[0].departName
            //人员数据
            this.tableData[i].projectDetails.push(...this.tableData[i].value[j].value)
            //去重
            let obj = {}
            this.tableData[i].sortDetails = this.tableData[i].projectDetails.reduce((cur,next) => {
              obj[next.name] ? "" : obj[next.name] = true && cur.push(next)
              return cur
            },[]) //设置cur默认类型为数组，并且初始值为空的数组
          }
        }

        for(let i = 0; i < this.tableData.length;i++){
          for(let j = 0; j < this.tableData[i].sortDetails.length;j++) {
            
          }
        }
        for(let i = 0; i < this.tableData.length;i++){
          for(let j = 0; j < this.tableData[i].sortDetails.length;j++) {
            for(let z= 0; z < this.tableData[i].projectDetails.length;z++) {
              if(this.tableData[i].sortDetails[j].name === this.tableData[i].projectDetails[z].name && this.tableData[i].sortDetails[j].item_name === this.tableData[i].projectDetails[z].item_name) {
                
              }
            }
          }
        }
        // 深克隆表格数据源
        this.seveData = JSON.parse(JSON.stringify(this.tableData))
        console.log(this.tableData, '整体表格数据源')
      },
      // 点击人员信息
      clickShowName(val,index) {
        // 开启或关闭对应表格的人员详情
        this.tableData[index].showPerson = !this.tableData[index].showPerson
         // 判断是否开启详情
         if(this.tableData[index].showPerson){
           // 深克隆
          this.objData = JSON.parse(JSON.stringify(val))
          // 添加详情信息
          for(let i = 0;i < val.length;i++) {
              val[i].name = val[i].name + '\xa0\xa0\xa0\xa0' + val[i].sex + '\xa0\xa0\xa0\xa0' + val[i].age
          }
          this.tableData[index].projectDetails = val
         }else {
           // 重置objData
           this.objData = []
           // 还原个人信息
           for(let i = 0;i < this.tableData[index].projectDetails.length;i++){
             val[i].name = this.seveData[index].projectDetails[i].name
           }
           this.tableData[index].projectDetails = val
        }
      },
      // 点击项目名称
      clickShowBox(val, key, index) {
        //清除旧值以本次为准
        this.showtableData = []
        // 判断是this.tableData[index].showPerson是否为true
        if(this.tableData[index].showPerson) {
          //添加项目详情数据
          for(let i = 0;i < this.objData.length;i++){
            if(this.objData[i].item_name === key){
              this.showtableData.push(this.objData[i])
            }
          }
        }else {
          this.showtableData = val
        }
        // 开启或关闭详情
        this.showBox = !this.showBox
      },
    },
}
</script>

<style lang="scss" scoped>
// 卡片样式
.mycard {
  margin: 20px;
}

// 表格总样式
.table-box {
  border-collapse: collapse;
  width: 100%;border: 1px solid #c4c7cf;
  margin-top: 15px;
}

// 表头斜线
#lineTd {
  width: 180px;
  background: #fff url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxsaW5lIHgxPSIwIiB5MT0iMCIgeDI9IjEwMCUiIHkyPSIxMDAlIiBzdHJva2U9IiNiNmI0YjYiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==) no-repeat 100% center;   
}
// 表头人员文本区域
.people-span {
  user-select: none;
  float: left;
  margin-top: 20px;
  margin-left: 5px;
    .el-icon-s-fold {
      cursor: pointer;
      color: #c4c7cf;
      margin-left: 5px;
        &:hover {
          color: #001529;
        }
    }
}

// 表头项目文本区域
.project-span {
  user-select: none;
  float: right;
  margin-right: 15px;
}

// 表头区域
.el-icon-s-grid {
  cursor: pointer;
  color: #c4c7cf;
  margin-left: 5px;
    &:hover {
      color: #001529;
    }
}
// 项目详情表头文本样式
/deep/ .has-gutter {
  color: #282c34;
}
// 项目详情标题样式
/deep/ .el-dialog__header {
  border-bottom: 1px solid #dcdfe6;
}

</style>