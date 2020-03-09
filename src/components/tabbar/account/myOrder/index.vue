<template>
<!-- 我的订单 -->
    <div class="my-order">
        <div class="footprint-header">
            <van-icon name="arrow-left" class="arrow-left" @click="$router.go(-1)"/>
            <span class="header-t1">My Order</span>
            <span class="header-t2" @click="jumpRouter('我的订单历史记录')">
                <van-icon name="search" class="search"/>
            </span>
            <van-icon name="chat-o" class="chat" size="17px" @click="jumpRouter('消息')"/>
        </div>
        <div class="commodity-tab ">
            <van-tabs v-model="active" class="tab-list" title-active-color="#FA5300" @change="changeTab">
                    <van-tab :title="tab.title" v-for="tab in tabList" :key="tab.id" >
                        <scroll 
                            class="bscroll-wrapper"
                            ref="wrapper"
                            :data="recordGroup"
                            :pulldown="pulldown"
                            :pullup="pullup"
                            @pulldown="_pulldown"
                            @pullup="_pullup"
                            >
                            <div v-show="noSearchStatus">
                                <order-type :dfkList="recordGroup" @closeOverlay="closeOverlay" @showPay="showPay" @showPassWord="showPassWord"></order-type>
                            </div>
                            <no-search v-show="!noSearchStatus"></no-search>
                        </scroll>
                    </van-tab>
                
            </van-tabs>
        </div>
        <!-- 打开取消订单 -->
        <transition name="canorder">
            <zhezhao v-show="show">
                <cancel-order ref="cancelorder" @closeOverlay="closeOverlay"  :orderId="orderId" @refreshOrder="refreshOrder"></cancel-order>
            </zhezhao>
        </transition>
        <!-- 支付成功弹窗 -->
        <action-sheet-sucess ref="sucess" @showsucess="showsucess"></action-sheet-sucess>
        <!-- 密码弹窗 -->
        <action-sheet-password ref="actionSheetPassword" @getPassWord="getPassWord" :typeLeixing="typeLeixing"></action-sheet-password>
        <!-- 付款方式弹窗 -->
        <action-sheet-paymen ref="actionSheetPaymen" :moeny="moeny" @showPassWord="showPassWord"></action-sheet-paymen>
    </div>
</template>

