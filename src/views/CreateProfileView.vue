<template>
  <div>
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
      <div>
        <label for="profilePic">Profile Pic:</label>
        <input type="file" id="profilePic" @change="handleFileUpload">
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
 




</template>

<script>
export default {
 name:'CreateProfileView',
}
</script>

<style>

</style>