<template>
  <div>
    <el-card class='el-card'>
      <span class='title-text'>申请记录</span>
      <div class='table-box'>
          <el-table
            v-loading="loading"
            element-loading-text="加载中..."
            element-loading-spinner="el-icon-loading"
            :data="tableData"
            stripe
            style="width: 100%;margin-top:20px;"
            :header-cell-style="{background:'#fafafa',color:'#2c2626'}">
            <el-table-column prop="passengerCode" label="操作类型" align='center'>
            </el-table-column>
            <el-table-column align='center' prop="name" label="申请内容">
            </el-table-column>
            <el-table-column align='center' prop="departName" label="操作时间">
            </el-table-column>
            <el-table-column align='center' prop="mappingTemp" label="支付费用">
            </el-table-column>
            <el-table-column align='center' prop="passTs" label="申请结果">
              <template slot-scope='scope'>
                  <span :class='scope.row.passTs === "审批中" ? "blueColor" : (scope.row.passTs === "成功" ? "greenColor" : "redColor")'>●</span>
                  <span :class='scope.row.passTs === "审批中" ? "blueColor" : (scope.row.passTs === "成功" ? "greenColor" : "redColor")'>{{scope.row.passTs}}</span>
              </template>
            </el-table-column>
            <el-table-column align='center' prop="" label="操作" width='180'>
              <template slot-scope='scope'>
                <span class='table-detail' @click='lookDetail(scope.row)'>查看详情</span>
              </template>
            </el-table-column>
        </el-table>
        <el-pagination
          class='el-pagination'
          background
          hide-on-single-page
          @size-change='sizeChange'
          @current-change='currentChange'
          :page-size="pageSize"
          :page-sizes="[10, 20, 30, 40]"
          :current-page='pageCurrent'
          :pager-count='pagerCount'
          layout="total, prev, pager, next, sizes, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-card>

    <!--续费详情-->
    <RenewalRecordMolde :modelDatas='modelDatas' @colse='colse'/>
  </div>
</template>

<script>
import RenewalRecordMolde from './modules/RenewalRecordMolde'

  export default {
    components: {
        RenewalRecordMolde
    },
    data() {
        return {
            modelDatas: {
                visible: false,
            },
            total: null,
            pageSize: null,
            pageCurrent: null,
            pagerCount: 5,
            loading: false,
            tableData: [
                {
                    passengerCode: '购买一年服务申请',
                    name: '购买2019-11-01至2020-11-01系统服务',
                    departName: '2019-10-29 12:00',
                    mappingTemp: '38，000元',
                    passTs: '审批中',
                },
                {
                    passengerCode: '购买一年服务申请',
                    name: '购买2019-11-01至2020-11-01系统服务',
                    departName: '2019-10-29 12:00',
                    mappingTemp: '48，000元',
                    passTs: '成功',
                },
                {
                    passengerCode: '购买一年服务申请',
                    name: '购买2019-11-01至2020-11-01系统服务',
                    departName: '2019-10-29 12:00',
                    mappingTemp: '58，000元',
                    passTs: '失败',
                },
            ],
        }
    },
    methods: {
        currentChange(val) {
          this.getPageList(val, this.pageSize)
        },
        sizeChange(val) {
          this.getPageList(1, val)
        },
        lookDetail() {
            this.modelDatas.visible = true
        },
        colse() {
            this.modelDatas.visible = false
        }
    },
  }
</script>

<style lang='scss' scoped>
.el-card {
    margin-bottom: 10px;
}
.table-box {
    margin-top: 20px;
}
.table-detail {
  color:#409eff;
  cursor: pointer;
}
.blueColor {
    color: #0066ff;
}
.greenColor {
    color: #52c41a;
}
.redColor {
    color: #ff0000;
}
.title-text {
    font-size: 18px;
    font-weight: bold;
}
</style>