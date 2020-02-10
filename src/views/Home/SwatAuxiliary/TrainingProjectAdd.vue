<template>
  <div>
  <el-card>
    <h3>新增项目</h3>
  </el-card>
  <el-card  class='mycard'>
    <div slot="header" class="clearfix">
      <span class='mycard-title'>项目类型</span>
    </div>
    <el-form label-position="top" :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row :gutter="24">
        <el-col :span="8">
          <el-form-item label="项目分类" prop="password">
            <el-select style='width:80%' v-model="ruleForm.password" placeholder="请选择项目分类">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目类型" prop="password">
            <el-select style='width:80%' v-model="ruleForm.password" placeholder="请选择项目类型">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目类别" prop="password">
            <el-select style='width:80%' v-model="ruleForm.password" placeholder="请选择项目类别">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="8">
          <el-form-item label="训练内容" prop="age">
            <el-input style='width:80%' v-model.number="ruleForm.age" placeholder="请输入训练内容"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="训练功能手" prop="policeCategory">
            <el-checkbox-group v-model="ruleForm.policeCategory">
              <el-checkbox v-for="item in policeCategoryData" :label="item.value" :key="item.value">{{item.text}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="考核标准" prop="assessmentCriterion">
            <el-select @change='changeCriterion' style='width:80%' v-model="ruleForm.assessmentCriterion" placeholder="请选择考核标准">
              <el-option
                v-for="item in examModeData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!--区分性别和年龄-->
      <EditPartSexAndAge v-if='showSexAndAge' @sendPartSexAge='sendPartSexAge'/>
      <!--区分性别-->
      <EditPartSex v-if='showSex' @sendPartSex='sendPartSex'/>
      <!--统一标准-->
      <EditUnifyNorm v-if='showUnify' @sendUnify='sendUnify'/>
    </el-form>
  </el-card>
    <div class='footer-button-box'>
      <el-button type="primary">提交</el-button>
      <el-button @click='abrogate'>取消</el-button>
    </div>
  </div>
</template>

<script>
  import EditPartSexAndAge from './modules/editProjectListModule/editPartSexAndAge.vue'
  import EditPartSex from './modules/editProjectListModule/editPartSex.vue'
  import EditUnifyNorm from './modules/editProjectListModule/editUnifyNorm.vue'

  export default {
    components:{
      EditPartSexAndAge,
      EditPartSex,
      EditUnifyNorm,
    },
    data () {
      return {
        //区分年龄和性别的组件
        showSexAndAge:false,
        //区分性别的组件
        showSex:false,
        //统一标准的组件
        showUnify:false,
        ruleForm: {
          pass: '',
          checkPass: '',
          age: '',
          policeCategory: [],
          assessmentCriterion: '',
        },
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        //考核标准
        examModeData:[
          {value:'A1',label:'分男女、年龄'},
          {value:'A2',label:'分男女'},
          {value:'A3',label:'统一标准'},
          {value:'A4',label:'主观评分'},
        ],
        //功能手数据
        policeCategoryData:[],
      }
    },

    created () {
      this.getCategoryData()
    },
    methods: {
      // 获取功能手数据
      getCategoryData() {
        this.policeCategoryData = [
          {value:'1', text:'突击手'},
          {value:'2', text:'指挥官'},
          {value:'3', text:'无人机手'},
        ]
      },
      //选择考核标准
      changeCriterion(){
        switch(this.ruleForm.assessmentCriterion){
          case 'A1' :
            this.showSexAndAge = true
            this.showSex= false
            this.showUnify = false
          break
          case 'A2' :
            this.showSex= true
            this.showSexAndAge = false
            this.showUnify = false
          break
          case 'A3' :
            this.showUnify = true
            this.showSex= false
            this.showSexAndAge = false
          break
          case 'A4' :
            this.showUnify = false
            this.showSex= false
            this.showSexAndAge = false
          break
        }
      },
      //统一标准输入值
      sendUnify(data){
        console.log(data,'统一标准值')
      },
      //区分年龄和性别
      sendPartSexAge(data){
        console.log(data,'区分年龄和性别值')
      },
      //区分性别
      sendPartSex(data){
        console.log(data,'区分性别值')
      },
      //点击取消重置数据并返回上级页面
      abrogate(){
        this.$router.go(-1)
        this.$refs.ruleForm.resetFields()
      },
    }
  }
</script>

<style lang='scss' scoped>
// 卡片
.mycard {
  margin: 10px;
}
// 卡片标题
.mycard-title {
  font-weight: bold;
}
// 底部按钮盒子
.footer-button-box {
  margin: 30px 0 30px 20px;
}
</style>