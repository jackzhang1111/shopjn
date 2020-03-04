<template>
<!-- 帮助中心 -->
    <div class="help-center">
        <div class="title" v-if="showTitle">Tospino’s Help Center</div>
        <p>
            <br><span class='jiacu'>1.My Order</span>
            <br><span class='jiacu'>①Change/Cancel the Order</span>
            <br>Users can cancel the order on Tospino before the delivery. 
            <br>Operations: Click “Account”, “My order”, “Undelivered” and “Cancel the Order” progressively.
            <br>Users have to cancel the original order first if they want to change it, and then re-order the relevant product.
            <br><span class='jiacu'>Attention:</span> Users cannot cancel the order if it is being delivered. To avoid the complex Return/Refund procedures, you can reject the package directly after its arrival.
            <br><span class='jiacu'>Note:</span> In rare case, due to the system design, users may fail to cancel the order even if they have clicked the button-”Cancel the Order”. You can reject the product after its arrival. The platform will refund your money after the warehousing of the rejection.
            <br><span class='jiacu'>②Check the Order</span>
            <br>You can check the order on Tospino after the delivery to know the delivery process by clicking into “Account” and “My order” progressively. 
            <br><span class='jiacu'>③Methods of Payment</span>
            <br>Cash
            <br>Balance
            <br><span class='jiacu'>Attention:</span> If buyers choose Cash, they should pay for the products on the scene after its arrival. Our transportation specialist will not give you the product if you fail to pay the product in full.
            <br>
            <br><span class='jiacu'>2.Delivery and Dispatching</span>
            <br><span class='jiacu'>①Methods of Dispatching and Date of Delivery</span>
            <br>All orders on Tospino are dispatched by our official teams. Tospino warehouse will send out packages within 72 hours after the ordering.
            <br><span class='jiacu'>②Delivery Range</span>
            <br>Currently, free delivery service covers areas within 500 kilometers away from the locations of warehouses, including:
            <br>West Region, Volta Region, Upper West Region, Northern Region, Greater Accra Region, Eastern Region, Central Region, Brong-Ahafo Region, Ashanti Region and their surrounding regions.
            <br><span class='jiacu'>③Time for Dispatching</span>
            <br>The time for dispatching is within 0.5 or 15 hours according to the shipping address. There may be a delay when the weather is bad. Wait and ensure your phone is available
            <br>
            <br><span class='jiacu'>3.Return/Refund</span>
            <br><span class='jiacu'>①Return Items</span>
            <br>Door-to-door return service on Tospino: 
            <br>After the receiving of product, buyers can contact customer service personnel and apply for return within 7 days if they find any quality problems and ask for return.  
            <br><span class='jiacu'>Rules of Return</span>
            <br>Tospino guarantees that the product is access to Return within 7 days after the agreement is signed or the order is Done. Return is impossible after this 7-day period.We propose that buyers contact customer service personnel or send the product to maintenance center if there are any warranty. 
            <br><span class='jiacu'>Standards of Product Integrity</span>
            <br>Customers must ensure the integrity of product and its related data, including label,brochure, warranty card and network card. The product quality should be the same as its original one. There is no damage to its functions and anti-fake markings or no wrong operation of activating the network card.(That means there is no trace of using products or no action of misusing it under the authorization.)
            <br>The outer packing is part of product. Therefore, it should be returned integrally without any serious damages or stains. External Packing is the original design created by manufacturer（it is the smallest sales unit). The secondary packing by logistics providers is not included.
            <br>The loss or damage of gifts or invoices will affect the Return. Tospino will take 10 percent of the product price from buyer’s account if gifts are lost or damaged, and will not return them the taxation of product if the invoice is lost.
            <br>The external packing of these products, including cosmetics, personal care products, books, baby dippers and digital products, should be the hermetic package and should not be opened. Hermetic Package is the integral plastic outside sealing created by manufacturer. 
            <br>You should shoot or video the damaged product with your phone and provide them to customer service personnel as evidences when you apply for return. Transportation specialist will carry out door-to-door pickup service within 4 days if the conditions of return are met. Ensure your phone is available and the product is integral.
            <br><span class='jiacu'>Note:</span> Please return gifts and invoices when you return the goods.
            <br><span class='jiacu'>Attention:</span> The product should be returned to warehouse in around 7 days after the processing of return application according to the dates and methods of payment, such as Cash or Balance. Thereafter, Tospino will refund you the balance/cash, if any, after the approval.
            <br><span class='jiacu'>After-sale Service Operations: </span>
            <br>-Click “ Account”, “My order” and “Done” progressively; 
            <br>-Click the ” Order No.” and “Return/Refund”; 
            <br>-Choose the type of after-sale service, fill in the reason and upload the picture.
            <br><span class='jiacu'>Should buyers return all of products?</span>
            <br>Buyers don’t need to return all of products of the order, but those goods have problems and need to return.
            <br><span class='jiacu'>Should buyers return the free gift when they ask for return?</span>
            <br>Absolutely. Buyers should return the gift of the order; otherwise, we will deduct some amount of money.
            <br><span class='jiacu'>Should buyers pay the freight of return?</span>
            <br>It depends. Tospino will pay shipping charge if the return is caused by product quality. But buyers have to pay for shipping if the return is resulted from personal factors.
            <br><span class='jiacu'>Attention:</span>
            <br>Tospino will not accept the return of products as follows.
            <br>-Bought from other platforms instead of Tospino. (The Order No. is wrong.)
            <br>-Run out of expired date. (The warranty is expired.)
            <br>-Unauthorized maintenance of wrong operations and damages of labels or specifications, such as crash, liquid soaking, modification, accidents, etc..  
            <br>-Warranty card is not consistent with the products, or is changed.
            <br>-Such products as underwear, adult products and the like.
            <br>Tospino will not accept the return in the case of such conditions:
            <br>The product size is not suitable; or customers do not like the product for its color, material and style. 
            <br>We advice buyers to seriously read the specification of product integrity and ensure the merchandise is what you truly want before you order. 
            <br><span class='jiacu'>②Exchange Items</span>
            <br>Buyers can contact customer service personnel to exchange items due to the quality of product or the damage caused during the transmission.
            <br><span class='jiacu'>Ways of Exchanging Items:</span>
            <br>Buyers should send the product to the nearest warehouse. After the inspection, personnel will exchange the product directly if the exchange requirement is met.
            <br>Buyers choose door-to-door exchange service by providing product size and number to customer service personnel. The transportation specialist will exchange the product by door-to-door pickup service within 5 days.
            <br><span class='jiacu'>After-sale Service Operations: </span>
            <br>-Click “ Account”, “My order” and “Done” progressively; 
            <br>-Click the ” Order No.” and “Return/Refund”; 
            <br>-Choose the type of after-sale service, fill in the reason and upload the picture.
            <br><span class='jiacu'>③Refund</span>
            <br>Tospino will carry out the refund procedure after warehousing of the product.
            <br>We will refund you the money according to methods of payment, status and date of delivery. Please read the types of applying refund below. 
            <br><span class='jiacu'>Return/Refund application for the undelivered order paid with balance. </span>
            <br>Operations: Click “ Account”, “My order”, “Undelivered” and “Cancel” progressively. Customer service personnel will check and deal with the application on the background and directly refund buyers the money to their accounts.
            <br><span class='jiacu'>Return/Refund application for the delivered order paid with balance.</span>
            <br>Operations: Click “My order” and “Done” progressively; click the “Order No.” and “Return/Refund” to apply for After-sale Service; and fill in the order information, including the type of after-sale service, reason, refund amount and details. Tospino’s service personnel will contact buyers according to the reasons for Return/Refund. Personnel will confirm the Return/Refund application and provide free door-to-door pickup service to customers if the application is caused by product quality. The payment will be refund to buyer’s account after the arrival of exchange products. Personnel will inform buyers that the charge of delivery should be paid by buyers themselves if the Return/Refund application is caused by non-quality factors. The payment will be refund to buyer’s account after the arrival of exchange products. 
            <br><span class='jiacu'>Return/Refund application for the delivered order paid with balance.</span>
            <br>Operations: Click “My order” and “Done” respectively; click the “Order No.” and “Return/Refund ” to apply for After-sale Service; and fill in the order information, including the type of after-sale service, reason, refund amount and details. Tospino’s service personnel will contact buyers according to the reasons for Return/Refund. Personnel will confirm the Return/Refund application and provide free door-to-door pickup service to customers if the application is caused by product quality. The payment will be refund to buyer in the form of cash after the door-to-door pickup service. Personnel will inform buyers that the charge of delivery should be paid by buyers themselves if the Return/Refund application is caused by non-quality factors. The payment will be refund to buyer in the form of cash after the door-to-door pickup service.                                                                       
            <br>
            <br><span class='jiacu'>4.Account</span>
            <br><span class='jiacu'>①Cancel the Account</span>
            <br>At present, Tospino’s account cannot be canceled directly. If you want to change the account and continue to use the APP, please click：
            <br><a href="http://www.tospinoapp.com/static/upfile/android/20191203075919_13391.apk">http://www.tospinoapp.com/static/upfile/android/20191203075919_13391.apk</a>
            <br><span class='jiacu'>②Change the Account Information</span>
            <br>If you want to change personal information, like User Avatar, Name, Phone Number and Email Address, click “Account” and your avatar to change relevant data.
            <br><span class='jiacu'>③Change Password</span>
            <br>Change the Sign-in Password
            <br>By clicking “Account”, “ Settings” and “Password Setting” respectively, you can enter the original and new passwords on the interface of“Password Setting”. After operations above, the password can be changed successfully by a click of “Save”.
            <br>Change the Payment Password
            <br>Click “Account”, “ Settings” and “Set payment password” progressively. The window of Set Payment Password will pop up. Enter and confirm your new password on the interface, and then click GET THE CODE. Enter the verification code after it was sent to your phone or email bounded to the account. After operations above, the password can be changed successfully by a click of Save.
            <br><span class='jiacu'>④Exchange/Sign-out the Account</span>
            <br>-Click “Account” and “Settings”
            <br>-Click SIGN-OUT
            <br>-Sign-in again by entering your account information
            <br><span class='jiacu'>⑤Add/Change the Shipping Address </span>
            <br>-Click “Account” and the Avatar 
            <br>-Click “Shipping Address”
            <br>-Click “Add a New Shipping Address”, fill in the form and click SAVE.
            <br>Choose a default shipping address on the interface of “Shipping Address”. The system will automatically choose the default address for you.
            <br><span class='jiacu'>⑥Recharge Procedure for Online Consumer:</span>
            <br>First, sign-in; read bank account information on Notification and save it to your phone; and transfer money to designated account through phone or in a bank.
            <br><span class='jiacu'>The Designated Bank Account:WISDOM INT.BANK BOOK (FIRST ALANTIC BANK)</span>
            <br><span class='jiacu'>Account No: 0538031101015</span>
            <br>Second,take a picture of transfer record.
            <br>Third, sign-in again; click “My order”, “Settings”and“Feedback & Help”；fill in necessary information, including user’s name and the amount and date of recharge; and upload the picture of transfer record.
            <br>Fourth, customer service personnel will recharge the related account on the background after checking the transfer amount and the picture uploaded.
            <br>Fifth, users can check the amount of recharge in Balance and purchase good on Tospino with Balance.
            <br>Sixth, please contact customer service personnel actively and inform them your recharge if the money does not arrive at your Balance after 2 days.
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
.help-center{
    width: 100vw;
}
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
    word-wrap:break-word
}
.jiacu{
    font-size:30px;
    font-weight: bold;
}
</style>
