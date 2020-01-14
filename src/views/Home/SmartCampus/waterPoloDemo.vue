<template>
  <div class='all-box'>
    <div class='top-box'>
      <div class='mybox statistics'>
        <div class='topcard-title'>今日温度统计</div>
        <div class='card-content-box'>
          <div class='card-content one-bgcolor'>
            <div class='text-box'>
              <div class='card-content-title'>学校总人数</div>
              <div class='card-content-text'>{{schoolCount ? schoolCount : 0}}人</div>
            </div>
          </div>
          <div class='card-content two-bgcolor'>
            <div class='text-box'>
              <div class='card-content-title'>累计识别人数</div>
              <div class='card-content-text'>{{totalDiscernCount ? totalDiscernCount : 0}}</div>
            </div>
          </div>
          <div class='card-content three-bgcolor'>
            <div class='text-box'>
              <div class='card-content-title'>体温正常人数</div>
              <div class='card-content-text'>{{normalCount ? normalCount : 0}}</div>
            </div>
          </div>
          <div class='card-content four-bgcolor'>
            <div class='text-box'>
              <div class='card-content-title'>体温异常人数</div>
              <div class='card-content-text'>{{abnormalCount ? abnormalCount : 0}}人</div>
            </div>
          </div>
        </div>
      </div>
      <div class='mybox liquidfill'>
        <div class='liquidfill-title'>今日体温异常占比</div>
        <!--引入的水球图-->
        <Liquidfill :liquidfillData='liquidfillData'/>
      </div>
    </div>
    <el-card class='mycard'>
      <div class='statistics-top'>
        <span class='statistics-title'>体温统计表</span>
        <el-button type="primary" class='export-button' @click='exportData'>导出数据</el-button>
      </div>
      <div class='select-search-box'>
        <div class='select-box'>
          <el-date-picker
            size="medium"
            v-model="startDate"
            @change='changeDate'
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          <el-select size="medium" v-model="selectGrade" @change='changGrade' placeholder="请选择年级">
            <el-option label="全部" value="all"></el-option>
            <el-option
              v-for="item in gradeDatas"
              :key="item.id"
              :label="item.departName"
              :value="item">
            </el-option>
          </el-select>
          <el-select size="medium" v-model="selectClass" @change='changeClass' placeholder="请选择班级">
            <el-option v-if='classDatas.length' label="全部" value="all"></el-option>
            <el-option
              v-for="item in classDatas"
              :key="item.id"
              :label="item.departName"
              :value="item">
            </el-option>
          </el-select>
        </div>
        <div class='search-box'>
          <div class='input-box'>
            <el-input
              size="medium"
              placeholder="请输入班级或学生名字"
              v-model="input"
              @keyup.enter.native='clickSearch()'
              clearable>
            </el-input>
            <transition name="el-zoom-in-top">
              <div v-if='peoplesShow' class='searchItem-box'>
                <div class='searchItem'  v-for='(item, index) in peoples' :key='index' @click='clickItem(item)'>
                  <span style='margin-right: 20px;'>{{item.name}}</span>
                  <span>学号: {{item.passengerCode}}</span>
                </div>
              </div>
            </transition>
          </div>
          <span class='search-text' @click='clickSearch'>搜索</span>
        </div>
      </div>
      <el-divider></el-divider>
      <div class='temperature-box'>
        <div class='temperature-chart'>
          <!--引入的柱状图-->
          <Histogram :histogramData='histogramData'/>
        </div>
      </div>
    </el-card>
    <div class='center-card-box'>
      <el-card class='mycard center-card'>
        <div class='center-card-title'>体温异常班级信息</div>
        <div class='class-box'>
          <div class='information-box'>
            <div v-for='(item, index) in classPeoples' :key='index' class='information-item-box'>
              <div class='number-title'>{{index + 1}}</div>
              <div class='className'>{{item.className}}</div>
              <div class='numberPeople' @click='clickPeople'>{{item.people}}人</div>
            </div>
          </div>
        </div>
      </el-card>
      <el-card class='mycard center-card'>
        <div class='center-card-title'>2019-10-1至2019-10-07体温占比图</div>
        <div>
          <!-- 环状图 -->
          <Ring :ringData='ringData'/>
        </div>
      </el-card>
    </div>
    <el-card style='margin-bottom: 40px;' class='mycard'>
        <div class='center-card-title'>2015-10-01至2015-10-07全校体温异常排序</div>
        <el-table border :data="tableData" stripe style="width: 100%;margin-top:20px;" :header-cell-style="{background:'#e7ecff',color:'#2c2626'}">
        <el-table-column align='center' prop="avatar" label="头像">
          <template slot-scope='scope'>
            <img style='cursor:pointer;border-radius:20px;' :src="scope.row.avatar" width="40" height="40"/>
          </template>
        </el-table-column>
        <el-table-column prop="studentID" label="学号" align='center'>
        </el-table-column>
        <el-table-column align='center' prop="name" label="姓名">
        </el-table-column>
        <el-table-column align='center' prop="class" label="班级">
        </el-table-column>
        <el-table-column align='center' prop="age" label="年龄">
        </el-table-column>
        <el-table-column align='center' prop="sex" label="性别">
        </el-table-column>
        <el-table-column align='center' prop="bodyTemperature" label="体温">
          <template slot-scope='scope'>
            <span style='color:#ff5858'>{{scope.row.bodyTemperature}}℃</span>
          </template>
        </el-table-column>
        <el-table-column align='center' prop="" label="操作" width='150'>
          <template slot-scope='scope'>
            <span class='lookDetail' @click='lookDetails(scope.row.name)'>查看详情</span>
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
        :total="tableData.length">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import Liquidfill from '@/components/Charts/Liquidfill'
