<template>
  <div>
   <el-card class="box-card" style='margin-bottom:10px'>
    <div style='margin-bottom: 15px;'>
      <h2 style='font-weight:bold'>{{trainingName}}安排详情</h2>
    </div>
   </el-card>
     <!--日历组件-->
   <div id="calendar">
    <!-- 年份 月份 -->
    <div class="month">
      <el-date-picker
        prefix-icon='el-icon-d-caret'
        v-model="dateYear"
        type="year"
        format="yyyy 年"
        value-format="yyyy"
        :clearable='false'
        placeholder="选择年">
      </el-date-picker>
      <el-date-picker
        prefix-icon='el-icon-d-caret'
        v-model="dateMonth"
        type="month"
        format="MM 月"
        value-format="MM"
        :clearable='false'
        placeholder="选择月">
      </el-date-picker>
    </div>
    <!-- 星期 -->
    <ul class="weekdays">
        <li>周一</li>
        <li>周二</li>
        <li>周三</li>
        <li>周四</li>
        <li>周五</li>
        <li style="color:red">周六</li>
        <li style="color:red">周日</li>
    </ul>
    <!-- 日期 -->
    <ul class="days">
        <!-- v-for循环 每一次循环用<li>标签创建一天 -->
        <li @click='clickDay(dayobject.day)'  v-for="dayobject in days" style="height: 120px;">
            <!--本月-->
            <!--如果不是本月  改变类名加灰色-->
            <span v-if="dayobject.day.getMonth()+1 != currentMonth" class="other-month day-text">{{ dayobject.day.getDate() }}号</span>
            <div v-if="dayobject.day.getMonth()+1 != currentMonth">{{getLunarCalendar(dayobject.day.getFullYear(),dayobject.day.getMonth() + 1,dayobject.day.getDate())}}</div>

            <!--如果是本月  还需要判断是不是这一天-->
            <span v-else>
          <!--今天  同年同月同日-->
              <div v-if="dayobject.day.getFullYear() == new Date().getFullYear() && dayobject.day.getMonth() == new Date().getMonth() && dayobject.day.getDate() == new Date().getDate()">
                <span class="active day-text">{{ dayobject.day.getDate() }}号</span>
                <div  class="active">{{getLunarCalendar(dayobject.day.getFullYear(),dayobject.day.getMonth() + 1,dayobject.day.getDate())}}</div> 
              </div>
              <div v-else>
                <span class='day-text'>{{ dayobject.day.getDate() }}号</span>
                <div>{{getLunarCalendar(dayobject.day.getFullYear(),dayobject.day.getMonth() + 1,dayobject.day.getDate())}}</div>
              </div>
            </span>
            <!-- 遍历备注,判断日期是否一致 -->
            <div class="remarks" style='color:#332b00'>点击创建计划</div>
            <span v-for="(item,i) in programDetails" :key="i">
                <span :title='item.value' class="remarks" v-if="getDate(dayobject.day, item.date)">{{item.value}}</span>
            </span>
        </li>
    </ul>
  </div>
    <el-button type="primary" style='margin:10px 0 30px 20px;' @click='abrogate'>返回</el-button>
  </div>
</template>

<script>

