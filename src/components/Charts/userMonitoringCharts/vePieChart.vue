<template>
  <div>
    <ve-pie :data="chartData" :colors="colors"></ve-pie>
  </div>
</template>

<script>
import { getApi } from '@/api/api.js'

export default {
    data() {
        this.colors = ['#36a3f7', '#d53a35', '#334b5c', '#6ab0b8', '#e98f6f', '#9fdabf']
        return {
          chartData: {
            columns: ['年龄段', '用户'],
            rows: []
          }
        }
    },
    created() {
      // 获取用户年龄段监控数据
      this.getUserAge()
    },
    methods: {
      // 获取用户年龄段监控数据
      async getUserAge() {
        let res = await getApi('getUserAge', null)
        console.log(res,'用户年龄段数据')
        if(res.success) {
          this.chartData.rows = res.result
        }
      }
    },
}
</script>

<style lang="scss" scpoed>
    
</style>