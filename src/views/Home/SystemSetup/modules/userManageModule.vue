<template>
  <el-dialog width="600px" title="新增用户" :visible.sync="showUserModule" :before-close='cancelTheReset'>
    <el-form label-position="right" :model="form" label-width="100px" :rules="rules" ref="form">
      <el-form-item label="头像:" prop='imageUrl'>
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="用户名:" prop='username'>
        <el-input type="text" style='width:75%;' v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop='password'>
        <el-input type="password" style='width:75%;' v-model="form.password" placeholder="至少8位密码,区分大小写" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认密码:" prop='confirmPass'>
        <el-input type="password" style='width:75%;' v-model="form.confirmPass" placeholder="确认密码" show-password></el-input>
      </el-form-item>
      <el-form-item label="角色:" prop='role'>
        <el-select style='width:75%;' v-model="form.role" placeholder="请选择角色">
          <el-option
            v-for="item in roleDatas"
            :key="item.value"
            :label="item.label"
            :value="item.label">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="性别:" prop='sex'>
        <el-radio-group v-model="form.sex">
          <el-radio :label="0">男</el-radio>
          <el-radio :label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="账户状态:" prop='switchs'>
        <el-radio-group v-model="form.switchs">
          <el-radio :label="0">正常</el-radio>
          <el-radio :label="1">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="邮箱:" prop='email'>
        <el-input style='width:75%;' v-model="form.email" placeholder="请输入邮箱号"></el-input>
      </el-form-item>
      <el-form-item label="手机号:" prop='phone'>
        <el-input style='width:75%;' v-model="form.phone" placeholder="请输入手机号"></el-input>
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
        showUserModule: {
            type: Boolean,
            default:false,
        }
    },
    data() {
        return {
            formLabelWidth: '120px',
            // 表单数据
            form: {
                username: '',
                password: '',
                confirmPass: '',
                email: '',
                phone: '',
                role: '',
                switchs: '',
                imageUrl: '',
                sex: '',
            },
            // 角色数据
            roleDatas: [
                {value:'01', label:'管理员'},
                {value:'02', label:'十级用户'},
                {value:'03', label:'九级用户'},
                {value:'04', label:'八级用户'},
                {value:'05', label:'七级用户'},
                {value:'06', label:'六级用户'},
                {value:'07', label:'五级用户'},
                {value:'08', label:'四级用户'},
                {value:'09', label:'三级用户'},
                {value:'10', label:'二级用户'},
                {value:'11', label:'一级用户'},
            ],
            // 表单验证
            rules: {
              username: [
                { required: true, message: '请输入用户名', trigger: 'blur' },
              ],
              password: [
                { required: true, message: '请输入密码', trigger: 'change' }
              ],
              confirmPass: [
                { required: true, message: '请确认密码', trigger: 'change' }
              ],
              email: [
                { required: true, message: '请输入邮箱', trigger: 'change' }
              ],
              phone: [
                { required: true, message: '请输入手机号', trigger: 'change' }
              ],
              role: [
                { required: true, message: '请选择角色', trigger: 'change' }
              ],
              switchs: [
                { required: true, message: '请选择账户状态', trigger: 'blur' }
              ],
              sex: [
                { required: true, message: '请选择性别', trigger: 'blur' }
              ],
              imageUrl: [
                { required: true, message: '请上传头像', trigger: 'blur' }
              ]
            }
        }
    },
    created() {
        
    },
    methods: {
        // 取消
        cancelTheReset(){
          // 传值给父组件关闭弹出界面
          this.$emit('colseDialog', false)
          // 重置表单
          this.$refs.form.resetFields()
        },
        // 确定
        addDialog(formName) {
            //传值给父组件提交数据
            this.$emit('addUserData', this.form)
            // 重置表单
            this.$refs.ruleForm.resetFields()
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        }
    },
}
</script>

<style lang="scss" scoped>
// 标题区域样式
/deep/ .el-dialog__header {
    border:1px solid #dcdfe6;
}
// 头像上传区域样式
/deep/ .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
/deep/ .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
/deep/ .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
/deep/ .avatar {
    width: 100px;
    height: 100px;
    display: block;
  } 
</style>