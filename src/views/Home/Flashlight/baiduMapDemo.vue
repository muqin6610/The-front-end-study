<template>
  <el-card class='mycard'>
    <baidu-map class="map" :center="{lng: 114.42226, lat: 23.118092}" :zoom="15" :scroll-wheel-zoom="true">
      <!--比例尺控件-->
      <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
      <!--缩放控件-->
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <!--地图类型控件-->
      <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>
      <!--定位控件-->
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
      <!--折线覆盖物(运行轨迹)-->
      <bm-polyline :path="polylinePath" stroke-color="blue" :stroke-opacity="0.9" :stroke-weight="10"></bm-polyline>
      <!--点覆盖物(定位标识)和信息弹框-->
      <bm-marker :position="{lng: 114.42226, lat: 23.118092}" :dragging="true" @click="infoWindowOpen">
        <bm-info-window :show="show" @close="infoWindowClose" @open="infoWindowOpen">
          <div>
            <p style='text-align:center;color:#488cb5;font-size:18px'>手电筒SOS报警</p>
          </div>
          <div style='display:flex;justify-content: space-between;'>
            <div>
              <div>
                <span class='title-text'>设备编号:</span>
                <span class='message-text'>89851546465</span>
              </div>
              <div>
                <span class='title-text'>登记人姓名:</span>
                <span class='message-text'>系统测试用户</span>
              </div>
              <div>
                <span class='title-text'>报警时间:</span>
                <span class='message-text'>2019-11-15 14:45:22</span>
              </div>
              <div>
                <span class='title-text'>报警点经度:</span>
                <span class='message-text'>141.15545</span>
              </div>
            </div>
            <div>
              <div>
                <span class='title-text'>登记使用单位:</span>
                <span class='message-text'>系统测试企业深圳集团</span>
              </div>
              <div>
                <span class='title-text'>登记人使用电话:</span>
                <span class='message-text'>1333504551</span>
              </div>
              <div>
                <span class='title-text'>行政划区:</span>
                <span class='message-text'>441302</span>
              </div>
              <div>
                <span class='title-text'>报警点纬度:</span>
                <span class='message-text'>23.09121</span>
              </div>
            </div>
          </div>
          <div>
            <div>
              <span class='title-text'>具体地址:</span>
              <span class='message-text'>东环一路东环天虹附近10米</span>
            </div>
            <div>
              <span class='title-text'>报警信息:</span>
              <span class='message-text'>系统测试用户遇到紧急情况,请求支援</span>
            </div>
          </div>
          <div style='display:flex;justify-content: space-around;margin-top:10px'>
            <el-button type="success" style='width:200px' @click='processed'>已处理</el-button>
            <el-button type="danger" style='width:200px' @click='pending'>待处理</el-button>
          </div>
        </bm-info-window>
      </bm-marker>
      <bm-marker :position="{lng: 114.42226, lat: 23.128092}" :dragging="true" @click="infoWindowOpen">
        <bm-info-window :show="show" @close="infoWindowClose" @open="infoWindowOpen">
          <div>
            <p style='text-align:center;color:#488cb5;font-size:18px'>手电筒SOS报警</p>
          </div>
          <div style='display:flex;justify-content: space-between;'>
            <div>
              <div>
                <span class='title-text'>设备编号:</span>
                <span class='message-text'>89851546465</span>
              </div>
              <div>
                <span class='title-text'>登记人姓名:</span>
                <span class='message-text'>系统测试用户</span>
              </div>
              <div>
                <span class='title-text'>报警时间:</span>
                <span class='message-text'>2019-11-15 14:45:22</span>
              </div>
              <div>
                <span class='title-text'>报警点经度:</span>
                <span class='message-text'>141.15545</span>
              </div>
            </div>
            <div>
              <div>
                <span class='title-text'>登记使用单位:</span>
                <span class='message-text'>系统测试企业深圳集团</span>
              </div>
              <div>
                <span class='title-text'>登记人使用电话:</span>
                <span class='message-text'>1333504551</span>
              </div>
              <div>
                <span class='title-text'>行政划区:</span>
                <span class='message-text'>441302</span>
              </div>
              <div>
                <span class='title-text'>报警点纬度:</span>
                <span class='message-text'>23.09121</span>
              </div>
            </div>
          </div>
          <div>
            <div>
              <span class='title-text'>具体地址:</span>
              <span class='message-text'>东环一路东环天虹附近10米</span>
            </div>
            <div>
              <span class='title-text'>报警信息:</span>
              <span class='message-text'>系统测试用户遇到紧急情况,请求支援</span>
            </div>
          </div>
          <div style='display:flex;justify-content: space-around;margin-top:10px'>
            <el-button type="success" style='width:200px' @click='processed'>已处理</el-button>
            <el-button type="danger" style='width:200px' @click='pending'>待处理</el-button>
          </div>
        </bm-info-window>
      </bm-marker>
    </baidu-map>
  </el-card>
</template>

<script>


export default {
    data() {
        return {
            // 控制定位点详细信息弹出框的显示/隐藏
            show: true,
            // 运动轨迹坐标
            polylinePath: [
              {lng: 114.42226, lat: 23.118092},
              {lng: 114.45226, lat: 23.107092},
              {lng: 114.48026, lat: 23.106092},
              {lng: 114.50026, lat: 23.108092},
            ]
        }
    },
    created() {
      
    },
    methods: {
      // 关闭定位点消息提示
      infoWindowClose () {
        this.show = false
      },
      // 开启定位点提示消息
      infoWindowOpen () {
        this.show = true
      },
      // 已处理
      processed() {
        alert('已处理')
      },
      // 待处理
      pending() {
        alert('待处理')
      }
    },
}
</script>

<style lang="scss" scoped>
.mycard {
  margin: 20px;
}
.map {
  width: 100%;
  height: 800px;
} 
.title-text {
  font-size: 14px;
  font-weight: bold;
  color: #574e4e;
}
.message-text {
  color: #82827d;
  font-size: 14px;
}
</style>