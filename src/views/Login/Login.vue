<template>
  <div class='loginBox'>
    <div style='width:100%;margin-bottom:20px;'>
      <div class='loginTitle'><i class='el-icon-user-solid'></i>前端学习平台</div>
    </div>
    <el-form style='width:100%;' :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
      <el-form-item prop="username">
        <el-input type="text" v-model="ruleForm.username" placeholder="请输入账户" @keyup.enter.native="submitForm('ruleForm')"></el-input>
      </el-form-item>
      <el-form-item class='password-box' prop="password">
        <el-input type="password" show-password v-model="ruleForm.password" placeholder="请输入密码" @keyup.enter.native="submitForm('ruleForm')"></el-input>
      </el-form-item>
      <el-form-item class='register-box'>
        <div style='float:left;'>
          <el-checkbox :checked="checked" @change='changePassword'>记住密码</el-checkbox>
        </div>
        <div style='float:right;cursor:pointer;color:#3366cc' @click='register'>注册新账户</div>
      </el-form-item>
      <el-form-item>
        <el-button class='mybtn' type="primary" @click="submitForm('ruleForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { setStore, getStore } from '@/utils/storage.js'
import { getApi } from '@/api/api.js'

export default {
    data() {
        return {
          ruleForm: {
            username: '',
            password: '',
          },
          rules: {
            username: [{ required: true, message: '请输入账户', trigger: 'blur'  }],
            password: [{ required: true, message: '请输入密码', trigger: 'blur'  }],
          },
          //记住密码选项
          checked: false,
        }
    },
    created() {
      // 判断是否选择了记住密码
      if(getStore('checked') === 'true') {
         let { username, password } = getStore('userInfo')
         this.checked = true
         this.ruleForm = {
           username: username,
           password: password
         }
      }
    },
    methods: {
      // 登录
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let res = await getApi('login', { username: this.ruleForm.username, password: this.ruleForm.password })
            if(res.success) {
              this.$message.success(res.message)
              setStore('checked', this.checked)
              setStore('userInfo', this.ruleForm)
              setStore('token', res.token)
              //跳转到首页
              this.$router.push('/')
            }else {
              this.$message.error(res.message)
            }
          } else {
            this.$message.error('请填写完整的账户或密码!')
            return false
          }
        })
      },
      // 记住密码
      changePassword() {
        this.checked = !this.checked
      },
      //注册
      register(){
          this.$router.push('/register')
      },
    },
}
</script>

<style lang="scss" scoped>
.loginBox {
  width: 300px;
  position:absolute;
  left: 50%;
  margin-left: -150px;
  top: 200px;
}
.loginBox .mybtn {
  width: 100%;
}
.loginTitle {
    wdith: 100%;
    font-size: 28px;
    font-weight: bold;
    text-align: center;
}
/deep/.el-button {
    background-color: #0D2743;
    border-color: #0D2743;
}
/deep/.register-box {
    margin-bottom: 10px;
}
/deep/.password-box {
    margin-bottom: 10px;
}
</style>
