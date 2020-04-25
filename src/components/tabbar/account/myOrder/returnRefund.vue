<template>
<!-- 退货退款页面 -->
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
                        <div class="guige">{{data.skuValuesTitleEng}}</div>
                        
                    </div>
                    <div class="price">
                        <div class="p3">{{data.currencySignWebsite}}{{data.priceWebsite}}</div>
                        <div class="selection-right-stepper">
                            <div class="add-btn" :style="{color:(data.shouldReturnNum == data.canReturnMaxNum?'#dcdcdc':'#999')}" @click="changeStepper(data,'add')">+</div>
                            <div class="center-input">
                                <input type="number" class="number-input" v-model="data.shouldReturnNum" @blur="blur(data)" :min="1">
                            </div>
                            <div class="reduce-btn"  :style="{color:(data.shouldReturnNum==1?'#dcdcdc':'#999')}" @click="changeStepper(data,'reduce')">一</div>
                        </div>
                    </div>
                    <div class="tkje">
                        <span class="c-999 f-22">Refund:</span>
                        <span class="fl-right fs-26">{{data.currencySignWebsite}}{{data.totalPriceWebsite}}</span>
                    </div>
                </div>
            </div>
            <div class="cell" @click="showReason">
                <span>Reason for refunding</span>
                <span class="text" :class="{'c-999':formData.reason=='Choose one'}">{{formData.reason}}</span>
                <van-icon name="arrow" class="arrow c-999"/>
            </div>
            <div class="cell">
                <span>Refund</span>
                <span class="text-tk c-orange f-30">
                    <span>{{orderData.currencySignWebsite}}{{orderData.orderAmountWebsite}}</span> 
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
import {getconfirmreturnorderApi,returnorderApi} from '@/api/myOrder/index.js'
import {mapState,mapActions} from 'vuex'
import {Toast} from 'vant'
export default {
    props: {

    },
    data() {
        return {
            fileList:[],
            show1:false,
            uploadList:[],
            headerTitle:'Return & Refund',
            dataList:[],
            orderData:{},
            formData:{
                orderId:'',
                orderSource:1,
                reason:'Choose one',
                remark:'',
                detailList:[],
                imgList:[]
            },
            go:null
        };
    },
    computed: {
        ...mapState({
            orderdetailList:state=>state.orderdetailList
        }),
    },
    created() {

    },
    mounted() {
        this.getconfirmreturnorder({orderId:this.$route.query.orderId,detailList:this.orderdetailList})
        this.formData.orderId = this.$route.query.orderId
    },
    beforeDestroy(){
        this.setorderdetaillist([])
    },
    beforeRouteEnter(to, from, next){
        next(vm => {
            if(from.name == '订单详情'){
                vm.go = -1
            }else if(from.name=='批量退货退款'){
                vm.go = -2
            }
        })
    },
    watch: {

    },
    methods: {
         ...mapActions(['setorderdetaillist']),
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
        //批量退货退款明细
        getconfirmreturnorder(data){
            getconfirmreturnorderApi(data).then(res => {
                if(res.code == 0){
                    this.orderData = res.Data.order
                    this.dataList = res.Data.order.detailList
                }
            })
        },
        //提交
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
                    detailNum:item.shouldReturnNum
                }
                arr.push(obj)
            })
            this.formData.detailList = arr
            this.returnorder(this.formData)
        },
        //订单申请退货退款
        returnorder(data){
            returnorderApi(data).then(res => {
                if(res.code == 0){
                    this.$router.go(this.go)
                }else if(res.code == 1){
                    Toast('Parameter “requestModel” cannot be empty.')
                }else if(res.code == 2){
                    Toast('Parameter Order ID must be larger than 0.')
                }else if(res.code == 3){
                    Toast('The source of Return & Refund order cannot be empty.')
                }else if(res.code == 4){
                    Toast('Choose the reason for Return & Refund.')
                }else if(res.code == 11){
                    Toast('Parameter “detailList” cannot be empty.')
                }else if(res.code == 12){
                    Toast('Parameter Product Qty of Return & Refund must be larger than 0.')
                }else if(res.code == 21){
                    Toast('The order is nonexistent.')
                }else if(res.code == 22){
                    Toast('The order isn’t belong to the current user and cannot be operated.')
                }else if(res.code == 23){
                    Toast('FBM order does not support Return & Refund.')
                }else if(res.code == 24){
                    Toast('The order is Unpaid. Refund isn’t allowed.')
                }else if(res.code == 25){
                    Toast('There is no available product can be applied for return & refund in this order.')
                }else if(res.code == 26){
                    Toast('The product Qty of return&refund you applied for exceeds the available product Qty of return&refund.')
                }
            })
        },
        //更改数量
        changeStepper(itemdetail,type){
            if(type == 'add'){
                if(itemdetail.shouldReturnNum >= itemdetail.canReturnMaxNum){
                    return
                }else{
                    itemdetail.shouldReturnNum++
                }
            }else{
                if(itemdetail.shouldReturnNum == 1){
                    return
                }else{
                    itemdetail.shouldReturnNum--
                }
            }
            this.changeNumber()
        },
        //输入框改变
        blur(itemdetail){
            if(itemdetail.shouldReturnNum >= itemdetail.canReturnMaxNum){
                itemdetail.shouldReturnNum = itemdetail.canReturnMaxNum
            }else if(itemdetail.shouldReturnNum <= itemdetail.canReturnMaxNum){
                itemdetail.shouldReturnNum = 1
            }
            this.changeNumber()
        },
        //更改数量
        changeNumber(){
            let orderData = {
                orderId:this.$route.query.orderId,
                detailList:[]
            }
            this.dataList.forEach(ele => {
                let obj = {
                    detailId:ele.detailId,
                    detailNum:ele.shouldReturnNum
                }
                orderData.detailList.push(obj)
            })
            this.getconfirmreturnorder(orderData)
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
    position: relative;
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
        position: absolute;
        bottom: 0;
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
    }
    .good-detail-content{
        background-color: #fff;
        padding: 30px 30px;
        position: relative;
        border-bottom: 1px solid #F2F3F5;
        .good-detail-img{
            width: 150px;
            height: 150px;
            display: inline-block;
            vertical-align: top;
            margin-right:20px;
        }
        .good-detail-title{
            display: inline-block;
            width: 397px;
            .name{
                display: inline-block;
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
                margin-bottom: 28px;
            }
        }
        .price{
            float: right;
            text-align: right;
            font-size: 26px;
            .p3{
                font-size:26px;
                color: #333;
                margin-bottom: 24px;
            }
            .selection-right-stepper{
                position: relative;
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
                    border-left:none;
                    font-size: 40px;
                }
                .reduce-btn{
                    position: absolute;
                    top:20px;
                    right:128px;
                    width: 40px;
                    height: 40px;
                    border: 1px solid #999999;
                    border-right:none;
                    text-align: center;
                    line-height: 40px;
                    background-color: #EEEEEE;
                    color: #666;
                }
                .center-input{
                    position: absolute;
                    top:20px;
                    right:40px;
                    width: 88px;
                    height: 40px;
                    text-align: center;
                    line-height: 40px;
                    .number-input{
                        width: 90%;
                        height: 75%;
                        text-align: center;
                    }
                }
            }
        }
        .tkje{
            height: 50px;
            line-height: 50px;
            margin-left:170px;
        }
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
