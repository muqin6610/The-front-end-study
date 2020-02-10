<template>
  <el-card 
    v-if='showPage'
    v-loading="loading" 
    element-loading-text="加载中..."
    element-loading-spinner="el-icon-loading" class="box-card">
    <p style='font-size:20px;font-weight:bold;'>新增警员</p>
    <div>
     <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row>
       <el-form-item label="照 片 :" prop="avatar">
          <!-- 照片显示区域 -->
       
          <div @click='clickImg' v-if='showCropper === false'>
             <img style='cursor:pointer;border:1px solid #dcdfe6;border-radius:5px' :src="getAvatarView(ruleForm.avatar)" width="100" height="100"/>
          </div>

          <!-- 裁剪区域 -->
          <Cropper v-if='showCropper' @sendFiles='sendFiles'/>
  
       </el-form-item>
      </el-row>
      <el-row :gutter="20">
       <el-col :span="7">
       <el-form-item label="姓 名:" prop="realname">
           <el-input
           auto-complete="new-password"
           style='width:220px;'
           placeholder="请输入姓名"
           v-model="ruleForm.realname"
           clearable>
           </el-input>
       </el-form-item>
       </el-col>
       <el-col :span="13">
       <el-form-item label="警员编号:" prop="policeCode">
         <el-tooltip class="item" effect="dark" content="警员编号创建后不能修改,只能删除此警员重建!" placement="top">
           <el-input
           auto-complete="new-password"
           style='width:220px;'
           placeholder="请输入警员编号"
           v-model="ruleForm.policeCode"
           clearable>
           </el-input>
        </el-tooltip>
       </el-form-item>
       </el-col>
      </el-row>
      <el-row :gutter="15">
       <el-col :span="7">
       <el-form-item label="年 龄:" prop="age">
          <el-input
           auto-complete="new-password"
           style='width:220px;'
           placeholder="请输入年龄"
           v-model="ruleForm.age"
           clearable>
           </el-input>
       </el-form-item>
       <!--<el-form-item label="生 日:" prop="age">
          <el-date-picker
            style='width:250px'
            align="right"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择生日"
            v-model="ruleForm.age">
          </el-date-picker>
       </el-form-item>-->
       </el-col>
       <el-col :span="8">
       <el-form-item label="账号密码:" prop="password">
           <el-input
           type="password"
           auto-complete='new-password'
           style='width:220px;'
           placeholder="请输入密码"
           v-model="ruleForm.password"
           clearable>
           </el-input>
       </el-form-item>
       </el-col>
      </el-row>
      <el-row :gutter="20">
       <el-col :span="7">
       <el-form-item label="职 级:" prop="rankCode">
           <el-select style='width:220px;' v-model="ruleForm.rankCode" clearable placeholder="请选择职级">
             <el-option
               v-for="item in ranks"
               :key="item.rankCode"
               :label="item.rankName"
               :value="item.rankCode">
             </el-option>
            </el-select>
       </el-form-item>
       </el-col>
       <el-col :span="13">
       <el-form-item label="确认密码:" prop="confirmpassword">
           <el-input
           auto-complete="new-password"
           type="password"
           style='width:220px;'
           placeholder="请输入密码"
           v-model="ruleForm.confirmpassword"
           clearable>
           </el-input>
       </el-form-item>
       </el-col>
       <el-col :span="13">
       <el-form-item label="权 限:" prop="selectedroles">
           <el-select style='width:220px;' v-model="ruleForm.selectedroles" >
              <el-option 
              v-for="item in jurisdictions" 
              :label="item.roleName" 
              :key="item.id" 
              :value="item.id">
              </el-option>
           </el-select>
       </el-form-item>
       </el-col>
      </el-row>
      <el-row>
        <el-form-item label="性 别:" prop="sex">
           <el-radio v-model="ruleForm.sex" label="1">男</el-radio>
           <el-radio v-model="ruleForm.sex" label="2">女</el-radio>
       </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="是否参训:" prop="entryTraining">
           <el-radio v-model="ruleForm.entryTraining" label="1">是</el-radio>
           <el-radio v-model="ruleForm.entryTraining" label="0">否</el-radio>
       </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="功能手:" prop="policeCategory">
           <el-checkbox-group v-if='trainingPoliceCategory.length' v-model="policeCategory">
              <el-checkbox v-for="item in trainingPoliceCategory" :label="item.value" :key="item.value" :value='item.value'>{{item.text}}</el-checkbox>
           </el-checkbox-group>
       </el-form-item>
      </el-row>
       <el-form-item>
         <el-button type="primary" @click='addPoliceUser("ruleForm")'>提交</el-button>
         <el-button @click='abrogate'>取消</el-button>
       </el-form-item>  
     </el-form>
    </div>
  </el-card>
</template>

