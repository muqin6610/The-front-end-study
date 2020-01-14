<template>
  <div>
    <div id="histogram" :style="{width: '100%', height: '550px'}"></div>
  </div>
</template>

<script>
export default {
    props: {
        histogramData: {
            dateArr: {
                type: Array,
                default: []
            },
            numArr: {
                type: Array,
                default: []
            }
        }
    },
    data() {
        return {
        }
    },
    watch:{
      histogramData:{
        handler: function (newval, oldVal) {
            this.init()
        },
        deep: true
      }
    },
    created() {
    
    },
    mounted() {// 在这个生命周期中初始化
       this.init(); 
    },
    methods: {
        init (){// 方法
           // 实例化echarts对象
           let histogram = this.$echarts.init(document.getElementById('histogram'))
           // 绘制条形图
           histogram.setOption({
               legend: {
                   data: ['人数'],
                   top: 30
               },
               // X轴
               xAxis: {
                 // x轴底部横线
                 axisLine: {show:false},
                 data: this.histogramData.dateArr,
                 axisLabel: {
                      color: '#282c34',
                      fontSize: 20,
                  },
               },
               // Y轴
               yAxis: {
                 type : 'value',
                 // y轴竖线
                 axisLine: {show:false},
　　　　　        // 下面的就很简单了，最小是多少，最大是多少，默认一次增加多少
                  min: 0,
                  minInterval: 1, // y轴最小间隔数
                  //interval: 50, // y轴显示间隔数
　　　　　         // 下面是显示格式化，一般来说还是用的上的
                  axisLabel: {
                      formatter: '{value} 人',
                      color: '#282c34',
                      fontSize: 20,
                  },
               },
               // 数据
               series: [
                   {
                     type: 'bar',
                     itemStyle: {
                         normal: {
　　　　　　　　     　　　　　// 柱子颜色
                             color: '#657eff',
　　　　　　　　     　　　　　// 以下为是否显示文本，显示位置和显示格式的设置了
                             label: {
                                 show: true,
                                 position: 'top',
                                 formatter: '{c}人',
                                 color: '#282c34',
                                 fontSize: 20,
                             }
                         }
                     },
                     // 设置柱的宽度，要是数据太少，柱子太宽不美观~
　　　　　　　　　　   barWidth: 50,
                     data: this.histogramData.numArr
                   },
               ]
           });
           window.addEventListener("resize", () => { histogram.resize(); })
       }
    },
}
</script>

<style lang="scss" scoped>
</style>