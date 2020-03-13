<template>
<!-- 退款页面 -->
    <div class="refund">
        <balance-header :title="headerTitle"></balance-header>
        <div class="good-information">
            <div class="good-detail" >
                <div class="good-detail-header">
                    <span>Product Info</span>
                </div>
                <div class="good-detail-content" v-for="(data,index) in dataList" :key="index">
                    <div class="good-detail-img">
                        <img :src="$webUrl+data.skuImg">
                    </div>
                    <div class="good-detail-title">
                        <span class="name">{{data.skuName}}</span>
                        <div class="guige">
                            {{data.skuValuesTitleEng}}
                        </div>
                    </div>
                    <div class="price">
                        <div class="p3">
                            {{data.currencySignWebsite}}{{data.priceWebsite}}
                        </div>
                        <div class="p4 fl-right">
                            x{{data.shouldRefundNum}}
                        </div>
                    </div>
                    <div class="tkje">
                        <span class="t1">Refund:</span>
                        <span class="fl-right t2">{{data.currencySignWebsite}}{{data.totalPriceWebsite}}</span>
                    </div>
                </div>
            </div>
            <div class="cell" @click="showReason">
                <span>Reason for refunding</span>
                <span class="text " :class="{'c-999': formData.reason == 'Choose one'}">{{formData.reason}}</span>
                <van-icon name="arrow" class="arrow c-999"/>
            </div>
            <div class="cell">
                <span>Refund</span>
                <span class="text-tk c-orange f-30">
                    {{detailObj.currencySignWebsite}}{{detailObj.orderAmountWebsite}}
                    <span class="c-999 f-22">(Freight Included)</span>
                </span>
            </div>
        </div>
        <div class="cell">
            <span>Refund Description</span>
            <input type="text" class="input-xt" placeholder="optional" v-model="formData.remark">
        </div>
        <div class="up-load">
            <div class="title">Upload Evidence</div>
            <div class="uploader">
                <upload-all @getfilePathList="getfilePathList" :maxCount="6"></upload-all>
            </div>
        </div>
        <div class="btn-submit" @click="submit">Submit</div>
        <!-- 退款原因 -->
        <refundReason ref="refundReason" @getReasonText="getReasonText"></refundReason>
    </div>
</template>

