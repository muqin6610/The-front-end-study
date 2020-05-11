<template>
    <div>
      <el-dialog
        :title="statisticsObj.name + statisticsObj.month + '月考勤统计详情'"
        width='1000px'
        :visible.sync="statisticsObj.statisticsShow">
        <div class='img-box'>
          <img style='cursor:pointer;border-radius:5px;' v-lazy="statisticsObj.img" width="100" height="100"/>
        </div>
        <div class='content-box'>
          <div id="calendar">
              <!-- 星期行 -->
              <ul class="weekdays">
                  <li 
                  v-for='(val,key) in weeks' 
                  >
                  <span :style='chooseStyle(key)'>
                      {{val}}
                  </span>
      
                  </li>
      
              </ul>
              <!-- 日期 -->
              <ul class="days">
                  <li 
                  class="days-li"
                  :class='borderClass(val.day, val.day.getDate())'
                  v-for='(val,key) in days'
                  >
                      <span 
                      :class='chooseClass(val.day)'
                      >
                      {{val.day.getDate()}}</span>
                      <p>{{returnText(val.day, val.day.getDate())}}</p>
                  </li>
              </ul>
          </div>
          <div class='charts-box'>
            <ve-ring :data="chartData" :colors='colors' :settings="chartSettings"></ve-ring>
          </div>
        </div>
      </el-dialog>
    </div>
</template>

<script>
import { getApi } from '@/api/api.js'

export default {                                                                                                                                                                                         
    props: {
      statisticsObj: {
          statisticsShow: {
              type: Boolean,
              default: false,
          },
          name: {
              type: String,
              default: '',
          },
          date: {
              type: String,
              default: '',
          },
          img: {
              type: String,
              default: '',
          },
          month: {
              type: String,
              default: '',
          }
      }
    },
    data() {
        this.colors = ['#ff9900', '#3399ff']
        this.chartSettings = {
          label: {
            formatter(params) {
               return  params.name + params.value + '天'
            }
          }
        }
        return {
            currentDay: null,
            currentMonth: null,
            currentYear: null,
            currentWeek: null,
            weeks: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
            days: [],
            // 晚归数据
            lateReturn: [],
            // 环状图数据
            chartData: {
              columns: ['类型', '天数'],
              rows: [
                { '类型': '晚归', '天数': 0 },
                { '类型': '正常', '天数': 0 },
              ]
            }
        }
    },
    created() {
    },
    watch: {
        statisticsObj: {
            handler(newVal, oldVal) {
              console.log(newVal)
              if(newVal.statisticsShow === true) {
                this.init(newVal.date)
                this.ringData()
                this.getLateReturn()
              }
            },
            deep: true
        },
    },
    methods: {
        init(data) {
         let dayObj
   
         if (data) {
           console.log(data,'data')
           dayObj = this.$timeDate.getFormat(data)
         }else {
           dayObj = this.$timeDate.getFormat()
         }

         let { day, year, month, week } = dayObj
         this.currentDay = day
         this.currentYear = year
         this.currentMonth = month
         this.currentWeek = week
   
         if (!this.currentWeek) {
           this.currentWeek = 7
         }
   
         this.days.length = 0
         let str = this.$timeDate.dateFormat(data).ymd
   
         for (let i = 2 - this.currentWeek ; i < 44 - this.currentWeek; i++) {
           let d = new Date(str)
           d.setDate(i)
           this.days.push({
             day: d
           });
         }
        // setTimeout(() => {
        //   let arr = document.getElementsByClassName("days-li")
        //   for(let i = 0;i < arr.length;i++) {
        //     if(i == 5 || i == 6 || i == 12 || i == 13 || i == 19 || i == 20 || i == 26 || i == 27 || i == 33  || i == 34 || i == 40 || i == 41) {
        //       arr[i].classList.add('grayColor')
        //     }
        //   }
        // }, 200)
       }, 
       //其他月加class名'other'
       chooseClass(day) {
         if (day.getMonth() + 1 != this.currentMonth) return "other"
       },
       // 晚归月份加边框
       borderClass(day, D) {
        if (day.getMonth() + 1 === this.currentMonth) {
            for(let i = 0;i < this.lateReturn.length;i++) {
              if(this.lateReturn[i].month === D) {
                return "borderStyle"
              }
            }
         }
       },
       // 晚归月份加文本
       returnText(day, D) {
        if (day.getMonth() + 1 === this.currentMonth) {
            for(let i = 0;i < this.lateReturn.length;i++) {
              if(this.lateReturn[i].month === D) {
                return this.lateReturn[i].time
              }
            }
         }
       },
       //改变周六日显示颜色
       chooseStyle(key) {
         if (key === 5 || key === 6) return "font-weight: bold"
       },
       // 获取环状图数据
       async ringData() {
         let res = await getApi('ringData', null)
         if(res.success) {
           this.chartData.rows[0].天数 = res.result.lateReturn
           this.chartData.rows[1].天数 = res.result.normal
         }
       },
       // 获取晚归数据
       async getLateReturn() {
         let res = await getApi('getLateReturn', null)
         if(res.success) {
           this.lateReturn = res.result
         }
       }
    },
}
</script>

<style lang="scss" scoped>
// 弹框
/deep/ .el-dialog {
    border-radius: 15px;
}
// 弹框标题盒子
/deep/ .el-dialog__header {
    border-bottom: 1px solid #bcbcbc;
    font-weight: bold;
} 
// 弹框标题文本
/deep/ .el-dialog__title {
    font-size: 25px;
}
// 内容盒子
.content-box {
    display: flex;
}
ul {
  list-style-type: none;
}

#calendar {
  width: 560px;
  margin: 20px auto;
}
.weekdays {
  margin: 0;
  padding: 10px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  font-size: 20px;
}

.weekdays li {
  display: inline-block;
  width: 60px;
  text-align: center;
}

.days {
  padding: 0;
  background: #ffffff;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.days li {
  display: inline-block;
  width: 80px;
  height: 80px;
  text-align: center;
  padding: 8px;
  box-sizing: border-box;
  margin: 0px 0px -1px -1px;
}

.days li .other {
  padding: 5px;
  color: gainsboro;
}
.days .borderStyle {
  border: 1px solid #ff9933;
}

.days li:hover {
  background: #e1e1e1;
}
// 图表盒子
.charts-box {
    width: 39%;
    margin-top: 30px;
}
.grayColor {
  background: #e1e1e1;
}
</style>