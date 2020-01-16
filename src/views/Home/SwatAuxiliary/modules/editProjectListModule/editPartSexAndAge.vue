<template>
  <div>
        <p class='myform'>考核标准&nbsp;&nbsp;男性25岁以下</p>
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
        <p class='myform'>考核标准&nbsp;&nbsp;男性26-29</p>
        <el-row :gutter="10">
          <el-col :span="5">
           <el-form-item label="优秀成绩:">
            <el-input @blur='blurResult' size='small' placeholder="请输入成绩" v-model="projectAssessmentCriteriaList[3].resultStart" clearable></el-input>
           </el-form-item>
           <el-form-item label="良好成绩:">
            <el-input @blur='blurResult' size='small' placeholder="请输入成绩" v-model="projectAssessmentCriteriaList[4].resultStart" clearable></el-input>
           </el-form-item>
           <el-form-item label="合格成绩:">
            <el-input size='small' placeholder="请输入成绩" v-model="projectAssessmentCriteriaList[5].resultStart" clearable></el-input>
           </el-form-item>
          </el-col>
          <el-col :span="5">
           <el-form-item label="分数:">
            <el-input @blur='blurResult' size='small' placeholder="请输入分数" v-model="projectAssessmentCriteriaList[3].resultEnd" clearable></el-input>
           </el-form-item>
           <el-form-item label="分数:">
            <el-input @blur='blurResult' size='small' placeholder="请输入分数" v-model="projectAssessmentCriteriaList[4].resultEnd" clearable></el-input>
           </el-form-item>
           <el-form-item label="分数:">
            <el-input @blur='blurResult' size='small' placeholder="请输入分数" v-model="projectAssessmentCriteriaList[5].resultEnd" clearable></el-input>
           </el-form-item>
          </el-col>
        </el-row>
        <p class='myform'>考核标准&nbsp;&nbsp;男性30-35</p>
        <el-row :gutter="10">
          <el-col :span="5">
           <el-form-item label="优秀成绩:">
            <el-input @blur='blurResult' size='small' placeholder="请输入成绩" v-model="projectAssessmentCriteriaList[6].resultStart" clearable></el-input>
           </el-form-item>
           <el-form-item label="良好成绩:">
            <el-input @blur='blurResult' size='small' placeholder="请输入成绩" v-model="projectAssessmentCriteriaList[7].resultStart" clearable></el-input>
           </el-form-item>
           <el-form-item label="合格成绩:">
            <el-input @blur='blurResult' size='small' placeholder="请输入成绩" v-model="projectAssessmentCriteriaList[8].resultStart" clearable></el-input>
           </el-form-item>
          </el-col>
          <el-col :span="5">
           <el-form-item label="分数:">
            <el-input @blur='blurResult' size='small' placeholder="请输入分数" v-model="projectAssessmentCriteriaList[6].resultEnd" clearable></el-input>
           </el-form-item>
           <el-form-item label="分数:">
            <el-input @blur='blurResult' size='small' placeholder="请输入分数" v-model="projectAssessmentCriteriaList[7].resultEnd" clearable></el-input>
           </el-form-item>
           <el-form-item label="分数:">
            <el-input @blur='blurResult' size='small' placeholder="请输入分数" v-model="projectAssessmentCriteriaList[8].resultEnd" clearable></el-input>
           </el-form-item>
          </el-col>
        </el-row>
        <p class='myform'>考核标准&nbsp;&nbsp;男性36-40</p>
        <el-row :gutter="10">
          <el-col :span="5">
           <el-form-item label="优秀成绩:">
            <el-input @blur='blurResult' size='small' placeholder="请输入成绩" v-model="projectAssessmentCriteriaList[9].resultStart" clearable></el-input>
           </el-form-item>
           <el-form-item label="良好成绩:">
            <el-input @blur='blurResult' size='small' placeholder="请输入成绩" v-model="projectAssessmentCriteriaList[10].resultStart" clearable></el-input>
           </el-form-item>
           <el-form-item label="合格成绩:">
            <el-input @blur='blurResult' size='small' placeholder="请输入成绩" v-model="projectAssessmentCriteriaList[11].resultStart" clearable></el-input>
           </el-form-item>
          </el-col>
          <el-col :span="5">
           <el-form-item label="分数:">
            <el-input @blur='blurResult' size='small' placeholder="请输入分数" v-model="projectAssessmentCriteriaList[9].resultEnd" clearable></el-input>
           </el-form-item>
           <el-form-item label="分数:">
            <el-input @blur='blurResult' size='small' placeholder="请输入分数" v-model="projectAssessmentCriteriaList[10].resultEnd" clearable></el-input>
           </el-form-item>
           <el-form-item label="分数:">
            <el-input @blur='blurResult' size='small' placeholder="请输入分数" v-model="projectAssessmentCriteriaList[11].resultEnd" clearable></el-input>
           </el-form-item>
          </el-col>
        </el-row>
        <p class='myform'>考核标准&nbsp;&nbsp;男性41-45</p>
        <el-row :gutter="10">
          <el-col :span="5">
           <el-form-item label="优秀成绩:">
            <el-input @blur='blurResult' size='small' placeholder="请输入成绩" v-model="projectAssessmentCriteriaList[12].resultStart" clearable></el-input>
           </el-form-item>
           <el-form-item label="良好成绩:">
            <el-input @blur='blurResult' size='small' placeholder="请输入成绩" v-model="projectAssessmentCriteriaList[13].resultStart" clearable></el-input>
           </el-form-item>
           <el-form-item label="合格成绩:">
            <el-input @blur='blurResult' size='small' placeholder="请输入成绩" v-model="projectAssessmentCriteriaList[14].resultStart" clearable></el-input>
           </el-form-item>
          </el-col>
          <el-col :span="5">
           <el-form-item label="分数:">
            <el-input @blur='blurResult' size='small' placeholder="请输入分数" v-model="projectAssessmentCriteriaList[12].resultEnd" clearable></el-input>
           </el-form-item>
           <el-form-item label="分数:">
            <el-input @blur='blurResult' size='small' placeholder="请输入分数" v-model="projectAssessmentCriteriaList[13].resultEnd" clearable></el-input>
           </el-form-item>
           <el-form-item label="良好:">
            <el-input @blur='blurResult' size='small' placeholder="请输入分数" v-model="projectAssessmentCriteriaList[14].resultEnd" clearable></el-input>
           </el-form-item>
          </el-col>
        </el-row>
        <p class='myform'>考核标准&nbsp;&nbsp;男性46-50</p>
        <el-row :gutter="10">
          <el-col :span="5">
           <el-form-item label="优秀成绩:">
            <el-input @blur='blurResult' size='small' placeholder="请输入成绩" v-model="projectAssessmentCriteriaList[15].resultStart" clearable></el-input>
           </el-form-item>
           <el-form-item label="良好成绩:">
            <el-input @blur='blurResult' size='small' placeholder="请输入成绩" v-model="projectAssessmentCriteriaList[16].resultStart" clearable></el-input>
           </el-form-item>
           <el-form-item label="合格成绩:">
            <el-input @blur='blurResult' size='small' placeholder="请输入成绩" v-model="projectAssessmentCriteriaList[17].resultStart" clearable></el-input>
           </el-form-item>
          </el-col>
          <el-col :span="5">
           <el-form-item label="分数:">
            <el-input @blur='blurResult' size='small' placeholder="请输入分数" v-model="projectAssessmentCriteriaList[15].resultEnd" clearable></el-input>
           </el-form-item>
           <el-form-item label="分数:">
            <el-input @blur='blurResult' size='small' placeholder="请输入分数" v-model="projectAssessmentCriteriaList[16].resultEnd" clearable></el-input>
           </el-form-item>
           <el-form-item label="分数:">
            <el-input @blur='blurResult' size='small' placeholder="请输入分数" v-model="projectAssessmentCriteriaList[17].resultEnd" clearable></el-input>
           </el-form-item>
          </el-col>
        </el-row>
        <p class='myform' style='margin-top:30px'>考核标准&nbsp;&nbsp;女性30岁以下</p>
        <el-row :gutter="10">
          <el-col :span="5">
           <el-form-item label="优秀成绩:">
            <el-input @blur='blurResult' size='small' placeholder="请输入成绩" v-model="projectAssessmentCriteriaList[18].resultStart" clearable></el-input>
           </el-form-item>
           <el-form-item label="良好成绩:">
            <el-input @blur='blurResult' size='small' placeholder="请输入成绩" v-model="projectAssessmentCriteriaList[19].resultStart" clearable></el-input>
           </el-form-item>
           <el-form-item label="合格成绩:">
            <el-input @blur='blurResult' size='small' placeholder="请输入成绩" v-model="projectAssessmentCriteriaList[20].resultStart" clearable></el-input>
           </el-form-item>
          </el-col>
          <el-col :span="5">
           <el-form-item label="分数:">
            <el-input @blur='blurResult' size='small' placeholder="请输入分数" v-model="projectAssessmentCriteriaList[18].resultEnd" clearable></el-input>
           </el-form-item>
           <el-form-item label="分数:">
            <el-input @blur='blurResult' size='small' placeholder="请输入分数" v-model="projectAssessmentCriteriaList[19].resultEnd" clearable></el-input>
           </el-form-item>
           <el-form-item label="分数:">
            <el-input @blur='blurResult' size='small' placeholder="请输入分数" v-model="projectAssessmentCriteriaList[20].resultEnd" clearable></el-input>
           </el-form-item>
          </el-col>
        </el-row>
        <p class='myform'>考核标准&nbsp;&nbsp;女性31-35</p>
        <el-row :gutter="10">
          <el-col :span="5">
           <el-form-item label="优秀成绩:">
            <el-input @blur='blurResult' size='small' placeholder="请输入成绩" v-model="projectAssessmentCriteriaList[21].resultStart" clearable></el-input>
           </el-form-item>
           <el-form-item label="良好成绩:">
            <el-input @blur='blurResult' size='small' placeholder="请输入成绩" v-model="projectAssessmentCriteriaList[22].resultStart" clearable></el-input>
           </el-form-item>
           <el-form-item label="合格成绩:">
            <el-input @blur='blurResult' size='small' placeholder="请输入成绩" v-model="projectAssessmentCriteriaList[23].resultStart" clearable></el-input>
           </el-form-item>
          </el-col>
          <el-col :span="5">
           <el-form-item label="分数:">
            <el-input @blur='blurResult' size='small' placeholder="请输入分数" v-model="projectAssessmentCriteriaList[21].resultEnd" clearable></el-input>
           </el-form-item>
           <el-form-item label="分数:">
            <el-input @blur='blurResult' size='small' placeholder="请输入分数" v-model="projectAssessmentCriteriaList[22].resultEnd" clearable></el-input>
           </el-form-item>
           <el-form-item label="分数:">
            <el-input @blur='blurResult' size='small' placeholder="请输入分数" v-model="projectAssessmentCriteriaList[23].resultEnd" clearable></el-input>
           </el-form-item>
          </el-col>
        </el-row>
        <p class='myform'>考核标准&nbsp;&nbsp;女性36-40</p>
        <el-row :gutter="10">
          <el-col :span="5">
           <el-form-item label="优秀成绩:">
            <el-input @blur='blurResult' size='small' placeholder="请输入成绩" v-model="projectAssessmentCriteriaList[24].resultStart" clearable></el-input>
           </el-form-item>
           <el-form-item label="良好成绩:">
            <el-input @blur='blurResult' size='small' placeholder="请输入成绩" v-model="projectAssessmentCriteriaList[25].resultStart" clearable></el-input>
           </el-form-item>
           <el-form-item label="合格成绩:">
            <el-input @blur='blurResult' size='small' placeholder="请输入成绩" v-model="projectAssessmentCriteriaList[26].resultStart" clearable></el-input>
           </el-form-item>
          </el-col>
          <el-col :span="5">
           <el-form-item label="分数:">
            <el-input @blur='blurResult' size='small' placeholder="请输入分数" v-model="projectAssessmentCriteriaList[24].resultEnd" clearable></el-input>
           </el-form-item>
           <el-form-item label="分数:">
            <el-input @blur='blurResult' size='small' placeholder="请输入分数" v-model="projectAssessmentCriteriaList[25].resultEnd" clearable></el-input>
           </el-form-item>
           <el-form-item label="分数:">
            <el-input @blur='blurResult' size='small' placeholder="请输入分数" v-model="projectAssessmentCriteriaList[26].resultEnd" clearable></el-input>
           </el-form-item>
          </el-col>
        </el-row>
        <p class='myform'>考核标准&nbsp;&nbsp;女性41-45</p>
        <el-row :gutter="10">
          <el-col :span="5">
           <el-form-item label="优秀成绩:">
            <el-input @blur='blurResult' size='small' placeholder="请输入成绩" v-model="projectAssessmentCriteriaList[27].resultStart" clearable></el-input>
           </el-form-item>
           <el-form-item label="良好成绩:">
            <el-input @blur='blurResult' size='small' placeholder="请输入成绩" v-model="projectAssessmentCriteriaList[28].resultStart" clearable></el-input>
           </el-form-item>
           <el-form-item label="合格成绩:">
            <el-input @blur='blurResult' size='small' placeholder="请输入成绩" v-model="projectAssessmentCriteriaList[29].resultStart" clearable></el-input>
           </el-form-item>
          </el-col>
          <el-col :span="5">
           <el-form-item label="分数:">
            <el-input @blur='blurResult' size='small' placeholder="请输入分数" v-model="projectAssessmentCriteriaList[27].resultEnd" clearable></el-input>
           </el-form-item>
           <el-form-item label="分数:">
            <el-input @blur='blurResult' size='small' placeholder="请输入分数" v-model="projectAssessmentCriteriaList[28].resultEnd" clearable></el-input>
           </el-form-item>
           <el-form-item label="分数:">
            <el-input @blur='blurResult' size='small' placeholder="请输入分数" v-model="projectAssessmentCriteriaList[29].resultEnd" clearable></el-input>
           </el-form-item>
          </el-col>
        </el-row>
        <p class='myform'>考核标准&nbsp;&nbsp;女性46-50</p>
        <el-row :gutter="10">
          <el-col :span="5">
           <el-form-item label="优秀成绩:">
            <el-input @blur='blurResult' size='small' placeholder="请输入成绩" v-model="projectAssessmentCriteriaList[30].resultStart" clearable></el-input>
           </el-form-item>
           <el-form-item label="良好成绩:">
            <el-input @blur='blurResult' size='small' placeholder="请输入成绩" v-model="projectAssessmentCriteriaList[31].resultStart" clearable></el-input>
           </el-form-item>
           <el-form-item label="合格成绩:">
            <el-input @blur='blurResult' size='small' placeholder="请输入成绩" v-model="projectAssessmentCriteriaList[32].resultStart" clearable></el-input>
           </el-form-item>
          </el-col>
          <el-col :span="5">
           <el-form-item label="分数:">
            <el-input @blur='blurResult' size='small' placeholder="请输入分数" v-model="projectAssessmentCriteriaList[30].resultEnd" clearable></el-input>
           </el-form-item>
           <el-form-item label="分数:">
            <el-input @blur='blurResult' size='small' placeholder="请输入分数" v-model="projectAssessmentCriteriaList[31].resultEnd" clearable></el-input>
           </el-form-item>
           <el-form-item label="分数:">
            <el-input @blur='blurResult' size='small' placeholder="请输入分数" v-model="projectAssessmentCriteriaList[32].resultEnd" clearable></el-input>
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
            {resultStart:'',"sex":"1","ageStart":"0","ageEnd":"25","examGrade":"1","resultEnd":""},
            {resultStart:'',"sex":"1","ageStart":"0","ageEnd":"25","examGrade":"2","resultEnd":""},
            {resultStart:'',"sex":"1","ageStart":"0","ageEnd":"25","examGrade":"3","resultEnd":""},
            {resultStart:'',"sex":"1","ageStart":"26","ageEnd":"30","examGrade":"1","resultEnd":""},
            {resultStart:'',"sex":"1","ageStart":"26","ageEnd":"30","examGrade":"2","resultEnd":""},
            {resultStart:'',"sex":"1","ageStart":"26","ageEnd":"30","examGrade":"3","resultEnd":""},
            {resultStart:'',"sex":"1","ageStart":"31","ageEnd":"35","examGrade":"1","resultEnd":""},
            {resultStart:'',"sex":"1","ageStart":"31","ageEnd":"35","examGrade":"2","resultEnd":""},
            {resultStart:'',"sex":"1","ageStart":"31","ageEnd":"35","examGrade":"3","resultEnd":""},
            {resultStart:'',"sex":"1","ageStart":"36","ageEnd":"40","examGrade":"1","resultEnd":""},
            {resultStart:'',"sex":"1","ageStart":"36","ageEnd":"40","examGrade":"2","resultEnd":""},
            {resultStart:'',"sex":"1","ageStart":"36","ageEnd":"40","examGrade":"3","resultEnd":""},
            {resultStart:'',"sex":"1","ageStart":"41","ageEnd":"45","examGrade":"1","resultEnd":""},
            {resultStart:'',"sex":"1","ageStart":"41","ageEnd":"45","examGrade":"2","resultEnd":""},
            {resultStart:'',"sex":"1","ageStart":"41","ageEnd":"45","examGrade":"3","resultEnd":""},
            {resultStart:'',"sex":"1","ageStart":"46","ageEnd":"50","examGrade":"1","resultEnd":""},
            {resultStart:'',"sex":"1","ageStart":"46","ageEnd":"50","examGrade":"2","resultEnd":""},
            {resultStart:'',"sex":"1","ageStart":"46","ageEnd":"50","examGrade":"3","resultEnd":""},
            {resultStart:'',"sex":"2","ageStart":"0","ageEnd":"30","examGrade":"1","resultEnd":""},
            {resultStart:'',"sex":"2","ageStart":"0","ageEnd":"30","examGrade":"2","resultEnd":""},
            {resultStart:'',"sex":"2","ageStart":"0","ageEnd":"30","examGrade":"3","resultEnd":""},
            {resultStart:'',"sex":"2","ageStart":"31","ageEnd":"35","examGrade":"1","resultEnd":""},
            {resultStart:'',"sex":"2","ageStart":"31","ageEnd":"35","examGrade":"2","resultEnd":""},
            {resultStart:'',"sex":"2","ageStart":"31","ageEnd":"35","examGrade":"3","resultEnd":""},
            {resultStart:'',"sex":"2","ageStart":"36","ageEnd":"40","examGrade":"1","resultEnd":""},
            {resultStart:'',"sex":"2","ageStart":"36","ageEnd":"40","examGrade":"2","resultEnd":""},
            {resultStart:'',"sex":"2","ageStart":"36","ageEnd":"40","examGrade":"3","resultEnd":""},
            {resultStart:'',"sex":"2","ageStart":"41","ageEnd":"45","examGrade":"1","resultEnd":""},
            {resultStart:'',"sex":"2","ageStart":"41","ageEnd":"45","examGrade":"2","resultEnd":""},
            {resultStart:'',"sex":"2","ageStart":"41","ageEnd":"45","examGrade":"3","resultEnd":""},
            {resultStart:'',"sex":"2","ageStart":"46","ageEnd":"50","examGrade":"1","resultEnd":""},
            {resultStart:'',"sex":"2","ageStart":"46","ageEnd":"50","examGrade":"2","resultEnd":""},
            {resultStart:'',"sex":"2","ageStart":"46","ageEnd":"50","examGrade":"3","resultEnd":""}
          ]
        }
    },
    created() {
        
    },
    methods: {
        //输入成绩或分数
        blurResult(){
            //传值给父组件
            this.$emit('sendPartSexAge',this.projectAssessmentCriteriaList)
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