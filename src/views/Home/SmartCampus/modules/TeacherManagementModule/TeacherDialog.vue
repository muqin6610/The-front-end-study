<template>
  <el-drawer
    :visible.sync="visible"
    :before-close="close"
    :show-close='false'
    :title="title"
    size="500px">
    <div class="demo-drawer__content">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="realName">
          <el-input v-model="ruleForm.realName" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item  label="工号" prop="passengerCode">
          <el-input v-model="ruleForm.passengerCode" placeholder="请输入工号"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="ruleForm.sex" label="1">男</el-radio>
          <el-radio v-model="ruleForm.sex" label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="账号" prop="username">
          <el-input v-model="ruleForm.username" auto-complete="new-password" type='text' placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" type='password' auto-complete="new-password" placeholder="请输入密码"></el-input>
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
                <el-checkbox v-for='(item, index) in classDatas' :key='item.id' :label="item">{{item.label}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="通行权限" prop="">
          <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全部</el-checkbox>
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
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleOk('ruleForm')">确定</el-button>
    </div>
  </el-drawer>
</template>

<script>
import { getApi, postApi } from '@/api/api.js'

export default {
    data() {
        return {
          visible: false,
          title: '添加',
          loading: false,
          ruleForm: {
            realName: '',
            sex: '',
            username: '',
            password: '',
            passengerCode: '',
            faceImg: '',
            areaIds: [],
            classIds: [],
            personRoleId: '',
          },
          tags: [],
          gradeDatas: [],
          roleDatas: [],
          selcetGrade: '',
          classDatas: [],
          selectClassData: [],
          checkAll: false,
          checkedDormRoom: [],
          dormRoomDatas: [],
          dormRoomIds: [],
          rules: {
            realName: [
              { required: true, message: "请输入姓名", trigger: 'blur' }  
            ],
            sex: [
              { required: true, message: "请选择性别", trigger: 'blur' }
            ],
            passengerCode: [
              { required: true, message: '请输入工号', trigger: 'blur' }
            ],
            password: [
              { required: true, message: '请输入密码', trigger: 'blur' }
            ],
            username: [
              { required: true,  message: '请输入账号', trigger: 'blur' }
            ],
            faceImg: [
              { required: false, message: '请上传照片', trigger: 'blur' }
            ],
            personRoleId: [
              { required: true, message: '请选择角色', trigger: 'blur' }
            ],
          },
        }
    },
    created() {

    },
    methods: {
      add() {
        this.getSchoolRoleList()
        this.getSchoolDatas()
        this.getDormRoomList()
        this.visible = true
      },
      close() {
        this.visible = false
        this.$refs.ruleForm.resetFields()
        this.checkedDormRoom = []
        this.checkAll = false
        this.selectClassData = []
        this.tags = []
        this.selcetGrade = ''
        this.classDatas = []
      },
      // 获取学校角色
      async getSchoolRoleList() {
        let res = await getApi('getSchoolRoleList', null)
        if(res.success) { this.roleDatas = res.result }
      },
      // 获取学校数据（年级，班级等）
      async getSchoolDatas() {
        let res = await getApi('getSchoolDatas', null)
        // console.log(res)
        if (res.success) { this.gradeDatas = res.result.children }
      },
      // 获取区域列表
      async getDormRoomList() {
        this.dormRoomIds = []
        this.dormRoomDatas = []
        let res = await getApi('getDormRoomList', null)
        // console.log(res)
        if(res.success) {
          this.dormRoomDatas = res.result
          for(let i = 0;i < res.result.length;i++) {
            if(this.dormRoomIds.indexOf(res.result[i].id) === -1) {
              this.dormRoomIds.push(res.result[i].id)
            }
          }
        }
      },
      // 取消添加老师
      handleCancel() {
        this.close()
      },
      // 确认添加老师
      handleOk(formName) {
        this.ruleForm.areaIds = this.checkedDormRoom.join(',');
        this.ruleForm.personId = "3";
        let arr = []
        // 获取执教班级
        for(let i = 0;i < this.tags.length;i++) {
          if(arr.indexOf(this.tags[i].id) === -1) {
            arr.push(this.tags[i].id)
          }
        }
        this.ruleForm.classIds = arr.join(',')

        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let res = await postApi("addTeacher", this.ruleForm)
            if(res.success) {
                this.$message.success(res.message)
            }else {
                this.$message.warning(res.message)
            }
            this.close()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // 选择完年级
      selectGrade(val) {
        this.classDatas = this.gradeDatas.filter(item => {
          if(item.id === val) {
            return item.children
          }
        })
      },
      // 选择完班级
      selectClass(val) {
        this.tags = []
        this.selectClassData.forEach((item, index, array) => {
          this.tags.push({
            name: item.label,
            id: item.id,
          })
        })
      },
      // 照片上传时
      beforeAvatarUpload(file) {
        this.loading = true
        const isJPG = file.type === 'image/jpeg'
        const isLt3M = file.size / 1024 / 1024 < 3

        if (!isJPG) {
          Message.error('请上传JPG格式图片')
          this.loading = false
        }else if (!isLt3M) {
          Message.error('上传的图片不能超过3M')
          this.loading = false
        }
        return isJPG && isLt3M
      },
      // 照片状态改变时的钩子
      handleChange(file, fileList) {
        this.loading = false
        if (file.status === "success") {
          let response = file.response  
          console.log(response)
          if(response.success){
            this.ruleForm.faceImg = response.message
          }else{
            Message.warning(response.message)
          }
        }else if(file.status === "fail") {
          Message.warning('上传出错')
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
        // 关闭班级标签
        this.tags.splice(index, 1)
        // 关闭班级标签删除对应的选中班级
        for(let i = 0;i < this.selectClassData.length;i++) {
          if(this.selectClassData[i].id === id) {
            this.selectClassData.splice(i, 1)
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
// 添加老师内容盒子
.demo-drawer__content {
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
}

// 添加老师底部按钮盒子
.demo-drawer__footer {
    float: right;
} 
// 添加老师抽屉输入框
/deep/ .el-input {
    width: 70%;
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
  margin: 10px 0 30px 0;
}
/*1.显示滚动条：当内容超出容器的时候，可以拖动：*/
/deep/ .el-drawer__body {
    overflow: auto;
    margin-bottom: 50px;
}

/*2.隐藏滚动条*/
/deep/ .el-drawer__container ::-webkit-scrollbar{
    display: none;
}
</style>