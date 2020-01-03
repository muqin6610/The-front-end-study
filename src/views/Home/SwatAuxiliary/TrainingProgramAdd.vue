<template>
  <el-card class="box-card">
    <div slot="header">
      <span style='font-size:19px;font-weight:bold'>新建训练计划</span>
    </div>
    <el-form ref="form" :rules="rules" :model="form" label-width="90px">
     <el-row :gutter="20">
       <el-col :span="10">
         <el-form-item prop='trainingName' label="训练名称 : ">
           <el-input style='width:400px' placeholder="请输入考核名称，例如：2019年一大队考核计划" v-model="form.trainingName"></el-input>
         </el-form-item>
       </el-col>
     </el-row>
     <el-row :gutter="20">
       <el-col :span="12">
         <el-form-item prop='startDay' label="开始时间 : ">
           <el-date-picker
            :picker-options='pickerOptions'
             value-format="yyyy-MM-dd"
             v-model="form.startDay"
             @change='selectStartDay'
             type="date"
             placeholder="选择开始时间">
           </el-date-picker>
         </el-form-item>
       </el-col>
     </el-row>
     <el-row :gutter="20">
       <el-col :span="12">
         <el-form-item prop='endDay' label="结束时间 : ">
           <el-date-picker
             :picker-options='pickerOptions'
             @change='selectEndDay'
             value-format="yyyy-MM-dd"
             v-model="form.endDay"
             type="date"
             placeholder="选择结束时间">
           </el-date-picker>
         </el-form-item>
       </el-col>
     </el-row>
    </el-form>
    <div style='margin-top: 30px;margin-left: 20px;'>
      <el-button type="primary" @click='addProgram("form")'>提交</el-button>
      <el-button @click='abrogate'>取消</el-button>  
    </div>
  </el-card>
</template>

<script>


  export default {
    data () {
      return {
        //禁止选择今天之前的日期
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7
          }
        },
        //表单验证
        rules:{
          trainingName: [{ required: true, message: '请填写训练名称', trigger: 'blur' }],
          startDay: [{ required: true, message: '请选择开始时间', trigger: 'blur' }],
          endDay: [{ required: true, message: '请选择结束时间', trigger: 'blur' }],
        },
        form: {
          //训练名称
          trainingName:"",
          //开始时间
          startDay:'',
          //结束时间
          endDay:'',
        },
      }
    },
    watch: {
      //监听路由是否变化
      '$route' (to, from) {
        //路由发生变化调用获取角色对应的部队数据

      }
    },
    created () {

    },
    methods: {
      //选择开始时间
      selectStartDay(){
        if(this.form.endDay && this.form.startDay >= this.form.endDay){
            this.form.startDay = ''
            this.$message.warning('开始时间不能晚于结束时间!')
            return false
        }
      },
      //选择结束时间
      selectEndDay(){
        if(this.form.endDay <= this.form.startDay){
            this.form.endDay = ''
            this.$message.warning('结束时间不能早于开始时间!')
            return false
        }
      },
      //新建训练计划
      addProgram(formName){
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
             //发送新建训练计划的请求
             console.log(this.form);
             //返回上一级页面
             this.$router.go(-1)
             //重置form表单
             this.$refs.form.resetFields()
          } 
        })
      },
      //点击取消重置数据并返回上级页面
      abrogate(){
        //返回上一级页面
        this.$router.go(-1)
        //重置form表单
        this.$refs.form.resetFields()
      },
    }
  }
</script>

<style lang='scss' scoped>
  /**多选框的样式 */
  .myradio {
    margin-bottom: 15px;
    margin-right: 20px;
    /deep/ .el-radio-button__inner {
      border-radius: 18px;
      border: 2px solid #409eff; 
    }
  }
  /**包裹多选框的DIV的样式 */
  .checkboxs {
    margin-top: 20px;
  }
  /**时间分配部队选择样式 */
  .trainingDepart {
    float: left;
  }
  /**时间分配文本样式 */
  .trainingSpan {
    float: left;
    height: 40px;
    line-height: 40px;
  }
/**显示分配日期区域的样式 */
.showTime {
  float: left;
  margin: 0 20px 30px 0;
  width: 130px;
  height: 35px;
  border: 1px solid #000;
  text-align: center;
  line-height: 35px
}
  /**训练内容样式 */
  .drillContent {
    margin: 0 0 45px 20px;
  }
  /**考核和训练的日期样式 */
  .drillDate {
    margin: 20px 0 20px 20px;
    display: inline-block;
  }
  .assessDate {
    margin: 20px 0 20px 60px;
    display:inline-block;
  }
  /**清除浮动影响 */
.clearfix {
  overflow: auto;
}
.el-card__body {
  padding: 0px
}
</style>