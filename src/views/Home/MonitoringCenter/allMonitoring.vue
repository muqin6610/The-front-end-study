<template>
  <div>
    <el-card class='mycard'>
      <p class='title-text'>整体监控</p>
      <el-divider></el-divider>
      <p class='clock-title'>时钟显示 :</p>
      <div id="clock">
        <p class="date">{{ dateFormat(date) }}</p>
      </div>
      <el-divider></el-divider>
      <div>
      <p class='prefecture-title'>专区评分 ：</p>
      <el-table
      :data="tableData"
      style="width: 100%;margin-top:20px;"
      :show-header="false"
      >
        <el-table-column
          prop="name"
          show-overflow-tooltip
          label="专区名">
          <template slot-scope='scope'>
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="poples"
          show-overflow-tooltip
          label="评分人数">
          <template slot-scope='scope'>
            <span>共{{scope.row.poples}}人评分</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="rate"
          label="评分">
          <template slot-scope='scope'>
            <el-rate
              style='margin-left:50px;'
              v-model="scope.row.rate"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}">
            </el-rate>
          </template>
        </el-table-column>
       </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>

export default {
    components: {
      
    },
    data() {
        return {
          date: new Date(),
          tableData: [
            {name: '书籍专区', poples: 1385, rate: 4.8},
            {name: '视频专区', poples: 1115, rate: 4.5},
            {name: '论坛专区', poples: 1245, rate: 3.7},
            {name: '下载专区', poples: 2312, rate: 4},
            {name: '推荐专区', poples: 1516, rate: 4.2},
            {name: '热门专区', poples: 1813, rate: 4.9},
          ],
        }
    },
    created() {
      let _this = this // 声明一个变量指向Vue实例this，保证作用域一致
      this.timer = setInterval(() => {
        _this.date = new Date() // 修改数据date
      }, 1000)
    },
    methods: {

    },
    beforeDestroy() {
      if (this.timer) {
        clearInterval(this.timer) // 在Vue实例销毁前，清除我们的定时器
      }
  }
}
</script>

<style lang="scss" scoped>
// 卡片样式
.mycard {
  margin:20px 20px 20px 20px;
} 
// 页面标题样式
.title-text {
  font-weight:bold;
  font-size:20px;
}
// 时钟标题
.clock-title {
  font-weight:bold;
}
// 时钟相关样式
#clock {
  font-family: 'Share Tech Mono', monospace;  
  // background-color: #001529;
  border: 1px solid #dcdfe6 ;
  width: 300px;
  height: 100px;
  line-height: 65px;
  border-radius: 15px;
  text-align: center;
  color: #282c34;
  // text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 0);
}
#clock .date {
  letter-spacing: 0.1em;
  font-size: 20px;
  font-weight: bold;
}

// 评分区标题
.prefecture-title {
  font-weight: bold;
}
</style>