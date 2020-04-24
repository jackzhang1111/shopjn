<template>
<!-- 登录页 -->
    <div class="login">
        <div class="logo" >
            <img src="@/assets/img/login/logo@3x.png">
        </div>
        <div class="user-name">
            <img src="@/assets/img/login/user@3x.png" alt="图标" class="name-icon">
            <div class="input-con">
                <select name=""> 
                    <option value="0">+233</option> 
                </select> 
                <input type="text" class="name-input" placeholder="Enter your username" v-model="userData.username1">
            </div>
        </div>
        <div class="pass-word">
             <img src="@/assets/img/login/password@3x.png" alt="图标" class="name-icon">
             <div class="input-con">
                <input :type="inputType" class="name-input" placeholder="Enter your password" v-model="userData.password">
                <van-icon :name="eyeName" class="password-icon" size="20px" @click="eyeStatus = !eyeStatus"/>
            </div>
        </div>
        <div class="forgetPassword clearfix">
            <span class="c1 fl-right fs-24" @click="jumpRouter('忘记密码')">Forgot Password？</span>
        </div>
        <div class="upload">
            <div class="load-btn" @click="logIn" :style="{backgroundColor:(disabledSubmit?'#FA5300':'#999')}">Log In</div>
        </div>
        <div class="remarks-option">
            <span class="c2 fs-24" @click="jumpRouter('注册')">Create Account</span>
        </div>
        <div class="footer">
            <div v-if="false"> 
                <div class="line left-80"></div>
                <div class="other">其他方式登录</div> 
                <div class="line right-80"></div>
                <div class="icons">
                    <van-row type="flex" justify="space-between">
                        <van-col span="8" style="text-align:center">
                            <img src="@/assets/img/login/weixin@3x.png">
                        </van-col>
                        <van-col span="8" style="text-align:center">
                            <img src="@/assets/img/login/weixin@3x.png">
                        </van-col>
                        <van-col span="8" style="text-align:center">
                            <img src="@/assets/img/login/weixin@3x.png">
                        </van-col>
                    </van-row>
                </div>
            </div>
            <div class="agreement">
                <input type="checkbox" class="checkbox" v-model="checked">
                <span class="c1 fs-24">
                    <span>You agree to the</span>
                    <span>TOSPINO Law Agreement</span>
                    <span>and the</span>
                    <span @click="zhengce=true" class="c2">Privacy Policy</span>
                </span>
            </div>
        </div>

        <zhezhao v-if="zhengce">
            <div class="tanchuang">
                <div class="tanchuang-header">
                    <span>Privacy Policy</span>
                    <div class="fl-right">
                        <van-icon name="cross" @click="zhengce=false"/>
                    </div>
                </div>
                <div class="tanchuang-content">
                    <yinsi :showTitle="false"></yinsi>
                </div>
            </div>
        </zhezhao>
        
    </div>
</template>

<script>
import {loginApi} from '@/api/login/index';
import {accReg,passReg} from '@/common/reg.js'
import zhezhao from '@/multiplexing/zhezhao'
import yinsi from '@/components/tabbar/account/accountSettings/aboutItem/privacyPolicy.vue'
import {Toast} from 'vant'
import {mapActions} from 'vuex'
export default {
    props: {

    },
    data() {
        return {
            checked:true,
            inputType:'password',
            eyeName:'closed-eye',
            eyeStatus:Boolean,
            userData:{
                username:'',
                password:'',
                username1:'',
            },
            rules:{
                username1:{
                    required: true,
                    messages: "Enter login username"
                },
                password:{
                    required: true,
                    messages: "Enter login password"
                }
               
            },
            zhengce:false,
        };
    },
    computed: {
        disabledSubmit() {
            return !this.$fn.isDisabled(this.userData,this.rules)&&this.checked ;
        }
    },
    created() {
        
    },
    mounted() {
        if(localStorage.mobile){
            this.userData.username1 = localStorage.mobile
        }
        window.addEventListener("keyup",this.keyupEnter,false);
    },
    beforeDestroy() {
        window.removeEventListener("keyup",this.keyupEnter,false);
    }, //生命周期 - 销毁之前
    destroyed() {
        window.removeEventListener("keyup",this.keyupEnter,false);
    }, //生命周期 - 销毁完成
    watch: {
        eyeStatus:{
            handler:function(newVal, oldVal){
                this.eyeStatus ? this.eyeName = 'eye-o':this.eyeName = 'closed-eye'
                this.eyeStatus ? this.inputType = 'text':this.inputType = 'password'
            },
        },
    },
    methods: {
        ...mapActions(['classifykeep']),
        //登录按钮
        logIn(){
            if(this.disabledSubmit){
                var phoneReg = /^[1-9]\d*$/;
                if(!phoneReg.test(this.userData.username1)){
                    this.userData.username = this.userData.username1.substring(1)
                }else{
                    this.userData.username = this.userData.username1
                }

                loginApi(this.userData).then(res => {
                    if(res.code == 0){
                        localStorage.token = res.token
                        localStorage.userinfoShop = JSON.stringify(res.user) 
                        this.$router.push({name:'首页'})
                        this.classifykeep(true)
                    }else if(res.code == -4){
                        Toast('Password error')
                    }else if(res.code == -26){
                        Toast('The phone number is frozen. Please contact customer service.')
                    }else if(res.code == -27){
                        Toast('The phone number is deleted. Please contact customer service.')
                    }else if(res.code == -28){
                        Toast("The phone isn't registered.")
                    }
                })
            }
        },
        //回车键
        keyupEnter(){
            const that = this;
            if( window.event.keyCode == 13 ){
                //执行登录方法
                this.logIn()
            }
        },
        jumpRouter(name){
            this.$router.push({name})
        },
    },
    components: {
        zhezhao,
        yinsi
    },
};
</script>

