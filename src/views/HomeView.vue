<template>
  <div class="container">
    <img class="home_logo" alt="TeamUsUp logo" src="../assets/Home_logo.png">
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView'
  
}
</script>

<style scoped>
.container{
  display:block;
  background:transparent
  
}
.home_logo{
  width: 200px;
  height: 100px;
  position: relative;
  right: 200px;
  bottom: 50px;
}
</style>