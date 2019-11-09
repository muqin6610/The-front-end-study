<template>
  <div class='loginBox'>
    <div style='width:100%;margin-bottom:20px;'>
      <div class='loginTitle'><i class='el-icon-user-solid'></i>账户注册</div>
    </div>
    <el-form style='width:100%;' :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
      <el-form-item prop="username">
        <el-input type="text" v-model="ruleForm.username" placeholder="请输入账户"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" show-password v-model="ruleForm.password" placeholder="至少8位密码,区分大小写"></el-input>
      </el-form-item>
      <el-form-item prop="confirmPass">
        <el-input type="password" show-password v-model="ruleForm.confirmPass" placeholder="确认密码"></el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input type="email" v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="phone">
        <el-input v-model.number="ruleForm.phone" placeholder="请输入手机号"/>
      </el-form-item>
      <el-form-item prop="verificationCode">
       <el-input v-model="ruleForm.verificationCode" placeholder="请输入验证码" style="width: 60%"></el-input>
       <el-button icon="el-icon-mobile-phone" @click="send" style="width: 38%" type="success" :disabled="disabled=!show" >  
           <span v-show="show">获取验证码</span>
           <span v-show="!show" class="count">{{count}} s</span>
       </el-button>
      </el-form-item>
      <el-form-item>
        <el-button class='mybtn' type="primary" @click="submitForm('ruleForm')">注册</el-button>
        <span style='color:#1890ff;margin-left:40px;font-size:16px;cursor:pointer' @click='haveLogin'>使用已有账户登录</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

const TIME_COUNT = 60 //更改倒计时时间
export default {
    data() {
        var checkPhone = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('手机号不能为空'));
          } else {
            const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
            console.log(reg.test(value))
            if (reg.test(value)) {
              callback()
            } else {
              return callback(new Error('请输入正确的手机号'))
            }
          }
        }
        return {
          show: true,  // 初始启用按钮
          count: '',   // 初始化次数
          timer: null,
          // 表单数据
          ruleForm: {
            username: '',
            password: '',
            confirmPass:'',
            email:'',
            phone:'',
            verificationCode:'',
          },
          rules: {
            username: [{ required: true, message: '请输入账户', trigger: 'blur'  }],
            password: [{ required: true, message: '至少8位密码,区分大小写', trigger: 'blur'  }],
            confirmPass: [{ required: true, message: '至少8位密码,区分大小写', trigger: 'blur'  }],
            email: [{ required: true, message: '请输入邮箱', trigger: 'blur'  }],
            phone: [{ required: true, validator: checkPhone, trigger: 'blur'  }],
            verificationCode: [{ required: true, message: '请输入验证码', trigger: 'blur'  }],
          },
          //记住密码选项
          checked:false,
        }
    },
    methods: {
      // 注册
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 使用已有账户登录
      haveLogin() {
          this.$router.push('/login')
      },
      // 获取验证码
      send(){
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(this.timer);  // 清除定时器
              this.timer = null;
            }
          }, 1000)
        }
      }
    },
}
</script>

<style lang="scss" scoped>
.loginBox {
  width: 360px;
  position:absolute;
  left: 50%;
  margin-left:-180px;
  top:200px;
}
.loginBox .mybtn {
  width: 50%;
}
.loginTitle {
    wdith:100%;
    font-size:28px;
    font-weight:bold;
    text-align:center;
}
/deep/.el-button {
    background-color:#0D2743;
    border-color:#0D2743;
}
</style>