<template>
  <el-dialog
    title="title"
    :visible.sync="visible"
    :before-close="close"
    width="40%">
    <el-form :model="ruleForm" :rules="rules" status-icon ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="realName">
          <el-input v-model="ruleForm.realName" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item  label="工号" prop="passengerCode">
          <el-input readonly v-model="ruleForm.passengerCode" placeholder="请输入工号"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="ruleForm.sex" label="1">男</el-radio>
          <el-radio v-model="ruleForm.sex" label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="账号" prop="username">
          <el-input readonly v-model="ruleForm.username" auto-complete="new-password" type='text' placeholder="请输入账号)"></el-input>
        </el-form-item>
        <el-form-item label="请输入密码" prop="password">
          <el-input v-model="ruleForm.password" auto-complete="new-password" type='text' placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="personRoleId">
          <el-select style="width:70%" v-model="ruleForm.personRoleId" placeholder="请选择角色">
            <el-option
              v-for="item in roleDatas"
              :key="item.id"
              :label="item.roleName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="执教班级" prop="">
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
              <el-select style="width:70%" v-model="selcetGrade" @change='selectGrade' placeholder="请选择执教班级">
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
        <el-form-item label="通行权限" prop="">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全部</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedDormRoom" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in dormRoomDatas" :label="city.id" :key="city.id">{{city.areaName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="照片" prop="faceImg">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-change = 'handleChange'
            :before-upload="beforeAvatarUpload">
            <div class="avatar-image-box">
             <el-image style="width: 100%; height: 100%" v-loading="loading" element-loading-text="加载中..." element-loading-spinner="el-icon-loading" :src="ruleForm.faceImg" fit="scale-down">
               <div slot="error" class="image-slot">
                 <i class="el-icon-picture-outline"></i>
               </div>
             </el-image>
            </div>
            <div class="el-button-box">
             <el-button>选择照片</el-button>
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleOk">确认</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getApi, putApi } from '@/api/api.js'

  export default {
    data() {
        return {
          visible: false,
          title: '编辑',
          loading: false,
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

          },
        }
    },
    created() {
      this.getSchoolDatas()
      this.getSchoolRoleList()
    },
    methods: {
      edit(row) {
        this.visible = true
        this.model = Object.assign({}, row)
        this.$nextTick(() => {
          this.ruleForm = {
            realName: this.model.realName,
            sex: this.model.sex,
            username: this.model.username,
            passengerCode: this.model.passengerCode,
            faceImg: this.model.faceImg,
            personRoleId: this.model.personRoleId,
            id: this.model.id,
            password: this.model.password,
            personId: this.model.personId,
          }
          this.getDormRoomList()
          this.getTeachAreaList(this.model.id)
          this.getTeachClassList(this.model.personId)
        })
      },
      close() {
        this.visible = false
      },
      // 获取学校角色
      async getSchoolRoleList() {
        let res = await getApi('getSchoolRoleList', null)
        if(res.success) this.roleDatas = res.result
      },
      // 获取通行权限
      async getTeachAreaList(id) {
        this.checkedDormRoom = []
        this.originalDormRoomID = []
        let res = await getApi('getTeachAreaList', {teacherId: id})
        if(res.success) {
          let resData = res.result
          resData.forEach(item => {
            if(this.checkedDormRoom.indexOf(item.areaId) === -1) {
              this.checkedDormRoom.push(item.areaId)
              this.originalDormRoomID.push(item.areaId)
            }
          })
        }
      },
      // 获取执教班级
      async getTeachClassList(id) {
        this.selectClassData = []
        let res = await getApi('getTeachClassList', {teacherId: id})
        // console.log(res,'执教班级')
        if(res.success) {
          let resData = res.result
          resData.forEach(item => {
            if(this.selectClassData.indexOf(item.classId) === -1) {
              this.selectClassData.push(item.classId)
            }
          })
          this.selectClass()
        }
      },
      // 获取区域列表
      async getDormRoomList() {
        this.dormRoomIds = []
        this.dormRoomDatas = []
        let res = await getApi('getDormRoomList', null)
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
        let res = await getApi('getSchoolDatas', null)
        if (res.success) this.gradeDatas = res.result.children
      },
      // 选择完年级
      selectGrade(val) {
         this.gradeDatas.forEach(item => {
          if(item.id === val) this.classDatas = item.children
        })
      },
      // 选择完班级
      selectClass() {
        this.tags = []
        for(let i = 0;i < this.gradeDatas.length;i++) {
          for(let j = 0;j < this.gradeDatas[i].children.length;j++) {
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
      },
      // 照片上传时
      beforeAvatarUpload(file) {
        this.loading = true
        const isJPG = file.type === 'image/jpeg'
        const isLt3M = file.size / 1024 / 1024 < 3

        if (!isJPG) {
          Message.error('请上传JPG格式的照片')
          this.loading = false
        }else if (!isLt3M) {
          Message.error('上传的照片不能超过3M')
          this.loading = false
        }
        return isJPG && isLt3M
      },
      // 照片状态改变时的钩子
      handleChange(file, fileList) {
        this.loading = false
        if (file.status === "success") {
          let response = file.response
          response.success ? this.ruleForm.faceImg = response.message : this.$message.warning(response.message)
        }else if(file.status === "fail") {
          this.$message.warning('上传照片失败')
        }
      },
      // 取消编辑教师人员
      handleCancel() { this.close() },
      // 确定编辑教师人员
      async handleOk() {
        let arr = []
        this.tags.forEach(item => {
          if(arr.indexOf(item.id) === -1) {
            arr.push(item.id)
          }
        })
        this.ruleForm.classIds = arr.join(',')
        this.getAddOrDleteArea()
        let res = await putApi('editTeacher', this.ruleForm)
        res.success ? this.$message.success(res.message) : this.$message.warning(res.message)
        this.close()
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
        this.tags.splice(index, 1)
        this.selectClassData.forEach((item, index) => {
          if(item === id) this.selectClassData.splice(index, 1)
        })
      },
      // 获取新增和删除的通行权限
      getAddOrDleteArea() {
        this.ruleForm.areaIdsList = []
        this.ruleForm.deleteAreaIds = []
        //转换类型 string->number
        this.originalDormRoomID = this.originalDormRoomID.map((item)=>{
          return + item
        })
        //新增的通行权限
        this.checkedDormRoom.forEach((item)=>{
          if (this.originalDormRoomID.indexOf(item) === -1){
            this.ruleForm.areaIdsList.push(item)
          }
        })
        //删除的通行权限
        this.originalDormRoomID.forEach((item)=>{
          if (this.checkedDormRoom.indexOf(item) === -1){
            this.ruleForm.deleteAreaIds.push(item)
          }
        })
        //转换成字符串
        this.ruleForm.areaIdsList = this.ruleForm.areaIdsList.join(",")
        this.ruleForm.deleteAreaIds = this.ruleForm.deleteAreaIds.join(",")
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