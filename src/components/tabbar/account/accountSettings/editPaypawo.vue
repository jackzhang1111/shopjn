<template>
<!-- 修改支付密码 -->
    <div class="edit-paypawo">
        <settings-header title="Change Payment Password" title2=""></settings-header>
        <div class="edit-paypawo-content">
            <div class="m-b-19">
                <div class="cell">
                    <input :type="inputType3" class="input-xt" placeholder="Enter payment password" v-model="formData.oldPwd" @input="inputFun" :maxlength="6">
                    <van-icon name="eye-o" class="pas-icon" v-if="eyeStuats3" @click="eyeStuats3 = !eyeStuats3"/>
                    <van-icon name="closed-eye"  class="pas-icon" v-else @click="eyeStuats3 = !eyeStuats3"/>
                </div>
                <div class="cell">
                    <input :type="inputType" class="input-xt" placeholder="Enter new password" v-model="formData.userPwd" @input="inputFun1" :maxlength="6">
                    <van-icon name="eye-o" class="pas-icon" v-if="eyeStuats" @click="eyeStuats = !eyeStuats"/>
                    <van-icon name="closed-eye"  class="pas-icon" v-else @click="eyeStuats = !eyeStuats"/>
                </div>
                <div class="cell">
                    <input :type="inputType2" class="input-xt" placeholder="Re-enter the new password" v-model="formData.userPwd2" @input="inputFun2" :maxlength="6">
                    <van-icon name="eye-o" class="pas-icon" v-if="eyeStuats2" @click="eyeStuats2 = !eyeStuats2"/>
                    <van-icon name="closed-eye"  class="pas-icon" v-else @click="eyeStuats2 = !eyeStuats2"/>
                </div>
            </div>
            <div class="btn" @click="submit">OK</div>
        </div>
    </div>
</template>

<script>
import settingsHeader from './itemComponents/settingsHeader'
import {updateuserpaypasswordApi} from '@/api/login/index.js'
import {Toast} from 'vant'
export default {
    props: {

    },
    data() {
        return {
            eyeStuats:false,
            eyeStuats2:false,
            eyeStuats3:false,
            formData:{
                oldPwd:'',
                userPwd:'',
                userPwd2:'',
                msg_types:3
            }
        };
    },
    computed: {
        inputType(){
            return this.eyeStuats ? 'text':'password'
        },
        inputType2(){
            return this.eyeStuats2 ? 'text':'password'
        },
        inputType3(){
            return this.eyeStuats3 ? 'text':'password'
        }
    },
    created() {

    },
    mounted() {

    },
    watch: {

    },
    methods: {
        //用户修改登录或支付密码
        updateuserpaypassword(data){
            updateuserpaypasswordApi(data).then(res => {
                if(res.code == 0){
                    Toast('Successful')
                    this.$router.go(-1)
                }else if(res.code == -121){
                    Toast('Incorrect current login password')
                }else if(res.code == -122){
                    Toast('Incorrect current payment password')
                }else if(res.code == -12){
                    Toast('Inconsistent passwords')
                }
            })  
        },
        //保存
        submit(){
            if(this.formData.oldPwd.length < 6 || this.formData.userPwd.length < 6 ||this.formData.userPwd2.length < 6){
                Toast('All passwords should contain 6 figures.')
                return
            }
            if(this.formData.userPwd.length != this.formData.userPwd2.length){
                Toast('The entered password isn’t consistent with the one confirmed.')
                return
            }
            if(this.formData.userPwd == this.formData.oldPwd){
                Toast('New password cannot be the same as the previous one. ')
                return
            }
            this.updateuserpaypassword(this.formData)
        },
        inputFun(e){
            this.formData.oldPwd=e.target.value.replace(/[^\d]/g,'');
        },
        inputFun1(e){
            this.formData.userPwd=e.target.value.replace(/[^\d]/g,'');
        },
        inputFun2(e){
            this.formData.userPwd2=e.target.value.replace(/[^\d]/g,'');
        }
    },
    components: {
        settingsHeader
    },
};
</script>

<style scoped lang="less">
.edit-paypawo{
    .edit-paypawo-content{
        padding: 50px 30px 0;
        box-sizing: border-box;
    }
    .cell{
        height: 110px;
        line-height: 110px;
        padding: 0 30px;
        background-color: #fff;
        color: #999;
        position: relative;
        font-size: 26px;
        border-bottom: 1px solid #DCDCDC;
        margin-bottom: 20px;
        &:nth-last-child(1){
            border:0
        }
        .input-xt{
            height: 40px;
            border: 0;
            width: 85%;
            background-color: #fff;
        }
        .pas-icon{
            font-size: 40px;
            position: absolute;
            top:50%;
            transform: translateY(-50%);
            right:30px;
        }
    }
    .tips{
        padding: 0 30px;
        color: #999;
        font-size: 22px;
        margin-bottom: 39px;
    }
    .btn{
        height: 88px;
        text-align: center;
        line-height: 88px;
        color: #fff;
        font-size:34px;
        margin-top:40px;
        background:rgba(250,83,0,1);
    }
}
.m-b-19{
    margin-bottom: 19px;
}
</style>
