<template>
  <img class="img" alt="img" src="../assets/Upload_pic_logo.png">
  <div>
    <label for="profilePic">Profile Pic:</label>
    <input type="file" id="profilePic">
  </div>
  
  <div class="container">
    <h1 style= "font-size: 40px; position: fixed; top: 200px; left:100px">Profile Creation</h1>
    <div class="createProfile">
    <form @submit.prevent="submitForm"></form>
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
      <button class="submitBtn" type="submit">Create</button>
      </div>
  </div>
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
  position: fixed;
  top: 700px;
  left: 300px;
}

.submitBtn{
  height: 50px;
  width: 200px;
  background: black;
  border-radius: 40px;
  color: white;
  font-size: x-large;
  font: bolder;
  position: fixed;
  top: 700px;
  right: 300px;
}

.createProfile{
  position: fixed;
  top: 400px;
  left: 1000px;
}


</style>