<template>
  <el-card class="box-card">
    <!--日期相关-->
    <span style='font-size:18px;font-weight:bold'>{{this.$route.query.date}}{{this.$route.query.trainingName}}</span>
    <div style='margin:30px 0 0 0;height:40px'>
      <div class='trainingSpan'>训练队伍:</div>
      <div class='trainingDepart'>
        <span style='margin-left:15px'>大队</span>
        <el-select v-model='selectBattalionCode' style='margin-left:10px;width:150px' placeholder="请选择大队">
         <el-option
           v-for="item in Battalion"
           :key="item.id"
           :label="item.departName"
           :value="item.orgCode">
         </el-option>
       </el-select>
      <span style='margin-left:15px'>中队</span>
      <el-select v-model='selectSquadronCode' style='margin-left:10px;width:150px' placeholder="请选择中队">
        <el-option  v-if='Squadron.length' label="全部" value="all"></el-option>
        <el-option
          v-for="item in Squadron"
          :key="item.id"
          :label="item.departName"
          :value="item.orgCode">
        </el-option>
       </el-select>
      <span style='margin-left:15px'>分队</span>
      <el-select v-model='selectSquadCode' style='margin-left:10px;width:150px' placeholder="请选择分队">
        <el-option  label="全部" value="all"></el-option>
        <el-option
          v-for="item in Squad"
          :key="item.id"
          :label="item.departName"
          :value="item.orgCode">
        </el-option>
       </el-select>
      <span style='margin-left:35px'>训练性质</span>
      <el-select v-model='sendData.trainingCategory' style='margin-left:10px;width:150px' placeholder="请选择训练性质">
        <el-option
          v-for="item in trainingCategorys"
          :key="item.value"
          :label="item.text"
          :value="item.value">
        </el-option>
       </el-select>
      </div>
    </div>
   </el-card>
</template>

<script>

export default {
    props: {
       resetTopBar: {
         type: Boolean,
         default: false,
       }
    },
    data() {
        return {
          // 大队数据源
          Battalion: [],
          // 中队数据源
          Squadron: [],  
          // 分队数据源
          Squad: [],
          // 训练性质数据
          trainingCategorys: [
            {value: '1', text: '在岗训练'},
            {value: '2', text: '在岗集中训练'},
            {value: '3', text: '封闭驻训'},
          ],
          // 选中得大队
          selectBattalionCode: '',
          // 选中得中队
          selectSquadronCode: '',
          // 选中得分队
          selectSquadCode: '',
          // 传给父组件的数据
          sendData: {
            orgCode: '',
            trainingCategory: '',
          },
        }
    },
    created() {
       this.getDepartByParentId()
    },
    watch: {
      // 监听路由是否变化
      '$route' (to, from) {
        this.getDepartByParentId()
      },
      // 监控父组件传值有无变化
      resetTopBar: {
        handler(newVal, oldVal) {
            console.log(oldVal,newVal,'父组件点击+时段')
            if(oldVal !== newVal){
              this.selectBattalionCode = '',
              this.selectSquadronCode = '',
              this.selectSquadCode = '',
              this.sendData.trainingCategory = ''
              this.Squadron = []
              this.Squad = []
            }
        },
        deep: true
      },
      // 监听选择大队
      selectBattalionCode(newVal,oldVal) {
        if(oldVal != newVal) {
          this.selectSquadronCode = 'all'
          this.selectSquadCode = 'all'
          this.Squadron = []  
          this.Squad = []
          // 获取中队数据
          for(let i = 0;i < this.Battalion.length;i++){
            if(this.selectBattalionCode === this.Battalion[i].orgCode){
              this.Squadron = this.Battalion[i].children
            }
          }
          this.sendData.orgCode = this.selectBattalionCode
          // 判断是否有训练性质
          if(this.sendData.trainingCategory){
            this.$emit('sendData',this.sendData)
          }
        }
      },
      // 监听选择中队
      selectSquadronCode(newVal,oldVal) {
        if(oldVal != newVal && newVal != 'all') {
          // 选择中队,分队默认为全部
          this.selectSquadCode = 'all'
          this.Squad = []
          // 判断中队是否选择的全部
          if(this.selectSquadronCode === 'all'){
            this.sendData.orgCode = this.selectBattalionCode
          }else {
            this.sendData.orgCode = this.selectSquadronCode
          }
          for(let i = 0;i < this.Squadron.length;i++){
            if(this.selectSquadronCode === this.Squadron[i].orgCode){
              this.Squad = this.Squadron[i].children
            }
          }
          // 判断是否有训练性质
          if(this.sendData.trainingCategory){
            this.$emit('sendData',this.sendData)
          }
        }
      },
      // 监听选择分队
      selectSquadCode(newVal,oldVal) {
        if(oldVal != newVal && newVal != 'all') {
          // 判断分队是否选择的全部
          if(this.selectSquadCode === 'all'){
            this.sendData.orgCode = this.selectSquadronCode
          }else {
            this.sendData.orgCode = this.selectSquadCode
          }
          // 判断是否有训练性质
          if(this.sendData.trainingCategory){
            this.$emit('sendData',this.sendData)
          }
        }
      },
      // 监听训练性质
      sendData: {
        handler(newVal, oldVal) {
          if(newVal.trainingCategory) {
            // 判断是否有部队
            if(this.sendData.orgCode){
              this.$emit('sendData',this.sendData)
            }
          }
        },
        deep: true,
      }
    },
    methods: {
       //获取角色对应的部队数据
      getDepartByParentId(){
        this.Battalion = [
          {departName: '第一大队', id: '1', orgCode: 'A01A01', children: [
            {departName: '第一大队第一中队', id: '11', orgCode: 'A01A01A01', children: [
              {departName: '第一大队第一中队第一分队', id: '111', orgCode: 'A01A01A01A01',},
            ]},
          ]},
          {departName: '第二大队', id: '2', orgCode: 'A02A02', children: [
            {departName: '第二大队第一中队', id: '22', orgCode: 'A02A02A02', children: [
              {departName: '第二大队第一中队第一分队', id: '222', orgCode: 'A02A02A02A02',},
            ]},
          ]},
        ]
      },
    },
}
</script>

<style lang="scss" scoped>
/**卡片样式 */
.box-card {
  margin: 10px;
}
/**时间分配部队选择样式 */
.trainingDepart {
  float: left;
}
/**时间分配文本样式 */
.trainingSpan {
  float: left;
  height: 40px;
  line-height: 40px;
}
</style>