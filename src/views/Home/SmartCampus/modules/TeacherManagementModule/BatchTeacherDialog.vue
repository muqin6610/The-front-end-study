<template>
  <el-drawer
      :before-close="close"
      :visible.sync="visible"
      size="550px"
      :show-close='false'
      :title="title"
      >
      <div class='demo-drawer__contnet'>
        <span style='font-size: 18px;'>批量上传仅支持ZIP格式文件，请将照片按照姓名_账号.jpg命名,默认密码为:123456</span>
        <div class="role-box">
          <span style="margin-right: 15px;">选择角色</span>
          <el-select style="width:40%" v-model="personRoleId" placeholder="请选择角色">
            <el-option
              v-for="item in roleDatas"
              :key="item.id"
              :label="item.roleName"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
          <el-upload
            ref="upload"
            style='padding-top: 20px;'
            class="upload-demo"
            drag
            :before-upload='beforeUpload'
            :on-change = 'handleChange'
            :on-progress="beforeProgress" 
            :show-file-list="false"
            action="https://jsonplaceholder.typicode.com/posts/">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
          <el-progress v-if='percentage > 0' style='padding-top: 10px;' :percentage="percentage" :format="format" :color="customColor"></el-progress>
          <div style='padding-top: 10px;'>
            <a href='#' @click="downloadImportZip()">点击下载模板</a>
          </div>

          <div v-if='showUploadTbale' class='upload-table-box'>
            <div class='upload-tabs-title-box'>
              <span>本次批量上传{{uploadFileData.successNumber + uploadFileData.errorNumber}}成功{{uploadFileData.successNumber ? uploadFileData.successNumber : 0}}失败{{uploadFileData.errorNumber ? uploadFileData.errorNumber : 0}}点击查看失败详情。</span>
            </div>
            <el-tabs v-model="uploadActiveName">
              <el-tab-pane label="成功列表" name="uploadFirst">
                <el-table :data="successDatas" style="width: 100%">
                 <el-table-column prop="faceImg" label="照片">
                   <template slot-scope="scope">
                    <span style='display:none'>{{scope.row.faceImg}}</span>
                    <el-popover
                      placement="right"
                      width="200"
                      trigger="click">
                      <img :src="scope.row.faceImg" width="100%" height="100%"/>
                      <img style='cursor:pointer;border-radius:5px' slot="reference" :src="scope.row.faceImg" width="30" height="30"/>
                    </el-popover>
                   </template>
                 </el-table-column>
                 <el-table-column prop="realName" label="姓名">
                 </el-table-column>
                 <el-table-column prop="username" label="账号">
                 </el-table-column>
               </el-table>
              </el-tab-pane>
              <el-tab-pane label="失败列表" name="uploadSecond">
                <el-table :data="failureDatas" style="width: 100%">
                 <el-table-column prop="faceImg" label="照片">
                   <template slot-scope="scope">
                    <span style='display:none'>{{scope.row.faceImg}}</span>
                    <el-popover
                      placement="right"
                      width="200"
                      trigger="click">
                      <img :src="scope.row.faceImg" width="100%" height="100%"/>
                      <img style='cursor:pointer;border-radius:5px' slot="reference" :src="scope.row.faceImg" width="30" height="30"/>
                    </el-popover>
                   </template>
                 </el-table-column>
                 <el-table-column prop="realName" label="姓名">
                 </el-table-column>
                 <el-table-column prop="passengerCode" label="账号">  
                 </el-table-column>
               </el-table>
              </el-tab-pane>
            </el-tabs>
          </div>
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
      <el-button type="primary" @click='handleOk'>确定</el-button>
    </div>
    </el-drawer>
</template>

<script>
import { getApi } from '@/api/api.js'
import { setStore, getStore } from '@/utils/storage.js'
export default {
    data() {
        return {
          title: '批量添加',
          visible: false,
          orgCode: '',
          personRoleId: '',
          roleDatas: [],
          percentage: 0,
          uploadActiveName: 'uploadFirst',
          failureDatas: [],
          successDatas: [],
          uploadFileData: {},
          showUploadTbale: false,
        }
    },
    created() {
      this.orgCode = getStore("userInfo").orgCode
    },
    methods: {
      add() {
        this.getSchoolRoleList()
        this.visible = true
      },
      close() {
        this.visible = false
        this.showUploadTbale = false
        this.percentage = 0
        this.$refs.upload.clearFiles()
      },
      // 获取学校角色
      async getSchoolRoleList() {
        let res = await getApi('getSchoolRoleList', null)
        if(res.success) {
          this.roleDatas = res.result
          if(this.roleDatas === null || !this.roleDatas.length) return false
          this.personRoleId = this.roleDatas[0].id
        }
      },
      // 确定
      handleOk() { this.close() },
       // 文件上传前的钩子
       beforeUpload: function(file){
        if(!this.personRoleId) {
          this.$message.warning("请先选择角色,再上传文件")
          return false
        }
        let fileType = file.type
        if(fileType.indexOf('zip') < 0){
          this.$message.warning("上传的文件必须为zip格式")
          return false
        }
        //TODO 验证文件大小
      },
      // 上传文件状态改变的钩子
      handleChange (file, fileList) {
         const status = file.status
         console.log(file,'上传状态')
         if (status === "success") {
           this.percentage = 100
           this.showUploadTbale = true
           this.uploadFileData = file.response.result
           this.failureDatas = file.response.result.passengerFailureList
           this.successDatas = file.response.result.passengerList
  
         } else if (status === "fail") {
           this.$message.error(`${file.name} file upload failed.`)
         }
       },
       // 上传文件的进度
       beforeProgress(event, file, fileList) {
         let loadProgress = Math.floor(event.percent) //这就是当前上传的进度
         loadProgress == 100 ? this.percentage = 99 : this.percentage = loadProgress
       },
       format() {
        return this.percentage === 100 ? "完成" : `${this.percentage}%`;
      },
      customColor(percentage) {
        if (percentage < 70) {
          return '#409eff';
        } else {
          return '#67c23a';
        }
      },
       // 点击下载导入的zip模板
      downloadImportZip(){
        axios.post(this.url.downloadImportZips,{}).then((response) => {
          if(response.success){
            let a = document.createElement('a')
            a.setAttribute("download","imagesModel.zip")
            //a.download = data.fileName
            a.setAttribute("href",response.result[0])
            a.setAttribute("target","_blank")
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
          }else {
            this.$message.error(response.data.message)
          }
        }).catch(function (error) {
          console.log(error)
        })
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
// 上传列表盒子
.upload-table-box {
  margin-bottom: 80px;
  margin-top: 20px;
}
.role-box {
  margin-top: 20px;
}
.demo-drawer__contnet {
  margin-left: 40px;
}
a {
  color: #1890ff;
  text-decoration: none;
}
</style>