<template>
  <!-- this page is able access even not authenticate -->
  <div style="display: flex; text-align: -webkit-center">
    <div class="background">
      <div class="container">
        <div class="item">
          <form class="detail">
            <div class="profile-pic">
              <img :src="profileImageSrc" />
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
                v-for="major in profile.majors"
                :key="major.majorCode"
              >
                {{ major.majorName }}
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
              Recent Project
                <div style="display: flex; margin-bottom: 10px; margin-left: 20px">
                  <div style="width: 200px">Project ID</div>
                  <div style="flex: 1">Project Name</div>
                  <div style="flex: 2">Project Description</div>
                </div>
                <div>
                  <ul
                    v-for="project in projects"
                    :key="project.projectID"
                    style="
                      margin: 10px;
                      background: white;

                      display: flex;
                      width: 1400px;
                      border-radius: 10px;
                      padding: 10px;
                    "
                  >
                    <span style="width: 200px">{{ project.projectID }}</span>
                    <span style="flex: 1">{{ project.projectName }}</span>
                    <span style="flex: 2"
                      ><div style="font-size: 18px">{{ project.descriptor }}</div></span
                    >
                  </ul>
                </div>
                </div>
              </div>
            </div>
          </form>
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
              .get(`http://49.245.48.28:8080/api/project/${project.id.projectID}`)
              .then((response) => {
                this.projects.push(response.data);
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
  margin: 20px;
  width: auto;
  margin: 50px;
}
.detail {
  display: flex;
  padding: 20px;
  text-align: left;
  margin: 20px;
  margin-left: 60px;
}
.item {
  display: inline-table;
}
.Project-container {
  margin: 50px;
  margin-left: -324px;
  background: rgb(234, 231, 231);
  display: block;
  min-width: 1500px;
  width: auto;
  border-radius: 20px;
  padding: 20px;
  font-size: 25px;
}
</style>
