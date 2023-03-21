<template>
  <div style="display: flex; text-align: -webkit-center">
    <div class="background">
      <div class="header">
        <label><img src="../assets/icons8-user-32.png" /></label>
        <p>
          Student Info | <router-link to="/Profile">Profile</router-link> |Recent Project
        </p>
        <p><router-link to="/CreateProject" class="Rp">Create project</router-link></p>
      </div>
      
      <div class="container">
        <div class="item">
          <div class="Project-container">
            <div>
              <div
                style="
                  display: flex;
                  margin-bottom: 10px;
                  margin: 10px;
                  padding:15px;
                  background:lightgrey
                "
              >
                <div style="width: 190px">Project ID</div>
                <div style="flex: 1">Project Name</div>
                <div style="flex: 2.2">Project Description</div>
              </div>

              <div>
                <router-link
                  v-for="project in projects"
                  :key="project.projectID"
                  :to="{
                    name: 'Project',
                    params: { reference: project.reference },
                  }"
                  class="proD"
                  style="
                    margin: 15px;
                    text-decoration: none;
                    display: flex;
                    width: auto;
                    padding: 5px;
                    color: black;
                    
                  "
                >
                  <span style="width: 190px">{{ project.reference }}</span>
                  <span style="flex: 1">{{ project.header }}</span>
                  <span style="flex: 2"
                    ><div>
                      {{ project.descriptor }}
                    </div></span
                  >
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import Swal from "sweetalert2";

const API_URL = "http://49.245.48.28:8080/api";

export default {
  name: "ownProject",
  props: ["profileID"],
  data() {
    return {
      profile: {},
      projects: [],
      majors: [],
    };
  },

  mounted() {
    const auth = useAuthStore();
    if (auth.isAuthenticated) {
      Swal.showLoading();

      const headers = {
        "session-ID": auth.jsessionID,
      };

      axios
        .get(`${API_URL}/profile/userProfile`, { headers })
        .then((response) => {
          console.log(response.data);
          console.log("project", response.data.projects);
          this.profile = response.data;
          this.majors = response.data.majors;

          this.projects = response.data.projects.map((project) => {
            console.log(project.reference);
            axios
              .get(`${API_URL}/project/` + project.reference, { headers })

              .catch((error) => {
                console.error(error);
              });
            return project;
          });
          this.projects.sort((a, b) => {
          // Extract the project numbers from the projectID strings
          const aNum = parseInt(a.reference.slice(4));
          const bNum = parseInt(b.reference.slice(4));

          // Compare the project numbers as strings
          if (aNum < bNum) {
            return -1;
          } else if (aNum > bNum) {
            return 1;
          } else {
            return 0;
          }
        });
        
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          Swal.close()
        });
    }
  },
  computed: {
    profileImageSrc() {
      const baseUrl = "http://49.245.48.28:8080";
      const imagePath = `/profile/image/${this.profile.profileID}`;
      return baseUrl + imagePath;
    },
  },
  methods: {
    setDefaultImage(event) {
      event.target.src = require("../assets/icons8-user-64.png");
    },
  },
};
</script>

<style scoped>

.Rp {
  margin-left: 950px;
  background: rgb(196, 193, 193);
  padding: 10px;
  color: black;
  text-decoration: none;
  border-radius: 5px;
}
.Rp:hover {
  background: white;
}
.container {
  background: white;
  display: flex;
  margin: 30px;
  width: auto;
  
}

.item {
  display: inline;
  width: -webkit-fill-available;
}

.Project-container {
  margin-top: 20px;
  text-align: left;
  display: inline;
  width: auto;
  font-size: 15px;
}
.proD {
  border-bottom: solid 1px grey;
  
}
.proD:hover{
  background:rgb(208, 201, 201)
}
</style>
