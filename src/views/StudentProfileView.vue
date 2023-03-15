<template>
  <!-- this page is able access even not authenticate -->
  <div style="display: flex; text-align: -webkit-center">
    <div class="background">
      <div class="header">
        <p>
          <router-link to="/searchPage">Search </router-link> | User Profile |
          {{ profile.profileID }} {{ profile.firstName }} {{ profile.lastName }}
        </p>
      </div>
      <div class="container">
        <div class="item">
          <form class="detail">
            <div class="profile-pic">
              <img :src="profileImageSrc" />
            </div>
            <div
              style="padding: 15px; margin: 15px; width: -webkit-fill-available"
            >
              <div style="font-size: 40px; margin-top: -10px">
                <span>{{ profile.firstName }} </span>
                <span>{{ profile.lastName }} </span>
              </div>
              <p></p>
              <span style="font-size: 20px">Major: </span>
              <label
                style="
                  border-radius: 20px;
                  font-size: 20px;
                  padding: 10px;
                  border: transparent;
                "
                v-for="major in profile.majors"
                :key="major.majorCode"
              >
                {{ major.majorName }} <br />
              </label>
              <p></p>

              <div style="font-size: 20px">Biography:</div>
              <div
                style="
                  border-radius: 10px;
                  font-size: 20px;
                  padding: 10px;
                  border: transparent;
                  width: -webkit-fill-available;
                  min-height: 100px;
                  height: auto;
                  background: rgb(234, 229, 229);
                "
              >
                {{ profile.biography }}
              </div>
            </div>
          </form>
          <label style="margin-left: -800px; font-size: 25px"
            >Recent Project</label
          >
          <div class="Project-container">
            <div style="width: -webkit-fill-available">
              <div style="display: flex; width: -webkit-fill-available">
                <div style="width: 200px">Project ID</div>
                <div style="flex: 1">Project Name</div>
                <div style="flex: 2.2">Project Description</div>
              </div>
              <div>
                <router-link
                  v-for="project in projects"
                  :key="project.projectID"
                  :to="{
                    name: 'StudentProject',
                    params: { reference: project.projectID },
                  }"
                  class="proD"
                  style="
                    margin: 15px;
                    text-decoration: none;
                    display: flex;
                    width: auto;
                    padding: 5px;
                    color: black;
                    background: white;
                  "
                >
                  <span style="width: 200px">{{ project.projectID }}</span>
                  <span style="flex: 1">{{ project.projectName }}</span>
                  <span style="flex: 2">{{ project.projectDescription }}</span>
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

export default {
  data() {
    return {
      responseData: null,
      status: null,
      showLogin: true,
      profile: {},
      projectsParticipated: [],
      projects: [],
    };
  },
  mounted() {
    axios
      .get(
        `http://49.245.48.28:8080/api/profile/viewProfile/${this.$route.params.reference}`
      )
      .then((response) => {
        this.responseData = response.data;
        this.status = response.status;
        console.log(response.data);
      })
      .catch((error) => {
        console.log("Error response:", error.response);
        if (error.response.status === 302) {
          const redirectUrl = error.response.data.redirectUrl;
          this.profile = error.response.data;
          this.projectsParticipated = error.response.data.projectsParticipated;
          this.projectsParticipated.forEach((project) => {
            axios
              .get(
                `http://49.245.48.28:8080/api/project/${project.id.projectID}`
              )
              .then((response) => {
                this.projects.push(response.data);
                console.log(this.projects);
              })

              .catch((error) => {
                console.log("Error response 3:", error.response);
                console.error(error);
              });
          });

          console.log("Redirecting to:", redirectUrl);
        } else {
          console.error(error);
        }
      });
  },
  computed: {
    profileImageSrc() {
      const baseUrl = "http://49.245.48.28:8080";
      const imagePath = `/api/profile/image/${this.profile.profileID}`;
      return baseUrl + imagePath;
    },
  },
};
</script>

<style scoped>
.container {
  background: rgb(255, 255, 255);
  border-radius: 20px;
  display: flex;
  width: -webkit-fill-available;
  margin: 20px;
}
.detail {
  display: flex;
  padding: 10px;
  text-align: left;
}
.item {
  display: inline;
  width: -webkit-fill-available;
}
.Project-container {
  margin: 10px;
  background: rgb(234, 231, 231);
  display: flex;
  width: -webkit-fill-available;
  border-radius: 20px;
  padding: 20px;
  font-size: 20px;
  text-align: left;
}
</style>
