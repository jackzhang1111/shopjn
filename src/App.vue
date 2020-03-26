<template>
  <div id="app">
    <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  watch: {
    '$route': function(to,from){
      window.pageYOffset = 0
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  },
}
</script>

<style>

</style>
