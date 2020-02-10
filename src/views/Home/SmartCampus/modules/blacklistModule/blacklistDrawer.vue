<template>
  <el-drawer
    :visible.sync="blacklistDrawer"
    :before-close="submitForm"
    :show-close='false'
    title="新增黑名单"
    size='30%'
    >
    <div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="realName">
          <el-input v-model="ruleForm.realName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-input v-model="ruleForm.type"></el-input>
        </el-form-item>
        <el-form-item label="照片" prop="faceImg">
          <el-image style="width: 300px;height: 250px;margin-top:30px;border-radius:5px;" :src="ruleForm.faceImg" fit="scale-down">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture"></i>
            </div>
          </el-image>
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-change = 'handleAvatarChange'
            :before-upload="beforeAvatarUpload">
            <el-button style='width:120px;margin-bottom: 30px;'>选择照片</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <div
      :style="{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
        }"
      >
        <el-button @click="submitForm">取 消</el-button>
        <el-button type="primary" @click="resetForm('ruleForm')">确 定</el-button>
    </div>
  </el-drawer>
</template>

<script>
export default {
    props: {
      blacklistDrawer: {
        type:Boolean,
        default: false,
      }
    },
    data() {
        return {
           ruleForm: {
             realName: '',
             type: '',
             faceImg: '',
           },
           rules: {
            realName: [
              { required: true, message: '请输入姓名', trigger: 'blur' }
            ],
            faceImg: [
              { required: true, message: '请选择照片', trigger: 'blur' }
            ],
            type: [
              { required: true,  message: '请输入类型', trigger: 'blur' }
            ]
          },
        }
    },
    methods: {
        // 取消
        submitForm() {
          this.$emit('cancelBlacklist')
        },
        // 确定
        resetForm() {
          this.$emit('cancelBlacklist')
        },
        // 照片上传时
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg'
          const isLt2M = file.size / 1024 / 1024 < 2

          if (!isJPG) {
            Message.error('上传头像图片只能是 JPG 格式!')
          }
          if (!isLt2M) {
            Message.error('上传头像图片大小不能超过 2MB!')
          }
          return isJPG && isLt2M
        },
        // 照片状态改变时的钩子
        handleAvatarChange(file, fileList) {
          console.log(file)
          if (file.status === "success") {
            let response = file.response
            console.log(response)
            if(response.success){
              this.ruleForm.faceImg = response.message
            }else{
              Message.warning(response.message)
            }
          }
        },
    },
}
</script>

<style lang="scss" scoped>
// 抽屉标题
/deep/ .el-drawer__header {
  font-size: 30px;
  font-weight: bold;
  color: #21252b;
  border-bottom: 1px solid #dcdfe6;
  padding-left: 15px;
  margin-bottom: 20px;
} 
// 上传区域
/deep/ .el-upload-dragger {
  background: #f2f2f2;
}
// 无图片时的盒子
/deep/ .image-slot {
  width: 300px;
  height: 250px;
  text-align: center;
  background: #f6f6f6;
}
// 无图片时的图标
.el-icon-picture {
  font-size: 50px;
  color: #d2d2d2;
  line-height: 250px;
}
// 输入框
/deep/ .el-input {
  width: 70%;
} 
</style>