<template>
  <el-card class='mycard-box'>
    <!--查询区域-->
    <div class='inquire-box'>
      <el-form label-width="160px" ref="form" :model="form">
        <el-row :gutter="18">
          <el-col :span="7">
            <el-form-item label="使用人姓名">
              <el-input v-model="form.userName" placeholder="请输入使用人姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="认领状态">
              <el-select v-model="form.status" placeholder="请选择认领状态">
                <el-option
                  v-for="item in status"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="是否给报警平台报警">
              <el-select v-model="form.policeStatus" placeholder="请选择是否给报警平台报警">
                <el-option
                  v-for="item in policeStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="18">
          <el-col :span="7">
            <el-form-item label="IMEI设备号">
              <el-input v-model="form.deviceId" placeholder="请输入IMEI设备号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="归属机构">
              <el-select v-model="form.attribution" placeholder="请选择归属机构">
                <el-option
                  v-for="item in attributions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" style='width:100px;margin-left:20px;' @click='clickSearch'>查询</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div style='margin-bottom:20px;margin-left:20px;'>
      <el-button type="primary" @click='pushBind'>新增设备</el-button>
    </div>
    <!--表格区域-->
    <div calss='table-box'>
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column show-overflow-tooltip prop="deviceId" label="IMEI设备号" align='center'>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="phone" label="手机卡号码" align='center'>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="userName" label="使用人姓名" align='center'>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="userPhone" label="使用人联系方式" align='center'>
          </el-table-column>
          <el-table-column prop="status" label="认领状态" align='center'>
            <template slot-scope='scope'>
              <span>{{scope.row.status === '1' ? '已认领' : '未认领'}}</span>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="userUnit" label="使用人单位" align='center'>
          </el-table-column>
          <el-table-column prop="policeStatus" label="是否报警给报警平台" align='center'>
            <template slot-scope='scope'>
              <span>{{scope.row.status === '1' ? '是' : '否'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作" align='center'>
            <template slot-scope='scope'>
              <span class='operating'>编辑</span>
            </template>
          </el-table-column>
        </el-table>
    </div>
    <FlashlightBindDialog :dialogVisible='dialogVisible' @close='close'/>
  </el-card>
</template>

<script>
import FlashlightBindDialog from './modules/flashlightListModules/FlashlightBindDialog'

export default {
    components: {
      FlashlightBindDialog
    },
    data() {
        return {
            // 传递给子组件
            dialogVisible: false,
            form: {
                userName: '',
                status: '',
                deviceId: '',
                policeStatus: '',
                attribution: '',
            },
            tableData: [],
            // 报警状态
            status: [
                {label:'已认领', value:'1'},
                {label:'未认领', value:'2'},
            ],
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
            ]
        }
    },
    created() {
        // 获取报警列表数据
        this.getAlarmList()
    },
    methods: {
        // 获取报警列表数据
        getAlarmList() {
            this.tableData = [
                {
                  deviceId: '20160502',
                  phone: '1846464631',
                  userName: '测试1号',
                  userPhone: '156464465',
                  status: '1',
                  policeStatus: '1',
                  userUnit: '深圳前端学习公司',
                }, {
                  deviceId: '20160504',
                  phone: '1846464631',
                  userName: '测试2号',
                  userPhone: '156464465',
                  status: '1',
                  policeStatus: '2',
                  userUnit: '深圳前端学习公司',
                }, {
                  deviceId: '20160501',
                  phone: '1846464631',
                  userName: '测试3号',
                  userPhone: '156464465',
                  status: '2',
                  policeStatus: '1',
                  userUnit: '深圳前端学习公司',
                }, {
                  deviceId: '20160503',
                  phone: '1846464631',
                  userName: '测试4号',
                  userPhone: '156464465',
                  status: '1',
                  policeStatus: '2',
                  userUnit: '深圳前端学习公司',
                }, {
                  deviceId: '20160504',
                  phone: '18434534534',
                  userName: '测试5号',
                  userPhone: '15642344',
                  status: '2',
                  policeStatus: '1',
                  userUnit: '深圳前端学习公司',
                }
            ]
        },
        // 点击查询
        clickSearch() {
            console.log(this.form)
        },
        // 跳转到绑定页面
        pushBind() {
          this.dialogVisible = true
        },
        close() {
          this.dialogVisible = false
        }
    },
}
</script>

<style lang="scss" scoped>
// 卡片
.mycard-box {
    margin: 10px;
}
// 查询区域
.inquire-box {
    margin-top: 20px;
}
// 表格
/deep/ .el-table {
    border: 1px solid #ebeef5;
    border-bottom: 0;
    margin-bottom: 30px;
}
// 表头
/deep/ .has-gutter {
    color: #282c34;
}
// 下拉框
/deep/ .el-select {
    width: 100%;
}
// 表格操作区域
.operating {
    margin-right: 15px;
    cursor: pointer;
    color: #409eff;
}
</style>