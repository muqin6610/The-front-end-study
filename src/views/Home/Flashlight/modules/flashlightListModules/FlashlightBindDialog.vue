<template>
  <el-dialog
    title="新增设备"
    :visible.sync="dialogVisible"
    width="40%"
    :before-close="handleClose">
       <el-form ref="form" :model="form" :rules="rules" label-width="160px">
         <el-form-item label="手电筒IMEI号:" prop='deviceId'>
           <el-input v-model="form.deviceId" placeholder="请输入手电筒IMEI号"></el-input>
         </el-form-item>
         <el-form-item label="手机卡号码:" prop='phone'>
           <el-input v-model="form.phone" placeholder="请输入手机卡号码"></el-input>
         </el-form-item>
         <el-form-item label="使用人姓名:" prop='userName'>
           <el-input v-model="form.userName" placeholder="请输入使用人姓名"></el-input>
         </el-form-item>
         <el-form-item label="使用人联系方式:" prop='userPhone'>
           <el-input v-model="form.userPhone" placeholder="请输入使用人联系方式"></el-input>
         </el-form-item>
         <el-form-item label="归属机构:" prop='attribution'>
          <el-select v-model="form.attribution" placeholder="请选择归属机构">
            <el-option
              v-for="item in attributions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="使用人单位名称:" prop='userUnit'>
         <el-input v-model="form.userUnit" placeholder="请输入使用人单位名称"></el-input>
        </el-form-item>
         <el-form-item label="是否给报警平台报警:" prop='policeStatus'>
           <el-select v-model="form.policeStatus" placeholder="请选择是否给报警平台报警">
             <el-option
               v-for="item in policeStatus"
               :key="item.value"
               :label="item.label"
               :value="item.value">
             </el-option>
           </el-select>
         </el-form-item>
        <el-form-item label="单位详细地址:" prop='unitAddress'>
          <el-input v-model="form.unitAddress" placeholder="请输入单位详细地址"></el-input>
        </el-form-item>
        <el-form-item label="单位负责人:" prop='principal'>
          <el-input v-model="form.principal" placeholder="请输入单位负责人"></el-input>
        </el-form-item>
     </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleClose">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
    props: {
      dialogVisible: {
        type: Boolean,
        default: false,
      },
    },
    data() {
        return {
            form: {
              deviceId: '',
              phone: '',
              userName: '',
              userPhone: '',
              userUnit: '',
              policeStatus: '',
              attribution: '',
              unitAddress: '',
              principal: '',
            },
            // 是否给报警平台报警
            policeStatus: [
                {label:'是', value:'1'},
                {label:'否', value:'2'},
            ],
            // 归属机构
            attributions: [
                {label:'深圳前端学习公司', value:'1'},
                {label:'宝安前端Vue公司', value:'2'},
                {label:'南山外包公司', value:'3'},
            ],
            rules: {
              deviceId: [
                { required: true, message: '请输入手电筒IMEI号', trigger: 'blur' },
              ],
              phone: [
                { required: true, message: '请输入手机卡号码', trigger: 'blur' }
              ],
              userName: [
                { required: true, message: '请输入使用人姓名', trigger: 'blur' }
              ],
              attribution: [
                { required: true, message: '请选择归属机构', trigger: 'blur' }
              ],
              userUnit: [
                { required: true, message: '请输入单位名称', trigger: 'blur' }
              ],
              policeStatus: [
                { required: true, message: '请选择是否给报警平台报警', trigger: 'blur' }
              ],
            }
        }
    },
    created() {
        
    },
    methods: {
        // 绑定设备
        bindDevice(form) {
            this.$refs[form].validate((valid) => {
              if (valid) {
                alert('submit!')
                console.log(this.form,'我提交了数据')
              } else {
                console.log('error submit!!')
                return false
              }
            });
        },
        // 取消返回
        handleClose() {
            this.$emit('close')
            this.$refs.form.resetFields()
        }
    },
}
</script>

<style lang="scss" scoped>
.mycard {
    margin: 10px;
}
</style>