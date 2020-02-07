<template>
<!-- 修改昵称 -->
    <div class="edit-name">
        <settings-header title="编辑资料" title2="完成"></settings-header>
        <div class="head">
            <div class="head-con">
                <div class="head-img">
                    <img src="@/assets/img/tabbar/my/account/touxiang@2x.png">
                </div>
                <div class="c-orange head-text">更改头像</div>
            </div>
        </div>
        <div>
            <div class="cell">
                <span class="input-name">昵称</span>
                <input type="search" class="input-xt" placeholder="请输入您的昵称" v-model="sjhm">
            </div>
            <div class="cell">
                <span class="input-name">会员ID</span>
                <input type="search" class="input-xt" placeholder="请输入您的昵称" v-model="num">
            </div>
        </div>
    </div>
</template>

<script>
import settingsHeader from './itemComponents/settingsHeader'
export default {
    props: {

    },
    data() {
        return {
            sjhm:'',
            num:123
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

    },
    components: {
        settingsHeader
    },
};
</script>

<style scoped lang="less">
.edit-name{
    .head{
        height: 300px;
        text-align: center;
        position: relative;
        .head-con{
            position: relative;
            top:50px;
        }
        .head-img{
            display: inline-block;
            width: 160px;
            height: 160px;
            margin-bottom: 19px;
            border-radius:50%;
            border:4px solid rgba(250,83,0,1);
            box-sizing: border-box;
        }
    }
    .cell{
        height: 88px;
        line-height: 88px;
        padding: 0 30px;
        background-color: #fff;
        color: #999;
        position: relative;
        font-size: 26px;
        border-bottom: 1px solid #F2F3F5;
        &:nth-last-child(1){
            border:0
        }
        .input-xt{
            height: 40px;
            border: 0;
            width: 70%;
            background-color: #fff;
        }
        .input-name{
            width: 140px;
            display: inline-block;
            font-size:28px;
            color: #333;
        }
    }
}
</style>
