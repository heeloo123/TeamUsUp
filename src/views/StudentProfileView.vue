<template>
<!-- this page is able access even not authenticate -->
  <div>
    {{ profile.profileID }}
    {{ profile.firstName }}{{ profile.lastName }}
    {{ profile.biography }}
    <img :src="profileImageSrc">
    <ul>
      <li v-for="major in profile.majors" :key="major.majorCode">{{ major.majorName }}</li>
    </ul>
    <ul>
      <li v-for="project in projects" :key="project.projectID">
       {{ project.projectID }} {{ project.projectName }}
      </li>
    </ul>
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
      profile:{},
      projectsParticipated: [],
      projects: [],
      
      
    };
  },
  mounted() {
    axios
      .get(`http://49.245.48.28:8080/api/profile/viewProfile/${this.$route.params.reference}`)
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
    }
 
},
}
</script>
