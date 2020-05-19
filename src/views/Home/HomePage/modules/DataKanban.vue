<template>
  <div class="kanban">
    <div id='getSocket' @click='clickSocket' style="color: #FFF">点击预警</div>
    <!--顶部预警-->
    <div v-if="showTips" class="warning-box">
        {{warningTips}}
    </div>
    <!--顶部-->
    <div class="top-bar">
        <div class="top-item left-box">
            <div class="let-item">
                <div class="divider left-border"></div>
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
            <div class="card-box">
                <div class="icon-box">
                    <i class='iconfont icon-tianjiayonghu'></i>
                </div>
                <div class="content-box">
                    <span class="content-text">总注册人数</span>
                    <div class="content-number">{{total}}<span class="end-text">人</span></div>
                </div>
            </div>
            <div class="card-box">
                <div class="icon-box">
                    <i class='iconfont icon-yujing'></i>
                </div>
                <div class="content-box">
                    <span class="content-text">体温异常预警次数</span>
                    <div class="content-number">{{warning}}<span class="end-text">次</span></div>
                </div>
            </div>
            <div class="card-box">
                <div class="icon-box">
                    <i class='iconfont icon-shuju'></i>
                </div>
                <div class="content-box">
                    <span class="content-text">已测体温数据</span>
                    <div class="content-number">{{tested}}<span class="end-text">人</span></div>
                </div>
            </div>
        </div>
        <div class="list-box">
            <div class="list-item recording-box">
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
                <p class="list-item-title">测温记录</p>
                <div class="scroll-box">
                    <div class="conter-content" v-for="item in allList" :key="item.id">
                        <div class="item-box">
                            <div class="img-box">
                                <img style="width: 100%;height: 100%;" class="cover" :onerror='defaultImg' :src="item.idImg">
                            </div>
                            <div class="information">
                                <div>
                                    <span class="information-text">姓名:</span>
                                    <span class="information-text">{{item.name}}</span>
                                </div>
                                <div>
                                    <span class="information-text">温度:</span>
                                    <span :class="item.tempStatus === 0 ? 'information-text' : 'abnormal-text'">{{item.mappingTemp}}</span>
                                </div>
                                <div>
                                    <span class="information-text">时间:</span>
                                    <span class="information-text">{{item.passTs}}</span>
                                </div>
                                <div>
                                    <span class="information-text">来源:</span>
                                    <span class="information-text">{{item.areaName}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="information-border"></div>
                    </div>
                </div>
            </div>
            <div class="list-item abnormal-box">
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
                <p class="list-item-title">异常体温数据</p>
                <div class="scroll-box">
                    <div class="conter-content" v-for="item in abnormalList" :key="item.id">
                        <div class="item-box">
                            <div class="img-box">
                                <img style="width: 100%;height: 100%;" class="cover" :onerror='defaultImg' :src="item.idImg">
                            </div>
                            <div class="information">
                                <div>
                                    <span class="information-text">姓名:</span>
                                    <span class="information-text">{{item.name}}</span>
                                </div>
                                <div>
                                    <span class="information-text">温度:</span>
                                    <span class="abnormal-text">{{item.mappingTemp}}</span>
                                </div>
                                <div>
                                    <span class="information-text">时间:</span>
                                    <span class="information-text">{{item.passTs}}</span>
                                </div>
                                <div>
                                    <span class="information-text">来源:</span>
                                    <span class="information-text">{{item.areaName}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="information-border"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { getApi } from '@/api/api.js'
// import { connectSocket } from '@/api/socket'

  export default {
    data() {
        return {
            warningTips: "出现体温异常人员",
            showTips: false,
            title: "教育局管理平台",
            total: 0,
            warning: 0,
            tested: 0,
            tempDisplayType: "0",
            allList: [],
            abnormalList: [],
            defaultImg: 'this.src="' + require('../../../../assets/image/avatarImg.jpg') +'"',
        }
    },
    created() {
        // let token = store.getters.token
        // let url = window._CONFIG['socketURL'] + token
        // 建立websocket连接
        // connectSocket(url)

        this.getDisplayBoardLeft()
        this.getDisplayBoardRight()
    },
    methods: {
        goPush() { this.$router.go(-1) },
        clickSocket() {
            this.showTips = true
            setTimeout(() => {
                this.showTips = false
            }, 4000)
        },
        // 获取统计数据
        async getDisplayBoardLeft() {
            let res = await getApi('getDisplayBoardLeft', null)
            if(res.success) {
                let { enrollment, abnormalCount, todayLockageNumber } = res.result
                this.total = enrollment
                this.warning = abnormalCount
                this.tested = todayLockageNumber
            }
        },
        // 获取列表数据
        async getDisplayBoardRight() {
            let res = await getApi('getDisplayBoardRight', { tempDisplayType: this.tempDisplayType })
            if(res.success) {
                let { allList, abnormalList } = res.result
                this.allList = allList
                this.abnormalList = abnormalList
            }
        }
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

.kanban {
    background: $theme-color;
    border-radius: 5px;
    height: 750px;
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
    text-align: center;
    line-height: $cn-heght;
    color: $bc-color;
    font-size: 24px;
    box-shadow: 0px 0px 10px #2e606e inset;
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
    margin: 27px auto;
    position: relative;
    &:before {
        content:""; 
        position: absolute; 
        right: -1px; 
        top: -1px; 
        width: 16px;  
        height: 8px; 
        background-color: $theme-color;
    }
}
.right-border {
    margin: 48px auto;
    position: relative;
    &:before {
        content:""; 
        position: absolute; 
        left: -1px; 
        top: -1px; 
        width: 15px;  
        height: 8px; 
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
        height: 8px; 
        background-color: $theme-color;
    }
}
.right-border-two {
    margin: 66px auto;
    position: relative;
    &:before {
        content:""; 
        position: absolute; 
        left: -1px; 
        top: -1px; 
        width: 16px;  
        height: 8px; 
        background-color: $theme-color;
    }
}
.quadrilateral {
    border: 2px solid $bc-color;
    height: 20px;
    margin-top: 26px;
    position: relative;
    border-left: 0;
    border-right: 0;
    &:before {
        content:""; 
        position: absolute; 
        left: 0; 
        top: -2px; 
        width: 20px;  
        height: 8px; 
        background-color: $theme-color;
    }
    &:after {
        content:""; 
        position: absolute; 
        right: 0; 
        bottom: -2px; 
        width: 50px;  
        height: 8px; 
        background-color: $theme-color;
    }
}

.quadrilateral-two {
    border: 2px solid $bc-color;
    height: 20px;
    margin-top: 45px;
    position: relative;
    border-left: 0;
    border-right: 0;
    &:before {
        content:""; 
        position: absolute; 
        left: 0; 
        top: -2px; 
        width: 20px;  
        height: 8px; 
        background-color: $theme-color;
    }
}

.squares-itme {
    position: relative;
}
.squares-one {
    height: 12px;
    width: 40px;
    position: relative;
    position: absolute;
    right: 1px;
    top: 28px;
    &:before{
        content: '';
        position: absolute;
        top: 0; 
        right: 0; 
        bottom: 0; 
        left: 0;
        background: #01d9dc;
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
    top: 55px;
    &:before{
        content: '';
        position: absolute;
        top: 0; 
        right: 0; 
        bottom: 0; 
        left: 0;
        background: #01d9dc;
        transform: skewX(40deg);
        z-index: 1;
    }
}
.left-line {
    height: 24px;
    width: 2px;
    background: $bc-color;
    transform: rotate(-40deg);
    position: absolute;
    left: -8px;
    top: -1px;
}
.right-line {
    height: 27px;
    width: 2px;
    background: $bc-color;
    transform: rotate(-40deg);
    position: absolute;
    right: -9px;
    top: -3px;
}
.left-line-two {
    height: 25px;
    width: 2px;
    background: $bc-color;
    transform: rotate(-40deg);
    position: absolute;
    left: -8px;
    top: -1px;
}
.right-line-two {
    height: 25px;
    width: 2px;
    background: $bc-color;
    transform: rotate(-40deg);
    position: absolute;
    right: -9px;
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
    box-shadow: 0px 0px 10px #2e606e inset;
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
        background: #01d9dc;
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
    .card-box {
        height: 122px;
        margin: 20px 20px 35px 20px;
        display: flex;
        .icon-box {
            width: 80px;
            height: 100%;
            text-align: center;
            line-height: 122px;
            background: #032639;
            .iconfont {
              color: $bc-color;
              font-size: 45px;
            }
        }
        .content-box {
            flex: 1;
            margin-left: 10px;
            .content-text {
                color: #fff;
            }
            .content-number {
                position: relative;
                border: 1px solid $bc-color;
                height: 80px;
                margin-top: 20px;
                text-align: center;
                line-height: 80px;
                color: $bc-color;
                font-family: "led regular";
                font-size: 3.5vw;
                box-shadow: 0px 0px 10px #2c808d inset;
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
                .end-text {
                    font-size: 1.5vw;
                }
            }
        }
    }
}
.list-box {
    height: 470px;
    flex: 1;
    display: flex;
    .list-item {
        width: 50%;
    }
    .recording-box {
        position: relative;
        height: 100%;
        padding: 10px;
        padding-right: 0;
        margin-right: 20px;
        border: 1px solid $bc-color;
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
            background: #01d9dc;
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
        .scroll-box {
            height: 90%;
            overflow-y: auto;
            scrollbar-width: none; // 隐藏滚动条火狐
            &::-webkit-scrollbar {// 隐藏滚动条谷歌
              display: none;
            }
        }
        .list-item-title {
            color: #fff;
        }
    }
    .abnormal-box {
        position: relative;
        height: 100%;
        padding: 10px;
        border: 1px solid $bc-color;
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
            background: #01d9dc;
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
        .scroll-box {
            height: 93%;
            overflow-y: auto;
            scrollbar-width: none; // 隐藏滚动条火狐
            &::-webkit-scrollbar {// 隐藏滚动条谷歌
              display: none;
            }
        }
        .list-item-title {
            color: #fff;
        }
    }
}

.conter-content {
    position: relative;
    height: 100px;
    margin: 0;
    margin-bottom: 25px;
    .information-border {
        border-bottom: 2px solid #014858;
        margin: 18px 0 0 30px;
    }
    .item-box {
        height: 90px;
        display: flex;
        .img-box {
            width: 70px;
            height: 100%;
            border: 4px solid #05354f;
            margin-right: 10px;
        }
        .information {
            flex: 1;
            .information-text {
                color: $bc-color;
                margin-right: 10px;
                font-size: 0.8vw;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .abnormal-text {
                color: red;
                margin-right: 10px;
                font-size: 0.8vw;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }   
}

.warning-box {
   position: absolute;
   width: 250px;
   height: 50px;
   left: 0; 
   top: 70px; 
   right: 0; 
   margin: auto;
   z-index: 1000; 
   background: rgba(251, 2, 2, 1);
   color: rgba(254, 254, 254, 1);
   animation: glow 700ms ease-out infinite alternate;
   text-align: center;
   line-height: 50px;
   font-size: 20px;
}
@keyframes glow {
    0% {
        background: rgba(251, 2, 2, 1);
        color: rgba(254, 254, 254, 1);
    }
    15% {
        background: rgba(252, 32, 32, 0.9);
        color: rgba(254, 254, 254, 0.9);
    }
    30% {
        background: rgba(252, 59, 59, 0.8);
        color: rgba(254, 254, 254, 0.8);
    }
    45% {
        background: rgba(252, 93, 93, 0.7);
        color: rgba(254, 254, 254, 0.7);
    }
    60% {
        background: rgba(251, 129, 129, 0.6);
        color: rgba(254, 254, 254, 0.6);
    }
    75% {
        background: rgba(251, 164, 164, 0.5);
        color: rgba(254, 254, 254, 0.5);
    }
    90% {
        background: rgba(249, 201, 201, 0.4);
        color: rgba(254, 254, 254, 0.4);
    }
    100% {
        background: rgba(249, 201, 201, 0);
        color: rgba(254, 254, 254, 0);
    }
}

.cover {
  object-fit: cover;
}
</style>