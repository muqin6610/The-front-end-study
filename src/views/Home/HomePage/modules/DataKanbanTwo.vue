<template>
  <div id="kan" class="kanban" @click='clickDom'>
    <div id='getAttendance' @click='clickSocket'></div>
    <!--顶部-->
    <div class="top-bar">
        <div class="top-item left-box">
            <div class="let-item">
                <div class="divider left-border"></div>
                <div class="button-box">
                  <span class="item-name" style="color: #fff" @click="clickItemName">
                    {{itemName}}<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <transition name="el-zoom-in-top">
                    <div v-if="shiftShow" class='searchItem-box'>
                      <div class="searchItem" v-for="item in options" :key="item.value" @click='clickItem(item)'>
                        <span>{{item.label}}</span>
                      </div>
                    </div>
                  </transition>
                </div>
            </div>
            <div class="let-item squares-itme">
                <div>
                    <div class="quadrilateral">
                        <div class="left-line"></div>
                        <div class="right-line"></div>
                    </div>
                </div>
                <div class="squares-one"></div>
            </div>
            <div class="let-item">
                <div class="divider right-border"></div>
            </div>
        </div>
        <div class="top-item center-box">
            <div class="center-content">
                {{title}}
            </div>
        </div>
        <div class="top-item right-box">
            <div class="right-item">
                <div class="divider left-border-two"></div>
            </div>
            <div class="right-item squares-itme">
                <div>
                    <div class="quadrilateral-two">
                        <div class="right-line-two"></div>
                        <div class="left-line-two"></div>
                    </div>
                </div>
                <div class="squares-two"></div>
            </div>
            <div class="right-item close-itme">
                <div class="divider right-border-two"></div>
                <div class="close-box" @click="goPush">
                    <i class="el-icon-close"></i>
                </div>
            </div>
        </div>
    </div>
    <!--底部-->
    <div class="footer-content">
        <div class="statistics-box">
            <i class="after1"></i>
            <i class="after2"></i>
            <i class="after3"></i>
            <i class="after4"></i>
            <i class="before1"></i>
            <i class="before2"></i>
            <i class="before3"></i>
            <i class="before4"></i>
            <i class="top-after"></i>
            <i class="top-before"></i>
            <i class="top-before2"></i>
            <i class="top-before3"></i>
            <i class="top-border"></i>
            <div class="upper-half">
                <div class="upper-item">
                    <span class="content-text">应到人数</span>
                    <div class="content-number">20000</div>
                </div>
                <div class="upper-item">
                    <span class="content-text">实到人数</span>
                    <div class="content-number">19000</div>
                </div>
                <div class="upper-item">
                    <span class="content-text">迟到人数</span>
                    <div class="content-number">1000</div>
                </div>
                <div class="upper-item">
                    <span class="content-text">缺卡人数</span>
                    <div class="content-number">1000</div>
                </div>
            </div>
            <div class="second-half">
                <span class="content-text">考勤占比</span>
                <div>
                    <KanbanPie :pieData="pieData"/>
                </div>
            </div>
        </div>
        <div class="list-box">
            <i class="after1"></i>
            <i class="after2"></i>
            <i class="after3"></i>
            <i class="after4"></i>
            <i class="before1"></i>
            <i class="before2"></i>
            <i class="before3"></i>
            <i class="before4"></i>
            <i class="top-after"></i>
            <i class="top-before"></i>
            <i class="top-before2"></i>
            <i class="top-before3"></i>
            <i class="top-border"></i>
            <p class="list-item-title">流水记录</p>
            <div class="list-item-box">
                <div class="item-box">
                    <div class="img-box">
                        <img style="width: 100%;height: 100%;" class="cover" :onerror='defaultImg' src="item.img">
                    </div>
                    <div class="information">
                        <div>
                            <span class="information-text">姓名:</span>
                            <span class="information-text">王超</span>
                        </div>
                        <div>
                            <span class="information-text">时间:</span>
                            <span class="information-text">2020-05-25 18:30:00</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import KanbanPie from '@/components/Charts/KanbanPie'
