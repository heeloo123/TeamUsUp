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
                <input type="file" id="projectPic" v-on:change="handleFileSelect" />
              </div>
              <p></p>
              <span>Project participants: </span>
              <div style="flex: 1">
                <div
                  style="
                    height: 300px;
                    overflow-y: auto;
                    margin-top: 5px;
                    background: rgb(239, 232, 232);
                    border-radius: 10px;
                  "
                >
                  <ul>
                    <li v-for="(user, index) in userList" :key="index">
                      <span>{{ user.name }} </span>
                      <span>{{ "(" }}{{ user.projectRole }}{{ ")" }}</span>

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
              <div style="margin-top: 50px">
                <button class="defaultBtn" @click.prevent="CancelAlert">Cancel</button>
              </div>

              <div class="searchU"></div>
            </div>

            <div style="display: block; margin-left: 20px">
              <p></p>
              <span style="font-size: 30px">Project name:</span>
              <input
                placeholder="Enter your Project name"
                type="text"
                id="major"
                v-model="projectName"
                required
              />
              <p></p>
              <div style="font-size: 30px">Project description:</div>

              <textarea
                placeholder="Enter project discription here (words limit 200 )"
                v-model="projectDescription"
                required
              ></textarea>
              <p></p>
              <div style="display: flex; flex-direction: row">
                <div style="flex: 1">
                  <form @submit.prevent="search" class="search">
                    <label for="query">Search: </label>
                    <input id="query" v-model="query" type="text" required />

                    <button type="submit">Submit</button>
                  </form>
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
                        style="font-size: 20px; font-weight: 500; margin-bottom: 10px"
                      >
                        <span v-if="result.resultType === 'Profile'">
                          {{ result.header }} ({{ result.descriptor }})
                          <input type="text" v-model="roleMap[index]" />
                          <button
                            v-if="result.addButton"
                            @click.prevent="addUser(result, index)"
                            style="
                              flex: 1;
                              margin-left: 20px;
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
              <span style="margin-left: 1000px">
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
    handleFileSelect(event) {
      this.file = event.target.files[0];
      if(this.file){
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.file);
  }  },
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
                console.log(result);
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
  min-height: 150px;
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

.searchU option {
  font-size: 25px;
}

.result {
  font-size: 18px;
}

.result span:hover {
  background: rgb(255, 255, 255);
}
</style>
