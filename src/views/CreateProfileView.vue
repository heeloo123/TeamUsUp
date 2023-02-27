<template>
  <img class="img" alt="img" src="../">
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
      <div>
      <button class="cancelBtn" type="cancel">Cancel</button>
      <button class="submitBtn" type="submit">Submit</button>
      </div>
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

.cancelBtn{
  height: 50px;
  width: 200px;
  background: black;
  border-radius: 40px;
  color: white;
  font-size: x-large;
  font: bolder;
}

.submitBtn{
  height: 50px;
  width: 200px;
  background: black;
  border-radius: 40px;
  color: white;
  font-size: x-large;
  font: bolder;
}


</style>