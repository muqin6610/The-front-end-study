<template>
  <el-dialog
  title="搜索设备"
  width='60%'
  :before-close="handleClose"
  :visible.sync="showDeviceDialog">
    <div class='tabel-box'>
      <el-table v-loading="loading" element-loading-text="....." element-loading-spinner="el-icon-loading" empty-text='请将设备开机并连至同一局域网进行搜索' :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
         <el-table-column type="selection" width="55">
         </el-table-column>
         <el-table-column prop="MAC" label="MAC/S/N">
         </el-table-column>
         <el-table-column prop="deviceIP" label="设备IP">
         </el-table-column>
         <el-table-column prop="serverName" label="服务器名称">
         </el-table-column>
         <el-table-column prop="serverHost" label="服务器端口">
         </el-table-column>
      </el-table>
    </div>
    <div>
      <el-button type="primary" @click='clickSearch'>开始搜索</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
    props: {
      showDeviceDialog: {
        type: Boolean,
        default: false,
      }
    },
    data() {
        return {
            loading: false,
            tableData: [],
        }
    },
    methods: {
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
        // 关闭弹框
        handleClose() {
          this.$emit('close')
          this.tableData = []
        },
        // 点击搜索
        clickSearch() {
          this.loading = true
          this.IntervalID = setInterval(() => {
            this.tableData = [
              {
                MAC: '75511ddcvv551',
                deviceIP: 'AFCVD44112',
                serverName: '前端学习平台服务器',
                serverHost: '3000'
              },
              {
                MAC: '75511ddcvv111',
                deviceIP: 'AFCVD44641',
                serverName: '前端学习平台服务器',
                serverHost: '8080'
              },
              {
                MAC: '75511ddcvv321',
                deviceIP: 'AFCVD44985',
                serverName: '前端学习平台服务器',
                serverHost: '3000'
              },
            ]
            this.loading = false
          }, 500)
        }
    },
}
</script>

<style lang="scss" scoped>
// 弹框
/deep/ .el-dialog {
    border-radius: 15px;
}  
// 表格
/deep/ .el-table {
    border: 0;
}
// 无数据时文本
/deep/ .el-table__empty-text {
  font-size: 20px;
  color: #282c34;
}
// 表头
/deep/ .el-dialog__header {
  border-bottom: 1px solid #797979;
  font-weight: bold;
}
</style>