import screenfull from 'screenfull'

  export default {
    components: {
        KanbanPie
    },
    data() {
        return {
            pieData: {
              dataArr: [
                  { value: 100000, name: "实到" },
                  { value: 1000, name: "缺卡" },
                  { value: 1000, name: "迟到" },
                ]
            },
            shiftShow: false,
            itemName: '',
            title: "智慧校园平台",
            warning: 0,
            tested: 0,
            options: [
                {value: '1', label: '早班'},
                {value: '2', label: '中班'},
                {value: '3', label: '晚班'},
            ],
            allList: [
                {
                    name: "王超",
                    date: "2020-05-22 18:15:00",
                    img: "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
                    id: "1",
                },
            ],
            defaultImg: 'this.src="' + require('../../../../assets/image/avatarImg.jpg') +'"',
        }
    },
    created() {
        window.onresize = () => {
          // 全屏下监控是否按键了ESC
          if (!this.checkFull()) {
            // 全屏下按键esc后要执行的动作
            this.isFullscreen = false
          }
        }
        this.screenfull()
        // let userId = store.getters.userInfo.id
        // let url = window._CONFIG['socketURL'] + userId
        // // 建立websocket连接
        // // connectSocket(url)

        // let departInfo = getStore("departInfo")
        // departInfo.departNameAbbr ? this.title = departInfo.departNameAbbr + this.$t('m.platform') : this.title = this.$t('m.cloudPlatform')

        this.pieData.dataArr[0].value = 10000
        this.pieData.dataArr[1].value = 1000
        this.pieData.dataArr[2].value = 800

        this.itemName = this.options.length > 0 ? this.options[0].label : "暂无班次"
    },
    mounted() {
        document.getElementById("header").style.display = 'none'
        document.getElementById("aside").style.display = 'none'
        document.getElementById("kan").style = 'margin: 0'
    },
    methods: {
        // 全屏事件
        screenfull() {
          console.log(screenfull)
          const el = document.getElementById('kan')
          if (!screenfull.isEnabled) {
            this.$message.warning('Your browser does not work')
            return false
          }
          screenfull.toggle()
        //   screenfull.request(el)
          this.isFullscreen = true
        },
        // 是否全屏并按键ESC键的方法
        checkFull() {
          let isFull = document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled
          // to fix : false || undefined == undefined
          if (isFull === undefined) {
              isFull = false
          }
          return isFull
        },
        getAvatarView(avatar) {  return this.url.imgerver + "/" + avatar },
        goPush() { 
            this.$router.go(-1) 
            screenfull.exit()
        },
        clickSocket() {
            this.getDisplayBoardLeft()
            this.getDisplayBoardRight()
        },
        clickItemName() {  this.options.length > 0 ? this.shiftShow = true : this.shiftShow = false },
        clickItem(val) {
            // this.shiftShow = false
            this.itemName = val.label
        },
        // 获取统计数据
        async getDisplayBoardLeft() {
            let res = await getAction(this.url.getDisplayBoardLeft, null)
            console.log(res)
            if(res.success) {
                let { abnormalCount, todayLockageNumber, accountedPercent } = res.result
                this.warning = abnormalCount
                this.tested = todayLockageNumber
                this.liquidfillData.percent = accountedPercent
            }
        },
        // 获取列表数据
        async getDisplayBoardRight() {
            let res = await getAction(this.url.getDisplayBoardRight, { tempDisplayType: this.tempDisplayType })
            if(res.success) {
                let { allList, abnormalList } = res.result
                this.allList = allList.records
                this.abnormalList = abnormalList.records
            }
        },
        // 点击本页面
        clickDom(e) { 
            if(e.target.className !== "item-name" && e.target.className !== "el-icon-arrow-down el-icon--right") this.shiftShow = false 
        },
    },
    destroyed() {
        // webSocket.close()
        // window.isOk = null
        document.getElementById("header").style.display = 'block'
        document.getElementById("aside").style.display = 'block'
        document.getElementById("kan").style = 'margin: 10px'
    },
  }
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'led regular';
  src: url('../../../../assets/fonts/LcdD.ttf');
}

$cn-heght: 45px;
$bc-color: #01e1e3;
$theme-color: #010f24;
$white-color: #FFF;

