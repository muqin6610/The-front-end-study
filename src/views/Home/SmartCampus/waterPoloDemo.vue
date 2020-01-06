<template>
  <div class='all-box'>
    <div class='top-box'>
      <div class='mybox statistics'>
        <div class='topcard-title'>今日温度统计</div>
        <div class='card-content-box'>
          <div class='card-content one-bgcolor'>
            <div class='text-box'>
              <div class='card-content-title'>学校总人数</div>
              <div class='card-content-text'>5000人</div>
            </div>
          </div>
          <div class='card-content two-bgcolor'>
            <div class='text-box'>
              <div class='card-content-title'>累计识别人数</div>
              <div class='card-content-text'>4200人</div>
            </div>
          </div>
          <div class='card-content three-bgcolor'>
            <div class='text-box'>
              <div class='card-content-title'>体温正常人数</div>
              <div class='card-content-text'>3900人</div>
            </div>
          </div>
          <div class='card-content four-bgcolor'>
            <div class='text-box'>
              <div class='card-content-title'>体温异常人数</div>
              <div class='card-content-text'>400人</div>
            </div>
          </div>
        </div>
      </div>
      <div class='mybox liquidfill'>
        <div class='liquidfill-title'>今日体温异常占比</div>
        <!--引入的水球图-->
        <Liquidfill :liquidfillData='liquidfillData'/>
      </div>
    </div>
    <el-card class='mycard'>
      <div class='statistics-top'>
        <span class='statistics-title'>体温统计表</span>
        <el-button type="primary" class='export-button'>导出数据</el-button>
      </div>
      <div class='select-search-box'>
        <div class='select-box'>
          <el-date-picker
            size="medium"
            v-model="value1"
            type="daterange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          <el-select size="medium" v-model="selectvalue" placeholder="请选择年级">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select size="medium" v-model="selectvalue" placeholder="请选择班级">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class='search-box'>
          <div class='input-box'>
            <el-input
              size="medium"
              placeholder="请输入班级或学生名字"
              v-model="input"
              @keyup.enter.native='clickSearch()'
              clearable>
            </el-input>
          </div>
          <span class='search-text' @click='clickSearch'>搜索</span>
        </div>
      </div>
      <el-divider></el-divider>
      <div class='temperature-box'>
        <div class='temperature-chart'>
          <!--引入的柱状图-->
          <Histogram :histogramData='histogramData'/>
        </div>
      </div>
    </el-card>
    <div class='center-card-box'>
      <el-card class='mycard center-card'>
        <div class='center-card-title'>体温异常班级信息</div>
        <div class='class-box'>
          <div class='information-box'>
            <div class='information-item-box'>
              <div class='number-title-top'>1</div>
              <div class='className'>初一一班</div>
              <div class='numberPeople'>100人</div>
            </div>
            <div class='information-item-box'>
              <div class='number-title-top'>2</div>
              <div class='className'>初一二班</div>
              <div class='numberPeople'>97人</div>
            </div>
            <div class='information-item-box'>
              <div class='number-title-top'>3</div>
              <div class='className'>初一三班</div>
              <div class='numberPeople'>90人</div>
            </div>
            <div class='information-item-box'>
              <div class='number-title'>4</div>
              <div class='className'>初一四班</div>
              <div class='numberPeople'>85人</div>
            </div>
            <div class='information-item-box'>
              <div class='number-title'>5</div>
              <div class='className'>初一五班</div>
              <div class='numberPeople'>76人</div>
            </div>
            <div class='information-item-box'>
              <div class='number-title'>6</div>
              <div class='className'>初一六班</div>
              <div class='numberPeople'>80人</div>
            </div>
            <div class='information-item-box'>
              <div class='number-title'>7</div>
              <div class='className'>初一六班</div>
              <div class='numberPeople'>80人</div>
            </div>
            <div class='information-item-box'>
              <div class='number-title'>8</div>
              <div class='className'>初一六班</div>
              <div class='numberPeople'>80人</div>
            </div>
            <div class='information-item-box'>
              <div class='number-title'>9</div>
              <div class='className'>初一六班</div>
              <div class='numberPeople'>80人</div>
            </div>
            <div class='information-item-box'>
              <div class='number-title'>10</div>
              <div class='className'>初一六班</div>
              <div class='numberPeople'>80人</div>
            </div>
          </div>
        </div>
      </el-card>
      <el-card class='mycard center-card'>
        <div class='center-card-title'>2019-10-1至2019-10-07体温占比图</div>
        <div>
          <!-- 环状图 -->
          <Ring :ringData='ringData'/>
        </div>
      </el-card>
    </div>
    <el-card style='margin-bottom: 40px;' class='mycard'>
        <div class='center-card-title'>2015-10-01至2015-10-07全校体温异常排序</div>
        <el-table border :data="tableData" stripe style="width: 100%;margin-top:20px;" :header-cell-style="{background:'#e7ecff',color:'#2c2626'}">
        <el-table-column align='center' prop="avatar" label="头像">
          <template slot-scope='scope'>
            <img style='cursor:pointer;border-radius:20px;' :src="scope.row.avatar" width="40" height="40"/>
          </template>
        </el-table-column>
        <el-table-column prop="studentID" label="学号" align='center'>
        </el-table-column>
        <el-table-column align='center' prop="name" label="姓名">
        </el-table-column>
        <el-table-column align='center' prop="class" label="班级">
        </el-table-column>
        <el-table-column align='center' prop="age" label="年龄">
        </el-table-column>
        <el-table-column align='center' prop="sex" label="性别">
        </el-table-column>
        <el-table-column align='center' prop="bodyTemperature" label="体温">
          <template slot-scope='scope'>
            <span style='color:#ff5858'>{{scope.row.bodyTemperature}}℃</span>
          </template>
        </el-table-column>
        <el-table-column align='center' prop="" label="操作" width='150'>
          <template slot-scope='scope'>
            <span class='lookDetail' @click='lookDetails(scope.row.name)'>查看详情</span>
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
        :total="tableData.length">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import Liquidfill from '@/components/Charts/Liquidfill'
