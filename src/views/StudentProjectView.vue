<template>
  <div>
    <div class="project-pic">
              <img :src="profileImageSrc" alt="Project img" />
            </div>
    <h1>Project name: {{ project.projectName }}</h1>
    <p>description: {{ project.projectDescription }}</p>

    <div v-for="(role, name) in project.nameRoleMap" :key="name">

        <div class="profileImg">
                    <img :src="role.profileImage" alt="profile picture" />
                </div>
      <div
        style="
          border-radius: 20px;
          display: flex;
          background: rgb(234, 231, 231);
          border: transparent;
          margin: 20px;
        "
      >
        <div class="name-role">
          <label>
            Name: <span>{{ name }}</span></label
          >
          <label
            >Role:<span>{{ role.projectRole }}</span></label
          >
        </div>
      </div>

      <div v-for="(evaluation, index) in evaluations" :key="index">
        <p>
          Teamwork:
          {{
            teamworkSums[evaluation.id.evaluateeID] /
            evaluateeIDs[evaluation.id.evaluateeID]
          }}
        </p>
        <p>
          Skill :
          {{
            skillSums[evaluation.id.evaluateeID] / evaluateeIDs[evaluation.id.evaluateeID]
          }}
        </p>
        <p>
          Communication :
          {{
            communicationSums[evaluation.id.evaluateeID] /
            evaluateeIDs[evaluation.id.evaluateeID]
          }}
        </p>
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
      .get(`http://49.245.48.28:8080/api/project/proj6`)
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
};
</script>
