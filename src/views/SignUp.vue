
<template>
  <div style="display: flex; text-align: -webkit-center">
    <div class="background">
      <!-- Can anyone help with the style<>...cant do exactly same as the ui layout...-->

      <div class="container">
        <div class="Title">
          <h1 style="font-size: 40px;margin-left:-270px">Sign Up</h1>
          <h2 style="margin-left:50px;color:grey;">Please fill in this form to create an account!</h2>
        </div>
        <div class="registration">
          <form @submit.prevent="signUp">
            <label>
              <input type="email" placeholder="Enter your email address" v-model="email" required="" />
            </label>
            <label>
              <input type="text" placeholder="Enter your first name" v-model="FirstName" required="" />
            </label>
            <label>
              <input type="text" placeholder="Enter your last name" v-model="LastName" required="" />
            </label>
            <label>
              <input type="password" placeholder="Password" v-model="password" required="" />
            </label>
            <div class="box">
              <input type="password" placeholder="Repeat your password" v-model="passwordVerify" required="" />
            </div>
            <div style="margin-left: 400px">
              <button class="defaultBtn" type="submit">SIGN UP</button>
            </div>
          </form>

          
        </div>
      </div>
      <div style="font-size: 20px; padding: 10px">
            Have already an account?
            <router-link to="/login">Login here!</router-link>
          </div>
    </div>
  </div>
</template>


<script>
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
      FirstName: "",
      LastName: "",
      password: "",
      rules: { min: (v) => v.lenght >= 8 || "Min 8 characters" },
      passwordVerify: "",
    };
  },

  methods: {
    signUp() {
      //verify that passwords match
      if (this.password !== this.passwordVerify) {
        Swal.fire({
          title: "Password does not match.",
          icon: "warning",
        });
      }
    },
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
.Title{
  float:left;

}
.registration {
  margin: 10px;
}

.registration input {
  width: 500px;
  height: 50px;
  padding-left: 30px;
  display: block;
  margin-bottom: 20px;
  font-size: larger;
  border-radius: 6px;
  position: inherit;
  border:transparent;
  background: rgb(240, 236, 236);
}

.container {
  background: rgb(255, 255, 255);
  border-radius: 20px;
  width: fit-content;

  margin-top: 100px;
}
</style>