import Histogram from '@/components/Charts/Histogram'
import Ring from '@/components/Charts/Ring'
export default {
  components: {
    Liquidfill,
    Histogram,
    Ring
  },
  data () {
    return {  
        // 传递给水球图组件数据
        liquidfillData: {
          percent: 0.45,
        },
        // 传递给柱状图组价数据
        histogramData: {
          dateArr: ['2019-12-01', '2019-12-01', '2019-12-01', '2019-12-01', '2019-12-01', '2019-12-01', ],
          numArr: [66, 248, 108, 40, 215, 53,],
        },
        // 传递给环装图组件数据
        ringData: {
          dataArr: [
              { value: 80, name: "正常体温 36.1-37℃" },
              { value: 20, name: "低烧体温 37.1-38℃" },
              { value: 10, name: "高烧体温 38℃以上" },
            ]
        },
        // 搜索
        input: '',
        // 日期选择
        value1: '',
        // 选择年级
        selectvalue: '',
        options: [{
          value: '选项1',
          label: '初一'
        }, {
          value: '选项2',
          label: '初二'
        }, {
          value: '选项3',
          label: '初三'
        }, {
          value: '选项4',
          label: '高一'
        }, {
          value: '选项5',
          label: '高二'
        }],
        options2: [{
          value: '选项1',
          label: '初一一班'
        }, {
          value: '选项2',
          label: '初二二班'
        }, {
          value: '选项3',
          label: '初三三班'
        }, {
          value: '选项4',
          label: '高一四班'
        }, {
          value: '选项5',
          label: '高二五班'
        }],
        // 分页器总条数
        total: null,
        // 分页器每页条数
        pageSize: null,
        // 页码
        pageCurrent: null,
        // 显示的页码
        pagerCount: 5,
        tableData: [
            {
            avatar: 'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
            class: '初一一班',
            name: '慕钦C',
            studentID: '2091123',
            age: 13,
            bodyTemperature: '38.5',
            sex: '男',
          },
            {
            avatar: 'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
            class: '初一一班',
            name: '王超',
            studentID: '2056461',
            age: 10,
            bodyTemperature: '39.5',
            sex: '男',
          },
            {
            avatar: 'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
            class: '初一一班',
            name: '王超',
            studentID: '2056461',
            age: 10,
            bodyTemperature: '39.5',
            sex: '男',
          },
            {
            avatar: 'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
            class: '初一一班',
            name: '王超',
            studentID: '2056461',
            age: 10,
            bodyTemperature: '39.5',
            sex: '男',
          },
            {
            avatar: 'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
            class: '初一一班',
            name: '王超',
            studentID: '2056461',
            age: 10,
            bodyTemperature: '39.5',
            sex: '男',
          },
            {
            avatar: 'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
            class: '初一一班',
            name: '王超',
            studentID: '2056461',
            age: 10,
            bodyTemperature: '39.5',
            sex: '男',
          },
            {
            avatar: 'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
            class: '初一一班',
            name: '王超',
            studentID: '2056461',
            age: 10,
            bodyTemperature: '39.5',
            sex: '男',
          },
            {
            avatar: 'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
            class: '初一一班',
            name: '王超',
            studentID: '2056461',
            age: 10,
            bodyTemperature: '39.5',
            sex: '男',
          },
            {
            avatar: 'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
            class: '初一一班',
            name: '王超',
            studentID: '2056461',
            age: 10,
            bodyTemperature: '39.5',
            sex: '男',
          },
            {
            avatar: 'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
            class: '初一一班',
            name: '王超',
            studentID: '2056461',
            age: 10,
            bodyTemperature: '39.5',
            sex: '男',
          },
            {
            avatar: 'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
            class: '初一一班',
            name: '王超',
            studentID: '2056461',
            age: 10,
            bodyTemperature: '39.5',
            sex: '男',
          },
        ],
    }
  },
  mounted () {
  },
  created() {
    
  },
  methods: {
    // 搜索
    clickSearch() {
      console.log('搜索!')
      if(this.input) {
        localStorage.setItem('name', this.input)
        this.$router.push('temperaturStatistics/staffDetails')
      }else {
        return false
      }
    },
    // 查看详情
    lookDetails(name) {
      localStorage.setItem('name', name)
      this.$router.push('temperaturStatistics/staffDetails')
    },
    // 当前页改变
    currentChange(val) {
      this.getListTeacher(val, this.pageSize)
    },
    // 每页条数改变
    sizeChange(val) {
      this.getListTeacher(1, val)
    },
  }
}
</script>

