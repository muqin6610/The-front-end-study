<template>
  <div>
    <div id="pie" :style="{width: '100%', height: '200px'}"></div>
  </div>
</template>

<script>

  export default {
    props: {
      pieData: {
        dataArr: {
          type: Number,
          default: [],
        }
      }
    },
    data() {
      return {
        pie: null,
      }
    },
    watch:{
      pieData:{
        handler: function (newval, oldVal) {
          this.init()
        },
        deep: true
      }
    },
    created() {

    },
    mounted() {
      setTimeout(() => {
        this.init()
      })
      window.onresize = () => {
        this.pie.resize()
      }
    },
    methods: {
      init (){
          this.pie = this.$echarts.init(document.getElementById('pie'))
          this.pie.setOption({
            color: ['#01d9dc','#ff6d01', '#ff0000'],
            // 提示文本
            legend: {
              // 提示文本排列方式
              orient: "vertical", // 垂直排列
              x: "right", // x轴显示位置
              y: 'bottom', // y轴显示位置
              // 提示文本样式
              textStyle: {
                fontSize: "12", // 字体大小
                color: "#fff" // 字体颜色
              },
              icon: "roundRect",
              // 提示文本格式化设置
              formatter: function(name) {
                  return name
              },
            },
            series: [{
              type: 'pie',
              radius : '65%',
              center: ['50%', '45%'],
              data: this.pieData.dataArr,
              label: {
                normal: {
                  formatter: '{b}{d}%',         
                  fontSize: 12,
                  padding: [0, -2],
                  fontWeight: '200',
                  color: '#FFF',
                  insideColor: '#fff',
                },
              },
              startAngle: "160",
              itemStyle: {
                  emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
              }
            }],
        })
        this.pie.resize()
        window.addEventListener("resize", () => {
          if(this.$route.path === '/home/homePage/dataKanbanTwo')  this.pie.resize()
        })
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>