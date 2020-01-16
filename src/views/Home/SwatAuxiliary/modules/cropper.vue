<template>
  <div style="min-width: 540px;width:600px;margin-bottom:20px;">
    
    <div class="cropper">
      <div class="cropper-content" style="margin-bottom:20px;margin-top:10px;">
        <div style='border:1px solid #dcdfe6;' class="cropper">
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
        <el-button icon="el-icon-refresh-right" size='mini' circle @click="rotateRight"></el-button>
        <el-button icon="el-icon-refresh-left" size='mini' circle @click="rotateLeft"></el-button>
        <el-button icon="el-icon-plus" size='mini' circle @click="changeScale(1)"></el-button>
        <el-button icon="el-icon-minus" size='mini' circle @click="changeScale(-1)"></el-button>
        <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
      </el-upload>
    </div>
  </div>
</template>

<script>
import { VueCropper } from "vue-cropper";

export default {
  data() {
    return {
      // 加载效果
      loading: false,
      headImg: "",
      // 剪切图片上传
      crap: false,
      previews: {},
      option: {
        img: "",
        outputSize: 1, // 剪切后的图片质量（0.1-1）
        full: false, // 输出原图比例截图 props名full
        outputType: "png",
        canMove: true,
        original: false,
        canMoveBox: true,
        autoCrop: true,
        autoCropWidth: 150,
        autoCropHeight: 150,
        fixedBox: true
      },
      fileName: "", // 本机文件地址
      downImg: "#",
      imgFile: "",
      uploadImgRelaPath: "", // 上传后的图片的地址（不带服务器域名）
    };
  },
  components: {
    VueCropper
  },
  computed:{

 },
  methods: {
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
  }
};
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