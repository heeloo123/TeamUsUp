<template>
  <div>
        <label for="profilePic">Profile Pic:</label>
        <input type="file" id="profilePic">
      </div>
  
  <div class="container">
    <h1>Profile Creation</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="major">Major:</label>
        <input type="text" id="major" v-model="major" required>
      </div>
      <div>
        <label for="bio">Bio:</label>
        <textarea id="bio" v-model="bio" required></textarea>
      </div>
      <button type="cancel">Cancel</button>
      <button type="submit">Submit</button>
    </form>
  </div>
 




</template>

<script>
export default {
 name:'CreateProfileView',
}
</script>

<style scoped>
.container{
  display: flex;
  justify-content: left;
  align-items: left;
  flex-direction: column;
  margin: 50px;
  height: 600px;
  background: rgb(219, 217, 217);
  border-radius: 6px;
}

</style>