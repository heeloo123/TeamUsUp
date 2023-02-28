
<template>
  <div style="display: flex; text-align: -webkit-center">
    <div class="background">
      <div class="container">
        <div class="Title">
          <h1 style="font-size: 40px; margin-left: -270px">Sign Up</h1>
          <h2 style="margin-left: 50px; color: grey">
            Please fill in this form to create an account!
          </h2>
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
                v-model="FirstName"
                required=""
              />
            </label>
            <label>
              <input
                type="text"
                placeholder="Enter your last name"
                v-model="LastName"
                required=""
              />
            </label>
            <span v-if="passwordError" style="color: red; font-size: 15px;margin-left:200px">
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
    signUp() {
      //verify that passwords match
      if (this.password !== this.passwordVerify) {
        Swal.fire({
          title: "Password does not match.",
          icon: "warning",
        });
      } else {
        this.$router.push({ name: "CreateProfile" });
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
.Title {
  float: left;
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
  border: transparent;
  background: rgb(240, 236, 236);
}

.container {
  background: rgb(255, 255, 255);
  border-radius: 20px;
  width: fit-content;

  margin-top: 100px;
}
</style>