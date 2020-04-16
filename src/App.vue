<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import decode from 'jwt-decode'
export default {
  created(){
     let  token = localStorage.getItem('token')
     this.$store.dispatch("setAuthenticated",!this.isempty(token))
     this.$store.dispatch("setUser", decode(token))
  },
  methods:{
    isempty(value){
      if(value){
        return false
      }else{
        return true
      }
    }
  }
}
</script>
<style lang="less" scoped>
#app{
  height: 100%;
  width: 100%;
}
</style>
