<template>
  <el-drawer
    :visible.sync="visible"
    :before-close="close"
    :show-close='false'
    :title="title"
    size='30%'
    >
    <div>
      <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="时间">
          <el-time-picker
            @change="selectChange"
            is-range
            arrow-control
            v-model="ruleForm.selectTime"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围">
          </el-time-picker>
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
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleOk">确 定</el-button>
    </div>
  </el-drawer>
</template>

<script>
export default {
    data() {
        return {
          title: '',
          visible: false,
          ruleForm: {
              selectTime: [],
          },
        }
    },
    methods: {
      selectChange(val) {
        console.log(val)
      },
      add() { this.edit({}) },
      edit(row) {
        this.visible = true
        this.model = Object.assign({}, row)
        this.$nextTick(() => {
          if(this.model.id) {
            let arr = this.model.time.split('-')
            this.ruleForm.selectTime = arr
          }
        })
      },
      close() { this.visible = false },
      handleCancel() { this.close() },
      handleOk() { this.close() },
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
// 输入框
/deep/ .el-date-editor {
  width: 70%;
}  
</style>