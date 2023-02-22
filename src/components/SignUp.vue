
<template>
  
<div class="container">
  <h1>REGISTRATION</h1>
  <div class="registration">
    <form @submit.prevent="signUp">
      <label>
        Email<input type="email" v-model="email" required=""/>
      </label>
      <label>
        First Name<input type="text" v-model="FirstName" required=""/>
      </label>
      <label>
        Last Name<input type="text" v-model="LastName" required=""/>
      </label>
      <label>
        Password<input type="password" v-model="password" required=""/>
      </label>
      <div class="box">
        Re-enter password<input type="password" v-model="passwordVerify" required=""/>
      </div>
      <button style="border-radius:6px; background:black;color:white; font-size:large" type="submit">Register</button>
      
    </form>
  </div>
 
  </div>
</template>

<script>

const Swal = require('sweetalert2')

export default {
name:'SignUp',

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
<style>
  
  

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
  block-size:fit-content;
  background: #d8d2d3;
  border-radius:6px;
  margin-right:500px;
  margin-left:100px;
  position:fixed;
  text-align: left;
  padding:20px;
  

}




</style>