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
      <label style="float: left; margin-left: 20px">
        <router-link to="/">
          <img alt="TeamUsUp logo" src="./assets/homepageIcon.png" />
        </router-link>
      </label>

      <div style="display: inline-block">
        <!--need to import db for search-->
        <label class="SearchBtn" role="search">
          <input
            class="SearchInput"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </label>
      </div>
      <!--when logger in-->
      <div v-if="loggedIn" class="userDropdown">
        <span>{{ currentUser }}</span>
        <div class="dropdownContent">
          <a href="#">Notifications</a>
          <a href="#" @click="logout">Log out</a>
        </div>
      </div>

      <button v-else @click="hideButton" v-show="showButton" class="loginBtn">
        <router-link class="link" to="/Login">Login</router-link>
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
      }
    },
    loggedIn() {
      this.showbutton = !this.loggedIn;
    },
  },

  immediate: true,
};
</script>


<style>
.header {
  background-color: black;
  margin: -10px;
  height: 100px;
}

.TeamUsUp_logo {
  width: 300px;
  float: left;
  margin: -5px;
  border-radius: 6px;
}

.SearchInput {
  width: auto;
  height: 50px;
  border-radius: 40px;
  font-size: 25px;
  text-align: center;
  min-width: 400px;
}
.SearchBtn {
  float: center;
}
.loginBtn {
  float: right;
  background: #e12744;
  border-radius: 10px;
  font-size: 30px;
  font-family: -webkit-body;
}

nav {
  padding: 30px;
  text-align: center;
}

nav a {
  color: #ffffff;
}

nav a.router-link-exact-active {
  color: #feffff;
}

.defaultBtn {
  height: 60px;
  min-width: 120px;
  width: auto;
  background: black;
  border-radius: 20px;
  margin-right: auto;
  color: white;
  font-size: 20px;
  font: bolder;
  margin: 50px;
  position: relative;
  bottom: 50px;
}

.link {
  text-decoration: none;
  color: white;
}
</style>
