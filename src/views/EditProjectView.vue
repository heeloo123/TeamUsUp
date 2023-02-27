<template>
  <form class="edit-project-container">
  <h1>Edit Project</h1>
    <div>
      <input type="file" accept="image/*" @change="handleFileUpload"/>
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

<nav>
  <button class="defaultBtn">
        <router-link to="/SelfEva">Self Evaluation</router-link></button>
          
  <button class="defaultBtn">
        <router-link to="/PeerEva">Peer evaluation</router-link></button>
        </nav>

  </form>

  <div class="member-container">

  </div>

</template>

<script>
export default {
  name: "EditProjectView",
};
</script>

<style>
</style>