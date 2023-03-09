<!--no need do this-->
<template>
  <h1>hi</h1>

  <button v-if="showBtn">yoyo</button>
  

</template>
<script>
import { useAuthStore } from "@/stores/auth";
export default {
  name:"aboutPage",

computed:{
  $state() {
      return useAuthStore();
    },
showBtn(){
  return this.$state.isAuthenticated;
}

}
}
</script>
<style scoped>
.about {
  text-align: center;
}
</style>
