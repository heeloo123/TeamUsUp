<template>
  <form class="project-container">
    <div style="margin: 10px">
      <h1 style="font-size: 50px; font-family: math; margin: 40px">
        Create A Project!
      </h1>

      <div class="project-pic">
        <input type="file" accept="image/*" @change="handleFileUpload" />
      </div>
      <div style="margin-left: 400px; margin-top: -320px">
        <div class="insertP_name">
          <lable> Project Name: </lable>
          <input
            v-model="projectName"
            type="text"
            placeholder="Enter project name.."
            required
          />

          <div>Project description :</div>
          <textarea v-model="projectDescription" required></textarea>
        </div>
        <div class="searchU">
          <input v-model="search" type="text" placeholder="Search users..." />
          <ul>
            <li v-for="(user, index) in userList" :key="index">
              {{ user }}
              <button @click="deleteUser(index)">Delete</button>
            </li>
          </ul>

          <nav>
            <button
              class="defaultBtn"
              type="submit"
              @click.prevent="createProject"
            >
              Create Project
            </button>
            <button class="defaultBtn" type="submit">
              <router-link to="/Profile">Cancel</router-link>
            </button>
          </nav>
        </div>
      </div>
    </div>
  </form>
</template>

<!---need import axios-for search-->
<script>
export default {
  name: "CreateProjectView",
  data() {
    return {
      search: '',
      userList: ['Jane','John'] 
    }
  },
  methods: {
    addUser() {
      if (this.search && !this.userList.includes(this.search)) {
        this.userList.push(this.search)
        this.search = ''
      }
    },
    deleteUser(index) {
      this.userList.splice(index, 1)
    }
  }
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
  min-height: 130px;
  height: auto;
  border-radius: 30px;
}
</style>