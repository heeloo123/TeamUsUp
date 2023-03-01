<template>
  <form class="project-container">
    <div style="margin: 10px">
      <h1 style="font-size: 50px; font-family: math; margin: 40px">Create A Project!</h1>

      <div class="project-pic">
        <input type="file" accept="image/*" @change="handleFileUpload" />
      </div>
      <div class="searchU">
        <input v-model="search" type="text" placeholder="Search users..." @keydown.enter="addUser" />
        <button class="addBtn" @click="addUser" v-if="search && !userList.includes(search)">
          Add
        </button>
        <ul>
          <li v-for="(user, index) in userList" :key="index">
            {{ user }}
            <button style="background: transparent; border: transparent" @click="deleteUser(index)">
              <img style="width: 20px; height: 20px" src="../assets/delete.png" alt="delete icon" />
            </button>
          </li>
        </ul>
      </div>

      <div style="margin-left: 400px; margin-top: -670px">
        <div class="insertP_name">
          <lable> Project Name: </lable>
          <input v-model="projectName" type="text" placeholder="Enter project name.." required />

          <div>Project description :</div>
          <textarea v-model="projectDescription" required></textarea>
        </div>
      </div>
      <div style="margin-top: 150px">
        <nav>
          <label style="float: left">
            <button class="defaultBtn" type="submit">
              <router-link to="/Profile">Cancel</router-link>
            </button></label>
          <label style="float: right"><button class="defaultBtn" type="submit" @click.prevent="createProject">
              Create Project
            </button></label>
        </nav>
      </div>
    </div>
  </form>
</template>

<!---need import axios-for search input @hadelserach input-->
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
.project-container {
  display: flex;
  margin: 50px;
  background: rgb(211, 208, 208);
  border-radius: 10px;
}

.project-pic {
  width: 300px;
  height: 300px;
  margin: 40px;
  background: rgb(234, 231, 231);
  overflow: hidden;
  align-items: center;
  border-radius: 20px;
}

input[type="file"] {
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin: 60px;
}

.insertP_name {
  margin: 20px;
  font-size: 40px;
  font-family: math;
  padding: 10px;
}

.insertP_name input {
  font-size: 20px;
  min-width: 700px;
  width: auto;
  height: 50px;
  margin: 10px;
  padding-left: 20px;
  border-radius: 10px;
}

.insertP_name textarea {
  width: 1200px;
  min-height: 400px;
  height: auto;
  border-radius: 30px;
  padding: 20px;
  font-size: 20px;
}

.searchU input {
  margin-left: 20px;
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
  margin-left: 20px;
  border-radius: 20px;
  padding: 20px;
}

.searchU li {
  font-size: 30px;
  margin-left: 40px;
  padding: 10px;
}

.addBtn {
  margin: 10px;
  border-radius: 30px;
  color: white;
  background: black;
}
</style>
