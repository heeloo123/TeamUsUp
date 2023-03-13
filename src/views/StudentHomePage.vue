<template>
  <div style="display: flex; text-align: -webkit-center">
    <div class="background">
      <h1>Welcome to TeamUsUp portal!</h1>

      <div v-if="showCreateProfile">
        <h2 style="color: darkslategrey">
          Ready to showcase your teamwork skills? Create a new project now and start
          collaborating with others.
        </h2>
        <div style="background:white;margin:30px;padding:20px;border-radius:10px">
        

        <div class="router-container">
          <img class="Tw" alt="Teamwork" src="../assets/teamwork.png" />

          <router-link to="/CreateProject">
            <div class="router">Ready to collaborate? Create your project now.</div>
          </router-link>
        </div>
</div>
      </div>

      <div v-else>
        <h2>
          Start building your teamwork history by creating your profile and project.
        </h2>

        <div class="router-container">
          <router-link to="/CreateProfile">
            <div class="router">Get started by creating your profile today.</div>
          </router-link>

          <router-link to="/CreateProject">
            <div class="router">create project</div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import axios from "axios";
import Swal from "sweetalert2";
import { useAuthStore } from "@/stores/auth";
const API_URL = "http://49.245.48.28:8080/api";

export default {
  name: "HomeView",
  data() {
    return {
      firstName: "",
      lastName: "",
      showCreateProfile: true,
    };
  },
  computed: {
    $state() {
      return useAuthStore();
    },
  },
  async mounted() {
    const auth = useAuthStore();
    if (auth.isAuthenticated) {
      Swal.showLoading();

      const headers = {
        "session-ID": auth.jsessionID,
      };

      try {
        const response = await axios.get(`${API_URL}/profile/userProfile`, { headers });

        if (response === 200) {
          this.showCreafeProfile = true;
        }
      } catch (error) {
        console.error(error);
        this.showCreateProfile = false;
      } finally {
        Swal.close();
      }
    }
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
};
</script>

<style scoped>
.background {
  background: rgb(238, 236, 236);
}
.router-container {
  display: flex;
  margin: 30px;
  justify-content: space-evenly;
}

.router {
  width: 400px;
  height: 500px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  padding: 20px;
  background: rgb(248, 244, 244);
  border-radius: 20px;
}

.router:hover {
  background: rgb(244, 240, 240);
}
</style>
