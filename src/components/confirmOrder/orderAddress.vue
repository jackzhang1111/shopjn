<script>
import accountAddress from '@/components/tabbar/account/accountSettings/accountAddress'
import {mapActions} from 'vuex'
export default {
    props: {

    },
    extends:accountAddress,
    data() {
        return {
            title:'Shipping Address',
            title2:'Add',
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
        ...mapActions(['setadressitem']),
        cliCard(data){
            this.setadressitem(data)
            this.$router.go(-1)
        },
        
    },
    components: {

    },
};
</script>

<style scoped lang="less">

</style>
