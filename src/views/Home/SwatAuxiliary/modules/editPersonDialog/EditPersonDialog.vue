<template>
<!-- 编辑警员弹出框 -->
    <el-dialog
      :before-close='cancelTheReset'
      title="编辑警员"
      :visible.sync="PersonData.editPersonDialog">
      <el-form v-loading="loading" element-loading-text="加载中..." element-loading-spinner="el-icon-loading" :model="formData" status-icon ref="PersonData.rowData" label-width="100px" class="demo-ruleForm">
       <el-form-item label="照 片 :">
          <!-- 照片显示区域 -->
          <div @click='clickImg' v-if='showCropper === false'>
             <img style='cursor:pointer;border-radius:5px' :src="formData.avatar" width="100" height="100"/>
          </div>

          <!-- 裁剪区域 -->
      <div v-if='showCropper'>
       <div class="cropper">
         <div class="cropper-content" style="margin-bottom:20px;margin-top:10px;">
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
           action="https://jsonplaceholder.typicode.com/posts/"
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
       <el-form-item label="姓 名:">
           <el-input
           style='width:250px;'
           placeholder="请输入姓名"
           v-model="formData.realname"
           clearable>
           </el-input>
       </el-form-item>
       <el-form-item label="警员编号:">
           <el-input
            readonly
           style='width:250px;'
           placeholder="请输入警员编号"
           v-model="formData.policeCode"
           clearable>
           </el-input>
       </el-form-item>
       <el-form-item label="生 日:">
           <el-date-picker
            style='width:250px'
            align="right"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择生日"
            v-model="formData.age">
          </el-date-picker>
       </el-form-item>
       <el-form-item label="职 级:">
           <el-select style="width:250px" v-model="formData.rankCode" clearable placeholder="请选择职级">
             <el-option
               v-for="item in ranks"
               :key="item.rankCode"
               :label="item.rankName"
               :value="item.rankCode">
             </el-option>
            </el-select>
       </el-form-item>
       <el-form-item label="权 限:" prop="selectedroles">
           <el-select style="width:250px" v-model="formData.selectedroles" >
              <el-option 
              v-for="item in jurisdictions" 
              :label="item.roleName" 
              :key="item.id" 
              :value="item.id">
              </el-option>
           </el-select>
       </el-form-item>
        <el-form-item label="性 别:">
           <el-radio v-model="formData.sex" :label="1">男</el-radio>
           <el-radio v-model="formData.sex" :label="2">女</el-radio>
       </el-form-item>
        <el-form-item label="是否参训:">
           <el-radio v-model="formData.entryTraining" :label="1">是</el-radio>
           <el-radio v-model="formData.entryTraining" :label="0">否</el-radio>
       </el-form-item>
        <el-form-item label="功能手:">
           <el-checkbox-group v-model="policeCategory">
              <el-checkbox v-for="city in trainingPoliceCategory" :label="city.value" :key="city.value">{{city.text}}</el-checkbox>
           </el-checkbox-group>
       </el-form-item>
     </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="cancelTheReset">取 消</el-button>
      <el-button type="primary" @click="editDialog">确 定</el-button>
     </span>
    </el-dialog>
</template>

<script>
  import { MessageBox,Message } from 'element-ui'
  import { VueCropper } from "vue-cropper"
  import { getStore } from '@/utils/storage.js'

