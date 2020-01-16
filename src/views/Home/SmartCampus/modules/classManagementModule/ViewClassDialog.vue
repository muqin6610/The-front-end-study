<template>
  <el-drawer
    :title="'爱华盈通高中/'+classObj.gradeVal+'/'+classObj.classVal"
    :visible.sync="classObj.classDrawer"
    size="50%">
    <div>
     <div class='top-box'>
       <p>班级名称: {{classObj.classVal}}</p>
       <p>班 主 任: {{ABC ? ABC : '未分配'}}</p>
     </div>
     <el-divider></el-divider>
     <div class='button-box'>
       <el-button type="primary" @click="innerDrawer = true">新增学生</el-button>
       <el-button>批量上传</el-button>
       <el-button>删除</el-button>
     </div>
     <div class='table-box'>
       <el-table
         :data="tableData"
         empty-text='暂无学生信息，请新增学生'
         @selection-change="handleSelectionChange"
         style="width: 100%">
         <el-table-column type="selection" width="55">
         </el-table-column>
         <el-table-column prop="date" label="照片" width="180">
         </el-table-column>
         <el-table-column prop="name" label="姓名" width="180">
         </el-table-column>
         <el-table-column prop="address" label="学号">
         </el-table-column>
         <el-table-column prop="address" label="宿舍">
         </el-table-column>
       </el-table>
     </div>
     <el-drawer
       title="新增学生"
       :append-to-body="true"
       :before-close="handleClose"
       :visible.sync="innerDrawer">
       <div class='tabs-box'>
         <el-tabs v-model="activeName">
           <el-tab-pane label="单个添加" name="first">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="sex">
                <el-radio v-model="ruleForm.sex" label="1">男</el-radio>
                <el-radio v-model="ruleForm.sex" label="2">女</el-radio>
              </el-form-item>
              <el-form-item label="学号" prop="studentID">
                <el-input v-model="ruleForm.studentID"></el-input>
              </el-form-item>
              <el-form-item label="住校" prop="LiveOnCampus">
                <el-switch
                  v-model="ruleForm.LiveOnCampus"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
              </el-form-item>
              <el-form-item label="宿舍" prop="dormRoom">
                <el-select v-model="ruleForm.dormRoom" placeholder="请选择宿舍">
                   <el-option
                     v-for="item in dormRoomDatas"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
                   </el-option>
                 </el-select>
              </el-form-item>
              <el-form-item label="照片" prop="photo">
                <el-image style="width: 300px;margin-top:30px" :src="this.imageUrl" fit="cover">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <el-button style='width:120px;'>选择照片</el-button>
                </el-upload>
              </el-form-item>
            </el-form>
           </el-tab-pane>
           <el-tab-pane label="批量添加" name="second">
             <span>批量上传仅支持ZPI格式文件，请将照片按照年级_班级_姓名_学号_宿舍.jpg命名</span>
             <div style='padding-top: 50px;'>
               <el-button style='width:120px;'>选择文件</el-button>
             </div>
           </el-tab-pane>
         </el-tabs>
       </div>
       <div class="demo-drawer__footer">
         <el-button @click="submitForm">取 消</el-button>
         <el-button type="primary" @click="resetForm('ruleForm')">确 定</el-button>
       </div>
     </el-drawer>
    </div>
  </el-drawer>
</template>

<script>
export default {
    props: {
      classObj: {
        classDrawer: {
          type: Boolean,
          default: false,
        },
        gradeVal: {
          type: String,
          default: '',
        },
        classVal: {
          type: String,
          default: '',
        }
      }
    },
    data() {
        let validateName = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入姓名'));
          } else {
            callback()
          }
        }
        var checkStudentID = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入学号'))
          } else {
            callback()
          }
        }
        return {
          // 嵌套盒子
          innerDrawer: false,  
          // 班主任
          ABC: '',
          // 默认选中的新增学生方式
          activeName: 'first',
          // 表单数据
            ruleForm: {
            name: '',
            sex: '',
            studentID: '',
            LiveOnCampus: '',
            dormRoom: '',
          },
          // 上传照片成功后的地址
          imageUrl: '',
          // 表格数据
          tableData: [
            // {
            //   date: '2016-05-02',
            //   name: '王小虎',
            //   address: '上海市普陀区金沙江路 1518 弄'
            // }, {
            //   date: '2016-05-04',
            //   name: '王小虎',
            //   address: '上海市普陀区金沙江路 1517 弄'
            // }, {
            //   date: '2016-05-01',
            //   name: '王小虎',
            //   address: '上海市普陀区金沙江路 1519 弄'
            // }, {
            //   date: '2016-05-03',
            //   name: '王小虎',
            //   address: '上海市普陀区金沙江路 1516 弄'
            // }
          ],
          // 宿舍数据
          dormRoomDatas: [{
            value: '选项1',
            label: '逸夫楼'
          }, {
            value: '选项2',
            label: '港三楼'
          }, {
            value: '选项3',
            label: '厚街楼'
          },],
          // 自定义验证
          rules: {
            name: [
              { required: true, validator: validateName, trigger: 'blur' }
            ],
            sex: [
              { required: true, message: '请选择性别', trigger: 'blur' }
            ],
            dormRoom: [
              { required: true, message: '请选择宿舍', trigger: 'blur' }
            ],
            studentID: [
              { required: true, validator: checkStudentID, trigger: 'blur' }
            ]
          }
        }
    },
    methods: {
        handleClose(done) {
          done()
        },
        handleSelectionChange(val) {
          this.multipleSelection = val
        },
        // 取消添加学生
        submitForm() {
          this.innerDrawer = false
        },
        // 确认添加学生
        resetForm(formName) {
          this.$refs[formName].resetFields()
        },
        // 照片上传成功
        handleAvatarSuccess(res, file) {
          this.imageUrl = URL.createObjectURL(file.raw)
        },
        // 照片上传时
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg'
          const isLt2M = file.size / 1024 / 1024 < 2

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!')
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!')
          }
          return isJPG && isLt2M
        }
    },
}
</script>

<style lang="scss" scoped>
// 班级信息抽屉标题
/deep/ .el-drawer__header {
    font-size: 30px;
    font-weight: bold;
    color: #21252b;
    border-bottom: 1px solid #cccccc;
}  
// 顶部盒子
.top-box {
  margin-left: 20px;
}
// 按钮盒子
.button-box {
  margin-left: 20px;
}
// 表格盒子
.table-box {
  margin: 20px 0 0 20px;
}
// tabs栏盒子
.tabs-box {
  margin-left: 20px;
  height: 92%;
}
// tabs栏文本
/deep/ .el-tabs__item {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
}
// 新增学生底部按钮盒子
.demo-drawer__footer {
    margin: 10px 20px 0 0;
    float: right;
} 
// 新增学生抽屉输入框
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
</style>