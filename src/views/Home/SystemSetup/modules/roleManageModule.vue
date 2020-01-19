<template>
  <el-dialog width="600px" title="新增角色" :visible.sync="showRoleModule" :before-close='cancelTheReset'>
    <el-form label-position="right" :model="form" label-width="120px" :rules="rules" ref="form">
      <el-form-item label="角色名:" prop='rolename'>
        <el-input style='width:70%;' v-model="form.rolename" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="权限级别:" prop='rank'>
        <el-select style='width:70%;' v-model="form.rank" placeholder="请选择权限级别">
          <el-option
            v-for="item in roleRanks"
            :key="item.value"
            :label="item.label"
            :value="item.label">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色状态:" prop='switchs'>
        <el-radio-group v-model="form.switchs">
          <el-radio :label="0">正常</el-radio>
          <el-radio :label="1">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="最大绑定人数:" prop='peoples'>
        <el-input-number controls-position="right" :min='1' style='width:40%;' v-model="form.peoples" placeholder="请输入最大绑定人数"></el-input-number>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelTheReset">取 消</el-button>
      <el-button type="primary" @click="addDialog('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
    props:{
        showRoleModule: {
            type: Boolean,
            default:false,
        }
    },
    data() {
        return {
            formLabelWidth: '120px',
            // 表数据
            form: {
                rolename: '',
                rank: '',
                peoples: '',
                switchs: '',
            },
            // 表单验证
            rules: {
              rolename: [
                { required: true, message: '请输入角色名', trigger: 'blur' },
              ],
              rank: [
                { required: true, message: '请选择权限级别', trigger: 'change' }
              ],
              switchs: [
                { required: true, message: '请选择角色状态', trigger: 'change' }
              ],
              peoples: [
                { required: true, message: '请输入最大绑定人数', trigger: 'change' }
              ],
            },
            // 角色级别数据
            roleRanks: [
                {value:'01', label:'S级'},
                {value:'02', label:'A级'},
                {value:'03', label:'B级'},
                {value:'04', label:'C级'},
                {value:'05', label:'D级'},
                {value:'06', label:'E级'},
            ],
        }
    },
    created() {
        
    },
    methods: {
        // 取消
        cancelTheReset(){
          this.$emit('colseDialog')
          this.$refs.form.resetFields()
        },
        // 确定
        addDialog(formName) {
            this.$emit('colseDialog', this.form)
            this.$refs.ruleForm.resetFields()
        },
    },
}
</script>

<style lang="scss" scoped>
// 标题区域样式
/deep/ .el-dialog__header {
    border: 1px solid #dcdfe6;
}  
</style>