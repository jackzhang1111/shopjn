<template>
<!-- 退款原因 -->
    <div class="refund-reason">
        <transition name="canorder">
            <zhezhao v-show="closeStatu">
                <transition name="updown">
                    <div class="cancel-order" v-show="closeStatu">
                        <div class="cancel-list">
                            <div class="cancel-title">
                                <span>Reason for refunding</span>
                                <van-icon name="cross" class="cross" @click="closeStatu = false"/>
                            </div>
                            <div class="yuanyin-list" v-for="(reason,index) in reasonList" :key="index" @click="obtainText(reason.text)">
                                <span>{{reason.text}}</span>
                            </div>
                            
                        </div>
                        <div class="btns" @click="closeStatu = false">Close</div>
                    </div>
                 </transition>
            </zhezhao>
        </transition>
    </div>
</template>

<script>
import zhezhao from '@/multiplexing/zhezhao'
export default {
    props: {

    },
    data() {
        return {
            closeStatu:false,
            reasonList:[
                {
                    text:'The size does not confirm with the specification.'
                },
                {
                    text:'The color/style does not confirm with the specification.'
                },
                {
                    text:'The material does not confirm with the specification.'
                },
                {
                    text:'Missing piece(s).'
                },
                {
                    text:'Packaging/goods damaged or stained.'
                },
                {
                    text:'The seller has sent me the wrong goods.'
                }
            ]
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    watch: {

    },
    methods: {
        obtainText(text){
            this.closeStatu = false
            this.$emit('getReasonText',text)
        }
    },
    components: {
        zhezhao
    },
};
</script>

<style scoped lang="less">
.refund-reason{
    .cancel-order{
        position: fixed;
        bottom: 0;
        background-color: #fff;
        height: 850px;
        width: 100vw;
        box-sizing: border-box;
        .cancel-list{
            position: relative;
            height: 100%;
            padding: 0 30px;
        }
        .cancel-title{
            height: 100px;
            text-align: center;
            line-height: 100px;
            font-size:36px;
            color: #333;
            position: relative;
        }
        .cross{
            position: absolute;
            right:45px;
            top:34px
        }
        .yuanyin{
            font-size:26px;
            color: #999;
            margin-bottom: 30px;
        }
        .yuanyin-list{
            // height: 100px;
            line-height: 50px;
            font-size:30px;
            color: #333;
            border-bottom: 1px solid #DCDCDC;
            position: relative;
            padding: 10px 0
        }
        .yuan{
            width:40px;
            height:40px;
            position: absolute;
            border-radius: 50%;
            border:1px solid rgba(153,153,153,1);
            top:0;
            right:30px;
        }
        .yuan-img{
            width:40px;
            height:40px;
            position: absolute;
            top:0;
            right:30px;
            img{
                position: absolute;
                top:0;
                left:0
            }
        }
        .btns{
            position: absolute;
            bottom: 0px;
            width: 100vw;
            background-color: #FA5300;
            height: 100px;
            line-height: 100px;
            font-size: 40px;
            color: #fff;
            text-align: center;
        }
    }
}
</style>
