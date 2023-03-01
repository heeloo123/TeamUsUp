<template>
  <div style="display: flex; text-align: -webkit-center">
    <div class="background">
      <h1 style="font-size: 40px; margin-left: 90px;">
        Admin page
      </h1>
        <div class="container">
          <div v-for="profile in profiles" :key="profile.name">

            <div class="profile">
              <p>Student Name: {{ profile.firstName }} {{ profile.lastName }}<br>
              Major: {{ profile.major }}<br>
              Account Status: {{ profile.accountStatus }}<br></p>
            </div>
          </div>
              <form style="display: flex; justify-content: space-between"> 
                <button class="unlockBtn">Unlock Account</button>
                <button class="archiveBtn">Archive</button>
              </form>
         </div>
         <studentListOfPage
            :currentPage = "currentPage"
            :totalPages= "10"
            @switchPage= "PageSwitch"/>
    </div>
  </div>
</template>

<script>
import studentListOfPage from '../views/AdminListOfPages.vue'


export default {
 name:'AdminPage',
 components: {
  studentListOfPage
 },

 data() {
  return{
    profiles: [
      { firstName: 'Joe', lastName: 'Doe', major: 'Computer Science', accountStatus: 'Active, Unlocked' },
      { firstName: 'Devin', lastName: 'Doe', major: 'Design', accountStatus: 'Active, Unlocked' },
      { firstName: 'Sean', lastName: 'Doe', major: 'Business', accountStatus: 'Active, Unlocked' },
      { firstName: 'Calvin', lastName: 'Doe', major: 'Design', accountStatus: 'Active, Unlocked' },
      { firstName: 'Harry', lastName: 'Doe', major: 'Computer Science', accountStatus: 'Active, Unlocked' },
      { firstName: 'Mary', lastName: 'Doe', major: 'Business', accountStatus: 'Active, Unlocked' },
      { firstName: 'Perry', lastName: 'Doe', major: 'Computer Science', accountStatus: 'Active, Unlocked' },
      { firstName: 'Zen', lastName: 'Doe', major: 'Design', accountStatus: 'Deactivated, Locked' },
    ],

    page: [
      {currentPage: 1}
    ]
  };
 },

 methods: {
  PageSwitch(page) {
    console.log(page)
    this.currentPage = page
  }
 }
 
};

</script>

<style scoped>
.background {
  background: rgb(207, 205, 205);
  height: 100vh;
  width: 100vw;
  margin: -10px;
  font-family: math;
}

.container{
  background: rgb(255, 255, 255);
  border-radius: 20px;
  width: auto;
  margin: 50px;
  text-align: left;
  padding-top: 0.5cm;
  padding-left: 1cm;
  margin-top: -10px;
}

.profile{
  border-style: solid;
  border-width: 0.06cm;
  width: 1740px;
  height: 75px;
}

.archiveBtn{
  height: 60px;
  min-width: 120px;
  width: auto;
  background: black;
  border-radius: 20px;
  margin-right: auto;
  color: white;
  font-size: 20px;
  font: bolder;
  margin-left: 20px;
  position: relative;
  left: 1250px;
  bottom: 70px;
}

.unlockBtn{
  height: 60px;
  min-width: 120px;
  width: auto;
  background: black;
  border-radius: 20px;
  color: white;
  font-size: 20px;
  font: bolder;
  margin-right: 20px;
  position: relative;
  left: 1575px;
  bottom: 70px;

}


</style>