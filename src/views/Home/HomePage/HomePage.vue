<template>
  <div>
    <!--顶部统计-->
    <div class='myCard-box'>
      <el-card class='myCard'>
        <i class='el-icon-s-custom el-icon' @click="viewsDatas"></i>
        <div class='myText'>
          <span class='myText-span'>访问量</span>
          <p style='font-weight:bold'>{{viewsData}}</p>
        </div>
      </el-card>
      <el-card class='myCard'>
        <i class='el-icon-edit-outline el-icon' @click="messageVolumes"></i>
        <div class='myText'>
          <span class='myText-span'>留言量</span>
          <p style='font-weight:bold'>{{messageVolume}}</p>
        </div>
      </el-card>
      <el-card class='myCard'>
        <i class='el-icon-document-copy el-icon'></i>
        <div class='myText'>
          <span class='myText-span'>书籍量</span>
          <p style='font-weight:bold'>{{bookeData}}</p>
        </div>
      </el-card>
      <el-card class='myCard'>
        <i class='el-icon-thumb el-icon'></i>
        <div class='myText'>
          <span class='myText-span'>点赞量</span>
          <p style='font-weight:bold'>{{likes}}</p>
        </div>
      </el-card>
    </div>
    <el-button icon="el-icon-view" size="mini" type="primary" class="kanban" @click="goKanban">温度看板</el-button>
    <el-button icon="el-icon-view" size="mini" type="primary" class="kanban" @click="goKanbanTwo">考勤看板</el-button>
    <!--访问量折线图-->
    <el-card class='line-chart-card'>
      <p>访问量趋势</p>
      <VeLineChart/>
    </el-card>

    <!--留言量柱状图-->
    <el-card class='line-chart-card'>
      <p>留言量趋势</p>
      <VeHistogramChart/>
    </el-card>

    <!--书籍量图表-->
    <el-card class='line-chart-card'>
      <p>书籍总量</p>
      <VeWaterfallChart/>
    </el-card>

    <!--点赞量图表-->
    <el-card class='line-chart-card'>
      <p>点赞趋势</p>
      <VeScatterChart/>
    </el-card>
  </div>
</template>

<script>
import VeLineChart from '@/components/Charts/HomePageCharts/veLineChart'
import VeHistogramChart from '@/components/Charts/HomePageCharts/veHistogramChart'
import VeWaterfallChart from '@/components/Charts/HomePageCharts/veWaterfallChart'
import VeScatterChart from '@/components/Charts/HomePageCharts/veScatterChart'
import { getApi } from '@/api/api.js'

export default {
    components: {
      VeLineChart,
      VeHistogramChart,
      VeWaterfallChart,
      VeScatterChart,
    },
    data() {
        return {
          // 访问量
          viewsData: '',
          // 留言量
          messageVolume: '',
          // 书籍量
          bookeData: '',
          // 点赞量
          likes: '',
        }
    },
    created() {
      this.getStatisticalData()
    },
    methods: {
      // 获取统计数据
      async getStatisticalData() {
        let res = await getApi('statisticalData', null)
        if(res.success) {
          let { viewsData, messageVolume, bookeData, likes } = res.result
          this.viewsData = viewsData
          this.messageVolume = messageVolume
          this.bookeData = bookeData
          this.likes = likes
        }
      },
      viewsDatas() {
        this.$popup({
          title: '访问量',
          content: '你好,现在的全部访问量为2515次,谢谢~',
          btnText: '我知道了',
          status:'1'
        })
      },
      messageVolumes() {
        this.$popup({
          title: '留言量',
          content: '你好,现在的全部留言量为4213条,谢谢~',
          btnText: '前往板块管理',
          status:'2'
        })
      },
      goKanban() {
        this.$router.push("/home/homePage/dataKanban")
      },
      goKanbanTwo() {
        this.$router.push("/home/homePage/dataKanbanTwo")
      },
    }
}
</script>

<style lang="scss" scoped>
// 包裹卡片的盒子样式
.myCard-box {
  display: flex;
  margin-top: 30px;
  justify-content : space-around;
}
// 卡片样式
.myCard {
  width: 20%;
  height:100px;
  // box-shadow: 5px 5px 5px #888888;
  &:hover {
    background-color: #36a3f7;
    cursor:pointer;
    color: #fff;
    .el-icon {
      color: #fff;
    }
    .myText-span {
      color: #fff;
    }
  }
}  
// 统计图标样式
.el-icon {
  font-size: 50px;
  color: #36a3f7;
  float: left;
}
// 统计文本样式
.myText {
  float: right;
  height:100%;
}
// 统计标题样式
.myText-span {
  color:#8c8c8c;
  font-size:20px;
}
// 折线图表卡片
.line-chart-card {
  margin:30px 32px 30px 32px;
  // box-shadow: 5px 5px 5px #888888;
}
// 折线图区域
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
.kanban {
  margin: 20px 0 0 30px;
}
</style>