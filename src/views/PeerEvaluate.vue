<template>
  <div style="display: flex; text-align: -webkit-center">
    <div class="background">
      <div class="container">
        <h1 style="margin-left: -900px; padding-top: 30px; font-size: 50px">
          Peer Evaluation
        </h1>
        <div>
          <div class="profile-pic">
            <img class="img" :src="profileImageSrc" alt="Profile Picture" @error="setDefaultImage" />
          </div>
          <div></div>

          <div style="
                display: inline-block;
                font-size: 40px;
                float: left;
                margin-top: 90px;
                text-align: left;
              ">
            <label>{{userProfile.firstName }} {{ userProfile.lastName }}</label>

            <div style="padding: 10px; margin-left: -10px">
              Project name : {{ project.projectName }}
            </div>
            <div v-for="(role) in project.nameRoleMap" :key="role">
             <div v-if="role.id.profileID === profile.profileID">
            <label style="font-size: 35px" >Project role : {{ role.projectRole }}  </label>
          </div></div>
        </div></div>

      


        <!--input area------------------------------->
        <form @submit.prevent="submitEvaluation">
          <div style="display: inline-flex; width: inherit">
            <textarea placeholder="comment.." />
            <div class="rating_form">
  <div style="display: table-row; font-size: 30px">
    <label style="margin-right: 75px">Teamwork</label>
    <div>
      <input type="radio" id="teamwork1" value="1" v-model="teamwork">
      <label for="teamwork1">1</label>
      <input type="radio" id="teamwork2" value="2" v-model="teamwork">
      <label for="teamwork2">2</label>
      <input type="radio" id="teamwork3" value="3" v-model="teamwork">
      <label for="teamwork3">3</label>
      <input type="radio" id="teamwork4" value="4" v-model="teamwork">
      <label for="teamwork4">4</label>
      <input type="radio" id="teamwork5" value="5" v-model="teamwork">
      <label for="teamwork5">5</label>
    </div>
  </div>
  <div style="display: table-row; font-size: 30px">
    <label style="margin-right: 145px">Skills</label>
    <div>
      <input type="radio" id="skills1" value="1" v-model="skills">
      <label for="skills1">1</label>
      <input type="radio" id="skills2" value="2" v-model="skills">
      <label for="skills2">2</label>
      <input type="radio" id="skills3" value="3" v-model="skills">
      <label for="skills3">3</label>
      <input type="radio" id="skills4" value="4" v-model="skills">
      <label for="skills4">4</label>
      <input type="radio" id="skills5" value="5" v-model="skills">
      <label for="skills5">5</label>
    </div>
  </div>
  <div style="display: table-row; font-size: 30px">
    <label style="margin-right: 10px">Communication</label>
    <div>
      <input type="radio" id="communication1" value="1" v-model="communication">
      <label for="communication1">1</label>
      <input type="radio" id="communication2" value="2" v-model="communication">
      <label for="communication2">2</label>
      <input type="radio" id="communication3" value="3" v-model="communication">
      <label for="communication3">3</label>
      <input type="radio" id="communication4" value="4" v-model="communication">
      <label for="communication4">4</label>
      <input type="radio" id="communication5" value="5" v-model="communication">
      <label for="communication5">5</label>
    </div>
  </div>
</div>


          </div>

          <!---End of input area----------------->
          <div style="display: flex; justify-content: space-between; padding: 20px">
            <button class="defaultBtn" @click.prevent="CancelAlert">Cancel</button>
            <button class="defaultBtn" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import Swal from "sweetalert2";
const API_URL = "http://49.245.48.28:8080/api";

export default {
  name: "SelfEva",
  data() {
    return {
      firstName: "",
      lastName: "",
      profile: {},
      userProfile:{},
      evaluateeId: "",
      project: {},
      teamwork: '',
    skills: '',
    communication: ''
    };
  },
  mounted() {
    const auth = useAuthStore();
    if (auth.isAuthenticated) {
      const headers = {
        "session-ID": auth.jsessionID,
      };
      axios
      .get(
        `http://49.245.48.28:8080/api/profile/viewProfile/`+ this.$route.params.profileID,{headers}
      )
        .then((response)=>{
          console.log(response.data);
          this.userProfile = response.data;
          
        })

      axios
        .get(`${API_URL}/profile/userProfile`, { headers })
        .then((response) => {
          console.log(response.data);
          this.profile = response.data;
          this.evaluatorId = response.data.profileID;
          // this.evaluateeId = response.data.profileID;
        })
        .catch((error) => {
          console.error(error);
        });
      axios
        .get(`${API_URL}/project/${this.$route.params.reference}`, { headers })
        .then((response) => {
          console.log(response.data);
          this.project = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    }
  },

  methods: {
    async submitEvaluation() {
      const auth = useAuthStore()   
      if (auth.isAuthenticated) {
        axios.post(
          `http://49.245.48.28:8080/api/evaluation/postEvaluation?projectID=${this.$route.params.reference}&evaluateeID=${this.$route.params.profileID}`,
          {
            comments: this.comment,
            communication: this.communication,
            teamwork: this.teamwork,
            skill: this.skills,
          }, 
          {
            headers: {
              "session-ID": auth.jsessionID != null ? auth.jsessionID : "Placeholder",
            },
          }
        ) .then((response)=>{
          console.log("submit success")
          if(response.status === 201){
            Swal.fire({
                title: "Evaluation sucessfully posted",
                icon: "success",
                confirmButtonText: "OK",
              }).then(() => {
                this.$router.push({ name: "ownPView" });
              });
          }

        })
      }
    },
  },
  computed: {
    profileImageSrc() {
      const baseUrl = "http://49.245.48.28:8080";
      const imagePath = `/api/profile/image/${this.profile.profileID}`;
      return baseUrl + imagePath;
    },
    $state() {
      return useAuthStore();
    },
    


  },


};
</script>

<style scoped>
.profile-pic {
  width: 250px;
  height: 250px;
  margin: 50px;
  background: rgb(234, 231, 231);
  overflow: hidden;
  border-radius: 20px;
  float: left;
  margin-left: 50px;
}

.profile-pic img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.rating_form {
  margin-left: 30px;
  text-align: left;
}

.container {
  background: rgb(255, 255, 255);
  border-radius: 20px;
  display: inline-grid;
  width: 1500px;
  margin-top: 50px;
}

.container textarea {
  width: 900px;
  padding: 10px;
  font-size: 20px;
  border-radius: 10px;
  min-height: 200px;
  height: 100px;
  border: transparent;
  background: rgb(234, 231, 231);
  margin-left: 60px;
}
</style>
