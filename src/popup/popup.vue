<template>
    <transition name="fade">
        <!--蒙版-->
        <!--@touchmove.prevent: 防止底部页面滚动-->
        <div class="mask" v-if="show" @touchmove.prevent>
            <div class="window">
                <div class="title">{{title}}</div>
                <div class="content-box">
                    <span class="content">{{content}}</span>
                </div>
                <div class="footer-box" @click="btnClick">{{btnText}}</div>
            </div>
        </div>
    </transition>
</template>

<script>
import router from '../router/index.js'
export default {
    data() {
        return {
            show: false,
            title: '',
            content: '',
            btnText: '',
            status: '',
        }
    },
    methods: {
        btnClick() {
            this.show = false
            this.status === "2" ? router.push('/home/systemSetup/plateManage') : ''
        }
    },
}
</script>

<style lang="scss" scpoed>
.mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    .window {
        position: fixed;
        left: 50%;
        top: 40%;
        background: #fff;
        padding: 20px;
        border-radius: 10px;
        transform: translate(-50%, -40%);
        color: #21252b;
        border: 1px solid #dcdfe6;
        width: 30%;
    }
} 
.title {
    font-size: 20px;
    margin-bottom: 15px;
}
.content {
    font-size: 18px;
    color: #999999;
}
.footer-box {
    margin-top: 20px;
    text-align: right;
    font-size: 16px;
    color: #861ef3;
    cursor: pointer;
}
</style>