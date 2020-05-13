<template>
  <div id='printMe'>
    <el-card>
      <div class='text-icon-box'>
        <i class='iconfont icon-chenggong'></i>
        <p class='success-text'>提交成功</p>
      </div>
      <div class='content-box'>
        <div class='left-box'>
          <el-form class='el-form-left' label-width="120px">
            <el-form-item label="打款方:">
              <span class='span-text'>深圳市宝马科技股份有限公司附属分公司</span>
            </el-form-item>
            <el-form-item label="纳税人识别号:">
              <span class='span-text'>4235452125464412359X</span>
            </el-form-item>
            <el-form-item label="联系人:">
              <span class='span-text'>钦先生</span>
            </el-form-item>
            <el-form-item label="电话号码:">
              <span class='span-text'>19564646635</span>
            </el-form-item>
            <el-form-item label="电话号码:">
              <span class='span-text'>19564646635</span>
            </el-form-item>
            <el-form-item label="打款金额:">
              <span class='span-text'>38,000元</span>
            </el-form-item>
            <el-form-item label="打款项目:">
              <span class='span-text'>购买2019-11-01至2020-11-01系统服务外加升级</span>
            </el-form-item>
          </el-form>
        </div>
        <div class='center-box'>
          <i class='iconfont icon-qian'></i>
        </div>
        <div class='right-box'>
          <el-form class='el-form-right' label-width="120px">
            <el-form-item label="收款方:">
              <span class='span-text'>新疆爱华盈通信息技术有限公司</span>
            </el-form-item>
            <el-form-item label="收款账号:">
              <span>7761 2456 5125 5442 2544 1</span>
            </el-form-item>
            <el-form-item label="开户行:">
              <span class='span-text'>招商银行深圳分行华侨城支行</span>
            </el-form-item>
            <el-form-item label="商务联系电话:">
              <span class='span-text'>19928848988</span>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class='steps-text-box'>
        <div class='steps-box'>
          <el-steps :active="active" finish-status="success">
            <el-step title="创建单据"></el-step>
            <el-step title="财务审核"></el-step>
            <el-step title="开通系统服务"></el-step>
            <el-step title="完成"></el-step>
          </el-steps>
        </div>
        <div class='text-box'>
          <span class='bottom-span-text'>尊敬的用户，您的购买申请已经提交成功，爱华盈通将会在一个工作日内进行审核，感谢您的信任。</span>
        </div>
      </div>
      <div class='footer-button-box'>
        <el-button size="medium" type="primary" @click='goHomePage'>回到首页</el-button>
        <el-button size="medium">查看项目</el-button>
        <el-button size="medium" v-print="'#printMe'">打印</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
        return {
            active: 1,
        }
    },
    created() {
        this.$bus.$on("submitData", data => {
          console.log(data,'111111')
        })
    },
    methods: {
      goHomePage() {
        this.$router.push('/')
      }
    },
  }
</script>

<style lang='scss' scoped>
.icon-chenggong {
  font-size: 65px;
  color: #52c41a;
}
.text-icon-box {
  text-align: center;
}
.success-text {
  font-size: 22px;
  font-weight: bold;
}
.content-box {
  display: flex;
}
.left-box {
  width: 40%;
  margin-left: 7%;
}
.right-box {
  width: 40%;
  margin-right: 7%;
}
.center-box {
  margin: 0 auto;
  text-align: center;
  line-height: 260px;
}
/deep/ .el-form-item {
  margin-bottom: 0
}
.el-form-right {
  margin-top: 60px;
}
.icon-qian {
  font-size: 30px;
  color: #1297dd;
}
.span-text {
  color: #000000;
  font-size: 1vw;
}
.steps-text-box {
  margin: 30px auto;
  width: 45vw;
}
.el-form-left {
  float: right;
}
.steps-box {
  margin: 10px 0 30px 0;
}
.text-box {
  text-align: center;
}
.bottom-span-text {
  font-size: 0.8vw;
}
.footer-button-box {
  margin: 50px auto;
  width: 300px;
}
</style>