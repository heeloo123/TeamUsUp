<template>
  <h1>Admin page</h1>
    <div class="container">
      <div v-for="profile in profiles" :key="profile.name">
        <div> 
          Student Name:
            <div class="Student Name">
              {{ profile.firstName }} {{ profile.lastName }}
            </div>
        </div>
        <div>
          Major:
            <div class="major">
              {{ profile.major }}
            </div>
        </div>
        <div>
          Account Status:
          <div class="accountStatus">
            {{ profile.accountStatus }}
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
      { firstName: 'Mary', lastname: 'Doe', major: 'Design', accountStatus: 'Active, Unlocked' },
    ]
  };
 }
 
};


</script>

<style>

</style>