export default {
data() {
    return {
        // 计划详情
        programDetails: [],
        // 选择的年
        dateYear: '',
        // 选择的月
        dateMonth: '',
        // 选择的日
        dateDay: '',
        //页面标题名称
        trainingName:'',
        // 月数
        currentMonth: 0,
        // 年数
        currentYear: 0,
        // 星期数
        currentWeek: 0,
        // 全部日期数
        days: [],
        // 日历显示多少个格子
        lattice: 42,
      }
    },
    created() {
      //调用获取传过来的对应考核计划数据数据的方法
      this.getParticulars()
      // 初始化日历
      this.initData()
      // 设置日历默认时间
      let year = this.$timeDate.getFormat().year
      let month = this.$timeDate.getFormat().month
      this.dateYear = year + ''
      this.dateMonth = month + ''
    },
    watch: {
      dateYear(val){
          if(val) {
              if(this.dateMonth && this.dateYear) {
                  this.getNewCalendar()
              }else {
                  return false
              }
          }
      },
      dateMonth(val){
          if(val) {
              if(this.dateYear && this.dateMonth) {
                  this.getNewCalendar()
              }else {
                  return false
              }
          }
      },
    },
     methods:{
       // 获取农历
       getLunarCalendar(year,month,day) {
         // 调用农历转化方法获取农历日期:IDayCn和节气:Term
         let data = this.$calendar.solar2lunar(year, month, day)
        //  console.log(data,'公历转农历返回的数据')
         if(!data.festival && !data.lunarFestival && !data.Term) {// 都没有则返回农历日期
           return data.IDayCn
         }
         if(data.festival && data.lunarFestival && data.Term) {
           return data.festival + '/' + data.lunarFestival + '/' + data.Term
         }
         if(data.festival && data.lunarFestival) {
           return data.festival + '/' + data.lunarFestival
         }else if(data.lunarFestival) {
           return data.lunarFestival
         }else if(data.festival){
           return data.festival
         }
         if(data.lunarFestival && data.Term) {
           return data.lunarFestival + '/' + data.Term
         }else if(data.lunarFestival) {
           return data.lunarFestival
         }else if(data.Term){
           return data.Term
         }
         if(data.festival && data.Term) {
           return data.festival + '/' + data.Term
         }else if(data.festival) {
           return data.festival
         }else if(data.Term){
           return data.Term
         }
       },
       // 判断是否为要显示训练计划的年月日
       getDate(oldDate, newDate) {
         let oldD = this.$timeDate.getFormat(oldDate)
         let newD = this.$timeDate.getFormat(newDate)
         if(oldD.year == newD.year && oldD.month == newD.month && oldD.day == newD.day) {
           return true
         }else {
           return false
         }
       },
      //获取传过来的对应考核计划数据
      getParticulars() {
          //对应考核计划数据
          let recordData = JSON.parse(localStorage.getItem("recordData"))
          //获取计划名称
          this.trainingName = recordData.key

          // 获取计划详情
          this.programDetails = [
              {value:'徒手3公里',date: '2019-12-12'},
              {value:'徒手5公里',date: '2019-12-12'},
              {value:'翻轮胎',date: '2019-12-20'},
              {value:'俯卧撑',date: '2019-12-20'},
              {value:'俯卧撑',date: '2019-12-20'},
              {value:'俯卧撑',date: '2019-12-20'},
              {value:'翻轮胎',date: '2019-12-20'},
              {value:'翻轮胎',date: '2019-12-20'},
              {value:'翻轮胎',date: '2019-12-20'},
              {value:'翻轮胎',date: '2019-12-20'},
              {value:'翻轮胎',date: '2019-12-20'},
              {value:'翻轮胎',date: '2019-12-20'},
              {value:'翻轮胎',date: '2019-12-20'},
              {value:'夜间射击',date: '2019-12-11'},
              {value:'夜间射击',date: '2019-12-11'},
              {value:'夜间射击',date: '2019-12-11'},
              {value:'驾驶坦克',date: '2019-12-2'},
          ]
       },
      //点击返回
      abrogate(){
        //返回上级页面
        this.$router.go(-1)
      },
      // 初始化日历
      initData(cur) {
        let date
        if (cur) {
          date = this.$timeDate.getFormat(cur)
        } else {
          date = this.$timeDate.getFormat()
        }
        this.currentYear = date.year
        this.currentMonth = date.month
        this.currentWeek = date.week
        if (this.currentWeek == 0) this.currentWeek = 7
        let str = this.$timeDate.dateFormat(cur).ymd
        this.days.length = 0

        //初始化本周
        for (let i = this.currentWeek - 1; i >= 0; i--) {
          let d = new Date(str)
          d.setDate(d.getDate() - i)
          let dayobject = {}
          dayobject.day = d
          this.days.push(dayobject)// 将日期放入data 中的days数组 供页面渲染使用
        }
        //其他周
        for (let i = 1; i <= this.lattice - this.currentWeek; i++) {
          let d = new Date(str)
          d.setDate(d.getDate() + i)
          let dayobject = {}
          dayobject.day = d
          this.days.push(dayobject)
        }
    },
    getNewCalendar() {
      let date = this.dateYear + '-' + this.dateMonth
      this.initData(date)
    },
    // 点击日历
    clickDay(e) {
      let date = this.$timeDate.dateFormat(e).ymdCN
      this.$router.push({path:'/home/swatAuxiliary/addProgramParticulars',query:{date:date,trainingName:this.trainingName}})
    },
  }      
}
</script>

<style lang='scss' scoped>
// 日历组件盒子
#calendar{
  margin: 10px;
  --bdcolor: #bcbcbc;
  --bgcolor: #fff;
}
// 日期选择控件
/deep/ .el-input__inner {
  border-radius: 0;
  border: 1px solid var(--bdcolor);
}
// 选择年月区域
.month {
  padding: 15px;
  background: var(--bgcolor);
  border-bottom: 1px solid var(--bdcolor);
}
// 日期选择器
/deep/ .el-date-editor {
  width: 150px;
}
.weekdays {
  margin: 0;
  padding: 20px 0;
  background-color: var(--bgcolor);
  display: flex;
  flex-wrap: wrap;
  color: #282c34;
  justify-content: space-around;
  font-size: 20px;
}
.weekdays li {
  display: inline-block;
  width: 13.6%;
  text-align: center;
}
.days {
  padding: 0;
  background: var(--bgcolor);
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.days li {
  list-style-type: none;
  display: inline-block;
  width: 14.2%;
  height: 180px !important;
  text-align: center;
  padding: 15px 0 10px 0;
  color: #000;
  cursor: pointer;
  border: 1px solid var(--bdcolor);
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
// 日期文本
.day-text {
  font-size: 28px;
}
.days li .active {
  font-weight: bold;
}
.days li .other-month {
  padding: 5px;
  color: gainsboro;
}
.days li:hover {
  background: #f5f7fa;
}
.remarks {
  padding: 0 10px 0 10px;
}
</style>