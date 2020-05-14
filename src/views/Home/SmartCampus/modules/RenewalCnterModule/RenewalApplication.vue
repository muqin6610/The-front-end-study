<template>
  <div class="renewal">
    <el-card class='el-card'>
        <span class='title-text'>设备数量</span>
        <div class='radio-box'>
            <el-radio-group v-model="deviceNumber">
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
          <div class='item-card' @click="clickImte({
            index: 0,
            amount: '3800元',
            yearNum: '一年',
          })">
            <div class='icon-box'>
              <i class='el-icon-check'></i>
            </div>
            <div class='amount-box'>3800元</div>
            <div class='time-box'>一年</div>
          </div>
          <div class='item-card' @click="clickImte({
            index: 1,
            amount: '5800元',
            yearNum: '两年',
          })">
            <div class='icon-box'>
              <i class='el-icon-check'></i>
            </div>
            <div class='amount-box'>5800元</div>
            <div class='time-box'>两年</div>
          </div>
          <div class='item-card' @click="clickImte({
            index: 2,
            amount: '11000元',
            yearNum: '三年',
          })">
            <div class='icon-box'>
              <i class='el-icon-check'></i>
            </div>
            <div class='amount-box'>11000元</div>
            <div class='time-box'>三年</div>
          </div>
          <div class='item-card' @click="clickImte({
            index: 3,
            amount: '13000元',
            yearNum: '四年',
          })">
            <div class='icon-box'>
              <i class='el-icon-check'></i>
            </div>
            <div class='amount-box'>13000元</div>
            <div class='time-box'>四年</div>
          </div>
          <div class='item-card' @click="clickImte({
            index: 4,
            amount: '20000元',
            yearNum: '大于五年',
          })">
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
              <el-form-item label="发票抬头" prop="Invoice" style="width: 450px;">
                <el-input type="text" v-model="ruleForm.Invoice" placeholder="请输入发票抬头"></el-input>
              </el-form-item>
              <el-form-item label="纳税人识别号" prop="identifier" style="width: 450px;">
                <el-input type="text" v-model="ruleForm.identifier" placeholder="请输入纳税人识别号"></el-input>
              </el-form-item>
              <el-form-item label="联系人" prop="contactPerson" style="width: 450px;">
                <el-input type="text" v-model="ruleForm.contactPerson" placeholder="请输入联系人"></el-input>
              </el-form-item>
              <el-form-item label="电话号码" prop="phone" style="width: 450px;">
                <el-input type="text" v-model="ruleForm.phone" placeholder="请输入电话号码"></el-input>
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
        <el-button type='primary' @click="handleOk('ruleForm')">确认提交</el-button>
    </div>
  </div>
</template>

<script>
import { setStore } from '@/utils/storage.js'

  export default {
    data() {
        return {
            amount: '',
            deviceNumber: '',
            yearNum: '',
            ruleForm: {
              Invoice: '',
              identifier: '',
              contactPerson: '',
              phone: ''
            },
            rules: {
              Invoice: [
                { required: true, message: '请输入发票抬头', trigger: 'blur' }
              ],
              identifier: [
                { required: true, message: '请输入纳税人识别号', trigger: 'blur' }
              ],
              contactPerson: [
                { required: true, message: '请输入联系人', trigger: 'blur' }
              ],
              phone: [
                { required: true, message: '请输入电话号码', trigger: 'blur' }
              ]
            }
        }
    },
    methods: {
        handleOk(ruleForm) {
          this.$refs[ruleForm].validate((valid) => {
            if (valid) {
              let formData = Object.assign({}, this.ruleForm, {deviceNumber: this.deviceNumber, amount: this.amount, yearNum: this.yearNum})
              setStore('renewalForm', formData)
              this.$router.push('/home/smartCampus/submitRenewal')
              this.$refs.ruleForm.resetFields()
            } else {
              console.log('error submit!!')
              return false
            }
          })
        },
        clickImte(obj) {  
          this.amount = obj.amount
          this.yearNum = obj.yearNum
          let itemName =  document.getElementsByClassName("item-card")
          let icon = document.getElementsByClassName("el-icon-check")
          for(let i = 0;i < itemName.length;i++) {
              if(i === obj.index) {
                  itemName[i].classList.add("blueColor")
                  icon[i].classList.add('iconColor')
              }else {
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