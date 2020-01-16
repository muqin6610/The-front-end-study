<template>
  <el-dialog modal :before-close='cancelSelect' :title="sendSelectProgram.trainingName" :visible.sync="sendSelectProgram.showTransfer">
    <div style='height:400px;'>
      <div class='tree-box'>
        <div class='treeCheck-box-title'>选择分类</div>
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </div>
      <div class='check-box'>
        <div class='treeCheck-box-title'>选择项目</div>
        <el-checkbox-group class='checkbox-group' v-model="selectProgram">
          <el-checkbox style='margin-bottom:15px' v-for='item in options' :key='item.value' :label="item">{{item.label}}</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size='medium' @click="cancelSelect">取 消</el-button>
      <el-button size='medium' type="primary" @click="clickSelect">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
    props:{
      sendSelectProgram: {
        showTransfer: {
            type: Boolean,
            defaultL: false,
        },
        trainingName: {
          type: String,
          default: '',
        },
      }  
    },
    data() {
        return {
          selectProgram: [],
          options: [],
          //树形选择器数据源
          data: [{
            label: '基础训练',
            children: [{
              label: '理论学习',
              children: [{
                label: '习近平重要讲话',
              }]
            }]
          }, {
            label: '专业训练',
            children: [{
              label: '体能素质',
              children: [{
                label: '耐力',
              }]
            }, {
              label: '摩托车',
              children: [{
                label: '特技驾驶',
              }]
            }]
          }, {
            label: '专项培训',
            children: [{
              label: '无人机',
              children: [{
                label: '极限悬停',
              }]
            }, {
              label: '机器人',
              children: [{
                label: '机器人排雷',
              }]
            }]
          }, {
            label: '综合培训',
            children: [{
              label: '狙击比武',
              children: [{
                label: '全队比武',
              }]
            }, {
              label: '教官训练',
              children: [{
                label: '培训基础知识',
              }]
            }]
          }],
          //树形控件配置
          defaultProps: {
            children: 'children',
            label: 'label'
          },
        }
    },
    created() {
        
    },
    methods: {
       handleNodeClick(data) {
         console.log(data)
         switch(data.label) {
           case '习近平重要讲话' :
            this.options = [
                  {value:1,label:'卧推30公斤'},
                  {value:2,label:'推举120公斤'},
                  {value:3,label:'引体向上'},
                  {value:4,label:'翻轮胎'},
                ]
            break;
           case '耐力' :
            this.options = [
                  {value:1,label:'卧推30公斤'},
                  {value:2,label:'推举120公斤'},
                  {value:3,label:'引体向上'},
                  {value:4,label:'翻轮胎'},
                ]
            break;
           case '特技驾驶' :
            this.options = [
                  {value:1,label:'卧推30公斤'},
                  {value:2,label:'推举120公斤'},
                  {value:3,label:'引体向上'},
                  {value:4,label:'翻轮胎'},
                ]
            break;
           case '极限悬停' :
            this.options = [
                  {value:1,label:'卧推30公斤'},
                  {value:2,label:'推举120公斤'},
                  {value:3,label:'引体向上'},
                  {value:4,label:'翻轮胎'},
                ]
            break;
           case '机器人排雷' :
            this.options = [
                  {value:1,label:'卧推30公斤'},
                  {value:2,label:'推举120公斤'},
                  {value:3,label:'引体向上'},
                  {value:4,label:'翻轮胎'},
                ]
            break;
           case '全队比武' :
            this.options = [
                  {value:1,label:'卧推30公斤'},
                  {value:2,label:'推举120公斤'},
                  {value:3,label:'引体向上'},
                  {value:4,label:'翻轮胎'},
                ]
            break;
           case '培训基础知识' :
            this.options = [
                  {value:1,label:'卧推30公斤'},
                  {value:2,label:'推举120公斤'},
                  {value:3,label:'引体向上'},
                  {value:4,label:'翻轮胎'},
                ]
            break;
           default:
            break;
         }
       },
        //点击确定
       clickSelect(){
           this.$emit('selectProgram',this.selectProgram)
           this.value = []
           this.selectProgram= []
       },
       //点击取消
       cancelSelect(){
           this.$emit('selectProgram')
           this.value = []
           this.selectProgram= []
       },
    },
}
</script>

<style lang="scss" scoped>
/**树形选择盒子 */
.tree-box {
  border: 1px solid #dcdfe6;
  width: 45%;
  height: 100%;
  float: left;
}
/**多选项目盒子 */
.check-box {
  border: 1px solid #dcdfe6;
  width: 45%;
  height: 100%;
  float: right;
}
/**树形和多选项选择盒子标题 */
.treeCheck-box-title {
  background-color: #a0cfff;
  margin-bottom: 10px;
  color: #fff;
  height: 35px;
  line-height: 35px;
  text-align: center;
}
/**项目多选框 */
.checkbox-group {
  width: 100px;
  margin-left: 40px;
}
</style>