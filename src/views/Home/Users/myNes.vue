<template>
  <el-card class='mycard'>
    <div class='myNes-box'>
      <h1>个人资料</h1>
      <el-divider></el-divider>
      <!--头像区域-->
      <div class='demo-box'>
        <span style='line-height:80px;'>头像</span>
        <img class='el-avatar' style="width: 80px; height: 80px" v-lazy="squareUrl"></img>
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-change="handleChange"
          :on-success='uploadSuccess'
          :file-list="fileList">
          <el-button size="small" type="primary">点击我上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
      <el-divider></el-divider>
      <!--用户名区域-->
      <div class='demo-box'>
        <span>用户名</span>
        <span style='margin-left:90px'>慕钦C</span>
      </div>
      <el-divider></el-divider>
      <!--用户性质区域-->
      <div class='demo-box'>
        <span>用户性质</span>
        <span style='margin-left:75px'>管理员</span>
      </div>
      <el-divider></el-divider>
      <!--用户性别区域-->
      <div class='demo-box'>
        <span>用户性别</span>
        <span style='margin-left:75px'>男</span>
      </div>
      <el-divider></el-divider>
      <!--手机号码区域-->
      <div class='demo-box'>
        <span>手机号码</span>
        <span style='margin-left:75px'>18475435695</span>
      </div>
      <el-divider></el-divider>
      <!--个人介绍区域-->
      <div class='demo-box'>
        <span>个人介绍</span>
        <span style='margin-left:75px'>乐观自由,积极向上,像风一样自由</span>
      </div>
      <el-divider></el-divider>
    </div>
  </el-card>
</template>

<script>
export default {
    data() {
        return {
            fileList: [],
            // 头像地址
            squareUrl: "https://user-gold-cdn.xitu.io/2019/11/5/16e39396b5133aae?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1",
        }
    },
    methods: {
        handleChange(file, fileList) {
          console.log(file, fileList)
       },
       uploadSuccess(response, file, fileList) {
         console.log(response, file, fileList)
       },
    },
}
</script>

<style lang="scss" scoped>
// 卡片样式
.mycard {
  margin:30px 30px 0 30px;
}  
// 个人资料整体盒子样式
.myNes-box {
  margin:10px 10px 0 10px;
  // background-color: red;
}
// 头像样式
.el-avatar {
  margin-left:100px;
}
// 上传区域样式
.upload-demo {
  width:300px;
  margin:15px 0 0 30px;
}
// 头像区域样式
.demo-box {
  display:flex;
}
</style>