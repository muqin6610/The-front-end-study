<template>
  <div class='renewal'>
    <!--续费中心-->
    <div v-if='!showSubmit'>
      <el-card class='el-card'>
          <div class='tab-text' :class='{buleColor: !showColor}' @click='clickTab(1)'>续费申请</div>
          <div class='tab-text' :class='{buleColor: showColor}' @click='clickTab(2)'>续费记录</div>
      </el-card>
      <!--续费申请-->
      <div v-show='!showColor'>
        <RenewalApplication @submit='submit'/>
      </div>
      <!--续费记录-->
      <div v-show='showColor'>
        <RenewalRecord/>
      </div>
    </div>
    <!--提交续费-->
    <div v-if='showSubmit'>
      <SubmitRenewal/>
    </div>
  </div>
</template>

<script>
import RenewalApplication from './modules/RenewalCnterModule/RenewalApplication'
import RenewalRecord from './modules/RenewalCnterModule/RenewalRecord'
import SubmitRenewal from './modules/RenewalCnterModule/SubmitRenewal'

  export default {
    components: {
        RenewalApplication,
        RenewalRecord,
        SubmitRenewal,
    },
    data() {
        return {
            showColor: false,
            showSubmit: false,
        }
    },
    created() {
        
    },
    methods: {
        clickTab(e) {
            if(e === 1) {
                this.showColor = false
            }else {
                this.showColor = true
            }
        },
        submit() {
            this.showSubmit = true
        }
    },
  }
</script>

<style lang='scss' scoped>
.el-card {
    margin-bottom: 10px;
}
.tab-text {
    margin: 0 10px 0 10px;
    display: inline-block;
    height: 40px;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
}
.buleColor {
    color: #16a1ff;
    border-bottom: 2px solid #16a1ff;
}
</style>