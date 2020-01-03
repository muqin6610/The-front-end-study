<template>
  <el-card class="box-card">
    <p class='box-card-title'>新增部队</p>
    <div>
     <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
       <el-form-item label="队 徽 :" prop="departAvatar">
         <el-upload
            listType="picture-card"
            :showUploadList="false"
            action="https://jsonplaceholder.typicode.com/posts/"
            :data="{'isup':1}"
            :beforeUpload="beforeUpload"
            @change="handleChange"
          >
            <img v-if="picUrl" :src="picUrl" alt="头像" style="height:104px;max-width:300px"/>
            <div v-else>
              <i class="el-icon-plus"></i>
            </div>
          </el-upload>
       </el-form-item>
       <el-form-item label="部队职级:">
         <el-radio-group :border='true' v-model="selectTroopsRank">
         <el-radio-button v-for='item in troopsRank' :label="item"></el-radio-button>
         </el-radio-group>
       </el-form-item>
       <el-form-item label="归 属:" prop='parentId'>
         <el-select style="width:300px" v-model="ruleForm.parentId" clearable placeholder="请选择归属">
           <el-option
             v-for="item in affiliation"
             :key="item.id"
             :label="item.departName"
             :value="item.id">
           </el-option>
         </el-select>
       </el-form-item>
       <el-form-item label="队 名:" prop='departName'>
         <el-input
           style='width:300px;'
           placeholder="请输入队名  "
           v-model="ruleForm.departName"
           clearable>
         </el-input>
       </el-form-item>
       <el-form-item style='margin:50px 0 200px 0;'>
         <el-button @click='addDepartList("ruleForm")' type="primary">提交</el-button>
         <el-button @click='abrogate'>取消</el-button>
       </el-form-item>  
     </el-form>
    </div>
  </el-card>
</template>

<script>


export default {
    data() {
        return {
           //图片上传保存地址
           picUrl:'',
           //控制照片上传区域的显示和隐藏
           uploadLoading:false,
           //所有的部队数据
           detachment:[],
           //大队数据
           Battalion:[],
           //选中的部队职级
           selectTroopsRank:'',
           //部队职级数据源
           troopsRank:['大队','中队','分队'],
           //归属数据源
           affiliation:[],
           ruleForm: {
             //选中的归属
             parentId:'',
             //上传的图片地址
             departAvatar: '',
             //队名
             departName:'',
          },
        }
    },
    created () {
      //页面打开调用获取所有队伍数据的方法
      this.getQueryIdTreeList();
    },
    computed:{

    },
    watch: {
      //监听路由是否变化
      '$route' (to, from) {
        //路由发生变化调用获取所有队伍数据的方法
        this.getQueryIdTreeList()
      },
      // 监听选择职级
      selectTroopsRank(newVal,oldVal) {
        if(oldVal != newVal) {
          this.affiliation = []
          if(this.selectTroopsRank === '大队'){
            this.ruleForm.parentId = ''
            //归属支队
            this.affiliation = this.detachment
          }else if(this.selectTroopsRank === '中队'){
            this.ruleForm.parentId = ''
            //归属大队
            this.affiliation = this.Battalion
          }else if(this.selectTroopsRank === '分队'){
            this.ruleForm.parentId = ''
            //归属中队
             for(let i = 0;i < this.Battalion.length;i++){
              if(this.Battalion[i].children != null){
                for(let j = 0;j < this.Battalion[i].children.length;j++){
                   this.affiliation.push(this.Battalion[i].children[j])
                 }
              }
             }
             console.log(this.affiliation)
          }
        }
      }
    },
    methods: {
       //获取所有队伍的数据
      getQueryIdTreeList(){
        // 所有部队数据
        this.detachment = [
          {id:'0',departName:'第一支队',children: [
            {id:'1',departName:'第一大队',children:[
            {id:'11',departName:'第一大队第一中队'},
            ] 
            },
            {id:'2',departName:'第二大队',children:[
              {id:'22',departName:'第二大队第一中队'},
            ]},
            {id:'3',departName:'第三大队',children:[
              {id:'33',departName:'第三大队第一中队'},
            ]},
          ]}
        ]
        // 大队数据
        this.Battalion = [
          {id:'1',departName:'第一大队',children:[
            {id:'11',departName:'第一大队第一中队'},
          ] 
          },
          {id:'2',departName:'第二大队',children:[
            {id:'22',departName:'第二大队第一中队'},
          ]},
          {id:'3',departName:'第三大队',children:[
            {id:'33',departName:'第三大队第一中队'},
          ]},
        ]
      },
      //照片上传前的钩子
      beforeUpload: function(file){
        let fileType = file.type
        if(fileType.indexOf('image') < 0){
          this.$message.warning('请上传图片')
          return false
        }
        //验证文件大小
        const isLt2M = file.size / 1024 / 1024 < 3
        if(!isLt2M){
          this.$message.warning('上传图片请不要超过3M')
          return false
        }
      },
      //照片上传的回调
      handleChange (info) {
        this.picUrl = ""
        if (info.file.status === 'uploading') {
          this.uploadLoading = true;
          return
        }
        if (info.file.status === 'done') {
          let response = info.file.response;
          this.uploadLoading = false;
          console.log(response);
          if(response.success){
            this.ruleForm.departAvatar = response.message;
            this.picUrl = "Has no pic url yet";
          }else{
            this.$message.warning(response.message);
          }
        }
      },
      //点击新增部队,提交数据完毕返回特警部队管理页面
      addDepartList(formName){
         this.$refs[formName].validate(async  (valid) => {
          if (valid) {
            // for(let i = 0;i < this.affiliation.length;i++){}
            // 提交数据
            let res = await httpAction(this.url.add,this.ruleForm,'post')
            if(res.success){
              this.$message.success(res.message)
              //跳转到部队管理页面
              this.$router.push('/swatUnit/unit')
              //重置form表单和单选框
              this.$refs.ruleForm.resetFields()
              this.selectTroopsRank = ''
              this.picUrl = ''
            }else {
              //失败提示
             this.$message.error(res.message)
           }
          } 
        })
      },
      //点击取消重置数据并返回上级页面
      abrogate(){
        this.$router.go(-1)
        //重置form表单和单选框
        this.$refs.ruleForm.resetFields()
        this.selectTroopsRank = ''
        this.picUrl = ''
      }
    }
}
</script>

<style lang="scss" scoped>
.box-card {
  margin: 10px 10px 10px 10px;
}
// 标题
.box-card-title {
  font-size: 20px;
  font-weight: bold;
}
</style>