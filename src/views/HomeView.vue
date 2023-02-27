<template>
  
    <img class="T_logo" alt="TeamUsUp logo" src="../assets/Portal_logo.jpg">
  <form>
    <img class="H_logo" alt="portal logo" src="../assets/Home_logo.png">
  
  <section class="text">
    <p style="font-size: 35px; color: red;">
        Student Web Portal
    </p>

    <h1 style="font-size: 35px;">
      Description
    </h1>

    <p style="font-size: 25px;">
      They are designed to help students evaluate their potential <br> teammates' teamwork history and make informed decisions <br> about future collaborations.
    </p>

    <p style="font-size: 25px; text-align: left;">
      It allow students to create a profile and list their past <br> projects, including ratings and evaluations from other team <br> memmbers.
    </p>

    <nav>
    <button class="SignUpButton"><router-link to="/SignUp">Sign-Up Now</router-link></button>
    </nav>

</section>
</form>
<!---->
<router-link to="/CreateProfile">*Test*C_Profile</router-link> |
<router-link to="/CreateProject">*Test*C_Project</router-link> |
<router-link to="/Profile">*Test*Profile</router-link> |
<router-link to="/Project">*Test*Project</router-link> |

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
  text-align: left;
  float: left;
  position: fixed;
  top: 380px; 
  left:150px;

}

.T_logo{
  width: 790px;
  height: 120px;
  position: fixed;
  top: 250px;
  left: 150px;
}

.H_logo{
  float:right;
  width:600px;
  position: fixed;
  top: 400px;
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
    position: fixed;
    top: 850px;
    left: 690px;
    font-size: 20px;
}


</style>