<script>
import refundReason from './itemComponents/refundReason.vue'
import uploadAll from '@/multiplexing/uploadAll.vue'
import balanceHeader from './itemComponents/balanceHeader'
import {refundorderbylogisticsApi,getconfirmrefundorderbylogisticsApi} from '@/api/myOrder/index.js'
import {Toast} from 'vant'
export default {
    props: {

    },
    data() {
        return {
            fileList:[],
            show1:false,
            uploadList:[],
            headerTitle:'Refund',
            formData:{
                logisticsOrderId:'',
                orderSource:1,
                reason:'Choose one',
                remark:'',
                detailList:[],
                imgList:[]
            },
            detailObj:{},
            dataList:[],

        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        this.formData.logisticsOrderId = this.$route.query.orderId
        this.getconfirmrefundorderbylogistics(this.$route.query.orderId)
    },
    watch: {

    },
    methods: {
        afterRead(file) {
        // 此时可以自行将文件上传至服务器
        },
        //弹出退款原因弹窗
        showReason(){
            this.$refs.refundReason.closeStatu = true
        },
        //获取退款原因
        getReasonText(text){
            this.formData.reason = text
        },
        //获取上传图片列表
        getfilePathList(list){
            this.uploadList = list
        },
        //订单申请仅退款（通过物流包裹申请）页面获取订单和订单商品明细
        getconfirmrefundorderbylogistics(logisticsOrderId){
            getconfirmrefundorderbylogisticsApi({logisticsOrderId:logisticsOrderId}).then(res => {
                if(res.code == 0){
                    this.detailObj = res.Data.order
                    this.dataList = this.detailObj.detailList
                    this.headerTitle = res.Data.order.saleOrderPayStatus == 0 ? 'Return':'Refund'
                }else if(res.code == 1){
                    Toast('Parameter “requestModel” cannot be empty.')
                }else if(res.code == 2){
                    Toast('Parameter “logisticsOrderId” must be larger than 0.')
                }else if(res.code == 4){
                    Toast('You are not allowed to check the order or the order is nonexistent.')
                }
            })
        },
        //订单按包裹申请仅退款
        refundorderbylogistics(data){
            data.reason = data.reason == 'Choose one' ? '': data.reason
            refundorderbylogisticsApi(data).then(res => {
                if(res.code == 0){
                    Toast('Success')
                    setTimeout(()=>{
                        this.$router.go(-1)
                    },1000)
                }else if(res.code == 1){
                    Toast('Parameter “requestModel” cannot be empty.')
                }else if(res.code == 2){
                     Toast('Logistics ID must be larger than 0.')
                }else if(res.code == 3){
                    Toast('The source of refund order cannot be empty.')
                }else if(res.code == 4){
                    Toast('Choose the reason for refund.')
                }else if(res.code == 11){
                    Toast('Parameter “detailList” cannot be empty.')
                }else if(res.code == 12){
                    Toast('Parameter Qty of Refund Products must be larger than 0.')
                }else if(res.code == 21){
                    Toast('The order is nonexistent.')
                }else if(res.code == 22){
                    Toast('The order isn’t belong to the current user and cannot be operated.')
                }else if(res.code == 23){
                    Toast('The parcel isn’t Unreceived. Refund isn’t allowed.')
                }else if(res.code == 24){
                    Toast('The order is Unpaid. Refund isn’t allowed.')
                }else if(res.code == 25){
                    Toast('The parcel has been applied for Refund. Do not apply for Refund repeatedly.')
                }else if(res.code == 26){
                    Toast('The available Qty of refund product is changed.Please reconfirm the refund order.')
                }
            })
        },
        //提交订单
        submit(){
            if(this.formData.reason == 'Choose one') {
                Toast('Choose reason for refund')
                return
            }
            let arr = []
            let imgList = []
            this.uploadList.forEach(ele => {
                let obj = {
                    imgUrl:ele
                }
                imgList.push(obj)
            })
            this.formData.imgList = imgList

            this.dataList.forEach(item => {
                let obj = {
                    detailId:item.detailId,
                    detailNum:item.shouldRefundNum
                }
                arr.push(obj)
            })
            this.formData.detailList = arr
            this.refundorderbylogistics(this.formData)
        }
    },
    components: {
        refundReason,
        uploadAll,
        balanceHeader
    },
};
</script>

<style scoped lang="less">
.refund{
    min-height: 100vh;
    .cell{
        line-height: 40px;
        padding: 20px 30px;
        background-color: #fff;
        color: #333;
        position: relative;
        font-size: 26px;
        margin-bottom: 20px;
        overflow: hidden;
        .arrow{
            position: absolute;
            right:30px;
            top:50%;
            transform: translateY(-50%);
            
        }
        .text{
            float: right;
            width: 350px;
            text-align: right;
            margin-right:30px;
        }
        .text-tk{
            position: absolute;
            right:30px;
        }
        .input-xt{
            margin-left:40px;
            height: 40px;
            border: 0;
        }
    }
    .btn-submit{
        width: 100vw;
        height:100px;
        background:rgba(250,83,0,1);
        font-size:36px;
        line-height: 100px;
        text-align: center;
        color: #fff;
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
        padding: 30px 30px;
        position: relative;
        border-bottom: 1px solid #F2F3F5;
        .good-detail-img{
            width: 150px;
            height: 150px;
            display: inline-block;
        }
        .good-detail-title{
            display: inline-block;
            width: 336px;
            vertical-align: top;
            margin-left:20px;
            .name{
                margin-bottom: 24px;
                color: #333;
                font-size: 22px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }
            .guige{
                color: #999;
                font-size: 18px;
                display: inline-block;
                margin-bottom: 28px;
            }
        }
        .price{
            float: right;
            text-align: right;
            font-size: 26px;
            .p4{
                color: #999;
                font-size: 20px;
            }
        }
        .tkje{
            margin-left:170px;
            .t1{
                color: #999;
                font-size: 22px;
            }
            .t2{
                font-size:26px;
                color: #333;
            }
        }
    }
    .good-detail-footer{
        height: 100px;
        border-top: 1px solid #F2F3F5;
        font-size: 30px;
        color: #666;
        background-color: #fff;
    }
}
.up-load{
    padding: 30px;
    box-sizing: border-box;
    background-color: #fff;
    margin-bottom: 40px;
    .title{
        margin-bottom: 32px;
        font-size: 26px;
    }
    .uploader{
        width: 100%;
        position: relative;
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
}
.f-30{
    font-size: 30px;
}
.f-22{
    font-size: 22px;
}

</style>
