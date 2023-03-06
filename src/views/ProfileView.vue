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
                  <div v-for="project in projects" :key="project.name">
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
            <button class="defaultBtn">Create Project</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProfileView",
  props:['profileID'],
  data() {
    return {
      loading: true,
      profile: {
        firstName: "Jackson",
        lastName: "Wang",
        major: "Computer Science",
        biography:
          "I passion for creativity and loves to bring ideas to life through visual art. I have skilled in various design software, including Adobe Photoshop and Illustrator. I am natural at understanding clients' needs and is always willing to take on new design challenges. ",
        
      },
      projects: [
        {
          
          name: "Personal Expense Tracker",
          description:
            "The Personal Expense Tracker is a simple project designed to help individuals keep track of their daily expenses. ",
            
          skillsRating: {
            skills: 4,
            teamwork: 5,
            communication: 4,
          },
        },
        {
          name: "Project B",
          description:
            "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          skillsRating: {
            skills: 3,
            teamwork: 4,
            communication: 3,
          },
        },
      ],
    };
  },

  mounted() {
    axios
      .get("http://49.245.48.28:8080/profile/userProfile", {
        headers: {
          Authorization: "Basic " + btoa(this.email + ":" + this.password)}
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
          Authorization: "Basic " + btoa(this.email + ":" + this.password)}
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
.background {
  background: rgb(207, 205, 205);
  height: 100;
  width: 100;
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
