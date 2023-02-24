<template>
<main class="HomePage">
  <div id="container">
    <img class="TeamUsUp_logo" alt="TeamUsUp logo" src="./assets/TeamUsUp_logo.png"/>
    <img class="Home_logo" alt="Home logo" src="./assets/Home_logo.png"/>

  </div>
</main>  
</template>

<script>
export default{
  name:"HomePage"
}
//import SignUp from "./components/SignUp.vue";
//export default {
//  name: "DefaultPage",
// components: {
//   SignUp,
// },
//};
</script>


<style scoped>

.TeamUsUp_logo{
  width:500px;
  margin:10px;
  float:left;
}

.Home_logo{
  float:right;
  width:500px;

}
</style>
