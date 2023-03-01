<template>
  <div style="display: flex; text-align: -webkit-center">
    <div class="background">
      <h1>Admin page</h1>
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
.container{
  display: flex;
  margin: 50px;
  background: rgb(211, 208, 208);
  border-radius: 10px;
}

</style>