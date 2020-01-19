<template>
    <el-card class='mycard'>
      <div>
        <el-button type="primary" @click='searchDevice'>搜索设备</el-button>
        <el-button>手动添加</el-button>
        <el-button>设备分配</el-button>
        <div class='top-search-box'>
          <el-input clearable @keyup.enter.native='clickSearch()' v-model="search" placeholder="请输入组织名称或MAC地址进行搜索" style='margin-right: 20px;'></el-input>
          <el-button type="primary" @click='clickSearch'>搜索</el-button>
        </div>
        <div class='tabel-box'>
          <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
             <el-table-column type="selection" width="55">
             </el-table-column>
             <el-table-column prop="number" label="编号">
             </el-table-column>
             <el-table-column prop="MAC" label="MAC\SN">
             </el-table-column>
             <el-table-column prop="deviceName" label="设备名称">
             </el-table-column>
             <el-table-column prop="type" label="产品类型">
             </el-table-column>
             <el-table-column prop="region" label="分配区域">
             </el-table-column>
             <el-table-column prop="happening" label="在线情况">
             </el-table-column>
             <el-table-column label="操作" width='200'>
               <template slot-scope='scope'>
                 <span style='color:#409eff;' class='operating'>编辑</span>
                 <span style='color:#409eff;' class='operating'>解绑区域</span>
                 <span style='color:#e06253;' class='operating'>删除</span>
               </template>
             </el-table-column>
          </el-table>
        </div>
      </div>
      <DeviceManagementDialog :showDeviceDialog='showDeviceDialog' @close='close'/>
    </el-card>
</template>

<script>
import DeviceManagementDialog from './modules/DeviceManagementModule/DeviceManagementDialog'

export default {
    components: {
        DeviceManagementDialog
    },
    data() {
        return {
            // 打开搜索设备弹窗
            showDeviceDialog: false,
            search: '',
            tableData: [
                {
                    number: '01',
                    MAC: '7A555R121AC',
                    deviceName: '人脸识别设备',
                    type: '智能门禁',
                    region: '前端十楼',
                    happening: '在线',
                },
                {
                    number: '02',
                    MAC: '7A555R121AC',
                    deviceName: '人脸识别设备',
                    type: '智能闸机',
                    region: '前端九楼',
                    happening: '在线',
                },
                {
                    number: '03',
                    MAC: '7A555R121AC',
                    deviceName: '人脸识别设备',
                    type: '智能门禁',
                    region: '前端八楼',
                    happening: '离线',
                },
            ],
            currentDay: 1,
            currentMonth: 1,
            currentYear: 1970,
            currentWeek: 1,
            weeks: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
            days: []
        }
    },
    created() {

    },
    methods: {
        // 搜索
        clickSearch() {
            console.log('搜索!')
        },
        // 选择表格
        handleSelectionChange(val) {
          this.multipleSelection = []
          // 添加选中的学生id到数组
          for (let i = 0; i < val.length; i++) {
              if (this.multipleSelection.indexOf(val[i].id) === -1) {
                  this.multipleSelection.push(val[i].id)
              }
          }
        },
        // 点击搜索设备
        searchDevice() {
            this.showDeviceDialog = true
        },
        // 关闭弹框
        close() {
            this.showDeviceDialog = false
        },
    },
}
</script>

<style lang="scss" scoped>
.mycard {
    margin: 10px;
} 
// 顶部搜索盒子
.top-search-box {
    float: right;
    display: flex;
}  
// 搜索输入框
/deep/ .el-input {
    width: 300px;
} 
// 表格盒子
.tabel-box {
    margin-top: 30px;
}
// 表格
/deep/ .el-table {
    border: 1px solid #ebeef5;
    border-bottom: 0;
    margin: 30px 0 400px 0;
}
// 表头
/deep/ .has-gutter {
    color: #282c34;
} 
// 表格操作区域
.operating {
    margin-right: 15px;
    cursor: pointer;
}
</style>