<template>
  <div style="display: flex; text-align: -webkit-center">
    <div class="background">
      <div class="container">
        <div class="item">
          <form class="detail">
            <div class="profile-pic">
              <img
                class="img"
                :src="profileImageSrc"
                alt="Profile Picture"
                @error="setDefaultImage"
              />
            </div>

            <div style="padding: 15px; margin: 15px">
              <div style="font-size: 40px; margin-top: -10px">
                <span>{{ profile.firstName }} </span>
                <span>{{ profile.lastName }} </span>
              </div>
              <p></p>
              <span style="font-size: 30px">Major: </span>
              <label
                style="
                  border-radius: 20px;
                  font-size: 20px;
                  padding: 10px;
                  border: transparent;
                  background: rgb(234, 229, 229);
                  width: 500px;
                "
                ><span v-for="major in majors" :key="major.majorCode">
                  {{ major.majorName }}
                </span>
              </label>
              <p></p>
              <div style="font-size: 30px">Biography:</div>

              <div
                style="
                  border-radius: 20px;
                  font-size: 20px;
                  padding: 10px;
                  border: transparent;
                  width: 1200px;
                  min-height: 100px;
                  height: auto;
                  background: rgb(234, 229, 229);
                "
              >
                {{ profile.biography }}
              </div>

              <div class="Project-container">
                <div>
                  <span style="margin-bottom: 20px"> Recent Project</span>
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
            </div>
          </form>

          <form style="display: flex; justify-content: space-between;margin-left:-40px;margin-right:30px">
            <button class="defaultBtn" type="submit">Deactivate account</button>
            <button class="defaultBtn">
              <router-link to="/EditProject" class="link"
                >Edit</router-link
              >
            </button>
            
            <button class="defaultBtn">
              <router-link to="/createProject" class="link"
                >Create another project </router-link
              >
            </button>
          </form>
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
  name: "ProfileView",
  props: ["profileID"],
  data() {
    return {
      profile: {},
      projects: [],
      majors: [],
    };
  },

 async mounted() {
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
.background {
  background: rgb(207, 205, 205);
  height: 100%;
  width: 100vw;
  margin: -10px;
  font-family: math;
}

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

.detail {
  display: flex;
  padding: 20px;
  text-align: left;
  margin: 20px;
  margin-left: 60px;
}

.profile-pic {
  background: rgb(234, 231, 231);
  width: 300px;
  height: 300px;
  border-radius: 20px;
}

.Project-container {
  margin: 50px;
  margin-left: -324px;
  background: rgb(234, 231, 231);
  display: inline-flex;
  width: 1500px;
  min-height: 277px;
  height: auto;
  border-radius: 20px;
  padding: 20px;
  font-size: 25px;
}
</style>
