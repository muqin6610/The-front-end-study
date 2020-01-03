<template>
  <el-drawer
      :title="gradeAndClass.title"
      :before-close="shutDown"
      :visible.sync="gradeAndClass.dialog"
      direction="rtl"
      custom-class="demo-drawer"
      ref="drawer"
      >
      <div class='demo-drawer__contnet'>
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item :label="gradeAndClass.inputNmae" label-width="100px" prop="gradeClassName">
            <el-input v-model="form.gradeClassName"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="demo-drawer__footer">
        <el-button @click="shutDown">取 消</el-button>
        <el-button type="primary" @click='determine("form")'>确 定</el-button>
      </div>
    </el-drawer>
</template>

<script>
export default {
    props: {
        gradeAndClass: {
            dialog: {
                type: Boolean,
                default: false,
            },
            title: {
                type: String,
            },
            inputNmae: {
                type: String,
            }
        }
    },
    data() {
        let validateGradeClass = (rule, value, callback) => {
          if (value === '') {
              if(this.gradeAndClass.title === '新建年级') {
                  callback(new Error('请输入年级名称'))
              }else {
                  callback(new Error('请输入班级名称'))
              }
          }else {
            callback()
          }
        }
        return {
           form: {
              gradeClassName: '',
            }, 
           // 自定义验证
           rules: {
            gradeClassName: [
              { required: true, validator: validateGradeClass, trigger: 'blur' }
            ],
          },
        }
    },
    methods: {
         // 取消
         shutDown() {
          this.$emit('shutDown')
          // 重置表单
          this.$refs.form.resetFields()
        },
        // 确定
        determine(form) {
            // 表单验证
            this.$refs[form].validate((valid) => {
              if (valid) {
                let data = this.form.gradeClassName
                if(this.gradeAndClass.title === '新建年级') {
                    this.$emit('determineGrade', data)
                }else {
                    this.$emit('determineClass', data)
                }
                
                // 重置表单
                this.$refs.form.resetFields()
              } else {
                console.log('error submit!!')
                return false
              }
            })
        }
    },
}
</script>

<style lang="scss" scoped>
// 新建年级抽屉标题
/deep/ .el-drawer__header {
    font-size: 30px;
    font-weight: bold;
    color: #21252b;
    border-bottom: 1px solid #cccccc
}
// 新建年级抽屉输入框
/deep/ .el-input {
    width: 80%;
}
// 新建年级抽屉按钮
.demo-drawer__footer {
    float: right;
    margin-right: 20px;
}
.demo-drawer__contnet {
    height: 92%;
}

</style>