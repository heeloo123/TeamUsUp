<template>
  <div style="display: flex; text-align: -webkit-center">
    <div class="background">
      <div class="container">
        <div class="item">
          <!---->
          <form class="detail">
            <div class="project-pic">
              <img :src="project.projectImage" alt="Project img" />
            </div>
            <p></p>

            <div class="text" style="display: block; margin-left: 20px">
              <span style="font-size: 30px">Project name: </span>
              <label>{{ project.projectName }}</label>
              <div style="margin-top: 50px">
                <div style="font-size: 30px">Project description:</div>
                <p>{{ project.projectDescription }}</p>
              </div>
            </div>
          </form>

          <!-- <div class="member">
            <ul>
              <li v-for="(role, name) in project.nameRoleMap" :key="name">
                {{ name }} - {{ role }}
              </li>
            </ul>
          </div> -->
          <!---->
          <h2 style="margin-left: -1300px; font-size: 40px; margin-top: -20px">
            Project members
          </h2>

          <ul class="memberlist">
            <div v-for="(role, name) in project.nameRoleMap" :key="name">
              <div
                style="
                  border-radius: 20px;
                  display: flex;
                  background: rgb(234, 231, 231);
                  border: transparent;
                  margin: 20px;
                "
              >
                <div class="profileImg">
                  <div
                    v-for="participant in project.projectParticipants"
                    :key="participant.id"
                  >
                    <img :src="participant.profileImage" alt="profile picture" />
                  </div>
                </div>

                <div class="name-role">
                  <label>
                    Name: <span>{{ name }}</span></label
                  >
                  <label
                    >Role:<span>{{ role }}</span></label
                  >
                </div>

                <div
                  style="
                    margin-left: 600px;
                    margin-top: 20px;
                    font-size: 25px;
                    display: inline-grid;
                  "
                >
                  <div class="rating">
                    <label>Teamwork :</label>

                    <div class="star-rating">
                      <span>&star;</span>
                      <span>&star;</span>
                      <span>&star;</span>
                      <span>&star;</span>
                      <span>&star;</span>
                    </div>
                  </div>
                  <div class="rating">
                    <label>Skills:</label>

                    <div class="star-rating">
                      <span>&star;</span>
                      <span>&star;</span>
                      <span>&star;</span>
                      <span>&star;</span>
                      <span>&star;</span>
                    </div>
                  </div>
                  <div class="rating">
                    <label>Communication :</label>
                    <div class="star-rating">
                      <span>&star;</span>
                      <span>&star;</span>
                      <span>&star;</span>
                      <span>&star;</span>
                      <span>&star;</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ul>

          <!---->

          <div style="margin-left: 1500px; display: flex">
            <nav>
              <button class="defaultBtn">
                <router-link to="/EditProject"> Edit Project</router-link>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ProjectView",
  data() {
    return {
      project: {
        projectName: "personal expense tracker",
        projectDescription:
          "The Personal Expense Tracker is a simple project designed to help individuals keep track of their daily expenses.",
        nameRoleMap: {
          Jane: "Project manager",
          John: "Programmer",
        },
      },
    };
  },
  mounted() {
    axios
      .get("http://49.245.48.28:8080/project/Proj6", {
        headers: {
          Authorization: "Basic " + btoa("sparklechus@gmail.com:feelseveman"),
        },
        withCredentials: true,
      })

      .then((response) => {
        this.project = response.data;
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
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

  margin-left: 60px;
}
.project-pic {
  background: rgb(234, 231, 231);
  width: 320px;
  height: 300px;
  border-radius: 20px;
  margin-top: 45px;
}
.profileImg {
  width: 100px;
  height: 100px;
  margin: 20px;
  background: rgb(254, 254, 254);
  overflow: hidden;
  border-radius: 100px;
}
.profileImg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.text {
  font-size: 25px;
  padding: 20px;
}
.text p {
  background: rgb(239, 232, 232);
  display: content;
  width: 1200px;
  min-height: 150px;
  height: auto;
  border-radius: 20px;
  padding: 20px;
}

.text label {
  background: rgb(239, 232, 232);
  display: content;
  width: 200px;
  height: auto;
  border-radius: 20px;
  padding: 20px;
}
.name-role {
  margin: 30px;
  display: inline-grid;
  font-size: 25px;
  padding: 20px;
  max-width: 400px;
  flex: 1;
}
.name-role label {
  display: flex;
  font-weight: bold;
}
.name-role span {
  margin-left: 10px;
}
.memberlist {
  margin-right: 30px;
}
.star-rating {
  margin-left: auto;
  color: gold;
}

.rating {
  display: flex;
}
</style>
