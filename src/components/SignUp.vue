<template>
  

  <h1>REGISTRATION</h1>
  <div class="registration">
    <form @submit.prevent="signUp">
      <label>
        Email address <input type="email" v-model="email" required/>
      </label>
      <label>
        First Name <input type="text" v-model="FirstName" required/>
      </label>
      <label>
        Last Name <input type="text" v-model="LastName" required/>
      </label>
      <label>
        Password
        <input type="password" v-model="password" required/>
      </label>
      <label>
        Re-enter password
        <input type="password" v-model="passwordVerify" required/>
      </label>

      <button type="submit">Register</button>

    </form>

  </div>
</template>

<script>
import axios from 'axios'

export default {
name : 'SignUp',
data(){
  return{
    email:'',
    FirstName:'',
    LastName:'',
    password: '',
    passwordVerify: ''
  }
},
methods:{
  signUp(){
    //verify that passwords match
    if(this.password !== this.passwordVerify){
      this.swal({
        Title:'Password does not match.',
        type: 'warning',
        showCloseButton: true
      })
    } else{
      axios.post('/api/register',{
        email:this.email,
        FirstName:this.FirstName,
        LastName:this.LastName,
        password: this.password
      })
      .then(response =>{
        console.log(response.data)
        this.swal({
          Title: 'Registration successful',
          type:'success',
          showCloseButton:true
        })
      })
      .catch(error =>{
        console.log(error)
        this.swal({
          title:'Registration failed',
          type:'error',
          showCloseButton: true

        })
      })
    }
  }
  
  
}

}
</script>

<style>

</style>