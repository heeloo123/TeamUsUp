<template>
  <div style="display: flex; text-align: -webkit-center">
    <div class="background">
      <div class="header">
        <p > <router-link to="/home" style="color:#e12744;text-decoration: none;">
         Dashboard
        </router-link> </p> 
        <p>
          / Create profile
        </p>
      </div>
      <div class="container">
        <div class="item">
        
          <form class="detail" @submit.prevent="CreateProfile">
           <div style="display: flex;">
            <div class="profile-pic">
              <img v-if="imagePreview" :src="imagePreview" alt="Image Preview" />
            </div>

            <div style="padding: 15px; margin: 15px;width: -webkit-fill-available;">
              <div style="font-size: 40px; margin-top: -10px">
                <span style="margin-right: "> {{ $state.user.firstName }} </span>
                <span> {{" "}}{{ $state.user.lastName }} </span>
              </div>
              <p></p>
              <div v-if="selectedMajors.length > 0" style="margin-bottom: 10px">
                <ul class="selectedmajor">
                  <span v-for="major in selectedMajors" :key="major"
                    >{{ major }}
                    <button
                      @click="deselectMajor(major)"
                      style="color: red; background: none; border: none; cursor: pointer"
                    >
                      <img style="width: 20px" src="../assets/delete.png" /></button
                  ></span>
                </ul>
              </div>

              <span style="font-size: 30px">Major :</span>

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
                    selectedMajors.includes(major.majorName) && selectedMajors.length >= 2
                  "
                >
                  {{ major.majorName }}
                </option>
              </select>
              <p></p>
              <div style="font-size: 30px">Biography :</div>

              <textarea
                placeholder="Enter your biography here"
                v-model="bio"
                required
              ></textarea>

              <div style="margin-left: -250px">
                <input type="file" id="profilePic" v-on:change="handleFileSelect" />
              </div>
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  
                  margin-top: 0px;
                "
              >
                <button class="defaultBtn" @click.prevent="CancelAlert">Cancel</button>
                <button class="defaultBtn" type="submit">Create</button>
              </div>
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
  name: "CreateProfileView",
  data() {
    return {
      file: null,
      imagePreview: null,
      majors: [],
      bio: "",
      selectedMajors: [],
      selectedMajor: null,
      profilePic: "",
    };
  },
  async mounted() {
    // make an axios GET request to retrieve the list of majors
    const auth = useAuthStore();
    if (auth.isAuthenticated) {


      axios
        .get(process.env.VUE_APP_API_URL+"/profile/majors", { withCredentials:true })

        .then((response) => {
          // store the list of majors in the data object
          this.majors = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  methods: {
    CancelAlert() {
      Swal.fire({
        title: "Are you sure?",
        text: "It is good to create a profile to let people find you!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "yes",
        cancelButtonText: "No,stay on this page",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$router.push({ name: "StudentHome" });
        } else {
          this.$router.push({ name: "CreateProfile" });
        }
      });
    },
    selectMajor(majorName) {
      if (this.selectedMajors.length < 2 && !this.selectedMajors.includes(majorName)) {
        this.selectedMajors.push(majorName);
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

    async CreateProfile() {
      const auth = useAuthStore();
      if (auth.isAuthenticated) {
        var foundMajor = [];
        this.selectedMajors.forEach((major) => {
          foundMajor.push(this.majors.find((m) => m.majorName === major));
        });
        axios
          .post(
              process.env.VUE_APP_API_URL+"/profile/createProfile",
            { biography: this.bio, majors: foundMajor },
            {
             withCredentials:true,
            }
          )
          .then((res) => {
            if (res.status === 201) {
              console.log("Profile post success");
              if (this.file) {
                const formData = new FormData();
                formData.append("image", this.file);

                axios.post(
                    process.env.VUE_APP_API_URL+"/profile/userProfile/image",
                  formData,
                  {
                    headers: {
                      "Content-Type": "multipart/form-data",
                    }, withCredentials:true
                  }
                );
              }

              Swal.fire({
                title: "Profile created",
                icon: "success",
                confirmButtonText: "OK",
              }).then(() => {
                this.$router.push({ name: "StudentHome" });
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
              text:
                "An error occurred while creating your profile. Please try again later.",
              icon: "error",
              confirmButtonText: "OK",
            });
          });
      }
    },
  },
  computed: {
    $state() {
      return useAuthStore();
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
  width: -webkit-fill-available;
  margin: 50px;
}

.item {
  display: inline;
  width: -webkit-fill-available;
}

.detail {
  
  padding: 20px;
  text-align: left;
  margin: 20px;
  margin-left: 60px;
}

input[type="text"] {
  border-radius: 20px;
  font-size: 20px;
  padding: 10px;
  border: transparent;
  background: rgb(234, 229, 229);
  width: -webkit-fill-available;
}

textarea {
  border-radius: 20px;
  font-size: 20px;
  padding: 10px;
  border: transparent;
  width: -webkit-fill-available;
  min-height: 100px;
  height: auto;
  background: rgb(234, 229, 229);
}

.majorSelect {
  font-size: 20px;
  margin-left: 10px;
  font-size: 20px;
  margin-left: 10px;
  border-radius: 10px;
  padding: 5px;
}
.selectedmajor {
  display: flex;
}

.selectedmajor span {
  background: rgb(234, 229, 229);
  margin: 10px;
  border-radius: 20px;
  padding: 5px;
  font-size: 17px;
}
.profile-pic{
  margin-right:20px;
  width: 250px;
  margin-top: 30px;
}
</style>
