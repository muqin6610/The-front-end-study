<template>
  <div>
    <ve-ring :data="chartData" :colors="colors"></ve-ring>
  </div>
</template>

<script>
export default {
    data() {
        this.colors = ['#36a3f7', '#d53a35', '#334b5c', '#6ab0b8', '#e98f6f', '#9fdabf']
        return {
          chartData: {
            columns: ['偏好', '人数'],
            rows: [
              { '偏好': '前端入门', '人数': 1393 },
              { '偏好': '前端进阶', '人数': 3530 },
              { '偏好': '前端深入', '人数': 2923 },
              { '偏好': '面试之道', '人数': 1723 },
              { '偏好': '视频专区', '人数': 3792 },
              { '偏好': '热门推荐', '人数': 4593 }
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