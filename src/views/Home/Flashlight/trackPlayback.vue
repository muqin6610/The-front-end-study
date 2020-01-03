<template>
  <div class='mybox'>
    <div id="containe"></div>
    <div class='selectDate-box'>
      <h4 style='margin-left:10px;font-weight:bold'>轨迹回放时间段选择</h4>
      <div>
        <el-date-picker
          class='el-date-picker'
          v-model="dateTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div>
       <h4 style='margin:10px 0 10px 10px;font-weight:bold'>设备选择</h4>
       <el-select style='margin-bottom:10px;margin-left:10px;' v-model="selectDevice" placeholder="请选择">
         <el-option
           v-for="item in devices"
           :key="item.id"
           :label="item.deviceName"
           :value="item.deviceId">
         </el-option>
       </el-select>
       <el-button style='margin-left:80px;margin-right:10px;' size="medium" type="primary" @click='determine'>查询</el-button>
    </div>
    </div>
    <div v-if='lineArr.length' class="input-card">
      <h4 style='margin-left:10px;font-weight:bold'>轨迹回放控制</h4>
      <div class="input-item">
          <el-button type="primary" size="small" class="btn" id="start" @click="startAnimation">开始回放</el-button>
          <el-button type="primary" size="small" class="btn" id="pause" @click="pauseAnimation">暂停回放</el-button>
      </div>
      <div class="input-item">
          <el-button type="primary" size="small" class="btn" id="resume" @click="resumeAnimation">继续回放</el-button>
          <el-button type="primary" size="small" class="btn" id="stop" @click="stopAnimation">停止回放</el-button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      // 缩放比例
      zoom: 20,
      // 定位实例
      marker: [], 
      // 轨迹坐标
      lineArr: [],
      // 开结束时间
      dateTime: '',
      // 选择的设备
      selectDevice: '',
      // 所有设备
      devices: [],
    }
  },
  mounted () {
    // 开启地图初始化
    this.init()
    // 获取所有设备
    this.getDevces()
  },
  methods: {
    init(num) {
       // 实例化地图
       let map = new AMap.Map('containe', {
         resizeEnable: true,
         zoom: this.zoom,
       })

       if(this.lineArr.length > 0 && num === 1) {
        // 实例化定位点
        this.marker = new AMap.Marker({
          map: map,
          position: [114.428935,23.117761],
          icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png",
          offset: new AMap.Pixel(-10, -32),
          autoRotation: true,
          angle:-90,
        })
        // 绘制轨迹
        let polyline = new AMap.Polyline({
          map: map,
          path: this.lineArr,
          showDir:true,
          strokeColor: "#28F",  //线颜色
          // strokeOpacity: 1,     //线透明度
          strokeWeight: 6,      //线宽
          strokeStyle: "solid"  //线样式
        })

        // 注册移动事件
        this.marker.on('moving', (e) => polyline.setPath(e.passedPath))

        // 地图自适应点位点
        map.setFitView()
      }else if(this.lineArr.length === 0 && num === 1){
        this.$message.warning('本设备此时间段内暂无轨迹活动')
      }
    },
    // 获取所有设备
    getDevces() {
      this.devices = [
        {deviceId:'1212211', deviceName:'测试1号',phone:'1846464555'},
        {deviceId:'1345766', deviceName:'测试2号',phone:'1769453234'},
        {deviceId:'1679345', deviceName:'测试3号',phone:'1856577682'},
      ]
    },
    // 开始动画
    startAnimation () {
        this.marker.moveAlong(this.lineArr, 300)
    },
    // 暂停动画
    pauseAnimation () {
        this.marker.pauseMove()
    },
    // 继续动画
    resumeAnimation () {
        this.marker.resumeMove()
    },
    // 停止动画
    stopAnimation () {
        this.marker.stopMove()
    },
    // 查询轨迹
    determine() {
      if(this.selectDevice && this.dateTime.length > 1) {
        if(this.selectDevice === '1212211') {
          this.lineArr = [
            [114.428935,23.117761],
              [114.428939,23.117825],
              [118.428912,23.118549],
              [114.428912,23.118549],
              [114.428998,23.118555],
              [114.428998,32.118555],
              [114.429282,23.11856],
              [114.429658,23.118528],
              [119.430151,33.118453],
              [114.430784,23.118302],
              [114.430784,23.118302],
              [114.431863,23.117846],
              [118.432072,23.117718],
              [114.432362,23.117718],
              [114.433633,33.118935],
              [114.43367,23.118968],
              [119.434648,23.119861]
          ]
        }else {
          this.lineArr = []
        }
        this.init(1)
      }else {
        if(this.dateTime.length < 1) {
          this.$message.warning('您还未选择时间段')
        }else {
          if(!this.selectDevice) {
            this.$message.warning('您还未选择设备')
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mybox {
    // margin: 5px 5px 5px 5px;
    position:relative;
}
// 地图样式
#containe {
    height: 800px;
    width: 100%;
}
// 轨迹回放操作盒子
.input-card {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1000;
  background: #fff;
  border: 2px solid #eff1f4;
}

// 回放时间段选择盒子
.selectDate-box {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  background: #fff;
  border: 2px solid #eff1f4;
}
// 按钮盒子
.input-item {
  margin-left: 10px;
}
// 按钮样式
.input-card .btn {
    margin-right: 10px;
    width: 100px;
    margin-bottom: 10px;
}
// 开始结束时间选择器
.el-date-picker {
  margin: 0 10px 0 10px;
}
</style>