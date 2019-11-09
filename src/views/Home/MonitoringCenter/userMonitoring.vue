<template>
  <div>
    <el-card class='mycard'>
      <p class='title-text'>用户监控</p>
      <el-divider></el-divider>
      <div class='mybox'>
        <div class='mybox-chart'>
          <p>用户年龄段监控</p>
          <VePieChart/>
        </div>
        <div class='mybox-chart'>
          <p>用户下单监控</p>
          <VeHistogramChart/>
        </div>
        <div class='mybox-chart'>
          <p>用户偏好监控</p>
          <VeRingChart/>
        </div>
        <div class='mybox-chart'>
          <p>用户地区分布监控</p>
          <VeMap/>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import VePieChart from '@/components/Charts/userMonitoringCharts/vePieChart'
import VeHistogramChart from '@/components/Charts/userMonitoringCharts/veHistogramChart'
import VeRingChart from '@/components/Charts/userMonitoringCharts/veRingChart'
import VeMap from '@/components/Charts/userMonitoringCharts/veMap'

export default {
    components: {
      VePieChart,
      VeHistogramChart,
      VeRingChart,
      VeMap,
    },
    data() {
        return {
          
        }
    },
    methods: {
        
    },
}
</script>

<style lang="scss" scoped>
// 卡片样式
.mycard {
    margin:20px 20px 20px 20px;
} 
// 标题样式
.title-text {
  font-weight:bold;
  font-size:20px;
}
// 包裹图表的盒子
.mybox {
  display:flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
// 图表卡片样式
.mybox-chart {
  margin:20px 0 10px 0;
  width:48%;
}
</style>