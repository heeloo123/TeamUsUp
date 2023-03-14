<template>
  <div style="display: flex; text-align: -webkit-center">
    <div class="background">
      <div class="container">
        <div class="item">
          <!---->
          <div class="detail">
            <div class="project-pic">
              <img :src="projectImageSrc" alt="Project img" />
            </div>
            <p></p>

            <div class="text" style="display: block; margin-left: 20px">
              <span style="font-size: 30px">Project name: </span>
              <label>{{ project.projectName }}</label>
              <span style="float: right">
                <label>
                  <RouterLink
                    :to="{
                      name: 'SelfEva',
                      params: {
                        reference: $route.params.reference,
                        
                      },
                    }"
                  >
                    self evaluation
                  </RouterLink>
                </label>
                <label>
                  <button @click.prevent="showUserList">Peer Evaluation</button>
                </label>
              </span>

              <div style="margin-top: 50px">
                <div style="font-size: 30px">Project description:</div>
                <p>{{ project.projectDescription }}</p>
              </div>
            </div>
          </div>

          <h2 style="margin-left: -1300px; font-size: 40px; margin-top: -20px">
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
                    Name: <span>{{ name }}</span></label
                  >
                  <label
                    >Role:<span>{{ role.projectRole }}</span></label
                  >
                </div>

                <div
                  style="
                    margin-left: 600px;
                    margin-top: 20px;
                    font-size: 20px;
                    display: inline-grid;
                  "
                  v-if="evaluateeIDs[role.id.profileID]"
                >
                  <p>
                    Teamwork:
                    {{
                      teamworkSums[role.id.profileID] / evaluateeIDs[role.id.profileID]
                    }}
                  </p>
                  <p>
                    Skill :
                    {{ skillSums[role.id.profileID] / evaluateeIDs[role.id.profileID] }}
                  </p>
                  <p>
                    Communication :
                    {{
                      communicationSums[role.id.profileID] /
                      evaluateeIDs[role.id.profileID]
                    }}
                  </p>
                </div>
              </div>
            </RouterLink>
          </div>

          <!---->

          <div style="margin-left: 1500px; display: flex">
            <nav>
              <button class="defaultBtn">
                <router-link
                  :to="{
                    name: 'EditProjectView',
                    params: { reference: $route.params.reference},
                  }"
                >
                  Edit Project</router-link
                >
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
import { useAuthStore } from "@/stores/auth";

const API_URL = "http://49.245.48.28:8080/api";
import Swal from "sweetalert2";

export default {
  name: "ProjectView",
  data() {
    return {
      project: {},
      evaluations: [],
      teamworkSums: {},
      skillSums: {},
      communicationSums: {},
    };
  },
  methods: {
    async showUserList() {
      const options = [];
      const role = []
      for (const [name, user] of Object.entries(this.project.nameRoleMap)) {
        console.log(name);
        console.log(user);
        options.push(name);
        role.push(user);
      }
      console.log("Options : " + options);
      try {
        await new Promise((resolve) => {
          Swal.fire({
            title: "Select a role",
            input: "select",
            inputOptions: options,
            inputLabel: "Role",
            showCancelButton: true,
            cancelButtonText: "Cancel",
            confirmButtonText: "Select",
            preConfirm: (value) => {
              resolve(value);
            },
          });
        }).then((res) => {
          console.log(res)
          const selectedRole = role[res]
          this.$router.push({
            name: "PeerEva",
            params: {
              reference: this.$route.params.reference,
              profileID: selectedRole.id.profileID,
            },
          });
        });

        // If the user clicked "Select", navigate to the PeerEva page with the selected role
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    const auth = useAuthStore();
    if (auth.isAuthenticated) {
      const headers = {
        "session-ID": auth.jsessionID,
      };
      axios
        .get(`${API_URL}/project/${this.$route.params.reference}`, { headers })

        .then((response) => {
          this.project = response.data;
          console.log(response);

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
          console.log(error);
        });
    }
  },
  computed: {
    projectImageSrc() {
      const baseUrl = "http://49.245.48.28:8080";
      const imagePath = `api/project/image/${this.project.projectID}`;
      return baseUrl + imagePath;
    },
  },
};
</script>

<style scoped>
.background {
  background: rgb(207, 205, 205);
  height: 100%;
  width: 100vw;
  margin: -0px;
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
  border-radius: 30px;
  margin-top: 45px;
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
  padding: 10px;
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

.memberlist a {
  text-decoration: none;
  color: black;
}

.memberlist :hover {
  background-color: rgb(225, 225, 230);
  color: rgb(8, 0, 255);
}
</style>
