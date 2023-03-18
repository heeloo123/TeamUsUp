<template>
  <div style="display: flex; text-align: -webkit-center">
    <div class="background">
      <div class="header">
        <p>
          <router-link to="/searchPage">Search </router-link> | Project |
          {{ project.projectID }} {{ project.projectName }}
        </p>
      </div>
      <div class="container">
        <div calss="item">
          <form class="detail">
            <div class="project-pic">
              <img :src="projectImageSrc" alt="Project img" />
            </div>
            <p></p>
            <div class="text" style="display: block; margin-left: 20px">
              <span style="font-size: 25px">Project name: </span>
              <label> {{ project.projectName }}</label>

              <div style="margin-top: 10px">
                <div style="font-size: 25px">Project description:</div>
                <p style="width: -webkit-fill-available">
                  {{ project.projectDescription }}
                </p>
              </div>
            </div>
          </form>

          <h2 style="margin-left: -370px; font-size: 30px; margin-top: -30px; overflow: auto;">
            Project members
          </h2>
          <div class="memberlist">
            <RouterLink
              :to="{
                name: 'StudentProfile',
                params: { reference: role.id.profileID },
              }"
              v-for="(role, name) in project.nameRoleMap"
              :key="name"
            >
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
                  <img :src="role.profileImage" alt="profile picture" />
                </div>

                <div class="name-role">
                  <label>
                    Name: <span style="padding-left: 60px">{{ name }}</span></label
                  >

                  <label
                    >Role:<span style="padding-left: 75px">{{
                      role.projectRole
                    }}</span></label
                  >
                  <label>
                    ProfileID :<span style="padding-left: 20px">{{
                      role.id.profileID
                    }}</span>
                  </label>
                </div>
<div style="margin-left: auto; margin-right:50px
">
                <div
                  class="skillInfo"
                  v-if="evaluateeIDs[role.id.profileID]"
                >
                  <p>
                    Teamwork:
                    {{
                      Math.round(
                        (teamworkSums[role.id.profileID] /
                          evaluateeIDs[role.id.profileID]) *
                          100
                      ) / 100
                    }}
                  </p>
                  <p>
                    Skill:
                    {{
                      Math.round(
                        (skillSums[role.id.profileID] / evaluateeIDs[role.id.profileID]) *
                          100
                      ) / 100
                    }}
                  </p>
                  <p>
                    Communication :
                    {{
                      Math.round(
                        (communicationSums[role.id.profileID] /
                          evaluateeIDs[role.id.profileID]) *
                          100
                      ) / 100
                    }}
                  </p>
                </div></div>
              </div>
            </RouterLink>
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
      project: {},
      evaluations: [],
      teamworkSums: {},
      skillSums: {},
      communicationSums: {},
    };
  },
  mounted() {
    axios
      .get(`http://49.245.48.28:8080/api/project/${this.$route.params.reference}`)
      .then((response) => {
        this.project = response.data;
        this.status = response.status;
        console.log(response.data);
        console.log("test1 Eva", response.data.evaluations[0].id.evaluateeID);

        const evaluateeIDs = {};
        const teamworkSums = {};
        const skillSums = {};
        const communicationSums = {};

        response.data.evaluations.forEach((evaluation) => {
          const evaluateeID = evaluation.id.evaluateeID;
          const teamwork = evaluation.teamwork;
          const skill = evaluation.skill;
          const communication = evaluation.communication;

          console.log(
            "Communicate",
            evaluation.communication,
            "Skill",
            evaluation.skill,
            "Teamwork",
            evaluation.teamwork,
            "id",
            evaluation.id.evaluateeID
          );

          if (!evaluateeIDs[evaluateeID]) {
            evaluateeIDs[evaluateeID] = 1;
            teamworkSums[evaluateeID] = teamwork;
            skillSums[evaluateeID] = skill;
            communicationSums[evaluateeID] = communication;
          } else {
            evaluateeIDs[evaluateeID]++;
            teamworkSums[evaluateeID] += teamwork;
            skillSums[evaluateeID] += skill;
            communicationSums[evaluateeID] += communication;
          }
        });
        console.log("evaluateeIDs", evaluateeIDs);
        console.log("teamwork", teamworkSums);
        console.log("skill", skillSums);
        console.log("communication", communicationSums);

        this.evaluations = response.data.evaluations;
        this.teamworkSums = teamworkSums;
        this.skillSums = skillSums;
        this.communicationSums = communicationSums;
        this.evaluateeIDs = evaluateeIDs;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  computed: {
    projectImageSrc() {
      const baseUrl = "http://49.245.48.28:8080";
      const imagePath = `/api/project/image/${this.project.projectID}`;
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
  width: 200px;
  height: 200px;
  border-radius: 30px;
  margin-top: 30px;
  overflow: hidden;
}

.project-pic img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  min-height: 90px;
  height: auto;
  border-radius: 20px;
  padding: 20px;
}

.text label {
  display: content;
  width: 200px;
  height: auto;
  border-radius: 20px;
  padding: 10px;
}

.name-role {
  margin: 30px;
  display: inline;
  font-size: 25px;
  padding: 10px;
  text-align: left;
  color: black;
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

.memberlist a {
  text-decoration: none;
  color: black;
}

.memberlist :hover {
  background-color: rgb(225, 225, 230);
  color: rgb(8, 0, 255);
}
.skillInfo{
  

  font-size: 20px;
  float:right;
  padding: 10px;
  flex:1;
  text-align:left;

}
</style>
