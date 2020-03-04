<template>
<!-- 平台介绍 -->
    <div class="introduce">
        <div class="title" v-if="showTitle">ABOUT TOSPINO APP</div>
        <p>
            <br>Severing as a cross-border online shopping mall, TOSPINO APP focuses on B2B e-commercial trading and providing global wholesale and purchasing services of multiple products to retailers by intelligent, high-effective online businesses.
            <br>With an export experience lasting for 10 years, it has developed multiple professional trading channels. It collected excellent brands and outstanding products all over China through a more comprehensive supply chain. Its categories are more integrated while prices are far better for businessmen. To perfect user experiences, TOSPINO takes mobile internet as its useful and effective trading tool. That means users can purchase any quantity of products online, anywhere and anytime. What’s more, they can choose different payments when order goods, including pay by Balance, Paypal, or Cash.
            <br>
            <br><span class="h1">ABOUT OUR TEAM</span>
            <br>Over 90 percents of TOSPINO’s staff, like warehouse personnel, couriers and online customer service staff, are local people. They all are cable enough to provide good services to our consumers for their professional skills learned from TOSPINO’s training.
            <br>
            <br><span class='h1'>ABOUT TOSPINO’s FUNCTIONS</span>
            <br>TOSPINO SHOPPING is consisted of five function modules, namely Home, Category, Cart, News and Account. Purchasers can order or buy products, check logistics, and apply refund/return services just on the APP. It is really an easier buying method with more conveniences. 
            <br>
            <br><span class='jiacu'>1)Home</span>
            <br>Functions of Home is overall and powerful, covering product targeting and searching, shopping by category, flash deals, product list and brand display. For example, it’s easy for buyers to search commodities they need via key words; and the intelligent function of skipping to specific product details is easily accessible for every single user. 
            <br><span class='jiacu'>2)Category</span>
            <br>Functions about Category are product searching, listing, ranking and selecting. All goods are classified to Digital, Food, Baby, Daily, Beauty, Electronics and other classifications.
            <br><span class='jiacu'>3)Cart </span>
            <br>Functions of Cart contain product adding, buying and canceling. That is to say it is very handy to add your goods to the Cart on the interface of Product Details.
            <br><span class='jiacu'>4)Account</span>
            <br>Account covers lots of important data, including personal information, balance, coupon, points, order delivery, browse record, collection, point description and settings.
        </p>
    </div>
</template>

<script>
export default {
    props: {
        showTitle:{
            type:Boolean,
            default:true
        }
    },
    data() {
        return {

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

    },
    components: {

    },
};
</script>

<style scoped lang="less">
.title{
    margin:72px 0 41px;
    font-weight:bold;
    font-size:32px;
    text-align: center;
}
p{
    padding: 0 30px 131px;
    font-size:26px;
    line-height:39px;
    color: #333;
}
.h1{
    display: block;
    text-align: center;
    font-weight:bold;
    font-size:32px;
}
.jiacu{
    font-size:30px;
    font-weight: bold;
}
</style>
