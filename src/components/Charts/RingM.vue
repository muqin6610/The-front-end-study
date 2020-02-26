<template>
  <div>
    <div id="ringM" :style="{width: '100%', height: '300px'}"></div>
  </div>
</template>

<script>
export default {
  props: {
    ringMData: {
      dataArr: {
        type: Array,
        default: []
      }
    }
  },
  data() {
    return {};
  },
  watch:{
    ringMData:{
      handler: function (newval, oldVal) {
          this.init()
      },
      deep: true
    }
  },
  created() {},
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let that = this
      let ringM = this.$echarts.init(document.getElementById("ringM"));
      // 绘制图表
      ringM.setOption({
        color: ["#5393ff", "#fede00", "#fe4646"], //配置颜色
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c} ({d}%)"
        },
        // 提示文本
        legend: {
          // 提示文本排列方式
          orient: "vertical", // 垂直排列
          x: "center", // x轴显示位置
          y: 'bottom', // y轴显示位置
          // 提示文本样式
          textStyle: {
            fontSize: "12", // 字体大小
            color: "#1e1e1e" // 字体颜色
          },
          icon: 'pin',
          // 提示文本格式化设置
          formatter: function(name) {
              let data = that.ringMData.dataArr
              let total = 0
              let tarValue
              for (let i = 0, l = data.length; i < l; i++) {
                  total += data[i].value
                  if (data[i].name == name) {
                      tarValue = data[i].value
                  }
              }
              let p
              if(tarValue != 0) {
                p = (tarValue / total * 100).toFixed(2)
              }else {
                p = 0
              }
              return name + ' ' + ' ' + p + '%'
          },
        },
        series: [
          {
            type: "pie", // 图表类型
            radius: ["30%", "45%"], // 环装图内外圈大小
            avoidLabelOverlap: false, // 是否启用防止标签重叠策略，环状图需要设置为false
            startAngle: 150, // 起始角度
            // 环状图文本
            label: {
              normal: {
                show: false,
                position: "center"
              },
            },
            // 环装图数据
            data: this.ringMData.dataArr,
          }
        ]
      });
      ringM.resize()
      window.addEventListener("resize", () => { 
         if(this.$route.path === '/home/smartCampus/waterPoloDemo' || this.$route.path === '/home/smartCampus/waterPoloDemoM') {
           ringM.resize()
         } 
      })
    }
  }
};
</script>

<style lang="scss" scoped>
</style>