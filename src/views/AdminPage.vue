<template>
  <h1>Admin page</h1>
    <div class="container">
        <div> 
          Student Name
            <div class="Student Name">
              {{ profile.firstName }} {{ profile.lastname }}
            </div>
        </div>
        <div>
          Major
            <div class="major">
              {{ profile.major }}
            </div>
        </div>
        <div>
          Account Status
          <div class="accountStatus">
            {{ profile.accountStatus }}
          </div>
        </div>

    </div>

</template>

<script>
export default {
 name:'AdminPage'
 
}


</script>

<style>

</style>