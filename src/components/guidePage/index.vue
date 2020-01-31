<template>
<!-- 引导页 -->
  <div class="guidePage">
      <div class="logo"></div>
      <p class="title">Shopping made Easy</p>
      <div class="con">
        Convenient and Affordable prices, 
        Timely delivery and easy access to 
        world class products.
      </div>
  </div>
</template>

<script>
export default {
	name: 'HelloWorld',
	data () {
		return {
		msg: 'Welcome to Your Vue.js App'
		}
	},
	methods: {
		
	},
	mounted(){
		setTimeout(()=>{
			this.$router.push({name:'首页'})
		},3000)
	}
}
</script> 

<style scoped lang="less">
.guidePage{
  width: 100%;
  height: 100%;
  background-color: #fff;
  position: relative;
  text-align: center;
  .logo{
    width: 100vw;
    height:996px;
    background-image:url('~@/assets/img/guidePage/yindao.png');
    background-size: 100%;
  }
  .title{
    font-size:44px;
    font-family:Arial;
    font-weight:bold;
    color:rgba(250,83,0,1);
    text-align: center;
    margin: 39px 0 25px
  }
  .con{
    display: inline-block;
    width: 464px;
    font-size:30px;
    line-height:48px;
    color: #333;
    font-family:Arial;
  }
}

</style>