import Histogram from '@/components/Charts/Histogram'
import Ring from '@/components/Charts/Ring'
import { setStore } from '@/utils/storage.js'
import { getApi } from '@/api/api.js' 
export default {
  components: {
    Liquidfill,
    Histogram,
    Ring
  },
  data () {
    return {  
        // 传递给水球图组件数据
        liquidfillData: {
          percent: 0,
        },
        // 传递给柱状图组价数据
        histogramData: {
          dateArr: [],
          numArr: [],
        },
        // 传递给环装图组件数据
        ringData: {
          dataArr: [
              { value: 80, name: "正常体温 36.1-37℃" },
              { value: 20, name: "低烧体温 37.1-38℃" },
              { value: 10, name: "高烧体温\xa038℃以上\xa0\xa0" },
            ]
        },
        // 发送请求的数据
        sendData: {
          classId: '0',
          startTime: '',
          endTime: '',
        },
        // 加载特效
        loading: false,
        // 选择区域
        showSelect: true,
        // 学校总人数
        schoolCount: '',
        // 累计识别人数
        totalDiscernCount: '',
        // 体温正常人数
        normalCount: '',
        // 体温异常人数
        abnormalCount: '',
        // 班级人数信息
        classPeoples: [],
        // 班级名称
        className: '',
        // 年级名称
        gradeName: '',
        // 当天日期
        todayDate: '',
        // 班级人数信息
        classPeoples: [
          {className: '初一一班', people: '100'},
          {className: '初一二班', people: '80'},
          {className: '初一三班', people: '75'},
          {className: '初一四班', people: '130'},
          {className: '初一五班', people: '60'},
          {className: '初一六班', people: '70'},
          {className: '初二一班', people: '100'},
          {className: '初二二班', people: '90'},
          {className: '初二三班', people: '80'},
          {className: '初二四班', people: '110'},
          {className: '初二五班', people: '140'},
        ],
        // 控制搜索重复人员区域盒子
        peoplesShow: false,
        // 搜索
        input: '',
        // 日期选择
        startDate: '',
        // 选择年级
        selectGrade: '',
        // 选择班级
        selectClass: '',
        // 年级数据
        gradeDatas: [],
        // 班级数据
        classDatas: [],
        // 分页器总条数
        total: null,
        // 分页器每页条数
        pageSize: null,
        // 页码
        pageCurrent: null,
        // 显示的页码
        pagerCount: 5,
        tableData: [
            {
            avatar: 'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
            class: '初一一班',
            name: '慕钦C',
            studentID: '2091123',
            age: 13,
            bodyTemperature: '38.5',
            sex: '男',
          },
            {
            avatar: 'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
            class: '初一一班',
            name: '王超',
            studentID: '2056461',
            age: 10,
            bodyTemperature: '39.5',
            sex: '男',
          },
            {
            avatar: 'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
            class: '初一一班',
            name: '王超二',
            studentID: '2056461',
            age: 10,
            bodyTemperature: '39.5',
            sex: '男',
          },
            {
            avatar: 'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
            class: '初一一班',
            name: '王超三',
            studentID: '2056461',
            age: 10,
            bodyTemperature: '39.5',
            sex: '男',
          },
            {
            avatar: 'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
            class: '初一一班',
            name: '王超四',
            studentID: '2056461',
            age: 10,
            bodyTemperature: '39.5',
            sex: '男',
          },
            {
            avatar: 'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
            class: '初一一班',
            name: '王超五',
            studentID: '2056461',
            age: 10,
            bodyTemperature: '39.5',
            sex: '男',
          },
            {
            avatar: 'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
            class: '初一一班',
            name: '王超六',
            studentID: '2056461',
            age: 10,
            bodyTemperature: '39.5',
            sex: '男',
          },
            {
            avatar: 'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
            class: '初一一班',
            name: '王超七',
            studentID: '2056461',
            age: 10,
            bodyTemperature: '39.5',
            sex: '男',
          },
            {
            avatar: 'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
            class: '初一一班',
            name: '王超八',
            studentID: '2056461',
            age: 10,
            bodyTemperature: '39.5',
            sex: '男',
          },
            {
            avatar: 'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
            class: '初一一班',
            name: '王超九',
            studentID: '2056461',
            age: 10,
            bodyTemperature: '39.5',
            sex: '男',
          },
            {
            avatar: 'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
            class: '初一一班',
            name: '王超十',
            studentID: '2056461',
            age: 10,
            bodyTemperature: '39.5',
            sex: '男',
          },
        ],
    }
  },
  mounted () {
    // 获取学校和班级数据
    this.loadTree()
    // 获取温度统计数据
    this.temperatureStatistics()
    // // 获取全校体温异常数据
    // this.getList()
    // 获取柱状图数据
    this.barChartsList()
    // // 获取环状图数据
    // this.getAccountedPercent()
    // // 获取体温异常班级信息
    // this.getPersonWarnCount()
  },
  created() {
    let date = new Date()
    this.todayDate = date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1)) + '-' + date.getDate()
    // 时间默认值
    this.startDate = [this.todayDate, this.todayDate]
    // 班级年级默认值
    this.selectGrade = 'all'
    this.selectClass = '全部'
    // 发送默认请求的默认值
    this.sendData.startTime = this.startDate[0]
    this.sendData.endTime = this.startDate[1]
  },
  methods: {
    // 获取学校和班级信息
    async loadTree() {
      let res = await getApi('loadTree', null)
      console.log(res, '学校和班级信息')
      if(res.success) {
        this.schoolData = res.result[0]
        this.gradeDatas = res.result[0].children
      }
    },
    // 获取今日温度统计数据
    async temperatureStatistics(id = '0', sTime = this.todayDate, eTime = this.todayDate) {
      this.schoolCount = 0
      this.totalDiscernCount = 0
      this.normalCount = 0
      this.abnormalCount = 0
      this.liquidfillData.percent = 0
      if(id == '0') id = ''
      let objData = {
        classId: id,
        startTime: sTime,
        endTime: eTime,
      }
      console.log(objData,'发送的温度统计参数')
      let res = await getApi('temperatureStatistics', objData)
      console.log(res,'温度统计数据')
      if(res.success) {
        this.schoolCount = res.result.schoolCount
        this.totalDiscernCount = res.result.totalDiscernCount
        this.normalCount = res.result.normalCount
        this.abnormalCount = res.result.abnormalCount
        this.liquidfillData.percent = res.result.accountedPercent
      }
    },
    // 获取柱状图数据
    async barChartsList() {
      this.histogramData.dateArr = []
      this.histogramData.numArr = []
      let res = await getApi('barChartsList', this.sendData)
      console.log(res,'柱状图数据')
      if(res.success) {
        if(res.result.length) {
          for(let i = 0;i < res.result.length;i++) {
            this.histogramData.dateArr.push(res.result[i].dateTime)
            this.histogramData.numArr.push(res.result[i].personCount)
          }
        }else {
          this.histogramData.numArr.push(0)
        }
      }
    },
    // 点击导出数据
    exportData() {
      alert('导出数据了!')
    },
    // 点击班级信息人数
    clickPeople() {
      alert('点击了班级人数')
    },
    // 选择起始时间
    changeDate() {
      this.sendData.startTime = this.startDate[0]
      this.sendData.endTime = this.startDate[1]
      // this.getList()
      // this.barChartsList()
      // this.getAccountedPercent()
    },
    // 选择年级
    changGrade(val) {
      this.classDatas = []
      this.selectClass = ''
      // 判断是否选择了全部
      if(val === 'all') {
        this.sendData.classId = '0'
        this.selectClass = '全部'
        this.className = ''
        // this.barChartsList()
        // this.getAccountedPercent()
      }else {
        // 选择完年级出现对应的班级
        if(this.gradeDatas.length != null) {
          for(let i = 0;i < this.gradeDatas.length;i++) {
            if(val.id === this.gradeDatas[i].id) {
              if(this.gradeDatas[i].children != null) {
                this.classDatas = this.gradeDatas[i].children
              }
            }
          }
        }
        this.gradeName = val.departName
      }
      console.log(this.sendData,'需要发送请求的数据')
    },
    // 选择班级
    changeClass(val) {
      // 判断是否选择全部
      if(val === 'all') {
        this.sendData.classId = []
        for(let i = 0;i < this.classDatas.length;i++) {
          this.sendData.classId.push(this.classDatas[i].id)
        }
        this.sendData.classId = this.sendData.classId.join(',')
        this.className = this.gradeName
      }else {
        this.sendData.classId = val.id
        this.className = val.departName
      }
      console.log(this.sendData,'需要发送请求的数据')
      // this.getList()
      // this.barChartsList()
      // this.getAccountedPercent()
    },
    // 搜索
    clickSearch() {
      this.peoplesShow = false
      if(!this.input) {
        this.$message.warning('请输入学生名字搜索!')
        return false
      }
      if(this.input == '钦彪') {
        let obj = {
          name: this.input,
          personId: '11',
          idImg: 'https://user-gold-cdn.xitu.io/2019/11/5/16e39396b5133aae?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1',
          classId: '2341123'
        }
        this.pushSetUp(obj.personId, obj.name, obj.idImg, obj.classId)
      }else if(this.input == '王超'){
        this.peoples = [
          {name: '王超', passengerCode: '22165'},
          {name: '王超', passengerCode: '22104'},
          {name: '王超', passengerCode: '24534'},
          {name: '王超', passengerCode: '21231'},
        ]
        this.peoplesShow = true
      }else {
        this.$message.warning('查无此人')
      }
    },
    // 查看详情
    lookDetails(name) {
      this.pushSetUp('1234', name, 'https://user-gold-cdn.xitu.io/2019/11/5/16e39396b5133aae?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1', 'asf900')
    },
    // 当前页改变
    currentChange(val) {
      this.getListTeacher(val, this.pageSize)
    },
    // 每页条数改变
    sizeChange(val) {
      this.getListTeacher(1, val)
    },
    // 点击搜索重复人员某一项
    clickItem(item) {
      this.pushSetUp(item.personId, item.name, item.idImg, item.classId)
    },
    // 跳转到人员温度详情页面设置
    pushSetUp(P, N, I, C) {
      let objData = {
        startTime: this.startDate[0],
        endTime: this.startDate[1],
        personId: P,
        name: N,
        idImg: I,
        classId: C,
      }
      setStore('rowData', objData)
      this.$router.push('temperaturStatistics/staffDetails')
      this.input = ''  
    }
  }
}
</script>

