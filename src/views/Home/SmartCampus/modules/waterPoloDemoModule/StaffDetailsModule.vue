<template>
  <div>
    <el-card class='mycard-top'>
      <span class='temperature-text' @click='routerGo'>温度统计</span>/<span class='name-text'>{{name}}温度统计</span>
      <div class='temperature-content'>
        <div class='img-box'>
          <img class='img-style' src="https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg" width="150" height="150"/>
          <div class='img-text-box'>{{name}}温度情况统计</div>
        </div>
        <div class='top-card-box'>
          <div class='top-card one-bgcolor'>
            <div class='text-box'>
              <div class='card-content-title'>累计识别</div>
              <div class='card-content-text'>320次</div>
            </div>
          </div>
          <div class='top-card two-bgcolor'>
            <div class='text-box'>
              <div class='card-content-title'>最近一次体温异常</div>
              <div class='card-content-text'>2019-12-17 38.5℃</div>
            </div>
          </div>
          <div class='top-card three-bgcolor'>
            <div class='text-box'>
              <div class='card-content-title'>累计体温异常</div>
              <div class='card-content-text'>30次</div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <el-card class='mycard-bottom'>
      <div class='bottom-table-title'>{{name}}异常体温详情</div>
      <el-table border :header-cell-style="{background:'#e7ecff',color:'#2c2626'}" stripe :data="tableData" style="width: 100%;margin-top:15px;">
        <el-table-column prop="img" label="照片" align='center'>
          <template slot-scope='scope'>
            <el-popover
             placement="right"
             width="200"
             trigger="hover">
             <img v-lazy="scope.row.img" width="100%" height="100%"/>
             <img style='cursor:pointer;border-radius:20px;' slot="reference" v-lazy="scope.row.img" width="40" height="40"/>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="number" label="学号" align='center'></el-table-column>
        <el-table-column prop="class" label="班级" align='center'></el-table-column>
        <el-table-column prop="temperature" label="体温" width="120" align='center'>
          <template slot-scope='scope'>
            <span style='color:#ff5858'>{{scope.row.temperature}}℃</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="sex" label="性别" align='center'></el-table-column>
        <el-table-column prop="time" label="时间" align='center'></el-table-column>
      </el-table>
      <el-pagination
        class='el-pagination'
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, prev, pager, next, sizes, jumper"
        :total="tableData.length">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
    data() {
        return {
           tableData: [], 
           // 当前页
           currentPage: 1,
           // 传过来的名字
           name: '',
        }
    },
    created() {
        this.getTbaleData()
        // 获取参数
        this.name = localStorage.getItem('name')
    },
    methods: {
        // 获取表格数据
        getTbaleData() {
            this.tableData = [
                {
                    img: 'https://user-gold-cdn.xitu.io/2019/11/5/16e39396b5133aae?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1',
                    number: '223241',
                    class: '初一一班',
                    sex: '男',
                    time: '2019-12-17',
                    temperature: '37',
                },
                {
                    img: 'https://user-gold-cdn.xitu.io/2019/11/5/16e39396b5133aae?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1',
                    number: '223241',
                    class: '初一一班',
                    sex: '男',
                    time: '2019-12-17',
                    temperature: '37',
                },
                {
                    img: 'https://user-gold-cdn.xitu.io/2019/11/5/16e39396b5133aae?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1',
                    number: '223241',
                    class: '初一一班',
                    sex: '男',
                    time: '2019-12-17',
                    temperature: '37',
                },
                {
                    img: 'https://user-gold-cdn.xitu.io/2019/11/5/16e39396b5133aae?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1',
                    number: '223241',
                    class: '初一一班',
                    sex: '男',
                    time: '2019-12-17',
                    temperature: '37',
                },
                {
                    img: 'https://user-gold-cdn.xitu.io/2019/11/5/16e39396b5133aae?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1',
                    number: '223241',
                    class: '初一一班',
                    sex: '男',
                    time: '2019-12-17',
                    temperature: '37',
                },
                {
                    img: 'https://user-gold-cdn.xitu.io/2019/11/5/16e39396b5133aae?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1',
                    number: '223241',
                    class: '初一一班',
                    sex: '男',
                    time: '2019-12-17',
                    temperature: '37',
                },
            ]
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
        },
        routerGo() {
            this.$router.go(-1)
        }
    },
}
</script>

<style lang="scss" scpoed>
// 顶部卡片
.mycard-top {
  margin: 10px;
} 
// 温度统计文本
.temperature-text {
  font-weight: bold;
  color: #7d7d7d;
  cursor:pointer;
}
// 温度内容盒子
.temperature-content {
  display: flex;
}
// 顶部卡片盒子
.top-card-box {
  display: flex;
  flex: 1;
  justify-content: space-between;
}
// 顶部卡片
.top-card {
  width: 30%;
  height: 120px;
  margin-top: 35px;
  border-radius: 5px;
}
// 顶部第一个盒子背景颜色
.one-bgcolor {
  background: -webkit-linear-gradient(left, #bf51fe, #a825fc, #9d0dfa, #9802f9);
}
// 顶部第二个盒子背景色
.two-bgcolor {
  background: -webkit-linear-gradient(left, #ffa554, #fe9f53, #ff9456, #ff8c56);
}
// 顶部第三个盒子背景颜色
.three-bgcolor {
  background: -webkit-linear-gradient(left, #fc6a6b, #fd6567, #fe5b5c, #ff5657);
}
// 顶部卡片文本内容盒子
.text-box {
  margin-top: 35px;
  margin-left: 30px;
}
// 卡片内容标题
.card-content-title {
  color: #fff;
}
// 卡片内容文本
.card-content-text {
  font-size: 24px;
  color: #fff;
}
// 头像区域盒子
.img-box {
  margin: 20px 100px 0 0;
}
// 头像区域
.img-style {
  border-radius: 75px;
}
// 头像区域文本
.img-text-box {
  margin-top: 10px;
}
// 内容卡片上
.card-top {
  background: #191933;
  border: 0;
  border-radius: 15px;
}
// 内容卡片下
.card-bottom {
  background: #1f0a29;
  border: 0;
  border-radius: 15px;
}
// 底部卡片
.mycard-bottom {
  margin: 10px 10px 40px 10px;
}
// 底部表格区域标题
.bottom-table-title {
  line-height: 50px;
}
// 分页器
.el-pagination {
  float: right;
  margin: 20px 30px 20px 0;
}
</style>