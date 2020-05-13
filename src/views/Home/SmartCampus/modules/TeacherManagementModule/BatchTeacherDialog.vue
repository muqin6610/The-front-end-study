<template>
  <a-drawer
      @close="shutDown"
      :visible="this.batchAddObj.batchAddDrawer"
      custom-class="demo-drawer"
      ref="drawer"
      :closable='false'
      :with-header='false'
      :width="550"
      :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}"
      >
      <div class='a-drawer-title'>{{$t('m.teacherManagement.addBulk')}}</div>
      <div class='demo-drawer__contnet'>
        <span style='font-size: 18px;'>{{$t('m.teacherManagement.bulkUploadTips')}}</span>
        <div class="role-box">
          <span style="margin-right: 15px;">{{$t('m.teacherManagement.role')}}</span>
          <el-select style="width:40%" v-model="personRoleId" :placeholder="$t('m.teacherManagement.selectRole')">
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
            :headers="headers"
            :before-upload='beforeUpload'
            :on-change = 'handleChange'
            :on-progress="beforeProgress" 
            :show-file-list="false"
            :action="uploadFile">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">{{$t('m.teacherManagement.dragTheFile')}}<em>{{$t('m.teacherManagement.clickUpload')}}</em></div>
          </el-upload>
          <el-progress v-if='percentage > 0' style='padding-top: 10px;' :percentage="percentage" :format="format" :color="customColor"></el-progress>
          <div style='padding-top: 10px;'>
            <a href='#' @click="downloadImportZip()">{{$t('m.teacherManagement.downloadTemplate')}}</a>
          </div>

          <div v-if='showUploadTbale' class='upload-table-box'>
            <div class='upload-tabs-title-box'>
              <span>{{$t('m.teacherManagement.thisBatchUpload')}}{{uploadFileData.successNumber + uploadFileData.errorNumber}}{{$t('m.teacherManagement.peopleSuccess')}}{{uploadFileData.successNumber ? uploadFileData.successNumber : 0}}{{$t('m.teacherManagement.peopleFailure')}}{{uploadFileData.errorNumber ? uploadFileData.errorNumber : 0}}{{$t('m.classManagement.peopleFailureDetails')}}</span>
            </div>
            <el-tabs v-model="uploadActiveName">
              <el-tab-pane :label="$t('m.teacherManagement.successList')" name="uploadFirst">
                <el-table :data="successDatas" style="width: 100%">
                 <el-table-column prop="faceImg" :label="$t('m.teacherManagement.photo')">
                   <template slot-scope="scope">
                    <span style='display:none'>{{scope.row.faceImg}}</span>
                    <el-popover
                      placement="right"
                      width="200"
                      trigger="click">
                      <img :src="getAvatarView(scope.row.faceImg)" width="100%" height="100%"/>
                      <img style='cursor:pointer;border-radius:5px' slot="reference" :src="getAvatarView(scope.row.faceImg)" width="30" height="30"/>
                    </el-popover>
                   </template>
                 </el-table-column>
                 <el-table-column prop="realName" :label="$t('m.teacherManagement.name')">
                 </el-table-column>
                 <el-table-column prop="username" :label="$t('m.teacherManagement.accountNumber')">
                 </el-table-column>
               </el-table>
              </el-tab-pane>
              <el-tab-pane :label="$t('m.teacherManagement.failureList')" name="uploadSecond">
                <el-table :data="failureDatas" style="width: 100%">
                 <el-table-column prop="faceImg" :label="$t('m.teacherManagement.photo')">
                   <template slot-scope="scope">
                    <span style='display:none'>{{scope.row.faceImg}}</span>
                    <el-popover
                      placement="right"
                      width="200"
                      trigger="click">
                      <img :src="getAvatarView(scope.row.faceImg)" width="100%" height="100%"/>
                      <img style='cursor:pointer;border-radius:5px' slot="reference" :src="getAvatarView(scope.row.faceImg)" width="30" height="30"/>
                    </el-popover>
                   </template>
                 </el-table-column>
                 <el-table-column prop="realName" :label="$t('m.teacherManagement.name')">
                 </el-table-column>
                 <el-table-column prop="passengerCode" :label="$t('m.teacherManagement.accountNumber')">  
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
<!--      <el-button @click="shutDown">{{$t('m.teacherManagement.cancel')}}</el-button>-->
      <el-button type="primary" @click='determine'>{{$t('m.teacherManagement.determine')}}</el-button>
    </div>
    </a-drawer>
