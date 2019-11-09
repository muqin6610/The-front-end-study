<template>
  <div>
    <ve-pie :data="chartData1" :colors="colors"></ve-pie>
  </div>
</template>

<script>
export default {
    data() {
        this.colors = ['#36a3f7', '#d53a35', '#334b5c', '#6ab0b8', '#e98f6f', '#9fdabf']
        return {
          chartData1: {
            columns: ['年龄段', '用户'],
            rows: [
              { '年龄段': '18岁以下', '用户': 1393 },
              { '年龄段': '18-25岁', '用户': 2015 },
              { '年龄段': '25-30岁', '用户': 2350 },
              { '年龄段': '30-40岁', '用户': 1620 },
              { '年龄段': '40-50岁', '用户': 1210 },
              { '年龄段': '50岁以上', '用户': 856 }
            ]
          }
        }
    },
    methods: {
        
    },
}
</script>

<style lang="scss" scpoed>
    
</style>