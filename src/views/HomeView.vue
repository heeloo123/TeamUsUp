<template>
  
    <img class="T_logo" alt="TeamUsUp logo" src="../assets/Portal_logo.jpg">
  <form>
    <img class="H_logo" alt="portal logo" src="../assets/Home_logo.png">
  
  <section class="text">
    <p style="font-size: 35px; text-align: left; position: relative; top: 140px; left:150px; color: red;">
        Student Web Portal
    </p>

    <h2 style="font-size: 35px; text-align: left; position: relative; top: 140px; left:150px;">
      Description
    </h2>

    <p style="font-size: 25px; text-align: left; position: relative; top: 140px; left:150px;">
      They are designed to help students evaluate their potential <br> teammates' teamwork history and make informed decisions <br> about future collaborations.
    </p>

    <p style="font-size: 25px; text-align: left; position: relative; top: 140px; left:150px;">
      It allow students to create a profile and list their past <br> projects, including ratings and evaluations from other team <br> memmbers.
    </p>

    <nav>
    <button class="SignUpButton"><router-link to="/SignUp">Sign-Up Now</router-link></button>
    </nav>

</section>
</form>

</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',

  }

</script>
  

<style scoped>

.text{
  float: left;
}

.T_logo{
  width: 790px;
  height: 120px;
  position: relative;
  top: 150px;
  left: 150px;
}

.H_logo{
  float:right;
  width:600px;
  position: relative;
  top: 140px;
  right: 130px;
}

.SignUpButton{
    float:right;
    height: 70px;
    width: 170px;
    background: #e12744;
    border-radius: 40px;
    margin: -55px;
    margin-right:auto;
    color: white;
    position: relative;
    top: 190px;
    left: 300px;
    font-size: 20px;
}


</style>