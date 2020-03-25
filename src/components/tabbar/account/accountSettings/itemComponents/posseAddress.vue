<template>
    <div class="posse-address">
        <div class="address-content" v-for="data in dataList" :key="data.addressId" @click="cliCard(data)">
            <div class="content-p1">
                <span class="name">{{data.name}}</span>
                <span class="phone">{{data.phoneNumber}}</span>
                <span class="dqmr" v-if="data.isDefault == 1">Default</span>
            </div>
            <div class="content-p2">
                <span class="break-word">Shipping Address:{{data.addreCitys}} {{data.userAddress}}</span>
            </div>
            <div class="content-p3">
                <span>Zip Code:{{data.areaCode}}</span>
            </div>
            <div class="content-btns">
                <div class="btn-bj" @click.stop="editRedord(data)">Edit</div>
                <div class="btn-sc" @click.stop="deleteRedord(data.addressId)">Delete</div>
            </div>
        </div>

        <van-overlay :show="redordshow" @click="redordshow = false" >
            <!-- 删除历史记录 -->
            <div class="overlay-wrapper" @click.stop>
                <div class="overlay-wrapper-p1">Are you sure to delete the address?</div>
                <div class="overlay-wrapper-p2">Attention: You can't cancel any orders gonna be sent to the address that you delete. To avoid impact on delivery, please upgrade all addresses on you wish list, subscription and default settings.</div>
                <div class="overlay-wrapper-btns">
                    <span class="btn-no" @click="redordshow = false">NO</span>
                    <span class="btn-yes" @click="$emit('deladdress',addressId)"> YES</span>
                </div>
            </div>
        </van-overlay>


    </div>
</template>

<script>
export default {
    props: {
        posseData:{
            type:Object,
            default: ()=>{
                return {}
            }
        },
    },
    data() {
        return {
            redordshow:false,
            posseObj:{},
            dataList:[],
            addressId:''
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        this.getData()
    },
    watch: {
        posseData:{
            handler:function(newVal, oldVal){
                this.getData()
            },
        },
    },
    methods: {
        deleteRedord(id){
            this.redordshow = true
            this.addressId = id
        },
        jumpRouter(name){
            this.$router.push({name})
        },
        //编辑地址
        editRedord(obj){
            this.$fn.deepnull(this.$store.state.addreData)
            this.$store.state.posseObj = obj
            this.$router.push({name:'新增地址',query:{type:'edit'}})
        },
        //获取地址数据列表
        getData(){
            this.posseObj = Object.assign({},this.posseObj,this.posseData)
            this.dataList = this.posseObj.list
        },
        cliCard(data){
            this.$emit('cliCard',data)
        }
    },
    components: {

    },
};
</script>

<style scoped lang="less">
.posse-address{
    padding: 0 30px;
    .address-content{
        width:690px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(153,153,153,1);
        padding: 29px 30px 20px 39px;
        box-sizing: border-box;
        margin-top:30px;
        .content-p1{
            color: #333;
            margin-bottom: 30px;
            .name{
                font-size: 36px;
                margin-right:33px;
            }
            .phone{
                font-size:28px;
                color: #999;
            }
            .dqmr{
                float: right;
                color: #DB9000;
                font-size:24px;
            }
        }
        .content-p2,.content-p3{
            font-size:24px;
            line-height:36px;
            color: #333;
            margin-bottom: 20px;
            .break-word{
                word-wrap:break-word
            }
        }
        .content-btns{
            position: relative;
            height: 40px;
            .btn-bj{
                width:100px;
                height:40px;
                border:1px solid rgba(51,51,51,1);
                line-height: 40px;
                text-align: center;
                position: absolute;
                left:176px;
            }
            .btn-sc{
                width:100px;
                height:40px;
                border:1px solid rgba(51,51,51,1);
                line-height: 40px;
                text-align: center;
                position: absolute;
                right: 215px;
            }
        }
    }
}
.van-overlay{
    .overlay-wrapper{
        width: 550px;
        background-color: #fff;
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        padding: 49px 30px 40px;
        box-sizing: border-box;
        .overlay-wrapper-p1{    
            font-size:36px;
            color: #333;
            margin-bottom: 30px;
        }
        .overlay-wrapper-p2{
            font-size: 20px;
            color: #666;
            margin-bottom: 49px;
        }
        .overlay-wrapper-btns{
            font-size:34px;
            .btn-no{
                float: left;
                width:146px;
                height:58px;
                background:rgba(220,220,220,1);
                color: #333;
                text-align: center;
                line-height: 58px;
                margin-left:54px;
            }
            .btn-yes{
                float: right;
                width:146px;
                height:58px;
                background:#FA5300;
                text-align: center;
                line-height: 58px;
                margin-right:54px;
            }
        }
    }
}
</style>
