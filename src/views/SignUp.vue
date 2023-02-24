
<template>

 
  <!-- Can anyone help with the style<>...cant do exactly same as the ui layout...-->
<img class="logo" alt="SignUp logo" src="../assets/register_logo.png"/>
<div class="container">
  <h1>REGISTRATION</h1>
  <div class="registration">
    <form @submit.prevent="signUp">
      <label>
        Email<input type="email" placeholder="Enter your email address" v-model="email" required=""/> 
      </label>
      <label>
        First Name<input type="text" placeholder="Enter your first name" v-model="FirstName" required=""/>
      </label>
      <label>
        Last Name<input type="text" placeholder="Enter your last name" v-model="LastName" required=""/>
      </label>
      <label>
        Password<input type="password" placeholder="8-20 Characters" v-model="password" required=""/>
      </label>
      <div class="box">
        Comfirmed password<input type="password" placeholder="Re-Enter password" v-model="passwordVerify" required=""/>
      </div>
      <button style="width:150px;border-radius:6px; background:black;color:white; font-size:large" type="submit">Register</button>
      
    </form>
  </div>
 
  </div>

</template>


<script>

const Swal = require('sweetalert2')

//import PageHeader from './Header.vue'
export default {
componenets: {
  name:'SignUpView',
 
  //PageHeader
},



data(){
  return{
    email:'',
    FirstName:'',
    LastName:'',
    password: '', rules:{min:v=> v.lenght>=8 || 'Min 8 characters'},
    passwordVerify: ''
  }
},

methods:{
  signUp(){
    //verify that passwords match
    if(this.password !== this.passwordVerify){
      Swal.fire({
        title:'Password does not match.',
        icon: 'warning'
      })
    } 
  }
 }
}


     

</script>

<style scoped> 



 .logo 
 {
    float: right;
    margin:90px;
    width: 400px;
    position: fixed;
    right: 400px;
    top: 190px;
  
 } 
  

.registration input{
    width: 500px;
    height: 50px;
    padding-left: 30px;
    display: block;
    margin-bottom: 20px;
    font-size: larger;
    border-radius: 6px;
    position: inherit;
}


.container{
  display: block;
  background: #d8d2d3;
  border-radius:6px;
  margin-right:500px;
  margin-left:200px;
  position:fixed;
  text-align: left;
  padding:20px;
  left: 160px;
  top: 230px;
  
}

</style>