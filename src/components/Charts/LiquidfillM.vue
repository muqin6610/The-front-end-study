<template>
    <div>
        <div id="liquidFillM" :style="{width: '100%', height: '120px'}"></div>
    </div>
</template>

<script>

export default {
    props: {
        liquidfillMData: {
            percent: {
                type: Number,
                default: 0,
            }
        }
    },
    data() {
        return {

        }
    },
    watch:{
      liquidfillMData:{
        handler: function (newval, oldVal) {
            this.init()
        },
        deep: true
      }
    },
    created() {
    
    },
    mounted() {
       this.init()
    },
    methods: {
        init (){
           let liquidM = this.$echarts.init(document.getElementById('liquidFillM'));
           liquidM.setOption({
                series: [{
                    type: 'liquidFill',// 类型
                    data: [this.liquidfillMData.percent, this.liquidfillMData.percent],// 数据是个数组 数组的每一项的值是0-1
                    outline: {
                        show: true , // 是否显示轮廓 布尔值
                        borderDistance: 3, // 外部轮廓与图表的距离 数字
                        itemStyle:{
                            borderColor: '#ff5645', // 边框的颜色
                            borderWidth: 1,  // 边框的宽度
                            //shadowBlur: 5 , // 外部轮廓的阴影范围 一旦设置了内外都有阴影
                            //shadowColor: '#000' // 外部轮廓的阴影颜色 
                        }
                    },
                    // 水球图显示的文本
                    label: {
                      normal: {
                        formatter: function(param) {
                            let value = ''
                            if(parseFloat((param.value * 100)) == parseInt((param.value * 100))) {
                                value = (param.value * 100).toFixed(0) + '%'
                            }else {
                                value = (param.value * 100).toFixed(5) + '%'
                            }
                            return value
                        },
                        // 字体大小
                        fontSize: 30,
                        // 字体风格
                        fontWeight: '200',
                        // 字体颜色
                        color: '#000',
                        insideColor: '#fff'
                      },
                    },
                    backgroundStyle: {
                        color: '#fff',// 图表的背景颜色
                        //borderWidth: '10',// 图表的边框宽度
                        //borderColor: '#000',// 图表的边框颜色
                        itemStyle: {
                            shadowBlur:100,// 设置无用
                            shadowColor: '#fff',// 设置无用
                            opacity: 1 // 设置无用
                        }    
                    },
                    itemStyle: {
                        opacity:1,// 波浪的透明度
                        // shadowBlur: 10,// 波浪的阴影范围
                        shadowColor:'#fff'// 阴影颜色
                    },
                    emphasis:{
                        itemStyle: {
                            opacity :1 // 鼠标经过波浪颜色的透明度
                        }
                    },
                    color: ['#ff5645'],// 水波的颜色 对应的是data里面值
                    shape: 'circle',// 水填充图的形状 circle默认圆形  rect圆角矩形  triangle三角形  diamond菱形  pin水滴状 arrow箭头状  还可以是svg的path
                    center: ['50%','50%'],// 图表相对于盒子的位置 第一个是水平的位置 第二个是垂直的值 默认是[50%,50%]是在水平和垂直方向居中 可以设置百分比 也可以设置具体值
                    radius: '90%', // 图表的大小 值是圆的直径 可以是百分比 也可以是具体值 100%则占满整个盒子 默认是40%; 百分比下是根据宽高最小的一个为参照依据
                    amplitude:3,   // 振幅 是波浪的震荡幅度 可以取具体的值 也可以是百分比 百分比下是按图标的直径来算
                    waveLength:'50%',// 波的长度 可以是百分比也可以是具体的像素值  百分比下是相对于直径的 取得越大波浪的起伏越小
                    phase:0 ,// 波的相位弧度 默认情况下是自动
                    period: (value,index)=>{// 控制波的移动速度 可以是函数 也可以是数字 两个参数  value 是data数据里面的值 index 是data值的索引

                        return index*2000;
                    },
                    direction: 'left',// 波移动的速度 两个参数  left 从右往左 right 从左往右
                    waveAnimation: true, // 控制波动画的开关  值是布尔值 false 是关闭动画 true 是开启动画 也是默认值
                    animationEasing: 'linear',// 初始动画
                    animationEasingUpdate: 'quarticInOut',// 数据更新的动画效果
                    animationDuration: 3000, // 初始动画的时长，支持回调函数，可以通过每个数据返回不同的 delay 时间实现更绚丽的初始动画效果
                    animationDurationUpdate : 300 // 数据更新动画的时长

                }],
                // backgroundColor: 'rgba(255,0,0,0.1)' // 容器背景颜色
           })
           liquidM.resize()
           window.addEventListener("resize", () => { 
               if(this.$route.path === '/home/smartCampus/waterPoloDemo' || this.$route.path === '/home/smartCampus/waterPoloDemoM') {
                 liquidM.resize()
               } 
            })
       }
    },
}
</script>

<style lang="scss" scoped>
  
</style>