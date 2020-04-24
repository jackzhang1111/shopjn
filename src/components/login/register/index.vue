<template>
<!-- 注册页面 -->
    <div class="register">
        <div v-show="choiceShow">
            <navar title="Register"></navar>
            <div class="item-title">Account Info</div>
            <div class="create-user">
                <van-cell-group>
                    <van-field v-model="formData.nickName" placeholder="User's name" :maxlength="20"/>
                    <div class="iphone-option">
                        <select ref="mobilecode"> 
                            <option value="233">+233</option> 
                            <option value="86">+86</option> 
                        </select> 
                    </div>
                    <van-field v-model="formData.phone" placeholder="Enter your phone number"  class="zyyw aaa" type="number" :maxlength="11"/>
                    <van-field v-model="formData.smsCode" placeholder="Enter verification code" class="register-otp" :maxlength="6">
                        <div slot="button" class="daojishi" @click="getCode" v-show="countTrue">{{countdown}}</div>
                        <div slot="button" class="daojishi" v-show="!countTrue">{{count}}S</div>
                    </van-field>
                    <van-field v-model="formData.email" placeholder="Enter your email(optional fields)" class="zyyw"/>
                    <van-field v-model="formData.userPwd" clearable :right-icon="eyeName" placeholder="Set a password(6-20 characters)" @click-right-icon="eyeStatus = !eyeStatus" class="password" :type="fieldType" :maxlength="20"/>
                    <van-field v-model="formData.userPwd2" clearable :right-icon="eyeName1" placeholder="Confirm your password" class="zyyw" :maxlength="20" @click-right-icon="eyeStatus1 = !eyeStatus1" :type="fieldType1"/>
                </van-cell-group>
            </div>
            <div class="item-title">Company Info(optional fields)</div>
            <div class="create-user">
                <van-cell-group class="m-10-b border-0">
                    <van-field v-model="formData.companyName" placeholder="Company's name"/>
                </van-cell-group>
                <div class="cell" @click="toChoiceList(1,0)">
                    <input type="text" :class="{'c-333':isBace}" class="input-xt" placeholder="Choose A Country" v-model="form.lev1" :disabled='true'>
                    <van-icon name="arrow" class="arrow c-999"/>
                </div>
                <div class="cell" @click="toChoiceList(2,choiceForm.lev1.id)">
                    <input type="text" :class="{'c-333':isBace}" class="input-xt" placeholder="State/Province/Region" v-model="form.lev2" :disabled='true'>
                    <van-icon name="arrow" class="arrow c-999"/>
                </div>
                <div class="cell " @click="toChoiceList(3,choiceForm.lev2.id)">
                    <input type="text" :class="{'c-333':isBace}" class="input-xt" placeholder="City/County/Town" v-model="form.lev3" :disabled='true'>
                    <van-icon name="arrow" class="arrow c-999"/>
                </div>
                <div class="cell" @click="toChoiceList(4,choiceForm.lev3.id)">
                    <input type="text" :class="{'c-333':isBace}" class="input-xt" placeholder="County/District/Street" v-model="form.lev4" :disabled='true'>
                    <van-icon name="arrow" class="arrow c-999"/>
                </div>
                <van-cell-group class="m-10-b border-0 textarea">
                    <van-field
                        v-model="formData.companyAddress"
                        rows="5"
                        autosize
                        type="textarea"
                        placeholder="Details"
                    />
                </van-cell-group>
                <van-cell-group class="border-0" @click="show=true">
                    <van-field class="zyyw" v-model="formData.mainBusinessName" clearable right-icon="arrow" placeholder="Main business" :disabled='true'/>
                </van-cell-group>

                
            </div>
            <div class="item-title">Shot&Upload(optional fields)</div>
            <div class="create-user">
                <div class="uploader">
                    <van-row type="flex" justify="space-between">
                        <van-col span="8">
                            <upload-one @getfilePath="getfilePath" imgName="公司正面照"></upload-one>
                            <div class="uploader-name">Company Front</div> 
                        </van-col>
                        <van-col span="8">
                            <upload-one @getfilePath="getfilePath" imgName="公司内部照"></upload-one>
                            <div class="uploader-name">Company Inside</div>
                        </van-col>
                        <van-col span="8">
                            <upload-one @getfilePath="getfilePath" imgName="营业执照"></upload-one>
                            <div class="uploader-name">Business License</div>
                        </van-col>
                    </van-row>
                    
                </div>
                <div class="uploader">
                    <van-row type="flex" justify="space-between">
                        <van-col span="8">
                        <upload-one @getfilePath="getfilePath" imgName="人像照"></upload-one>
                            <div class="uploader-name">Legal Person</div>
                        </van-col>
                        <van-col span="8">
                            <upload-one @getfilePath="getfilePath" imgName="法人证件正面照"></upload-one>
                            <div class="uploader-name">Front Image</div>
                        </van-col>
                        <van-col span="8">
                            <upload-one @getfilePath="getfilePath" imgName="法人证件背面照"></upload-one>
                            <div class="uploader-name">Back Image</div>
                        </van-col>
                    </van-row>
                </div>
            </div>
            <div class="agreement">
                <!-- <div class="checkbox"></div> -->
                <input type="checkbox" class="checkbox" v-model="xieyi">
                <span>
                    <span>I have read and agree to the</span>
                    <span class="c-orange"  @click="userStatus=true">Terms of Use</span>
                    <span>and</span>
                    <span class="c-orange" @click="zhengce=true">Privacy Policy.</span>
                </span>
            </div>
            <div class="confirm-btn" @click="toRevise">
                <div class="btn-zc" :style="{backgroundColor:(disabledSubmit?'#FA5300':'#999')}">Register</div>
            </div>
            <div class="to-login fs-20" @click="$router.push({name:'登录'})">Login My Account</div>
        </div>
        
        <choiceList v-show="!choiceShow" @getchoice="getchoice" @choiceStatus="choiceStatus" ref="choiceList"></choiceList>

        <van-action-sheet v-model="show" :actions="memberList" @select="onSelect" cancel-text="取消" class="my-sheet"/>

        <van-popup v-model="show2">
            <div class="revise-success">
                <img src="@/assets/img/login/icon@3x.png">
                <div class="txt1">Congratulations!</div>
                <div class="txt2">You have successfully registered.</div>
            </div>
        </van-popup>

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

        <zhezhao v-if="userStatus">
            <div class="tanchuang">
                <div class="tanchuang-header">
                    <span>User Agreement</span>
                    <div class="fl-right">
                        <van-icon name="cross" @click="userStatus=false"/>
                    </div>
                </div>
                <div class="tanchuang-content">
                    <user-agreement :showTitle="false"></user-agreement>
                </div>
            </div>
        </zhezhao>

    </div>
