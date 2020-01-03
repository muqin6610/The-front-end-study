<template>
  <div>
    <el-card class='mycard'>
      <div class='el-avatar-box'>
        <img class='el-avatar' style="width: 100px; height: 100px" v-lazy="squareUrl"></img>
      </div>
      <div class='data-box'>
        <p style='font-size:20px;font-weight:bold'>慕钦C</p>
        <p><i class='el-icon-s-custom'>&nbsp;管理员</i></p>
        <p><i class='el-icon-bank-card'>&nbsp;乐观自由,积极向上,像风一样自由</i></p>
      </div>
      <div class='edit-box'>
        <el-button type="primary" @click='editMyNes'>编辑个人资料</el-button>
      </div>
    </el-card>
    <el-card class='mycard'>
      <el-tabs class='el-tabs-box' v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="风格爱好" name="first">爱好</el-tab-pane>
        <el-tab-pane label="我的点赞" name="second">点赞</el-tab-pane>
        <el-tab-pane label="我的收藏" name="third">收藏</el-tab-pane>
        <el-tab-pane label="备忘录" name="fourth">备忘录</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
    data() {
        return {
            // 头像地址
            squareUrl: "https://user-gold-cdn.xitu.io/2019/11/5/16e39396b5133aae?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1",
            // 默认选择的tabs项
            activeName: 'first'
        }
    },
    methods: {
        // 编辑个人资料
        editMyNes() {
          this.$router.push('/home/myNes')
        },
        handleClick(tab, event) {
        console.log(tab, event);
       }
    },
}
</script>

<style lang="scss" scoped>
// 卡片样式
.mycard {
  margin: 20px 35px 0 35px;
}   
// 头像样式
.el-avatar {
  border-radius: 50%;
  margin-left: 15px;
}
// 头像区域样式
.el-avatar-box {
  float: left;
}
// 资料区域样式
.data-box {
  float: left;
  margin-left: 80px;
  margin-top: -20px;
}
// 编辑资料区域样式
.edit-box {
  float: right;
  margin-right: 20px;
}
// tabs栏样式
.el-tabs-box {
  folat:left;
  height:800px;
}
</style>