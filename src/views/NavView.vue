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

        <router-link to="/home" title="Dashboard">
          <img
            style="width: 30px; margin-top: 10px"
            alt="TeamUsUp logo"
            src="../assets/homepageIcon.png"
          />
        </router-link>

      
        
   <router-link to="/SearchPage" title="Search"> <img
            style="width: 20px; margin-left:20px;margin-top:15px"
            alt="TeamUsUp logo"
            src="../assets/icons8-search-32.png"
          /></router-link>
        
      </div>

      <label style="float: right">
        <router-link to="/help" class="link" title="Get help"><img style="width:20px;margin-right:5px;margin-bottom:-5px" src="../assets/iconHelp/icons8-help-50.png"/>Help</router-link>
        <button
          class="loginBtn"
          v-if="showLoginBtn"
          :disabled="buttonDisabled"
          :key="$state.isAuthenticated"
        >
          <router-link class="link" to="/Login">Login</router-link>
        </button>
      </label>
      <!--when logger in-->
      <!-- <label v-if="auth.isAuthenticated" class="userDropdown"> -->

      <label v-if="showDropDown" class="userDropdown">
        <router-link to="/help" class="link" title="Get help"><img style="width:20px;margin-right:5px;margin-bottom:-5px" src="../assets/iconHelp/icons8-help-50.png"/>Help</router-link>
      
        <label class="image">
          <RouterLink to="/notification" title="Notification"
            ><img src="../assets/notification.png" @mouseover="hoveringNotification = true" @mouseleave = "hoveringNotification = false"
          /></RouterLink>
        </label>
        <label
          style="
            color: white;
            margin: 10px;
            display: inline-block;
            font-family: initial;
            font-size: 18px;
          "
          >{{ $state.user.firstName }} {{ $state.user.lastName }}</label
        >
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
      notifications:[],
      hoveringNotification:false
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
  watch: {
    "$state.isAuthenticated"(newValue) {
      this.$nextTick(() => {
        console.log("showlogin updated", !newValue);

      });
    },
  },
  methods: {
    logout() {
      this.$state.logout();
      window.location.reload();
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
  width: 150px;
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

.image img {
  width: 20px;
  margin-bottom: -3px;
  margin-right: 5px;
}
.loginBtn {
  background: #e12744;
  border-radius: 10px;
  font-size: 20px;
  font-family: -webkit-body;
  margin: 10px;
}
NotificationDropDown{
  float: right;
  margin-right: 80px;
  width: 20%;
  height: 20%;
}

</style>
