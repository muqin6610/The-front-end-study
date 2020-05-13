<template>
  <el-drawer
    :title="title"
    size="550px"
    :show-close='false'
    :before-close="close"
    :visible.sync="modelDatas.visible"
  >
    <div>
      <div class='detail-box'>
        <el-form label-width="120px">
          <el-form-item label="申请账号:">
            <span>1008611</span>
          </el-form-item>
          <el-form-item label="打款方:">
            <span>深圳市宝马科技股份有限公司</span>
          </el-form-item>
          <el-form-item label="纳税人识别号:">
            <span>4235452125464412359X</span>
          </el-form-item>
          <el-form-item label="联系人:">
            <span>钦先生</span>
          </el-form-item>
          <el-form-item label="电话号码:">
            <span>19928848948</span>
          </el-form-item>
          <el-form-item label="打款金额:">
            <span>38,000元</span>
          </el-form-item>
          <el-form-item label="打款项目:">
            <span>购买2019-11-01至2020-11-01 少于10台公司系统服务</span>
          </el-form-item>
          <el-divider></el-divider>
          <el-form-item label="收款方:">
            <span>新疆爱华盈通信息技术有限公司</span>
          </el-form-item>
          <el-form-item label="收款账号:">
            <span>7761 2456 5125 5442 2544 1</span>
          </el-form-item>
          <el-form-item label="开户行:">
            <span>招商银行深圳分行华侨城支行</span>
          </el-form-item>
          <el-form-item label="商务联系电话:">
            <span>19928848988</span>
          </el-form-item>
          <el-divider></el-divider>
          <el-form-item label="申请状态:">
            <span>审批中</span>
          </el-form-item>
          <el-divider></el-divider>
          <el-form-item label="深圳:">
            <span>0755-26621818</span>
          </el-form-item>
          <el-form-item label="上海:">
            <span>021-62190658</span>
          </el-form-item>
          <el-form-item label="新疆:">
            <span>0991-3737218</span>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div
      :style="{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderTop: '1px solid #e8e8e8',
        padding: '10px 16px',
        textAlign: 'right',
        left: 0,
        background: '#fff',
        borderRadius: '0 0 4px 4px',
      }"
    >
      <el-button @click="onClose" type="primary">
        返回
      </el-button>
    </div>
  </el-drawer>
</template>

<script>

export default {
    props: {
      modelDatas: {
        visible: {
            type: Boolean,
            default: false,
        }
      }
    },
    data() {
        return {
          title: '申请记录'
        }
    },
    created() {
      
    },
    methods: {
      close() {

      },
        onClose() {
            this.$emit('colse')
        }
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
.detail-box {
    margin-bottom: 35px;
}
/deep/ .el-form-item {
  margin-bottom: 0
}
</style>