<template>
  <div style="display: flex; text-align: -webkit-center">
    <div class="background">
      <div class="container">
        <div class="item">
<span style="font-size:50px; "> Recent Project</span>
              <div class="Project-container">
                <div>
                  
                  <div style="display: flex; margin-bottom: 10px; margin-left: 20px">
                    <div style="width: 200px">Project ID</div>
                    <div style="flex: 1">Project Name</div>
                    <div style="flex: 2">Project Description</div>
                  </div>

                  <div>
                    <router-link
                      v-for="project in projects"
                      :key="project.projectID"
                      :to="{
                        name: 'Project',
                        params: { reference: project.reference },
                      }"
                      style="
                        margin: 10px;
                        background: white;
                        text-decoration: none;
                        display: flex;
                        width: 1400px;
                        border-radius: 10px;
                        padding: 10px;
                        color: black;
                      "
                    >
                      <span style="width: 200px">{{ project.reference }}</span>
                      <span style="flex: 1">{{ project.header }}</span>
                      <span style="flex: 2"
                        ><div style="font-size: 18px">
                          {{ project.descriptor }}
                        </div></span
                      >
                    </router-link>
                  </div>
                </div>
              </div>
           
    

          <div style="display: flex; justify-content: space-between">
            <button class="defaultBtn" type="submit">Deactivate account</button>
            <button class="defaultBtn">
              <router-link to="/createProject" class="link"
                >Create another project here</router-link
              >
            </button>
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
            const projID = project.reference;
            console.log(project.reference);
            axios
              .get(`${API_URL}/api/project/${projID}`, { headers })

              .catch((error) => {
                console.error(error);
              });
            return project;
          });
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          Swal.hideLoading();
        });
    }
  },
  computed: {
    profileImageSrc() {
      const baseUrl = "http://49.245.48.28:8080";
      const imagePath = `/api/profile/image/${this.profile.profileID}`;
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


.container {
  background: rgb(255, 255, 255);
  border-radius: 20px;
  display: flex;
  margin: 20px;
  width: auto;
  margin: 50px;
}

.item {
  display: inline-table;
}


.Project-container {
  margin: 20px;
  
  background: rgb(237, 233, 233);
  display: inline-flex;
  width: 1500px;
  min-height: 277px;
  height: auto;
  border-radius: 20px;
  padding: 20px;
  font-size: 25px;
}
</style>
