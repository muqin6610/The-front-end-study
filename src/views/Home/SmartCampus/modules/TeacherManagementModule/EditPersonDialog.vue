<template>
  <el-dialog
    :title="$t('m.teacherManagement.editTeacher')"
    :visible.sync="editPersonObj.showEditPerson"
    :before-close="shutDown"
    width="40%">
    <el-form :model="ruleForm" :rules="rules" status-icon ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item :label="$t('m.teacherManagement.name')" prop="realName">
          <el-input v-model="ruleForm.realName" :placeholder="$t('m.teacherManagement.enterName')"></el-input>
        </el-form-item>
        <el-form-item  :label="$t('m.teacherManagement.jobNumber')" prop="passengerCode">
          <el-input readonly v-model="ruleForm.passengerCode" :placeholder="$t('m.teacherManagement.enterJobNumber')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('m.teacherManagement.gender')" prop="sex">
          <el-radio v-model="ruleForm.sex" label="1">{{$t('m.teacherManagement.male')}}</el-radio>
          <el-radio v-model="ruleForm.sex" label="2">{{$t('m.teacherManagement.female')}}</el-radio>
        </el-form-item>
        <el-form-item :label="$t('m.teacherManagement.accountNumber')" prop="username">
          <el-input readonly v-model="ruleForm.username" auto-complete="new-password" type='text' :placeholder="$t('m.teacherManagement.enterAccountNumber')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('m.teacherManagement.password')" prop="password">
          <el-input v-model="ruleForm.password" auto-complete="new-password" type='text' :placeholder="$t('m.teacherManagement.enterPassword')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('m.teacherManagement.role')" prop="personRoleId">
          <el-select style="width:70%" v-model="ruleForm.personRoleId" :placeholder="$t('m.teacherManagement.selectRole')">
            <el-option
              v-for="item in roleDatas"
              :key="item.id"
              :label="item.roleName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('m.teacherManagement.coachingClass')" prop="" v-if="editPersonObj.teacherVal !== $t('m.teacherManagement.securityGuard')">
          <div class='class-box'>
            <div class='class-tag-box'>
              <el-tag
                class='el-tag'
                v-for="(tag, index) in tags"
                :key="tag.name"
                @close='clickTag(tag.id, index)'
                closable>
                {{tag.name}}
              </el-tag>
            </div>
            <div class='el-select-box'>
              <el-select style="width:70%" v-model="selcetGrade" @change='selectGrade' :placeholder="$t('m.teacherManagement.selectCoachingClass')">
                <el-option
                  v-for="item in gradeDatas"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div class='el-checkbox-box'>
              <el-checkbox-group @change='selectClass' v-model="selectClassData">
                <el-checkbox v-for='(item, index) in classDatas' :key='item.id' :label="item.id">{{item.label}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </el-form-item>
        <el-form-item :label="$t('m.teacherManagement.accessRights')" prop="">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">{{$t('m.teacherManagement.all')}}</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedDormRoom" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in dormRoomDatas" :label="city.id" :key="city.id">{{city.areaName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item :label="$t('m.teacherManagement.photo')" prop="faceImg">
          <el-upload
            class="avatar-uploader"
            :action="uploadAction"
            :show-file-list="false"
            :headers="headers"
            :on-change = 'handleChange'
            :before-upload="beforeAvatarUpload">
            <div class="avatar-image-box">
             <el-image style="width: 100%; height: 100%" v-loading="loading" :element-loading-text="$t('m.teacherManagement.loading')" element-loading-spinner="el-icon-loading" :src="getAvatarView(this.ruleForm.faceImg)" fit="scale-down">
               <div slot="error" class="image-slot">
                 <i class="el-icon-picture-outline"></i>
               </div>
             </el-image>
            </div>
            <div class="el-button-box">
             <el-button>{{$t('m.teacherManagement.choosePhoto')}}</el-button>
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="shutDown">{{$t('m.teacherManagement.cancel')}}</el-button>
      <el-button type="primary" @click="determine">{{$t('m.teacherManagement.determine')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>

  export default {
    props: {
        editPersonObj: {
          showEditPerson: {
              type: Boolean,
              default: false,
          },
          personDatas: {
              type: Object,
              default: '',
          },
          teacherVal: {
              type: String,
              default: '',
          }
        }
    },
    data() {
        let validateName = (rule, value, callback) => {
          if (!value) {
            callback(new Error(this.$t('m.teacherManagement.enterName')))
          } else {
            if(new RegExp(/[\u4E00-\u9FA5]/g).test(value)) {
              callback()
            }else {
              callback(new Error(this.$t('m.teacherManagement.nameMustChinese')))
            }
          }
        }
        return {
          // 加载特效
          loading: false,
          // 表单数据
          ruleForm: {
            realName: '',
            sex: '',
            username: '',
            passengerCode: '',
            areaIdsList: [],
            deleteAreaIds: [],
            faceImg: '',
            classIds: [],
            personRoleId: '',
            id: '',
            password: '',
            personId: '',
          },
          roleDatas: [],
          // 标签数据
          tags: [],
          // 控制全部选中
          checkAll: false,
          // 控制全部选中
          isIndeterminate: true,
          // 选中的权限区域
          checkedDormRoom: [],
          // 上传照片的头部设置
          headers: {},
          // 年级数据
          gradeDatas: [],
          // 选中的年级
          selcetGrade: '',
          // 班级数据
          classDatas: [],
          // 选中的班级
          selectClassData: [],
          // 区域数据
          dormRoomDatas: [],
          // 所有权限区域的id
          dormRoomIds: [],
          // 人员原本通行权限id
          originalDormRoomID: [],
          // 自定义验证
          rules: {
            name: [
              { validator: validateName, trigger: 'blur' }  
            ],
            workers: [
              { required: true, validator: this.checkWorkers, trigger: 'blur' }
            ],
          },
          url: {
            // 区域列表
            dormRoomList: "/park/areaCommon/alllistByAttr",
            fileUpload: window._CONFIG['domianURL']+"/park/common/upload",
            imgerver: window._CONFIG['domianURL']+"/sys/common/view",
            // 通行权限
            getTeachAreaList: '/park/teacherManege/getTeachAreaList',
            // 执教班级
            getTeachClassList: '/park/teacherManege/getTeachClassList',
            // 编辑教师人员
            editTeacher: "/park/teacherManege/edit",
            // 获取学校角色
            getSchoolRoleList: '/park/schoolRole/getSchoolRoleList',
            //校验工号/学号
            checkPassengerCode:"/park/passengerSchool/checkPassengerCode"
          },
        }
    },
    created() {
      // 获取token
      const token = Vue.ls.get(ACCESS_TOKEN)
      this.headers = {"X-Access-Token":token}
      this.getSchoolDatas()
      this.getSchoolRoleList()
    },
    computed:{
      //上传照片地址相关
      uploadAction:function () {
        return this.url.fileUpload
      }
    },
    watch: {
       editPersonObj:{
         handler(newVal, oldVal) {
               if(newVal.showEditPerson === true){
                 console.log(newVal)
                 this.ruleForm = {
                   realName: newVal.personDatas.realName,
                   passengerCode: newVal.personDatas.passengerCode,
                   username: newVal.personDatas.username,
                   faceImg: newVal.personDatas.faceImg,
                   sex: newVal.personDatas.sex,
                   id: newVal.personDatas.id,
                   password: newVal.personDatas.password,
                   personId: newVal.personDatas.personId,
                   personRoleId: newVal.personDatas.personRoleId,
                 }
                 this.getDormRoomList()
                 this.getTeachAreaList(newVal.personDatas.id)
                 this.getTeachClassList(newVal.personDatas.personId)
               }
           },
           deep: true
       }
    },
    methods: {
      // 照片地址拼接
      getAvatarView: function (avatar) {
        return this.url.imgerver + "/" + avatar
      },

      // 工号验证是否重复
      checkWorkers(rule, value, callback){
        if(!value){
          callback(new Error(this.$t('m.teacherManagement.enterJobNumber')))
        }else{
          if(new RegExp(/[\u4E00-\u9FA5]/g).test(value)){
            callback(this.$t('m.teacherManagement.validatePassengerCodeIsChinese'))
          }else if(new RegExp(/[^\u4e00-\u9fa5]+/).test(value)){
            let object={
              passengerCode: this.ruleForm.passengerCode
            }
            getAction(this.url.checkPassengerCode, object).then((res)=>{
              if (res.success&&res.result=='false'){
                callback()
              }else{
                callback(this.$t('m.classManagement.studentAlready'))
              }
            })
          }
        }
      },
      // 获取学校角色
      async getSchoolRoleList() {
        let res = await getAction(this.url.getSchoolRoleList, null)
        if(res.success) {
          this.roleDatas = res.result
        }
      },
      // 获取通行权限
      async getTeachAreaList(id) {
        // 清除数据，以本次为准
        this.checkedDormRoom = []
        // 保存人员原本的通行权限ID
        this.originalDormRoomID = []
        let res = await getAction(this.url.getTeachAreaList, {teacherId: id})
        // console.log(res);
        if(res.success && res.result.length !== null) {
          for(let i = 0;i < res.result.length;i++) {
            if(this.checkedDormRoom.indexOf(res.result[i].areaId) === -1) {
              this.checkedDormRoom.push(Number(res.result[i].areaId))
              this.originalDormRoomID.push(res.result[i].areaId)
            }
          }
        }
        console.log(this.checkedDormRoom);
      },
      // 获取执教班级
      async getTeachClassList(id) {
        this.selectClassData = []
        let res = await getAction(this.url.getTeachClassList, {teacherId: id})
        console.log(res,'执教班级')
        if(res.success && res.result.length !== null) {
          // 添加执教班级
          for(let i = 0;i < res.result.length;i++) {
            if(this.selectClassData.indexOf(res.result[i].classId) === -1) {
              this.selectClassData.push(res.result[i].classId)
            }
          }
          // 调用选中班级的方法，设置标签
          this.selectClass()
        }
      },
      // 获取区域列表
      async getDormRoomList() {
        this.dormRoomIds = []
        this.dormRoomDatas = []
        let res = await httpAction(this.url.dormRoomList, null, 'get')
        if(res.success && res.result.length) {
          // console.log(res, '区域列表')
          this.dormRoomDatas = res.result
          for(let i = 0;i < res.result.length;i++) {
            if(this.dormRoomIds.indexOf(res.result[i].id) === -1) {
              this.dormRoomIds.push(res.result[i].id)
            }
          }
        }
      },
      // 获取学校数据（年级，班级等）
      async getSchoolDatas() {
        let res = await queryDepartTreeListByUserDep()
        if (res.success) {
          // 年级数据
          if(res.result&&res.result.children && res.result.children != null) {
            this.gradeDatas = res.result.children
          }else {
            this.gradeDatas = []
          }
        }
      },
      // 选择完年级
      selectGrade(val) {
        // console.log(val,'选中的年级ID')
        if(this.gradeDatas.length && this.gradeDatas.length != null) {
          for(let i = 0;i < this.gradeDatas.length;i++) {
            if(this.gradeDatas[i].id === val) {
              if(this.gradeDatas[i].children && this.gradeDatas[i].children != null) {
                this.classDatas = this.gradeDatas[i].children
              }else {
                this.classDatas = []
              }
            }
          }
        }
      },
      // 选择完班级
      selectClass() {
        this.tags = []
        // 循环年级
        if(this.gradeDatas.length && this.gradeDatas.length != null) {
          for(let i = 0;i < this.gradeDatas.length;i++) {
            if(this.gradeDatas[i].children && this.gradeDatas[i].children != null) {
              // 循环年级的班级
              for(let j = 0;j < this.gradeDatas[i].children.length;j++) {
                // 循环当前选中的班级
                if(this.selectClassData.length && this.selectClassData.length != null) {
                  for(let z = 0;z < this.selectClassData.length;z++) {
                    if(this.gradeDatas[i].children[j].id === this.selectClassData[z]) {
                      this.tags.push({
                        name: this.gradeDatas[i].children[j].label,
                        id: this.gradeDatas[i].children[j].id,
                      })
                    }
                  }
                }
              }
            }
          }
        }
        // console.log(this.tags, 'this.tags')
      },
      // 照片上传时
      beforeAvatarUpload(file) {
        this.loading = true
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 3

        if (!isJPG) {
          Message.error(this.$t('m.teacherManagement.uploadFormat'))
          this.loading = false
        }else if (!isLt2M) {
          Message.error(this.$t('m.teacherManagement.uploadSize'))
          this.loading = false
        }
        return isJPG && isLt2M
      },
      // 照片状态改变时的钩子
      handleChange(file, fileList) {
        this.loading = false
        if (file.status === "success") {
          let response = file.response
          if(response.success){
            this.ruleForm.faceImg = response.message
          }else{
            Message.warning(response.message)
          }
        }else if(file.status === "fail") {
            Message.warning(this.$t('m.teacherManagement.failureTips'))
          }
      },
      // 取消编辑教师人员
      shutDown() { this.$emit('close') },
      // 确定编辑教师人员
      async determine() {
        let arr = []
        // 获取执教班级
        for(let i = 0;i < this.tags.length;i++) {
          if(arr.indexOf(this.tags[i].id) === -1) {
            arr.push(this.tags[i].id)
          }
        }
        this.ruleForm.classIds = arr.join(',')

        this.getAddOrDleteArea()        
        //  console.log(this.ruleForm,'确定编辑发送的参数')
        let res = await httpAction(this.url.editTeacher, this.ruleForm, 'put')
        if(res.success) {
            Message.success(res.message)
            this.$emit('close', 'ok')
        }else {
            Message.warning(res.message)
        }
      },
      handleCheckAllChange(val) {
        this.checkedDormRoom = val ? this.dormRoomIds : []
        this.isIndeterminate = false
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length
        this.checkAll = checkedCount === this.dormRoomDatas.length
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.dormRoomDatas.length
      },
      // 点击标签关闭
      clickTag(id, index) {
        // console.log(id,'点击的班级标签ID') 
        // 关闭班级标签
        this.tags.splice(index, 1)
        // 关闭班级标签删除对应的选中班级
        for(let i = 0;i < this.selectClassData.length;i++) {
          if(this.selectClassData[i] === id) {
            this.selectClassData.splice(i, 1)
          }
        }
      },
      // 获取新增和删除的通行权限
      getAddOrDleteArea() {
        this.ruleForm.areaIdsList = []
        this.ruleForm.deleteAreaIds = []
        //转换类型 string->number
        this.originalDormRoomID=this.originalDormRoomID.map((item)=>{
          return +item;
        })
        //新增的通行权限
        this.checkedDormRoom.forEach((item)=>{
          if (this.originalDormRoomID.indexOf(item)===-1){
            this.ruleForm.areaIdsList.push(item);
          }
        })
        //删除的通行权限
        this.originalDormRoomID.forEach((item)=>{
          if (this.checkedDormRoom.indexOf(item)===-1){
            this.ruleForm.deleteAreaIds.push(item);
          }
        })
        //转换成字符串
        this.ruleForm.areaIdsList=this.ruleForm.areaIdsList.join(",");
        this.ruleForm.deleteAreaIds=this.ruleForm.deleteAreaIds.join(",");
        // // 判断原本是否有通行权限
        // if(this.originalDormRoomID.length > 0) {
        //    // 获取新增的通行权限和删的通行权限
        //    for(let i = 0;i < this.originalDormRoomID.length;i++) {
        //     // 判断是否选中通行权限
        //     if(this.checkedDormRoom.length > 0) {
        //       for(let j = 0;j < this.checkedDormRoom.length;j++) {
        //         if(this.originalDormRoomID.indexOf(this.checkedDormRoom[j]) === -1) {
        //           // 新增的通行权限
        //           if(this.ruleForm.areaIdsList.indexOf(this.checkedDormRoom[j]) === -1) {
        //             this.ruleForm.areaIdsList.push(this.checkedDormRoom[j])
        //           }
        //         }
        //         if(this.checkedDormRoom.indexOf(this.originalDormRoomID[i]) === -1) {
        //           // 删除的通行权限
        //           if(this.ruleForm.deleteAreaIds.indexOf(this.originalDormRoomID[i]) === -1) {
        //             this.ruleForm.deleteAreaIds.push(this.originalDormRoomID[i])
        //           }
        //         }
        //       }
        //     }else {
        //       // 删除的通行权限
        //       for(let i = 0;i < this.originalDormRoomID.length;i++) {
        //         if(this.ruleForm.deleteAreaIds.indexOf(this.originalDormRoomID[i])) {
        //           this.ruleForm.deleteAreaIds.push(this.originalDormRoomID[i])
        //         }
        //       }
        //     }
        //   }
        // }else {
        //   // 新增的通行权限
        //   for(let i = 0;i < this.checkedDormRoom.length;i++) {
        //     if(this.ruleForm.areaIdsList.indexOf(this.checkedDormRoom[i]) === -1) {
        //       this.ruleForm.areaIdsList.push(this.checkedDormRoom[i])
        //     }
        //   }
        // }
        // // 数组转字符串
        // if(this.ruleForm.areaIdsList.length) {
        //   this.ruleForm.areaIdsList = this.ruleForm.areaIdsList.join(',')
        // }else {
        //   this.ruleForm.areaIdsList = ''
        // }
        // if(this.ruleForm.deleteAreaIds.length) {
        //   this.ruleForm.deleteAreaIds = this.ruleForm.deleteAreaIds.join(',')
        // }else {
        //   this.ruleForm.deleteAreaIds = ''
        // }
      },
    },
  }
</script>

<style lang="scss" scoped>
// 弹窗头部
/deep/ .el-dialog__header {
    border-bottom: 1px solid #cccccc;
}
// 编辑年级抽屉输入框
/deep/ .el-input {
    width: 80%;
}
// 无图片时的盒子
/deep/ .image-slot {
  width: 300px;
  height: 250px;
  text-align: center;
  background: #f6f6f6;
}
// 无图片时的图标
.el-icon-picture-outline {
  font-size: 50px;
  color: #d2d2d2;
  line-height: 250px;
}
// 上传区域
/deep/ .el-upload-dragger {
  background: #f2f2f2;
}
// 执教班级盒子
.class-box {
  margin-right: 10px;
}
// 标签样式
.el-tag {
  margin-right: 10px;
  background-color: #fff;
  color: #282c34;
  /deep/ .el-tag__close {
    color: #282c34;
  }
}
// 选择框盒子
.el-select-box {
  margin-top: 10px;
}
// 多选框盒子
.el-checkbox-box {
  margin-top: 10px;
}

.avatar-image-box {
  width: 300px;
  height: 250px;
  margin-top: 30px;
  border-radius: 5px;
}
.el-button-box {
  width: 120px;
  margin: 10px 0 30px -10px;
}
</style>