<template>
 <div>
   <!--顶部选择栏-->
   <SelectTopBar :resetTopBar='resetTopBar' @sendData='sendData'/>
   <!--时段选择栏-->
   <el-card class="box-card">
     <div>
       <span style='margin-right:10px'>训练时间:</span>
       <el-date-picker
          disabled
          format="yyyy年 MM月 dd日"
          value-format="yyyy年MM月dd日"
          :value="this.$route.query.date"
          type="date">
       </el-date-picker>
       <div style='margin-left:83px;margin-top:20px'>
         <el-time-picker
           style='width:150px'
           :clearable='false'
           arrow-control
           v-model="startTime"
           editable
           format='HH:mm'
           @change='slecetStartTime'
           :picker-options="{
             selectableRange: '00:00:00 - 23:59:00'
           }"
           placeholder="开始时间点">
         </el-time-picker>
         <span style='margin:0 5px 0 5px'>—</span>
         <el-time-picker
           style='width:150px'
           :clearable='false'
           arrow-control
           editable
           format='HH:mm'
           v-model="endTime"
           @change='slecetEndTime'
           :picker-options="{
             selectableRange: '00:00:00 - 23:59:00'
           }"
           placeholder="结束时间点">
         </el-time-picker>
         <el-button :disabled='selectButtont' style='margin-left:20px' type='primary' @click='clickSelectProgram'>选择项目</el-button>
       </div>
       <div style='margin-left:83px;margin-top:10px;color:#0066ff'>输入具体时间即可选择项目</div>
       <div>
         <el-button style='margin-left:83px;margin-top:10px;' plain @click='selectTimeFrame'>+时段</el-button>
       </div>
    </div>
   </el-card>
    <!--选择项目弹框-->
   <SelectProgramDialog :sendSelectProgram='sendSelectProgram' @selectProgram='selectProgram'/>
   <!--训练分配表格区域-->
   <el-card v-if='tableData.length > 0' class="box-card">
    <div id='printMe' class='out-table' style='margin-top:30px'>
      <h3 class='myContainers' >训练分配详情</h3>
      <div class='myDropdown'>
       <el-button class='myfont' type="text" @click='clickExportExcel'>导出表格</el-button>
       <el-button class='myfont' v-print="'#printMe'" type="text">打印表格</el-button>
      </div>
      <el-table v-loading="loading" element-loading-text="加载中..." element-loading-spinner="el-icon-loading"  :header-cell-style="{background:'#fafafa',color:'#2c2626'}" :data="tableData" style="width: 100%;margin-top:15px;">
        <el-table-column prop="departName" label="训练队伍"></el-table-column>
        <el-table-column prop="program" label="项目名称"></el-table-column>
        <el-table-column show-overflow-tooltip prop="addr" label="训练地点">
          <template slot-scope='scope'>
           <span class='addr-text' @click='clickDdian(scope.row)'>{{scope.row.addr ? scope.row.addr : '单击选择地点'}}</span>
          </template>
        </el-table-column>
        <el-table-column align='center' show-overflow-tooltip prop="dateTime" label="训练时段">
          <template slot-scope='scope'>
           <span>{{scope.row.dateTime}}</span>
          </template>
        </el-table-column>
        <el-table-column align='center' width='150' prop="time" label="计划时长">
          <template slot-scope='scope'>
           <span>{{scope.row.time}}小时</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--点击地点弹框-->
    <AddrDialog :showDdian='showDdian' @selectAddr='selectAddr'/>
  </el-card>
   <div class='button-box'>
    <el-button type="primary" :disabled='tableData.length === 0' @click='confirmSend'>确定</el-button>
    <el-button @click='cancelReturn'>取消</el-button>  
  </div>
 </div>
</template>

