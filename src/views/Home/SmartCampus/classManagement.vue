<template>
  <div class='card-box'>
    <div class='mybox mybox-left'>
      <el-card class='mycard mycard-left'>
        <p class='mycard-left-title'>{{schoolData[0].departName}}</p>
       <transition name="el-zoom-in-bottom">
        <div v-if='gradeDatas.length'>
           <div class='gradeData' v-for='(item,index) in gradeDatas' :key='index' @click='clickGrade(item, index)'>{{ item.departName }}</div>
        </div>
      </transition>
        <el-button class='mycard-left-button' type='primary' @click='newGrade'>新建年级</el-button>
      </el-card>
    </div>
    <div class='mybox mybox-right'>
     <transition name="el-zoom-in-bottom">
      <el-card class='mycard' v-if='showGrade'>
        <p class='mycard-left-title'>{{schoolData[0].departName}}\{{gradeTitle}}</p>
        <p class='mycard-left-title'>年级名称: {{gradeTitle}}<span class='editGrade' @click='editGrade(gradeTitle)'>编辑</span></p>
        <el-button class='mycard-right-button' type='primary' @click='newClass'>创建班级</el-button>
      </el-card>
     </transition>
      <el-card class='mycard mycard-right'>
       <transition name="el-zoom-in-bottom">
        <div v-if='showGrade === false'>
          <div class='mycard-right-img-box'>
            <img src='@/assets/image/Snipaste_2019-11-27_10-07-38.png'>
          </div>
          <div class='mycard-right-box-text'>
            <span class='mycard-right-text'>{{gradeDatas.length  ? '请先选择年级，再查看班级' : '暂无班级，请先创建年级进行班级创建'}}</span>
          </div>
        </div>
      </transition>
      <transition name="el-zoom-in-bottom">
        <div v-if='classDatas.length && showGrade'>
          <div v-for='(item,index) in classDatas' :key='index' class='classBox' @click='clickClassBox(index)'>
            <div class='classBox-content-box'></div>
            <span class='className-text'>{{item.departName}}</span>
            <i class='el-icon-arrow-right' @click='classInformation(item)'></i>
          </div>
        </div>
        <div v-else-if='!classDatas.length && showGrade'>
          <div class='mycard-right-img-box'>
            <img src='@/assets/image/Snipaste_2019-11-27_10-07-38.png'>
          </div>
          <div class='mycard-right-box-text'>
            <span class='mycard-right-text'>暂无班级，请先进行班级创建</span>
          </div>
        </div>
      </transition>
      </el-card>
    </div>

    <!--新建年级和班级抽屉-->
    <CreateGradeDialog :gradeAndClass='gradeAndClass' @shutDown='shutDown' @determineGrade='determineGrade' @determineClass='determineClass'/>

    <!--查看班级抽屉-->
    <ViewClassDialog :classObj='classObj'/>
  </div>
</template>

<script>
import CreateGradeDialog from './modules/classManagementModule/CreateGradeDialog'
import ViewClassDialog from './modules/classManagementModule/ViewClassDialog'

