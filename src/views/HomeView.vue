<template>
  <div style="display: flex; text-align: -webkit-center">
    <div class="background">
      <!---->
      <div>
     
 
        <router-link to="/AdminPage"> admin page</router-link>|
        <router-link to="/notification">notification page</router-link>|
        <router-link to="/test">test</router-link>|
       
      </div>

      <form style="display: inline-flex; text-align: -webkit-center; margin: 50px">
        <div style="width: 500px; height: 500px">
          <img class="T_logo" alt="TeamUsUp logo" src="../assets/Portal_logo.jpg" />
          <div>
            <img class="H_logo" alt="portal logo" src="../assets/Home_logo.png" />
          </div>
        </div>

        <form style="display: inline-grid">
          <div>
            <section class="text">
              <h1 style="font-size: 35px">Description</h1>

              <p>
                Welcome to TeamUsUp V2.0, the innovative web portal designed to empower
                students to build their teamwork history and credentials for their future
                professional life.
              </p>

              <p>
                TeamUsUp provides a unique opportunity for students to create their bio,
                review their peers' teamwork skills, and self-evaluate their abilities as
                team workers. By using this portal, you can build a verified teamwork
                history with multiple individuals, which can be beneficial in a recruiting
                scenario.
              </p>
              <p>
                So, what are you waiting for? Join the TeamUsUp community today and start
                building your teamwork history.
              </p>
            </section>
          </div>
          <nav>
            <button class="SignUpButton" v-if="showSignUp" :disabled="buttonDisabled">
              <router-link class="link" to="/SignUp">Sign-Up Now</router-link>
            </button>
          </nav>
        </form>
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import { useAuthStore } from "@/stores/auth";
export default {
  name: "HomeView",

  computed: {
    $state() {
      return useAuthStore();
    },
    showSignUp() {
      console.log("showsignup button", !this.$state.isAuthenticated);
      console.log(this.$state.user);
      return !this.$state.isAuthenticated;
    },

    buttonDisabled() {
      console.log("button disable", this.$state.isAuthenticated);
      return this.$state.isAuthenticated;
    },
  },
  created() {
    this.$forceUpdate;
  },
  watch: {
    $route() {
      // Re-compute the showSignUp computed property when the route changes
      this.$forceUpdate();
    },
  },

  //   "$state.isAuthenticated"(newVal) {
  //   if (!newVal) {
  //     localStorage.removeItem("user-info");
  //   }
  // },

  // data(){
  //   return{
  //   buttonDisabled: false,
  //   user:null
  // }},
  //   mounted() {
  //     let user = localStorage.getItem("user-info");
  //     if (user) {
  //       this.user = JSON.parse(user);
  //     }
  //   },
};
</script>

<style scoped>

.text {
  margin-left: 70px;
  width: 600px;
  text-align: justify;
  margin-top: 40px;
}

.T_logo {
  width: -webkit-fill-available;
}

.H_logo {
  width: -webkit-fill-available;
}

.text p {
  font-size: 18px;
  text-align: justify;
}

.SignUpButton {
  height: 70px;
  width: 170px;
  background: #e12744;
  border-radius: 40px;
  color: white;
  font-size: 25px;
  border: transparent;
  margin-left: 100px;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}
</style>
