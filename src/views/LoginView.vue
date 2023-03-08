<template>
  <div style="display: flex; text-align: -webkit-center">
    <div class="background">
      <div class="container">
        <h1 class style="font-size: 40px; padding: 20px">TEAMUSUP MEMBER LOGIN</h1>

        <form @submit.prevent="submitLogin">
          <div class="form-group">
            <label for="email">Email address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email.."
              v-model="email"
              required
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              style="font"
              type="password"
              id="password"
              placeholder="Enter your password"
              v-model="password"
              required
            />
          </div>
          <div style="float: right; margin-top: 40px">
            <button class="defaultBtn">Login</button>
          </div>
        </form>

        <p style="font-size: 20px; text-align: -webkit-left; margin-left: 40px">
          <router-link to="/ForgetPassword" class style="color: blue"
            >Forget my password</router-link
          >
        </p>

        <form style="display: flex; justify-content: space-between">
          <button class="defaultBtn">
            <router-link to="/SignUp" class="link">Register an Account!</router-link>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
//import{useAuthStore} from '../stores/auth'
import axios from "axios";

const Swal = require("sweetalert2");

export default {
  component: {
    name: "LoginView",
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    // async submitLogin() {
    //   try {
    //     console.log(this.email);
    //     console.log(this.password)
    //     await useAuthStore().login() // call the login action from your auth store
    //     this.$router.push("/home");

    //   } catch (error) {
    //     console.error(error);
    //     Swal.fire({
    //       icon: "error",
    //       title: "Oops...",
    //       text: "Invalid email or password!",
    //     });
    //   }
    // },
    async submitLogin() {
      
      let result = await axios.get(
        `http://localhost:3000/users?email=${this.email}&password=${this.password}` //use backticks ` instead of '
      )
      console.warn(result)
      if (result.status == 200 && result.data.length > 0) {
        Swal.fire({
          title: "Succesful log in",
          icon: "success",
        });

        localStorage.setItem("user-info", JSON.stringify(result.data[0]));
        this.$router.push({ name: "home" });
      } else {
        Swal.fire({
          title: "Somethings wrong...",
          icon: "error",
        });
      }
    },
  },

  /*    previous    ---------------     */
  // methods: {
  //   async submitLogin() {
  //     try {
  //       console.log(this.email);
  //       console.log(this.password)
  //       // here you use withAuthentication instead. The endpoint doesnt receive a body
  //         const response = await axios.post("http://49.245.48.28:8080/login", {},{
  //           //following this, the next requests shud probably only need with credentials
  //       headers: {
  //         Authorization: "Basic " + btoa(this.email + ":" + this.password)}
  //       });
  //       if (response.status === 202) {
  //         // Login successful
  //         console.log(response.data); // The user object returned by the server
  //         this.$router.push("/home");

  //       } else {
  //         // Login failed
  //         console.log("login failed!")
  //         Swal.fire({
  //           icon: "error",
  //           title: "Oops...",
  //           text: "Invalid email or password!",
  //         });
  //       }
  //     } catch (error) {
  //       //handle api request errors
  //       if(error.response.status === 401){
  //         Swal.fire({
  //           icon: "error",
  //           title: "Oops...",
  //           text: "Invalid email or password!",
  //         });
  //       } else{
  //       console.error(error);}
  //     }
  //   },
  /*-------------- end here -------*/
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.$router.push({ name: "home" });
    }
  },
};
</script>

<style scoped>
.background {
  background: rgb(224, 216, 216);
  height: 100vh;
  width: 100vw;
  margin: -10px;
  font-family: math;
}

.container {
  background: rgb(255, 255, 255);
  border-radius: 20px;
  display: block;
  margin: 20px;
  width: 800px;
  margin-top: 100px;
}

.form-group {
  display: block;
  margin: 30px;
  font-size: 32px;
  text-align: -webkit-left;
  font-family: math;
}

input[type="email"],
input[type="password"] {
  width: 700px;
  height: 40px;
  margin: auto;
  font-size: 20px;
  border-radius: 10px;
  padding-left: 20px;
  background: white;
}
</style>