export default {
    components: {
        CreateGradeDialog,
        ViewClassDialog
    },
    data() {
        return {
            // 传递给新建年级和班级子组件
            gradeAndClass: {
                dialog: false,
                title: '',
                inputNmae: '',
            },
            // 传递给查看班级抽屉
            classObj: {
                classDrawer: false,
                gradeVal: '',
                classVal: '',
            },
            // 传递给编辑弹框
            editDialogDatas: {
                showEditDialog: false,
                gradeName: '',
            },
            // 学校数据
            schoolData: [],
            // 班级选择
            checked: false,
            // 控制新建年级后的年级
            showClassBox: false,
            // 年级
            gradeDatas: [],
            // 班级
            classDatas: [],
            // 显示年级
            showGrade: false,
            // 年级标题
            gradeTitle: '',
        }
    },
    created() {
        // 获取账号所属学校和班级
        this.loadTree()
    },
    methods: {
        // 获取账号所属学校和班级
        loadTree(num) {
           // 学校数据
           this.schoolData = [{
               children: [
                   {
                     departId: 'A01A01',
                     id: '11',
                     departName: '高一',
                     children: [
                         {
                            epartId: 'A01A01A01',
                            id: '111',
                            departName: '高一(1)班',
                         }
                     ]
                   },
                   {
                     departId: 'A01A02',
                     id: '12',
                     departName: '高二',
                     children: [
                         {
                            epartId: 'A01A02A01',
                            id: '111',
                            departName: '高二(1)班',
                         }
                     ]
                   },
                   {
                     departId: 'A01A03',
                     id: '13',
                     departName: '高三',
                     children: [
                         {
                            epartId: 'A01A03A01',
                            id: '111',
                            departName: '高三(1)班',
                         }
                     ]
                   },
               ],
               departId: 'A01',
               id: '1',
               departName: '前端学习中学',
           }]
           // 年级数据
           this.gradeDatas = this.schoolData[0].children
           // 判断num是否为1来确定是否为新建班级
           if(num === 1) {
             // 新建班级，重新获取班级数据
             for(let i = 0;i < this.gradeDatas.length;i++) {
                 if(this.gradeDatas[i].id === this.gradeID) {
                     if(this.gradeDatas[i].children !== null) {
                         this.classDatas = this.gradeDatas[i].children
                     }else {
                         this.classDatas = []
                     }
                 }
             }
           }
        },
        // 新建年级
        newGrade() {
            this.gradeAndClass.dialog = true
            this.gradeAndClass.title = '新建年级'
            this.gradeAndClass.inputNmae = '年级名称'
        },
        // 关闭新建年级抽屉
        shutDown() {
            this.gradeAndClass.dialog = false
        },
        // 确定新建年级
        determineGrade(data) {
            console.log(data,'新建年级数据')
            this.gradeAndClass.dialog = false
            if(this.gradeDatas.indexOf(data) === -1) {
                this.gradeDatas.push(data)
            }else {
                this.$message.error('新建年级重复,请重新创建!')
            }
        },
        // 点击年级
        clickGrade(data, index) {
            // 保存当前选中的年级名称
            this.gradeTitle = data.departName
            // 保存当前选中的年级ID
            this.gradeID = data.id
            // 打开年级显示区域
            this.showGrade = true

            // 获取班级
            for(let i = 0;i < this.gradeDatas.length;i++) {
                if(this.gradeDatas[i].id === data.id) {
                    console.log(this.gradeDatas[i])
                    if(this.gradeDatas[i].children !== null) {
                        this.classDatas = this.gradeDatas[i].children
                    }else {
                        this.classDatas = []
                    }
                }
            }


            // 获取所有需要添加类名的元素
            let arr = document.getElementsByClassName("gradeData")
            // 判断类名的添加和移除
            for(let i = 0;i < arr.length;i++) {
                if(i === index) {
                    // 给当前点击元素添加类名
                    arr[i].classList.add("active")
                }else {
                    // 移除其他元素的类名
                    arr[i].classList.remove("active")
                }
            }
        },
        // 新建班级
        newClass() {
            this.gradeAndClass.dialog = true
            this.gradeAndClass.title = '新建班级'
            this.gradeAndClass.inputNmae = '班级名称'
        },
        // 确认新建班级
        determineClass(data) {
            console.log(data,'新建班级数据')
            this.gradeAndClass.dialog = false
        },
        // 点击查看班级
        classInformation(data) {
            this.classObj.classDrawer = true
            // 年级名称
            this.classObj.gradeVal = this.gradeTitle
            // 班级名称
            this.classObj.classVal = data.departName
            // 学校名称
            this.classObj.school = this.schoolData.departName
            // 班级ID
            this.classObj.classID = data.id
        },
        // 点击班级盒子
        clickClassBox(index) {
            // 获取所有需要添加类名的元素
            let arr = document.getElementsByClassName("classBox")
            // 判断类名的添加和移除
            for(let i = 0;i < arr.length;i++) {
                if(i === index) {
                    // 给当前点击元素添加类名
                    arr[i].classList.add("active")
                }else {
                    // 移除其他元素的类名
                    arr[i].classList.remove("active")
                }
            }
        }
    },
}
</script>

<style lang="scss" scoped>
// 卡片区域盒子
.card-box {
    display: flex;
    --color: #99ccff;
    --px: 150px;
}
// 卡片
.mycard {
    margin: 10px;
}
// 左边卡片盒子
.mybox-left {
    width: 300px;
}
// 左边卡片
.mycard-left {
    height: 100%;
}
// 左边卡片标题
.mycard-left-title {
    font-size: 20px;
}
// 左边卡片按钮
.mycard-left-button {
    width: 140px;
    margin-top: 20px;
}
// 右边卡片盒子
.mybox-right {
    flex: 1;
}
// 右边卡片
.mycard-right {
    height: 100%;
}
// 右边卡片文本盒子
.mycard-right-box-text {
    text-align: center;
    margin-bottom: 200px;
}
// 右边卡片文本
.mycard-right-text {
    font-size: 30px;
    font-weight: bold;
}
// 年级盒子
.gradeData {
    width: 240px;
    height: var(--px);
    line-height: var(--px);
    font-size: 30px;
    font-weight: bold;
    background: #fff;
    padding-left: 25px;
    box-sizing: border-box;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 15px;
    border: 1px solid #ebeef5;
    &:hover {
        background: #f5f7fa;
        border: 1px solid var(--color);
    }
}
// 点击的年级盒子
.active {
   background: var(--color) !important;
}
// 右边卡片按钮
.mycard-right-button {
    width: 140px;
}
// 右边图片盒子
.mycard-right-img-box {
    margin: 0 auto;
    width: 280px;
    height: 160px;
    margin-top: 200px;
    margin-bottom: 20px;
}
// 右边班级盒子
.classBox {
    width: 100%;
    height: var(--px);
    border: 1px solid #ebeef5;
    background: #fff;
    border-radius: 5px;
    margin-bottom: 20px;
    &:hover {
        background: #f5f7fa;
        border: 1px solid var(--color);
    }
}
// 班级盒子内容盒子
.classBox-content-box {
    height: 60px;
    width: 100%;
}
// 班级名称文本
.className-text {
    font-size: 30px;
    font-weight: bold;
    line-height: 40px;
    margin-left: 30px;
}
// 班级图标
.el-icon-arrow-right {
    float: right;
    font-size: 50px;
    color: #8c8c8c;
    cursor: pointer;
}
// 编辑年级名称文本
.editGrade {
    font-size: 16px;
    padding-left:25px;
    color:#0066ff;
    cursor: pointer;
}
</style>