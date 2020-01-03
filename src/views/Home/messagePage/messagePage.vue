<template>
  <el-card class='mycard'>
    <!--内容-->
    <div class='el-tabs-box'>
      <el-tabs class='el-tabs' v-model="activeName" @tab-click="">
          <el-tab-pane label="用户消息" name="first">
          <el-card class='mycard'>
            <div>
              <div class='el-avatar-box'>
                 <img class='el-avatar' style="width: 60px; height: 60px" v-lazy="squareUrl"></img>
               </div>
               <div class='data-box'>
                 <div style='font-size:18px;font-weight:bold;'>真的搬了一天砖</div>
                 <span style='color:#8a9aa9'>三级用户</span><i>&nbsp;·&nbsp;&nbsp;</i><span style='color:#8a9aa9'>刚刚</span>
               </div>
            </div>
            <div class='message-box'>
              <i class='el-icon-thumb'>赞了你的留言:</i><span class='content-span'>&nbsp;我写代码要看搬运的时候有多少代码了</span>
            </div>
          </el-card>
          <el-card class='mycard'>
            <div>
              <div class='el-avatar-box'>
                 <img class='el-avatar' style="width: 60px; height: 60px" v-lazy="squareUrl1"></img>
               </div>
               <div class='data-box'>
                 <div style='font-size:18px;font-weight:bold;'>青莲剑仙</div>
                 <span style='color:#8a9aa9'>八级用户</span><i>&nbsp;·&nbsp;&nbsp;</i><span style='color:#8a9aa9'>2天前</span>
               </div>
            </div>
            <div class='message-box'>
              <i class='el-icon-thumb'>赞了你的评论:</i><span class='content-span'>&nbsp;今朝有酒今朝醉</span>
            </div>
          </el-card>
          <el-card class='mycard'>
            <div>
              <div class='el-avatar-box'>
                 <img class='el-avatar' style="width: 60px; height: 60px" v-lazy="squareUrl2"></img>
               </div>
               <div class='data-box'>
                 <div style='font-size:18px;font-weight:bold;'>十二个猴子</div>
                 <span style='color:#8a9aa9'>九级用户</span><i>&nbsp;·&nbsp;&nbsp;</i><span style='color:#8a9aa9'>4天前</span>
               </div>
            </div>
            <div class='message-box'>
              <i class='el-icon-star-on'>收藏了你的书籍:</i><span class='content-span'>&nbsp;«前端入门»</span>
            </div>
          </el-card>
          <el-card class='mycard'>
            <div>
              <div class='el-avatar-box'>
                 <img class='el-avatar' style="width: 60px; height: 60px" v-lazy="squareUrl3"></img>
               </div>
               <div class='data-box'>
                 <div style='font-size:18px;font-weight:bold;'>无大大啊</div>
                 <span style='color:#8a9aa9'>一级用户</span><i>&nbsp;·&nbsp;&nbsp;</i><span style='color:#8a9aa9'>12天前</span>
               </div>
            </div>
            <div class='message-box'>
              <i class='el-icon-view'>浏览了你的主页:</i><span class='content-span'>&nbsp;<i class='el-icon-s-home'></i></span>
            </div>
          </el-card>
          </el-tab-pane>
          <el-tab-pane label="系统消息" name="second">
          <span>无最新通知</span>
          </el-tab-pane>
      </el-tabs>
    </div>
  </el-card>
</template>

<script>
  

export default {
    data() {
        return {
            // tabs栏默认选中项
            activeName:'first',
            // 头像地址
            squareUrl: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
            squareUrl1: "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
            squareUrl2: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
            squareUrl3: "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
        }
    },
    created() {
        
    },
    methods: {
        
    },
}
</script>

<style lang="scss" scoped>
// tabs区域样式
.el-tabs-box {
    margin-top:20px;
} 
// tabs样式 
.el-tabs {
    margin-left:10px;
    text-align:center;
}  
// 卡片样式
.mycard {
  margin:20px 20px 20px 20px;
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
// 个人资料区域样式
.data-box {
  float: left;
  margin-left: 40px;
  margin-top:10px;
}
// 具体消息区域样式
.message-box {
  background-color: #f8f8f8;
  float:left;
  margin-top:35px;
  margin-left:50px;

}
// 消息文本颜色
.el-icon-thumb {
  color: #a1a9b3;
}
// 消息文本颜色
.el-icon-star-on {
  color: #a1a9b3;
}
// 消息文本颜色
.el-icon-view {
  color: #a1a9b3;
}
// 具体消息鼠标移入样式
.content-span:hover {
  color:#007fff;
  cursor:pointer;
}
</style>