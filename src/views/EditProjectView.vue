<template>
  <form class="edit-project-container">
    <div style="margin: 10px">
      <h1 style="font-size: 50px; font-family: math; margin: 40px">
        Edit Project
      </h1>

      <div class="project-pic">
        <input type="file" accept="image/*" @change="handleFileUpload"/>
      </div>

      <div class="searchU">
        <input v-model="search" type="text" placeholder="Search users..." />
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

      <div style="margin-left: 400px; margin-top: -670px">
        <div class="project-name">
          <lable> Project Name: </lable>
          <input v-model="projectName" 
            type="text"
            placeholder="Current project name"
            required />

        <div class="project-description"></div>
            <label>Project Description: </label>
            <textarea id="projectDescription" v-model="projectDescription" required></textarea>
        </div>
      </div>

      <nav>
        <button class="defaultBtn">
          <router-link to="/SelfEva">Self Evaluation</router-link>
        </button>
          
        <button class="defaultBtn">
          <router-link to="/PeerEva">Peer evaluation</router-link>
        </button>
          <div class="btn2">
            <button 
              class="defaultBtn" 
              type="submit">
              <router-link to="/Project">Cancel</router-link>
            </button>
          </div>
              <label style="margin-left: 1200px;">
                <div class="btn3">
                  <button 
                    class="defaultBtn"
                    type="submit"
                    @click.prevent="updateProject">
                    <router-link to="/Project">Save</router-link>
                  </button>
                </div>
              </label>
       </nav>
    </div>
  </form>
</template>

<script>
export default {
  name: "EditProjectView",
  data() {
    return {
      search: "",
      userList: ["Jane", "John"],
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
  },
};
</script>

<style scoped>
.edit-project-container{
  display: flex;
  margin: 50px;
  background: rgb(211, 208, 208);
  border-radius: 10px;
}

.project-pic{
  width: 300px;
  height: 300px;
  margin: 40px;
  background: rgb(234, 231, 231);
  align-items: center;
  overflow: hidden;
  border-radius: 20px;
}

input[type="file"] {
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin: 60px;
}

.project-name{
  margin: 20px;
  font-size: 40px;
  font-family: math;
  padding: 10px;
}

.project-name input{
  font-size: 20px;
  min-width: 700px;
  width: auto;
  height: 50px;
  margin: 10px;
  padding-left: 20px;
  border-radius: 10px;
}

.project-name textarea{
  width: 1200px;
  min-height: 400px;
  height: auto;
  border-radius: 30px;
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

.defaultBtn{
  position: relative;
  top: 100px;
  left: 500px;
}

.btn2{
  position: relative;
  bottom: 300px;
  right: 200px;
}

.btn3{
  position: relative;
  bottom: 300px;
  right: 100px;
}

.project-description{
  position: relative;
  top: 300px;
  left: 300px;
}

textarea[id="projectDescription"]{
  width: 1200px;
  height: 40px;
  display: block;
}


</style>