<script>
  import Cropper from "./modules/cropper.vue"
  import { MessageBox,Message } from 'element-ui'
  import { getStore } from '@/utils/storage.js'

export default {
  components: {
      Cropper
    },
    data() {
        let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.confirmpassword !== '') {
            this.$refs.ruleForm.validateField('confirmpassword');
          }
          callback();
        }
        };
        let validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.ruleForm.password) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
        let validateCategory = (rule, value, callback) => {
          if (this.policeCategory.length === 0) {
            callback(new Error('请选择功能手!'))
          }else {
            callback();
          }
        };
        return {
          //页面的显示隐藏
          showPage:false,
          //显示裁剪区域
          showCropper:true,
          //加载效果
          loading:false,
          //图片上传保存地址
           picUrl:'',
           //控制照片上传区域的显示和隐藏
           uploadLoading:false,
           //职级数据
           ranks:[],
           //权限数据
           jurisdictions:[],
           //字典查询-训练功能手
           trainingPoliceCategory:[],
           //表单数据
           ruleForm: {
             //真实姓名
             realname:'',
             //警员编号
             policeCode:'',
             //职级
             rankCode:[],
             //年龄
             age:'',
             //密码
             password:'',
             //确认密码
             confirmpassword:'',
             //角色权限
             selectedroles:'',
             //性别
             sex:'',
             //是否参训
             entryTraining:'',
             //功能手
             policeCategory:[],
             //头像url
             avatar:'', 
             //部门id
             selecteddeparts:'',
          },
          //功能手
          policeCategory:[],
          rules: {
           realname: [{ required: true, message: '请输入姓名', trigger: 'blur' },],
           avatar: [{ required: true, message: '请输上传照片', trigger: 'blur' },],
           age: [{ required: true,message: '请输入年龄', trigger: 'blur' },],
           // age: [{ required: true,message: '请选择生日', trigger: 'blur' },],
           policeCode: [{ required: true,validator: this.validateUsername, trigger: 'blur' },],
           password: [{ required: true,validator: validatePass, trigger: 'blur' },],
           confirmpassword: [{ required: true,validator: validatePass2, trigger: 'blur' },],
           rankCode: [{ required: true, message: '请选择职级', trigger: 'blur' },],
           sex: [{ required: true, message: '请选择性别', trigger: 'change' },],
           entryTraining: [{ required: true, message: '请选择是否参训', trigger: 'change' },],
           selectedroles: [{ required: true, message: '请选择角色权限', trigger: 'change' },],
           policeCategory: [{ required: true, validator: validateCategory, trigger: 'change' },],
          },
        }
    },
    created () {
      this.showPage = true
      this.showCropper = true
      this.getRankInfo()
      this.getRole()
    },
    computed:{

    },
    watch: {
      //监听路由是否变化
      '$route' (to, from) {
       this.showCropper = true
       this.showPage = true
      }
    },
    methods: {
      //获取职级数据
       getRankInfo(){
  
      },
      //获取权限角色数据
      getRole(){

      },
      //裁剪框传过来的值,data:图片地址,buer:裁剪框显示隐藏的布尔值
      sendFiles(data,buer){
        this.showCropper = buer
        this.ruleForm.avatar = data
      },
      //点击照片显示区域重新打开裁剪区域
      clickImg(){
        MessageBox.confirm('你确定要重新选择照片吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //打开裁剪区域
           this.showCropper = 1
        }).catch(() => {
          Message({
            type: 'info',
            message: '已取消选择'
          });          
        });
      },
      //点击取消重置数据并返回上级页面
      abrogate(){
        this.$router.go(-1)
        this.$refs.ruleForm.resetFields()
        this.policeCategory = []
        this.showCropper = false
        this.showPage = false
      },
      //新增警员
      async addPoliceUser(formName){
        this.$refs[formName].validate(async  (valid) => {
          if (valid) {
            if(this.policeCategory.length){
              this.ruleForm.policeCategory = this.policeCategory.join(',')
            }else {
              this.$message.warning('功能手不能为空!')
              return
            }
            //获取部门id
            let departId = getStore("departId")
            this.ruleForm.selecteddeparts = departId
          } 
        })
      },
      //警员编号验证是否重复
      validateUsername(rule, value, callback){
        if(!value){
          callback(new Error('请输入警员编号!'))
        }else{
          if(new RegExp(/[\u4E00-\u9FA5]/g).test(value)){
            callback("警员编号不能是中文!")
          }else if(new RegExp(/[^\u4e00-\u9fa5]+/).test(value)){
              let params = {
                tableName: 'sys_user',
                fieldName: 'username',
                fieldVal: value,
                dataId: this.userId
              };
              duplicateCheck(params).then((res) => {
                if (res.success) {
                callback()
              } else {
                callback("警员编号已存在!")
              }
            })
          }
        }
      },
    }
}
</script>

<style lang="scss" scoped>

</style>