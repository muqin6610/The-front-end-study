<template>
  <div class='mycard-box'>
    <el-card class='mycard' style='border-radius:40px 0 0 0;'>
      <span class='my-text'>留言区</span>
      <span class='my-more-text' @click='lookMore(tableData, "留言区")'>查看更多</span>
      <el-divider></el-divider>
      <el-table
      :data="tableData"
      style="width: 100%;margin-top:20px;"
      :show-header="false"
      >
        <el-table-column
          width="80"
          prop="avatar"
          label="头像">
          <template slot-scope='scope'>
            <el-popover
             placement="right"
             width="200"
             trigger="hover">
             <img :src="scope.row.avatar" width="100%" height="100%"/>
             <img style='cursor:pointer;border-radius:5px' slot="reference" :src="scope.row.avatar" width="30" height="30"/>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          width="150"
          align='left'
          prop="name"
          show-overflow-tooltip
          label="用户名">
          <template slot-scope='scope'>
            <span style='font-weight:bold'>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column
          width="120"
          align='left'
          prop="address"
          label="用户性质">
          <template slot-scope='scope'>
            <span style='color:#8a9aa9'>{{scope.row.address}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align='left'
          prop="content"
          show-overflow-tooltip
          label="内容">
          <template slot-scope='scope'>
            <span>留言内容&nbsp;:&nbsp;&nbsp;{{scope.row.content}}</span>
            &nbsp;·&nbsp;<span style='color:#8a9aa9'>{{ scope.row.date }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class='mycard' style='border-radius:0 40px 0 0;'>
      <span class='my-text'>反馈区</span>
      <span class='my-more-text' @click='lookMore(tableData2, "反馈区")'>查看更多</span>
      <el-divider></el-divider>
      <el-table
      :data="tableData2"
      style="width: 100%;margin-top:20px;"
      :show-header="false"
      >
        <el-table-column
          width="80"
          prop="avatar"
          label="头像">
          <template slot-scope='scope'>
            <el-popover
             placement="right"
             width="200"
             trigger="hover">
             <img :src="scope.row.avatar" width="100%" height="100%"/>
             <img style='cursor:pointer;border-radius:5px' slot="reference" :src="scope.row.avatar" width="30" height="30"/>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          width="150"
          show-overflow-tooltip
          align='left'
          prop="name"
          label="用户名">
          <template slot-scope='scope'>
            <span style='font-weight:bold'>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column
          width="120"
          align='left'
          prop="address"
          label="用户性质">
          <template slot-scope='scope'>
            <span style='color:#8a9aa9'>{{scope.row.address}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align='left'
          prop="content"
          show-overflow-tooltip
          label="内容">
          <template slot-scope='scope'>
            <span>反馈内容&nbsp;:&nbsp;&nbsp;{{scope.row.content}}</span>
            &nbsp;·&nbsp;<span style='color:#8a9aa9'>{{ scope.row.date }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class='mycard' style='border-radius:0 0 0 40px;margin-bottom:30px'>
      <span class='my-text'>点赞区</span>
      <span class='my-more-text' @click='lookMore(tableData3, "点赞区")'>查看更多</span>
      <el-divider></el-divider>
      <el-table
      :data="tableData3"
      style="width: 100%;margin-top:20px;"
      :show-header="false"
      >
        <el-table-column
          align='left'
          prop="content"
          label="内容">
          <template slot-scope='scope'>
            <span style='font-weight:bold'>{{scope.row.content}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align='left'
          prop="time"
          label="点赞次数">
          <template slot-scope='scope'>
            <span><i class='el-icon-thumb'></i>&nbsp;{{scope.row.time}}次</span>
            &nbsp;·&nbsp;<span style='color:#8a9aa9'>{{ scope.row.date }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class='mycard' style='border-radius:0 0 40px 0;margin-bottom:30px'>
      <span class='my-text'>收藏区</span>
      <span class='my-more-text' @click='lookMore(tableData4, "收藏区")'>查看更多</span>
      <el-divider></el-divider>
      <el-table
      :data="tableData4"
      style="width: 100%;margin-top:20px;"
      :show-header="false"
      >
        <el-table-column
          align='left'
          prop="content"
          label="内容">
          <template slot-scope='scope'>
            <span style='font-weight:bold'>«&nbsp;{{scope.row.content}}&nbsp;»</span>
          </template>
        </el-table-column>
        <el-table-column
          align='left'
          prop="time"
          label="收藏次数">
          <template slot-scope='scope'>
            <span><i class='el-icon-s-claim'></i>&nbsp;{{scope.row.time}}次</span>
            &nbsp;·&nbsp;<span style='color:#8a9aa9'>{{ scope.row.date }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
    data() {
        return {
            //表格数据源
           tableData: [{
            avatar: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
            date: '一天前',
            name: '慕钦C',
            address: '管理员',
            content:'十步杀一人千里不留行',
          }, {
            avatar: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
            date: '三天前',
            name: '凌凌漆',
            address: '十级用户',
            content:'云想衣裳花想容',
          }, {
            avatar: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
            date: '三天前',
            name: '曹达华',
            address: '九级用户',
            content:'落霞与孤鹜齐飞',
          }, {
            avatar: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
            date: '四天前',
            name: '周星星',
            address: '一级用户',
            content:'大漠孤烟直',
          }, ] ,
            //表格数据源
           tableData2: [{
            avatar: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
            date: '六天前',
            name: '慕钦C',
            address: '管理员',
            content:'希望再多添加一些书籍',
          }, {
            avatar: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
            date: '六天前',
            name: '凌凌漆',
            address: '十级用户',
            content:'希望有屏蔽功能',
          }, {
            avatar: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
            date: '十天前',
            name: '曹达华',
            address: '九级用户',
            content:'无法分享到微信',
          }, {
            avatar: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
            date: '一个月前',
            name: '周星星',
            address: '一级用户',
            content:'啥时候出视频板块啊!',
          }] ,
            //表格数据源
           tableData3: [{
            content: '希望再多添加一些书籍',
            time: '3015',
            date: '刚刚',
          }, {
            content: '十步杀一人千里不留行',
            time: '2854',
            date: '刚刚',
          }, {
            content: '无法分享到微信',
            time: '2215',
            date: '刚刚',
          },  {
            content: '落霞与孤鹜齐飞',
            time: '2215',
            date: '刚刚',
          }, {
            content: '啥时候出视频板块啊!',
            time: '1915',
            date: '一天前',
          }] ,
            //表格数据源
           tableData4: [{
            content: '前端入门',
            time: '1015',
            date: '刚刚',
          }, {
            content: '前端之框架',
            time: '854',
            date: '刚刚',
          }, {
            content: 'node.js应用',
            time: '715',
            date: '刚刚',
          },  {
            content: '高级JS',
            time: '515',
            date: '刚刚',
          }, {
            content: '记裸辞的艰辛',
            time: '315',
            date: '刚刚',
          }, {
            content: '程序员笔记本电脑的选择',
            time: '215',
            date: '三天前',
          }] ,
        }
    },
    created() {
        
    },
    methods: {
        // 查看更多
        lookMore(data, str) {
          console.log(data)
          // 跳转到更多页面
          this.$router.push({path:'/home/systemSetup/plateManage/lookPlateMore',query:{
            palteData:JSON.stringify(data),
            title: str,
          }})
        }
    },
}
</script>

<style lang="scss" scoped>
// 卡片样式
.mycard {
    margin:20px 0 10px 0;
    width:48%;
    box-shadow: 5px 5px 5px #888888;
}
// 包裹卡片盒子的样式
.mycard-box {
    display:flex;
    flex-wrap: wrap;
    justify-content: space-around;
}   
// 板块标题文本样式
.my-text {
    font-size:18px;
    font-weight:bold;
}
// 板块更多文本样式
.my-more-text {
  float:right;
  margin-top:20px;
  font-size:14px;
  cursor:pointer;
  &:hover {
    color: #1890ff;
  }
}
</style>