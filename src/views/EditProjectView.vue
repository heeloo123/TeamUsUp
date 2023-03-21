<template>
  <div style="display: flex; text-align: -webkit-center">
    <div class="background">
      <div class="header">
        <label><img src="../assets/icons8-user-32.png" /></label>
        <p>
          Student Info | <router-link to="/Profile">Profile</router-link> |
          <router-link to="/ownPView">Recent Project</router-link> | Edit Project |
          {{ projectID }}
          {{ projectName }}
        </p>
      </div>
      <div class="container">
        <div class="item">
          <div class="detail" @submit.prevent="EditProject">
            <div>
              <div class="profile-pic">
                <img v-if="imagePreview" :src="imagePreview" alt="Image Preview" />
              </div>
              <div style="margin-left: 20px">
                <input type="file" id="projectPic" @change="handleFileSelect" />
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
                  <ul class="userlist">
                    <li v-for="user in userList" :key="user.role.id.profileID">
                      <span>{{ user.name }} </span>

                      <button
                        style="background: transparent; border: transparent"
                        @click="deleteUser(user)"
                      >
                        <img
                          style="width: 20px; height: 20px"
                          src="../assets/delete.png"
                          alt="delete icon"
                        />
                      </button>
                      <br>
                      <input
                        type="text"
                        v-model="user.role.projectRole"
                        placeholder="Enter role"
                      />
                    </li>
                    <li v-for="user in addedList" :key="user.role.id.profileID">
                      <span>{{ user.name }} </span>

                      <button
                        style="background: transparent; border: transparent"
                        @click="deleteUser(user)"
                      >
                        <img
                          style="width: 20px; height: 20px"
                          src="../assets/delete.png"
                          alt="delete icon"
                        />
                      </button>
                      <br>
                      <input
                        type="text"
                        v-model="user.role.projectRole"
                        placeholder="Enter role"
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
           

            <div style="margin-left: 50px; width: -webkit-fill-available">
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
                placeholder="Enter project description here (words limit 200 )"
                v-model="projectDescription"
                required
              ></textarea>
              <p></p>
              <div style="display: flex; flex-direction: row">
                <div style="flex: 1">
                  <div class="search">
                    <label for="query">Search: </label>
                    <input id="query" v-model="query" type="text" v-on:keydown.enter="search" required />

                    <button type="submit" style="margin-left: 10px" @click="search">
                      Submit
                    </button>
                  </div>
                  <div
                    class="result"
                    style="
                      margin-top: 20px;
                      background: rgb(234, 229, 229);
                      min-height: 170px;
                      max-height: 170px;
                      overflow-y: auto;
                      border-radius: 10px;
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
                          <input type="text" v-model="result.projectRole" />
                          <button
                            v-if="result.addButton"
                            @click.prevent="addUser(result, result.header)"
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
              <span
                style="margin-top: 20px; display: flex; justify-content: space-between"
              >
                <button class="defaultBtn" @click.prevent="CancelAlert">Cancel</button>
                <span>
                  <button class="defaultBtn" @click="EditProject">Save</button></span
                >
              </span>
            </div>
          </div>
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
  name: "editProjectView",
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
      roleMap: {},
      initialList: [],
      addedList: [],
      removedList: [],
      projectID: "",
    };
  },
  async mounted() {
    console.log("mounted function");
    const auth = useAuthStore();
    if (auth.isAuthenticated) {
      const headers = {
        "session-ID": auth.jsessionID,
      };
      axios
        .get(`http://49.245.48.28:8080/api/project/` + this.$route.params.reference, {
          headers,
        })
        .then((response) => {
          this.projectName = response.data.projectName;
          this.projectDescription = response.data.projectDescription;
          this.projectID = response.data.projectID;
          // eslint-disable-next-line no-unused-vars
          for (const [name, value] of Object.entries(response.data.nameRoleMap)) {
            this.userList.push({ name: name, role: value });
          }
          for (var i = 0; i < this.userList.length; i++) {
            this.initialList.push(this.userList[i]);
          }
        })
        .catch((error) => {
          console.log(error);
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
          this.$router.push({ name: "StudentHome" });
        }
      });
    },
    updateUserRole(user, newRole) {
      const index = this.userList.indexOf(user);
      if (index > -1) {
        this.userList[index].projectRole = newRole;
      }
    },
    handleFileSelect(event) {
      this.file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.file);
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
      console.log(result);
      const user = {
        name: result.header,

        role: {
          id: {
            profileID: result.reference,
            projectID: this.projectID,
          },
          projectRole: result.projectRole
        },
      };
      console.log(index);
      if (
        !this.addedList.find((user) => {
          user.role.id.profileID == user.role.id.profileID;
        })
      ) {
        this.addedList.push(user);
      } else if (
        this.removedList.find((user) => {
          user.role.id.profileID == user.role.id.profileID;
        })
      ) {
        const found = this.removedList.find((user) => {
          user.role.id.profileID == user.role.id.profileID;
        });
        this.userList.push(found);
        this.removedList.splice(this.removedList.indexOf(found), 1);
      }
      this.query = "";
      this.results = [];
    },
    deleteUser(user) {
      console.log(user);
      if (this.initialList.includes(user)) {
        this.removedList.push(user);
        this.userList.splice(this.userList.indexOf(user), 1);
      } else if (this.addedList.includes(user)) {
        this.addedList.splice(this.addedList.indexOf(user), 1);
      }
    },
    async EditProject() {
      try {
        const auth = useAuthStore();
        const projectParticipants = []
        for(const participant of this.userList){
          projectParticipants.push(participant.role)
        }
        if (auth.isAuthenticated) {
          axios
            .patch(
              "http://49.245.48.28:8080/api/project/editProject",
              {
                projectName: this.projectName,
                projectDescription: this.projectDescription,
                projectParticipants: projectParticipants,
                projectID: this.projectID,
              },
              {
                withCredentials:true
              }
            )
            .then((result) => {
              if (result.status === 202) {
                console.log("project post success");
                if (this.file) {
                  const formData = new FormData();
                  formData.append("image", this.file);

                  axios.post(
                    "http://49.245.48.28:8080/api/project/image/" + this.projectID,
                    formData,
                    {
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },withCredentials:true
                    }
                  );

                }
                this.addedList.forEach((user) => {
                  axios.post("http://49.245.48.28:8080/api/project/addParticipant"
                      , user.role
                      , {withCredentials:true})
                });
                this.removedList.forEach((user) => {
                  console.log(user.role)
                  axios.delete("http://49.245.48.28:8080/api/project/removeParticipant",
                      {
                        withCredentials:true,
                        data: user.role
                      }
                  );
                });
                console.log("img", result);
                Swal.fire({
                  icon: "success",
                  text: "Project has been edited!",
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
  display: flex;
  padding: 20px;
  text-align: left;
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

.profile-pic {
  background: rgb(234, 231, 231);
  width: 250px;
  height: 200px;
  border-radius: 20px;
}

.searchU input {
  padding: 15px;
  min-width: 300px;
  width: auto;
  border-radius: 20px;
  font-size: 10px;
}

.searchU ul {
  padding: 20px;
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

.userlist {
  font-size: 20px;
}

.userlist input {
  width: auto;
  background-color: rgb(255, 255, 255);
  margin-left: -20px;
  padding-left: 10px;
  font-size: 15px;
}
</style>
