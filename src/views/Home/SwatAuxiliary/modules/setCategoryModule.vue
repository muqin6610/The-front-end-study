<template>
  <div>
    <el-dialog
      title="新增类别"
      :visible.sync="showAddCategory"
      width="600px"
      :before-close="cancelTheReset">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
        <el-row :gutter="20">
          <el-col :span='20'>
            <el-form-item label="项目分类 :" prop="pass">
              <el-input v-model="ruleForm.pass" placeholder="请输入项目分类"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span='20'>
            <el-form-item label="项目类型 :" prop="checkPass">
              <el-input v-model="ruleForm.checkPass" placeholder="请输入项目类型"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span='20'>
            <el-form-item label="项目类别 :" prop="age">
              <el-input v-model="ruleForm.age" placeholder="请输入项目类别"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelTheReset">取 消</el-button>
        <el-button type="primary" @click="addDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
    props: {
        showAddCategory: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
          ruleForm: {
            pass: '',
            checkPass: '',
            age: ''
          },
          rules: {
            pass: [
              { required: true, message: '请选择项目分类', trigger: 'blur' }
            ],
            checkPass: [
              { required: true, message: '请选择项目类型', trigger: 'blur' }
            ],
            age: [
              { required: true, message: '请选择项目类别', trigger: 'blur' }
            ]
          },
        }
    },
    methods: {
        cancelTheReset() {
          this.$emit('colseDialog')
          this.$refs.ruleForm.resetFields()
        },
        addDialog() {
          this.$emit('colseDialog', this.ruleForm)
          this.$refs.ruleForm.resetFields()
        }
    },
}
</script>

<style lang="scss" scoped>
/deep/ .el-dialog__header {
    border-bottom: 1px solid #dcdfe6;
}
</style>