.kanban {
    background: $theme-color;
    height: calc(100vh - 20px);
    position: relative;
    margin: 10px;
}
.top-bar {
    height: 100px;
    padding: 10px;
    display: flex;
    margin-bottom: 10px;
}
.top-item {
    width: 33.33%;
}
.center-content {
    margin: 0 auto;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    border: 2px solid $bc-color;
    height: $cn-heght;
    line-height: 40px;
    text-align: center;
    color: $bc-color;
    font-size: 24px;
    box-shadow: 0px 0px 15px #2c808d inset;
}
.left-box {
    display: flex;
}
.let-item {
    width: 33.33%;
}
.right-box {
    display: flex;
}
.right-item {
    width: 33.33%;
}
.divider {
    display: block;
    height: 2px;
    width: 100%;
    background-color: $bc-color;
    border: 0.5px solid $bc-color;
}
.left-border {
    margin: 30px auto;
    position: relative;
    &:before {
        content:""; 
        position: absolute; 
        right: -1px; 
        top: -1px; 
        width: 16px;  
        height: 4px; 
        background-color: $theme-color;
    }
}
.right-border {
    margin: 50px auto;
    position: relative;
    &:before {
        content:""; 
        position: absolute; 
        left: -1px; 
        top: -1px; 
        width: 14px;  
        height: 4px; 
        background-color: $theme-color;
    }
}
.left-border-two {
    margin: 48px auto;
    position: relative;
    &:before {
        content:""; 
        position: absolute; 
        right: -1px; 
        top: -1px; 
        width: 15px;  
        height: 4px; 
        background-color: $theme-color;
    }
}
.right-border-two {
    margin: 68px auto;
    position: relative;
    &:before {
        content:""; 
        position: absolute; 
        left: -1px; 
        top: -1px; 
        width: 14px;  
        height: 4px; 
        background-color: $theme-color;
    }
}
.quadrilateral {
    border: 2px solid $bc-color;
    height: 20px;
    margin-top: 30px;
    position: relative;
    border-left: 0;
    border-right: 0;
    &:before {
        content:""; 
        position: absolute; 
        left: 0; 
        top: -2px; 
        width: 20px;  
        height: 4px; 
        background-color: $theme-color;
    }
    &:after {
        content:""; 
        position: absolute; 
        right: 0; 
        bottom: -2px; 
        width: 50px;  
        height: 4px; 
        background-color: $theme-color;
    }
}

.quadrilateral-two {
    border: 2px solid $bc-color;
    height: 20px;
    margin-top: 48px;
    position: relative;
    border-left: 0;
    border-right: 0;
    &:before {
        content:""; 
        position: absolute; 
        left: 0; 
        top: -2px; 
        width: 20px;  
        height: 4px; 
        background-color: $theme-color;
    }
}

.squares-itme {
    position: relative;
}
.button-box {
    height: 40px;
    width: 90px;
    line-height: 60px;
    .item-name {
        cursor: pointer;
        color: $white-color;
        line-height: 60px;
    }
}
.squares-one {
    height: 12px;
    width: 40px;
    position: relative;
    position: absolute;
    right: 1px;
    top: 32px;
    &:before{
        content: '';
        position: absolute;
        top: 0; 
        right: 0; 
        bottom: 0; 
        left: 0;
        background: $bc-color;
        transform: skewX(40deg);
        z-index: 1;
    }
}
.squares-two {
    height: 12px;
    width: 40px;
    position: relative;
    position: absolute;
    right: 6px;
    top: 58px;
    &:before{
        content: '';
        position: absolute;
        top: 0; 
        right: 0; 
        bottom: 0; 
        left: 0;
        background: $bc-color;
        transform: skewX(40deg);
        z-index: 1;
    }
}
.left-line {
    height: 25px;
    width: 2px;
    background: $bc-color;
    transform: rotate(-40deg);
    position: absolute;
    left: -8px;
    top: -2px;
}
.right-line {
    height: 28px;
    width: 2px;
    background: $bc-color;
    transform: rotate(-40deg);
    position: absolute;
    right: -9px;
    top: -4px;
}
.left-line-two {
    height: 25px;
    width: 2px;
    background: $bc-color;
    transform: rotate(-40deg);
    position: absolute;
    left: -8px;
    top: -2px;
}
.right-line-two {
    height: 25px;
    width: 2px;
    background: $bc-color;
    transform: rotate(-40deg);
    position: absolute;
    right: -8px;
    top: -3px;
}
.close-itme {
    position: relative;
}
.close-box {
    width: 30px;
    height: 30px;
    color: $bc-color;
    border: 1px solid $bc-color;
    border-radius: 50%;
    text-align: center;
    line-height: 30px;
    font-size: 18px;
    font-weight: bold;
    background: $theme-color;
    position: absolute;
    top: 25px;
    right: 0;
    box-shadow: 0px 0px 15px #2c808d inset;
    cursor: pointer;
}

