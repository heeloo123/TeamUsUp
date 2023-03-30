<template>
  <div style="display: flex; text-align: -webkit-center">
    <div class="background">
      <div class="header">
        <p > <router-link to="/home" style="color:#e12744;text-decoration: none;">
         Dashboard
        </router-link> </p> 
        <p>
         / <router-link to="/ownPView"> Recent Project </router-link> /
          {{ project.projectID }} {{ project.projectName }}
        </p>
      
      </div>
      <!-- <p
        style="font-size: 15px; margin-left: 900px; border: transparent"
        v-if="profile.profileID != project.owner_id"
      >
        Only project owner are able to edit the project
      </p> -->
      <p>
        
        <button class="Rp" @click.prevent="showUserList" title="Self and peer evaluation">Evaluation</button>
        <button class="Rp" > <router-link title="View comment from other members!"
               
                :to="{
                  name: 'CommentPage',
                  params: { reference: $route.params.reference },
                }"
                style="text-decoration: none; color:black"
              > View comment </router-link></button>
      </p>
  <h1 style="color:grey">Project : {{ project.projectName }}</h1>
      <div class="container">
        <div class="item">
          <!---->
          <div class="detail">
            <div class="project-pic">
              <img :src="projectImageSrc" alt="Project img" />
            </div>
            <p></p>
              <div class="text">
                <span style="font-size: 18px">Project name :</span>
                <label>{{ project.projectName }}</label>

                <router-link title="Edit project"
                  v-if="profile.profileID === project.owner_id"
                  :to="{
                    name: 'EditProjectView',
                    params: { reference: $route.params.reference },
                  }"
                  class="E"
                >
                  <img style="width: 30px" src="../assets/icons8-edit-48.png" />
                </router-link>

                <div style="margin-top: 10px">
                  <div style="font-size: 18px">Project description &dtrif;</div>
                  <p>{{ project.projectDescription }}</p>
                </div>
              </div>
            </div>
         

          <h2 style="float: left; font-size: 20px; margin-top: -30px; margin-left: 80px">
            Project members &dtrif;
          </h2>
          <div>
            <div class="memberlist">
              <RouterLink
                :to="{
                  name: 'StudentProfile',
                  params: { reference: role.id.profileID },
                }"
                v-for="(role, name) in project.nameRoleMap"
                :key="name"
              >
                <div class="ho">
                  <div class="profileImg">
                    <img :src="role.profileImage" alt="profile picture" />
                  </div>

                  <div class="name-role">
                    <label>
                      Name :<span>{{ name }}</span></label
                    >
                    <label
                      >Role :<span>{{ role.projectRole }}</span></label
                    >
                    <label style="font-size: 12px" v-if="!role.accepted"
                      >This student has not yet accepted the project participant.</label
                    >
                  </div>

                  <div
                    style="
                     margin-top: 20px;
    font-size: 15px;
    flex: 1;
    display: inline;
    margin-left: 310px;
    text-align: left;
                    "
                    v-if="evaluateeIDs[role.id.profileID]"
                  >
                    <p>
                      Teamwork :
                     <label>  {{
                      Math.round(
                        (teamworkSums[role.id.profileID] /
                          evaluateeIDs[role.id.profileID]) *
                          100
                      ) / 100
                    }}</label>
                    </p>
                    <p>
                      Skill :
                     <label>{{
                      Math.round(
                        (skillSums[role.id.profileID] / evaluateeIDs[role.id.profileID]) *
                          100
                      ) / 100
                    }}
                  </label>   </p>
                    <p>
                      Communication :
                    <label> {{
                      Math.round(
                        (communicationSums[role.id.profileID] /
                          evaluateeIDs[role.id.profileID]) *
                          100
                      ) / 100
                    }}</label> 
                    </p>
                  </div>
                </div>
              </RouterLink>
            </div>
          </div>

          <!---->

         
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useAuthStore } from "@/stores/auth";

const API_URL = process.env.VUE_APP_API_URL;
import Swal from "sweetalert2";

export default {
  name: "ProjectView",
  data() {
    return {
      profile: {},
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
      const role = [];
      for (const [name, user] of Object.entries(this.project.nameRoleMap)) {
        console.log(name);
        console.log(user);
        if(user.id.profileID != this.profile.profileID && !this.evaluations.find((evaluation) => {return evaluation.id.evaluatorID == this.profile.profileID && evaluation.id.evaluateeID == user.id.profileID})){
          options.push(name);
          role.push(user);
        }

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
          console.log(res);
          const selectedRole = role[res];
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

      axios.get(`${API_URL}/profile/userProfile`, { withCredentials:true}).then((response) => {
        console.log(response);
        this.profile = response.data;
      });
      axios
        .get(`${API_URL}/project/${this.$route.params.reference}`, {withCredentials:true })

        .then((response) => {
          this.project = response.data;
          console.log(response);
          console.log("role", response.data.owner_id);

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
      const baseUrl = process.env.VUE_APP_API_URL;
      const imagePath = `/project/image/${this.project.projectID}`;
      return baseUrl + imagePath;
    },
  },
};
</script>

<style scoped>
.background {
  min-height:100vh;
  height: auto
}
.Rp {
  float:right;
  margin-right: 20px;
  background: rgb(196, 193, 193);
  padding: 10px;
  color: black;
  text-decoration: none;
  border-radius: 5px;
  border: transparent;
}
.Rp:hover {
  background: white;
}
.container {
  background: white;
  display: flex;
  margin: 10px;
  width: 1200px;
  border-radius: 5px;
}

.item {
  
  width: -webkit-fill-available;
}

.detail {
  display: inline-flex;
  padding: 20px;
  text-align: left;
 
}

.project-pic {
  background: rgb(234, 231, 231);
  width: 150px;
  height: 150px;
  border-radius: 20px;
  margin-top: 20px;
  overflow: hidden;
  margin-right:30px
}

.project-pic img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profileImg {
  width: 80px;
  height: 80px;
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
  font-size: 18px;
    margin-top: 0px;
    padding: 20px;
    display: inline;
    width: auto;
    
}

.text p {
  display: content;
  min-height: 50px;
  height: auto;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  padding: 30px;
  width: 700px;
}

.text label {
  width:auto;
  height: auto;
  border-radius: 20px;
  padding: 5px;
}

.name-role {
  margin: 30px;
  display: inline-grid;
  font-size: 15px;
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
  text-align:left;
}

.memberlist {
  
}

.memberlist a {
  text-decoration: none;
}

.ho {
  border-radius: 20px;
  display: flex;
  background: rgb(234, 231, 231);
  border: transparent;
  margin: 20px;
  color: black;
  width:1000px
}

.ho:hover {
  background: rgb(206, 200, 200);
}

.Eva {
  border: transparent;
  color: black;
  padding: 10px;
  border-radius: 5px;
}
.E {
  float: right;
}
</style>
