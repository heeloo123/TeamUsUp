<template>
  <div class="container">
    <nav>
      <div style="display: inline-flex">
        <router-link to="/">
          <img
            class="TeamUsUp_logo"
            alt="TeamUsUp logo"
            src="../assets/TeamUsUp_logo.png"
          />
        </router-link>

        <router-link to="/">
          <img
            style="width: 40px; margin-top: 10px"
            alt="TeamUsUp logo"
            src="../assets/homepageIcon.png"
          />
        </router-link>

        <!--need to import db for search-->
        <div style="display: block; margin-top: 10px; margin-left: 200px">
          <input
            class="SearchInput"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </div>
      </div>
      <!-- v-else-if="$route.path !== '/login'" -->
      <label style="float:right">
        <button @click="hideButton" v-show="showButton" class="loginBtn">
          <router-link class="link" to="/Login">Login</router-link>
        </button>
     
   </label >
      <!--when logger in-->
      <label v-if="loggedIn" class="userDropdown">
        {{ currentUser }}

        <DropDown />
      </label>
   
    </nav>
  </div>

  <router-view />
</template>

<script>
import DropDown from "../components/DropDown.vue";
export default {
  name: "NavView",
  components: {
    DropDown,
  },
  data() {
    return {
      showButton: true,
      loggedIn: false,
      currentUser: null,
    };
  },
  methods: {
    hideButton() {
      this.showButton = false;
    },
  },
  showLogin() {
    this.hideButton();
    this.showButton = false;

    // logic to show login modal
  },
  logout() {
    // logic to log out the user
    this.loggedIn = false;
    this.currentUser = null;
    this.showButton = true;
  },
  watch: {
    $route() {
      if (this.$route.path === "/") {
        this.showButton = !this.loggedIn;
      } else if (this.$route.path === "/login") {
        this.showButton = false;
      } else {
        this.showButton = !this.loggedIn;
      }
    },
    loggedIn() {
      if (this.$route.path === "/login") {
        this.showButton = false;
      } else {
        this.showbutton = !this.loggedIn;
      }
    },
  },

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
  float:right;
  margin-right:60px
}
.loginBtn {
  background: #e12744;
  border-radius: 10px;
  font-size: 25px;
  font-family: -webkit-body;
  margin: 10px;
}
</style>
