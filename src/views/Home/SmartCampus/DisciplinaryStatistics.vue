<template>
  <el-card class='mycard'>
    <div style='height:50px'>
      <div style='float:left'>
        <span style='margin-right: 20px'>日期</span>
        <el-date-picker
          v-model="selectDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
        <span style='margin-right: 20px;margin-left:20px;'>班级</span>
        <el-select v-model="selectClass" placeholder="请选择班级">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div style='float:right;display: flex;'> 
        <el-input @keyup.enter.native='clickSearch()' v-model="search" placeholder="请输入姓名进行搜索"></el-input>
        <el-button type="primary" @click='clickSearch'><i class='el-icon-search'></i></el-button>
      </div>
    </div>
    <el-button class='button' type="primary"  @click='exportExcel'>导出报表</el-button>
    <div class='out-table' style='margin-top:30px;'>
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="img" label="照片" align='center'>
          <template slot-scope='scope'>
            <el-popover
             placement="right"
             width="200"
             trigger="hover">
             <img v-lazy="scope.row.img" width="100%" height="100%"/>
             <img style='cursor:pointer;border-radius:5px;' slot="reference" v-lazy="scope.row.img" width="40" height="40"/>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" align='center'>
        </el-table-column>
        <el-table-column prop="className" label="班级" align='center'>
        </el-table-column>
        <el-table-column prop="schoolName" label="学校" align='center'>
        </el-table-column>
        <el-table-column prop="time" label="晚归" align='center'>
        </el-table-column>
        <el-table-column label="操作" align='center' width='120'>
          <template slot-scope='scope'>
            <span style='color:#409eff;margin-right:15px;cursor: pointer;' @click='lookDetail(scope.row)'>查看详情</span>
          </template>
        </el-table-column>
     </el-table>
     <el-pagination
       hide-on-single-page
       class='el-pagination'
       @size-change="handleSizeChange"
       @current-change="handleCurrentChange"
       :current-page="currentPage"
       :page-sizes="[10, 20, 30, 40]"
       :page-size="10"
       layout="total, prev, pager, next, sizes, jumper"
       :total="tableData.length">
     </el-pagination>
    </div>
    <DisciplinaryStatisticsDialog :statisticsObj='statisticsObj'/>
  </el-card>
</template>

<script>
import DisciplinaryStatisticsDialog from './modules/DisciplinaryStatisticsModule/DisciplinaryStatisticsDialog'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

export default {
    components: {
      DisciplinaryStatisticsDialog
    },
    data() {
        return {
            // 选择的日期
            selectDate: '',
            // 搜索的数据
            search: '',
            // 当前页
            currentPage: 1,
            // 选择的班级
            selectClass: '',
            // 班级数据源
            options: [
              {label:'初一(1)',value:'1'},
              {label:'初一(2)',value:'2'},
              {label:'初一(3)',value:'3 '},
            ],
            // 传递给弹出框
            statisticsObj: {
              statisticsShow: false,
              name: '',
              date: '',
              date: '',
              month: '',
            },
            tableData: [],
        }
    },
    created() {
      
    },
    watch:{
      selectDate(val,oldVal){
        if(oldVal !== val) {
          if(this.selectClass) {
            this.getPersonnel()
          }else {
            return false
          }
        }
      },
      selectClass(val,oldVal) {
        if(oldVal !== val) {
          if(this.selectDate) {
            this.getPersonnel()
          }else {
            return false
          }
        }
      }
    },
    methods: {
        // 获取人员
        getPersonnel() {
          this.tableData = []
          this.tableData = [
            {
              img: 'https://user-gold-cdn.xitu.io/2019/11/5/16e39396b5133aae?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1',
              name: '小王',
              className: '初一一班',
              schoolName: '前端中学',
              time: '20',
            },
            {
              img: 'https://user-gold-cdn.xitu.io/2019/11/5/16e39396b5133aae?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1',
              name: '小夏',
              className: '初一二班',
              schoolName: '前端中学',
              time: '30',
            },
            {
              img: 'https://user-gold-cdn.xitu.io/2019/11/5/16e39396b5133aae?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1',
              name: '小瓜',
              className: '初一三班',
              schoolName: '前端中学',
              time: '15',
            },
            {
              img: 'https://user-gold-cdn.xitu.io/2019/11/5/16e39396b5133aae?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1',
              name: '小许',
              className: '初一四班',
              schoolName: '前端中学',
              time: '30',
            },
          ]
        },
        // 搜索
        clickSearch() {
          console.log('搜索中')
        },
        // 查看详情
        lookDetail(row) {
          if(this.selectDate) {
            let arr = this.selectDate.split('-')
            this.statisticsObj = {
              statisticsShow: true,
              name: row.name,
              img: row.img,
              date: this.selectDate,
              month: arr[1],
            }
          }else {
            this.$message.warning('请先选择日期再查看详情!')
          }
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
        },
        //导出表格方法
        exportExcel(){
          let xlsxParam = { raw: true };//转换成excel时，使用原始的格式
          let wb = XLSX.utils.table_to_book(document.querySelector('.out-table'),xlsxParam)
          let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
          try {
              FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '违纪统计表格.xlsx')
          } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
          return wbout
       },
    },
}
</script>

<style lang="scss" scoped>
.mycard {
  margin: 10px;
}   
// 搜索按钮样式
/deep/ .el-button {
  border-radius: 0;
}
// 输入框样式
/deep/ .el-input__inner {
  border-radius: 0;
}
// 导出报表按钮
.button {
  border-radius: 5px;
  margin-top: 10px;
}
// 表头
/deep/ .has-gutter th {
    color: #282c34;
    background: #f2f2f2;
} 
// 分页器
.el-pagination {
    float: right;
    margin: 20px 30px 20px 0;
}
</style>