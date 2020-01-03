<template>
  <el-card class='mycard'>
    <div class='frostedGlass-box'>
      <h3><<毛玻璃>></h3>
      <span>示例图</span>
      <div class="glass-wrap">
        <div class="pub-position word-wrap"></div>
        <p class="pub-position content">模糊玻璃</p>
      </div>
    </div>
    <div class='chamfer-box'>
      <h3><<切角>></h3>
      <span>示例图</span>
      <div class="chamfer chamfer-cut1">切角</div>
      <div class="chamfer chamfer-cut-all">全切角</div>
    </div>
    <div class='foldAngle-box'>
      <h3><<折角>></h3>
      <span>示例图</span>
      <div class="foldAngle">折角</div>
    </div>
    <div class='shadow-box'>
      <h3><<阴影>></h3>
      <span>示例图</span>
      <div class="shadow shadow-bottom">单边阴影</div>
      <div class="shadow shadow-slide">左右阴影</div>
      <div class="shadow shadow-right-top">右上角阴影</div>
    </div>
  </el-card>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
        
    },
}
</script>

<style lang="scss" scoped> 
.mycard {
    margin: 10px;
}

// 毛玻璃相关css
.pub-position {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin:  auto;
}
.glass-wrap {
    width: 325px;
    height: 185px;
    background: url('https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg') no-repeat;
    background-size: contain;
    position: relative;
    margin-top: 10px;
}
.word-wrap,.content {
    width: 200px;
    height: 80px;
    text-align: center;
    line-height: 80px;
    overflow: hidden;
    color: #fff;
}
  /* 这里使用同级元素解决文字容器做滤镜被覆盖的问题 */
.word-wrap::before {
    content: '';
    width: 325px;
    height: 185px;
    position: absolute;
    left: -10px; /* 这个值影响背景图片的位置 */
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    filter: blur(10px);
    background: url('https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg') no-repeat -52.5px 0;
    background-size: contain;
}

// 切角css
.chamfer {
  width: 200px;
  height: 80px;
  text-align: center;
  line-height: 80px;
  margin-top: 10px;
  color: #fff;
  margin-top: 10px;
}
/*
  知识点：
  linear-gradient 每加一个为累加一层
  
  background-size: 
  单角一层不用
  双角 50% 100%; 
  三角 50% 50%; （切角宽度 transparent 0）
  全角 50% 50%;
*/
.chamfer-cut1 {
  background: rgb(201, 125, 26); /*compatibility*/
  background: linear-gradient(-45deg, transparent 15px, rgb(201, 125, 26) 0);
}
.chamfer-cut-all {
  background: rgb(201, 125, 26); /*compatibility*/
  background:
  linear-gradient(135deg, transparent 15px, rgb(201, 125, 26) 0) top left,
  linear-gradient(225deg, transparent 15px, rgb(201, 125, 26) 0) top right,
  linear-gradient(45deg, transparent 15px, rgb(201, 125, 26) 0) bottom left,
  linear-gradient(-45deg, transparent 15px, rgb(201, 125, 26) 0) bottom right;
  /* transparent 15px 越大切角越大 */
  /* 四切角 关系为90deg */
  /* 切角读书以上下边为起点 默认90deg */
  background-size: 50% 50%; /* 类设置图片尺寸 使每一渐变层只占元素的1/2 从而不覆盖transparent的角度 */
  background-repeat: no-repeat;
}


// 折角相关css
.foldAngle {
  margin-top: 10px;
  width: 200px;
  height: 80px;
  text-align: center;
  line-height: 80px;
  color: #fff;
  background: #58a; /* 优雅降级 */
  background:
  linear-gradient(-135deg, transparent 50%, rgba(0,0,0,.4) 0) no-repeat 100% 0 / 30px 30px,
  linear-gradient(-135deg, transparent 20px, #58a 0);
}

// 阴影相关css
.shadow {
  width: 200px;
  height: 80px;
  text-align: center;
  line-height: 80px;
  background: rgb(201, 125, 26);
  margin-top: 10px;
  color: #fff
}
.shadow-bottom {
  box-shadow: 0 5px 5px rgb(124, 74, 8)
}
.shadow-slide {
  box-shadow: 5px 0 5px rgb(124, 74, 8), -5px 0 5px rgb(124, 74, 8)
}
.shadow-right-top {
  box-shadow: 0 -5px 5px rgb(124, 74, 8),5px 0 5px rgb(124, 74, 8)
}
</style>