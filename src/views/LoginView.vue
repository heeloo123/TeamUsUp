<template>
  <div style="display: flex; text-align: -webkit-center">
    <div class="background">
      <div class="container">
       

        <form @submit.prevent="submitLogin" style="width: -webkit-fill-available;">
         <h1 class style="font-size: 25px; padding: 20px">TEAMUSUP MEMBER LOGIN</h1>
          
          <div class="form-group">
            <div class="G">
            <label for="email">Email address</label>
            
            <input
              type="email"
              id="email"
              placeholder="Enter your email.."
              v-model="email"
              required
            />
         
          <div style="margin-top:10px">
            <label for="password">Password</label>
            
            <input
              style="font"
              type="password"
              id="password"
              placeholder="Enter your password"
              v-model="password"
              required
            />
          </div> </div></div>
         
       

        <p style="font-size: 15px; text-align: -webkit-left; margin-left: 30px;margin-top:-20px">
          <router-link to="/ForgetPassword" class style="color: blue"
            >Forget my password</router-link
          >
        </p>

        <label style="display: flex; justify-content: space-between">
        <button class="defaultBtn">
            <router-link to="/SignUp" class="link">Register an Account!</router-link>
          </button>
       
            <button class="defaultBtn">Login</button>
          </label >
         
 </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "../stores/auth";

//import axios from "axios";


const Swal = require("sweetalert2");

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  // mounted() {
  //   const authStore = useAuthStore()
  //   if (authStore.isAuthenticated) {
  //     this.$router.push({ name: 'home' })
  //   }
  // },
  methods: {
    submitLogin() {
      try {
        const authStore = useAuthStore()
        authStore.login({ email: this.email, password: this.password })
        this.$router.push({ name: 'StudentHome' })
      } catch (error) {
        console.error(error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Invalid email or password!',
        })
      }
    },
  },
   
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.$router.push({ name: "home" });
    }
  }
}

</script>

<style scoped>

.container {
  background: rgb(255, 255, 255);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  display: flex;
  margin: 20px;
  width:400px;
  margin-top: 80px;
  align-items: center;
}

.form-group {
  display: inline;
  font-size: 20px;
  text-align: left;
  font-family: math;
  
  
}

input[type="email"],
input[type="password"] {
  width: -webkit-fill-available;;
  height: 30px;
  border:solid 1px;
  font-size: 15px;
  border-radius: 10px;
  padding-left: 20px;
  background: white;
  
}

.G{
  margin:30px;
  
}
</style>
