<template>
  <div>
    <el-card class='mycard'>
      <span class='title-text'>热门专区</span>
      <el-divider></el-divider>
      <div class='article-box'>
        <div calss='article-box-left'>
          <div class='article-box-left-top'>
            <span>小小飞</span>
            <span> · 4小时前</span>
          </div>
          <div class='article-box-left-center'>
            <a href='#'>React开发必须知道的34个技巧【近1W字】</a>
          </div>
          <div class='article-box-left-bottom'>
            <ul>
              <li>1</li>
              <li>2</li>
            </ul>
          </div>
        </div>
        <div class='article-box-right'>
          <img style="width: 80px; height: 80px" :src='image'>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
    data() {
        return {
            image: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        }
    },
    methods: {
        
    },
}
</script>

<style lang="scss" scoped>
.mycard {
  margin: 20px 20px 20px 20px;
} 
// 标题文本
.title-text {
  font-weight: bold;
} 
// 文章整体盒子
.article-box {
  width: 100%;
  display: flex;
}
// 文章左边盒子
.article-box-left {
  height:100%;
  width: 500px;
}
// 左边盒子顶部
.article-box-left-top {
  font-size: 14px;
  color: #b2bac2;
  margin-bottom: 5px;
}
// 左边盒子中部
.article-box-left-center a {
  font-size: 18px;
  color: #282c34;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}
// 文章右边盒子
.article-box-right {
  margin-left: 200px;
}
</style>