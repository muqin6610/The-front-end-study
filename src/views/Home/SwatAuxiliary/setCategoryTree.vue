<template>
  <div class='mycard-box'>
    <el-card class='mycard'>
      <div>
        <el-button type="primary">新增类别</el-button>
        <el-button type="primary">新增一级</el-button>
        <el-button>删除类别</el-button>
        <el-divider></el-divider>
      </div>
      <el-tree
        :data="data"
        @node-contextmenu="rightClick"
        show-checkbox
        node-key="id"
        :default-expand-all="true"
        :props="defaultProps">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelTheReset">取 消</el-button>
        <el-button type="primary" @click="addDialog">确 定</el-button>
      </span>
      <div v-show="menuVisible">
		<div id="menu" class="menu">
			<span class="menu__item">新增类别</span>
			<span class="menu__item">删除类别</span>
		</div>
      </div>
    </el-card>
    <el-card class='mycard'></el-card>
  </div>
</template>

<script>
export default {
    data() {
        return {
            data: [{
              id: 1,
              label: '基础训练',
              children: [{
                id: 4,
                label: '体能素质',
                children: [{
                  id: 9,
                  label: '力量',
                }, {
                  id: 10,
                  label: '耐力',
                }, {
                  id: 11,
                  label: '速度',
                }]
              }]
            }, {
              id: 2,
              label: '专业训练',
              children: [{
                id: 5,
                label: '无人机'
              }, {
                id: 6,
                label: '特种作战'
              }]
            }, {
              id: 3,
              label: '综合训练',
              children: [{
                id: 7,
                label: '教案编写'
              }, {
                id: 8,
                label: '教官培训'
              }]
            }],
            defaultProps: {
              children: 'children',
              label: 'label'
            },
            menuVisible: false,
        }
    },
    methods: {
        cancelTheReset() {
           
        },
        addDialog() {
            
        },
        rightClick(MouseEvent, object, Node, element) { // 鼠标右击触发事件
    	    this.menuVisible = false // 先把模态框关死，目的是 第二次或者第n次右键鼠标的时候 它默认的是true
    	    this.menuVisible = true // 显示模态窗口，跳出自定义菜单栏
    	    var menu = document.querySelector('#menu')
     	    menu.style.left = MouseEvent.clientX + 1 + 'px'
    	    document.addEventListener('click', this.foo) // 给整个document添加监听鼠标事件，点击任何位置执行foo方法
    	    menu.style.top = MouseEvent.clientY - 10 + 'px'
         },
         foo() { // 取消鼠标监听事件 菜单栏
         	this.menuVisible = false
         	document.removeEventListener('click', this.foo) // 要及时关掉监听，不关掉的是一个坑，不信你试试，虽然前台显示的时候没有啥毛病，加一个alert你就知道了
         },
    },
}
</script>

<style lang="scss" scoped>
/deep/ .el-dialog__header {
    border-bottom: 1px solid #dcdfe6;
}  
.mycard-box {
    display: flex;
    justify-content: space-around;
}
.mycard {
    margin: 10px 5px 10px 5px;
    width: 48%;
}

.menu__item {
	display: block;
  line-height: 35px;
	text-align: center;
}

.menu {
  height: 70px;
  width: 90px;
	position: absolute;
	border-radius: 5px;
	border: 1px solid #dcdfe6;
	background-color: #ffffff;
  font-size: 16px;
  .menu__item:hover {
  	color: #7a7c80;
    cursor: pointer;
  }
}
</style>