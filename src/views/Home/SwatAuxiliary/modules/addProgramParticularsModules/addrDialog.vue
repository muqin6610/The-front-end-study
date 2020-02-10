<template>
  <el-dialog modal :before-close='cancelSelect' title="选择训练地点" :visible.sync="showDdian" width="35%">
      <el-radio-group @change='changeRadio' v-model="trainingAddr">
       <el-radio class='my-el-radio' style='margin-bottom:15px' :key='item.addrCode' v-for='item in trainingAddrs' :label="item.addrName">{{item.addrName}}</el-radio>
     </el-radio-group>
     <div style='margin-top:10px'>
       <p style='margin-right:10px;'>手动输入:</p>
       <el-input v-model="inputTrainingAddr" @focus='focusIput' style='width:100%' placeholder="请输入训练地点"></el-input>
     </div>
      <span slot="footer" class="dialog-footer">
        <el-button size='medium' @click="cancelSelect">取 消</el-button>
        <el-button size='medium' type="primary" @click="clickSelect">确 定</el-button>
      </span>
    </el-dialog>
</template>

<script>

export default {
    props: {
        showDdian: {
          type: Boolean,
          defaultL: false,
        }
    },
    data() {
        return {
          // 单选中的训练地点
          trainingAddr: '',
          // 自行输入的地点
          inputTrainingAddr: '',
          // 训练地点数据源
          trainingAddrs: [],
        }
    },
    created() {
       this.getTrainAddrs()
    },
    methods: {
       // 点击确定
       clickSelect(){
          if(this.trainingAddr){
             this.$emit('selectAddr',this.trainingAddr)
             this.trainingAddr = ''
          }else {
             this.$emit('selectAddr',this.inputTrainingAddr)
             this.inputTrainingAddr = ''
          }
       },
       // 点击取消
       cancelSelect(){
          this.$emit('selectAddr')
          this.inputTrainingAddr = ''
          this.trainingAddr = ''
       },
       // 地点input获得焦点
       focusIput(){
         this.trainingAddr = ''
       },
       // 单选地点值发生变化
       changeRadio(){
         this.inputTrainingAddr = ''
       },
      // 训练地点数据
      getTrainAddrs() {
        this.trainingAddrs = [
          {addrCode: '1', addrName: '白云山'},
          {addrCode: '2', addrName: '莲花山'},
          {addrCode: '3', addrName: '西湖'},
          {addrCode: '4', addrName: '长城'},
        ]
      },
    },
}
</script>

<style lang="scss" scoped>
.my-el-radio {
  width: 120px;
}
// 输入框
/deep/ .el-input__inner {
  width: 50%;
}
</style>