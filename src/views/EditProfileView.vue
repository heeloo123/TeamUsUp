<template>
  <div style="display: flex; text-align: -webkit-center">
    <div class="background">
      <div class="container">
        <div class="item">
          <h1 style="font-size: 40px; margin-left: -1200px">Edit profile</h1>
          <form class="detail" @submit.prevent="submitForm">
            <div class="profile-pic">
              <img v-if="imagePreview" :src="imagePreview" alt="Image Preview" />
            </div>

           




            <div style="padding: 15px; margin: 15px">
              <div style="font-size: 40px; margin-top: -10px">
                <span> {{ $state.user.firstName }} </span>
                <span> {{ $state.user.lastName }} </span>
              </div>
              <p></p>
              <div v-if="selectedMajors.length > 0" style="margin-bottom: 10px">
                <ul class="selectedmajor">
                  <span v-for="major in selectedMajors" :key="major">{{ major }}
                  <button
                   
                    @click="deselectMajor(major)"
                    style="color: red; background: none; border: none; cursor: pointer"
                  >
                 <img style="width: 20px" src="../assets/delete.png" />
                  </button></span>
                </ul>
              </div>

              <span style="font-size: 30px">Major:</span>

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

              <div style="font-size: 30px">Biography:</div>

              <textarea
                placeholder="Enter your biography here"
                v-model="bio"
                required
              ></textarea>

              <div style="margin-left: -250px">
                <input type="file" id="profilePic" @change="handleFileSelect" />
              </div>
              <div style="display: flex; justify-content: space-between; margin-left:-350px;margin-top:80px">
            <button class="defaultBtn" @click.prevent="CancelAlert">Cancel</button>
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
  name: "editProfile",
  async created() {
    const auth = useAuthStore();
    if (auth.isAuthenticated) {
      try {
        const headers = {
          "session-ID": auth.jsessionID,
        };
        const response = await axios.get("http://49.245.48.28:8080/api/profile/userProfile", { headers });
        this.userProfile = response.data;
        this.form = {
          firstName: this.userProfile.firstName,
          lastName: this.userProfile.lastName,
          email: this.userProfile.email,
          bio: this.userProfile.bio,
        };
      } catch (error) {
        console.error('userProfile'.error);
      }
    }
  },
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
      const headers = {
        "session-ID": auth.jsessionID,
      };
      axios
        .get("http://49.245.48.28:8080/api/profile/majors", { headers })

        .then((response) => {
          // store the list of majors in the data object
          this.majors = response.data;
        })
        .catch((error) => {
          console.log('major',error);
        });
    }
  },
  methods: {
    CancelAlert() {
      Swal.fire({
        title: "Leave site?",
        text: "Any changes you made may not be saved.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Leave",
        cancelButtonText: "No,stay on this page",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$router.push({ name: "home" });
        } else {
          this.$router.push({ name: "EditProfile" });
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
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.file);
    },

    async submitForm() {
      try {
        const auth = useAuthStore();
        if (auth.isAuthenticated) {
          const headers = {
            "session-ID": auth.jsessionID,
          };

          await axios.patch(
            "http://49.245.48.28:8080/api/profile/editProfile",

            { biography: this.bio, major: this.selectedMajors, profile_pic: this.file },
            {
              headers,
            }
          );
          Swal.fire({ icon: "success" });
          console.log(this.bio,this.selectMajor,this.file)

          this.$router.push({ name: "StudentHome" });
        }
      } catch (error) {
        Swal.fire({
          title: "Something went wrong",
          icon: "error",
        });
      }
    },
  },
  computed: {
    // filter the list of majors based on the current input value

    $state() {
      return useAuthStore();
    },
  },
};
</script>

<style scoped>
.background {
  background: rgb(207, 205, 205);
  height: 100vh;
  width: 100vw;
  margin: -10px;
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
  margin: 20px;
  margin-left: 60px;
}

input[type="text"] {
  border-radius: 20px;
  font-size: 20px;
  padding: 10px;
  border: transparent;
  background: rgb(234, 229, 229);
  width: 500px;
}

textarea {
  border-radius: 20px;
  font-size: 20px;
  padding: 10px;
  border: transparent;
  width: 1200px;
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

.selectedmajor span{
  background: rgb(234, 229, 229);
  margin: 10px;
    border-radius: 20px;
    padding: 5px;
    font-size: 17px;
}
</style>
