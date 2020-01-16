<template>
  <div class='mybox'>
    <div id="container" @click='clickButton'></div>
    <div id='getSocket' @click='clickSocket'>点击报警</div>
    <!--右上角信息窗口-->
    <div v-if='showInformation' class='top-message-box' @click='clickTopMessage'>
      <div class='top-message-box-title'>出现警报!</div>
      <div>
        <div>
            <span class='top-title-text'>设备编号:</span>
            <span class='top-message-text'>{{ information.deviceID }}</span>
          </div>
          <div>
            <span class='top-title-text'>登记人姓名:</span>
            <span class='top-message-text'>{{ information.registrantName }}</span>
          </div>
          <div>
            <span class='top-title-text'>登记使用单位:</span>
            <span class='top-message-text'>{{ information.registrationUnit }}</span>
          </div>
          <div>
            <span class='top-title-text'>登记人使用电话:</span>
            <span class='top-message-text'>{{ information.registrantPhone }}</span>
          </div>
          <div>
            <span class='top-title-text'>行政划区:</span>
            <span class='top-message-text'>{{ information.administrativeDivision }}</span>
          </div>
          <div>
            <span class='top-title-text'>报警时间:</span>
            <span class='top-message-text'>{{ information.alarmTime }}</span>
          </div>
          <div>
            <span class='top-title-text'>报警点经度:</span>
            <span class='top-message-text'>{{ information.alarmPointLongitude }}</span>
          </div>
          <div>
            <span class='top-title-text'>报警点纬度:</span>
            <span class='top-message-text'>{{ information.alarmPointLatitude }}</span>
          </div>
          <div>
          <span class='top-title-text'>具体地址:</span>
          <span class='top-message-text'>{{ specificAddress }}</span>
        </div>
        <div>
          <span class='top-title-text'>报警信息:</span>
          <span class='top-message-text'>{{ information.registrantName }}遇到紧急情况,请求支援</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {

  data () {
    return {  
      // 控制弹窗信息显示
      showInformation: false,
      // 弹窗具体信息
      information: [],
      // 存放websocket实例
      websocket: '',
      // websocket地址
      path:"ws://192.168.1.235:8086/websocket/{token}",
      // 具体地址
      specificAddress: '',
      // 所有设备信息
      devices: [
        {
          position:[114.42226, 23.118092],
          deviceID: 89651546465,
          registrantName: '惠州测试用户',
          alarmTime: '2019-11-15 14:45:22',
          alarmPointLongitude: 114.42226,
          alarmPointLatitude: 23.118092,
          registrationUnit: '惠州惠民公司',
          registrantPhone: 1333504551,
          administrativeDivision: 431255123,
        },
        {
          position:[116.42826, 23.188092],
          deviceID: 89851546964,
          registrantName: '汕头测试用户',
          alarmTime: '2019-11-15 14:45:22',
          alarmPointLongitude: 114.18226,
          alarmPointLatitude: 24.158092,
          registrationUnit: '汕头美的公司',
          registrantPhone: 15672154631,
          administrativeDivision: 431255123,
        },
        {
          position:[114.39226, 24.138092],
          deviceID: 89851546468,
          registrantName: '韶关测试用户',
          alarmTime: '2019-11-15 14:45:22',
          alarmPointLongitude: 114.18226,
          alarmPointLatitude: 24.158092,
          registrationUnit: '韶关爱普瑞公司',
          registrantPhone: 1333504551,
          administrativeDivision: 431255123,
        },
        {
          position:[121.524968,25.049646],
          deviceID: 89851546466,
          registrantName: '台北测试用户',
          alarmTime: '2019-11-15 14:45:22',
          alarmPointLongitude: 114.18226,
          alarmPointLatitude: 24.158092,
          registrationUnit: '台北菜刀公司',
          registrantPhone: 18975641235,
          administrativeDivision: 431255123,
        },
        {
          position:[110.002117,27.570334],
          deviceID: 89851546467,
          registrantName: '怀化测试用户',
          alarmTime: '2019-11-15 14:45:22',
          alarmPointLongitude: 114.18226,
          alarmPointLatitude: 24.158092,
          registrationUnit: '怀化铁路公司',
          registrantPhone: 13845615474,
          administrativeDivision: 431255123,
        },
        {
          position:[115.48226, 23.198092],
          deviceID: 89851546462,
          registrantName: '汕尾测试用户',
          alarmTime: '2019-11-15 14:45:22',
          alarmPointLongitude: 114.18226,
          alarmPointLatitude: 24.158092,
          registrationUnit: '汕尾皮蛋公司',
          registrantPhone: 1333504551,
          administrativeDivision: 431255123,
        },
        {
          position:[109.836623,27.209222],
          deviceID: 89851646465,
          registrantName: '洪江市测试用户',
          alarmTime: '2019-11-15 14:45:22',
          alarmPointLongitude: 114.18226,
          alarmPointLatitude: 24.158092,
          registrationUnit: '洪江市血鸭公司',
          registrantPhone: 17745689431,
          administrativeDivision: 431255123,
        },
        {
          position:[116.48226, 24.208092],
          deviceID: 89951546465,
          registrantName: '广州测试用户',
          alarmTime: '2019-11-15 14:45:22',
          alarmPointLongitude: 114.18226,
          alarmPointLatitude: 24.158092,
          registrationUnit: '广州高塔公司',
          registrantPhone: 13861316620,
          administrativeDivision: 431255123,
        },
        {
          position:[116.48226, 24.208092],
          deviceID: 89831546465,
          registrantName: '梅州测试用户',
          alarmTime: '2019-11-15 14:45:22',
          alarmPointLongitude: 114.18226,
          alarmPointLatitude: 24.158092,
          registrationUnit: '梅州高科技公司',
          registrantPhone: 18465135492,
          administrativeDivision: 431255123,
        },
        {
          position:[113.94668,22.68941],
          deviceID: 89851576465,
          registrantName: '宝安测试用户',
          alarmTime: '2019-11-15 14:45:22',
          alarmPointLongitude: 114.18226,
          alarmPointLatitude: 24.158092,
          registrationUnit: '宝安人工智能公司',
          registrantPhone: 1333504551,
          administrativeDivision: 431255123,
        },
        {
          position:[110.74668,32.64941],
          deviceID: 89851541465,
          registrantName: '十堰测试用户',
          alarmTime: '2019-11-15 14:45:22',
          alarmPointLongitude: 114.18226,
          alarmPointLatitude: 24.158092,
          registrationUnit: '十堰皮包公司',
          registrantPhone: 1333504551,
          administrativeDivision: 431255123,
        },
        {
          position:[113.64668,22.88941],
          deviceID: 89850546465,
          registrantName: '东莞测试用户',
          alarmTime: '2019-11-15 14:45:22',
          alarmPointLongitude: 114.18226,
          alarmPointLatitude: 24.158092,
          registrationUnit: '东莞新能源公司',
          registrantPhone: 1333504551,
          administrativeDivision: 431255123,
        },
        {
          position:[114.64668,23.88941],
          deviceID: 89051546465,
          registrantName: '河源测试用户',
          alarmTime: '2019-11-15 14:45:22',
          alarmPointLongitude: 114.18226,
          alarmPointLatitude: 24.158092,
          registrationUnit: '河源飞机公司',
          registrantPhone: 1333504551,
          administrativeDivision: 431255123,
        },
        {
          position:[110.64668,30.88941],
          deviceID: 89151546465,
          registrantName: '湖北测试用户',
          alarmTime: '2019-11-15 14:45:22',
          alarmPointLongitude: 114.18226,
          alarmPointLatitude: 24.158092,
          registrationUnit: '湖北教育公司',
          registrantPhone: 1333504551,
          administrativeDivision: 431255123,
        },
        {
          position:[103.94668,30.58941],
          deviceID: 89351546465,
          registrantName: '成都测试用户',
          alarmTime: '2019-11-15 14:45:22',
          alarmPointLongitude: 114.18226,
          alarmPointLatitude: 24.158092,
          registrationUnit: '成都军工公司',
          registrantPhone: 1854356123,
          administrativeDivision: 431255123,
        },
        {
          position:[87.54668,43.89041],
          deviceID: 80851546465,
          registrantName: '乌鲁木齐测试用户',
          alarmTime: '2019-11-15 14:45:22',
          alarmPointLongitude: 114.18226,
          alarmPointLatitude: 24.158092,
          registrationUnit: '乌鲁木齐烤全牛公司',
          registrantPhone: 15664653015,
          administrativeDivision: 431255123,
        },
      ],
      getMessage: {
          position:[114.42226, 23.118092],
          deviceID: 89651546465,
          registrantName: '惠州测试用户',
          alarmTime: '2019-11-15 14:45:22',
          alarmPointLongitude: 114.42226,
          alarmPointLatitude: 23.118092,
          registrationUnit: '惠州惠民公司',
          registrantPhone: 1333504551,
          administrativeDivision: 431255123,
        },
      // 保存的定位点
      newMarker: '',
      // 保存的地图
      newMap: '',
      // 缩放比例
      zoom: 20,
      // 马上处理按钮文本
      dealImmediately: '',
      // 待处理按钮文本
      pending: '',
    }
  },
  mounted () {
    // 开启地图初始化
    this.init()
  },
  created() {
    window.getMessage = this.getMessage
  },
  methods: {
    // 初始化高德地图
    init() {
      // 实例化地图
      let map = new AMap.Map('container', {
        resizeEnable: true,
        zoom: this.zoom,
      })

      // 保存地图实例
      this.newMap = map

      // 清除地图覆盖物
      map.clearMap() 

      // 添加比例尺控件到地图
      map.addControl(new AMap.Scale())
      // 添加工具条到地图
      map.addControl(new AMap.ToolBar())
      // 添加鹰眼到地图
      map.addControl(new AMap.OverView())

      // 创建右键菜单
      let contextMenu = new AMap.ContextMenu()

      // 右键放大
      contextMenu.addItem("放大一级", () =>  map.zoomIn(), 0)
      // 右键缩小
      contextMenu.addItem("缩小一级", () => map.zoomOut(), 1)
      // 右键显示全国范围
      contextMenu.addItem("缩放至全国范围", (e) => map.setZoomAndCenter(4, [108.946609, 34.262324]), 2)
      // 地图绑定鼠标右击事件——弹出右键菜单
      map.on('rightclick', (e) => contextMenu.open(map, e.lnglat))

      // 实例化地理编码器
      let geocoder = new AMap.Geocoder({
        city: "全国", // 城市，默认：全国
        radius: 1000 // 范围，默认：500
      })

      // 实例化信息弹窗
      let infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(-3, -30)})

      // 创建定位点实例
      for (let i = 0, marker; i < this.devices.length; i++) {
          // 设置坐标点样式地址
          let iconUrl = ''
          // 设置坐标点弹窗内容
          let content = ''
          // 判断是否是报警坐标
          if(this.devices[i].status) {
            iconUrl = 'https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png'
          }else {
            iconUrl = 'https://webapi.amap.com/theme/v1.3/markers/n/mark_bs.png'
          }
          // 实例化定位点
          let marker = new AMap.Marker({
            position: this.devices[i].position,
            map: map,
            icon: iconUrl,
            offset: new AMap.Pixel(-13, -28),
          })
          // 判断是否是报警坐标
          if(this.devices[i].status) {
             // 获取当前报警经纬度
             let lnglats  = this.devices[i].position
             let that = this
             // 地理编码器经纬度转具体地址
             geocoder.getAddress(lnglats, function(status, result) {
                // 设置坐标点弹窗内容
                let content = ''
                  // 保存转化后的具体地址
                  if(result.regeocode.formattedAddress) {
                    that.specificAddress = result.regeocode.formattedAddress
                  }
                  // 获取弹窗内容
                  content = "<div>" +
                     "<div class='messagebox-title-text'>手电筒SOS报警</div>" +
                   "</div>" +
                   "<div style='display:flex;justify-content: space-between;'>" +
                     "<div>" +
                       "<div>" +
                         "<span class='title-text'>设备编号:</span>" +
                         `<span class='message-text'>${that.devices[i].deviceID}</span>` +
                       "</div>" +
                       "<div>" +
                         "<span class='title-text'>登记人姓名:</span>" +
                         `<span class='message-text'>${that.devices[i].registrantName}</span>` +
                       "</div>" +
                       "<div>" +
                         "<span class='title-text'>报警时间:</span>" +
                         `<span class='message-text'>${that.devices[i].alarmTime}</span>` +
                       "</div>" +
                       "<div>" +
                         "<span class='title-text'>报警点经度:</span>" +
                         `<span class='message-text'>${that.devices[i].alarmPointLongitude}</span>` +
                       "</div>" +
                     "</div>" +
                     "<div>" +
                      "<div>" +
                         "<span class='title-text'>登记使用单位:</span>" +
                         `<span class='message-text'>${that.devices[i].registrationUnit}</span>` +
                       "</div>" +
                       "<div>" +
                         "<span class='title-text'>登记人使用电话:</span>" +
                         `<span class='message-text'>${that.devices[i].registrantPhone}</span>` +
                       "</div>" +
                       "<div>" +
                         "<span class='title-text'>行政划区:</span>" +
                         `<span class='message-text'>${that.devices[i].administrativeDivision}</span>` +
                       "</div>" +
                       "<div>" +
                         "<span class='title-text'>报警点纬度:</span>" +
                         `<span class='message-text'>${that.devices[i].alarmPointLatitude}</span>` +
                       "</div>" +
                     "</div>" +
                   "</div>" +
                  "<div>" +
                   "<div>" +
                     "<span class='title-text'>具体地址:</span>" +
                     `<span class='message-text'>${that.specificAddress}</span>` +
                 "</div>" +
                 "<div>" +
                     "<span class='title-text'>报警信息:</span>" +
                     `<span class='message-text'>${that.devices[i].registrantName}遇到紧急情况,请求支援</span>` +
                   "</div>" +
                 "</div>" +
                 "<div class='button-box'>" +
                   `<span class='successBtn'>${that.dealImmediately}</span>` +
                   `<span class='dangerBtn'>${that.pending}</span>` +
                 " <div>";

                // 保存报警定位点
                that.newMarker = marker
                // 定位点信息窗口的内容
                marker.content =  content

                let value = that.devices[i].registrantName + '遇到紧急情况,请求支援,' + '地址:' + that.specificAddress
                that.playVoice(value)
            })
          }else {
           // 获取当前报警经纬度
           let lnglats  = this.devices[i].position
           let that = this
           // 地理编码器经纬度转具体地址
           geocoder.getAddress(lnglats, function(status, result) {
              // 设置坐标点弹窗内容
              let content = ''
                // 保存转化后的具体地址
                if(result.regeocode.formattedAddress) {
                  that.devices[i].specificAddress = result.regeocode.formattedAddress
                }
                // 获取弹窗内容
                content = 
                "<div>" +
                   "<div class='messagebox-title-text'>手电筒设备信息</div>" +
                 "</div>" +
                   "<div>" +
                     "<div>" +
                       "<span class='title-text'>设备编号:</span>" +
                       `<span class='message-text'>${that.devices[i].deviceID}</span>` +
                     "</div>" +
                     "<div>" +
                       "<span class='title-text'>登记人姓名:</span>" +
                       `<span class='message-text'>${that.devices[i].registrantName}</span>` +
                     "</div>" +
                   "</div>" +
                   "<div>" +
                    "<div>" +
                       "<span class='title-text'>登记使用单位:</span>" +
                       `<span class='message-text'>${that.devices[i].registrationUnit}</span>` +
                     "</div>" +
                     "<div>" +
                       "<span class='title-text'>登记人使用电话:</span>" +
                       `<span class='message-text'>${that.devices[i].registrantPhone}</span>` +
                     "</div>" +
                     "<div>" +
                       "<span class='title-text'>行政划区:</span>" +
                       `<span class='message-text'>${that.devices[i].administrativeDivision}</span>` +
                     "</div>" +
                   "</div>" +
                 "</div>" +
                 "<div>" +
                   "<span class='title-text'>具体地址:</span>" +
                   `<span class='message-text'>${that.devices[i].specificAddress}</span>` +
                 "</div>" +
               "</div>" 
              // 定位点信息窗口的内容
              marker.content =  content
            })
        }
        // 定位点注册鼠标移入事件
        marker.on('mouseover', markerClick)
        marker.emit('mouseover', {target: marker})
      }
       
      // 鼠标移入定位点
      function markerClick(e) {
        console.log(e,'移入的定位点')
        // 弹窗信息
        infoWindow.setContent(e.target.content)
        // 弹窗位置
        infoWindow.open(map, e.target.getPosition())
      }
      
      // 地图自适应定位点
      map.setFitView()
     },
     // 语音播报
     playVoice(value) {
        if(!('speechSynthesis' in window)) {
		   	throw alert("对不起，您的浏览器不支持")
         return false
		   }
       console.log(value,'报警提示语音文字')
       let utterThis = new window.SpeechSynthesisUtterance(value)
       window.speechSynthesis.speak(utterThis)
     },
     // 点击弹框按钮
     clickButton(e) {
       console.log(e, 'e')
       // 通过类名判断点击的具体是哪个按钮
       if(e.target.className === 'successBtn') {
         console.log(e.target.innerHTML)
         this.dealImmediately = '已处理'
         this.showInformation = false
         this.init()
       }else if(e.target.className === 'dangerBtn') {
         console.log(e.target.innerHTML)
         this.pending = '已处理'
         this.showInformation = false
         this.init()
       }
     },
     // 点击右上角警报窗口
     clickTopMessage() {
       // 定位到当前报警点
       this.newMap.setFitView(this.newMarker)
     },
     // 监听点击事件获取最新sokcet服务器消息
     clickSocket() {
       // 开启右上角弹窗信息
       this.showInformation = true
       // 保存报警信息
       this.information = window.getMessage
       // 判断报警的设备
       for(let i = 0;i < this.devices.length;i++) {
         if(window.getMessage.deviceID === this.devices[i].deviceID) {
           // 替换
           this.devices[i] = window.getMessage
           // 设置报警点标识
           this.devices[i].status = 'CTP'
           console.log(this.devices,'xxxxxx')
           // 设置按钮文本
           this.dealImmediately = '马上处理'
           this.pending = '待处理'
           // 初始化地图
           this.init()
         }
       }
     }
  }
}
</script>

