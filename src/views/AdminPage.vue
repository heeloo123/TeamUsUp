<template>
  <div style="display: flex; text-align: -webkit-center">
    <div class="background">
      <h1 style="font-size: 40px;margin-left: -1300px;">
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
        
              <div class="defaultBtn">
                <button>Unlock Account</button>
              </div>
              <div class="defaultBtn">
                <button>Archive</button>
              </div>
        </div>
     </div>
  </div>
</template>

<script>
export default {
 name:'AdminPage',
 data() {
  return{
    profiles: [
      { firstName: 'Joe', lastname: 'Doe', major: 'Computer Science', accountStatus: 'Active, Unlocked' },
      { firstName: 'Devin', lastname: 'Doe', major: 'Design', accountStatus: 'Active, Unlocked' },
      { firstName: 'Sean', lastname: 'Doe', major: 'Business', accountStatus: 'Active, Unlocked' },
      { firstName: 'Calvin', lastname: 'Doe', major: 'Design', accountStatus: 'Active, Unlocked' },
      { firstName: 'Harry', lastname: 'Doe', major: 'Computer Science', accountStatus: 'Active, Unlocked' },
      { firstName: 'Mary', lastname: 'Doe', major: 'Business', accountStatus: 'Active, Unlocked' },
      { firstName: 'Perry', lastname: 'Doe', major: 'Computer Science', accountStatus: 'Active, Unlocked' },
      { firstName: 'Zen', lastname: 'Doe', major: 'Design', accountStatus: 'Active, Unlocked' },
    ]
  };
 }
 
};

</script>

<style>
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
  margin: 20px;
  width: auto;
  margin: 50px;
  text-align: left;
  padding-top: 0.5cm;
  padding-left: 1cm;

}

.profile{

}

</style>