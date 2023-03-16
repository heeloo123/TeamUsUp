<template>
  <div style="display: flex; text-align: -webkit-center">
    <div class="background">
      <div class="header">
        <label><img src="../assets/icons8-user-32.png" /></label>
        <p>
          Student Info | <router-link to="/Profile">Profile</router-link> |
          <router-link to="/ownPView">Recent Project</router-link> | Create project
        </p>
      </div>
      <div class="container">
        <div class="item">
          <form class="detail" @submit.prevent="createProject">
            <div>
              <div class="project-pic">
                <img v-if="imagePreview" :src="imagePreview" alt="Image Preview" />
              </div>
              <div style="margin-left: 20px; margin-top: 10px">
                <input type="file" id="projectPic" v-on:change="handleFileSelect" />
              </div>
              <p></p>
              <span>Project participants: </span>
              <div style="flex: 1">
                <div
                  style="
                    height: 250px;
                    overflow-y: auto;
                    margin-top: 5px;
                    background: rgb(239, 232, 232);
                    border-radius: 10px;
                    margin-right: 20px;
                  "
                >
                  <ul style="font-size:25px">
                    <li v-for="(user, index) in userList" :key="index">
                      <span>{{ user.name }} </span>
                      <span>{{ user.projectRole }}</span>

                      <button
                        style="background: transparent; border: transparent"
                        @click="deleteUser(user)"
                      >
                        <img
                          style="width: 15px; height: 15px;margin-top:10px;margin-left:10px"
                          src="../assets/delete.png"
                          alt="delete icon"
                        />
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div style="margin-left: 50px;width: -webkit-fill-available">
              <p></p>
              <span style="font-size: 25px">Project name:</span>
              <input
                placeholder="Enter your Project name"
                type="text"
                id="major"
                v-model="projectName"
                required
              />
              <p></p>
              <div style="font-size: 25px">Project description:</div>

              <textarea
                placeholder="Enter project discription here (words limit 200 )"
                v-model="projectDescription"
                required
              ></textarea>
              <p></p>
              <div style="display: flex; flex-direction: row">
                <div style="flex: 1">
                  <form @submit.prevent="search" class="search">
                    <label for="query">Search User: </label>
                    <input id="query" v-model="query" type="text" required />

                    <button style="margin-left: 10px" type="submit">Submit</button>
                  </form>
                  <div class="searchU">
                    <div
                      class="result"
                      style="
                        margin-top: 20px;
                        background: rgb(234, 229, 229);
                        min-height: 170px;
                        max-height: 170px;
                        overflow-y: auto;
                      "
                    >
                      <ul v-if="results.length">
                        <li
                          v-for="(result, index) in results"
                          :key="index"
                          style="font-size: 20px; font-weight: 500; margin-bottom: 5px"
                        >
                          <span v-if="result.resultType === 'Profile'">
                            {{ result.header }} ({{ result.descriptor }})
                            <input type="text" v-model="roleMap[index]" />
                            <button
                              v-if="result.addButton"
                              @click.prevent="addUser(result, index)"
                              style="
                                background-color: #3498db;
                                color: #fff;
                                padding: 5px 10px;
                                border: none;
                                border-radius: 3px;
                                cursor: pointer;
                              "
                            >
                              Add
                            </button>
                          </span>
                        </li>
                      </ul>

                      <p v-else class="result" style="padding: 10px">No results found.</p>
                    </div>
                  </div>
                </div>
              </div>
              <span
                style="margin-top: 20px; display: flex; justify-content: space-between"
              >
                <button class="defaultBtn" @click.prevent="CancelAlert">Cancel</button>

                <button class="defaultBtn" type="submit">Create</button></span
              >
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

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

export default {
  name: "CreateProjectView",
  data() {
    return {
      userList: [],
      projectName: "",
      projectDescription: "",
      projectPic: "",
      file: null,
      imagePreview: null,
      query: "",
      results: [],
      searchType: "",
      roleMap: undefined,
    };
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
          this.$router.push({ name: "StudentHome" });
        }
      });
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
    async search() {
      const url = `http://49.245.48.28:8080/api/search?query=${this.query}`;
      axios
        .get(url)
        .then((response) => {
          if (this.searchType === "") {
            this.results = response.data;
            this.roleMap = new Array();
            this.results.forEach(() => {
              this.roleMap.push("");
            });
          } else {
            this.results = response.data.filter(
              (result) => result.resultType === this.searchType.capitalize()
            );
          }

          // Add a button to each search result
          this.results.forEach((result) => {
            result.addButton = true;
          });
        })
        .catch((error) => {
          console.error(error);
        });
    },

    addUser(result, index) {
      const user = result;
      if (user && !this.userList.includes(user)) {
        this.userList.push({
          id: {
            profileID: user.reference,
          },
          projectRole: this.roleMap[index],
          name: result.header,
        });
      }
      this.query = "";
      this.results = [];
    },
    deleteUser(user) {
      const index = this.userList.indexOf(user);
      if (index !== -1) {
        this.userList.splice(index, 1);
      }
    },
    async createProject() {
      try {
        const auth = useAuthStore();
        if (auth.isAuthenticated) {
          axios
            .post(
              "http://49.245.48.28:8080/api/project/createProject",
              {
                projectName: this.projectName,
                projectDescription: this.projectDescription,
                projectParticipants: this.userList,
              },
              {
                headers: {
                  "session-ID": auth.jsessionID != null ? auth.jsessionID : "Placeholder",
                },
              }
            )
            .then((result) => {
              if (result.status === 201) {
                console.log("project post success");
                if (this.file) {
                  const formData = new FormData();
                  formData.append("image", this.file);

                  axios.post(
                    "http://49.245.48.28:8080/api/project/image/" + result.data,
                    formData,
                    {
                      headers: {
                        "Content-Type": "multipart/form-data",
                        "session-ID": auth.jsessionID,
                      },
                    }
                  );
                }
                console.log('pic',result);
                Swal.fire({
                  icon: "success",
                  text: "Project has been created!",
                  // Navigate to project page
                }).then(() => {
                  this.$router.push({ name: "ownPView" });
                });
              }
            });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          text: "Something went wrong. Please try again later.",
        });
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.background {
  height: 100;
}

.container {
  background: rgb(255, 255, 255);
  border-radius: 20px;
  display: flex;
  margin: 20px;
  width: auto;
}

.item {
  display: inline;
  width: -webkit-fill-available;
}

.detail {
  padding: 20px;
  text-align: left;
  display: flex;
  width: -webkit-fill-available;
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
  width: -webkit-fill-available;
  min-height: 70px;
  height: auto;
  background: rgb(234, 229, 229);
}

.project-pic {
  background: rgb(234, 231, 231);
  width: 250px;
  height: 200px;
  border-radius: 20px;
}
.project-pic img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.searchU input {
  padding: 15px;
  min-width: 300px;
  width: auto;
  border-radius: 20px;
  font-size: 10px;
}

.searchU ul {
}

.searchU li {
  font-size: 15px;
  margin-left: 0px;
}

.searchU option {
  font-size: 20px;
}

.result {
  font-size: 16px;
}

.result span:hover {
  background: rgb(255, 255, 255);
}
</style>
