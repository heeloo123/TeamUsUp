<template>
  <div class="header">
    <nav>
      <router-link to="/">
        <img
          class="TeamUsUp_logo"
          alt="TeamUsUp logo"
          src="./assets/TeamUsUp_logo.png"
        />
      </router-link>

      <!--need to import db for search-->
      <form class="SearchBtn" role="search">
        <input
          class="SearchInput"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
      </form>
      <!--when logger in-->
      <div v-if="loggedIn" class="userDropdown">
        <span>{{ currentUser }}</span>
        <div class="dropdownContent">
          <a href="#">Notifications</a>
          <a href="#" @click="logout">Log out</a>
        </div>
      </div>

      <button v-else @click="hideButton" v-show="showButton" class="loginBtn">
        <router-link to="/Login">Login/Register</router-link>
      </button>
    </nav>

    <router-view />
  </div>
</template>


<!--hide the button when nav to login page-->
<script>
export default {
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
    this.showButton =false;
     
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
      }
    },
      loggedIn(){
        this.showbutton=!this.loggedIn;
      }
    },

    immediate: true,
  
};
</script>


<style>
.header {
  display: block;
  background-color: black;
  width: -webkit-fill-available;
  height: 100px;
  margin: -8px;
}

.TeamUsUp_logo {
  width: 400px;
  float: left;
  margin: -15px;
}

.SearchInput {
  width: 300px;
  height: 50px;
  border-radius: 60px;
  font-size: larger;
  text-align: inherit;
}
.SearchBtn {
  text-align: center;
  margin-right: 300px;
}
.loginBtn {
  float: right;
  height: 50px;
  width: 150px;
  background: #e12744;
  border-radius: 40px;
  margin: -55px;
  margin-right: auto;
  font-size: larger;
}

nav {
  padding: 30px;
}

nav a {
  color: #ffffff;
}

nav a.router-link-exact-active {
  color: #feffff;
}

.defaultBtn {
  height: 60px;
  width: 150px;
  background: black;
  border-radius: 40px;
  margin-right: auto;
  color: white;
  font-size: 20px;
  font: bolder;
  margin: 50px;
  position: relative;
  bottom: 50px;
}
</style>
