<template>
  <el-dialog width="600px" title="新增用户" :visible.sync="showUserModule" :before-close='cancelTheReset'>
    <el-form label-position="right" :model="form" label-width="100px" :rules="rules" ref="form">
      <el-form-item label="头像:" prop='avatar'>
       <!-- 照片显示区域 -->
          <div @click='clickImg' v-if='showCropper === false'>
             <img style='cursor:pointer;border-radius:5px' :src="form.avatar" width="100" height="100"/>
          </div>

          <!-- 裁剪区域 -->
      <div v-if='showCropper'>
       <div class="cropper">
         <div class="cropper-content">
           <div class="cropper">
             <vueCropper
               ref="cropper"
               :img="option.img"
               :outputSize="option.size"
               :outputType="option.outputType"
               :info="true"
               :full="option.full"
               :canMove="option.canMove"
               :canMoveBox="option.canMoveBox"
               :original="option.original"
               :autoCrop="option.autoCrop"
               :autoCropWidth="option.autoCropWidth"
               :autoCropHeight="option.autoCropHeight"
               :fixedBox="option.fixedBox"
               @realTime="realTime"
             ></vueCropper>
           </div>
           <div style="margin-left:20px;">
             <div
               class="show-preview"
               :style="{'width': '150px', 'height':'150px',  'overflow': 'hidden', 'margin': '30px'}"
             >
               <div v-loading="loading" element-loading-spinner="el-icon-loading" element-loading-text="头像上传中..." :style="previews.div" class="preview">
                 <img :src="previews.url" :style="previews.img" />
               </div>
             </div>
           </div>
         </div>
       </div>
       <div class="eleme">
         <el-upload
           class="upload-demo"
           ref="upload"
           :action="uploadAction"
           :before-upload="beforeUpload"
           :on-preview="handlePreview"
           :on-remove="handleRemove"
           :auto-upload="true"
           :show-file-list="false"
         >
           <el-button slot="trigger" size="mini" type="primary">选取图片</el-button>
           <el-button style="margin-left: 10px;" size="mini" type="success" @click="submitUpload">上传头像</el-button>
           <el-button style="margin-left: 10px;" type="info" size="mini" @click="cancelUpload">取消选择</el-button>
           <el-button icon="el-icon-refresh-right" size='mini' circle @click="rotateRight"></el-button>
           <el-button icon="el-icon-refresh-left" size='mini' circle @click="rotateLeft"></el-button>
           <el-button icon="el-icon-plus" size='mini' circle @click="changeScale(1)"></el-button>
           <el-button icon="el-icon-minus" size='mini' circle @click="changeScale(-1)"></el-button>
           <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
         </el-upload>
       </div>
      </div>
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
import { getStore } from '@/utils/storage.js'
import { MessageBox, Message } from 'element-ui'
import { postApi } from '@/api/api.js'