<style lang="scss" scoped>
.all-box {
}
.mycard {
    margin: 10px;
}
.mybox {
    margin: 10px;
    background: #fff;
}
// 顶部盒子
.top-box {
    display: flex;
}
// 顶部卡片标题
.topcard-title {
  margin: 20px 0 0 20px;
  color: #282c34;
  font-size: 18px;
}
// 水球卡片
.liquidfill {
    width: 350px;
}
// 水球标题
.liquidfill-title {
  margin: 20px 0 0 20px;
  color: #282c34;
  font-size: 18px;
}
// 统计卡片
.statistics {
    flex: 1;
}
// 统计卡片内容盒子
.card-content-box {
    margin: 30px 20px 20px 20px;
    display: flex;
    justify-content: space-between;
    height: 170px;
}
// 统计卡片内容
.card-content {
    width: 24%;
    height: 90%;
    border-radius: 10px;
}
// 卡片内容标题
.card-content-title {
  color: #fff;
}
// 卡片内容文本
.card-content-text {
  font-size: 30px;
  color: #fff;
}
// 顶部第一个盒子背景颜色
.one-bgcolor {
    background: -webkit-linear-gradient(left, #61a4ff, #6ba0fe, #729eff, #769bff);
}
// 顶部第二个盒子背景色
.two-bgcolor {
    background: -webkit-linear-gradient(left, #bf51fe, #a825fc, #9d0dfa, #9802f9);
}
// 顶部第三个盒子背景颜色
.three-bgcolor {
    background: -webkit-linear-gradient(left, #70e137, #67de2c, #5ad81c, #51d50f);
}
// 顶部第四个盒子背景颜色
.four-bgcolor {
    background: -webkit-linear-gradient(left, #fc6a6b, #fe6464, #fe5b5c, #ff5555);
}
// 顶部卡片文本内容盒子
.text-box {
  margin-top: 50px;
  margin-left: 30px;
}
// 选择搜索盒子
.select-search-box {
    height: 30px;
    margin-top: 15px;
}
// 选择盒子
.select-box {
    float: left;
}
// 输入框盒子
.input-box {
    float: left;
}
// 搜索盒子
.search-box {
    float: right;
}
// 搜索文本
.search-text {
    float: right;
    line-height: 32px;
    margin-left: 20px;
    font-size: 24px;
    color: #36a3f7;
    cursor: pointer;
}
// 统计盒子顶部
.statistics-top {
  height: 50px;
}
// 统计盒子顶部标题
.statistics-title {
  line-height: 50px;
  color: #282c34;
  font-size: 18px;
}
// 体温统计表盒子
.temperature-box {
    display: flex;
}
// 导出按钮
.export-button {
  float: right;
  background: #657eff;
  border: 0;
}
// 体温图表
.temperature-chart {
    flex: 1;
}
// 日期选择
/deep/ .el-date-editor {
    width: 300px;
}
// 选择框
/deep/ .el-select {
    width: 120px;
    margin-left: 10px;
}
// input输入框
/deep/ .el-input__inner {
  border-radius: 15px;
}
// 体温异常信息盒子
.information-item-box {
    height: 40px;
    margin-bottom: 10px;
}
// 数字标题
.number-title-top {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #314659;
    color: #fff;
    text-align: center;
    line-height: 20px;
    margin-top: 10px;
    float: left;
    font-size: 14px;
}
.number-title {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #f0f2f5;
    color: #314659;
    text-align: center;
    line-height: 20px;
    margin-top: 10px;
    float: left;
    font-size: 14px;
}
// 班级名
.className {
    float: left;
    line-height: 40px;
    margin-left: 20px;
    font-size: 14px;
}
// 人数
.numberPeople {
    float: right;
    line-height: 40px;
    margin-right: 30px;
    color: #36a3f7;
    font-size: 14px;
    cursor: pointer;
}
// 中部卡片盒子
.center-card-box {
    display: flex;
    margin-top: 10px;
}
//中部卡片
.center-card {
    width: 50%;
}
// 中部卡片标题
.center-card-title {
  margin-bottom: 20px;
  color: #282c34;
  font-size: 18px;
}
// 中部班级盒子
.class-box {
  height: 500px;
  overflow: hidden;
}
// 中部班级信息盒子
.information-box {
  height: calc(100% - 10px);
  overflow-y: auto;
  scrollbar-width: none; // 隐藏滚动条火狐
  &::-webkit-scrollbar {// 隐藏滚动条谷歌
    display: none;
  }
}
// 查看详情文本
.lookDetail {
  color: #409eff;
  cursor: pointer;
}
// 分页器样式
.el-pagination {
  float:right;
  margin: 20px 0 40px 0 ;
}
</style>
