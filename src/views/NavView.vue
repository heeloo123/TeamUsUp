<template>
  <div class="container">
    <nav>
      <div style="display: inline-flex">
        <router-link to="/">
          <img class="TeamUsUp_logo" alt="TeamUsUp logo" src="../assets/TeamUsUp_logo.png" />
        </router-link>

        <router-link to="/">
          <img style="width: 40px; margin-top: 10px" alt="TeamUsUp logo" src="../assets/homepageIcon.png" />
        </router-link>

        <!--need to import db for search-->
        <div style="display: block; margin-top: 10px; margin-left: 200px">
          <input class="SearchInput" type="search" placeholder="Search" aria-label="Search" />
        </div>
      </div>

      <label style="float: right">
        <button class="loginBtn" v-if="showLoginBtn" :disabled="buttonDisabled">
          <router-link class="link" to="/Login">Login</router-link>
        </button>
      </label>
      <!--when logger in-->
      <!-- <label v-if="auth.isAuthenticated" class="userDropdown"> -->

      <label v-if="showDropDown" class="userDropdown">
      <label class="image">
      <RouterLink to="/notification"><img src="../assets/notification.png"/></RouterLink>
        </label>
        <label style="
              color: white;
              margin: 10px;
              display: inline-block;
              font-family: initial;
              font-size: 20px;
            ">{{ $state.user.firstName }} {{ $state.user.lastName }}</label>
        <DropDown />
      </label>
    </nav>
  </div>

  <router-view />
</template>

<script>
import DropDown from "../components/DropDown.vue";
import { useAuthStore } from "@/stores/auth";
export default {
  name: "NavView",
  components: {
    DropDown,
  },
  data() {
    return {
      firstName: "",
      lastName: "",
    };
  },
  computed: {
    $state() {
      return useAuthStore();
    },
    showLoginBtn() {
      console.log("showlogin", !this.$state.isAuthenticated);
      return this.$route.path !== "/Login" && !this.$state.isAuthenticated;
    },
    showDropDown() {
      console.log("showdropdown", this.$state.isAuthenticated);
      return this.$state.isAuthenticated;
    },
    buttonDisabled() {
      return this.$state.isAuthenticated;
    },
  },

  // data() {
  //   return {
  //     buttonDisabled:false,
  //     user:"",

  //   };

  // },
  // computed: {
  //   // auth() {
  //   //   return useAuthStore();
  //   // },
  //   showLoginBtn(){
  //     return this.$route.path !=="/Login" && this.user ==null;

  //   },
  //   showDropDown(){
  //     return this.user !=null;

  //   },
  // },
  //************************ */
  // watch: {
  //   $route() {
  //     if (this.$route.path === "/") {
  //       this.showButton = !this.auth.isAuthenticated;
  //     } else if (this.$route.path === "/login") {
  //       this.showButton = false;
  //     } else {
  //       this.showButton = !this.auth.isAuthenticated;
  //     }
  //   },
  // "auth.isAuthenticated"() {
  //   if (this.$route.path === "/login") {
  //     this.showButton = false;
  //   } else {
  //     this.showButton = !this.auth.isAuthenticated;
  //   }
  //  console.log("message");
  // },
  // },
  //*************** */
  // mounted() {
  //   let user = localStorage.getItem("user-info");

  //   if (user) {
  //     this.user = JSON.parse(user);
  //     this.firstName = JSON.parse(user).firstName;
  //     this.lastName = JSON.parse(user).lastName;
  //     console.log(this.firstName, this.lastName);
  //   }
  // },
  immediate: true,
};
</script>
<style scoped>
.container {
  background: black;
  margin-top: -10px;
  margin-left: -10px;
  margin-right: -10px;
  width: -webkit-fill-available;
}

.TeamUsUp_logo {
  width: 180px;
  margin: 10px;
  border-radius: 6px;
}

.SearchInput {
  border-radius: 40px;
  font-size: 20px;
  text-align: center;
  min-width: 400px;
}

.userDropdown {
  float: right;
  margin-right: 80px;
}

.image img{
  width:25px;
   margin-bottom:-8px;
   margin-right: 5px

  
}
.loginBtn {
  background: #e12744;
  border-radius: 10px;
  font-size: 25px;
  font-family: -webkit-body;
  margin: 10px;
}
</style>
