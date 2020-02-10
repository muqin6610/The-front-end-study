<template>
  <div>
    <el-card class='mycard'>
      <span class='my-title'>{{ title }}</span>
      <el-divider></el-divider>
      <el-table
      :data="plateData"
      style="width: 100%;margin-top:20px;"
      :show-header="false"
      >
        <el-table-column>
          <template slot-scope='scope'>
            <span v-if='title === "留言区"'>
              留言内容&nbsp;:&nbsp;&nbsp;{{ scope.row.content }}
              &nbsp;·&nbsp;<span style='color:#8a9aa9'>{{ scope.row.date }}</span>
            </span>
            <span v-else-if='title === "反馈区"'>
              反馈内容&nbsp;:&nbsp;&nbsp;{{ scope.row.content }}
              &nbsp;·&nbsp;<span style='color:#8a9aa9'>{{ scope.row.date }}</span>
            </span>
            <span v-else-if='title === "点赞区"'>
              <span>{{ scope.row.content }}</span>
            </span>
            <span v-else='title === "收藏区"'>
              <span style='font-weight:bold'>«&nbsp;{{scope.row.content}}&nbsp;»</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          align='left'
          prop="content"
          label="内容">
          <template slot-scope='scope'>
            <span v-if='title === "留言区"'>
              <img v-lazy='scope.row.avatar' width="30px" height="30px" style='border-radius:50%'>&nbsp;&nbsp;&nbsp;&nbsp;
              <span style='font-weight:bold;'>{{ scope.row.name }}</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <span style='color:#8a9aa9;'>{{ scope.row.address }}</span>&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            <span v-else-if='title === "反馈区"'>
              <img v-lazy='scope.row.avatar' width="30px" height="30px" style='border-radius:50%'>&nbsp;&nbsp;&nbsp;&nbsp;
              <span style='font-weight:bold;'>{{ scope.row.name }}</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <span style='color:#8a9aa9;'>{{ scope.row.address }}</span>&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            <span v-else-if='title === "点赞区"'>
              <i class='el-icon-thumb'></i>&nbsp;{{scope.row.time}}次
              &nbsp;·&nbsp;<span style='color:#8a9aa9'>{{ scope.row.date }}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            <span v-else='title === "收藏区"'>
              <i class='el-icon-thumb'></i>&nbsp;{{scope.row.time}}次
              &nbsp;·&nbsp;<span style='color:#8a9aa9'>{{ scope.row.date }}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
    data() {
        return {
            // 保存模块管理页面的数据
            plateData:[],
            // 标题
            title:'',
        }
    },
    created() {
      this.getPlateData()
    },
    methods: {
        getPlateData() {
          this.plateData = JSON.parse(this.$route.query.palteData)
          this.title = this.$route.query.title
        }
    },
}
</script>

<style lang="scss" scoped>
// 卡片样式
.mycard {
  margin: 20px 10px 10px 20px;
}   
// 标题样式
.my-title {
  font-weight: bold;
  font-size: 20px;
}
</style>