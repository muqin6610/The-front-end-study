<template>
    <div class="error">
        <span class="aaa">404</span> <br><br>
        <span class="bbb">访问的页面暂时迷路</span> <br><br><br>
        <span class="bbb">请返回平台重新选择页面，谢谢！</span>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
        
    },
}
</script>

<style lang="scss" scoped>
.error {
    text-align: center;
    margin-top: 200px;
    height: 300px;
    .aaa{
        font-size: 80px;
        color: #001529;
        font-weight: bold;
    }
    .bbb{
        font-size: 30px;
        color: #001529;
    }
}
</style>