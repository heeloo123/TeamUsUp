<template>
  <div style="display: flex; text-align: -webkit-center">
    <div class="background">
      <div class="container">
        <div class="item">
          <h1 style="font-size: 40px; margin-left: -1200px">Create a project!</h1>

          <form class="detail" @submit.prevent="createProject">
            <div>
              <div class="profile-pic">
                <img v-if="imagePreview" :src="imagePreview" alt="Image Preview" />
              </div>
              <div style="margin-left: 20px">
                <input type="file" id="projectPic" @change="handleFileSelect" />
              </div>
              <p></p>
              <div class="searchU">
                <input
                  v-model="search"
                  type="text"
                  placeholder="Search users..."
                  @keydown.enter="addUser"
                />
                <div>
                  <button
                    class="addBtn"
                    @click="addUser"
                    v-if="search && !userList.includes(search)"
                  >
                    Add
                  </button>
                </div>

                <div
                  style="
                    height: 210px;
                    overflow-y: auto;
                    margin-top: 30px;
                    background: rgb(239, 232, 232);
                    border-radius: 10px;
                  "
                >
                  <ul>
                    <li v-for="(user, index) in userList" :key="index">
                      {{ user }}
                      <button
                        style="background: transparent; border: transparent"
                        @click="deleteUser(index)"
                      >
                        <img
                          style="width: 20px; height: 20px"
                          src="../assets/delete.png"
                          alt="delete icon"
                        />
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div style="display: block; margin-left: 20px">
              <p></p>
              <span style="font-size: 30px">Project name:</span>
              <input
                placeholder="Enter your Project name"
                type="text"
                id="major"
                v-model="major"
                required
              />
              <p></p>
              <div style="font-size: 30px">Project description:</div>

              <textarea
                placeholder="Enter project discription here"
                v-model="bio"
                required
              ></textarea>

              <label
                style="
                  display: flex;
                  justify-content: space-between;
                  margin-left: -300px;
                  margin-top: 100px;
                "
              >
                <button class="defaultBtn" @click.prevent="CancelAlert">Cancel</button>
                <button class="defaultBtn" type="submit">Create</button>
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const Swal = require("sweetalert2");
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
export default {
  name: "CreateProjectView",
  data() {
    return {
      search: "",
      userList: [],
      projectName: "",
      projectDescription: "",
      projectPic: "",
      file: null,
      imagePreview: null,
    };
  },
  methods: {
    handleFileSelect(event) {
      this.file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.file);
    },
    async searchUsers() {
      const url = `http://49.245.48.28:8080/api/search?query=${this.query}`;
      axios
        .get(url)
        .then((response) => {
          if (this.searchType === "") {
            this.results = response.data;
          } else {
            this.results = response.data.filter(
              (result) => result.resultType === this.searchType.capitalize()
            );
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },

  },
  async addUser() {
  if (this.search && !this.userList.includes(this.search)) {
    const searchResults = await this.searchUsers();
    if (searchResults.length === 0) {
      // show message here using sweetalert2
      Swal.fire({
        icon: "error",
        text: "No users found!",
      });
    } else {
      const user = searchResults.find((result) => result.name === this.search);
      if (user) {
        this.userList.push(user);
      }
    }
    this.search = "";
  }
},
  deleteUser(index) {
    this.userList.splice(index, 1);
  },
  async createProject() {
    const invalidinput = /[~`!#$%^&*|\\:<>]/; // regular expression pattern
    if (
      this.projectName &&
      !invalidinput.test(this.projectName) &&
      this.projectName.trim() !== "" &&
      this.projectDescription &&
      !invalidinput.test(this.projectDescription) &&
      this.projectDescription.trim() !== ""
    ) {
      try {
        const auth = useAuthStore();
        if (auth.isAuthenticated) {
          const headers = {
            "session-ID": auth.jsessionID,
          };

          let formData = new FormData();
          formData.append("name", this.projectName);
          formData.append("description", this.projectDescription);
          formData.append("image", this.projectPic);
          formData.append("users", JSON.stringify(this.userList));
          const response = await axios.post(
            "http://49.245.48.28:8080/api/project/createProject",
            formData,
            { headers }
          );

          console.log(response);
          Swal.fire({
            icon: "success",
            text: "Project has been created!",
          });
          // Navigate to project page
          this.$router.push({ name: "Project" });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          text: "Something went wrong. Please try again later.",
        });
        console.error(error);
      }
    } else {
      Swal.fire({
        icon: "warning",
        text: "The text should not include~`!#$%^&*|\\:<>",
      });
    }
  },
};
</script>

<style scoped>
.background {
  background: rgb(207, 205, 205);
  height: 100%;
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

  margin-left: 10px;
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
  min-height: 500px;
  height: auto;
  background: rgb(234, 229, 229);
}

.profile-pic {
  background: rgb(234, 231, 231);
  width: 320px;
  height: 300px;
  border-radius: 20px;
}

.searchU input {
  padding: 15px;
  min-width: 300px;
  width: auto;
  border-radius: 20px;
  font-size: 15px;
}

.searchU ul {
  padding: 20px;
}

.searchU li {
  font-size: 30px;
  margin-left: 40px;
  padding: 10px;
}

.addBtn {
  border-radius: 30px;
  color: black;
  display: flex;
  margin-left: 280px;
  margin-top: -30px;
}

.searchU option {
  font-size: 25px;
}
</style>
