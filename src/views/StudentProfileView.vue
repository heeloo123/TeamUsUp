<template>
  <!-- this page is able access even not authenticate -->
  <div style="display: flex; text-align: -webkit-center">
    <div class="background">
      <div class="header">
        <p > <router-link to="/home" style="color:#e12744;text-decoration: none;">
         Dashboard
        </router-link> </p> 
 
        <p >
           / <router-link to="/searchPage">Search </router-link> /
           <button style="border: transparent;" class="buttn" @click="$router.go(-1)"> Previous Page
           </button> /
          {{ profile.firstName }} {{ profile.lastName }}
        </p>
      </div>
      <h1 style="color:grey">User profile</h1>
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
                <span>{{" "}}{{ profile.lastName }} </span>
              </div>
              <p></p>
              <div style="font-size: 20px">Major : <span
                  style="
                  border-radius: 20px;
                  font-size: 20px;
                  padding: 5px;
                  margin-left: 2px;
                  margin-right: 2px;
                  border: transparent;
                  background-color:  rgb(234, 231, 231);
                "
                  v-for="major in profile.majors"
                  :key="major.majorCode"
              >
                {{ major.majorName }}
              </span></div>

              <p></p>

              <div style="font-size: 20px">Biography &dtrif;</div>
              <div
                style="
                  border-radius: 10px;
                  font-size: 20px;
                  padding: 10px;
                  border: transparent;
                  width: -webkit-fill-available;
                  min-height: 50px;
                  height: auto;
                  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
                "
              >
                {{ profile.biography }}
              </div>
            </div>
          </form>
          <h2 style="float: left; font-size: 18px; margin-top: -20px; margin-left: 30px"
            >Recent Project &dtrif;</h2
          >
          <br>
          <div class="Project-container" >
            <div style="width: -webkit-fill-available;">
              <div style="display: flex; width: -webkit-fill-available;border-bottom: solid 3px darkgrey;">
                <div style="flex: 1">Project Name</div>
                <div style="flex: 2.9">Project Description</div>
              </div>
              <div class="Pc">
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
                    border-bottom: solid 3px lightgrey;
                    
                  "
                >
                  <span style="flex: 1">{{ project.projectName }}</span>
                  <span style="flex: 3">{{ project.projectDescription }}</span>
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
        `${process.env.VUE_APP_API_URL}/profile/viewProfile/${this.$route.params.reference}`
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
                `${process.env.VUE_APP_API_URL}/project/${project.id.projectID}`
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
      const baseUrl = process.env.VUE_APP_API_URL;
      const imagePath = `/profile/image/${this.profile.profileID}`;
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
  background-color: rgb(246, 244, 244);
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  display: flex;
  width: -webkit-fill-available;
  border-radius: 20px;
  padding: 20px;
  font-size: 20px;
  text-align: left;
}

.Pc :hover{
 background: rgb(203, 202, 202);
}
.buttn:hover{
  background: rgb(203, 201, 201);
 }
</style>
