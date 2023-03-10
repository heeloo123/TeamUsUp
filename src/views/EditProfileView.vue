<template>
  <div style="display: flex; text-align: -webkit-center">
    <div class="background">
      <div class="container">
        <div class="item">
          <h1 style="font-size: 40px; margin-left: -1300px">Edit profile</h1>
          <form class="detail" @submit.prevent="EditProfile">
            <div class="profile-pic">
              <img v-if="imagePreview" :src="imagePreview" alt="Image Preview" />
            </div>

            <div style="padding: 15px; margin: 15px">
              <div style="font-size: 40px; margin-top: -10px">
                <span> fname {{ $state.user.firstName }} </span>
                <span> lname {{ $state.user.lastName }} </span>
              </div>
              <p></p>
              <div v-if="selectedMajors.length > 0" style="margin-bottom: 10px">
                <div class="selectedmajor">
                  {{ selectedMajors.join(" ") }}
                  <button
                    v-for="major in selectedMajors"
                    :key="major"
                    @click="deselectMajor(major)"
                    style="color: red; background: none; border: none; cursor: pointer"
                  >
                    <img style="width: 20px" src="../assets/delete.png" />
                  </button>
                </div>
              </div>

              <span style="font-size: 30px">Major:</span>

              <select
                class="majorSelect"
                v-if="filteredMajors.length > 0"
                v-model="selectedMajor"
                @change="selectMajor(selectedMajor)"
              >
                <option value="" disabled>Select your major</option>
                <option
                  v-for="major in filteredMajors"
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
           
          <div style="margin-left:-300px;margin-top:50px">

          <label style="display: flex; justify-content: space-between;">
            <button class="defaultBtn"><router-link to="/Profile" @click="CancelAlert">Cancel</router-link></button>
            <button class="defaultBtn" type="submit" @click="Save">Save</button>
          </label></div>
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
    };
  },
  mounted() {
    // make an axios GET request to retrieve the list of majors
    axios
      .get("http://49.245.48.28:8080/api/profile/majors")
      .then((response) => {
        // store the list of majors in the data object
        this.majors = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    CancelAlert() {
      Swal.fire({
        title: "Unsaved Changes",
        text: "Do you want to discard unsaved changes?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Discard",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$router.push({ name: "Profile" });
        } else {
          history.back();
        }
      });
    },
    Save() {
      Swal.fire({
        
        text: "Satisfed your changes?",
        
        showCancelButton: true,
        confirmButtonText: "yes",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$router.push({ name: "Profile" });
        } else {
          history.back();
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
  
  async EditProfile() {
    try {
      let formData = new FormData();
      formData.append("biography", this.bio);
      formData.append("profile_pic", this.file);
      formData.append("majors", JSON.stringify(this.selectedMajors));
      await axios.patch("http://49.245.48.28:8080/api/profile/editProfile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      this.$router.push({ name: "StudentHome" });
    } catch (error) {
      Swal.fire({
        title: "Something went wrong",
        icon: "error",
      });
    }},
  },

  computed: {
    // filter the list of majors based on the current input value
    filteredMajors: function () {
      return this.majors.filter((major) => {
        return major.majorName.toLowerCase().includes(this.major.toLowerCase());
      });
    },
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
  background: rgb(234, 229, 229);
}
</style>
