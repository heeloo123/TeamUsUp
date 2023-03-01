<template>
  <div style="display: flex; text-align: -webkit-center">
    <div class="background">
      <div class="container">
        <div class="item">
          <h1 style="font-size: 40px; margin-left: -1300px">Edit project</h1>

          <form class="detail">
            <div>
              <div class="profile-pic">
                <input type="file" id="profilePic" />
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
            <div style="display: block; margin-left: 20px; margin-top: -32px;">
              <p></p>
              <div>
                <span style="font-size: 30px">Project name:</span>
                <input
                  placeholder="Enter your major here"
                  type="text"
                  id="major"
                  v-model="major"
                  required
                />
                <label style="padding: 20px; margin: 10px">
                  <button class="e">Self evaluation</button>
                  <button class="e">Peer evaluation</button></label
                >
              </div>
              <p></p>
              <div style="font-size: 30px">Project description:</div>

              <textarea
                placeholder="Enter your biography here"
                v-model="bio"
                required
              ></textarea>
            </div>
          </form>

          <form style="display: flex; justify-content: space-between">
            <button class="defaultBtn" @click.prevent="CancelAlert">Cancel</button>
            <button class="defaultBtn" type="submit">Create</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const Swal = require("sweetalert2");
export default {
  name: "CreateProjectView",
  data() {
    return {
      search: "",
      userList: ["John", "Jane", "jackson"],
      projectName: "",
      projectDescription: "",
      projectPic: null,
    };
  },
  methods: {
    addUser() {
      if (this.search && !this.userList.includes(this.search)) {
        this.userList.push(this.search);
        this.search = "";
      }
    },
    deleteUser(index) {
      this.userList.splice(index, 1);
    },
    createProject() {
      const invalidinput = /[~`!#$%^&*|\\:<>]/; // regular expression pattern
      if (
        this.projectName &&
        !invalidinput.test(this.projectName) &&
        this.projectName.trim() !== "" &&
        this.projectDescription &&
        !invalidinput.test(this.projectDescription) &&
        this.projectDescription.trim() !== ""
      ) {
        Swal.fire({
          icon: "success",

          text: "Project has been created!",
        });

        // Navigate to projectpage
        this.$router.push({ path: "/Project" });
      } else {
        Swal.fire({
          icon: "warning",

          text: "The text should not include~`!#$%^&*|\\:<>",
        });
      }
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
.searchU {
}
.searchU input {
  padding: 15px;
  min-width: 300px;
  width: auto;
  border-radius: 20px;
  font-size: 15px;
}

.searchU ul {
  background: rgb(239, 232, 232);
  display: content;
  width: 300px;
  min-height: 200px;
  height: auto;

  border-radius: 20px;
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
.e{
  color: white;
  background: black;
  margin: 20px;
  font-size: 20px;
  border-radius: 20px;
  font-family: math;
}
</style>
