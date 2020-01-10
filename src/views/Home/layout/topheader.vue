<template>
  <div class='topBar'>
    <div class='login-title'><i class='el-icon-user-solid'></i><a>前端学习平台</a></div>
    <!--面包屑导航-->
    <Breadcrumb/>
    <div class='exit-user'>
      <div class='left-el-avatar'>
        <div class='el-icon-message-solid-box'>
          <el-badge :value="4" class="item">
            <i class='el-icon-message-solid' @click='pushMessage'></i>
          </el-badge>
        </div>
        <div  class='el-avatar-box'>
          <el-dropdown placement='bottom'>
            <span class="el-dropdown-link">
              <el-avatar style='cursor:pointer;' slot="reference" src="https://user-gold-cdn.xitu.io/2019/11/5/16e39396b5133aae?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1"></el-avatar>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item class='detailsUser'>
                <div  @click="myhomepage">
                  <i class='el-icon-user-solid'></i><span class='exit-user-text'>我的主页</span>
                </div>
              </el-dropdown-item>
              <el-dropdown-item class='detailsUser'>
                <div @click="myNes">
                  <i class='el-icon-s-tools'></i><span class='exit-user-text'>个人设置</span>
                </div>
              </el-dropdown-item>
              <el-dropdown-item class='detailsUser'>
                <div @click="exitUser">
                  <i class='el-icon-open'></i><span class='exit-user-text'>退出登录</span>
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '../modules/Breadcrumb'
import { clearStore } from '@/utils/storage.js'

export default {
    components:{
        Breadcrumb,
    },
    data() {
        return {
            
        }
    },
    created() {
        
    },
    methods: {
        // 点击查看更多消息
        pushMessage() {
          this.$router.push('/home/messagePage')
        },
        //点击我的主页
        myhomepage() {
          this.$router.push('/home/myhomepage')
        },
        //点击个人设置
        myNes() {
          this.$router.push('/home/myNes')
        },
        // 退出登录
        exitUser() {
          {
            this.$confirm("您确定要退出吗?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              this.$message({
                type: "success",
                message: "退出成功!"
              });
              //退出时清除token
              clearStore("token")
              //跳转到登录页
              this.$router.push({ name: "login" })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消退出'
              })      
            })
          }
        }
    },
}
</script>

<style lang="scss" scoped>
// logo标题区域
.login-title {
  background-color: #011F3D;
  color: #fff;
  line-height: 60px;
  font-size: 18px;
  width: 200px;
  padding-left:20px;
  box-sizing:border-box;
  float:left;
}
// 用户区域
.exit-user {
  float:right;
  width:150px;
  margin-top:10px;
  margin-right:30px;
}
// 用户区域文本
.exit-user-text {
  margin-left:15px;
}
// 移入通知图标样式
.el-icon-message-solid:hover {
  color: #1890ff;
}
// 通知图标样式
.el-icon-message-solid {
  font-size:24px;
  cursor:pointer;
}
// 通知图标区域样式
.el-icon-message-solid-box {
  width:40px;
  float:left;
  margin-top:15px;
}
// 头像区域样式
.el-avatar-box {
  width:80px;
  margin-left:15px;
  float:right;
}
// 头像区域样式
.left-el-avatar {
  float:left;
}
// 头像更多区域样式
.detailsUser {
  cursor:pointer;
  height:40px;
  line-height:40px;
}
// 鼠标移入头像更多区域样式
.detailsUser:hover {
  background-color: #f8f8f8;
}
</style>