<style scoped lang="less">
.login{
    min-height: 100%;
    position: relative;
    background-color: #fff;
    padding-top:127px;
    box-sizing: border-box;
    .logo{
        width: 281px;
        margin-left:50%;
        transform: translateX(-50%);
        padding-bottom:125px;
    }
    .user-name{
        padding:0 85px;
        .name-icon{
            width: 50px;
            height: 50px;
        }
        .input-con{
            display: inline-block;
            width: 510px;
            height:60px;
            border-bottom: 1px solid #999;
            font-size: 26px;
            margin-left:10px;
        }
        .name-input{
            width: 300px;
            border: 0;
        }
    }
    .pass-word{
        padding:53px 85px 36px;
        .name-icon{
            width: 50px;
            height: 50px;
        }
        .input-con{
            display: inline-block;
            width: 510px;
            height:60px;
            border-bottom: 1px solid #999;
            font-size: 26px;
            margin-left:10px;
        }
        .name-input{
            width: 420px;
            border: 0;
        }
    }
    .forgetPassword{
        padding: 0 80px;
    }
    .upload{
        width: 100%;
        padding:0 80px;
        height:88px;
        box-sizing: border-box;
        overflow: hidden;
        line-height: 88px;
        text-align: center;
        margin:49px 0 29px;
        .load-btn{
            height:100%;
            background-color: #999;
            border-radius:44px;
            color: #fff;
            font-size:40px;
        }
    }
    .remarks-option{
        text-align: center;
        font-size: 24px;
        padding-bottom: 156px;
    }
    .footer{
        position: relative;
        text-align: center;
        .other{
            font-size: 24px;
            color: #999;
        }
        .icons{
            width: 100%;
            box-sizing: border-box;
            overflow: hidden;
            padding:0 100px;
            margin:49px 0;
        }
        /deep/ .van-row{
            img{
                width: 80px;
                height:80px;
            }
        }
        .agreement{
            padding-right: 60px;
            font-size: 20px;
        }
    }
    .checkbox{
        vertical-align: middle
    }
    .c1{
        color: #999
    }
    .c2{
        color: #fa5300
    }
    .line{
        width: 206px;
        background-color: #999;
        height:2px;
    }
    .left-80{
        position: absolute;
        left:80px;
        top:10px;
    }
    .right-80{
        position: absolute;
        right:80px;
        top:10px;
    }
    .tanchuang{
        height: 80%;
        margin: 80px 30px;
        background-color: #fff;
        .tanchuang-header{
            height: 109px;
            line-height: 109px;
            font-size:36px;
            text-align: center;
            color: #333;
            font-weight:bold;
            padding: 0 40px;
            border-bottom: 1px solid #C9C9C9;
            div{
                display: inline-block;
            }
        }
        .tanchuang-content{
            max-height: 85%;
            overflow: auto;
            padding-top: 29px;
        }
    }
}
</style>