export default {
  components: {
    VueCropper
  },
    props:{
      PersonData: {
        editPersonDialog: {
          type: Boolean,
          default: false
        },
        rowData: Object,
      }
    },
    data() {
        return {
           // 加载效果
           loading: false,
           // 显示裁剪区域
           showCropper: false,
           // 控制照片上传区域的显示和隐藏
           uploadLoading: false,
           // 表单
           formData: {
             // 选中的功能手
             policeCategory: '',
             // 选中的权限
             selectedroles: '',
             // 上传照片的地址
             avatar: '',
             // 是否参训
             entryTraining: '',
             // 性别
             sex: null,
             // 选中的职级
             rankCode: '',
             // 年龄
             age: '',
             // 警员编号
             policeCode: '',
             // 姓名
             realname: '',
             // 警员ID
             id: '',
           },
          // 功能手
          policeCategory: [],
           // 职级数据
           ranks: [],
           // 权限数据
           jurisdictions: [],
           // 字典查询的功能手数据源
           trainingPoliceCategory: [],
           headImg: "",
           // 剪切图片上传
           crap: false,
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
           downImg: "#",
           imgFile: "",
           uploadImgRelaPath: "", //上传后的图片的地址（不带服务器域名）
        }
    },
    created() {
      this.getRankInfo()
      this.getRole()
    },
    watch: {
        PersonData:{
          handler: function (newVal, oldVal) {
              if(newVal.editPersonDialog === true){
                this.formData = {
                  age : newVal.rowData.age,
                  sex : newVal.rowData.sex,
                  rankCode : newVal.rowData.rankCode,
                  policeCode : newVal.rowData.policeCode,
                  realname : newVal.rowData.realname,
                  entryTraining : newVal.rowData.entryTraining,
                  id : newVal.rowData.userId,
                  avatar : newVal.rowData.avatar,
                  selectedroles : newVal.rowData.selectedroles,
                }
              }
            },
            deep: true
        }
     },
     computed:{

    },
    methods: {
      //获取职级数据
      getRankInfo(){

      },
      //获取权限角色数据
      getRole(){

      },
      //点击弹框确定按钮
      editDialog(){
          this.loading = true
          if(this.policeCategory.length){
            this.formData.policeCategory = this.policeCategory.join(',')
          }else {
            this.formData.policeCategory = this.policeCategory
            return
          }
          let departId = getStore("departId")
          this.formData.selecteddeparts = departId
          this.$emit('submitEditPerson',this.formData)
          this.loading = false
          this.option.img = ''
          this.showCropper = false
      },
    //点击弹框取消按钮
    cancelTheReset(){
        this.$emit('colseEditPerson')
        this.option.img = ''
        this.showCropper = false
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
      if(fileType.indexOf('image')<0){
        this.$message.warning('请上传图片')
        return false
      }
      //验证文件大小
      const isLt2M = file.size / 1024 / 1024 < 2
      if(!isLt2M){
        this.$message.warning('上传图片请不要超过2M')
        return false
      }
      let data = window.URL.createObjectURL(new Blob([file]));
      this.fileName = file.name;
      this.option.img = data;
    },
    //放大/缩小
    changeScale(num) {
      if(this.option.img){
        console.log("changeScale");
        num = num || 1;
        this.$refs.cropper.changeScale(num);
      }else {
        this.$message.warning('请先选取图片!')
      }
    },
    //坐旋转
    rotateLeft() {
      if(this.option.img){
        console.log("rotateLeft");
        this.$refs.cropper.rotateLeft();
      }else {
        this.$message.warning('请先选取图片!')
      }
    },
    //右旋转
    rotateRight() {
      if(this.option.img){
        console.log("rotateRight");
        this.$refs.cropper.rotateRight();
      }else {
        this.$message.warning('请先选取图片!')
      }
    },
    //上传图片（点击上传按钮）
    finish(type) {
      console.log("finish");
      let _this = this;
      let formData = new FormData();
      // 输出
      if (type === "blob") {
        //打开加载特效
        this.loading = true
        this.$refs.cropper.getCropBlob(data => {
          let img = window.URL.createObjectURL(data);
          this.model = true;
          this.modelSrc = img;
          formData.append("file", data, this.fileName);
        //   this.$axios
        //     .post(config.upLoadFileURL, formData, {
        //       contentType: false,
        //       processData: false,
        //       headers: { "Content-Type": "application/x-www-form-urlencoded" }
        //     })
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
    //点击照片显示区域重新打开裁剪区域
      clickImg(){
        MessageBox.confirm('你确定要重新选择照片吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
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
        this.option.img = ''
        this.showCropper = false
      }
  },
}
</script>

<style lang="scss" scoped>
.cropper-content {
  min-width: 540px;
  display: flex;
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