<template>
  <div style="display: flex; text-align: -webkit-center">
    <div class="background">
      <div class="header">
        <label><img src="../assets/icons8-user-32.png" /></label>
        <p>
          Student Info | <router-link to="/ownPView"> Recent Project </router-link> |
          {{ project.projectID }} {{ project.projectName }} | Evaluation
        </p>
      </div>
      <div>
        <p>
          <label style="font-size: 20px">Please noted :</label> Everything that you put
          into this form will be kept strictly confidential by the unit coordinator.
        </p>
      </div>

      <div style="display: inline-flex; text-align: -webkit-auto">
        <div style="">
          <h3>Using this evaluation form scales</h3>
          <p>The scales are from 1 to 5. Assess these as:</p>
          <p>1 = Very poor, or even obstructive, contribution to the project process</p>
          <p>2 = Poor contribution to the project process</p>
          <p>3 = acceptable contribution to the project process</p>
          <p>4 = good contribution to the project process</p>
          <p>5 = excellent contribution to the project process</p>
        </div>
        <div style="margin-left: 90px">
          <h3>The evaluation criteria</h3>
          <p>
            You need to fill in a mark from the scale for each one of 5 performance
            criteria. These are:
          </p>
          <p>
            1. Teamwork : Willingness to work as part of the group and taking
            responsibility in the group.
          </p>
          <p>
            2. Skills : Abilities and knowledge a person possesses to perform a specific
            task or activity effectively.
          </p>
          <p>
            3. Communication : Communication within the group and participation in group
            meetings.
          </p>
        </div>
      </div>
      <div class="container">
        <div class="detail">
          <div class="profile-pic">
            <img class="img" :src="profileImageSrc" alt="Profile Picture" @error="setDefaultImage" />
          </div>
          <div></div>

          <div style="
                display: inline-block;
                font-size: 22px;

                margin-top: 60px;
                text-align: left;
              ">
            <label>Evaluate for : {{ userProfile.firstName }} {{ userProfile.lastName }}</label>

            <div style="padding: 10px; margin-left: -10px">
              Project name : {{ project.projectName }}
            </div>
            <div v-for="role in project.nameRoleMap" :key="role">
              <div v-if="role.id.profileID === profile.profileID">
                <label style="font-size: 22px">Project role : {{ role.projectRole }}
                </label>
              </div>
            </div>
          </div>
        </div>
        <div style="border-top:solid 1px;margin-top:-40px">
          <p></p>
          Below adds a brief description of how you believe you contributed to the project
          process over the whole semester.

          <div>
            On the scale 1 - 5 above, rate your own contribution to the group on each of
            the criteria below:
          </div>
        </div>

        <!--input area------------------------------->
        <div style="margin: 20px">
          <form @submit.prevent="submitEvaluation">
            <div class="evaForm">
              <textarea style="width: -webkit-fill-available;height:100px;padding:10px" placeholder="comment.." />
              <div class="rating_form">
                <div class="rate">
                  <label>Teamwork</label>
                  <div class="score">
                    <input type="radio" id="teamwork1" value="1" v-model="teamwork" />
                    <label for="teamwork1">1</label>
                    <input type="radio" id="teamwork2" value="2" v-model="teamwork" />
                    <label for="teamwork2">2</label>
                    <input type="radio" id="teamwork3" value="3" v-model="teamwork" />
                    <label for="teamwork3">3</label>
                    <input type="radio" id="teamwork4" value="4" v-model="teamwork" />
                    <label for="teamwork4">4</label>
                    <input type="radio" id="teamwork5" value="5" v-model="teamwork" />
                    <label for="teamwork5">5</label>
                  </div>
                </div>
                <div class="rate">
                  <label>Skills</label>
                  <div class="score">
                    <input type="radio" id="skills1" value="1" v-model="skills" />
                    <label for="skills1">1</label>
                    <input type="radio" id="skills2" value="2" v-model="skills" />
                    <label for="skills2">2</label>
                    <input type="radio" id="skills3" value="3" v-model="skills" />
                    <label for="skills3">3</label>
                    <input type="radio" id="skills4" value="4" v-model="skills" />
                    <label for="skills4">4</label>
                    <input type="radio" id="skills5" value="5" v-model="skills" />
                    <label for="skills5">5</label>
                  </div>
                </div>
                <div class="rate">
                  <label>Communication</label>
                  <div class="score">
                    <input type="radio" id="communication1" value="1" v-model="communication" />
                    <label for="communication1">1</label>
                    <input type="radio" id="communication2" value="2" v-model="communication" />
                    <label for="communication2">2</label>
                    <input type="radio" id="communication3" value="3" v-model="communication" />
                    <label for="communication3">3</label>
                    <input type="radio" id="communication4" value="4" v-model="communication" />
                    <label for="communication4">4</label>
                    <input type="radio" id="communication5" value="5" v-model="communication" />
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
      userProfile: {},
      evaluateeId: "",
      project: {},
      teamwork: "",
      skills: "",
      communication: "",
    };
  },
  mounted() {
    const auth = useAuthStore();
    if (auth.isAuthenticated) {

      axios
        .get(
          `http://49.245.48.28:8080/api/profile/viewProfile/` +
          this.$route.params.profileID,
          {withCredentials:true}
        )
        .then((response) => {
          console.log("user", response.data);
        })
        .catch((error) => {
          console.error("1", error);
          if (error.response.status === 302) {
            const redirectUrl = error.response.data.redirectUrl;
            this.userProfile = error.response.data;

            console.log("Redirecting to:", redirectUrl);
          }
        });

      axios
        .get(`${API_URL}/profile/userProfile`, { withCredentials:true })
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
        .get(`${API_URL}/project/${this.$route.params.reference}`, { withCredentials:true })
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
      const auth = useAuthStore();
      if (auth.isAuthenticated) {
        axios
          .post(
            `http://49.245.48.28:8080/api/evaluation/postEvaluation?projectID=${this.$route.params.reference}&evaluateeID=${this.$route.params.profileID}`,
            {
              comments: this.comment,
              communication: this.communication,
              teamwork: this.teamwork,
              skill: this.skills,
            },
            {
              withCredentials:true
            }
          )
          .then((response) => {
            console.log("submit success");
            if (response.status === 201) {
              Swal.fire({
                title: "Evaluation sucessfully posted",
                icon: "success",
                confirmButtonText: "OK",
              }).then(() => {
                this.$router.push({ name: "ownPView" });
              });
            }
          });
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
.background{
  height: 100%;
}
.profile-pic {
  width: 150px;
  height: 150px;
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
}
.rate {
  font-size: 18px;
  display: inline-flex;
  padding:5px
}

.rate label {
  width: 50px;
  margin-right: auto;
}
.rate input {
  margin-left: 10px;
}
.evaForm {
  display: flex;
  width: auto;
}

.container {
  background: white;
  margin: 20px;
  width: auto;
  border-radius: 5px;
}

.detail {
  display: flex;
  padding: 10px;
  text-align: left;
  width: -webkit-fill-available;
  
}

.score {
  margin-left: 100px;
}
</style>
