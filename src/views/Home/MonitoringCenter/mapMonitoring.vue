<template>
  <div>
    <el-card class='mycard'>
      <p class='title-text'>地图监控</p>
      <el-divider></el-divider>
      <div class='map-box'>
        <div class='baiduMap-box'>
          <p class='baiduMap-text'>百度地图：</p>
          <VeBmapChart/>
        </div>
        <div class='gaodeMap-box'>
          <p class='gaodeMap-text'>高德地图：</p>
          <VeAmapChart/>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import VeBmapChart from '@/components/Charts/mapMonitoringCharts/veBmapChart'
import VeAmapChart from '@/components/Charts/mapMonitoringCharts/veAmapChart'

export default {
    components: {
        VeBmapChart,
        VeAmapChart,
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
    margin: 20px;
} 
// 地图盒子
.map-box {
    display: flex;
    justify-content: space-around;
    width: 100%;
}
// 标题样式
.title-text {
  font-weight:bold;
  font-size:20px;
} 
// 百度地图标题样式
.baiduMap-text {
    font-weight: bold;
}
// 百度地图盒子
.baiduMap-box {
    margin-bottom: 30px;
    width: 48%;
}
// 高德地图标题样式
.gaodeMap-text {
    font-weight: bold;
}
// 高德地图盒子
.gaodeMap-box {
    width: 48%;
}
</style>