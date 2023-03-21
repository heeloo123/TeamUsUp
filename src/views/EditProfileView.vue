<template>
  <div style="display: flex; text-align: -webkit-center">
    <div class="background">
      <div class="header">
        <label><img src="../assets/icons8-user-32.png" /></label>
        <p>Student Info | <router-link to="/Profile" class="Rp">Profile</router-link> | Edit Profile</p>
        
      </div>
      <div class="container">
        <div class="item">
          
          <form class="detail" @submit.prevent="EditProfile">
            <div class="profile-pic">
              <img
                v-if="imagePreview || profileImageSrc"
                :src="imagePreview || profileImageSrc"
                alt="Image Preview"
                
              />
            </div>

            <div style="padding: 15px; margin: 15px">
              <div style="font-size: 40px; margin-top: -10px">
                <span> {{ $state.user.firstName }} </span>
                <span>{{" "}} {{ $state.user.lastName }} </span>
              </div>
              <p></p>
              <div v-if="selectedMajors.length > 0" style="margin-bottom: 10px">
                <ul class="selectedmajor">
                  <span v-for="major in selectedMajors" :key="major"
                    >{{ major.majorName }}
                    <button
                      @click="deselectMajor(major)"
                      style="
                        color: red;
                        background: none;
                        border: none;
                        cursor: pointer;
                      "
                    >
                      <img
                        style="width: 20px"
                        src="../assets/delete.png"
                      /></button
                  ></span>
                </ul>
              </div>

              <span style="font-size: 25px">Major:</span>

              <select
                class="majorSelect"
                v-model="selectedMajor"
                @change="selectMajor(selectedMajor)"
              >
                <option value="" disabled>Select your major</option>
                <option
                  v-for="major in majors"
                  :key="major.majorCode"
                  :value="major.majorName"
                  :disabled="
                    selectedMajors.includes(major.majorName) &&
                    selectedMajors.length >= 2
                  "
                >
                  {{ major.majorName }}
                </option>
              </select>

              <div style="font-size: 25px;margin-top:10px">Biography:</div>

              <textarea
                placeholder="Enter your biography here"
                v-model="bio"
                required
              ></textarea>

              <div style="margin-left: -250px;margin-top:-100px">
                <input
                  type="file"
                  id="profilePic"
                  v-on:change="handleFileSelect"
                />
              </div>
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  margin-left: -250px;
                  margin-top: 60px;
                "
              >
                <button class="defaultBtn" @click.prevent="CancelAlert">
                  Cancel
                </button>
                <button class="defaultBtn" type="submit">Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import { useAuthStore } from "@/stores/auth";
export default {
  name: "EditProfileView",
  data() {
    return {
      file: null,
      imagePreview: null,
      majors: [],
      bio: "",
      selectedMajors: [],
      selectedMajor: null,
      profilePic: "",
      profileID: "",
    };
  },
  async mounted() {

    // make an axios GET request to retrieve the list of majors

    const auth = useAuthStore();
    if (auth.isAuthenticated) {


      axios
        .get("http://49.245.48.28:8080/api/profile/majors", { withCredentials:true})

        .then((response) => {
          // store the list of majors in the data object
          this.majors = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
      axios
        .get("http://49.245.48.28:8080/api/profile/userProfile", {
          withCredentials:true
        })
        .then((res) => {
          this.bio = res.data.biography;
          this.selectedMajors = res.data.majors;
          this.profileID = res.data.profileID;
        });
    }
  },
  methods: {
    CancelAlert() {
      Swal.fire({
        title: "Leave site?",
        text: "Changes you made may not be saved",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Leave",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$router.push({ name: "Profile" });
        } 
      });
    },
    selectMajor(majorName) {
      if (
        this.selectedMajors.length < 2 &&
        !this.selectedMajors.includes(majorName)
      ) {
        this.selectedMajors.push(
          this.majors.find((m) => m.majorName === majorName)
        );
      }
    },
    deselectMajor(majorName) {
      this.selectedMajors = this.selectedMajors.filter((m) => m !== majorName);
    },

    handleFileSelect(event) {
      this.file = event.target.files[0];
      if (this.file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result;
        };
        reader.readAsDataURL(this.file);
      }
    },

    async EditProfile() {
      const auth = useAuthStore();
      Swal.fire({
        title: 'Are you sure?',
        text: 'Your profile information will be updated.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Update',
        cancelButtonText: 'Cancel'
      }).then((result) => {

      if(result.isConfirmed){

      if (auth.isAuthenticated) {
        axios
          .patch(
            "http://49.245.48.28:8080/api/profile/editProfile",
            {
              biography: this.bio,
              majors: this.selectedMajors,
              profileID: this.profileID,
            },
            {
              withCredentials:true
            }
          )
          .then((res) => {
            if (res.status === 202) {
              console.log("Profile post success");
              if (this.file) {
                const formData = new FormData();
                formData.append("image", this.file);

                axios.post(
                  "http://49.245.48.28:8080/api/profile/userProfile/image",
                  formData,
                  {
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },withCredentials:true
                  }
                );
              }

              Swal.fire({
                title: "Profile successfully edited",
                icon: "success",
                confirmButtonText: "OK",
              }).then(() => {
                this.$router.push({ name: "Profile" });
              });
            } else {
              Swal.fire({
                title: "Something went wrong during profile creation",
                icon: "failure",
                confirmButtonText: "OK",
              });
            }
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              title: "Error",
              text: "An error occurred while creating your profile. Please try again later.",
              icon: "error",
              confirmButtonText: "OK",
            });
          });
      } }});
    },
  },
  computed: {
    // filter the list of majors based on the current input value

    $state() {
      return useAuthStore();
    },
    profileImageSrc() {
      const baseUrl = "http://49.245.48.28:8080";
      const imagePath = `/api/profile/image/${this.profileID}`;
      return baseUrl + imagePath;
    },
  },
};
</script>

<style scoped>


.container {
  background: rgb(255, 255, 255);
  border-radius: 8px;
  margin: 20px;
  width: auto;
  margin: 50px;
  display: -webkit-inline-box;
}

.item {
  display: inline-table;
}

.detail {
  display: flex;
  padding: 20px;
  text-align: left;
  margin: 10px;
  margin-left: 60px;
}

input[type="text"] {
  border-radius: 20px;
  font-size: 20px;
  padding: 10px;
  border: transparent;
  background: rgb(240, 237, 237);
  width: 500px;
}

textarea {
  border-radius: 20px;
  font-size: 20px;
  padding: 10px;
  border: transparent;
 
  min-height: 100px;
  height: auto;
  background: rgb(242, 240, 240);
  width: -webkit-fill-available;
}

.majorSelect {
  font-size: 20px;
  margin-left: 0px;
  font-size: 20px;
  margin-left: 10px;
  border-radius: 10px;
  padding: 10px;
}
.selectedmajor {
  display: flex;
}

.selectedmajor span {
  background: rgb(234, 229, 229);
  margin: 10px;
  border-radius: 20px;
  padding: 10px;
  font-size: 17px;

}
.profile-pic{
  margin-top:50px
}
</style>
