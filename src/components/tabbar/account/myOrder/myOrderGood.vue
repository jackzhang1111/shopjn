<template>
    <div class="my-order-good">
        <search-head @onfocus="onfocus" @getInputVal="getInputVal" @onSearch="onSearch" :searName="searName"></search-head>
        <div>
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
import orderType from './itemComponents/orderType'
import searchHead from '@/multiplexing/searchHead.vue'
import {orderlistApi,orderlaunchpayApi,completeorderApi} from '@/api/myOrder/index.js'
import noSearch from './itemComponents/noSearch'
import {mapState,mapActions} from 'vuex'
import actionSheetPassword from '@/multiplexing/actionSheetPassword'
import actionSheetPaymen from '@/multiplexing/actionSheetPaymen'
import actionSheetSucess from '@/multiplexing/actionSheetSucess'
import cancelOrder from './itemComponents/cancelOrder'
import { Toast } from 'vant';
export default {
    props: {

    },
    data() {
        return {
            moeny:0,
            totalCount:0,
            recordGroup: [],
            pulldown: true,
            pullup: true,
            noSearchStatus:true,
            guanmengou : true,
            formData:{
                product_key_name:'',
                order_status_app:null,
                page:1,
                limit:10
            },
            dataList:[],
            searName:'',
            show:false,
            orderId:0,
            typeLeixing:'',
            payTypeDetail:201,//余额支付ID,暂时写死
            orderData:{},
        };
    },
    computed: {
        ...mapState({
            searchOrderFormData:state=>state.searchOrderFormData
        })
    },
    created() {

    },
    mounted() {
        this.formData = Object.assign({},this.formData,this.searchOrderFormData)
        this.orderlist(this.formData,true)
        this.searName = this.$route.query.keyName
        if(this.searName != null) {
            this.formData. product_key_name = this.searName
        }
        this.refreshOrder()
    },
    watch: {

    },
    methods: {
        ...mapActions( 
            ['setorderformdata'] 
        ),
        //下拉刷新
        _pulldown() {
            setTimeout(()=>{
                this.refreshOrder()
            },500)
        },
        //上拉加载
        _pullup(otherData) {
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
         //输入框获得焦点时触发
        onfocus(){
            
        },
        //点击搜索按钮
        onSearch(){
            this.formData.page = 1
            this.orderlist(this.formData,true)
        },
        //输入框内容变化时触发
        getInputVal(value){
            this.formData.product_key_name = value
        },
        //我的订单列表
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
                    }
                }
            })
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
        //刷新页面
        refreshOrder(){
            this.formData.page = 1
            this.formData.limit = 10
            this.orderlist(this.formData,true)
            this.pullup = true
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
        //密码弹窗
        showPassWord(flag,typeLeixing,alldata){
            this.$refs.actionSheetPassword.showAction = flag
            this.typeLeixing = typeLeixing
            if(!alldata) return
            this.orderData = alldata
        },
    },
    components: {
        orderType,
        searchHead,
        noSearch,
        actionSheetPassword,
        actionSheetPaymen,
        actionSheetSucess,
        cancelOrder,
    },
};
</script>

<style scoped lang="less">
.my-order-good{
    padding: 20px 30px;
}
.bscroll-wrapper{
    height: calc(100vh - 100px);
}
</style>
