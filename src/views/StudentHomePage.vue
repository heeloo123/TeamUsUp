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
         <div >
          <router-link to="/CreateProject" class="link">
            <div class="router">
            <h3>Ready to collaborate? Create your project now.</h3>
            <img class="CP" alt="Create" src="../assets/icons8-create-100.png" />
            </div>
          </router-link>
          <router-link to="/searchPage" class="link">
            <div class="router2">
            <h3>Search user&project</h3>
            <img class="CP" alt="Create" src="../assets/icons8-search-100.png" />
            </div>
          </router-link>

</div>
            <div>
             <router-link to="/Profile" class="link">
            <div class="router1">
            <h3>View your profile here</h3>
            <img class="CP" alt="viewP" src="../assets/icons8-female-profile-100.png" />
            </div>
          </router-link>
          <router-link to="/ownPView " class="link">
            <div class="router2">
            <h3>View your project here</h3>
            <img class="CP" alt="Create" src="../assets/icons8-project-setup-100.png" />

            </div>
          </router-link>
            
            </div>

        </div>
 

</div>
      </div>

      <div v-else>
        <h2>
          Start building your teamwork history by creating your profile.
        </h2>
        <div style="background:white;margin:30px;padding:20px;border-radius:10px">
        <div class="router-container">
          <img class="Tw" alt="Teamwork" src="../assets/teamwork.png" />
          <router-link to="/CreateProfile" class="link">
            <div class="router0">
            <h2>Get started by creating your profile today.</h2>
            <img class="CP1" alt="Createprofile" src="../assets/icons8-add-user-male-100.png" />
            
            </div>
          </router-link>

         
        </div>
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
    } else{
      this.$router.push("/")
    }
  },

  created() {
    this.$forceUpdate;
  },
  watch: {
    $route() {
      
      this.$forceUpdate();
    },
  },
};
</script>

<style scoped>
.background {
  background: rgb(238, 236, 236);
}
.Tw{
  width:600px;
  margin-left:-50px
}
.router-container {
  display: flex;
  margin: 30px;
  justify-content: space-evenly;
}

.router {
  width: 180px;
  height: 150px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  padding: 20px;
  background: rgb(248, 244, 244);
  border-radius: 20px;
  font-size: 13px;
  padding-top: 30px;
  

}
.router0{
  width: 300px;
  height: 350px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  padding: 20px;
  background: rgb(248, 244, 244);
  border-radius: 20px;
  font-size: 15px;
  padding-top: 30px;

  
}

.router1{
  width: 180px;
  height: 150px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  padding: 20px;
  background: rgb(248, 244, 244);
  border-radius: 20px;
  font-size: 15px;
  padding-top: 30px;

  
}
.router2{
  width: 180px;
  height: 150px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  padding: 20px;
  background: rgb(248, 244, 244);
  border-radius: 20px;
  font-size: 15px;
  padding-top: 30px;
  margin-top:20px

  
}
.router:hover {
  background: rgb(236, 232, 232);
}
.router1:hover {
  background: rgb(236, 232, 232);
}
.router2:hover {
  background: rgb(236, 232, 232);
}

.link{
  text-decoration: none;
  color: black;
  
}

.CP{
  width: 110px;
  margin-top:-10px
}

.CP1{
  width: 150px;
  margin-top:20px
}
</style>
