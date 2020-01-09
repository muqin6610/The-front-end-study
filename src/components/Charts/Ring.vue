<template>
  <div>
    <div id="ring" :style="{width: '100%', height: '450px'}"></div>
  </div>
</template>

<script>
export default {
  props: {
    ringData: {
      dataArr: {
        type: Array,
        default: []
      }
    }
  },
  data() {
    return {};
  },
  created() {},
  mounted() {
    // 在这个生命周期中初始化
    this.init();
  },
  methods: {
    init() {// 方法
      let that = this
      // 实例化echarts对象
      let ring = this.$echarts.init(document.getElementById("ring"));
      // 绘制图表
      ring.setOption({
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
            fontSize: "16", // 字体大小
            color: "#1e1e1e" // 字体颜色
          },
          icon: 'pin',
          // 提示文本格式化设置
          formatter: function(name) {
              let data = that.ringData.dataArr
              let total = 0;
              let tarValue;
              for (let i = 0, l = data.length; i < l; i++) {
                  total += data[i].value;
                  if (data[i].name == name) {
                      tarValue = data[i].value;
                  }
              }
              let p = (tarValue / total * 100).toFixed(2);
              return name + ' ' + ' ' + p + '%';
          },
        },
        series: [
          {
            type: "pie", // 图表类型
            radius: ["40%", "55%"], // 环装图内外圈大小
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            // 环装图数据
            data: this.ringData.dataArr,
          }
        ]
      });
      window.addEventListener("resize", () => { ring.resize(); })
    }
  }
};
</script>

<style lang="scss" scoped>
</style>