<script>
import zhezhao from '@/multiplexing/zhezhao'
import orderType from './itemComponents/orderType'
import cancelOrder from './itemComponents/cancelOrder'
import noSearch from './itemComponents/noSearch'
import {orderlistApi,orderlaunchpayApi,completeorderApi} from '@/api/myOrder/index.js'
import actionSheetPassword from '@/multiplexing/actionSheetPassword'
import actionSheetPaymen from '@/multiplexing/actionSheetPaymen'
import actionSheetSucess from '@/multiplexing/actionSheetSucess'
import {Toast} from 'vant'
export default {
    props: {

    },
    data() {
        return {
            moeny:0,
            recordGroup: [],
            pulldown: true,
            pullup: true,
            tabList:[
                {
                    title:'All',
                    id:null
                },
                {
                    title:'Unpaid',
                    id:1
                },
                {
                    title:'Undelivered',
                    id:2
                },
                {
                    title:'Unreceived',
                    id:3
                },
                {
                    title:'Done',
                    id:4
                },
            ],
            active:2,
            noSearchStatus:true,
            formData:{
                product_key_name:'',
                order_status_app:null,
                page:1,
                limit:10
            },
            dfkList:[],
            dataList:[],
            show:false,
            guanmengou : true,
            totalCount:0,//总条数
            orderId:0,
            payTypeDetail:201,//余额支付ID,暂时写死
            orderData:{},
            typeLeixing:'',
        };  
    },
    computed: {

    },
    created() {
        
    },
    mounted() {
        this.active = Number(sessionStorage.getItem("activeIndex")) 
        this.formData.order_status_app = this.active - 1
        this.refreshOrder()
    },
    watch: {

    },
    methods: {
        //下拉刷新
        _pulldown() {
            setTimeout(()=>{
                this.refreshOrder()
            },500)
        },
        //上拉加载
        _pullup() {
            if(!this.pullup) return
            //不知道为什么触发两次,使用关门狗拦截
            if(this.guanmengou){
                this.formData.page++
                this.orderlist(this.formData,false)
                this.guanmengou = false
            }
            setTimeout(()=>{
                this.guanmengou = true
            },500)
        },

        jumpRouter(name){
            this.$router.push({name})
        },
        //订单列表
        orderlist(data,flag){
            orderlistApi(data).then(res => {
                if(res.code == 0){
                    if(flag){
                        this.dataList = res.Data.list
                    }else{
                        this.dataList = this.dataList.concat(res.Data.list);
                    }
                    this.totalCount = res.Data.totalCount
                    this.recordGroup = this.dataList
                    if(this.dataList.length > 0){
                        this.noSearchStatus = true
                        if(this.dataList.length >= this.totalCount){
                            this.pullup = false
                        }
                    }else{
                        this.noSearchStatus = false
                        this.pulldown = false
                        this.pullup = false
                    }
                }
            })
        },
        //订单发起支付
        orderlaunchpay(data){
            orderlaunchpayApi(data).then(res => {
                if(res.code == 0){
                    this.showsucess()
                }else if(res.code == 1){
                    Toast('Parameter “requestModel” cannot be empty.')
                }else if(res.code == 2){
                    Toast('Parameter Method of Payment cannot not be empty.')
                }else if(res.code == 3){
                    Toast('The payment password cannot be empty if you choose Pay by Balance.')
                }else if(res.code == 4){
                    Toast('Parameter”orderList” cannot not be empty.')
                }else if(res.code == 5){
                    Toast('Parameter Order ID must be larger than 0.')
                }else if(res.code == 21){
                    Toast('Set the payment password first.')
                    setTimeout(()=>{this.$router.push({name:'设置支付密码'})},1000)
                }else if(res.code == 22){
                    Toast('Incorrect password!')
                }else if(res.code == 23){
                     Toast("Your balance isn't enough to pay.")
                }else if(res.code == 31){
                    Toast('The submitted order list cannot be empty.')
                }else if(res.code == 32){
                    Toast('The existing order isn’t belong to the current user and cannot be operated.')
                }else if(res.code == 33){
                    Toast('The existing order is paid and cannot be repaid.')
                }else if(res.code == 34){
                    Toast('The submitted order list involves Unpaid order.')
                }else if(res.code == 35){
                    Toast('The submitted order list involves unsuccessful payment order. ')
                }
            })
        },
        //更改tab
        changeTab(index){
            if(index==0){
                this.formData.order_status_app = null
            }else{
                this.formData.order_status_app = index-1
            }
            sessionStorage.setItem("activeIndex", index);
            this.refreshOrder()
        },
        //控制取消订单弹窗
        closeOverlay(falg,orderId){
            this.show = falg
            this.$refs.cancelorder.anima = true
            if(!orderId) return
            this.orderId = orderId
        },
        //弹出付款方式弹窗
        showPay(flag,alldata){
            this.$refs.actionSheetPaymen.showAction = flag
            if(!alldata) return
            this.moeny = alldata.orderAmountWebsite
            this.orderData = alldata
        },
        //密码弹窗
        showPassWord(flag,typeLeixing,alldata){
            this.$refs.actionSheetPassword.showAction = flag
            this.typeLeixing = typeLeixing
            if(!alldata) return
            this.orderData = alldata
        },
        //刷新页面
        refreshOrder(){
            this.formData.page = 1
            this.formData.limit = 10
            this.orderlist(this.formData,true)
            this.pullup = true
        },
        //获取到密码,请求接口
        getPassWord(value,type){
            if(type == '支付'){
                let orderList = []
                orderList.push({orderId:this.orderData.orderId})
                let obj = {
                    payTypeDetail:this.payTypeDetail,
                    payPwd:value,
                    orderList:orderList
                }
                this.orderlaunchpay(obj)
            }else if(type == '确认收货'){
                let obj = {
                    orderId:this.orderData.orderId,
                    payPwd:value,
                }

                this.completeorder(obj)
            }
        },
        //弹出支付成功
        showsucess(){
            this.$refs.sucess.showAction = true
            setTimeout(()=>{
                this.$refs.sucess.showAction = false
                this.showPay(false)
                this.showPassWord(false)
                this.refreshOrder()
            },1000)
        },
        //确认收货
        completeorder(data){
            completeorderApi(data).then(res => {
                if(res.code == 0){
                    this.showPassWord(false)
                    this.refreshOrder()
                }else if(res.code == 1){
                    Toast('Parameter “requestModel” cannot be empty.')
                }else if(res.code == 2){
                    Toast('Parameter Order ID must be larger than 0.')
                }else if(res.code == 3){
                    Toast('The payment password cannot be empty if you choose Pay by Balance.')
                }else if(res.code == 21){
                    Toast('Set the payment password first.')
                    setTimeout(()=>{this.$router.push({name:'设置支付密码'})},1000)
                }else if(res.code == 22){
                    Toast('Incorrect password!')
                }else if(res.code == 23){
                    Toast('The order is nonexistent.')
                }else if(res.code == 24){
                    Toast('The order isn’t belong to the current user and cannot be operated.')
                }else if(res.code == 25){
                    Toast('The order is Unpaid. Receiving confirmation isn’t allowed.')
                }else if(res.code == 26){
                    Toast('The order is finished. Do not reconfirm the receiving.')
                }else if(res.code == 27){
                    Toast('The order isn’t Unreceived. Receiving confirmation isn’t allowed.')
                }
            })
        }
    },
    components: {
        noSearch,
        actionSheetPassword,
        zhezhao,
        cancelOrder,
        orderType,
        actionSheetPaymen,
        actionSheetSucess
    },
};
</script>