.footer-content {
    display: flex;
    padding: 10px;
}
.statistics-box {
    margin-right: 20px;
    width: 40%;
    border: 1px solid $bc-color;
    position: relative;
    .top-after {
        content: ' ';
        position: absolute;
        width: 80px;
        height: 20px;
        background: $theme-color;
        left: 110px;
        top: -10px;
    }
    .top-border {
        content: ' ';
        position: absolute;
        width: 80px;
        height: 1px;
        background: $bc-color;
        left: 124px;
        top: 10px;
    }
    .top-before {
        content: ' ';
        position: absolute;
        width: 1px;
        height: 14px;
        background: $bc-color;
        left: 120px;
        top: -2px;
        transform: rotate(-40deg);
    }
    .top-before2 {
        content: ' ';
        position: absolute;
        width: 1px;
        height: 14px;
        background: $bc-color;
        left: 185px;
        top: -13px;
        transform: rotate(-40deg);
    }
    .top-before3 {
        content: '';
        position: absolute;
        top: -6px; 
        left: 122px;
        width: 60px;
        height: 10px;
        background: $bc-color;
        transform: skewX(40deg);
        z-index: 1;
    }
    .after1 {
        content: ' ';
        border: solid transparent;
        position: absolute;
        border-width: 5px;
        border-top-color: $bc-color;
        border-right-color: $bc-color;
        right: 0px;
        top: 0px;
    }
    .before1 {
        content: ' ';
        border: solid transparent;
        position: absolute;
        border-width: 5px;
        border-top-color: $theme-color;
        border-right-color: $theme-color;
        top: -1px;
        right: -1px;
    }
    .after2 {
        content: ' ';
        border: solid transparent;
        position: absolute;
        border-width: 5px;
        border-top-color: $bc-color;
        border-left-color: $bc-color;
        left: 0px;
        top: 0px;
    }
    .before2 {
        content: ' ';
        border: solid transparent;
        position: absolute;
        border-width: 5px;
        border-top-color: $theme-color;
        border-left-color: $theme-color;
        top: -1px;
        left: -1px;
    }
    .after3 {
        content: ' ';
        border: solid transparent;
        position: absolute;
        border-width: 5px;
        border-bottom-color: $bc-color;
        border-left-color: $bc-color;
        left: 0px;
        bottom: 0px;
    }
    .before3 {
        content: ' ';
        border: solid transparent;
        position: absolute;
        border-width: 5px;
        border-bottom-color: $theme-color;
        border-left-color: $theme-color;
        bottom: -1px;
        left: -1px;
    }
    .after4 {
        content: ' ';
        border: solid transparent;
        position: absolute;
        border-width: 5px;
        border-bottom-color: $bc-color;
        border-right-color: $bc-color;
        right: 0px;
        bottom: 0px;
    }
    .before4 {
        content: ' ';
        border: solid transparent;
        position: absolute;
        border-width: 5px;
        border-bottom-color: $theme-color;
        border-right-color: $theme-color;
        bottom: -1px;
        right: -1px;
    }
    .upper-half {
        flex-wrap: wrap;
        display: flex;
        box-shadow: 0px 0px 15px #2c808d inset;
        position: relative;
        border: 1px solid $bc-color;
        height: 238px;
        margin: 20px;
        padding: 10px;
        &:after {
            content: ' ';
            position: absolute;
            width: 1px;
            height: 15px;
            background: $bc-color;
            left: 3px;
            top: -2px;
            transform: rotate(40deg);
        }
        &:before {
            content: ' ';
            border: solid transparent;
            position: absolute;
            border-width: 5px;
            border-top-color: $theme-color;
            border-left-color: $theme-color;
            top: -1px;
            left: -1px;
        }
        .upper-item {
            height: 40%;
            width: 40%;
            padding: 10px;
            .content-text {
                color: $white-color;
            }
            .content-number {
                color: $bc-color;
                font-family: "led regular";
                font-size: 3vw;
            }
        }
    }
    .second-half {
        box-shadow: 0px 0px 15px #2c808d inset;
        position: relative;
        border: 1px solid $bc-color;
        height: 238px;
        margin: 20px;
        padding: 10px;
        &:after {
            content: ' ';
            position: absolute;
            width: 1px;
            height: 15px;
            background: $bc-color;
            left: 3px;
            top: -2px;
            transform: rotate(40deg);
        }
        &:before {
            content: ' ';
            border: solid transparent;
            position: absolute;
            border-width: 5px;
            border-top-color: $theme-color;
            border-left-color: $theme-color;
            top: -1px;
            left: -1px;
        }
    }
    .content-text {
        color: $white-color;
    }
    .content-number {
        color: $bc-color;
        font-family: "led regular";
        font-size: 3vw;
    }
}
.list-box {
    height: 565px;
    flex: 1;
    position: relative;
    padding: 10px;
    padding-right: 0;
    margin-right: 20px;
    border: 1px solid $bc-color;
    .list-item-title {
        color: $white-color;
    }
    .list-item-box {
        align-content: flex-start;
        flex-wrap: wrap;
        display: flex;
        height: 93%;
        overflow-y: auto;
        scrollbar-width: none; // 隐藏滚动条火狐
        &::-webkit-scrollbar {// 隐藏滚动条谷歌
          display: none;
        }
        .item-box {
            height: 100px;
            border-bottom: 1px solid #017480;
            width: 50%;
            display: flex;
            margin-top: 10px;
            .img-box {
                width: 70px;
                height: 85%;
                border: 4px solid #05354f;
                margin-right: 10px; 
            }
            .information {
                flex: 1;
                padding-top: 20px;
            }
            .information-text {
                color: $bc-color;
                margin-right: 10px;
                font-size: 0.8vw;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }
    .top-after {
        content: ' ';
        position: absolute;
        width: 80px;
        height: 20px;
        background: $theme-color;
        left: 110px;
        top: -10px;
    }
    .top-border {
        content: ' ';
        position: absolute;
        width: 80px;
        height: 1px;
        background: $bc-color;
        left: 124px;
        top: 10px;
    }
    .top-before {
        content: ' ';
        position: absolute;
        width: 1px;
        height: 14px;
        background: $bc-color;
        left: 120px;
        top: -2px;
        transform: rotate(-40deg);
    }
    .top-before2 {
        content: ' ';
        position: absolute;
        width: 1px;
        height: 14px;
        background: $bc-color;
        left: 185px;
        top: -13px;
        transform: rotate(-40deg);
    }
    .top-before3 {
        content: '';
        position: absolute;
        top: -6px; 
        left: 122px;
        width: 60px;
        height: 10px;
        background: $bc-color;
        transform: skewX(40deg);
        z-index: 1;
    }
    .after1 {
        content: ' ';
        border: solid transparent;
        position: absolute;
        border-width: 5px;
        border-top-color: $bc-color;
        border-right-color: $bc-color;
        right: 0px;
        top: 0px;
    }
    .before1 {
        content: ' ';
        border: solid transparent;
        position: absolute;
        border-width: 5px;
        border-top-color: $theme-color;
        border-right-color: $theme-color;
        top: -1px;
        right: -1px;
    }
    .after2 {
        content: ' ';
        border: solid transparent;
        position: absolute;
        border-width: 5px;
        border-top-color: $bc-color;
        border-left-color: $bc-color;
        left: 0px;
        top: 0px;
    }
    .before2 {
        content: ' ';
        border: solid transparent;
        position: absolute;
        border-width: 5px;
        border-top-color: $theme-color;
        border-left-color: $theme-color;
        top: -1px;
        left: -1px;
    }
    .after3 {
        content: ' ';
        border: solid transparent;
        position: absolute;
        border-width: 5px;
        border-bottom-color: $bc-color;
        border-left-color: $bc-color;
        left: 0px;
        bottom: 0px;
    }
    .before3 {
        content: ' ';
        border: solid transparent;
        position: absolute;
        border-width: 5px;
        border-bottom-color: $theme-color;
        border-left-color: $theme-color;
        bottom: -1px;
        left: -1px;
    }
    .after4 {
        content: ' ';
        border: solid transparent;
        position: absolute;
        border-width: 5px;
        border-bottom-color: $bc-color;
        border-right-color: $bc-color;
        right: 0px;
        bottom: 0px;
    }
    .before4 {
        content: ' ';
        border: solid transparent;
        position: absolute;
        border-width: 5px;
        border-bottom-color: $theme-color;
        border-right-color: $theme-color;
        bottom: -1px;
        right: -1px;
    }
}

.cover {
  object-fit: cover;
}

// 搜索提示项盒子
.searchItem-box {
  border: 1px solid $bc-color;
  border-bottom: 0;
  background: $theme-color;
  color: $white-color;
  margin-top: -10px;
  position: relative;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  z-index: 9999;
}
// 搜索提示项
.searchItem {
  height: 40px;
  line-height: 40px;
  padding-left: 30px;
  border-bottom: 1px solid $bc-color;
  &:hover {
    box-shadow: 0px 0px 15px #2c808d inset;
    cursor: pointer;
  }
}
</style>