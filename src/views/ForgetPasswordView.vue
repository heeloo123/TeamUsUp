<template>
  <div style="display: flex; text-align: -webkit-center">
    <div class="background">
      <div class="container">
        <h1 style="font-size: 35px; padding-top: 20px">Forgot Your Password?</h1>
        <div class="text">
          <p style="font-size: 22px">
            For <span style="text-decoration-line: underline">locked account</span>,
            please contact the administrator at
            <a href="mailto:admin1234@gmail.com" style="text-decoration: none"
              >admin1234@gmail.com</a
            >.
          </p>
          <p>
            Enter the email address associated with your account.We will email you a link
            to reset your password.
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
            <button class="defaultBtn" type="submit" style="margin-top:5px">Submit</button>
          </div>
        </form>
        <router-link to="/login" class style="font-size: 20px; color: black"
          >Return to Login Page</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const Swal = require("sweetalert2");
const API_URL = process.env.VUE_APP_API_URL;

export default {
  name: "ForgetPaswordView",

  data() {
    return {
      email: "",
    };
  },
  methods: {
    async submitEmail(user) {
      //need import axios here to check email
      try {
        let result = await axios.post(
          API_URL + "/login",
          {},
          {
            headers: {
              Authorization: "Basic " + btoa(user.email),
            },
            withCredentials: true,
          }
        );
        if (result.status === 202 || result.status === 200) {
          Swal.fire({
            title: "Success!",
            text:
              "Email sent! Please check your inbox and follow the instructions to reset your password.",
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
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>


.container {
  background: rgb(255, 255, 255);
  border-radius: 20px;
  display: block;
  margin: 20px;
  width: 800px;
  margin-top: 100px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}

.text {
  font-size: 20px;
  font-family: math;
  margin: 20px;
  text-align: justify;
  color: rgb(98, 97, 97);
}

form.email input[type="email"] {
  height: 50px;
  min-width: 520px;
  width: auto;
  font-size: 20px;
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
