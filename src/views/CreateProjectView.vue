<template>
  <h1>Create Project</h1>
  <form>
    <lable> Project Name: </lable>
    <input v-model="projectName" type="text" required>

    <label>Project description</label>
    <textarea v-model="projectDescription" required></textarea>

    <label>Upload Project Pic:</label>
      <input type="file" accept="image/*" @change="handleFileUpload">
      <label>Search for User:</label>
      <input v-model="searchQuery" type="text" placeholder="Search users...">
     
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
      
      <button type="submit" @click.prevent="createProject">Create Project</button>

  </form>
</template>

<script>
export default {
  name: "CreateProjectView",
};
</script>

<style>
</style>