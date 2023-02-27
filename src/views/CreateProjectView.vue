<template>
  <form class="project-container">
    <h1>Create A Project!</h1>

    <div class="project-pic">
      <input type="file" accept="image/*" @change="handleFileUpload" />
    </div>
    <div>
      <lable> Project Name: </lable>
      <input v-model="projectName" type="text" required />
    </div>

    <div>
      <label>Project description</label>
      <textarea v-model="projectDescription" required></textarea>
    </div>
    <div>
      <label>Search for User:</label>
      <input v-model="searchQuery" type="text" placeholder="Search users..." />
    </div>
    <!-- <ul>
        <li v-for="user in filteredUsers" :key="user.id">
          {{ user.name }}
          <button @click="addMember(user)">Add</button>
        </li>
      </ul>
      
      <h3>Members</h3>
      <ul>
        <li v-for="member in members" :key="member.id">{{ member.name }}</li>
      </ul>-->

    <button class="defaultBtn" type="submit" @click.prevent="createProject">
      Create Project
    </button>
  </form>
</template>

<script>
export default {
  name: "CreateProjectView",
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
  margin: 50px;
  background: rgb(234, 231, 231);
  overflow: hidden;
  align-items: center;
}

input[type="file"] {
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin: 60px;
}
</style>