export default {
    props:{
        showUserModule: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
          // 加载效果
          loading: false,
          // 显示裁剪区域
          showCropper: true,
          // 控制照片上传区域的显示和隐藏
          uploadLoading: false,
          headImg: "",
          // 剪切图片上传
          previews: {},
          option: {
            img: "",
            outputSize: 1, //剪切后的图片质量（0.1-1）
            full: false, //输出原图比例截图 props名full
            outputType: "png",
            canMove: true,
            original: false,
            canMoveBox: true,
            autoCrop: true,
            autoCropWidth: 150,
            autoCropHeight: 150,
            fixedBox: true
          },
          fileName: "", //本机文件地址
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
              avatar: '',
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
            avatar: [
              { required: true, message: '请上传头像', trigger: 'blur' }
            ]
          },
          url:{
            //照片上传
            fileUpload: "https://jsonplaceholder.typicode.com/posts/",
          }
        }
    },
    created() {
      // 上传照片请求头相关
      const token = getStore('token')
      this.headers = {"X-Access-Token":token}
    },
    computed:{
      //上传照片地址相关
      uploadAction() {
        return this.url.fileUpload
      }
    },
    methods: {
        // 取消
        cancelTheReset(){
          // 传值给父组件关闭弹出界面
          this.$emit('colseDialog')
          // 重置表单
          this.$refs.form.resetFields()
          // 清除裁剪框数据
          this.option.img = ''
          // 隐藏裁剪区域
          this.showCropper = true
        },
        // 确定
        addDialog(formName) {
            //传值给父组件提交数据
            this.$emit('colseDialog', this.form)
            // 重置表单
            this.$refs.form.resetFields()
            // 清除裁剪框数据
            this.option.img = ''
            // 隐藏裁剪区域
            this.showCropper = true
        },
        submitUpload(file) {
          if(this.option.img){
            // this.$refs.upload.submit();
            this.finish("blob");
          }else {
            this.$message.warning('请先选取图片!')
          }
        },
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePreview(file) {
          console.log(file);
          //   let data = window.URL.createObjectURL(new Blob([file]));
          //   this.option.img = data;
        },
        beforeUpload(file) {
          console.log("上传文件");
          console.log(file);
          let fileType = file.type;
          if(fileType.indexOf('image') < 0){
            this.$message.warning('请上传图片')
            return false
          }
          //验证文件大小
          const isLt2M = file.size / 1024 / 1024 < 3
          if(!isLt2M){
            this.$message.warning('上传图片请不要超过3M')
            return false
          }
          let data = window.URL.createObjectURL(new Blob([file]));
          this.fileName = file.name;
          this.option.img = data;
        },
        // 放大/缩小
        changeScale(num) {
          if(this.option.img){
            console.log("changeScale");
            num = num || 1;
            this.$refs.cropper.changeScale(num);
          }else {
            this.$message.warning('请先选取图片!')
          }
        },
        // 坐旋转
        rotateLeft() {
          if(this.option.img){
            console.log("rotateLeft");
            this.$refs.cropper.rotateLeft();
          }else {
            this.$message.warning('请先选取图片!')
          }
        },
        // 右旋转
        rotateRight() {
          if(this.option.img){
            console.log("rotateRight");
            this.$refs.cropper.rotateRight();
          }else {
            this.$message.warning('请先选取图片!')
          }
        },
        // 上传图片（点击上传按钮）
        finish(type) {
          console.log("finish");
          let _this = this;
          let form = new FormData();
          // 输出
          if (type === "blob") {
            // 打开加载特效
            this.loading = true
            this.$refs.cropper.getCropBlob(data => {
              let img = window.URL.createObjectURL(data);
              this.model = true;
              this.modelSrc = img;
              form.append("file", data, this.fileName);
            //   this.$axios
            //     .post(config.upLoadFileURL, form, {
            //       contentType: false,
            //       processData: false,
            //       headers: { "Content-Type": "application/x-www-form-urlencoded" }
            //     })
                postApi(this.url.fileUpload,form, null)
                .then((res) => {
                  console.log(res)
                  if (res.success) {
                    console.log("上传成功！");
                    // 隐藏裁剪区域,打开照片显示区域
                    this.form.avatar = res.message
                    this.showCropper = false
                  }
                  // 关闭加载特效
                  this.loading = false
                }).catch((err) => {
                  console.log(err,'错误!!!!!')
                  this.$message.error(err,'上传头像失败,请刷新重试!')
                  // 关闭加载特效
                  this.loading = false
                })
            });
          } else {
            this.$refs.cropper.getCropData(data => {
              this.model = true;
              this.modelSrc = data;
            });
          }
        },
        // 实时预览函数
        realTime(data) {
          console.log(data,"预览");
          this.previews = data;
        },
        // 点击照片显示区域重新打开裁剪区域
        clickImg(){
          MessageBox.confirm('你确定要重新选择照片吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async () => {
            //打开裁剪区域
             this.showCropper = true
          }).catch(() => {
            Message({
              type: 'info',
              message: '已取消选择'
            });          
          });
        },
        //取消选择裁剪
        cancelUpload(){
          if(this.option.img){
            //清除裁剪框数据
            this.option.img = ''
            //隐藏裁剪区域
            this.showCropper = true
          }else {
            this.$message.warning('请先选取图片!')
          }
        }
    },
}
</script>

<style lang="scss" scoped>
// 标题区域样式
/deep/ .el-dialog__header {
    border: 1px solid #dcdfe6;
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

.cropper-content {
  min-width: 540px;
  display: flex;
  margin-bottom: 20px;
  margin-top: 10px;
  //   display: -webkit-flex;
  //   justify-content: flex-end;
  //   -webkit-justify-content: flex-end;
  .cropper {
    width: 220px;
    height: 220px;
  }
  .show-preview {
    flex: 1;
    -webkit-flex: 1;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    -webkit-justify-content: center;
    .preview {
      overflow: hidden;
    //   border-radius: 50%;
      border: 1px solid #cccccc;
      background: #cccccc;
      margin-left: 40px;
    }
  }
}
.cropper-content .show-preview .preview {
  margin-left: 0;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  user-select: none;
}
</style>