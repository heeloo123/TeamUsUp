<template>
  <div class="profile-container">
   <!-- <div v-if="loading">Loading profile...</div>

    <div v-else></div>-->
      <div class="profile-pic">
        <img class="img" :src="profile.image" alt="Profile Picture" />
      </div>
      <div class="contain">
        <h2>{{ profile.firstName }} {{ profile.lastName }}</h2>
        <div>
          Major:
          <div class="major">{{ profile.major }}</div>
        </div>
        <div>
          Biography:
          <div class="bio">{{ profile.biography }}</div>
        </div>

        <div class="Project-container">Projects :</div>
        
        <div v-for="project in projects" :key="project.name">{{project.name}}</div>
        <nav>
          <button class="defaultBtn">
            <router-link to="/CreateProject"> Create Project</router-link>
          </button>
        </nav>
      </div>
      <div class="btn_d">
        <button class="defaultBtn">Deactivate account</button>
      </div>
    </div>
  
</template>

<script>
import axios from "axios";

export default {
  name: "ProfileView",
  data() {
    return {
      loading: true,
      profile: {},
      projects: [],
    };
  },
  mounted() {
    axios
      .get("http://49.245.48.28:8080/profile/userProfile", {
        headers: {
          Authorization: "Basic " + btoa("sparklechus@gmail.com:feelseveman"),
        },
        withCredentials: true,
      })
      .then((response) => {
        this.loading = false;
        this.profile = response.data;
        this.profile.image = "http://49.245.48.28:8080" + this.profile.image;
        console.log(response.data);
        this.getProjects();
      })
      .catch((error) => {
        console.error(error);
      });
      
  },
  methods: {
    getProjects() {
      axios
        .get("http://49.245.48.28:8080/project/Proj2", {
          headers: {
            Authorization: "Basic " + btoa("sparklechus@gmail.com:feelseveman"),
          },
          withCredentials: true,
        })
        .then((response) => {
          this.projects = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
<style scoped>
.profile-container {
  display: flex;
  margin: 50px;
  background: rgb(211, 208, 208);
  border-radius: 10px;
}

.profile-pic {
  width: 300px;
  height: 300px;
  margin: 50px;
  background: rgb(234, 231, 231);
  overflow: hidden;
}
.profile-pic img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.contain {
  margin: 10px;
  font-size: xx-large;
}
.Project-container {
  margin: 50px;
  margin-left: -300px;
}

.btn_d {
  display: flex;
  margin-top: 500px;
}

.bio {
  width: 700px;
  height: 100px;
  display: flex;
  background: white;
  font-size: 30px;
  font-family: math;
  border-radius: 15px;
  margin: 20px;
  padding: 20px;
}

.major {
  width: 200px;
  height: 20px;
  display: block;
  background: white;
  font-size: 30px;
  font-family: math;
  border-radius: 15px;
  margin: 20px;
  padding: 20px;
}
</style>