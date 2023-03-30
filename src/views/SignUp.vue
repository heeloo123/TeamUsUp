<template>
  <div style="display: flex; text-align: -webkit-center">
    <div class="background">
      <div class="container">
        <div class="Title">
          <h1 style="font-size: 30px; margin-left: -220px">Sign Up</h1>
          <h3 style="margin-left: 30px; color: grey">
            Please fill in this form to create an account!
          </h3>
        </div>
        <div class="registration">
          <form @submit.prevent="signUp">
            <label>
              <input
                type="email"
                placeholder="Enter your email address"
                v-model="email"
                required=""
              />
            </label>
            <label>
              <input
                type="text"
                placeholder="Enter your first name"
                v-model="firstName"
                required=""
              />
            </label>
            <label>
              <input
                type="text"
                placeholder="Enter your last name"
                v-model="lastName"
                required=""
              />
            </label>
            <span
              v-if="passwordError"
              style="color: red; font-size: 15px; margin-left: 200px"
            >
              {{ passwordError }}
            </span>
            <label>
              <input
                type="password"
                placeholder="Password"
                v-model="password"
                @input="validatePassword"
                required=""
              />
            </label>
            <div>
              <input
                type="password"
                placeholder="Repeat your password"
                v-model="passwordVerify"
                @input="validatePassword"
                required=""
              />
            </div>
            <div style="margin-left: 400px">
              <button class="defaultBtn" v-on:click="Submit">SIGN UP</button>
            </div>
          </form>
        </div>
      </div>
      <div style="font-size: 20px; padding: 10px">
        Have already an account?
        <router-link to="/Login">Login here!</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const Swal = require("sweetalert2");
//import PageHeader from './Header.vue'
export default {
  componenets: {
    name: "SignUpView",

    //PageHeader
  },

  data() {
    return {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      rules: { min: 8 },
      passwordVerify: "",
      passwordError: "",
    };
  },

  methods: {
    validatePassword() {
      if (this.password.length < this.rules.min) {
        this.passwordError =
          "Password should be at least " + this.rules.min + " characters long";
      } else if (this.password !== this.passwordVerify) {
        this.passwordError = "Passwords do not match";
      } else {
        this.passwordError = "";
      }
    },
    submit() {
      //verify that passwords match
      if (this.password !== this.passwordVerify) {
        Swal.fire({
          title: "Password does not match.",
          icon: "warning",
        });
      }
      console.warn("signup", this.name, this.email, this.password);
    },
    async signUp() {
  try {
    const loading = Swal.fire({
      title: "Signing up...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    let result = await axios.post(process.env.VUE_APP_API_URL+ "/register", {
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
    });
    console.warn(result);
    loading.close();

    if (result.status == 201) {
      Swal.fire({
        title: "Welcome",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });
     

      //auto log in user
      this.$router.push({ name: "home" });
      console.log(this.email, this.password);
    }  
  } catch (error) {
    Swal.fire({
        title: "Something went wrong..",
        icon: "error",
        timer: 1000,
        showConfirmButton: false,
      });
  }
},
  },
  // mounted(){
  //   let user = localStorage.getItem('user-info');
  //   if(user){
  //     this.$router.push({ name: "home" });
  //   }

  // }
};
</script>

<style scoped>


.Title {
  float: left;
}

.registration {
  margin: 10px;
}

.registration input {
  width: 500px;
  height: 40px;
  padding-left: 30px;
  display: block;
  margin-bottom: 20px;
  font-size: 15px;
  border-radius: 6px;
  position: inherit;
  border: transparent;
  background: rgb(240, 236, 236);
}

.container {
  background: rgb(255, 255, 255);
  border-radius: 20px;
  width: fit-content;
  display: block;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  margin-top:30px ;
}
</style>
