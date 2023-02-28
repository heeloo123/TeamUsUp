<template>
  <div style="display: flex; text-align: -webkit-center">
    <div class="background">
      <div class="container">
        <h1 style="font-size: 50px; padding-top: 20px">
          Forgot Your Password?
        </h1>
        <div class="text">
          <p>
            To recover your account, please enter your email address. The system
            will send a recovery link to your email shortly. You can click on
            the link to recover your account. For locked account, please contact
            the administrator at
            <a href="mailto:admin1234@gmail.com">admin1234@gmail.com</a>.
          </p>
        </div>

        <form @submit.prevent="submitEmail" class="email">
          <input
            type="email"
            id="email"
            placeholder="Enter your email.."
            v-model="email"
            required
          />

          <div>
            <button class="defaultBtn" type="submit">Submit</button>
          </div>
        </form>
        <router-link to="/login" class style="font-size: 25px; color: black"
          >Return to Login Page</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
const Swal = require("sweetalert2");
export default {
  name: "ForgetPaswordView",

  data() {
    return {
      email: "",
    };
  },
  methods: {
    submitEmail() {
      //need import axios here to check email
      const isEmailValid = this.validateEmail();
      if (isEmailValid) {
        Swal.fire({
          title: "Success!",
          text: "An email has been sent to your address. Please check your inbox and follow the instructions to reset your password.",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Please enter a valid email address.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    },

    validateEmail() {
      // Regular expression to validate email has following pattern 'username@domain.com'
      //the type:email is done for this part,so <<< this need to link to db to check>>>
      const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Return true if the email is valid, otherwise return false
      return emailCheck.test(this.email);
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

.container {
  background: rgb(255, 255, 255);
  border-radius: 20px;
  display: block;
  margin: 20px;
  width: 800px;
  margin-top: 100px;
}

.text {
  font-size: 25px;
  font-family: math;
  margin: 20px;
  text-align: justify;
}

form.email input[type="email"] {
  height: 55px;
  min-width: 520px;
  width: auto;
  font-size: x-large;
  padding-left: 20px;
  float: left;
  margin-left: 20px;
  border-radius: 10px;
  border: transparent;
  background: rgb(243, 236, 236);
}

.F_logo {
  width: 30px;
}
</style>
