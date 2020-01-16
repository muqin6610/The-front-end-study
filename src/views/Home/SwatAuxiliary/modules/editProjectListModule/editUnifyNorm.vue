<template>
  <div>
   <p class='myform'>考核标准</p>
   <el-row :gutter="10">
     <el-col :span="5">
      <el-form-item label="优秀成绩:">
       <el-input @blur='blurResult' size='small' placeholder="请输入成绩" v-model="projectAssessmentCriteriaList[0].resultStart" clearable></el-input>
      </el-form-item>
      <el-form-item label="良好成绩:">
       <el-input @blur='blurResult' size='small' placeholder="请输入成绩" v-model="projectAssessmentCriteriaList[1].resultStart" clearable></el-input>
      </el-form-item>
      <el-form-item label="合格成绩:">
       <el-input @blur='blurResult' size='small' placeholder="请输入成绩" v-model="projectAssessmentCriteriaList[2].resultStart" clearable></el-input>
      </el-form-item>
     </el-col>
     <el-col :span="5">
      <el-form-item label="分数:">
       <el-input @blur='blurResult' size='small' placeholder="请输入分数" v-model="projectAssessmentCriteriaList[0].resultEnd" clearable></el-input>
      </el-form-item>
      <el-form-item label="分数:">
       <el-input @blur='blurResult' size='small' placeholder="请输入分数" v-model="projectAssessmentCriteriaList[1].resultEnd" clearable></el-input>
      </el-form-item>
      <el-form-item label="分数:">
       <el-input @blur='blurResult' size='small' placeholder="请输入分数" v-model="projectAssessmentCriteriaList[2].resultEnd" clearable></el-input>
      </el-form-item>
     </el-col>
   </el-row>
  </div>
</template>

<script>
export default {
    data() {
        return {
          //成绩和分数
          projectAssessmentCriteriaList:[
            {resultStart:'',"sex":"1","examGrade":"1","resultEnd":""},
            {resultStart:'',"sex":"1","examGrade":"1","resultEnd":""},
            {resultStart:'',"sex":"1","examGrade":"1","resultEnd":""},
          ]
        }
    },
    created() {
        
    },
    methods: {
        //输入成绩或分数
        blurResult(){
            //传值给父组件
            this.$emit('sendUnify',this.projectAssessmentCriteriaList)
        },
    },
}
</script>

<style lang="scss" scoped>
/**考核成绩输入框的文字描述 */
  .myform {
    padding-left:25px;
  }
</style>