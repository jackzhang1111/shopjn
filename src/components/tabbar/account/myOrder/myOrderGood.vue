<template>
    <div class="my-order-good">
        <search-head @onfocus="onfocus" @getInputVal="getInputVal" @onSearch="onSearch"></search-head>
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
                    <order-type :dfkList="recordGroup"></order-type>
                </div>
                <no-search v-show="!noSearchStatus"></no-search>
            </scroll>
        </div>
        
    </div>
</template>

<script>
import orderType from './itemComponents/orderType'
import searchHead from '@/multiplexing/searchHead.vue'
import {orderlistApi} from '@/api/myOrder/index.js'
import noSearch from './itemComponents/noSearch'
import {mapState,mapActions} from 'vuex'
export default {
    props: {

    },
    data() {
        return {
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
            dataList:[]
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
                this.formData.page = 1
                this.formData.limit = 10
                this.orderlist(this.formData,true)
                this.pullup = true
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
    },
    components: {
        orderType,
        searchHead,
        noSearch
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