<script>
  import { MessageBox,Message } from 'element-ui'
  import TableContainer from './modules/addProgramParticularsModules/selectTopBar.vue'
  import SelectProgramDialog from './modules/addProgramParticularsModules/selectProgramDialog.vue'
  import AddrDialog from './modules/addProgramParticularsModules/addrDialog.vue'
  import SelectTopBar from './modules/addProgramParticularsModules/selectTopBar.vue'
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'

  export default {
    components:{
      TableContainer,
      SelectProgramDialog,
      AddrDialog,
      SelectTopBar,
    },
    data () {
      return {
        // 传值给顶部选择栏
        resetTopBar: false,
        // 传值给地点组件控制显示和隐藏
        showDdian: false,
        // 传值给项目选择组件控制显示和隐藏
        sendSelectProgram: {
          showTransfer: false,
          trainingName: '',
        },
        // 加载特效
        loading: false,
        // 训练日期
        drillDate: '',
        // 开始时间点
        startTime: '',
        // 结束时间点
        endTime: '', 
        // 选择项目按钮的禁用和启用
        selectButtont: true,
        // 所有部队数据
        allDepart: [],
        // 当前需要选择地点的这一行
        clickaddr: '',
        // 需要发送的数据
        sendDatas: {
          orgCode: '',
          departName: '',
          trainingCategory: '',
          dateTime: '',
          time: '',
          addr: '',
          program: '',
        },
        // 表格数据
        tableData: [],
     }
  },
  created () {
    // 页面打开获取所有部队数据
    this.getDepartData()
  },
  watch: {
      // 监听路由是否变化
      '$route' (to, from) {

      }
    },
    methods: {
      // 导出表格方法
      exportExcel(){
        let xlsxParam = { raw: true};//转换成excel时，使用原始的格式
         /* generate workbook object from table */
         let wb = XLSX.utils.table_to_book(document.querySelector('.out-table'),xlsxParam)
         /* get binary string as output */
         let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
         try {
             FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '训练计划清单.xlsx')
         } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
         return wbout
       },
       // 点击导出表格
       clickExportExcel(){
         this.exportExcel()
       },
       // 顶部栏选择完成数据,data:顶部栏选择的部队code和训练性质
       sendData(data){
         console.log(data,'data')
         this.sendDatas = {
           orgCode: data.orgCode,
           trainingCategory: data.trainingCategory,
         }
         // 获得对应的队伍数据
         console.log(this.allDepart.children)
         for(let i = this.allDepart.children.length;i--;){
           if(this.allDepart.children[i].orgCode === data.orgCode){
             this.sendDatas.departName = this.allDepart.children[i].departName
           }else {
             if(this.allDepart.children[i].children){
               for(let j = this.allDepart.children[i].children.length;j--;){
                 if(this.allDepart.children[i].children[j].orgCode === data.orgCode){
                   this.sendDatas.departName = this.allDepart.children[i].children[j].departName
                 }else {
                   if(this.allDepart.children[i].children[j].children){
                     for(let z = this.allDepart.children[i].children[j].children.length;z--;){
                       if(this.allDepart.children[i].children[j].children[z].orgCode === data.orgCode){
                         this.sendDatas.departName = this.allDepart.children[i].children[j].children[z].departName
                       }
                     }
                   }
                 }
               }
             }
           }
         }
        //  console.log(this.sendDatas,'表格需要的数据')
       },  
      // 选择开始时间点
      slecetStartTime(){
        // 判断是否选择了队伍和考核性质
        if(this.sendDatas.orgCode && this.sendDatas.trainingCategory){
          let startTime = this.$timeDate.dateFormat(this.startTime).hm
          let endTime = this.$timeDate.dateFormat(this.endTime).hm
          if(this.$timeDate.transitionToSeconds(startTime) >= this.$timeDate.transitionToSeconds(endTime)){
            this.startTime = ''
            this.$message.warning('开始时间不能晚于结束时间!')
            return
          }else if(this.endTime){
            // 调用获取时段,打开项目按钮的方法
            this.timeDifference(startTime,endTime)
          }
        }else {
          this.startTime = ''
          this.$message.warning('未选择训练队伍或训练性质,请确认选择!')
        }
      },
      // 选择结束时间点
      slecetEndTime(){
        let startTime = this.$timeDate.dateFormat(this.startTime).hm
        let endTime = this.$timeDate.dateFormat(this.endTime).hm
        if(this.$timeDate.transitionToSeconds(endTime) <= this.$timeDate.transitionToSeconds(startTime)){
          this.endTime = ''
          this.$message.warning('结束时间不能早于开始时间!')
          return
        }else if(this.startTime){
          // 调用获取时差,时段,打开项目按钮的方法
          this.timeDifference(startTime,endTime)
        }
      },
      // 点击选择项目
      clickSelectProgram(){
        this.sendSelectProgram = {
          showTransfer:true,
          trainingName:this.$route.query.date + ' ' + this.$timeDate.dateFormat(this.startTime).hm + '-' + this.$timeDate.dateFormat(this.endTime).hm + '训练项目',
        }
      },
      // 点击+时段
      selectTimeFrame(){
        // 重置所有选项
        this.startTime = ''
        this.endTime = ''
        // 传值给顶部栏
        this.resetTopBar = !this.resetTopBar
      },
       // 点击地点
       clickDdian(row){
         this.clickaddr = row
         this.showDdian = true
       },
       // 项目选择组件确定或取消,data:选择的项目
       selectProgram(data){
         if(data){
           for(let i = data.length;i--;){
             this.tableData.push({
               orgCode:this.sendDatas.orgCode,
               departName:this.sendDatas.departName,
               trainingCategory:this.sendDatas.trainingCategory,
               dateTime:this.sendDatas.dateTime,
               time:this.sendDatas.time,
               addr:'',
               program:data[i].label,
             })
           }
         }
         console.log(this.tableData,'表格数据')
         // 关闭弹框
         this.sendSelectProgram.showTransfer = false
       },
       // 地点确定或取消,data:选择的地点
       selectAddr(data){
         if(data){
           console.log(data,'选择的地点')
           for(let i = this.tableData.length;i--;){
             if(this.tableData[i].program === this.clickaddr.program){
               this.tableData[i].addr = data
             }
           }
         }
         this.showDdian = false
       },
       // 页面取消
       cancelReturn(){
         // 返回上级页面
         this.$router.go(-1)
         // 重置所有选项
         this.startTime = ''
         this.endTime = ''
         this.tableData = []
         // 传值给顶部栏
         this.resetTopBar = !this.resetTopBar
         // 关闭项目选择按钮
         this.selectButtont = true
       },
       // 页面确定提交
       confirmSend(){
         // 判断是否有未选择地点的项目
         for(let i = this.tableData.length;i--;){
           if(!this.tableData[i].addr){
             this.$message.warning('需要选择完训练地点才能生效!')
             return false
           }
         }
         console.log('提交成功!',this.tableData)
       },
       // 获得所有的部队数据
       getDepartData(){
         this.allDepart = {departName: '第一支队', id: '0', orgCode: 'A01', children:[
            {departName: '第一大队', id: '1', orgCode: 'A01A01', children: [
              {departName: '第一大队第一中队', id: '11', orgCode: 'A01A01A01', children: [
                {departName: '第一大队第一中队第一分队', id: '111', orgCode: 'A01A01A01A01',},
              ]},
            ]},
            {departName: '第二大队', id: '2', orgCode: 'A02A02', children: [
              {departName: '第二大队第一中队', id: '22', orgCode: 'A02A02A02', children: [
                {departName: '第二大队第一中队第一分队', id: '222', orgCode: 'A02A02A02A02',},
              ]},
            ]},
          ]}
       },
       // 获取时差,时段并打开选择项目按钮
       timeDifference(startTime,endTime){
         // 获取训练时段
          this.sendDatas.dateTime = this.$route.query.date + " " + startTime + '-' + endTime
          // 调用计算时间差的方法
          let time = this.$timeDate.getHour(startTime,endTime)
          console.log(time,'时间差')
          this.sendDatas.time = time
          // 选择完时间段开启选择项目按钮
          this.selectButtont = false
       },
    }
  }
</script>
<style lang="scss" scoped>
/deep/.el-dialog__header {
  border-bottom: 1px solid #dcdfe6;
}
/**导出打印区域 */
.myDropdown {
  float: right;
  margin-right: 20px;
  .myfont {
    font-size: 16px;
    color: #409eff;
  }
}
// 点击地点文本
.addr-text {
  font-size: 16px;
  color: #409eff;
  cursor: pointer;
}
/**训练分配表格标题 */
.myContainers {
  float: left;
}
/**打印表格标题 */
/deep/.table-container{
  font-size: 12px;
}
/**卡片样式 */
.box-card {
  margin: 10px;
}
/**表格样式 */
/deep/.el-table td, .el-table th.is-leaf{
  border: 0;
}
// 按钮区域盒子
.button-box {
  margin: 15px 0 0 10px;
}
</style>