</template>

<script>

export default {
    props: {
        batchAddObj: {
            batchAddDrawer: {
                type: Boolean,
                default: false,
            },
        }
    },
    data() {
        return {
          orgCode: '',
          personRoleId: '',
          roleDatas: [],
          // 上传进度条
          percentage: 0,
          // 默认选中的上传成功和失败列表
          uploadActiveName: 'uploadFirst',
          // 上传文件的失败数据
          failureDatas: [],
          // 上传文件成功后的数据
          successDatas: [],
          // 文件上传返回的数据
          uploadFileData: {},
          // 控制上传成功后表格的显示和隐藏
          showUploadTbale: false,
          // 上传组件的头部设置
          headers:{},
          url: {
            // 教师角色添加
            add: "/park/teacherRole/add",
            // 下载模板
            downloadImportZips:"/park/passenger/downloadImportZips",
            // 文件上传
            importUploadFile:window._CONFIG['domianURL']+'/park/teacherManege/importUploadFilePassenger2',
            // 回显照片地址
            imgerver: window._CONFIG['domianURL']+"/sys/common/view",
            // 获取学校角色
            getSchoolRoleList: '/park/schoolRole/getSchoolRoleList',
          },
        }
    },
    watch: {
       batchAddObj:{
         handler(newVal, oldVal) {
               if(newVal.batchAddDrawer){
                 this.getSchoolRoleList()
               }
           },
           deep: true
       }
    },
    created() {
      // 获取token
      const token = Vue.ls.get(ACCESS_TOKEN)
      this.headers = {"X-Access-Token":token}

      // 获取orgCode
      this.orgCode = getStore("pro__Login_Userinfo").value.orgCode
    },
    computed:{
      // 文件上传
      uploadFile() {
        const deptId = this.personRoleId
        const sysOrgCode = this.orgCode
        let formData = new FormData()
        formData.append("deptId",deptId)
        formData.append("sysOrgCode",sysOrgCode)
        return this.url.importUploadFile+"/"+deptId+"/"+sysOrgCode
      }
    },
    methods: {
      // 获取学校角色
      async getSchoolRoleList() {
        let res = await getAction(this.url.getSchoolRoleList, null)
        if(res.success) {
          this.roleDatas = res.result
          if(this.roleDatas === null || !this.roleDatas.length) {return false}
          this.personRoleId = this.roleDatas[0].id
        }
      },
      // 取消
      shutDown() {
        this.$emit('close')
        // 关闭成功失败列表
        this.showUploadTbale = false
        // 清空已上传的文件列表
        this.$refs.upload.clearFiles()
        // 重置进度条
        this.percentage = 0
      },
      // 确定
      determine() {
        this.$emit('close', 'ok')
        // 关闭成功失败列表
        this.showUploadTbale = false
        // 重置进度条
        this.percentage = 0
        // 清空已上传的文件列表
        this.$refs.upload.clearFiles()
      },
      // 照片地址拼接
      getAvatarView: function (avatar) {
        return this.url.imgerver + "/" + avatar
      },
       // 文件上传前的钩子
       beforeUpload: function(file){
        if(!this.personRoleId) {
          Message.warning(this.$t('m.teacherManagement.addBulkPrompt'))
          return false
        }
        let fileType = file.type
        if(fileType.indexOf('zip') < 0){
          Message.warning(this.$t('m.teacherManagement.pleaseInputImgFile'))
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
           // 打开上传成功后的表格
           this.showUploadTbale = true
           // 保存上传文件返回的数据
           this.uploadFileData = file.response.result
           // 失败数据
           this.failureDatas = file.response.result.passengerFailureList
           // 成功数据
           this.successDatas = file.response.result.passengerList
  
         } else if (status === "fail") {
           Message.error(`${file.name} file upload failed.`)
         }
       },
       // 上传文件的进度
       beforeProgress(event, file, fileList) {
         let loadProgress = Math.floor(event.percent) //这就是当前上传的进度
         loadProgress == 100 ? this.percentage = 99 : this.percentage = loadProgress
       },
       format() {
        return this.percentage === 100 ? this.$t('m.teacherManagement.carryOut') : `${this.percentage}%`;
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
            Message.error(response.data.message)
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
    },
}
</script>

<style lang="scss" scoped>
// 批量添加老师抽屉标题
.a-drawer-title {
    line-height: 60px;
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
</style>