<template>
  <div style="display: flex; text-align: -webkit-center">
    <div class="background">
      <div class="header">
        <label><img src="../assets/icons8-user-32.png" /></label>
        <p>Student Info | Profile</p>
        <p><router-link to="/ownPView" class="Rp">Recent project </router-link></p>
      </div>
      <p v-if="isDeactivated === true" class="message">your account is deactivated!</p>
      <div class="containerA">
        <div class="item">
          <form class="detail">
            <div class="profile">
              <img
                :src="profileImageSrc"
                alt="Profile Picture"
                @error="setDefaultImage"
              />
            </div>

            <div class="userinfo">
              <div>
                <div class="name">
                  <span>{{ profile.firstName }} </span>
                  <span>{{ profile.lastName }} </span>
                  <label style="float: right"
                    ><router-link to="/EditProfile" class="Ep">
                      <img
                        style="width: 25px"
                        src="../assets/icons8-edit-48.png"
                      /> </router-link
                  ></label>
                </div>

                <div class="infoD" style="display: flex">
                  <div class="textH" style="flex: 1">Student email:</div>
                  <div class="textB" style="flex: 2">{{ profile.email }}</div>
                </div>

                <div class="infoD" style="display: flex">
                  <div class="textH" style="flex: 1">Student ID:</div>
                  <div class="textB" style="flex: 2">{{ profile.profileID }}</div>
                </div>

                <div class="infoD" style="display: flex">
                  <div class="textH" style="flex: 1">Major:</div>
                  <div class="textB" style="flex: 2">
                    <span v-for="major in majors" :key="major.majorCode">
                      <li>{{ major.majorName }}</li>
                    </span>
                  </div>
                </div>

                <div class="infoD" style="display: flex">
                  <div class="textH" style="flex: 1">Biography:</div>
                  <div class="textB" style="flex: 2">{{ profile.biography }}</div>
                </div>
              </div>
            </div>
          </form>
          <div style="float: right; margin: 20px; width: 300px; font-size: 10px">
            <button
              @click="toggleActiveStatus"
              :class="{ 'ABtn active': isDeactivated, ABtn: !isDeactivated }"
            >
              {{ !isDeactivated ? "Deactivate" : "Reactivate" }}
            </button>
            <p v-if="isDeactivated === false"> your account is <span style="color:green; font:bolder; font-size:15px">active</span> .</p>
            <p v-if="isDeactivated === true" class="message">
              Your account has been <span style="color:brown;font-size:20px">deactivated</span>. It will need 1 hour to reactivate. If you
              wish to immediate reactivate your account, please send an email to
              admin@example.com with your request.
            </p>
          </div>
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
  name: "ProfileView",
  props: ["profileID"],
  data() {
    return {
      profile: {},
      majors: [],
      isDeactivated: false,
      message: "",
    };
  },

  async mounted() {
    const auth = useAuthStore();
    if (auth.isAuthenticated) {
      Swal.showLoading();

      const headers = {
        "session-ID": auth.jsessionID,
      };

      axios
        .get(`${API_URL}/profile/userProfile`, { headers })
        .then((response) => {
          console.log(response.data);
          console.log("project", response.data.projects);
          console.log("status", response.data.deactivationFlag);
          this.profile = response.data;
          this.majors = response.data.majors;
          this.isDeactivated = response.data.deactivationFlag;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          Swal.hideLoading();
        });
    }
  },
  computed: {
    profileImageSrc() {
      const baseUrl = "http://49.245.48.28:8080";
      const imagePath = `/api/profile/image/${this.profile.profileID}`;
      return baseUrl + imagePath;
    },
  },
  methods: {
    setDefaultImage(event) {
      event.target.src = require("../assets/icons8-user-64.png");
    },
    async toggleActiveStatus() {
      const auth = useAuthStore();
      const headers = {
        "session-ID": auth.jsessionID,
      };

      const confirmation = await Swal.fire({
        title: "Are you sure?",
        text: `You are about to ${
          !this.isDeactivated ? "deactivate" : "activate"
        } your account`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, proceed",
        cancelButtonText: "No, cancel",
      });

      if (confirmation.isConfirmed) {
        try {
          this.isDeactivated = !this.isDeactivated;
          const response = await axios.patch(
            `${API_URL}/profile/updateStatus?status=` + this.isDeactivated,
            {},
            { headers }
          );

          console.log(response);
        } catch (error) {
          if (error.response && error.response.status === 403) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text:
                "You need to wait 1 hour before deactivating/reactivating your account",
            });
            console.error(error);
          }
        }
      }
    },
  },
};
</script>

<style scoped>
.ABtn {
  transition: transform 0.3s ease;
  padding: 6px;
}
.ABtn.active {
  transform: translateX(100%);
}
.ABtn:not(.active) {
  transform: translateX(0);
}

.Rp {
  margin-left: 1050px;
  background: rgb(196, 193, 193);
  padding: 10px;
  color: black;
  text-decoration: none;
  border-radius: 5px;
}

.Rp:hover {
  background: white;
}
.containerA {
  background: rgb(255, 255, 255);
  border-radius: 8px;
  margin: 20px;
  width: auto;
  margin: 50px;
  display: -webkit-inline-box;
}

.item {
  display: inline;
  width: -webkit-fill-available;
}

.textH {
  width: 500px;
  border-right: outset 2px;
}

.textB {
  padding-left: 30px;
}
.detail {
  display: flex;
  padding: 20px;
  text-align: left;
  margin: 20px;
  margin-left: 60px;
}

.userinfo {
  margin-left: 50px;
  display: inline;
  width: auto;
}
.infoD {
  border: solid 1px grey;
  padding: 10px;
  margin: 1px;
  width: 800px;
}

.profile {
  width: 200px;
  height: 200px;
  margin-top: 10px;
  background: rgb(234, 229, 229);
  overflow: hidden;
  border-radius: 10px;
}
.profile img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.name {
  font-size: 35px;
  margin-bottom: 20px;
}

.message {
  text-align: center;
}
</style>
