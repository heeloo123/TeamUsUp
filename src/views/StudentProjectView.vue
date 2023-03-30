<template>
  <div style="display: flex; text-align: -webkit-center">
    <div class="background">
      <div class="header">
        <p > <router-link to="/home" style="color:#e12744;text-decoration: none;">
         Dashboard
        </router-link> </p> 
        <p>
         / <router-link to="/searchPage">Search </router-link> / <button style="border: transparent;" class="buttn" @click="$router.go(-1)"> Previous Page
           </button> /
          {{ project.projectID }} {{ project.projectName }}
        </p>
      </div>
      <h1 style="color:grey">Project : {{ project.projectName }}</h1>
      <div class="container">
        <div class="item">
          <form class="detail">
            <div class="project-pic">
              <img :src="projectImageSrc" alt="Project img" />
            </div>
            <p></p>
            <div class="text">
              <span style="font-size: 18px">Project name :</span>
              <label> {{ project.projectName }}</label>

              <div style="margin-top: 10px">
                <span style="font-size: 18px">Project description &dtrif;</span> 
                <p>
                  {{ project.projectDescription }}
                </p>
              </div>
            </div>
          </form>

          
          <h2 style="float: left; font-size: 18px; margin-top: -30px; margin-left: 80px">
            Project members &dtrif;
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
              <div class="ho" @mouseenter="role.hover = true" @mouseleave="role.hover = false">
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
                  

                  </div>
                <div class="comments">
                  <ul v-if="role.hover">Comments <br>
                    <li v-for="comment in comments(role)" :key="comment">{{ comment }}</li>
                  </ul>
                </div>



                <div
                  class="skillInfo"
                  style="
                     margin-top: 20px;
    font-size: 15px;
    flex: 1;
    display: inline;
    text-align: left;
                    "
                  v-if="evaluateeIDs[role.id.profileID]"
                >
                  <p>
                    Teamwork :
                  <label> {{
                      Math.round(
                        (teamworkSums[role.id.profileID] /
                          evaluateeIDs[role.id.profileID]) *
                          100
                      ) / 100
                    }}
               </label>    </p>
                  <p>
                    Skill :
                    <label>   {{
                      Math.round(
                        (skillSums[role.id.profileID] / evaluateeIDs[role.id.profileID]) *
                          100
                      ) / 100
                    }}
                </label>   </p>
                  <p>
                    Communication :
                  <label>      {{
                      Math.round(
                        (communicationSums[role.id.profileID] /
                          evaluateeIDs[role.id.profileID]) *
                          100
                      ) / 100
                    }}
                </label>   </p>
                
               </div>
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
      .get(`${process.env.VUE_APP_API_URL}/project/${this.$route.params.reference}`)
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
      const baseUrl = process.env.VUE_APP_API_URL;
      const imagePath = `/project/image/${this.project.projectID}`;
      return baseUrl + imagePath;
    },

  },
  methods:{
    comments(role){
      const computedComments = [];
      for(var i = 0; i< this.project.evaluations.length; i++){
        if (this.project.evaluations[i].id.evaluateeID == role.id.profileID &&this.project.evaluations[i].comments != null){
          computedComments.push(this.project.evaluations[i].comments);
        }
      }
      return computedComments;
    }
  }
};
</script>

<style scoped>

.container {
  background: rgb(255, 255, 255);
  border-radius: 20px;
  display: flex;
  margin: 10px;
  
  width: 1200px;
}

.item {
  width: -webkit-fill-available;
}

.detail {
  
  padding: 20px;
  text-align: left;
  display: inline-flex
}

.project-pic {
  background: rgb(234, 231, 231);
  width: 150px;
  height: 150px;
  border-radius: 20px;
  margin-top: 30px;
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
  padding: 20px;
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
  color: black;
}


.skillInfo{
  text-align: left;
  flex: 1;
  padding-left: 5px;
    
}
.ho {
  border-radius: 20px;
  display: flex;
  background: rgb(244, 242, 242);
  border: transparent;
  margin: 20px;
  color: black;
  width:1000px;
  max-height: 15vh;
  height: 15vh;
}

.ho:hover {
  background: rgb(206, 200, 200);
}
ul{
  list-style-type: none;
  justify-self: start;
  padding: 2px;
  margin: 0;
  text-align: left;
  font-weight: bold;
  overflow-y: scroll;
}
::-webkit-scrollbar{
  width: 10px;
}
::-webkit-scrollbar-button:increment{

}
li{
  text-align: left;
  border-bottom: 1px grey solid;
  font-weight: 100;
  padding: 5px;
}
.buttn:hover{
  background: rgb(203, 201, 201);
 }
.comments{
  padding-top: 20px;
  flex: 1;
  max-height: 100%;
  overflow-y: scroll;

}
::-webkit-scrollbar-thumb{
  background: gray;

}
</style>