<style lang="scss" scoped>
.mycard {
  margin: 10px;
}
.mybox {
  margin: 10px;
  background: #fff;
}
// 顶部盒子
.top-box {
  display: flex;
}
// 顶部卡片标题
.topcard-title {
  margin: 20px 0 0 20px;
  color: #282c34;
  font-size: 18px;
}
// 水球卡片
.liquidfill {
  width: 350px;
}
// 水球标题
.liquidfill-title {
  margin: 20px 0 0 20px;
  color: #282c34;
  font-size: 18px;
}
// 统计卡片
.statistics {
  flex: 1;
}
// 统计卡片内容盒子
.card-content-box {
  margin: 30px 20px 20px 20px;
  display: flex;
  justify-content: space-between;
  height: 170px;
}
// 统计卡片内容
.card-content {
  width: 24%;
  height: 90%;
  border-radius: 10px;
}
// 卡片内容标题
.card-content-title {
  color: #fff;
}
// 卡片内容文本
.card-content-text {
  font-size: 30px;
  color: #fff;
}
// 顶部第一个盒子背景颜色
.one-bgcolor {
  background: -webkit-linear-gradient(left, #61a4ff, #6ba0fe, #729eff, #769bff);
}
// 顶部第二个盒子背景色
.two-bgcolor {
  background: -webkit-linear-gradient(left, #bf51fe, #a825fc, #9d0dfa, #9802f9);
}
// 顶部第三个盒子背景颜色
.three-bgcolor {
  background: -webkit-linear-gradient(left, #70e137, #67de2c, #5ad81c, #51d50f);
}
// 顶部第四个盒子背景颜色
.four-bgcolor {
  background: -webkit-linear-gradient(left, #fc6a6b, #fe6464, #fe5b5c, #ff5555);
}
// 顶部卡片文本内容盒子
.text-box {
  margin-top: 50px;
  margin-left: 30px;
}
// 选择搜索盒子
.select-search-box {
  height: 30px;
  margin-top: 15px;
}
// 选择盒子
.select-box {
  float: left;
}
// 输入框盒子
.input-box {
  float: left;
}
// 搜索盒子
.search-box {
  float: right;
}
// 搜索文本
.search-text {
  float: right;
  line-height: 32px;
  margin-left: 20px;
  font-size: 24px;
  color: #36a3f7;
  cursor: pointer;
}
// 搜索提示项盒子
.searchItem-box {
  border: 1px solid #e4e7ed;
  background: #fff;
  margin-top: 15px;
  border-radius: 5px;
  position: relative;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  z-index: 9999;
  padding-top: 10px;
  padding-bottom: 10px;
  &:before{
    content: '';
    position: absolute;
    bottom: 100%;
    left: 47px;
    width: 0;
    height: 0;
    border-width: 8px;
    border-style: solid;
    border-color: transparent;
    margin-bottom: -1px;
    border-bottom-width: 12px;
    border-bottom-color: #ffff;
    color: #e4e7ed;
  }
}
// 搜索提示项
.searchItem {
  height: 40px;
  line-height: 40px;
  padding-left: 30px;
  &:hover {
    background: #f5f7fa;
    cursor: pointer;
  }
}
// 统计盒子顶部
.statistics-top {
  height: 50px;
}
// 统计盒子顶部标题
.statistics-title {
  line-height: 50px;
  color: #282c34;
  font-size: 18px;
}
// 体温统计表盒子
.temperature-box {
  display: flex;
}
// 导出按钮
.export-button {
  float: right;
  background: #657eff;
  border: 0;
}
// 体温图表
.temperature-chart {
  flex: 1;
}
// 日期选择
/deep/ .el-date-editor {
  width: 300px;
}
// 选择框
/deep/ .el-select {
  width: 120px;
  margin-left: 10px;
}
// input输入框
/deep/ .el-input__inner {
  border-radius: 15px;
}
// 体温异常信息盒子
.information-item-box {
  height: 40px;
  margin-bottom: 10px;
}
// 班级信息排名数字文本
.number-title {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #f0f2f5;
  color: #314659;
  text-align: center;
  line-height: 20px;
  margin-top: 10px;
  float: left;
  font-size: 14px;
}
// 班级名
.className {
  float: left;
  line-height: 40px;
  margin-left: 20px;
  font-size: 14px;
}
// 人数
.numberPeople {
  float: right;
  line-height: 40px;
  margin-right: 30px;
  color: #36a3f7;
  font-size: 14px;
  cursor: pointer;
}
// 中部卡片盒子
.center-card-box {
  display: flex;
  margin-top: 10px;
}
//中部卡片
.center-card {
  width: 50%;
}
// 中部卡片标题
.center-card-title {
  margin-bottom: 20px;
  color: #282c34;
  font-size: 18px;
}
// 中部班级盒子
.class-box {
  height: 500px;
  overflow: hidden;
}
// 中部班级信息盒子
.information-box {
  height: calc(100% - 10px);
  overflow-y: auto;
  scrollbar-width: none; // 隐藏滚动条火狐
  &::-webkit-scrollbar { // 隐藏滚动条谷歌
    display: none;
  }
  .information-item-box:nth-child(-n+3) { // 前三个元素添加不同的背景颜色和字体颜色
    .number-title {
      background: #314659;
      color: #fff;
    }
  }
}
// 查看详情文本
.lookDetail {
  color: #409eff;
  cursor: pointer;
}
// 分页器样式
.el-pagination {
  float:right;
  margin: 20px 0 40px 0 ;
}
</style>