<template>
  <div>
    <ve-waterfall :data="chartData" :colors="colors"></ve-waterfall>
  </div>
</template>

<script>
export default {
    data() {
        this.colors = ['#3bb3ff']
        return {
          chartData: {
            columns: ['类型', '书籍量'],
            rows: [
              { '类型': '前端入门', '书籍量': 35 },
              { '类型': '前端进阶', '书籍量': 65 },
              { '类型': '前端深入', '书籍量': 15 },
              { '类型': '面试之道', '书籍量': 105 },
              { '类型': '前端的学习之路', '书籍量': 63 },
              { '类型': '生活分享', '书籍量': 47 },
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