<template>
  <div class="profile-pic">
    <label for="profilePic">Profile Pic:</label>
    <input type="file" id="profilePic">
  </div>
  
  <div class="container">
    <h1 style= "font-size: 40px; position: fixed; top: 160px; left:100px">Profile Creation</h1>
    <form @submit.prevent="submitForm"></form>
      <div class="major">
        <label for="major">Major:</label>
        <input type="text" id="major" v-model="major" required>
      </div>
      <div class="bio">
        <label for="bio">Biography:</label>
        <textarea id="bio" v-model="bio" required></textarea>
      </div>
      <div>
      <button class="cancelBtn" type="cancel">Cancel</button>
      <button class="submitBtn" type="submit">Create</button>
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
  left: 150px;
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
  right: 150px;
}

.major{
  position: fixed;
  top: 280px;
  right: 550px;
  font-size: 25px;
}

.bio{
  position: fixed;
  top: 390px;
  right: 550px;
  font-size: 25px;
}

input[type="text"]{
  width: 600px;
  height: 50px;
  display: block;

}

textarea[id="bio"]{
  width: 600px;
  height: 130px;
  display: block;
}

.profile-pic{
  position: fixed;
  top: 280px;
  left: 150px;
  background: rgb(234, 231, 231);
  width: 300px;
  height: 300px;
}


</style>