<style lang="scss" scpoed>
.mybox {
    margin: 10px;
    position: relative;
}

// 地图整体
#container {
  height: 850px;
  width: 100%;
}

// 右上角消息窗口
.top-message-box {
   position: absolute;
   width: 220px;
   top: 0;
   right: 0;
   z-index: 1000; 
   border-top: 0;
   border-right: 0;
   padding: 10px;
   border: 5px solid #fff;
   animation: glow 100ms ease-out infinite alternate;
   &:hover {
     background: #fff;
     cursor: pointer;
     animation: glow 1000ms ease-out infinite alternate;
   }
} 
@keyframes glow {
    0% {
        border: 5px solid #fff;
    }
    100% {
        border: 5px solid #ff0000;
    }
}

// 右上角消息窗口标题
.top-message-box-title {
  font-weight: bold;
  text-align: center;
  height: 25px;
  color: red;
}

// 弹框具体消息标题样式
.top-title-text {
  font-size: 12px;
  font-weight: bold;
  color: #242424;
}
// 弹框具体消息样式
.top-message-text {
  color: #242424;
  font-size: 12px;
  padding-left: 10px;
  box-sizing: border-box;
}

// 消息弹窗标题样式
.messagebox-title-text {
  text-align: center;
  color: #488cb5;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}
// 弹框具体消息标题样式
.title-text {
  font-size: 14px;
  font-weight: bold;
  color: #574e4e;
}
// 弹框具体消息样式
.message-text {
  color: #82827d;
  font-size: 13px;
  padding-left: 10px;
  box-sizing: border-box;
}
// 马上处理按钮
.successBtn {
  color: #fff;
  background: #7fd43f;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  width: 210px
}
// 待处理样式
.dangerBtn {
  color: #fff;
  background: #ff4351;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  width: 210px
}
// 按钮盒子
.button-box {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  width: 450px;
  margin-left: 10px;
}
// 定位点样式
// .amap-icon img {
//   width: 35px;
//   height: 34px;
// }

</style>