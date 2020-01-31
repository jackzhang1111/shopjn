<template>
<!-- 输入验证码点击确定 => 修改成功页 -->
    <div class="forge-success">
        <navar title="Forgot Password"></navar>
        <div class="content">
            <div class="logo">
                <img src="@/assets/img/login/icon-02@3x.png">
            </div>
            <p>Congratulations!You have successfully set the password!</p>
            <div class="confirm-btn" @click='toLogin'>Log In Now</div>
        </div>
    </div>
</template>

<script>
import navar from '@/multiplexing/navar'
export default {
    props: {

    },
    data() {
        return {

        };
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    watch: {

    },
    methods: {
        toLogin(){
            this.$router.push({name:'登录'})
        }
    },
    components: {
        navar
    },
};
</script>

<style scoped lang="less">
.forge-success{
    .content{
        position: relative;
        top:150px;
        padding: 0 30px;
        .logo{
            width: 200px;
            height:200px;
            margin:0 auto 50px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        p{
            text-align: center;
            font-size: 34px;
            color: #333;
            margin: 0 0 138px;
        }
    }
    .confirm-btn{
        height:88px;
        line-height: 88px;
        text-align: center;
        color: #fff;
        font-size: 40px;
        background-color: #FA5300;
    }
}
</style>
