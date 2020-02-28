<template>
<!-- 关于TOSPINO -->
    <div class="about-tospino">
        <settings-header :title="headTitle"></settings-header>
        <div class="tospino-body" v-if="ifAbout">
            <div class="ewm-body">
                <div class="ewm-img"></div>
                <div>V1.0.0.0</div>
            </div>
            <div class="cell" @click="jumpRouter('Privacy Policy')">
                <span>Privacy Policy</span>
                <van-icon name="arrow" class="arrow c-999"/>
            </div>
            <div class="cell" @click="jumpRouter('User Agreement')">
                <span>User Agreement</span>
                <van-icon name="arrow" class="arrow c-999"/>
            </div>
            <div class="cell" @click="jumpRouter('Help Center')">
                <span>Help Center</span>
                <van-icon name="arrow" class="arrow c-999"/>
            </div>
            <div class="cell" @click="jumpRouter('About Tospino')">
                <span>About Tospino</span>
                <van-icon name="arrow" class="arrow c-999"/>
            </div>
            <div class="cell">
                <span>Customer service:211-2626622</span>
                <van-icon name="arrow" class="arrow c-999"/>
            </div>
        </div>
        <router-view v-else></router-view>
    </div>
</template>

<script>
import settingsHeader from './itemComponents/settingsHeader'
export default {
    props: {

    },
    data() {
        return {
            ifAbout:true,
            headTitle:'About TOSPINO'
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        this.ifAbout = this.$route.name == "About TOSPINO" ? true : false
        this.headTitle = this.$route.name 
    },
    watch: {
        $route: {
            handler: function(val, oldVal){
                this.ifAbout = val.name == "About TOSPINO" ? true : false
                this.headTitle = this.$route.name 
            },
            // 深度观察监听
            deep: true
        }
    },
    methods: {
        jumpRouter(name){
            this.$router.push({name})
        },
        
    },
    components: {
        settingsHeader
    },
};
</script>

<style scoped lang="less">
.about-tospino{
    height: 100vh;
    background-color: #fff;
}
.settings-header{
    width: 100%;
    height: 88px;
    background-color: #f2f3f5;
    text-align: center;
    position: relative;
    .arrow-left{
        position: absolute;
        top:20px;
        left:30px;
        font-size: 40px;
        
    }
    .header-t1{ 
        display: inline-block;
        line-height: 88px;
        font-size: 36px;
        color: #010101;
    }
    .header-t2{
        position: absolute;
        top:20px;
        right: 100px;
        font-size: 40px;
    }
}
.tospino-body{
    .ewm-body{
        text-align: center;
        padding: 82px 0 120px;
        .ewm-img{
            display: inline-block;
            width: 300px;
            height: 300px;
            background-color: #E0E2E4;
            margin-bottom: 19px;
        }
    }
}
.cell{
    height: 88px;
    line-height: 88px;
    padding: 0 30px;
    background-color: #fff;
    color: #333;
    position: relative;
    font-size: 30px;
    border-bottom: 1px solid #DCDCDC;
    margin-bottom: 20px;
    .arrow{
        position: absolute;
        right:30px;
        top:50%;
        transform: translateY(-50%);
    }
}
</style>
