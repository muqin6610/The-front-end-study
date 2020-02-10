<template>
  <el-card class='mycard-box'>
    <!--查询区域-->
    <div class='inquire-box'>
      <el-form label-width="150px" ref="form" :model="form">
        <el-row :gutter="18">
          <el-col :span="6">
            <el-form-item label="手电筒电话号码：">
              <el-input v-model="form.phone" placeholder="请输入手电筒电话号码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手电筒名称：">
              <el-input v-model="form.name" placeholder="请输入手电筒名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="盒子电话号码">
              <el-input v-model="form.boxPhone" placeholder="请输入盒子电话号码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="18">
          <el-col :span="6">
            <el-form-item label="报警状态：">
              <el-select v-model="form.status" placeholder="请选择报警状态">
                <el-option
                  v-for="item in status"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="报警时间：">
              <el-date-picker
                v-model="form.time"
                type="date"
                value-format='yyyy-MM-dd'
                format="yyyy-MM-dd"
                placeholder="请选择报警时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" style='width:100px;margin-left:20px;' @click='clickSearch'>查询</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <!--表格区域-->
    <div calss='table-box'>
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column show-overflow-tooltip prop="deviceId" label="手电筒IMEI设备号" align='center'>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="phone" label="手电筒电话号码" align='center'>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="deviceName" label="手电筒名称" align='center'>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="boxPhone" label="盒子电话号码" align='center'>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="address" label="报警地址" align='center'>
          </el-table-column>
          <el-table-column prop="status" label="报警状态" align='center'>
            <template slot-scope='scope'>
              <span>{{scope.row.status === '1' ? '成功' : '失败'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="GPSstatus" label="GPS状态" align='center'>
            <template slot-scope='scope'>
              <span>{{scope.row.GPSstatus === '1' ? '成功' : '失败'}}</span>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="time" label="GPS定位时间" align='center'>
          </el-table-column>
        </el-table>
    </div>
  </el-card>
</template>

<script>
export default {
    data() {
        return {
            form: {
                name: '',
                time: '',
                status: '',
                phone: '',
                boxPhone: '',
            },
            tableData: [],
            // 报警状态
            status: [
                {label:'成功', value:'1'},
                {label:'失败', value:'2'},
            ]
        }
    },
    created() {
        this.getAlarmList()
    },
    methods: {
        // 获取报警列表数据
        getAlarmList() {
            this.tableData = [
                {
                  deviceId: '20160502',
                  phone: '1846464631',
                  deviceName: '测试1号',
                  boxPhone: '156464465',
                  address: '深圳市南山区TCL国际E城G3栋',
                  status: '1',
                  GPSstatus: '1',
                  time: '2019-12-11 17:26:30',
                }, {
                  deviceId: '20160504',
                  phone: '1846464631',
                  deviceName: '测试2号',
                  boxPhone: '156464465',
                  address: '深圳市南山区TCL国际E城G3栋',
                  status: '1',
                  GPSstatus: '2',
                  time: '2019-12-11 17:26:30',
                }, {
                  deviceId: '20160501',
                  phone: '1846464631',
                  deviceName: '测试3号',
                  boxPhone: '156464465',
                  address: '深圳市南山区TCL国际E城G3栋',
                  status: '2',
                  GPSstatus: '1',
                  time: '2019-12-11 17:26:30',
                }, {
                  deviceId: '20160503',
                  phone: '1846464631',
                  deviceName: '测试4号',
                  boxPhone: '156464465',
                  address: '深圳市南山区TCL国际E城G3栋',
                  status: '1',
                  GPSstatus: '1',
                  time: '2019-12-11 17:26:30',
                }, {
                  deviceId: '20160504',
                  phone: '18434534534',
                  deviceName: '测试5号',
                  boxPhone: '15642344',
                  address: '深圳市南山区TCL国际E城G3栋',
                  status: '2',
                  GPSstatus: '2',
                  time: '2019-12-11 17:26:30',
                }
            ]
        },
        // 点击查询
        clickSearch() {
            console.log(this.form)
        },
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
    margin-bottom: 30px;
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
// 时间选择器
/deep/ .el-date-editor {
    width: 100%;
}
// 下拉框
/deep/ .el-select {
    width: 100%;
}
</style>