</template>

<script>

import navar from '@/multiplexing/navar'
import {membertypelitApi,userregisterApi} from '@/api/register/index'
import uploadOne from '@/multiplexing/uploadOne'
import choiceList from '@/multiplexing/choiceList.vue'
import {msglistApi} from '@/api/login/index.js'
import {Toast} from 'vant'
import zhezhao from '@/multiplexing/zhezhao'
import yinsi from '@/components/tabbar/account/accountSettings/aboutItem/privacyPolicy.vue'
import userAgreement from '@/components/tabbar/account/accountSettings/aboutItem/userAgreement.vue'
export default {
    props: {

    },
    data() {
        return {
            countdown:'Get It',
            count: '',
            timer: null,
            countTrue:true,
            xieyi:false,
            username:'',
            show:false,
            show2:false,
            eyeStatus:false,
            eyeStatus1:false,
            choiceShow:true,
            isBace:true,
            registDisabled:true,
            eyeName:'closed-eye',
            eyeName1:'closed-eye',
            fieldType:'password',
            fieldType1:'password',
            fileList:[],
            formData:{
                nickName:'',//用户名称
                phone:'',
                mobile:'',//用户手机号码
                mobileCode:'233',//用户手机号码所在国家的编号
                smsCode:'',//验证码
                email:'',//邮箱
                userPwd:'',//密码
                userPwd2:'',//确认密码
                companyName:'',//公司名称
                companyAreaId:'',//公司地址ID(最小area_id)
                companyAddress:'',//公司详细地址
                mainBusiness:'',//主营业务
                mainBusinessName:'',//主营业务名称
                companyFrontImg:'',//公司正面照
                companyInterImg :'',//公司内部照
                businessLicense:'',//营业执照
                legalPersonImg :'',//法人人像照
                legalPersonBack:'',//法人证件反面照
                legalPersonFront:'',//法人证件正面照
            },
            rules:{
                nickName:{
                    required: true,
                    messages: "Enter account"
                },
                phone:{
                    required: true,
                    messages: "Enter phone number"
                },
                smsCode:{
                    required: true,
                    messages: "Enter verification code"
                },
                userPwd:{
                    required: true,
                    messages: "Enter login password"
                },
                userPwd2:{
                    required: true,
                    messages: "Confirm the password"
                },
            },
            form:{
                lev1:null,
                lev2:null,
                lev3:null,
                lev4:null,
            },
            choiceForm:{
                lev1:{
                    id:'',
                    name:'',
                    areaCode:''
                },
                lev2:{
                    id:'',
                    name:'',
                    areaCode:''
                },
                lev3:{
                    id:'',
                    name:'',
                    areaCode:""
                },
                lev4:{
                    id:'',
                    name:'',
                    areaCode:''
                }
            },
            memberList: [],//主营业务列表
            yzmData:{
                msgphone:'',
                types:'1',
                areaCode:'233'
            },
            zhengce:false,
            userStatus:false
        }
    },
    computed: {
        disabledSubmit() {
            return !this.$fn.isDisabled(this.formData,this.rules) && this.xieyi 
        }
    },
    created() {

    },
    mounted() {
        this.membertypelit()
    },
    watch: {
        eyeStatus:{
            handler:function(newVal, oldVal){
                this.eyeStatus ? this.eyeName = 'eye-o':this.eyeName = 'closed-eye'
                this.fieldType =  this.eyeStatus ? 'text' : 'password'
            },
        },
        eyeStatus1:{
            handler:function(newVal, oldVal){
                this.eyeStatus1 ? this.eyeName1 = 'eye-o':this.eyeName1 = 'closed-eye'
                this.fieldType1 =  this.eyeStatus1 ? 'text' : 'password'
            },
        },
    },
    methods: {
        toRevise(){
            if(!this.disabledSubmit) return
            var emReg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/ //正则表达式
            if(this.formData.email == ''){
                
            }else if(!emReg.test(this.formData.email)){
                Toast("The email form isn’t correct.")
                return
            }
            if(this.formData.userPwd.length < 6){
                Toast("Set a password(6-20 characters)!")
                return
            }
            if(this.formData.userPwd != this.formData.userPwd2){
                Toast("The entered password isn’t consistent with the one confirmed.")
                return
            }
            this.formData.mobileCode = this.$refs.mobilecode.value
            var phoneReg = /^[1-9]\d*$/;
            if(!phoneReg.test(this.formData.phone)){
                this.formData.mobile = this.formData.phone.substring(1)
            }else{
                this.formData.mobile = this.formData.phone
            }
            this.userregister()
        },
        getCode(){
            if(this.formData.phone == ''){
                Toast('Enter phone number')
                return
            }
            var phoneReg = /^[1-9]\d*$/;
            if(!phoneReg.test(this.formData.phone)){
                this.formData.mobile = this.formData.phone.substring(1)
            }else{
                this.formData.mobile = this.formData.phone
            }
            this.yzmData.msgphone = this.formData.mobile
            this.yzmData.areaCode = this.$refs.mobilecode.value
            this.msglist(this.yzmData)
        } ,
        getfilePath(path,imgName){
            if(imgName == '公司正面照'){
                this.formData.companyFrontImg = path
            }else if(imgName == '公司内部照'){
                this.formData.companyInterImg = path
            }else if(imgName == '营业执照'){
                this.formData.businessLicense = path
            }else if(imgName == '人像照'){
                this.formData.legalPersonImg = path
            }else if(imgName == '法人证件背面照'){
                this.formData.legalPersonBack = path
            }else if(imgName == '法人证件正面照'){
                this.formData.legalPersonFront = path
            }
        },
        
        //点击选择地址
        toChoiceList(level,parent){
            this.choiceShow = false
            let obj = {
                area_level:level,
                parent_id:parent
            }
            this.$refs.choiceList.formData.area_level = obj.area_level
            this.$refs.choiceList.formData.parent_id = obj.parent_id
            this.$refs.choiceList.basearealist(obj)            
        },
        //选择地址组件返回信息
        getchoice(choicDate){
            this.choiceForm = Object.assign({},this.choiceForm,choicDate)
            this.form.lev1 = this.choiceForm.lev1.name
            this.form.lev2 = this.choiceForm.lev2.name
            this.form.lev3 = this.choiceForm.lev3.name
            this.form.lev4 = this.choiceForm.lev4.name

            let addressAreaId = ''
            if(this.choiceForm.lev4.id != null){
                addressAreaId = this.choiceForm.lev4.id
            }else if(this.choiceForm.lev3.id != null){
                addressAreaId = this.choiceForm.lev3.id
            }else if(this.choiceForm.lev2.id != null){
                addressAreaId = this.choiceForm.lev2.id
            }
            this.formData.companyAreaId = addressAreaId

        },
        //是否显示选择地址组件
        choiceStatus(status){
            this.choiceShow = status
        },
        //主营业务列表
        membertypelit(){
            membertypelitApi().then(res => {
                if(res.code == 0){
                    let arr = res.tpMemberTypeList
                    arr.forEach(e => {
                        let obj = {
                            name:e.typeTitle,
                            id:e.typeId
                        }
                        this.memberList.push(obj)
                    });
                }
            })
        },
        //选择主营业务
        onSelect(item) {
            // 默认情况下，点击选项时不会自动关闭菜单
            // 可以通过 close-on-click-action 属性开启自动关闭
            this.show = false;
            this.formData.mainBusiness = item.id
            this.formData.mainBusinessName = item.name
        },
        //注册
        userregister(){
            userregisterApi(this.formData).then(res => {
                if(res.code == 0){
                    localStorage.phone = res.user.phone
                    this.show2 = true
                    setTimeout(()=>{
                        this.$router.push({name:'登录'})
                    },2000)
                }else if(res.code == -110){
                    Toast('Incorrect verification code.')
                }else if(res.code == -25){
                    Toast('The phone number was registered.')
                }else if(res.code == -26){
                    Toast('The phone number is frozen. Please contact customer service.')
                }else if(res.code == -27){
                    Toast('The phone number is deleted. Please contact customer service.')
                }else{
                    Toast('error')
                }
            })
        },
        //验证码
        msglist(data){
            msglistApi(data).then(res => {
                if(res.code == 0){
                    const TIME_COUNT = 120;
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
                }else if(res.code == 2){
                    Toast('Failed sending')
                }else if(res.code == -130){
                    Toast('The phone number isn’t registered.')
                }else if(res.code == -131){
                    Toast('The phone number was frozen by system.Please contact customer service')
                }else if(res.code == -132){
                    Toast('The phone number was deleted by system.Please contact customer service')
                }else if(res.code == -133){
                    Toast('The phone number is still being approved.Please contact customer service')
                }else if(res.code == -134){
                    Toast('The phone number didn’t get the approval.Please contact customer service')
                }else{
                    Toast('error')
                }
            })
        }
    },
    components: {
        navar,
        uploadOne,
        choiceList,
        zhezhao,
        yinsi,
        userAgreement
    },
};
</script>