<style scoped lang="less">
.bscroll-wrapper{
    height: calc(100vh - 210px);
}
.my-order{
    .footprint-header{
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
        .chat{
            position: absolute;
            top:20px;
            right: 30px;
        }
    }
    .commodity-tab{
        height: 80px;
        .tab-list{
            height: 80px;
            /deep/ .van-tabs__wrap{
                height: 80px;
                .van-tabs__nav{
                   background-color: #F2F3F5;
                }
                .van-tab{
                    line-height: 80px;
                    font-size: 28px;
                    color: #000;
                    text-overflow:clip;
                    &:nth-child(3){
                        flex-basis: 30% !important;
                    }
                }
                .van-tabs__line{
                    bottom: 30px;
                    background-color: #FA5300;
                }
            }
            /deep/ .van-tabs__content{
                position: relative;
                padding: 20px 30px;
                overflow: hidden;
            }
        }
    }
    .good-detail{
        margin-bottom: 20px;
        .good-detail-header{
            width: 100%;
            height: 79px;
            line-height: 79px;
            font-size:26px;
            color: #333;
            background-color: #fff;
            padding-left: 30px;
            box-sizing: border-box;
            border-bottom: 1px solid #F2F3F5;
            .dfk{
                float: right;
                margin-right: 30px;
            }
        }
        .good-detail-content{
            width: 100%;
            background-color: #fff;
            box-sizing: border-box;
            padding: 0 30px;
            position: relative;
            .good-detail-img{
                width: 150px;
                height: 150px;
                position: relative;
                top:30px;
                left:0px;
                display: inline-block;
            }
            .good-detail-title{
                display: inline-block;
                position: absolute;
                width: 336px;
                top:30px;
                left:200px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                .name{
                    display: inline-block;
                    margin-bottom: 24px;
                    color: #333;
                    font-size: 22px
                }
                .guige{
                    color: #999;
                    font-size: 18px;
                    display: inline-block;
                    margin-bottom: 12px;
                }
                
            }
            .price{
                position: absolute;
                top:30px;
                right:30px;
                text-align: right;
                .p3{
                    font-size:28px;
                    color: #333;
                    margin-bottom: 5px;
                }
                .p4{
                    color: #999;
                    font-size: 20px;
                }
                .p5{
                    margin-top:75px;
                    span{
                        &:nth-child(3){
                            font-size: 30px;
                        }
                    }
                }
                .selection-right-stepper{
                    position: relative;
                    width: 100%;
                    height: 156px;
                    .add-btn{
                        position: absolute;
                        top:20px;
                        right:0;
                        width: 40px;
                        height: 40px;
                        border: 1px solid #999999;
                        text-align: center;
                        line-height: 40px;
                        background-color: #EEEEEE;
                        color: #666;
                    }
                    .reduce-btn{
                        position: absolute;
                        top:20px;
                        right:128px;
                        width: 40px;
                        height: 40px;
                        border: 1px solid #999999;
                        text-align: center;
                        line-height: 40px;
                        background-color: #EEEEEE;
                        color: #666;
                    }
                    .num{
                        position: absolute;
                        top:20px;
                        right:40px;
                        width: 88px;
                        height: 40px;
                        border-top: 1px solid #999999;
                        border-bottom: 1px solid #999999;
                        text-align: center;
                        line-height: 40px;
                    }
                }
            }
        }
        .good-detail-footer{
            height: 100px;
            border-top: 1px solid #F2F3F5;
            font-size: 30px;
            color: #666;
            background-color: #fff;
            .lan{
                height: 100%;
            }
            .btn-qzf{
                width:150px;
                height:60px;
                border:1px solid rgba(250,83,0,1);
                border-radius:30px;
                line-height: 60px;
                text-align: center;
                position: relative;
                top:50%;
                transform: translateY(-50%)

            }
            .btn-qxdd,.btn-xgdz{
                width:180px;
                height:60px;
                border:1px solid rgba(153,153,153,1);
                border-radius:30px;
                line-height: 60px;
                text-align: center;
                position: relative;
                top:50%;
                transform: translateY(-50%);
                margin-right:20px;
            }
        }
        .good-detail-dfh-footer{
            height: 120px;
            border-top: 1px solid #F2F3F5;
            font-size: 30px;
            color: #333;
            background-color: #fff;
             
            .dfh-footer-top{
                height: 60px;
                text-align: center;
                font-size: 20px;
                line-height:60px;
            }
            .dfh-footer-bottom{
                height: 60px;
                text-align: right;
                font-size: 20px;
                line-height:60px;
            }
        }
    }
}
.font-30{
    font-size: 30px;
}
</style>
