<template>
<!-- 忘记密码点击下一步 =>输入验证码页 -->
  <div class="forget-password">
        <navar title="Forgot Password"></navar>
        <div class="password-con">
            <h1>Authentication Required</h1>
            <div class="line"></div>
            <div>
                <p class="tips">
                    <span>For your security, we need to authenticate your request. We have sent a One Time Password (OTP) to your phone</span>
                    <span class="o-c">{{yzmData.msgphone}}</span>
                </p>
            </div>
            <div class="otp">
                <div class="otp-txt">OTP:</div>
                <div class="input-con">
                    <input type="number" class="name-input" placeholder="Please enter the OTP" v-model="verCode">
                </div>
                <div class="count-down">
                    <div  class="count-down-btn" @click="getCode" v-show="countTrue">{{countdown}}</div>
                    <div  class="count-down-btn" v-show="!countTrue">{{count}}S</div>
                </div>
            </div>
            <div class="confirm-btn" @click='toRevise' :style="{backgroundColor:(disabledSubmit?'#FA5300':'#999')}">Confirm</div>
        </div>

  </div>
</template>

<script>
import navar from '@/multiplexing/navar'
import {msglistApi,getverificationcodeApi} from '@/api/login/index.js'
import {Toast} from 'vant'
export default {
    data () {
        return {
            timer: null,
            countdown:'Get It',
            count: '',
            countTrue:true,
            verCode:'',
            yzmData:{
                msgphone:'',
                types:'2',
                areaCode:'233'
            },
            jiaoyan:{
                msg_phone:'',
                msg_types:'2',
                msg_num:''
            }
        }
    },
    mounted(){
        this.yzmData.msgphone = this.$route.query.msgphone
        this.jiaoyan.msg_phone = this.$route.query.msgphone
    },
    computed:{
        disabledSubmit() {
            return this.verCode.length == 6
        }
    },
    methods: {
        toRevise(){
            if(!this.disabledSubmit) return
            this.jiaoyan.msg_num = this.verCode
            this.getverificationcode(this.jiaoyan)
        },
        //倒计时
        getCode(){
            const TIME_COUNT = 60;
            if (!this.timer) {
                this.count = TIME_COUNT;
                this.countTrue = false;
                this.timer = setInterval(() => {
                    if (this.count > 0 && this.count <= TIME_COUNT) {
                        this.count--;
                    } else {
                        this.countTrue = true;
                        clearInterval(this.timer);
                        this.timer = null;
                    }
                }, 1000)
            }
            this.msglist(this.yzmData)
        },
        //验证码
        msglist(data){
            msglistApi(data).then(res => {
                if(res.code == 0){
                    
                }else if(res.code == 1){
                    Toast('A phone number cannot send over 20 messages a day')
                }else{
                    Toast('error')
                }
            })
        },
        //校验验证码是否正确的接口
        getverificationcode(data){
            getverificationcodeApi(data).then(res => {
                if(res.code == 0){
                    this.$router.push({name:'修改密码',query:{phone:this.jiaoyan.msg_phone,verCode:this.verCode}})
                }
            })
        }
    },
    components: {
        navar
    },
}
</script> 

<style scoped lang="less">
.forget-password{
    .nav-bar{
        width: 100%;
        height: 88px;
        position: relative;
        .icon{
            width: 40px;
            height:40px;
            position: absolute;
            top:28px;
        }
        .title{
            text-align: center;
            font-size: 36px;
            color: #000;
        }
    }
    .password-con{
        padding: 0 30px;
        margin-top:20px;
    }
    .otp{
        width: 100%;
        height:75px;
        position: relative;
        border-bottom: 1px solid #dcdcdc;
        margin-bottom: 30px;
        .otp-txt{
            position: absolute;
            top:0;
            left:0;
            font-size: 30px;
            color: #333;
        }
        .input-con{
            position: absolute;
            left:140px;
            width: 530px;
            height:60px;
            font-size: 20px;
            .name-input{
                position: absolute;
                width: 240px;
                border: 0;
                background-color: #F8F8FA;
                font-size: 30px;
            }
        }
        .count-down{
            position: absolute;
            right:0px;
            top:-10px;
            .count-down-btn{
                width: 200px;
                height:68px;
                font-size: 30px;
                text-align: center;
                line-height: 68px;
                color: #999;
                background-color: #DCDCDC;
                border:0
            }
        }
        
    }
    .confirm-btn{
        height:88px;
        line-height: 88px;
        text-align: center;
        color: #fff;
        font-size: 40px;
    }
    h1{
        font-size: 36px;
        color:#333;
        margin-bottom: 40px;
    }
    .line{
        width: 670px;
        height: 2px;
        background-color: #dcdcdc;
        margin-bottom: 60px;

    }
    .tips{
        font-size: 26px;
        color: #333;
        line-height: 40px;
        margin-bottom: 62px;
    }
    .o-c{
        color: #fa5300;
        font-size: 30px;
    }
    .password-con{

    }
}
</style>