<style scoped lang="less">
.register{
    /deep/ .van-cell,.van-field{
        height: 88px;
        font-size: 30px;
        .van-cell__value{
            position: relative;
            border-bottom: 1px solid #DCDCDC;
            .van-field__body{
                position: absolute;
                top:20px;
            }
        }
        
        
    }
    .iphone-option{
        width: 78px;
        height: 52px;
        position: absolute;
        top:115px;
        right:70px;
        z-index: 2;
    }
    .create-user{
        padding: 0 30px;
    }
    /deep/ .register-otp{
        position: relative;
        .daojishi{
            width: 180px;
            height: 60px;
            background-color: #dcdcdc;
            color: #333333;
            line-height: 60px;
            text-align: center;
            position: absolute;
            top:-20px;
            left: 470px;
        }
    }
    .password,.zyyw{
        /deep/ .van-cell__value{
            .van-field__body{
                width: 95%;
                .van-field__right-icon{
                    .van-icon{
                        font-size: 36px;
                    }
                    .van-icon-arrow{
                        font-size: 26px;
                    }
                }
            }
        }
    }
    .m-10-b{
        margin-bottom: 10px;
    }
    .border-0{
        /deep/ .van-cell{
            .van-cell__value{
                border:0;
                .van-field__body{
                    width: 95%;
                }
            }
        }
    }
    .textarea{
        /deep/ .van-cell{
            height: 140px;
        }
    }
    .uploader{
        height: 220px;
        width: 100%;
        position: relative;
        /deep/ .van-uploader{
            transform: scale(2) translate(20px,30px);
            .van-uploader__upload{
                margin-left: 8px;
            }
        }
        /deep/ .van-row{
            .van-col{
                position: relative;
                .uploader-name{
                    position: absolute;
                    bottom: -125px;
                    width: 172px;
                    text-align: center;
                    font-size: 24px;
                    color: #666;
                }
            }
        }
    }
    .agreement{
        margin: 99px 0 29px;
        padding-left: 30px;
        font-size: 20px;
    }
    .checkbox{
        display: inline-block;
        vertical-align: middle;
    }
    .confirm-btn{
        padding: 0 30px;
        height:88px;
        font-size:40px;
        text-align: center;
        line-height: 88px;
        .btn-zc{
            color: #fff;
        }
    }
    .item-title{
        background-color: #666666;
        // width:280px;
        display: inline-block;
        height:60px;
        color: #fff;
        font-size: 36px;
        text-align: center;
        line-height: 60px;
        margin: 39px 0 20px 30px;
        padding: 0 30px;
        &:nth-child(2){
            margin-top:10px
        }
    }
    .to-login{
        width: 100%;
        text-align: center;
        color: #FA5300;
        margin: 29px 0 88px 0;
    }
    .revise-success{
        width: 600px;
        height: 500px;
        background-color: #fff;
        text-align: center;
        img{
            width: 220px;
            height: 220px;
            margin-top:80px;
            // transform: translateY(-50%)
        }
        .txt1,.txt2{
            font-size:36px;
            font-weight:bold;
        }
        .txt1{
            margin-top: 49px;
        }
        .txt2{
            margin-top: 16px;
        }
    }
    .cell{
        height: 88px;
        line-height: 88px;
        padding: 0 16px;
        background-color: #fff;
        color: #999;
        position: relative;
        font-size: 26px;
        margin-bottom: 10px;
        &:nth-last-child(1){
            border:0
        }
        .arrow{
            position: absolute;
            right:30px;
            top:50%;
            transform: translateY(-50%);
            
        }
        .text{
            position: absolute;
            right:60px;
        }
        .text-tk{
            position: absolute;
            right:30px;
        }
        .input-xt{
            height: 80px;
            border: 0;
            width: 80%;
            background-color: #fff;
        }
        .hm{
            position: absolute;
            right:80px;
            top:50%;
            transform: translateY(-50%);
        }
        .switch{
            position: absolute;
            top:50%;
            transform: translateY(-50%);
            right:57px;
        }
    }
    .aaa{
        /deep/ .van-cell__value{
            .van-field__body{
                // margin-left:120px;
                
            }
        }
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
