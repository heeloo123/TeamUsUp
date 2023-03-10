<template>
  <div style="display: flex; text-align: -webkit-center">
    <div class="background">
      <div class="container">
        <div class="item">
          
            <form class="detail">
              <div class="profile-pic">
                <img class="img" :src="profile.image" alt="Profile Picture" />
              </div>

              <div style="padding: 15px; margin: 15px">
                <div style="font-size: 40px; margin-top: -10px">
                  <span>{{ profile.firstName }} </span>
                  <span>{{ profile.lastName }} </span>
                </div>
                <p></p>
                <span style="font-size: 30px">Major:</span>
                <label
                  style="
                    border-radius: 20px;
                    font-size: 20px;
                    padding: 10px;
                    border: transparent;
                    background: rgb(234, 229, 229);
                    width: 500px;
                  "
                  >{{ profile.major }}</label
                >
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
                    Recent Project
                    <div v-for="project in projects" :key="project.id">
                      <div
                        style="
                          margin: 20px;
                          background: white;
                          filter: brightness(0.8);
                          display: flex;
                          width: 1400px;
                          border-radius: 20px;
                          padding: 10px;
                        "
                      >
                        <div style="width: 300px">{{ project.name }}</div>
                        <div
                          style="
                            display: flex;
                            width: 800px;
                            padding-left: 10px;
                            min-height: 200px;
                            height: auto;
                            text-align: justify;
                          "
                        >
                          <label
                            >Project description
                            <div style="font-size: 18px">
                              {{ project.description }}
                            </div>
                          </label>
                        </div>
                        <label style="display: block; margin-left: 20px">
                          <p>Skills: {{ project.skillsRating.skills }} of 5</p>
                          <p>Teamwork: {{ project.skillsRating.teamwork }} of 5</p>
                          <p>
                            Communication: {{ project.skillsRating.communication }} of 5
                          </p>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>

            <form style="display: flex; justify-content: space-between">
              <button class="defaultBtn" type="submit">Deactivate account</button>
              <button class="defaultBtn"><router-link to="/createProject" class="link">Create another project here</router-link></button>
            </form>
          
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import Swal from 'sweetalert2';
export default {
  name: "ProfileView",
  props: ["profileID"],
  data() {
    return {
      
      profile: {},
      projects: [],
    };
  },

  mounted() {
    const auth = useAuthStore();
    if (auth.isAuthenticated) {
      this.$nextTick(() => {
      Swal.showLoading();
      auth
        .fetchUserProfile()
        .then((response) => {
          this.profile = response.data;
          this.profile.image = "http://49.245.48.28:8080" + this.profile.image;
          this.fetchProjects();
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          Swal.hideLoading();
        });
      });
    }
  },
  methods: {
    fetchProjects() {
      const auth = useAuthStore();
      const projectId = this.profileID; 

      auth.fetchProject(projectId)
        .then((response) => {
          this.projects = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
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
