<template>
  <div class="renewal">
    <el-card class='el-card'>
        <span class='title-text'>设备数量</span>
        <div class='radio-box'>
            <el-radio-group v-model="radio1">
              <el-radio-button label="10">小于10台</el-radio-button>
              <el-radio-button label="30">小于30台</el-radio-button>
              <el-radio-button label="100">小于100台</el-radio-button>
              <el-radio-button label="300">小于300台</el-radio-button>
              <el-radio-button label="500">小于500台</el-radio-button>
            </el-radio-group>
        </div>
    </el-card>
    <el-card class='el-card'>
        <span class='title-text'>续费金额</span>
        <div class='card-box'>
          <div class='item-card' @click='clickImte(0)'>
            <div class='icon-box'>
              <i class='el-icon-check'></i>
            </div>
            <div class='amount-box'>3800元</div>
            <div class='time-box'>一年</div>
          </div>
          <div class='item-card' @click='clickImte(1)'>
            <div class='icon-box'>
              <i class='el-icon-check'></i>
            </div>
            <div class='amount-box'>5800元</div>
            <div class='time-box'>两年</div>
          </div>
          <div class='item-card' @click='clickImte(2)'>
            <div class='icon-box'>
              <i class='el-icon-check'></i>
            </div>
            <div class='amount-box'>11000元</div>
            <div class='time-box'>三年</div>
          </div>
          <div class='item-card' @click='clickImte(3)'>
            <div class='icon-box'>
              <i class='el-icon-check'></i>
            </div>
            <div class='amount-box'>13000元</div>
            <div class='time-box'>四年</div>
          </div>
          <div class='item-card' @click='clickImte(4)'>
            <div class='icon-box'>
              <i class='el-icon-check'></i>
            </div>
            <div class='amount-box'>20000元</div>
            <div class='time-box'>大于五年</div>
          </div>
        </div>
    </el-card>
    <el-card class='el-card'>
        <span class='title-text'>发票信息</span>
        <div class='form-box'>
            <el-form size="small" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
              <el-form-item label="发票抬头" prop="pass" style="width: 450px;">
                <el-input type="text" v-model="ruleForm.pass" placeholder="请输入发票抬头"></el-input>
              </el-form-item>
              <el-form-item label="纳税人识别号" prop="checkPass" style="width: 450px;">
                <el-input type="text" v-model="ruleForm.checkPass" placeholder="请输入纳税人识别号"></el-input>
              </el-form-item>
              <el-form-item label="联系人" prop="age" style="width: 450px;">
                <el-input type="text" v-model="ruleForm.age" placeholder="请输入联系人"></el-input>
              </el-form-item>
              <el-form-item label="电话号码" prop="age" style="width: 450px;">
                <el-input type="text" v-model="ruleForm.age" placeholder="请输入电话号码"></el-input>
              </el-form-item>
            </el-form>
        </div>
    </el-card>
    <el-card class='el-card'>
        <span class='title-text'>打款信息</span>
        <div class='payment-box'>
            <div class='text-box'>
                <span class='payment-title'>收款账号:</span>
                <span class='payment-content'>7761 2456 5125 5442 2544 1</span>
            </div>
            <div class='text-box'>
                <span class='payment-title'>公司名称:</span>
                <span class='payment-content'>新疆爱华盈通信息技术有限公司</span>
            </div>
            <div class='text-box'>
                <span class='payment-title'>开户行:</span>
                <span class='payment-content'>招商银行深圳分行华侨城支行</span>
            </div>
        </div>
    </el-card>
    <el-card class='el-card'>
        <span class='title-text'>联系方式</span>
        <div class='payment-box'>
            <div class='text-box'>
                <span class='payment-title'>深圳:</span>
                <span class='payment-content'>0755-26621818</span>
            </div>
            <div class='text-box'>
                <span class='payment-title'>上海:</span>
                <span class='payment-content'>021-62190658</span>
            </div>
            <div class='text-box'>
                <span class='payment-title'>新疆:</span>
                <span class='payment-content'>0991-3737218</span>
            </div>
        </div>
    </el-card>
    <div>
        <el-button type='primary' @click='submit'>确认提交</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
        return {
            radio1: '',
            ruleForm: {
              pass: '',
              checkPass: '',
              age: ''
            },
            rules: {
              pass: [
                { required: true, validator: 'validatePass', trigger: 'blur' }
              ],
              checkPass: [
                { required: true, validator: 'validatePass2', trigger: 'blur' }
              ],
              age: [
                { required: true, validator: 'checkAge', trigger: 'blur' }
              ]
            }
        }
    },
    methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              alert('submit!')
            } else {
              console.log('error submit!!')
              return false
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        submit() {
            this.$emit('submit')
            this.$bus.$emit("submitData", {
              num: 'this.num',
              deg: 'this.deg',
              show_data: 'this.show_data'
            })
        },
        clickImte(index) {
          let itemName =  document.getElementsByClassName("item-card")
          let icon = document.getElementsByClassName("el-icon-check")
          // 判断类名的添加和移除
          for(let i = 0;i < itemName.length;i++) {
              if(i === index) {
                  // 给当前点击元素添加类名
                  itemName[i].classList.add("blueColor")
                  icon[i].classList.add('iconColor')
              }else {
                  // 移除其他元素的类名
                  itemName[i].classList.remove("blueColor")
                  icon[i].classList.remove('iconColor')
              }
          }
        }
    },
  }
</script>

<style lang='scss' scoped>
.el-card {
    margin-bottom: 10px;
}
.title-text {
    font-size: 18px;
    font-weight: bold;
}
.radio-box {
    margin-top: 20px;
}
/deep/ .el-radio-button {
    margin-right: 30px;
}
/deep/ .el-radio-button__inner {
    border: 1px solid #dcdfe6;
    border-radius: 5px;
}
.form-box {
    margin-top: 20px;
}
.payment-box {
    // background: #e9ebed;
}
.payment-title {
    font-size: 16px;
    color: #666666;
    padding-right: 10px;
}
.payment-content {
    font-size: 16px;
}
.text-box {
    margin: 10px;
}
.card-box {
  margin-top: 20px;
  display: flex;
}
.item-card {
  margin-right: 20px;
  border: 1px solid #dcdfe6;
  width: 140px;
  height: 180px;
  border-radius: 15px;
  padding: 1px;
  cursor: pointer;
  box-sizing: border-box;
  &:hover {
    border: 1px solid #1883d7;
    .time-box {
      border-top: 1px dashed #1883d7;
    }
  }
}
.amount-box {
  height: 55%;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  line-height: 100px;
}
.time-box {
  height: 30%;
  text-align: center;
  font-size: 14px;
  line-height: 50px;
  border-top: 1px dashed #dcdfe6;
}
.blueColor {
  border: 1px solid #1883d7;
  .time-box {
    border-top: 1px dashed #1883d7;
  }
}
.el-icon-check {
  font-size: 24px;
  float: right;
  border: 1px solid #dcdfe6;
  border-radius: 15px;
}
.icon-box {
  height: 15%;
}
.iconColor {
  color: #1883d7;
}
.renewal {
  margin: 10px;
  margin-bottom: 40px;
}
</style>